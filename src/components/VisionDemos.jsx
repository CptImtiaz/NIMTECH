import { useEffect, useRef } from 'react'
import { run, rrect, MONO } from '../lib/canvas.js'
import { Reveal } from './motion.jsx'

// Synthetic, procedurally drawn computer-vision examples. Every scene is
// illustrative: shapes stand in for real camera frames.
const HUD = '#12b5ad'
const OK = '#3DDC97'
const BAD = '#FF5A6A'

function tag(x, X, Y, text, color = HUD) {
  x.font = MONO
  const w = x.measureText(text).width + 10
  x.fillStyle = color
  x.fillRect(X, Y - 16, w, 15)
  x.fillStyle = '#02050C'
  x.fillText(text, X + 5, Y - 5)
}
function box(x, X, Y, w, h, color = HUD, dash = false) {
  x.strokeStyle = color
  x.lineWidth = 1.4
  if (dash) x.setLineDash([4, 3])
  x.strokeRect(X, Y, w, h)
  x.setLineDash([])
}
function corners(x, X, Y, w, h, color = HUD, l = 10) {
  x.strokeStyle = color
  x.lineWidth = 1.6
  x.beginPath()
  ;[[X, Y + l, X, Y, X + l, Y], [X + w - l, Y, X + w, Y, X + w, Y + l], [X + w, Y + h - l, X + w, Y + h, X + w - l, Y + h], [X + l, Y + h, X, Y + h, X, Y + h - l]].forEach((p) => {
    x.moveTo(p[0], p[1]); x.lineTo(p[2], p[3]); x.lineTo(p[4], p[5])
  })
  x.stroke()
}
function hudText(x, lines, X = 12, Y = 20) {
  x.font = MONO
  lines.forEach((l, i) => {
    x.fillStyle = i === 0 ? 'rgba(62, 231, 255,.95)' : 'rgba(255,255,255,.55)'
    x.fillText(l, X, Y + i * 15)
  })
}
const rnd = (s) => {
  const v = Math.sin(s * 127.1) * 43758.5453
  return v - Math.floor(v)
}

