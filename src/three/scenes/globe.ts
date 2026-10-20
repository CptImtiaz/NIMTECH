// Dotted globe with delivery arcs from Kuala Lumpur to client regions.
import * as THREE from 'three'
import { LAND } from '../land'
import { C, type Ctx, type SceneObj, ease, geo, label, rng, std, trail } from '../kit'

const HUB = { name: 'Kuala Lumpur', lat: 3.14, lon: 101.69 }
const CITIES = [
  { name: 'London', lat: 51.5, lon: -0.12 },
  { name: 'New York', lat: 40.71, lon: -74 },
  { name: 'Dubai', lat: 25.2, lon: 55.27 },
  { name: 'Singapore', lat: 1.35, lon: 103.82 },
  { name: 'Sydney', lat: -33.87, lon: 151.21 },
  { name: 'Tokyo', lat: 35.68, lon: 139.69 },
  { name: 'Frankfurt', lat: 50.11, lon: 8.68 },
  { name: 'San Francisco', lat: 37.77, lon: -122.42 },
  { name: 'Mumbai', lat: 19.08, lon: 72.88 },
  { name: 'Riyadh', lat: 24.71, lon: 46.68 },
]

function landDots() {
  const bin = atob(LAND)
  const a = new Int16Array(bin.length / 2)
  for (let i = 0; i < a.length; i++) a[i] = bin.charCodeAt(i * 2) | (bin.charCodeAt(i * 2 + 1) << 8)
  const out: [number, number][] = []
  for (let i = 0; i < a.length; i += 2) out.push([a[i] / 100, a[i + 1] / 100])
  return out
}

// Rim glow drawn on a slightly larger sphere in front of the globe.
function halo(r: number) {
  const m = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { c: { value: new THREE.Color(C.blue) } },
    vertexShader: `varying vec3 n; varying vec3 v;
      void main(){ vec4 p = modelViewMatrix * vec4(position,1.); n = normalize(normalMatrix * normal); v = normalize(-p.xyz); gl_Position = projectionMatrix * p; }`,
    fragmentShader: `uniform vec3 c; varying vec3 n; varying vec3 v;
      void main(){ float f = pow(1. - max(dot(n, v), 0.), 4.5); gl_FragColor = vec4(c, f * .32); }`,
  })
  return new THREE.Mesh(new THREE.SphereGeometry(r, 64, 48), m)
}

