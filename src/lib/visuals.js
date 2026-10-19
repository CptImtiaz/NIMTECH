import { P, run, local, rrect, MONO } from './canvas.js'

// Palettes: LIGHT draws glowing brand blue on the black heroes, DARK draws
// white inside the navy "console" panels.
export const LIGHT = { c: '96,177,255', solid: '#7CC4FF', on: '#02050C', face1: 'rgba(6,14,30,.94)', face2: 'rgba(14,30,60,.94)', screen: '#0a1428', screen2: '#060d1c', boost: 1.15 }
export const DARK = { c: '255,255,255', solid: '#ffffff', on: '#000', face1: 'rgba(10,16,30,.92)', face2: 'rgba(24,34,56,.92)', screen: '#111a2c', screen2: '#0b1222', boost: 1 }

const rgba = (k, a) => `rgba(${k.c},${Math.min(1, a * k.boost)})`

export const VIS = {}

/* home: liquid silk lines */
VIS.home = (c, k = LIGHT) =>
  run(c, (x, W, H, t) => {
    x.clearRect(0, 0, W, H)
    const N = W < 700 ? 26 : 42, cx = P.x, cy = P.y
    for (let i = 0; i < N; i++) {
      const q = i / (N - 1), y0 = H * (0.12 + q * 0.62), a = 0.03 + 0.2 * Math.pow(Math.sin(q * Math.PI), 1.6)
      x.beginPath()
      for (let X = -20; X <= W + 20; X += 12) {
        const n = X / W
        const y = y0 + Math.sin(n * 4.6 + t * 0.00032 + q * 3.2) * H * 0.07 * (1 + cx * 0.5) + Math.sin(n * 10.5 - t * 0.00055 + q * 6.4) * H * 0.016 + Math.cos(n * 2.2 + t * 0.00018 + q) * H * 0.09 * q + cy * 40 * q
        X <= -20 ? x.moveTo(X, y) : x.lineTo(X, y)
      }
      const g = x.createLinearGradient(0, 0, W, 0)
      g.addColorStop(0, rgba(k, 0))
      g.addColorStop(0.35 + 0.15 * Math.sin(t * 0.0003 + q * 2), rgba(k, a))
      g.addColorStop(1, rgba(k, 0))
      x.strokeStyle = g
      x.lineWidth = q > 0.45 && q < 0.55 ? 1.4 : 1
      x.stroke()
    }
  })

/* agents: constellation with pulses */
VIS.agents = (c, k = LIGHT) => {
  const nodes = Array.from({ length: 70 }, (_, i) => ({ x: Math.random(), y: Math.random() * 0.8, vx: (Math.random() - 0.5) * 0.00012, vy: (Math.random() - 0.5) * 0.00012, big: i < 7, ph: Math.random() * 6 }))
  const pulses = []
  let last = 0
  return run(c, (x, W, H, t) => {
    x.clearRect(0, 0, W, H)
    const lp = local(c)
    const pts = nodes.map((n) => {
      if (t) {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > 1) n.vx *= -1
        if (n.y < 0 || n.y > 0.85) n.vy *= -1
      }
      return [n.x * W + P.x * -24, n.y * H + P.y * -24]
    })
    const R = Math.min(170, W * 0.16)
    for (let i = 0; i < pts.length; i++)
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1])
        if (d < R) {
          x.strokeStyle = rgba(k, (1 - d / R) * 0.16)
          x.lineWidth = 1
          x.beginPath(); x.moveTo(pts[i][0], pts[i][1]); x.lineTo(pts[j][0], pts[j][1]); x.stroke()
        }
      }
    pts.forEach((p) => {
      const d = Math.hypot(lp.x - p[0], lp.y - p[1])
      if (d < 200) {
        x.strokeStyle = rgba(k, (1 - d / 200) * 0.35)
        x.beginPath(); x.moveTo(p[0], p[1]); x.lineTo(lp.x, lp.y); x.stroke()
      }
    })
    if (t - last > 380) {
      last = t
      pulses.push({ a: Math.floor(Math.random() * 7), b: Math.floor(Math.random() * nodes.length), p: 0 })
    }
    for (let i = pulses.length - 1; i >= 0; i--) {
      const q = pulses[i]
      q.p += 0.012
      if (q.p >= 1) { pulses.splice(i, 1); continue }
      const A = pts[q.a], B = pts[q.b]
      const px = A[0] + (B[0] - A[0]) * q.p, py = A[1] + (B[1] - A[1]) * q.p
      x.strokeStyle = rgba(k, 0.22)
      x.beginPath(); x.moveTo(A[0], A[1]); x.lineTo(px, py); x.stroke()
      const g = x.createRadialGradient(px, py, 0, px, py, 8)
      g.addColorStop(0, rgba(k, 0.95)); g.addColorStop(1, rgba(k, 0))
      x.fillStyle = g
      x.beginPath(); x.arc(px, py, 8, 0, 7); x.fill()
    }
    pts.forEach((p, i) => {
      const n = nodes[i]
      if (n.big) {
        const s = (Math.sin(t * 0.002 + n.ph) + 1) / 2
        x.strokeStyle = rgba(k, 0.15 + s * 0.25)
        x.beginPath(); x.arc(p[0], p[1], 10 + s * 8, 0, 7); x.stroke()
        x.fillStyle = k.solid
        x.beginPath(); x.arc(p[0], p[1], 3.4, 0, 7); x.fill()
      } else {
        x.fillStyle = rgba(k, 0.55)
        x.beginPath(); x.arc(p[0], p[1], 1.4, 0, 7); x.fill()
      }
    })
  })
}

