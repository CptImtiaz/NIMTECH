// AI agents: a reasoning network around an agent core, with signals
// travelling out to the tools it uses. Nodes near the pointer light up.
import * as THREE from 'three'
import { C, type Ctx, type SceneObj, glossy, label, rng, std, trail } from '../kit'

const TOOLS = ['CRM', 'ERP', 'Email', 'Docs', 'Tickets', 'Calendar']

export function network(ctx: Ctx): SceneObj {
  const root = new THREE.Group()
  const rand = rng(5)
  const N = ctx.lite ? 64 : 110

  // nodes spread through a sphere shell
  const pts: THREE.Vector3[] = []
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const th = i * 2.399963
    const k = 0.55 + rand() * 0.45
    pts.push(new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r).multiplyScalar(k))
  }
  // each node links to its three nearest neighbours
  const edges: [number, number][] = []
  const seen = new Set<string>()
  const nbr: number[][] = pts.map(() => [])
  pts.forEach((p, i) => {
    pts
      .map((q, j) => [p.distanceToSquared(q), j] as const)
      .filter(([, j]) => j !== i)
      .sort((a, b) => a[0] - b[0])
      .slice(0, 3)
      .forEach(([, j]) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (seen.has(key)) return
        seen.add(key)
        edges.push([i, j])
        nbr[i].push(j)
        nbr[j].push(i)
      })
  })
  const lg = new THREE.BufferGeometry().setFromPoints(edges.flatMap(([a, b]) => [pts[a], pts[b]]))
  root.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: C.blue, transparent: true, opacity: 0.22 })))

  const nodes = new THREE.InstancedMesh(new THREE.SphereGeometry(0.022, 14, 10), std(0xffffff, { roughness: 0.4, envMapIntensity: 0.6 }), N)
  const o = new THREE.Object3D()
  const base = new THREE.Color(C.blueLight), hot = new THREE.Color(C.teal), col = new THREE.Color()
  const heat = new Float32Array(N)
  pts.forEach((p, i) => {
    o.position.copy(p)
    o.updateMatrix()
    nodes.setMatrixAt(i, o.matrix)
    nodes.setColorAt(i, base)
  })
  root.add(nodes)

  // agent core
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.17, 3), glossy(0x4a66ff, { roughness: 0.25, envMapIntensity: 0.7 }))
  root.add(core)
  const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(0.29, 1), new THREE.MeshBasicMaterial({ color: C.blue, wireframe: true, transparent: true, opacity: 0.35 }))
  root.add(shell)
  const tag = label('AGENT', { h: 0.11, dark: true, dot: '#12b5ad' })
  tag.position.set(0, 0.42, 0)
  root.add(tag)

  // tools on an outer orbit, linked to the core
  const toolRing = new THREE.Group()
  root.add(toolRing)
  const links = TOOLS.map((name, i) => {
    const a = (i / TOOLS.length) * Math.PI * 2
    const p = new THREE.Vector3(Math.cos(a) * 1.45, (i % 2 ? 0.28 : -0.22), Math.sin(a) * 1.45)
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), glossy(i % 2 ? C.violet : C.teal, { envMapIntensity: 0.6 }))
    box.position.copy(p)
    toolRing.add(box)
    const l = label(name, { h: 0.11 })
    l.position.copy(p).add(new THREE.Vector3(0, 0.16, 0))
    toolRing.add(l)
    const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(), p.clone().multiplyScalar(0.5).add(new THREE.Vector3(0, 0.35, 0)), p)
    const t = trail(curve, 0.0035, new THREE.MeshBasicMaterial({ color: C.blue, transparent: true, opacity: 0.45 }), 48, 5)
    t.span(0, 1)
    toolRing.add(t.mesh)
    const pk = new THREE.Mesh(new THREE.SphereGeometry(0.024, 10, 8), new THREE.MeshBasicMaterial({ color: i % 2 ? C.violet : C.teal }))
    toolRing.add(pk)
    return { box, curve, pk, off: i * 0.37 }
  })

  // signals walking the network
  const P = ctx.lite ? 10 : 22
  const sig = Array.from({ length: P }, () => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.018, 10, 8), new THREE.MeshBasicMaterial({ color: C.teal }))
    root.add(m)
    const a = Math.floor(rand() * N)
    return { m, a, b: nbr[a][0] ?? 0, k: rand() }
  })

  const v = new THREE.Vector3()
  return {
    root,
    tilt: [0.18, 0],
    follow: 0.7,
    update(t, dt, p) {
      root.rotation.y = ctx.reduce ? 0 : t * 0.08
      core.rotation.set(t * 0.3, t * 0.4, 0)
      shell.rotation.set(-t * 0.2, t * 0.25, 0)
      const s = 1 + Math.sin(t * 2.2) * 0.04
      core.scale.setScalar(s)
      for (const g of sig) {
        g.k += dt * 1.4
        if (g.k >= 1) {
          heat[g.b] = 1
          const next = nbr[g.b]
          g.a = g.b
          g.b = next[Math.floor(rand() * next.length)] ?? g.a
          g.k = 0
        }
        g.m.position.lerpVectors(pts[g.a], pts[g.b], g.k)
      }
      // pointer proximity lights nodes on screen
      for (let i = 0; i < N; i++) {
        if (p.inside) {
          v.copy(pts[i]).applyMatrix4(root.matrixWorld)
          const q = ctx.project(v)
          const d = Math.hypot(q.x - p.sx, q.y - p.sy)
          if (d < 110) heat[i] = Math.max(heat[i], 1 - d / 110)
        }
        heat[i] = Math.max(0, heat[i] - dt * 1.2)
        nodes.setColorAt(i, col.copy(base).lerp(hot, heat[i]))
        o.position.copy(pts[i])
        o.scale.setScalar(1 + heat[i] * 0.9)
        o.updateMatrix()
        nodes.setMatrixAt(i, o.matrix)
      }
      nodes.instanceColor!.needsUpdate = true
      nodes.instanceMatrix.needsUpdate = true
      for (const l of links) {
        const k = (t * 0.45 + l.off) % 1
        l.curve.getPoint(k, l.pk.position)
        l.box.rotation.set(t * 0.5, t * 0.6, 0)
      }
      toolRing.rotation.y = -t * 0.12
    },
  }
}
