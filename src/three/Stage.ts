// 3D hero stage, ported from the Tegar Labs hero: a glossy centrepiece per
// service that turns toward the cursor, floating shapes that flee the
// pointer and morph when the service changes, on three stacked canvases
// (background shapes, core, foreground shapes above the copy).
import * as THREE from 'three'
import gsap from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

import { THEMES, type CoreId, type NodeLayout } from './themes'

export { THEMES }
export type { CoreId, NodeLayout }

const ACCENT = 0x4c63f6
const TINT: Record<CoreId, number> = { ai: 0x6e86ff, vision: 0x22b8d6, software: 0x9b7bff, apps: 0x6e9bff, api: 0x2cc7b3, content: 0xc77cf0, helmet: 0x6e86ff, brand: 0x6e86ff }

interface Options {
  host: HTMLElement
  anchor: HTMLElement
  bg: HTMLCanvasElement
  core: HTMLCanvasElement
  fg: HTMLCanvasElement
  id: CoreId
  layout: NodeLayout
  reduce: boolean
}

interface Node {
  kind: 'fg' | 'bg' | 'lv'
  mesh: THREE.Mesh
  top: number
  left: number
  size: number
  op: number
  i: number
  angle: number
  rx: number
  ry: number
  baseX: number
  baseY: number
  ax: number
  ay: number
  as: number
  ao: number
  sz: number
  tilt: number
}

// Node layouts in % of the hero: [top, left, size, opacity]
const LAYOUTS: Record<NodeLayout, { fg: number[][]; bg: number[][]; lv: number[][] }> = {
  // copy sits in the left ~42%, so shapes stay right of it
  home: {
    fg: [[14, 46, 90], [76, 46, 74], [10, 70, 80], [82, 70, 100], [4, 92, 64], [88, 92, 84]],
    bg: [[36, 48, 70, 0.6], [62, 72, 60, 0.6], [92, 58, 70, 0.7]],
    lv: [[8, 30, 60, 0.8], [42, 72, 140, 0.4], [70, 88, 80, 1], [90, 34, 110, 0.3]],
  },
  // copy sits in the left ~58%
  side: {
    fg: [[12, 64, 90], [74, 62, 70], [18, 92, 110], [80, 90, 80]],
    bg: [[44, 61, 70, 0.6], [8, 80, 60, 0.6], [88, 76, 75, 0.7]],
    lv: [[6, 46, 60, 0.8], [56, 95, 120, 0.4], [90, 52, 90, 0.5]],
  },
}