/* vision: dot field annotated by a scanning model */
VIS.vision = (c, k = LIGHT) => {
  const L = ['bolt', 'crack', 'leaf', 'label', 'cell', 'part', 'bottle', 'scratch', 'fruit']
  const POS = [[0.08, 0.22], [0.2, 0.46], [0.11, 0.68], [0.86, 0.24], [0.76, 0.5], [0.9, 0.7], [0.5, 0.13], [0.3, 0.17], [0.68, 0.18]]
  const ob = POS.map((q, i) => ({ bx: q[0], x: q[0], y: q[1], r: 0.03 + ((i * 17) % 5) / 120, lab: L[i], cf: 0.86 + ((i * 7) % 13) / 100 }))
  return run(c, (x, W, H, t) => {
    x.clearRect(0, 0, W, H)
    const S = W < 700 ? 16 : 20, scan = ((t * 0.00012) % 1.25) * W
    const lp = local(c)
    ob.forEach((o, i) => (o.x = o.bx + Math.sin(t * 0.00025 + i * 1.7) * 0.02))
    for (let gx = S / 2; gx < W; gx += S)
      for (let gy = S / 2; gy < H * 0.86; gy += S) {
        let v = 0.07
        for (const o of ob) {
          const d = Math.hypot(gx - o.x * W, (gy - o.y * H) * 1.1) / (o.r * Math.min(W, H) * 2.2)
          if (d < 1) v = Math.max(v, 0.18 + 0.55 * (1 - d))
        }
        const near = Math.abs(gx - scan) < 40 ? 0.25 * (1 - Math.abs(gx - scan) / 40) : 0
        x.fillStyle = rgba(k, Math.min(0.9, v + near))
        x.fillRect(gx - 0.9, gy - 0.9, 1.8, 1.8)
      }
    const sg = x.createLinearGradient(scan - 80, 0, scan, 0)
    sg.addColorStop(0, rgba(k, 0)); sg.addColorStop(1, rgba(k, 0.06))
    x.fillStyle = sg
    x.fillRect(scan - 80, 0, 80, H * 0.86)
    x.fillStyle = rgba(k, 0.35)
    x.fillRect(scan, 0, 1, H * 0.86)
    x.font = MONO
    ob.forEach((o) => {
      const cx = o.x * W, cy = o.y * H, s = o.r * Math.min(W, H) * 2.4
      if (scan < cx) return
      const age = Math.min(1, (scan - cx) / 160)
      const X = cx - s / 2, Y = cy - s / 2, l = 12
      x.globalAlpha = age
      x.strokeStyle = k.solid
      x.lineWidth = 1.3
      x.beginPath()
      ;[[X, Y + l, X, Y, X + l, Y], [X + s - l, Y, X + s, Y, X + s, Y + l], [X + s, Y + s - l, X + s, Y + s, X + s - l, Y + s], [X + l, Y + s, X, Y + s, X, Y + s - l]].forEach((p) => {
        x.moveTo(p[0], p[1]); x.lineTo(p[2], p[3]); x.lineTo(p[4], p[5])
      })
      x.stroke()
      x.setLineDash([3, 4])
      x.strokeStyle = rgba(k, 0.45)
      x.beginPath(); x.ellipse(cx, cy, s * 0.36, s * 0.32, 0, 0, 7); x.stroke()
      x.setLineDash([])
      const tx = `${o.lab} ${o.cf.toFixed(2)}`, tw = x.measureText(tx).width + 10
      x.fillStyle = k.solid
      x.fillRect(X, Y - 18, tw, 16)
      x.fillStyle = k.on
      x.fillText(tx, X + 5, Y - 6)
      x.globalAlpha = 1
    })
    if (lp.x > 0 && lp.y > 0 && lp.x < W && lp.y < H * 0.86) {
      x.strokeStyle = rgba(k, 0.7)
      x.lineWidth = 1
      x.strokeRect(lp.x - 60, lp.y - 44, 120, 88)
      x.fillStyle = rgba(k, 0.8)
      x.fillText('inference · 11 ms', lp.x - 60, lp.y + 60)
    }
  })
}

