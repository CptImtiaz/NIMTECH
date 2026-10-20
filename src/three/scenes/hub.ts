// API & integration: a central hub wired to the business systems around
// it, with events flowing both ways along each connection.
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { C, type Ctx, type SceneObj, glossy, label, std, trail } from '../kit'

const SYSTEMS = ['CRM', 'ERP', 'POS', 'Shop', 'Bank', 'WMS', 'HR', 'BI']

export function hub(ctx: Ctx): SceneObj {
  const root = new THREE.Group()
  const ring = new THREE.Group()
  root.add(ring)

  const core = new THREE.Mesh(new RoundedBoxGeometry(0.42, 0.42, 0.42, 5, 0.08), glossy(0x4a66ff, { roughness: 0.25, envMapIntensity: 0.7 }))
  root.add(core)
  const cage = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.6, 0.6, 0.6)), new THREE.LineBasicMaterial({ color: C.blue, transparent: true, opacity: 0.35 }))
  root.add(cage)
  const tag = label('API GATEWAY', { h: 0.11, dark: true, dot: '#12b5ad' })
  tag.position.set(0, 0.52, 0)
  root.add(tag)

  // orbit guide
  const guide = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.0018, 4, 220), new THREE.MeshBasicMaterial({ color: C.blue, transparent: true, opacity: 0.3 }))
  guide.rotation.x = Math.PI / 2
  ring.add(guide)

  const links = SYSTEMS.map((name, i) => {
    const a = (i / SYSTEMS.length) * Math.PI * 2
    const y = Math.sin(i * 1.9) * 0.18
    const p = new THREE.Vector3(Math.cos(a) * 1.3, y, Math.sin(a) * 1.3)
    const node = new THREE.Mesh(new RoundedBoxGeometry(0.2, 0.2, 0.2, 4, 0.045), std(0xffffff, { roughness: 0.3 }))
    node.position.copy(p)
    ring.add(node)
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.2, 0.2, 0.2)), new THREE.LineBasicMaterial({ color: i % 2 ? C.violet : C.teal }))
    edge.position.copy(p)
    ring.add(edge)
    const l = label(name, { h: 0.11 })
    l.position.copy(p).add(new THREE.Vector3(0, 0.22, 0))
    ring.add(l)
    const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), p.clone().multiplyScalar(0.5).add(new THREE.Vector3(0, 0.3, 0)), p)
    const t = trail(curve, 0.005, new THREE.MeshBasicMaterial({ color: C.sky }), 48, 5)
    t.span(0, 1)
    ring.add(t.mesh)
    const mk = (c: number) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.026, 10, 8), new THREE.MeshBasicMaterial({ color: c }))
      ring.add(m)
      return m
    }
    return { node, edge, curve, inP: mk(C.teal), outP: mk(C.violet), o: i * 0.29 }
  })

  return {
    root,
    tilt: [0.42, 0],
    follow: 0.5,
    update(t) {
      ring.rotation.y = ctx.reduce ? 0 : t * 0.1
      core.rotation.set(t * 0.4, t * 0.5, 0)
      cage.rotation.set(-t * 0.25, -t * 0.3, 0)
      for (const l of links) {
        const k = (t * 0.5 + l.o) % 1
        l.curve.getPoint(k, l.outP.position)
        l.curve.getPoint(1 - ((k + 0.5) % 1), l.inP.position)
        l.node.rotation.y = -ring.rotation.y
        l.edge.rotation.y = -ring.rotation.y
      }
    },
  }
}