export function createStage(o: Options) {
  const { host, anchor, reduce } = o
  const disposers: (() => void)[] = []
  const mouse = { x: 0, y: 0, hx: -9999, hy: -9999 }
  const cur = { x: 0, y: 0 }
  let visible = true
  let isSwitching = false
  let switchSpin = 0

  const onMove = (e: PointerEvent) => {
    mouse.x = e.clientX / innerWidth - 0.5
    mouse.y = e.clientY / innerHeight - 0.5
    const r = host.getBoundingClientRect()
    mouse.hx = e.clientX - r.left
    mouse.hy = e.clientY - r.top
  }
  addEventListener('pointermove', onMove, { passive: true })
  disposers.push(() => removeEventListener('pointermove', onMove))

  /* ---------- renderers ---------- */
  function envScene() {
    const sc = new THREE.Scene()
    sc.add(new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), new THREE.MeshBasicMaterial({ side: THREE.BackSide, color: 0x8a93b2 })))
    const panel = (c: THREE.Color, x: number, y: number, z: number, w: number, h: number) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }))
      m.position.set(x, y, z)
      m.lookAt(0, 0, 0)
      sc.add(m)
    }
    panel(new THREE.Color(4, 4, 4.4), 0, 32, 18, 44, 12)
    panel(new THREE.Color(2.4, 3, 4), -34, 8, 22, 10, 34)
    panel(new THREE.Color(2.6, 2.2, 4), 32, -6, 18, 14, 26)
    panel(new THREE.Color(1.2, 2.6, 3), 0, -30, -16, 34, 10)
    panel(new THREE.Color(2.2, 2.2, 2.6), 6, 4, -38, 34, 22)
    return sc
  }
  function layer(c: HTMLCanvasElement) {
    const r = new THREE.WebGLRenderer({ canvas: c, alpha: true, antialias: true })
    r.setPixelRatio(Math.min(devicePixelRatio, 1.5))
    r.outputColorSpace = THREE.SRGBColorSpace
    r.toneMapping = THREE.ACESFilmicToneMapping
    r.toneMappingExposure = 1.05
    const s = new THREE.Scene()
    const pm = new THREE.PMREMGenerator(r)
    s.environment = pm.fromScene(envScene(), 0.04).texture
    pm.dispose()
    s.add(new THREE.AmbientLight(0xffffff, 1.1))
    const d = new THREE.DirectionalLight(0xffffff, 3.4)
    d.position.set(0.4, 0.8, 1)
    s.add(d)
    const p = new THREE.DirectionalLight(ACCENT, 2.2)
    p.position.set(-0.8, -0.4, 0.6)
    s.add(p)
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, -4000, 4000)
    disposers.push(() => r.dispose())
    return { c, r, s, cam }
  }
  const L = { bg: layer(o.bg), core: layer(o.core), fg: layer(o.fg) }
  const gloss = (color: number, rough = 0.18, metal = 0.1, extra: THREE.MeshPhysicalMaterialParameters = {}) =>
    new THREE.MeshPhysicalMaterial({ color, roughness: rough, metalness: metal, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 1.3, ...extra })

  function screenTex() {
    const c = document.createElement('canvas')
    c.width = 256
    c.height = 512
    const x = c.getContext('2d')!
    const g = x.createLinearGradient(0, 0, 0, 512)
    g.addColorStop(0, '#1a2470')
    g.addColorStop(1, '#070a24')
    x.fillStyle = g
    x.fillRect(0, 0, 256, 512)
    const rr = (X: number, Y: number, w: number, h: number, r: number, col: string | CanvasGradient) => {
      x.fillStyle = col
      x.beginPath()
      if (x.roundRect) x.roundRect(X, Y, w, h, r)
      else x.rect(X, Y, w, h)
      x.fill()
    }
    rr(22, 44, 120, 14, 7, 'rgba(255,255,255,.85)')
    rr(22, 68, 80, 10, 5, 'rgba(255,255,255,.35)')
    const hg = x.createLinearGradient(22, 104, 234, 224)
    hg.addColorStop(0, '#3ee7ff')
    hg.addColorStop(1, '#5b7cff')
    rr(22, 104, 212, 120, 20, hg)
    rr(22, 240, 102, 102, 18, 'rgba(255,255,255,.14)')
    rr(132, 240, 102, 102, 18, 'rgba(255,255,255,.14)')
    rr(22, 358, 212, 54, 18, 'rgba(255,255,255,.1)')
    rr(22, 430, 212, 46, 23, '#5b7cff')
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }

  /* ---------- cores ---------- */
  let helmet: THREE.Object3D | null = null
  const helmetReady = new Promise<THREE.Object3D>((resolve, reject) => {
    if (o.id !== 'helmet') return
    const loader = new GLTFLoader()
    loader.setMeshoptDecoder(MeshoptDecoder)
    loader.load(
      '/models/scifi-helmet.glb',
      (g) => {
        // centre and measure once, in the model's own space
        const m = g.scene
        const box = new THREE.Box3().setFromObject(m)
        m.position.sub(box.getCenter(new THREE.Vector3()))
        m.userData.size = box.getSize(new THREE.Vector3()).length()
        resolve(m)
      },
      undefined,
      reject,
    )
  })

  function buildCore(id: CoreId, S: number) {
    const g = new THREE.Group()
    let base = { x: 0, y: 0, z: 0 }
    if (id === 'ai') {
      const geo = new THREE.IcosahedronGeometry(S, 1)
      g.add(new THREE.Mesh(geo, gloss(0xc9d2ff, 0.25, 0.05, { flatShading: true })))
      const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.6 }))
      e.scale.setScalar(1.004)
      g.add(e)
      const ring = new THREE.Mesh(new THREE.TorusGeometry(S * 1.45, S * 0.025, 12, 180), gloss(0x8ea6ff, 0.2, 0.3))
      ring.rotation.x = 1.25
      g.add(ring)
      const ring2 = ring.clone()
      ring2.rotation.set(1.25, 0.9, 0)
      ring2.scale.setScalar(0.92)
      g.add(ring2)
      base = { x: 0.15, y: 0, z: 0.35 }
    } else if (id === 'vision') {
      g.add(new THREE.Mesh(new THREE.TorusGeometry(S * 0.95, S * 0.22, 48, 128), gloss(0xd5ddef, 0.12, 0.9)))
      const lens = new THREE.Mesh(new THREE.SphereGeometry(S * 0.8, 48, 32), gloss(0x060b1c, 0.04, 0.2))
      lens.scale.z = 0.4
      g.add(lens)
      const iris = new THREE.Mesh(new THREE.TorusGeometry(S * 0.4, S * 0.055, 16, 96), gloss(ACCENT, 0.2, 0.2, { emissive: ACCENT, emissiveIntensity: 0.45 }))
      iris.position.z = S * 0.3
      g.add(iris)
      const iris2 = new THREE.Mesh(new THREE.TorusGeometry(S * 0.25, S * 0.02, 12, 80), gloss(0x8ea6ff, 0.2, 0.4, { emissive: 0x5b7cff, emissiveIntensity: 0.5 }))
      iris2.position.z = S * 0.32
      g.add(iris2)
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(S * 0.13, 24, 16), gloss(0x000000, 0.05, 0))
      pupil.position.z = S * 0.3
      g.add(pupil)
      const glint = new THREE.Mesh(new THREE.SphereGeometry(S * 0.07, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }))
      glint.position.set(-S * 0.28, S * 0.28, S * 0.32)
      g.add(glint)
      base = { x: 0, y: 0, z: 0.2 }
    } else if (id === 'software') {
      ;([[0xb794ff, -0.48], [0xffffff, 0], [0x8ea6ff, 0.48]] as [number, number][]).forEach(([c, y]) => {
        const geo = new THREE.BoxGeometry(S * 1.5, S * 0.26, S * 1.5)
        const m = new THREE.Mesh(geo, gloss(c, 0.22, 0.05))
        m.position.y = y * S
        g.add(m)
        const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 }))
        e.position.y = y * S
        g.add(e)
      })
      base = { x: 0.5, y: 0.78, z: 0 }
    } else if (id === 'apps') {
      g.add(new THREE.Mesh(new THREE.BoxGeometry(S, S * 2, S * 0.14), gloss(0x111633, 0.18, 0.7)))
      const sc = new THREE.Mesh(new THREE.PlaneGeometry(S * 0.9, S * 1.88), new THREE.MeshBasicMaterial({ map: screenTex() }))
      sc.position.z = S * 0.071
      g.add(sc)
      const cam = new THREE.Mesh(new THREE.SphereGeometry(S * 0.035, 12, 8), new THREE.MeshBasicMaterial({ color: 0x000000 }))
      cam.position.set(0, S * 0.88, S * 0.075)
      g.add(cam)
      base = { x: 0, y: -0.25, z: 0.42 }
    } else if (id === 'content') {
      // play prism inside two rings, with floating sheets
      const tri = new THREE.Shape()
      const r = S * 0.62
      tri.moveTo(-r * 0.5, -r * 0.75)
      tri.lineTo(r * 0.85, 0)
      tri.lineTo(-r * 0.5, r * 0.75)
      tri.closePath()
      const prism = new THREE.Mesh(new THREE.ExtrudeGeometry(tri, { depth: S * 0.35, bevelEnabled: true, bevelSize: S * 0.08, bevelThickness: S * 0.08, bevelSegments: 6 }), gloss(0xd28cff, 0.15, 0.2))
      prism.position.z = -S * 0.17
      g.add(prism)
      const ring = new THREE.Mesh(new THREE.TorusGeometry(S * 1.15, S * 0.06, 24, 160), gloss(0xffffff, 0.12, 0.6))
      g.add(ring)
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(S * 1.4, S * 0.015, 12, 160), gloss(ACCENT, 0.2, 0.3, { emissive: ACCENT, emissiveIntensity: 0.4 }))
      ring2.rotation.x = 0.4
      g.add(ring2)
      base = { x: 0.1, y: -0.3, z: 0 }
    } else if (id === 'helmet') {
      const holder = new THREE.Group()
      g.add(holder)
      helmetReady.then(
        (m) => {
          helmet = m
          holder.scale.setScalar((S * 3.3) / m.userData.size)
          holder.add(m)
        },
        () => holder.add(new THREE.Mesh(new THREE.TorusKnotGeometry(S * 0.62, S * 0.19, 240, 32), gloss(0x8ea6ff, 0.15, 0.2))),
      )
      base = { x: 0.05, y: -0.35, z: 0 }
    } else {
      const knot = id === 'api' ? gloss(0x5be0d0, 0.15, 0.2) : gloss(0x8ea6ff, 0.15, 0.25)
      g.add(new THREE.Mesh(new THREE.TorusKnotGeometry(S * 0.62, S * 0.19, 240, 32), knot))
      base = { x: 0.3, y: 0, z: 0.2 }
    }
    g.userData.base = base
    return g
  }

  /* ---------- floating nodes ---------- */
  function nodeGeo(id: CoreId): THREE.BufferGeometry {
    switch (id) {
      case 'ai':
        return new THREE.IcosahedronGeometry(0.5, 0)
      case 'vision':
        return new THREE.SphereGeometry(0.42, 32, 24)
      case 'software':
        return new THREE.BoxGeometry(0.6, 0.6, 0.6)
      case 'apps':
        return new THREE.BoxGeometry(0.4, 0.76, 0.1)
      case 'content':
        return new THREE.OctahedronGeometry(0.48, 0)
      case 'helmet':
        return new THREE.DodecahedronGeometry(0.45, 0)
      default:
        return new THREE.TorusGeometry(0.34, 0.12, 20, 56)
    }
  }
  const nodeColor = (id: CoreId, i: number) => [ACCENT, 0xf2f4ff, TINT[id]][i % 3]
  const nodeMat = (id: CoreId, i: number, op: number) => gloss(nodeColor(id, i), 0.2, 0.1, { transparent: true, opacity: op, flatShading: id === 'ai' })

  const nodes: Node[] = []
  const lay = LAYOUTS[o.layout]
  const mk = (kind: Node['kind'], arr: number[][], target: keyof typeof L) =>
    arr.forEach(([top, left, size, op = 1]) => {
      const idx = nodes.length
      const mesh =
        kind === 'lv'
          ? new THREE.Mesh(new THREE.OctahedronGeometry(0.5, 0), new THREE.MeshBasicMaterial({ color: 0x4c63f6, wireframe: true, transparent: true, opacity: op * 0.3 }))
          : new THREE.Mesh(nodeGeo(o.id), nodeMat(o.id, idx, op))
      L[target].s.add(mesh)
      nodes.push({ kind, mesh, top, left, size, op, i: idx, angle: Math.random() * 360, rx: 0, ry: 0, baseX: 0, baseY: 0, ax: 0, ay: 0, as: 1, ao: 1, sz: size, tilt: Math.random() * Math.PI })
    })
  mk('lv', lay.lv, 'bg')
  mk('bg', lay.bg, 'bg')
  mk('fg', lay.fg, 'fg')

  let W = 1, H = 1, core: THREE.Group | null = null, coreId: CoreId = o.id, coreCx = 0, coreCy = 0, S = 100, idle = 0
  function setCore(id: CoreId) {
    coreId = id
    if (core) {
      L.core.s.remove(core)
      // the loaded helmet is shared across rebuilds, so never dispose it
      const keep = new Set<THREE.Object3D>()
      helmet?.traverse((h) => keep.add(h))
      core.traverse((obj) => {
        const m = obj as THREE.Mesh
        if (keep.has(obj)) return
        m.geometry?.dispose()
        const mat = m.material as THREE.MeshBasicMaterial | undefined
        if (mat) {
          mat.map?.dispose()
          mat.dispose()
        }
      })
    }
    core = buildCore(id, S)
    L.core.s.add(core)
  }
  function resize() {
    W = host.clientWidth
    H = host.clientHeight
    Object.values(L).forEach((l) => {
      l.cam.left = -W / 2
      l.cam.right = W / 2
      l.cam.top = H / 2
      l.cam.bottom = -H / 2
      l.cam.updateProjectionMatrix()
      l.r.setSize(W, H, false)
    })
    const mobile = W <= 1024
    const k = mobile ? 0.5 : Math.min(1, W / 1440 + 0.15)
    nodes.forEach((n) => {
      n.sz = n.size * k
      n.mesh.scale.setScalar(n.sz * 0.9)
    })
    const hr = host.getBoundingClientRect()
    const ar = anchor.getBoundingClientRect()
    coreCx = ar.left - hr.left + ar.width / 2
    coreCy = ar.top - hr.top + ar.height / 2
    S = Math.max(60, Math.min(ar.width, ar.height) * (mobile ? 0.3 : 0.28))
    host.style.setProperty('--cx', `${(coreCx / W) * 100}%`)
    host.style.setProperty('--cy', `${(coreCy / H) * 100}%`)
    setCore(coreId)
  }
  const ro = new ResizeObserver(() => resize())
  ro.observe(host)
  ro.observe(anchor)
  disposers.push(() => ro.disconnect())
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  io.observe(host)
  disposers.push(() => io.disconnect())
  resize()

  /* ---------- loop ---------- */
  const durs = [5, 7, 6, 8, 5.5, 6.5, 9, 11, 10]
  let raf = 0
  function tick() {
    raf = requestAnimationFrame(tick)
    if (!visible || document.hidden) return
    const time = performance.now() * 0.001
    cur.x += (mouse.x - cur.x) * 0.05
    cur.y += (mouse.y - cur.y) * 0.05
    if (core) {
      const b = core.userData.base
      if (!reduce) idle += 0.003
      core.rotation.set(b.x + cur.y * 0.35, b.y + cur.x * 0.7 + idle + (switchSpin * Math.PI) / 180, b.z)
      core.position.set(coreCx - W / 2, H / 2 - coreCy + (reduce ? 0 : Math.sin((time * 2 * Math.PI) / 6) * 20), 0)
    }
    const par = { fg: [cur.x * 60, cur.y * 60], bg: [cur.x * -30, cur.y * -30], lv: [cur.x * -15, cur.y * -15] }
    nodes.forEach((n, i) => {
      const [px, py] = par[n.kind]
      const homeX = (n.left / 100) * W + n.sz / 2, homeY = (n.top / 100) * H + n.sz / 2
      if (n.kind === 'lv') {
        const d = 10 + i * 2, ph = (time + i * 1.2) * ((Math.PI * 2) / d)
        const fx = reduce ? 0 : Math.cos(ph * 0.5) * 15, fy = reduce ? 0 : Math.sin(ph) * 20, fa = reduce ? 0 : Math.sin(ph * 0.3) * 15
        n.mesh.position.set(homeX + px + fx - W / 2, H / 2 - (homeY + py + fy), -200)
        n.mesh.rotation.set(n.tilt + fa * 0.02, time * 0.1 + i, (fa * Math.PI) / 180)
        return
      }
      let ox: number, oy: number, fy = 0, fa = 0
      const mat = n.mesh.material as THREE.MeshPhysicalMaterial
      if (isSwitching) {
        ox = n.ax
        oy = n.ay
        n.mesh.scale.setScalar(n.sz * 0.9 * n.as)
        mat.opacity = n.op * n.ao
      } else {
        const cx = homeX + px + n.baseX + n.rx, cy = homeY + py + n.baseY + n.ry
        const dx = mouse.hx - cx, dy = mouse.hy - cy, dist = Math.hypot(dx, dy) || 1
        let tx = 0, ty = 0, sm = 1
        if (dist < 400) {
          const f = (400 - dist) / 400
          tx = (dx / dist) * f * -80
          ty = (dy / dist) * f * -80
          sm = 1 + f * 5
        }
        n.rx += (tx - n.rx) * 0.1
        n.ry += (ty - n.ry) * 0.1
        if (!reduce) n.angle += 0.2 * sm
        const d = durs[i % 9], ph = (time + i * 0.7) * ((Math.PI * 2) / d)
        if (!reduce) {
          fy = Math.sin(ph) * 15
          fa = Math.cos(ph) * 6
        }
        ox = n.baseX + n.rx
        oy = n.baseY + n.ry
      }
      n.mesh.position.set(homeX + px + ox - W / 2, H / 2 - (homeY + py + oy + fy), n.kind === 'fg' ? 100 : -100)
      const a = ((n.angle + fa) * Math.PI) / 180
      n.mesh.rotation.set(n.tilt + a * 0.6, a * 0.4, -a)
    })
    L.bg.r.render(L.bg.s, L.bg.cam)
    L.core.r.render(L.core.s, L.core.cam)
    L.fg.r.render(L.fg.s, L.fg.cam)
  }
  tick()
  disposers.push(() => cancelAnimationFrame(raf))

  /* ---------- service switch ---------- */
  function switchCore(id: CoreId, done: () => void) {
    if (reduce) {
      setCore(id)
      return done()
    }
    const st = { val: 0, blur: 0 }
    gsap.to(st, {
      val: 360,
      blur: 15,
      duration: 0.6,
      ease: 'power2.in',
      onUpdate: () => {
        switchSpin = st.val
        L.core.c.style.filter = `blur(${st.blur}px)`
      },
      onComplete: () => {
        setCore(id)
        gsap.to(st, {
          val: 720,
          blur: 0,
          duration: 1.5,
          ease: 'back.out(0.7)',
          onUpdate: () => {
            switchSpin = st.val
            L.core.c.style.filter = `blur(${st.blur}px)`
          },
          onComplete: () => {
            switchSpin = 0
            L.core.c.style.filter = 'none'
            done()
          },
        })
      },
    })
  }
  function switchNodes(id: CoreId, done: () => void) {
    const list = nodes.filter((n) => n.kind !== 'lv')
    const swap = (n: Node) => {
      n.mesh.geometry.dispose()
      ;(n.mesh.material as THREE.Material).dispose()
      n.mesh.geometry = nodeGeo(id)
      n.mesh.material = nodeMat(id, n.i, n.op)
    }
    if (reduce) {
      list.forEach(swap)
      return done()
    }
    let left = list.length
    list.forEach((n) => {
      const homeX = (n.left / 100) * W + n.sz / 2, homeY = (n.top / 100) * H + n.sz / 2
      n.ax = n.baseX + n.rx
      n.ay = n.baseY + n.ry
      n.as = 1
      n.ao = 1
      const a0 = n.angle, nx = (Math.random() - 0.5) * 200, ny = (Math.random() - 0.5) * 200
      gsap
        .timeline()
        .to(n, { ax: coreCx - homeX, ay: coreCy - homeY, as: 0.1, ao: 0, angle: a0 + 45, duration: 0.5, ease: 'power2.in', onComplete: () => swap(n) })
        .to(n, { duration: 0.3 })
        .to(n, {
          ax: nx,
          ay: ny,
          as: 1,
          ao: 1,
          angle: a0 + 90,
          duration: 0.9,
          ease: 'back.out(1.5)',
          onComplete: () => {
            n.baseX = nx
            n.baseY = ny
            n.rx = 0
            n.ry = 0
            ;(n.mesh.material as THREE.MeshPhysicalMaterial).opacity = n.op
            n.mesh.scale.setScalar(n.sz * 0.9)
            if (--left === 0) done()
          },
        })
    })
  }

  return {
    switchTo(id: CoreId, done?: () => void) {
      if (isSwitching || id === coreId) return false
      isSwitching = true
      let pending = 2
      const fin = () => {
        if (--pending === 0) {
          isSwitching = false
          done?.()
        }
      }
      switchCore(id, fin)
      switchNodes(id, fin)
      return true
    },
    busy: () => isSwitching,
    resize,
    destroy() {
      gsap.killTweensOf(nodes)
      disposers.forEach((f) => f())
    },
  }
}

export type Stage = ReturnType<typeof createStage>