/* software: isometric blocks rising */
VIS.software = (c, k = LIGHT) =>
  run(c, (x, W, H, t) => {
    x.clearRect(0, 0, W, H)
    const n = W < 700 ? 7 : 11, tw = Math.min(W / (n * 1.25), 74), th = tw / 2, ox = W * 0.5 + P.x * -30, oy = H * 0.18 + P.y * -20, tm = t * 0.0009
    for (let s = 0; s < n * 2 - 1; s++)
      for (let i = 0; i < n; i++) {
        const j = s - i
        if (j < 0 || j >= n) continue
        const h = ((Math.sin(i * 0.55 + tm) + Math.cos(j * 0.45 + tm * 0.8) + 2) / 4) * th * 3.2 + 4
        const X = ox + ((i - j) * tw) / 2, Y = oy + ((i + j) * th) / 2, e = (i + j) / (2 * n)
        x.beginPath(); x.moveTo(X, Y - h); x.lineTo(X + tw / 2, Y - h + th / 2); x.lineTo(X, Y - h + th); x.lineTo(X - tw / 2, Y - h + th / 2); x.closePath()
        x.fillStyle = rgba(k, 0.05 + (h / (th * 3.2)) * 0.16); x.fill()
        x.strokeStyle = rgba(k, 0.12 + e * 0.1); x.lineWidth = 1; x.stroke()
        x.beginPath(); x.moveTo(X - tw / 2, Y - h + th / 2); x.lineTo(X, Y - h + th); x.lineTo(X, Y + th); x.lineTo(X - tw / 2, Y + th / 2); x.closePath()
        x.fillStyle = k.face1; x.fill(); x.strokeStyle = rgba(k, 0.08); x.stroke()
        x.beginPath(); x.moveTo(X + tw / 2, Y - h + th / 2); x.lineTo(X, Y - h + th); x.lineTo(X, Y + th); x.lineTo(X + tw / 2, Y + th / 2); x.closePath()
        x.fillStyle = k.face2; x.fill(); x.stroke()
      }
  })

