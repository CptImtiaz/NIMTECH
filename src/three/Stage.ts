// The hero's 3D stage: one WebGL canvas, one scene per service (see
// ./scenes), centred on a layout "anchor" element so CSS decides where it
// sits. The scene leans toward the pointer and reacts to it; switching
// services shrinks the current scene away and grows the next one in.
import * as THREE from 'three'
import gsap from 'gsap'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { THEMES, type CoreId, type NodeLayout } from './themes'
import { type Ctx, type Pointer, type SceneObj, dispose } from './kit'
import { globe } from './scenes/globe'
import { network } from './scenes/network'
import { scan } from './scenes/scan'
import { stack } from './scenes/stack'
import { devices } from './scenes/devices'
import { hub } from './scenes/hub'
import { wave } from './scenes/wave'

export { THEMES }
export type { CoreId, NodeLayout }

const BUILD: Record<CoreId, (c: Ctx) => SceneObj> = { globe, ai: network, vision: scan, software: stack, apps: devices, api: hub, content: wave }
// how much of the anchor's short side one scene unit covers
const FIT: Record<CoreId, number> = { globe: 0.4, ai: 0.3, vision: 0.42, software: 0.34, apps: 0.33, api: 0.31, content: 0.3 }

interface Options {
  host: HTMLElement
  anchor: HTMLElement
  canvas: HTMLCanvasElement
  id: CoreId
  reduce: boolean
}

export function createStage(o: Options) {
  const { host, anchor, canvas, reduce } = o
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  const lite = (nav.hardwareConcurrency || 8) <= 4 || (nav.deviceMemory || 8) <= 4 || !!nav.connection?.saveData || innerWidth < 768

  const r = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' })
  r.setPixelRatio(Math.min(devicePixelRatio, lite ? 1.5 : 2))
  r.outputColorSpace = THREE.SRGBColorSpace
  // neutral tone mapping keeps brand colours true on a white page
  r.toneMapping = THREE.NeutralToneMapping

  const scene = new THREE.Scene()
  if (!lite) {
    const pm = new THREE.PMREMGenerator(r)
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture
    pm.dispose()
  }
  scene.add(new THREE.HemisphereLight(0xffffff, 0xc8d0ff, 1.3))
  const key = new THREE.DirectionalLight(0xffffff, 2.2)
  key.position.set(2, 3, 4)
  scene.add(key)
  const rim = new THREE.DirectionalLight(0x8fa2ff, 1)
  rim.position.set(-3, -1, 2)
  scene.add(rim)

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
  const holder = new THREE.Group() // pointer tilt
  scene.add(holder)

  let W = 1, H = 1, unit = 100
  const pointer: Pointer = { x: 0, y: 0, sx: -9999, sy: -9999, inside: false }
  const onMove = (e: PointerEvent) => {
    const b = host.getBoundingClientRect()
    pointer.sx = e.clientX - b.left
    pointer.sy = e.clientY - b.top
    pointer.inside = pointer.sx >= 0 && pointer.sy >= 0 && pointer.sx <= b.width && pointer.sy <= b.height
    pointer.x = (pointer.sx / b.width) * 2 - 1
    pointer.y = -((pointer.sy / b.height) * 2 - 1)
  }
  addEventListener('pointermove', onMove, { passive: true })

  const v = new THREE.Vector3()
  const ctx: Ctx = {
    lite,
    reduce,
    camera,
    project: (p) => {
      v.copy(p).project(camera)
      return { x: ((v.x + 1) / 2) * W, y: ((1 - v.y) / 2) * H }
    },
  }

  let id = o.id
  let cur = BUILD[id](ctx)
  holder.add(cur.root)

  function resize() {
    W = host.clientWidth || 1
    H = host.clientHeight || 1
    r.setSize(W, H, false)
    const hr = host.getBoundingClientRect()
    const ar = anchor.getBoundingClientRect()
    const cx = ar.left - hr.left + ar.width / 2
    const cy = ar.top - hr.top + ar.height / 2
    unit = Math.max(60, Math.min(ar.width, ar.height)) * FIT[id]
    camera.aspect = W / H
    // distance at which one unit spans `unit` pixels
    camera.position.set(0, 0, H / (unit * 2 * Math.tan((camera.fov * Math.PI) / 360)))
    camera.lookAt(0, 0, 0)
    // shift the projection so the origin lands on the anchor's centre
    camera.setViewOffset(W, H, W / 2 - cx, H / 2 - cy, W, H)
    camera.updateProjectionMatrix()
    host.style.setProperty('--cx', `${(cx / W) * 100}%`)
    host.style.setProperty('--cy', `${(cy / H) * 100}%`)
  }
  const ro = new ResizeObserver(resize)
  ro.observe(host)
  ro.observe(anchor)
  resize()

  let visible = true
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  io.observe(host)

  // pointer follow, eased
  const lean = { x: 0, y: 0 }
  const clock = new THREE.Clock()
  let t = 0, raf = 0
  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05)
    t += dt
    const f = cur.follow ?? 0.5
    const tx = pointer.inside ? -pointer.y * f * 0.35 : 0
    const ty = pointer.inside ? pointer.x * f : 0
    lean.x += (tx - lean.x) * Math.min(1, dt * 3)
    lean.y += (ty - lean.y) * Math.min(1, dt * 3)
    const [bx, by] = cur.tilt ?? [0, 0]
    holder.rotation.set(bx + lean.x, by + lean.y, 0)
    holder.updateMatrixWorld()
    cur.update(t, dt, pointer)
    r.render(scene, camera)
  }
  function tick() {
    raf = requestAnimationFrame(tick)
    if (!visible || document.hidden) {
      clock.getDelta()
      return
    }
    frame()
  }
  if (reduce) {
    t = 2
    frame()
    ro.disconnect()
    new ResizeObserver(() => {
      resize()
      frame()
    }).observe(host)
  } else tick()

  let busy = false
  return {
    get busy() {
      return busy
    },
    switchTo(next: CoreId) {
      if (busy || next === id) return false
      busy = true
      const old = cur
      const done = () => {
        holder.remove(old.root)
        dispose(old.root)
        id = next
        cur = BUILD[id](ctx)
        holder.add(cur.root)
        resize()
        if (reduce) {
          frame()
          busy = false
          return
        }
        cur.root.scale.setScalar(0.001)
        gsap.to(cur.root.scale, { x: 1, y: 1, z: 1, duration: 0.9, ease: 'back.out(1.4)', onComplete: () => void (busy = false) })
      }
      if (reduce) done()
      else gsap.to(old.root.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.45, ease: 'power3.in', onComplete: done })
      return true
    },
    resize,
    /** a PNG of the current frame (used to make static posters) */
    snapshot() {
      frame()
      return canvas.toDataURL('image/png')
    },
    destroy() {
      cancelAnimationFrame(raf)
      removeEventListener('pointermove', onMove)
      ro.disconnect()
      io.disconnect()
      dispose(cur.root)
      scene.environment?.dispose()
      r.dispose()
    },
  }
}

export type Stage = ReturnType<typeof createStage>
