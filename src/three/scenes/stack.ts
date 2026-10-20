// Software: an isometric architecture stack. Layers part as the pointer
// moves up the hero; data packets travel between them.
import * as THREE from 'three'
import { C, type Ctx, type SceneObj, glossy, label, rng, std } from '../kit'

const LAYERS = [
  ['Data', C.violet],
  ['Services', C.blue],
  ['APIs', C.teal],
  ['Experience', C.blue],
] as const

export function stack(ctx: Ctx): SceneObj {
  const root = new THREE.Group()
  const rand = rng(9)
  const W = 1.5, D = 1.1

  const layers = LAYERS.map(([name, col], li) => {
    const g = new THREE.Group()
    const slab = new THREE.Mesh(new THREE.BoxGeometry(W, 0.04, D), std(0xffffff, { transparent: true, opacity: 0.82, roughness: 0.3 }))
    g.add(slab)
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(slab.geometry), new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.8 }))
    g.add(edge)
    // module blocks on the slab
    const mods: THREE.Mesh[] = []
    const cols = 4, rows = 3
    for (let i = 0; i < cols; i++)
      for (let j = 0; j < rows; j++) {
        if (rand() < 0.25) continue
        const h = 0.04 + rand() * (li === 0 ? 0.16 : 0.1)
        const m = new THREE.Mesh(new THREE.BoxGeometry(0.24, h, 0.2), rand() < 0.3 ? glossy(col, { emissive: col, emissiveIntensity: 0 }) : std(0xe9edff))
        m.position.set(-W / 2 + 0.24 + i * ((W - 0.48) / (cols - 1)), 0.02 + h / 2, -D / 2 + 0.22 + j * ((D - 0.44) / (rows - 1)))
        g.add(m)
        mods.push(m)
      }
    const tag = label(name.toUpperCase(), { h: 0.1, dark: li === 3, dot: li === 2 ? '#12b5ad' : '#2a4bff' })
    tag.position.set(-W / 2 - 0.12, 0.1, D / 2 + 0.08)
    g.add(tag)
    root.add(g)
    return { g, mods, col }
  })

  // vertical columns that packets ride
  const lanes = Array.from({ length: 6 }, () => new THREE.Vector2((rand() - 0.5) * (W - 0.3), (rand() - 0.5) * (D - 0.3)))
  const laneMat = new THREE.LineBasicMaterial({ color: C.blue, transparent: true, opacity: 0.25 })
  const laneLines = lanes.map((l) => {
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(l.x, 0, l.y), new THREE.Vector3(l.x, 1, l.y)])
    const line = new THREE.Line(g, laneMat)
    root.add(line)
    return line
  })
  const packets = lanes.flatMap((l, i) =>
    [0, 0.5].map((o) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.045, 0.045), new THREE.MeshBasicMaterial({ color: i % 2 ? C.teal : C.violet }))
      root.add(m)
      return { m, l, o: o + i * 0.13, up: i % 2 === 0 }
    }),
  )

  let gap = 0.34
  return {
    root,
    tilt: [0.52, -0.72],
    follow: 0.35,
    update(t, dt, p) {
      const target = 0.3 + (p.inside ? (p.y + 1) * 0.06 : 0.04) + Math.sin(t * 0.8) * 0.015
      gap += (target - gap) * Math.min(1, dt * 3)
      const y0 = (-gap * (layers.length - 1)) / 2
      layers.forEach((L, i) => {
        L.g.position.y = y0 + i * gap
        L.mods.forEach((m, j) => {
          const mat = m.material as THREE.MeshPhysicalMaterial
          if (mat.emissive.getHex()) mat.emissiveIntensity = 0.25 + 0.25 * Math.sin(t * 2 + i + j)
        })
      })
      const top = y0 + gap * (layers.length - 1)
      laneLines.forEach((ln) => {
        ln.position.y = y0
        ln.scale.y = top - y0
      })
      for (const pk of packets) {
        const k = (t * 0.32 + pk.o) % 1
        const y = pk.up ? y0 + k * (top - y0) : top - k * (top - y0)
        pk.m.position.set(pk.l.x, y + 0.04, pk.l.y)
        pk.m.rotation.y = t * 2
      }
    },
  }
}
