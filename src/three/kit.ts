// Shared pieces for the hero scenes: palette, materials, labels, curves
// and clean-up. Every scene is built in "scene units", where 1 unit is
// roughly the radius of the main object.
import * as THREE from 'three'

export const C = {
  blue: 0x0a74ff,
  blueLight: 0x60b1ff,
  sky: 0xc4e0ff,
  teal: 0x12b5ad,
  violet: 0x7b61ff,
  navy: 0x0a0f29,
  ink: 0x26305c,
  mist: 0xeef1ff,
  white: 0xffffff,
}

export interface Pointer {
  /** -1..1 across the hero, y up */
  x: number
  y: number
  /** pixels inside the hero */
  sx: number
  sy: number
  inside: boolean
}

export interface Ctx {
  lite: boolean
  reduce: boolean
  /** project a world position to hero pixels */
  project: (v: THREE.Vector3) => { x: number; y: number }
  camera: THREE.PerspectiveCamera
}

export interface SceneObj {
  root: THREE.Object3D
  /** base orientation; the engine adds the pointer tilt on top */
  tilt?: [number, number]
  /** how far the scene follows the pointer (radians at the edge) */
  follow?: number
  update: (t: number, dt: number, p: Pointer) => void
}

export const std = (color: number, extra: THREE.MeshStandardMaterialParameters = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.05, ...extra })

export const glossy = (color: number, extra: THREE.MeshPhysicalMaterialParameters = {}) =>
  new THREE.MeshPhysicalMaterial({ color, roughness: 0.2, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.12, ...extra })

export const basic = (color: number, opacity = 1) =>
  new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity, depthWrite: opacity >= 1 })

export function rounded(x: CanvasRenderingContext2D, X: number, Y: number, w: number, h: number, r: number) {
  x.beginPath()
  x.moveTo(X + r, Y)
  x.arcTo(X + w, Y, X + w, Y + h, r)
  x.arcTo(X + w, Y + h, X, Y + h, r)
  x.arcTo(X, Y + h, X, Y, r)
  x.arcTo(X, Y, X + w, Y, r)
  x.closePath()
}

/** A canvas texture of size w×h drawn by `draw`. */
export function canvasTex(w: number, h: number, draw: (x: CanvasRenderingContext2D) => void) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const x = c.getContext('2d')!
  draw(x)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  return t
}

const FONT = '"Inter Variable", system-ui, sans-serif'
const MONO = '"Geist Mono Variable", "JetBrains Mono", ui-monospace, monospace'

/** A pill label that always faces the camera. `h` is its height in units. */
export function label(text: string, opt: { h?: number; dark?: boolean; dot?: string; mono?: boolean } = {}) {
  const { h = 0.1, dark = false, dot, mono = true } = opt
  const S = 4
  const fs = 22 * S
  const meas = document.createElement('canvas').getContext('2d')!
  meas.font = `600 ${fs}px ${mono ? MONO : FONT}`
  const tw = meas.measureText(text).width
  const pad = 18 * S
  const dotW = dot ? 22 * S : 0
  const W = Math.ceil(tw + pad * 2 + dotW)
  const H = 44 * S
  const tex = canvasTex(W, H, (x) => {
    rounded(x, 2, 2, W - 4, H - 4, (H - 4) / 2)
    x.fillStyle = dark ? 'rgba(10,15,41,.92)' : 'rgba(255,255,255,.96)'
    x.fill()
    x.lineWidth = 2 * S
    x.strokeStyle = dark ? 'rgba(96,177,255,.5)' : 'rgba(0,112,240,.22)'
    x.stroke()
    if (dot) {
      x.fillStyle = dot
      x.beginPath()
      x.arc(pad + 5 * S, H / 2, 5 * S, 0, Math.PI * 2)
      x.fill()
    }
    x.font = meas.font
    x.textBaseline = 'middle'
    x.fillStyle = dark ? '#ffffff' : '#0a0f29'
    x.fillText(text, pad + dotW, H / 2 + S)
  })
  const m = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false })
  const s = new THREE.Sprite(m)
  s.scale.set((h * W) / H, h, 1)
  s.renderOrder = 10
  return s
}

/** Latitude/longitude (degrees) to a point on a sphere of radius r. */
export function geo(lat: number, lon: number, r = 1) {
  const phi = ((90 - lat) * Math.PI) / 180
  const th = ((lon + 180) * Math.PI) / 180
  return new THREE.Vector3(-Math.sin(phi) * Math.cos(th), Math.cos(phi), Math.sin(phi) * Math.sin(th)).multiplyScalar(r)
}

/** A thin tube along a curve whose visible span can be animated. */
export function trail(curve: THREE.Curve<THREE.Vector3>, radius: number, mat: THREE.Material, seg = 64, radial = 6) {
  const g = new THREE.TubeGeometry(curve, seg, radius, radial, false)
  const per = radial * 6
  const mesh = new THREE.Mesh(g, mat)
  /** show the part of the tube between a and b (0..1) */
  const span = (a: number, b: number) => {
    const s = Math.max(0, Math.min(seg, Math.floor(a * seg)))
    const e = Math.max(s, Math.min(seg, Math.ceil(b * seg)))
    g.setDrawRange(s * per, (e - s) * per)
  }
  span(0, 0)
  return { mesh, span }
}

export const ease = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t))

export function dispose(o: THREE.Object3D) {
  o.traverse((n) => {
    const m = n as THREE.Mesh
    m.geometry?.dispose()
    const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : []
    for (const mat of mats) {
      for (const v of Object.values(mat)) if (v instanceof THREE.Texture) v.dispose()
      mat.dispose()
    }
  })
}

/** Deterministic random numbers, so a scene looks the same on every load. */
export function rng(seed = 7) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}