/* 1. Surface defects on a conveyor */
function defects(c) {
  return run(c, (x, W, H, t) => {
    x.clearRect(0, 0, W, H)
    const g = x.createLinearGradient(0, 0, 0, H)
    g.addColorStop(0, '#0b1220'); g.addColorStop(1, '#05080f')
    x.fillStyle = g; x.fillRect(0, 0, W, H)
    for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(255,255,255,${0.015 + (i % 3) * 0.01})`; x.fillRect(0, H * 0.62 + i * 3, W, 1) }
    const pw = 120, gap = 50, speed = t * 0.05, n = Math.ceil(W / (pw + gap)) + 2
    let inspected = 0, faults = 0
    for (let k = -1; k < n; k++) {
      const idx = Math.floor(speed / (pw + gap)) + k
      const X = k * (pw + gap) - (speed % (pw + gap)), Y = H * 0.3
      const bad = rnd(idx) > 0.62
      x.fillStyle = '#0f2547'; rrect(x, X, Y, pw, 80, 6); x.fill()
      x.strokeStyle = 'rgba(62, 231, 255,.25)'; x.stroke()
      for (let q = 0; q < 6; q++) { x.fillStyle = 'rgba(62, 231, 255,.35)'; x.fillRect(X + 12 + q * 17, Y + 14, 8, 8); x.fillRect(X + 12 + q * 17, Y + 56, 8, 8) }
      x.strokeStyle = 'rgba(200,170,90,.55)'; x.lineWidth = 1
      x.beginPath(); x.moveTo(X + 10, Y + 40); x.lineTo(X + pw - 10, Y + 40); x.stroke()
      const scanX = W * 0.5
      if (X + pw < scanX) {
        inspected++
        if (bad) {
          faults++
          const dx = X + 20 + rnd(idx + 3) * 70, dy = Y + 22 + rnd(idx + 5) * 30
          x.strokeStyle = '#e6edf7'; x.lineWidth = 1.2
          x.beginPath(); x.moveTo(dx, dy); x.lineTo(dx + 18, dy + 9); x.lineTo(dx + 26, dy + 7); x.stroke()
          box(x, dx - 6, dy - 6, 38, 22, BAD)
          tag(x, dx - 6, dy - 7, `scratch ${(0.9 + rnd(idx) * 0.09).toFixed(2)}`, BAD)
        }
        tag(x, X, Y + 98, bad ? 'FAIL' : 'PASS', bad ? BAD : OK)
      }
    }
    x.fillStyle = 'rgba(62, 231, 255,.8)'; x.fillRect(W * 0.5, H * 0.18, 1.5, H * 0.62)
    const sg = x.createLinearGradient(W * 0.5 - 60, 0, W * 0.5, 0)
    sg.addColorStop(0, 'rgba(62, 231, 255,0)'); sg.addColorStop(1, 'rgba(62, 231, 255,.12)')
    x.fillStyle = sg; x.fillRect(W * 0.5 - 60, H * 0.18, 60, H * 0.62)
    hudText(x, ['LINE 3 · EDGE GPU', `units ${inspected} · defects ${faults} · 9 ms`])
  })
}

/* 2. Retail shelf monitoring */
function shelf(c) {
  const COLORS = ['#319aff', '#60b1ff', '#12b5ad', '#5a72ff', '#3e5bff', '#b8c6ff']
  return run(c, (x, W, H, t) => {
    x.clearRect(0, 0, W, H)
    x.fillStyle = '#070c16'; x.fillRect(0, 0, W, H)
    const rows = 3, rh = (H - 40) / rows, scan = ((t * 0.00018) % 1.2) * W
    let gaps = 0, total = 0
    for (let r = 0; r < rows; r++) {
      const Y = 30 + r * rh
      x.fillStyle = '#1a2436'; x.fillRect(0, Y + rh - 8, W, 8)
      const pw = 34
      for (let i = 0; i * (pw + 6) < W - 20; i++) {
        const X = 12 + i * (pw + 6), id = r * 40 + i, empty = rnd(id) > 0.86
        total++
        if (empty) {
          gaps++
          if (X < scan) { box(x, X, Y + 10, pw, rh - 22, BAD, true); if (rnd(id + 1) > 0.5) tag(x, X, Y + 10, 'gap', BAD) }
          continue
        }
        const col = COLORS[Math.floor(rnd(id + 9) * COLORS.length)]
        x.fillStyle = col; x.globalAlpha = 0.75; rrect(x, X, Y + 10 + (i % 2) * 6, pw, rh - 22 - (i % 2) * 6, 4); x.fill(); x.globalAlpha = 1
        x.fillStyle = 'rgba(255,255,255,.6)'; x.fillRect(X + 6, Y + 22, pw - 12, 4)
        if (X < scan && X > scan - 160) corners(x, X - 2, Y + 8, pw + 4, rh - 18, HUD, 6)
      }
    }
    x.fillStyle = 'rgba(62, 231, 255,.7)'; x.fillRect(scan, 20, 1.5, H - 30)
    hudText(x, ['AISLE 7 · PLANOGRAM', `facings ${total - gaps}/${total} · compliance ${Math.round(((total - gaps) / total) * 100)}%`])
  })
}

/* 3. Fruit counting on a tree canopy */
function fruit(c) {
  const fruits = Array.from({ length: 34 }, (_, i) => ({ x: 0.08 + rnd(i) * 0.84, y: 0.22 + rnd(i + 50) * 0.6, r: 6 + rnd(i + 99) * 6 }))
  return run(c, (x, W, H, t) => {
    x.clearRect(0, 0, W, H)
    x.fillStyle = '#04110a'; x.fillRect(0, 0, W, H)
    for (let i = 0; i < 60; i++) {
      const X = rnd(i + 300) * W, Y = rnd(i + 400) * H, r = 20 + rnd(i + 500) * 40
      const g = x.createRadialGradient(X, Y, 0, X, Y, r)
      g.addColorStop(0, `rgba(40,${110 + (i % 4) * 20},60,.55)`); g.addColorStop(1, 'rgba(10,40,20,0)')
      x.fillStyle = g; x.beginPath(); x.arc(X, Y, r, 0, 7); x.fill()
    }
    const phase = (t * 0.00025) % 1.3
    let n = 0
    fruits.forEach((f, i) => {
      const X = f.x * W, Y = f.y * H
      x.fillStyle = '#ff8a3d'; x.beginPath(); x.arc(X, Y, f.r, 0, 7); x.fill()
      x.fillStyle = 'rgba(255,255,255,.35)'; x.beginPath(); x.arc(X - f.r * 0.3, Y - f.r * 0.3, f.r * 0.3, 0, 7); x.fill()
      if (i / fruits.length < phase) {
        n++
        x.strokeStyle = HUD; x.lineWidth = 1.2; x.beginPath(); x.arc(X, Y, f.r + 4, 0, 7); x.stroke()
        x.fillStyle = HUD; x.font = MONO; x.fillText(String(i + 1), X + f.r + 4, Y - f.r)
      }
    })
    hudText(x, ['ORCHARD · ROW 12', `fruit counted ${n} · ripeness 82%`])
  })
}

/* 4. Document OCR and field extraction */
function ocr(c) {
  const FIELDS = [['Invoice no.', 'INV‑20481'], ['Date', '14 Aug 2026'], ['Supplier', 'Northwind Ltd'], ['Total', '$12,480.00'], ['Tax ID', 'MY‑88213‑K']]
  return run(c, (x, W, H, t) => {
    x.clearRect(0, 0, W, H)
    x.fillStyle = '#070c16'; x.fillRect(0, 0, W, H)
    const pw = Math.min(W * 0.48, 230), px = 18, py = 18, ph = H - 36
    x.fillStyle = '#e9eef6'; rrect(x, px, py, pw, ph, 6); x.fill()
    const step = Math.floor((t * 0.0012) % (FIELDS.length + 3))
    FIELDS.forEach((f, i) => {
      const Y = py + 30 + i * ((ph - 50) / FIELDS.length)
      x.fillStyle = '#9aa6b8'; x.fillRect(px + 14, Y, pw * 0.3, 5)
      x.fillStyle = '#2b3447'; x.fillRect(px + 14, Y + 10, pw * (0.45 + (i % 3) * 0.12), 7)
      if (i < step) {
        box(x, px + 10, Y - 5, pw - 20, 28, i === step - 1 ? HUD : 'rgba(62, 231, 255,.5)')
        const kx = px + pw + 22, ky = py + 24 + i * 30
        x.font = MONO; x.fillStyle = 'rgba(255,255,255,.5)'; x.fillText(f[0], kx, ky)
        x.fillStyle = '#fff'; x.fillText(f[1], kx + 92, ky)
      }
    })
    for (let i = 0; i < 6; i++) { x.fillStyle = '#c7cfdb'; x.fillRect(px + 14, py + ph - 70 + i * 9, pw - 28 - (i % 2) * 30, 3) }
    if (step >= FIELDS.length) { x.font = MONO; x.fillStyle = OK; x.fillText('✓ validated · sent to ERP', px + pw + 22, py + 24 + FIELDS.length * 30 + 10) }
    hudText(x, ['OCR · LAYOUT MODEL'], px + pw + 22, H - 30)
  })
}

/* 5. Workplace safety: PPE and pose */
function ppe(c) {
  const ppl = Array.from({ length: 5 }, (_, i) => ({ x: 0.1 + i * 0.2, v: (rnd(i) - 0.5) * 0.0009, helmet: i !== 2, vest: i !== 4, ph: rnd(i + 7) * 6 }))
  return run(c, (x, W, H, t) => {
    x.clearRect(0, 0, W, H)
    x.fillStyle = '#0a0d14'; x.fillRect(0, 0, W, H)
    x.strokeStyle = 'rgba(255,210,61,.25)'
    for (let i = -10; i < 30; i++) { x.beginPath(); x.moveTo(i * 30, H); x.lineTo(i * 30 + 40, H * 0.82); x.stroke() }
    let alerts = 0
    ppl.forEach((p) => {
      if (t) { p.x += p.v; if (p.x < 0.06 || p.x > 0.94) p.v *= -1 }
      const X = p.x * W, base = H * 0.8, s = Math.min(1, H / 280), sw = Math.sin(t * 0.006 + p.ph) * 8 * s
      const head = [X, base - 120 * s], neck = [X, base - 102 * s], hip = [X, base - 55 * s]
      const pts = [head, neck, [X - 18 * s, base - 80 * s + sw * 0.3], [X + 18 * s, base - 80 * s - sw * 0.3], hip, [X - 10 * s + sw, base], [X + 10 * s - sw, base]]
      x.strokeStyle = 'rgba(62, 231, 255,.85)'; x.lineWidth = 1.6
      x.beginPath()
      ;[[1, 2], [1, 3], [1, 4], [4, 5], [4, 6]].forEach(([a, b]) => { x.moveTo(pts[a][0], pts[a][1]); x.lineTo(pts[b][0], pts[b][1]) })
      x.stroke()
      pts.slice(1).forEach((q) => { x.fillStyle = '#fff'; x.beginPath(); x.arc(q[0], q[1], 2.2, 0, 7); x.fill() })
      x.fillStyle = '#cfd8e6'; x.beginPath(); x.arc(head[0], head[1], 9 * s, 0, 7); x.fill()
      if (p.helmet) { x.fillStyle = '#ffd23d'; x.beginPath(); x.arc(head[0], head[1] - 2 * s, 10 * s, Math.PI, 0); x.fill() }
      if (p.vest) { x.fillStyle = 'rgba(255,138,61,.75)'; x.fillRect(X - 9 * s, base - 100 * s, 18 * s, 40 * s) }
      const ok = p.helmet && p.vest
      if (!ok) alerts++
      box(x, X - 30 * s, head[1] - 16 * s, 60 * s, base - head[1] + 22 * s, ok ? OK : BAD)
      tag(x, X - 30 * s, head[1] - 17 * s, ok ? 'PPE ok' : !p.helmet ? 'no helmet' : 'no vest', ok ? OK : BAD)
    })
    hudText(x, ['ZONE B · SAFETY', `workers ${ppl.length} · alerts ${alerts}`])
  })
}

/* 6. Traffic analytics with tracking and a counting line */
function traffic(c) {
  const cars = Array.from({ length: 9 }, (_, i) => ({ lane: i % 4, p: rnd(i) * 1.2, v: 0.0012 + rnd(i + 20) * 0.0012, id: 100 + i, trail: [] }))
  let count = 0
  return run(c, (x, W, H, t) => {
    x.clearRect(0, 0, W, H)
    x.fillStyle = '#0b0f17'; x.fillRect(0, 0, W, H)
    const road = H * 0.14, lh = (H - road * 2) / 4
    x.fillStyle = '#141a26'; x.fillRect(0, road, W, H - road * 2)
    x.strokeStyle = 'rgba(255,255,255,.25)'; x.setLineDash([16, 14])
    for (let l = 1; l < 4; l++) { x.beginPath(); x.moveTo(0, road + l * lh); x.lineTo(W, road + l * lh); x.stroke() }
    x.setLineDash([])
    const lineX = W * 0.62
    x.strokeStyle = 'rgba(62, 231, 255,.8)'; x.lineWidth = 2; x.beginPath(); x.moveTo(lineX, road); x.lineTo(lineX, H - road); x.stroke(); x.lineWidth = 1
    cars.forEach((car) => {
      const dir = car.lane < 2 ? 1 : -1
      const prev = car.p
      if (t) car.p += car.v * dir
      if (car.p > 1.15) car.p = -0.15
      if (car.p < -0.15) car.p = 1.15
      const X = car.p * W, Y = road + car.lane * lh + lh / 2
      if ((prev - lineX / W) * (car.p - lineX / W) < 0 && Math.abs(prev - car.p) < 0.5) count++
      car.trail.push([X, Y]); if (car.trail.length > 30 || Math.abs(car.trail[0][0] - X) > W * 0.5) car.trail.shift()
      x.strokeStyle = 'rgba(62, 231, 255,.35)'; x.beginPath(); car.trail.forEach((q, i) => (i ? x.lineTo(q[0], q[1]) : x.moveTo(q[0], q[1]))); x.stroke()
      const w = 46, h = lh * 0.55
      x.fillStyle = ['#319aff', '#e6edf7', '#60b1ff', '#8a95a8'][car.id % 4]; rrect(x, X - w / 2, Y - h / 2, w, h, 6); x.fill()
      x.fillStyle = 'rgba(0,0,0,.4)'; x.fillRect(X + (dir > 0 ? 6 : -16), Y - h / 2 + 3, 10, h - 6)
      corners(x, X - w / 2 - 4, Y - h / 2 - 4, w + 8, h + 8, HUD, 7)
      tag(x, X - w / 2 - 4, Y - h / 2 - 5, `car #${car.id}`)
    })
    hudText(x, ['JUNCTION 4 · TRACKING', `vehicles counted ${count}`])
  })
}