export function globe(ctx: Ctx): SceneObj {
  const root = new THREE.Group()
  const earth = new THREE.Group()
  root.add(earth)
  const rand = rng(11)

  earth.add(new THREE.Mesh(new THREE.SphereGeometry(1, 72, 54), std(0xffffff, { roughness: 1, envMapIntensity: 0.25 })))

  // land as thousands of small discs, tinted from blue (west) to violet (east)
  const dots = landDots()
  const disc = new THREE.CircleGeometry(0.0072, 6)
  const inst = new THREE.InstancedMesh(disc, new THREE.MeshBasicMaterial({ color: 0xffffff }), dots.length)
  const o = new THREE.Object3D()
  const cA = new THREE.Color(C.blue), cB = new THREE.Color(C.violet), cT = new THREE.Color()
  dots.forEach(([lat, lon], i) => {
    const p = geo(lat, lon, 1.002)
    o.position.copy(p)
    o.lookAt(p.clone().multiplyScalar(2))
    o.updateMatrix()
    inst.setMatrixAt(i, o.matrix)
    inst.setColorAt(i, cT.copy(cA).lerp(cB, (lon + 180) / 360))
  })
  earth.add(inst)

  // latitude lines for structure
  for (const lat of [-40, 0, 40]) {
    const r = Math.cos((lat * Math.PI) / 180) * 1.004
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.0012, 4, 160), new THREE.MeshBasicMaterial({ color: C.blue, transparent: true, opacity: 0.18 }))
    ring.rotation.x = Math.PI / 2
    ring.position.y = Math.sin((lat * Math.PI) / 180)
    earth.add(ring)
  }

  root.add(halo(1.05))

  // hub marker
  const hub = geo(HUB.lat, HUB.lon, 1)
  const spike = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.22, 8), new THREE.MeshBasicMaterial({ color: C.teal }))
  spike.position.copy(hub.clone().multiplyScalar(1.11))
  spike.lookAt(hub.clone().multiplyScalar(3))
  spike.rotateX(Math.PI / 2)
  earth.add(spike)
  const hubTag = label('KL · HQ', { h: 0.085, dark: true, dot: '#12b5ad' })
  hubTag.position.copy(hub.clone().multiplyScalar(1.3))
  earth.add(hubTag)

  const pulse = (p: THREE.Vector3, color: number, size: number) => {
    const ring = new THREE.Mesh(new THREE.RingGeometry(size * 0.6, size, 32), new THREE.MeshBasicMaterial({ color, transparent: true, side: THREE.DoubleSide, depthWrite: false }))
    ring.position.copy(p.clone().multiplyScalar(1.004))
    ring.lookAt(p.clone().multiplyScalar(2))
    earth.add(ring)
    return ring
  }
  const rings = [pulse(hub, C.teal, 0.05), ...CITIES.map((c) => pulse(geo(c.lat, c.lon), C.blue, 0.03))]

  // arcs: grow from the hub, carry a packet, then retract
  const arcs = CITIES.map((c, i) => {
    const b = geo(c.lat, c.lon)
    const d = hub.distanceTo(b)
    const lift = 1 + d * 0.32
    const m1 = hub.clone().lerp(b, 0.25).normalize().multiplyScalar(lift)
    const m2 = hub.clone().lerp(b, 0.75).normalize().multiplyScalar(lift)
    const curve = new THREE.CubicBezierCurve3(hub, m1, m2, b)
    const col = i % 3 === 0 ? C.teal : i % 3 === 1 ? C.blue : C.violet
    const t = trail(curve, 0.0042, new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.9 }))
    earth.add(t.mesh)
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.016, 12, 8), new THREE.MeshBasicMaterial({ color: col }))
    dot.visible = false
    earth.add(dot)
    return { curve, ...t, dot, delay: rand() * 4, len: 2.2 + d * 0.8 }
  })

  // satellite orbit
  const orbit = new THREE.Group()
  orbit.rotation.set(1.15, 0, 0.35)
  const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(1.28, 0.0016, 4, 200), new THREE.MeshBasicMaterial({ color: C.blue, transparent: true, opacity: 0.35 }))
  orbit.add(ringMesh)
  const sats = [0, 2.2, 4.1].map((a) => {
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.05), std(C.blue, { roughness: 0.3 }))
    s.userData.a = a
    orbit.add(s)
    return s
  })
  root.add(orbit)

  // face Asia to the viewer, tipped to show the northern hemisphere
  const a0 = Math.atan2(-hub.x, hub.z)
  earth.rotation.y = a0 + (-hub.x * Math.sin(a0) + hub.z * Math.cos(a0) < 0 ? Math.PI : 0) - 0.35
  const spin0 = earth.rotation.y

  return {
    root,
    tilt: [0.32, 0],
    follow: 0.5,
    update(t) {
      earth.rotation.y = spin0 + (ctx.reduce ? 0 : t * 0.06)
      for (const a of arcs) {
        const cyc = a.len + 1.2
        const k = ((t + a.delay) % cyc) / a.len
        const grow = ease(k / 0.45)
        const shrink = ease((k - 0.7) / 0.3)
        a.span(shrink, grow)
        a.dot.visible = k > 0.05 && k < 1
        if (a.dot.visible) a.curve.getPoint(Math.min(1, Math.max(0, (k - 0.05) / 0.6)), a.dot.position)
      }
      rings.forEach((r, i) => {
        const k = ((t * 0.7 + i * 0.37) % 1)
        r.scale.setScalar(0.6 + k * 1.4)
        ;(r.material as THREE.MeshBasicMaterial).opacity = 1 - k
      })
      sats.forEach((s) => {
        const a = s.userData.a + t * 0.25
        s.position.set(Math.cos(a) * 1.28, Math.sin(a) * 1.28, 0)
        s.rotation.set(t, t * 0.7, 0)
      })
    },
  }
}