/* apps: floating phone screens */
VIS.apps = (c, k = LIGHT) => {
  const sc = Array.from({ length: 14 }, () => ({ x: Math.random(), y: Math.random(), z: 0.35 + Math.random() * 0.75, a: Math.random() * 6, s: 0.0004 + Math.random() * 0.0005, v: 0.00003 + Math.random() * 0.00005 }))
  return run(c, (x, W, H, t) => {
    x.clearRect(0, 0, W, H)
    sc.sort((a, b) => a.z - b.z).forEach((o) => {
      if (t) {
        o.y -= o.v * o.z * 16
        if (o.y < -0.25) { o.y = 1.15; o.x = Math.random() }
      }
      const w = 70 + o.z * 90, h = w * 2, X = o.x * W + P.x * -70 * o.z, Y = o.y * H + P.y * -50 * o.z, sx = Math.cos(o.a + t * o.s + P.x) * 0.9
      const ww = Math.max(6, Math.abs(sx) * w)
      x.save(); x.translate(X, Y); x.globalAlpha = 0.1 + o.z * 0.35
      rrect(x, -ww / 2, -h / 2, ww, h, Math.min(18, ww / 3))
      x.fillStyle = sx > 0 ? k.screen : k.screen2; x.fill()
      x.strokeStyle = rgba(k, 0.45); x.lineWidth = 1; x.stroke()
      if (sx > 0.3) {
        x.fillStyle = rgba(k, 0.3)
        rrect(x, -ww / 2 + ww * 0.12, -h / 2 + h * 0.12, ww * 0.76, h * 0.22, 8); x.fill()
        for (let q = 0; q < 4; q++) { rrect(x, -ww / 2 + ww * 0.12, -h / 2 + h * (0.42 + q * 0.1), ww * (q % 2 ? 0.5 : 0.76), h * 0.035, 4); x.fill() }
      }
      x.restore()
    })
  })
}

/* api: converging data streams through a hub */
VIS.api = (c, k = LIGHT) => {
  const SRC = ['POS', 'Shopify', 'Stripe', 'CRM', 'Helpdesk'], DST = ['ERP', 'Ledger', 'Warehouse', 'E‑invoice', 'Data lake']
  const pk = []
  let last = 0
  return run(c, (x, W, H, t) => {
    x.clearRect(0, 0, W, H)
    const m = W < 700, hx = W * 0.5 + P.x * -20, hy = H * 0.4 + P.y * -14
    const sy = (i) => H * (0.1 + i * 0.14)
    const pos = [...SRC.map((_, i) => [m ? W * 0.04 : W * 0.1, sy(i)]), ...DST.map((_, i) => [m ? W * 0.96 : W * 0.9, sy(i)])]
    const curve = (p, u) => {
      const c1x = (p[0] + hx) / 2, c1y = p[1], c2x = (p[0] + hx) / 2, c2y = hy, v = 1 - u
      return [v * v * v * p[0] + 3 * v * v * u * c1x + 3 * v * u * u * c2x + u * u * u * hx, v * v * v * p[1] + 3 * v * v * u * c1y + 3 * v * u * u * c2y + u * u * u * hy]
    }
    pos.forEach((p) => {
      x.strokeStyle = rgba(k, 0.13); x.lineWidth = 1
      x.beginPath(); x.moveTo(p[0], p[1]); x.bezierCurveTo((p[0] + hx) / 2, p[1], (p[0] + hx) / 2, hy, hx, hy); x.stroke()
    })
    if (t - last > 140) {
      last = t
      pk.push({ i: Math.floor(Math.random() * SRC.length), p: 0, s: 0.008 + Math.random() * 0.006, stage: 0 })
    }
    for (let q = pk.length - 1; q >= 0; q--) {
      const o = pk[q]
      o.p += o.s
      if (o.p >= 1) {
        if (o.stage === 0) { o.stage = 1; o.p = 0; o.i = SRC.length + Math.floor(Math.random() * DST.length) }
        else { pk.splice(q, 1); continue }
      }
      const [bx, by] = curve(pos[o.i], o.stage ? 1 - o.p : o.p)
      const g = x.createRadialGradient(bx, by, 0, bx, by, 9)
      g.addColorStop(0, rgba(k, 1)); g.addColorStop(1, rgba(k, 0))
      x.fillStyle = g
      x.beginPath(); x.arc(bx, by, 9, 0, 7); x.fill()
    }
    const s = (Math.sin(t * 0.003) + 1) / 2
    x.strokeStyle = rgba(k, 0.15 + s * 0.25)
    x.beginPath(); x.arc(hx, hy, 30 + s * 10, 0, 7); x.stroke()
    x.fillStyle = k.solid
    x.beginPath(); x.arc(hx, hy, 5, 0, 7); x.fill()
    if (!m) {
      x.font = MONO
      x.fillStyle = rgba(k, 0.6)
      SRC.forEach((l, i) => { x.textAlign = 'right'; x.fillText(l, W * 0.1 - 12, sy(i) + 4) })
      DST.forEach((l, i) => { x.textAlign = 'left'; x.fillText(l, W * 0.9 + 12, sy(i) + 4) })
      x.textAlign = 'left'
    }
  })
}