const DEMOS = [
  { draw: defects, title: 'Surface defect inspection', ind: 'Manufacturing', task: 'Segmentation', meta: 'Every unit inspected at line speed on an edge GPU.' },
  { draw: shelf, title: 'Shelf & planogram monitoring', ind: 'Retail', task: 'Detection', meta: 'Gaps and misplaced products flagged aisle by aisle.' },
  { draw: fruit, title: 'Fruit counting & yield', ind: 'Agriculture', task: 'Detection + counting', meta: 'Yield estimates from phone or drone imagery.' },
  { draw: ocr, title: 'Document OCR & extraction', ind: 'Finance & back office', task: 'OCR + layout', meta: 'Invoices and forms read, validated and posted.' },
  { draw: ppe, title: 'Workplace safety & PPE', ind: 'Construction & industry', task: 'Pose + detection', meta: 'Helmets, vests and unsafe postures spotted live.' },
  { draw: traffic, title: 'Traffic & vehicle analytics', ind: 'Smart cities & logistics', task: 'Tracking', meta: 'Vehicles tracked, counted and classified per lane.' },
]

function Demo({ d, i }) {
  const ref = useRef(null)
  useEffect(() => d.draw(ref.current), [d])
  return (
    <Reveal delay={(i % 3) * 0.08} className="h-full">
      <div className="console group h-full">
        <div className="console-bar">
          <i />
          <i />
          <i />
          <span className="ml-2">example · {d.ind.toLowerCase()}</span>
          <span className="console-live">LIVE</span>
        </div>
        <canvas ref={ref} className="block h-[260px] w-full" aria-label={`${d.title}: illustrative animated example`} />
        <div className="border-t border-white/10 p-5">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <h3 className="font-fustat text-lg font-bold tracking-[-.02em] text-white">{d.title}</h3>
            <span className="shrink-0 rounded-full border border-brand-light/30 px-2.5 py-0.5 font-mono text-[10.5px] text-brand-light">{d.task}</span>
          </div>
          <p className="text-[14px] text-white/55">{d.meta}</p>
        </div>
      </div>
    </Reveal>
  )
}

export default function VisionDemos() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {DEMOS.map((d, i) => (
        <Demo key={d.title} d={d} i={i} />
      ))}
    </div>
  )
}
