// Computer vision: point-cloud objects swept by a scan plane. Each object
// gets a 3D bounding box and a confidence label as the scan passes it.
import * as THREE from 'three'
import { C, type Ctx, type SceneObj, label, rng } from '../kit'

type Obj = { name: string; at: THREE.Vector3; size: THREE.Vector3; pts: number[] }

export function scan(ctx: Ctx): SceneObj {
  const root = new THREE.Group()
  const rand = rng(3)
  const dens = ctx.lite ? 0.55 : 1
  const FLOOR = -0.55

  // --- sample surfaces as point clouds ---
  const box = (cx: number, cz: number, w: number, h: number, d: number, n: number) => {
    const out: number[] = []
    for (let i = 0; i < n * dens; i++) {
      const f = Math.floor(rand() * 5) // 5 visible faces (no bottom)
      let x = (rand() - 0.5) * w, y = rand() * h, z = (rand() - 0.5) * d
      if (f === 0) x = w / 2
      else if (f === 1) x = -w / 2
      else if (f === 2) z = d / 2
      else if (f === 3) z = -d / 2
      else y = h
      out.push(cx + x, FLOOR + y, cz + z)
    }
    return out
  }
  const lathe = (cx: number, cz: number, prof: (v: number) => number, h: number, n: number) => {
    const out: number[] = []
    for (let i = 0; i < n * dens; i++) {
      const v = rand(), a = rand() * Math.PI * 2, r = prof(v)
      out.push(cx + Math.cos(a) * r, FLOOR + v * h, cz + Math.sin(a) * r)
    }
    return out
  }
  const objs: Obj[] = [
    { name: 'parcel · 0.98', at: new THREE.Vector3(-0.62, FLOOR, 0.12), size: new THREE.Vector3(0.56, 0.42, 0.46), pts: box(-0.62, 0.12, 0.56, 0.42, 0.46, 1500) },
    { name: 'bottle · 0.96', at: new THREE.Vector3(0.08, FLOOR, -0.28), size: new THREE.Vector3(0.24, 0.78, 0.24), pts: lathe(0.08, -0.28, (v) => (v < 0.62 ? 0.11 : v < 0.82 ? 0.11 - (v - 0.62) * 0.38 : 0.035), 0.78, 1300) },
    { name: 'cone · 0.93', at: new THREE.Vector3(0.66, FLOOR, 0.3), size: new THREE.Vector3(0.4, 0.56, 0.4), pts: lathe(0.66, 0.3, (v) => 0.19 * (1 - v) + 0.02, 0.56, 1100) },
  ]

  // floor grid of points
  const floor: number[] = []
  const G = ctx.lite ? 26 : 38
  for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) floor.push(-1.25 + (i / (G - 1)) * 2.5, FLOOR, -0.9 + (j / (G - 1)) * 1.8)

  const all = [...floor, ...objs.flatMap((o) => o.pts)]
  const n = all.length / 3
  const nFloor = floor.length / 3
  const geom = new THREE.BufferGeometry()
  geom.setAttribute('position', new THREE.Float32BufferAttribute(all, 3))
  const colors = new Float32Array(n * 3)
  geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const pts = new THREE.Points(geom, new THREE.PointsMaterial({ size: 0.028, vertexColors: true, sizeAttenuation: true }))
  root.add(pts)

  // --- scan plane ---
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.9, 0.95),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: { c: { value: new THREE.Color(C.teal) }, a: { value: 1 } },
      vertexShader: 'varying vec2 u; void main(){ u = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
      fragmentShader: 'uniform vec3 c; uniform float a; varying vec2 u; void main(){ float e = smoothstep(.0,.1,u.y)*smoothstep(1.,.7,u.y); gl_FragColor = vec4(c, a * (.08*e + .5*smoothstep(.985,1.,u.y))); }',
    }),
  )
  plane.rotation.y = Math.PI / 2
  root.add(plane)
  const beam = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.008, 1.9), new THREE.MeshBasicMaterial({ color: C.teal }))
  root.add(beam)

  // --- detection boxes: corner brackets + label ---
  const dets = objs.map((ob) => {
    const g = new THREE.Group()
    const { x: w, y: h, z: d } = ob.size
    const L = 0.09
    const seg: number[] = []
    for (const sx of [-1, 1]) for (const sy of [0, 1]) for (const sz of [-1, 1]) {
      const px = ob.at.x + (sx * w) / 2, py = FLOOR + sy * h, pz = ob.at.z + (sz * d) / 2
      seg.push(px, py, pz, px - sx * L, py, pz)
      seg.push(px, py, pz, px, py + (sy ? -L : L), pz)
      seg.push(px, py, pz, px, py, pz - sz * L)
    }
    const lg = new THREE.BufferGeometry()
    lg.setAttribute('position', new THREE.Float32BufferAttribute(seg, 3))
    const lm = new THREE.LineBasicMaterial({ color: C.blue, transparent: true, opacity: 0 })
    g.add(new THREE.LineSegments(lg, lm))
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), new THREE.LineBasicMaterial({ color: C.blue, transparent: true, opacity: 0 }))
    edges.position.set(ob.at.x, FLOOR + h / 2, ob.at.z)
    g.add(edges)
    const tag = label(ob.name, { h: 0.1, dark: true, dot: '#12b5ad' })
    tag.position.set(ob.at.x, FLOOR + h + 0.13, ob.at.z)
    ;(tag.material as THREE.SpriteMaterial).opacity = 0
    g.add(tag)
    root.add(g)
    return { ob, lm, em: edges.material as THREE.LineBasicMaterial, tm: tag.material as THREE.SpriteMaterial, a: 0 }
  })

  const cIdle = new THREE.Color(0x3a4678), cFloor = new THREE.Color(0xb7c0e3), cHit = new THREE.Color(C.teal), cDone = new THREE.Color(C.blue), cc = new THREE.Color()
  const X0 = -1.25, X1 = 1.25, PERIOD = 4.2

  return {
    root,
    tilt: [0.5, -0.55],
    follow: 0.45,
    update(t, dt) {
      const k = ctx.reduce ? 0.7 : (t % PERIOD) / PERIOD
      const sx = X0 + (X1 - X0) * Math.min(1, k * 1.25)
      const fade = k > 0.85 ? (k - 0.85) / 0.15 : 0
      plane.position.set(sx, FLOOR + 0.475, 0)
      beam.position.set(sx, FLOOR + 0.002, 0)
      ;(plane.material as THREE.ShaderMaterial).uniforms.a.value = 1 - fade
      const pos = geom.attributes.position.array as Float32Array
      for (let i = 0; i < n; i++) {
        const x = pos[i * 3]
        const d = sx - x
        const fl = i < nFloor
        if (d < 0 || fade > 0.98) cc.copy(fl ? cFloor : cIdle)
        else if (d < 0.07) cc.copy(cHit)
        else cc.copy(fl ? cFloor : cDone).lerp(fl ? cFloor : cIdle, fade)
        colors[i * 3] = cc.r
        colors[i * 3 + 1] = cc.g
        colors[i * 3 + 2] = cc.b
      }
      geom.attributes.color.needsUpdate = true
      for (const dt_ of dets) {
        const on = sx > dt_.ob.at.x + dt_.ob.size.x / 2 && fade < 0.6
        dt_.a += ((on ? 1 : 0) - dt_.a) * Math.min(1, dt * 6)
        dt_.lm.opacity = dt_.a
        dt_.em.opacity = dt_.a * 0.35
        dt_.tm.opacity = dt_.a
      }
    },
  }
}
