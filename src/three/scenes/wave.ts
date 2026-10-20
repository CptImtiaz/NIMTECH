// AI content: a flowing field of particles with media cards (image, video,
// article, audio, post) rising out of it. The pointer sends ripples
// through the field.
import * as THREE from 'three'
import { C, type Ctx, type SceneObj, canvasTex, rounded } from '../kit'

const F = '"Inter Variable", system-ui, sans-serif'

function mediaCard(kind: number) {
  const w = 280, h = 200, S = 2
  const tex = canvasTex(w * S, h * S, (x) => {
    x.scale(S, S)
    x.shadowColor = 'rgba(10,15,41,.2)'
    x.shadowBlur = 20
    x.shadowOffsetY = 8
    rounded(x, 16, 12, w - 32, h - 36, 16)
    x.fillStyle = '#fff'
    x.fill()
    x.shadowColor = 'transparent'
    x.save()
    rounded(x, 16, 12, w - 32, h - 36, 16)
    x.clip()
    if (kind === 0 || kind === 1) {
      const g = x.createLinearGradient(0, 12, 0, 130)
      g.addColorStop(0, kind ? '#0a0f29' : '#8fa2ff')
      g.addColorStop(1, kind ? '#0a74ff' : '#e8ecff')
      x.fillStyle = g
      x.fillRect(16, 12, w - 32, 118)
      x.fillStyle = kind ? 'rgba(255,255,255,.18)' : '#0a74ff'
      x.beginPath()
      x.moveTo(16, 130)
      x.lineTo(90, 70)
      x.lineTo(140, 110)
      x.lineTo(190, 60)
      x.lineTo(264, 130)
      x.fill()
      if (kind) {
        x.fillStyle = '#fff'
        x.beginPath()
        x.arc(140, 70, 24, 0, Math.PI * 2)
        x.fill()
        x.fillStyle = '#0a74ff'
        x.beginPath()
        x.moveTo(132, 58)
        x.lineTo(152, 70)
        x.lineTo(132, 82)
        x.fill()
      }
    }
    x.restore()
    x.fillStyle = '#0a0f29'
    x.font = `600 15px ${F}`
    const title = ['Product visual', 'Launch video · 0:30', 'Guide: AI in logistics', 'Podcast · Ep. 12', 'LinkedIn post'][kind]
    if (kind < 2) x.fillText(title, 30, 152)
    else {
      x.fillText(title, 30, 44)
      if (kind === 2) for (let i = 0; i < 5; i++) {
        x.fillStyle = i ? '#dfe4f5' : '#0a74ff'
        rounded(x, 30, 62 + i * 18, i === 4 ? 120 : 220, 8, 4)
        x.fill()
      }
      if (kind === 3) for (let i = 0; i < 34; i++) {
        const hh = 8 + Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.37)) * 60
        x.fillStyle = i < 20 ? '#7b61ff' : '#d8d0ff'
        rounded(x, 30 + i * 6.4, 105 - hh / 2, 3.6, hh, 2)
        x.fill()
      }
      if (kind === 4) {
        x.fillStyle = '#12b5ad'
        x.beginPath()
        x.arc(44, 78, 14, 0, Math.PI * 2)
        x.fill()
        x.fillStyle = '#5a6488'
        x.font = `500 13px ${F}`
        x.fillText('How we cut response time in half…', 66, 82)
        x.fillStyle = '#dfe4f5'
        rounded(x, 30, 104, 220, 34, 8)
        x.fill()
      }
    }
  })
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w / 260, h / 260), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }))
  m.renderOrder = 5
  return m
}

export function wave(ctx: Ctx): SceneObj {
  const root = new THREE.Group()
  const NX = ctx.lite ? 70 : 110, NZ = ctx.lite ? 30 : 46
  const W = 3.2, D = 1.7
  const n = NX * NZ
  const pos = new Float32Array(n * 3)
  const col = new Float32Array(n * 3)
  const c = new THREE.Color(), a = new THREE.Color(C.blue), b = new THREE.Color(C.violet), tl = new THREE.Color(C.teal)
  for (let i = 0; i < NX; i++)
    for (let j = 0; j < NZ; j++) {
      const k = i * NZ + j
      pos[k * 3] = -W / 2 + (i / (NX - 1)) * W
      pos[k * 3 + 2] = -D / 2 + (j / (NZ - 1)) * D
      const u = i / (NX - 1)
      c.copy(u < 0.5 ? a : b).lerp(u < 0.5 ? b : tl, u < 0.5 ? u * 2 : (u - 0.5) * 2)
      col.set([c.r, c.g, c.b], k * 3)
    }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  g.setAttribute('color', new THREE.BufferAttribute(col, 3))
  const field = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.024, vertexColors: true }))
  field.position.y = -0.55
  root.add(field)

  const cards = [0, 1, 2, 3, 4].map((k) => {
    const m = mediaCard(k)
    const ang = -0.72 + k * 0.36
    const base = new THREE.Vector3(Math.sin(ang) * 1.5, 0.12 + (k % 2) * 0.42 - (k === 2 ? 0.05 : 0), -Math.cos(ang) * 0.5 + 0.3)
    m.position.copy(base)
    root.add(m)
    return { m, base, ph: k * 1.3 }
  })

  // ripple from the pointer's point on the field
  const ray = new THREE.Raycaster()
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.55)
  const hit = new THREE.Vector3()
  const ripple = { x: 0, z: 0, t0: -10 }
  let last = 0
  const inv = new THREE.Matrix4()

  return {
    root,
    tilt: [0.38, 0],
    follow: 0.4,
    update(t, _dt, p) {
      if (p.inside && t - last > 0.35) {
        ray.setFromCamera(new THREE.Vector2(p.x, p.y), ctx.camera)
        inv.copy(root.matrixWorld).invert()
        const r = ray.ray.clone().applyMatrix4(inv)
        if (r.intersectPlane(plane, hit) && Math.abs(hit.x) < W / 2 && Math.abs(hit.z) < D / 2) {
          if (Math.hypot(hit.x - ripple.x, hit.z - ripple.z) > 0.15) {
            ripple.x = hit.x
            ripple.z = hit.z
            ripple.t0 = t
            last = t
          }
        }
      }
      const rt = t - ripple.t0
      for (let i = 0; i < n; i++) {
        const x = pos[i * 3], z = pos[i * 3 + 2]
        let y = Math.sin(x * 2.2 + t * 1.1) * 0.12 + Math.cos(z * 3.1 + t * 0.8 + x) * 0.07 + Math.sin((x + z) * 1.3 - t * 0.6) * 0.05
        if (rt < 3) {
          const d = Math.hypot(x - ripple.x, z - ripple.z)
          y += Math.sin(d * 14 - rt * 9) * 0.07 * Math.max(0, 1 - rt / 3) * Math.exp(-d * 2.2) * (d < rt * 1.6 ? 1 : 0)
        }
        pos[i * 3 + 1] = y
      }
      g.attributes.position.needsUpdate = true
      cards.forEach((cd) => {
        cd.m.position.y = cd.base.y + Math.sin(t * 0.9 + cd.ph) * 0.05
        cd.m.rotation.set(-root.rotation.x * 0.6, -root.rotation.y * 0.5 + Math.sin(t * 0.5 + cd.ph) * 0.06, 0)
      })
    },
  }
}