/* content: kinetic typography, scrubbed by the pointer */
VIS.content = (c, k = LIGHT) => {
  const Wd = ['Brand film', 'reel', 'Campaign', 'explainer', 'Product shots', 'voice‑over', 'Ad set', 'dubbing', 'Article', 'thumbnail', 'Illustration', 'story', 'Carousel', 'launch', 'Podcast', 'guide']
  const it = Wd.map((w, i) => ({ w, x: Math.random() * 1.4, y: 0.08 + ((i * 41) % 74) / 100, z: 0.3 + ((i * 29) % 70) / 100 }))
  let off = 0, tgt = 0, px = null
  const mv = (e) => { if (px !== null) tgt += ((e.clientX - px) / innerWidth) * 0.8; px = e.clientX }
  addEventListener('pointermove', mv, { passive: true })
  const stop = run(c, (x, W, H, t) => {
    x.clearRect(0, 0, W, H)
    off += (tgt - off) * 0.08
    it.sort((a, b) => a.z - b.z).forEach((o) => {
      const sp = t * 0.00002 * o.z
      let X = (((o.x - sp - off * o.z) % 1.4) + 1.4) % 1.4
      X = (X - 0.2) * W
      const fs = 16 + o.z * 46, light = /^[a-z]/.test(o.w)
      x.font = light ? `400 ${fs}px Inter,system-ui,sans-serif` : `700 ${fs}px Fustat,Inter,system-ui,sans-serif`
      const mid = Math.abs(X + x.measureText(o.w).width / 2 - W / 2) < W * 0.3 && o.y > 0.4 ? 0.3 : 1
      x.fillStyle = rgba(k, (light ? 0.05 + o.z * 0.18 : 0.06 + o.z * 0.24) * mid)
      x.fillText(o.w, X, o.y * H)
    })
  })
  return () => { stop(); removeEventListener('pointermove', mv) }
}

/* sub pages: horizon arc with stars */
VIS.orbit = (c, k = LIGHT) => {
  const st = Array.from({ length: 120 }, () => ({ x: Math.random(), y: Math.random() * 0.75, s: Math.random() * 1.6 + 0.4, p: Math.random() * 6 }))
  return run(c, (x, W, H, t) => {
    x.clearRect(0, 0, W, H)
    st.forEach((s) => {
      x.fillStyle = rgba(k, 0.12 + (0.3 * (Math.sin(t * 0.0012 + s.p) + 1)) / 2)
      x.fillRect(s.x * W + P.x * -14, s.y * H + P.y * -10, s.s, s.s)
    })
    const cx = W * 0.5 + P.x * -30, R = Math.max(W * 0.85, 700), cy = H * 0.78 + R
    const g = x.createRadialGradient(cx, cy - R, 0, cx, cy - R, R * 0.9)
    g.addColorStop(0, rgba(k, 0.14)); g.addColorStop(1, rgba(k, 0))
    x.fillStyle = g
    x.fillRect(0, 0, W, H)
    x.strokeStyle = rgba(k, 0.55); x.lineWidth = 1.2
    x.beginPath(); x.arc(cx, cy, R, Math.PI * 1.1, Math.PI * 1.9); x.stroke()
    for (let q = 1; q < 5; q++) {
      x.strokeStyle = rgba(k, 0.12 - q * 0.02)
      x.beginPath(); x.arc(cx, cy, R + q * 46, Math.PI * 1.15, Math.PI * 1.85); x.stroke()
    }
    const a = Math.PI * 1.5 + Math.sin(t * 0.00025) * 0.3
    x.fillStyle = k.solid
    x.beginPath(); x.arc(cx + Math.cos(a) * R, cy + Math.sin(a) * R, 3, 0, 7); x.fill()
  })
}
