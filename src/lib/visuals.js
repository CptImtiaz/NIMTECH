import { P, run, MONO } from './canvas.js'

// Palette for canvas drawings inside the dark "console" panels.
export const DARK = { c: '255,255,255', solid: '#ffffff', on: '#000', boost: 1 }

const rgba = (k, a) => `rgba(${k.c},${Math.min(1, a * k.boost)})`

export const VIS = {}

/* api: converging data streams through a hub */
VIS.api = (c, k = DARK) => {
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
