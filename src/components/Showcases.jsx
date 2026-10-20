import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { REDUCE, run, rrect, MONO } from '../lib/canvas.js'
import { DARK, VIS } from '../lib/visuals.js'
import { Icon } from './Icons.jsx'
import { EASE } from './motion.jsx'

// Calls tick every `ms` while the element is on screen.
function useTicker(ref, ms, tick) {
  const inView = useInView(ref, { amount: 0.25 })
  const fn = useRef(tick)
  fn.current = tick
  useEffect(() => {
    if (!inView || REDUCE) return
    const iv = setInterval(() => fn.current(), ms)
    return () => clearInterval(iv)
  }, [inView, ms])
  return inView
}

/* ---------- agent trace ---------- */
const TRACE = [
  ['Intake', '00:00.0', 'Received refund request #4821 via WhatsApp'],
  ['Policy', '00:00.4', 'Retrieved policy: Returns v3.2, 30‑day window'],
  ['Shopify', '00:00.9', 'Looked up order: delivered 12 days ago'],
  ['Check', '00:01.3', 'Eligible: inside window, item unused'],
  ['Approval', '00:01.6', 'Over $200 limit, approval requested from J. Ng'],
  ['Human', '00:04.2', 'Approved by J. Ng'],
  ['Stripe', '00:04.5', 'Refund issued, customer notified'],
]
const TPTS = [[60, 60], [190, 40], [320, 80], [250, 170], [120, 200], [60, 300], [260, 300]]

function AgentTrace() {
  const ref = useRef(null)
  const [k, setK] = useState(TRACE.length)
  useTicker(ref, 1100, () => setK((v) => (v >= TRACE.length + 1 ? -1 : v + 1)))
  return (
    <div ref={ref} className="grid min-h-[400px] md:grid-cols-[1fr_1.2fr]">
      <svg viewBox="0 0 380 360" className="block h-[360px] w-full" aria-label="Agent workflow graph">
        {TPTS.slice(1).map((p, i) => (
          <path
            key={i}
            className={`te ${i + 1 <= k ? 'lit' : ''}`}
            d={`M${TPTS[i][0]} ${TPTS[i][1]} Q${(TPTS[i][0] + p[0]) / 2 + 30} ${(TPTS[i][1] + p[1]) / 2 - 20} ${p[0]} ${p[1]}`}
          />
        ))}
        {TPTS.map((p, i) => (
          <g key={i} className={`tn ${i === k ? 'on' : i < k ? 'done' : ''}`}>
            <circle cx={p[0]} cy={p[1]} r="9" />
            <text x={p[0] + 16} y={p[1] + 4}>{TRACE[i][0]}</text>
          </g>
        ))}
      </svg>
      <div className="flex flex-col gap-2 border-t border-white/10 p-4 font-mono text-[12.5px] md:border-l md:border-t-0">
        {TRACE.map((s, i) => (
          <div key={i} className={`tlog ${i === k ? 'on' : i < k ? 'done' : ''}`}>
            <span>{s[1]}</span>
            <b className="font-normal">{s[2]}</b>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- vision training ---------- */
function VisionTraining() {
  const cv = useRef(null)
  const [m, setM] = useState({ ep: 100, map: 0.71, p: 0.89, r: 0.86, prog: 1 })
  useEffect(() => {
    const noise = Array.from({ length: 200 }, () => Math.random() - 0.5)
    const tl = (e) => 0.85 * Math.exp(-e * 3.4) + 0.09 + noise[Math.floor(e * 199)] * 0.025
    const vl = (e) => 0.95 * Math.exp(-e * 2.9) + 0.14 + noise[199 - Math.floor(e * 199)] * 0.03
    const mp = (e) => 0.71 * (1 - Math.exp(-e * 3.6))
    let p = 1, t0 = null, lastSet = 0
    return run(
      cv.current,
      (x, W, H, t) => {
        if (t) {
          if (t0 === null) t0 = t
          p = Math.min(1, (((t - t0) % 10000) / 10000) / 0.75)
        }
        x.clearRect(0, 0, W, H)
        x.strokeStyle = 'rgba(255,255,255,.07)'
        x.lineWidth = 1
        for (let i = 0; i <= 4; i++) {
          const y = 10 + (i * (H - 30)) / 4
          x.beginPath(); x.moveTo(30, y); x.lineTo(W, y); x.stroke()
        }
        x.font = MONO
        x.fillStyle = 'rgba(255,255,255,.35)'
        ;['1.0', '0.75', '0.5', '0.25', '0'].forEach((l, i) => x.fillText(l, 0, 14 + (i * (H - 30)) / 4))
        const X = (e) => 30 + e * (W - 34), Y = (v) => 10 + (1 - v) * (H - 30)
        const line = (f, dash, w) => {
          x.setLineDash(dash); x.lineWidth = w; x.beginPath()
          for (let e = 0; e <= p; e += 0.005) { const y = Y(Math.min(1, f(e))); e === 0 ? x.moveTo(X(e), y) : x.lineTo(X(e), y) }
          x.stroke(); x.setLineDash([])
        }
        x.strokeStyle = 'rgba(255,255,255,.85)'; line(tl, [], 1.4)
        x.strokeStyle = '#7f9bc4'; line(vl, [4, 3], 1.2)
        const g = x.createLinearGradient(0, 0, W, 0)
        g.addColorStop(0, '#60b1ff'); g.addColorStop(1, '#12b5ad')
        x.strokeStyle = g; line(mp, [], 2.8)
        x.fillStyle = '#60b1ff'
        x.beginPath(); x.arc(X(p), Y(mp(p)), 4.5, 0, 7); x.fill()
        if (t - lastSet > 90 || !t) {
          lastSet = t
          setM({ ep: Math.round(p * 100), map: mp(p), p: 0.89 * (1 - Math.exp(-p * 4)), r: 0.86 * (1 - Math.exp(-p * 3.8)), prog: p })
        }
      },
      { dpr: 2 },
    )
  }, [])
  const stage = Math.min(5, Math.floor(m.prog * 6))
  return (
    <>
      <div className="grid md:grid-cols-[1.5fr_1fr]">
        <div className="border-b border-white/10 p-4 md:border-b-0 md:border-r">
          <canvas ref={cv} className="block h-[300px] w-full" aria-label="Training curves: loss falling and accuracy rising over epochs" />
          <div className="mt-2 flex flex-wrap gap-4 text-xs text-white/50">
            <span><i className="mr-1.5 inline-block h-0.5 w-3.5 bg-white/85 align-middle" />train loss</span>
            <span><i className="mr-1.5 inline-block h-0.5 w-3.5 border-t border-dashed border-[#7f9bc4] align-middle" />val loss</span>
            <span><i className="mr-1.5 inline-block h-[3px] w-3.5 bg-brand-light align-middle" />mAP 50‑95</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="grid grid-cols-2 gap-2.5">
            {[['EPOCH', m.ep], ['mAP 50‑95', m.map.toFixed(2)], ['PRECISION', m.p.toFixed(2)], ['RECALL', m.r.toFixed(2)]].map(([l, v]) => (
              <div key={l} className="rounded-lg border border-white/10 px-3 py-2.5">
                <small className="block font-mono text-[11px] tracking-[.05em] text-white/40">{l}</small>
                <b className="font-fustat text-2xl font-bold tabular-nums tracking-[-.03em]">{v}</b>
              </div>
            ))}
          </div>
          <div>
            <div className="flex justify-between font-mono text-[11px] text-white/40">
              <span>CONFUSION MATRIX</span>
              <span>5 classes</span>
            </div>
            <div className="mt-2 grid max-w-[230px] grid-cols-5 gap-[3px]">
              {Array.from({ length: 25 }, (_, i) => (
                <span
                  key={i}
                  className="aspect-square rounded-[3px] bg-brand-light"
                  style={{ opacity: i % 6 === 0 ? 0.15 + 0.8 * m.prog : 0.04 + 0.18 * (1 - m.prog) * (((i * 7) % 5) / 4) }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-white/10 px-4 py-3.5">
        {['Collect', 'Label', 'Train', 'Evaluate', 'Deploy', 'Monitor'].map((s, i) => (
          <span key={s} className={`pipe ${i === stage ? 'on' : ''}`}>{s}</span>
        ))}
      </div>
    </>
  )
}

/* ---------- software layers ---------- */
const LAYERS = [['Interface', 'Web app, Mobile, Admin panel'], ['API', 'REST, GraphQL, Auth & roles'], ['Services', 'Workflows, AI features, Jobs'], ['Data', 'PostgreSQL, Warehouse, Search'], ['Cloud', 'AWS / GCP / Azure, CI/CD, Monitoring']]
function SoftwareLayers() {
  const ref = useRef(null)
  const [k, setK] = useState(0)
  useTicker(ref, 800, () => setK((v) => (v + 1) % (LAYERS.length + 2)))
  return (
    <div ref={ref} className="grid gap-2.5 p-6">
      {LAYERS.map((l, i) => {
        const on = LAYERS.length - 1 - i === k
        return (
          <div key={l[0]} className={`lay ${on ? 'on' : ''}`}>
            <b className="font-fustat font-bold tracking-[-.02em]">{l[0]}</b>
            <div className="flex flex-wrap gap-2">
              {l[1].split(', ').map((c) => (
                <span key={c} className="chip chip-dark">{c}</span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- app prototype ---------- */
const FEAT = [['Ordering', 'Personalised home screen and one‑tap reorder.'], ['Live tracking', 'Real‑time driver location and arrival time.'], ['Loyalty', 'Points, tiers and rewards that bring people back.'], ['On‑device AI', 'Camera recognition that runs on the phone.']]
function AppShowcase() {
  const ref = useRef(null)
  const [k, setK] = useState(0)
  useTicker(ref, 2600, () => setK((v) => (v + 1) % 4))
  const feat = (list, off) => (
    <div className="grid gap-2.5 max-md:grid-cols-2">
      {list.map((f, i) => (
        <div key={f[0]} onMouseEnter={() => setK(i + off)} className={`feat ${k === i + off ? 'on' : ''}`}>
          <b>{f[0]}</b>
          {f[1]}
        </div>
      ))}
    </div>
  )
  const screens = [
    <>
      <p className="scr-title">Good evening, <span className="text-brand-light">Sam</span></p>
      <div className="scr-big">Today’s picks for you</div>
      <div className="scr-r"><span>Chicken rice bowl</span><b>$12.90</b></div>
      <div className="scr-r"><span>Iced latte</span><b>$4.50</b></div>
      <span className="scr-btn">Order again</span>
    </>,
    <>
      <p className="scr-title">On the <span className="text-brand-light">way</span></p>
      <div className="scr-big scr-map">Driver · 6 min away</div>
      <div className="scr-r"><span>Order #4821</span><b>Picked up</b></div>
      <div className="scr-r"><span>Arriving</span><b>7:42 pm</b></div>
    </>,
    <>
      <p className="scr-title">Your <span className="text-brand-light">rewards</span></p>
      <div className="scr-ring"><span>72%</span></div>
      <div className="scr-r"><span>Points</span><b>1,440</b></div>
      <div className="scr-r"><span>Next reward at</span><b>2,000</b></div>
    </>,
    <>
      <p className="scr-title">Scan <span className="text-brand-light">product</span></p>
      <div className="scr-cam"><i /></div>
      <div className="scr-r"><span>Detected</span><b>Bottle · 0.96</b></div>
      <span className="scr-btn">Add to inspection</span>
    </>,
  ]
  return (
    <div ref={ref} className="grid items-center gap-5 px-6 py-8 md:grid-cols-[1fr_280px_1fr]">
      {feat(FEAT.slice(0, 2), 0)}
      <div className="phone">
        <div className="phone-screen">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={k}
              className="scr"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {screens[k]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {feat(FEAT.slice(2), 2)}
    </div>
  )
}

/* ---------- integration hub ---------- */
const EVENTS = [['order.created', 'Shopify → ERP', '142 ms'], ['payment.captured', 'Stripe → Ledger', '88 ms'], ['stock.updated', 'Warehouse → Shopify', '61 ms'], ['invoice.issued', 'ERP → E‑invoice', '210 ms'], ['ticket.opened', 'Helpdesk → CRM', '95 ms'], ['sync.retry', 'Ledger · 1 retry, succeeded', '1.2 s']]
function ApiFlow() {
  const ref = useRef(null)
  const cv = useRef(null)
  const id = useRef(4)
  const [log, setLog] = useState(() => [0, 1, 2, 3].map((i) => ({ id: i, e: EVENTS[i] })))
  useEffect(() => VIS.api(cv.current, DARK), [])
  useTicker(ref, 1300, () => setLog((l) => [{ id: id.current++, e: EVENTS[Math.floor(Math.random() * EVENTS.length)] }, ...l].slice(0, 4)))
  return (
    <div ref={ref}>
      <canvas ref={cv} className="block h-[320px] w-full" aria-label="Data flowing from source systems through a hub to destination systems" />
      <div className="grid min-h-[118px] gap-1.5 border-t border-white/10 px-4 py-3.5 font-mono text-xs">
        <AnimatePresence initial={false}>
          {log.map(({ id: key, e }) => (
            <motion.div key={key} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }} className="flex gap-2.5 text-white/55">
              <span className="text-brand-light">✓</span>
              <b className="font-normal text-white">{e[0]}</b>
              <span>{e[1]} · {e[2]}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ---------- content studio ---------- */
const PROMPTS = ['Cut a 30‑second launch film from the product shoot, in our brand style.', 'Make 40 ad variations for the summer campaign, three sizes each.', 'Dub the onboarding course into Spanish, Malay and Japanese.']
const CAL = ['Launch film', 'Reel', 'Ad set', 'Product shots', 'Article', 'Voice‑over', 'Carousel', 'Email', 'Story', 'Explainer', 'Ad set', 'Thumbnail', 'Guide', 'Reel', 'Podcast clip', 'Landing copy', 'Dubbing', 'Illustration', 'Short', 'Newsletter']
function ContentStudio() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.25 })
  const [text, setText] = useState(PROMPTS[0])
  const [draft, setDraft] = useState(true)
  const [filled, setFilled] = useState(CAL.length)
  useEffect(() => {
    if (!inView || REDUCE) return
    let tm = [], pi = 0
    const cycle = () => {
      const p = PROMPTS[pi++ % PROMPTS.length]
      setText(''); setDraft(false); setFilled(0)
      ;[...p].forEach((_, i) => tm.push(setTimeout(() => setText(p.slice(0, i + 1)), i * 30)))
      const end = p.length * 30
      tm.push(setTimeout(() => setDraft(true), end + 400))
      CAL.forEach((_, i) => tm.push(setTimeout(() => setFilled(i + 1), end + 700 + i * 110)))
      tm.push(setTimeout(cycle, end + 700 + CAL.length * 110 + 2600))
    }
    cycle()
    return () => tm.forEach(clearTimeout)
  }, [inView])
  return (
    <div ref={ref} className="grid min-h-[400px] md:grid-cols-[1.1fr_1fr]">
      <div className="flex flex-col gap-3.5 border-b border-white/10 p-5 md:border-b-0 md:border-r">
        <div className="min-h-[76px] rounded-xl border border-white/15 bg-black/30 p-3.5 text-[14.5px]">
          <small className="mb-1.5 block font-mono text-[11px] text-white/40">BRIEF</small>
          <span>{text}</span>
          <i className="caret" />
        </div>
        <div className={`grid gap-2 rounded-xl border border-white/10 p-4 transition-opacity duration-500 ${draft ? 'opacity-100' : 'opacity-15'}`}>
          <div className="h-[7px] w-[70%] rounded bg-brand-light/70" />
          <div className="h-[7px] rounded bg-white/15" />
          <div className="h-[7px] rounded bg-white/15" />
          <div className="h-[7px] w-[86%] rounded bg-white/15" />
          <div className="h-[7px] w-[60%] rounded bg-white/15" />
          <div className="mt-1 flex justify-between font-mono text-xs text-white/50"><span>Brand match</span><b className="font-normal text-white">✓ voice · style · tone</b></div>
          <div className="flex justify-between font-mono text-xs text-white/50"><span>Human review</span><b className="font-normal text-white">✓ edited · checked · approved</b></div>
        </div>
      </div>
      <div className="grid grid-cols-5 content-start gap-1.5 p-5">
        {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((d) => (
          <small key={d} className="text-center font-mono text-[10.5px] text-white/40">{d}</small>
        ))}
        {CAL.map((c, i) => (
          <span key={i} className={`cal ${i < filled ? 'f' : ''}`}>{c}</span>
        ))}
      </div>
    </div>
  )
}

/* ---------- Target Locker tracker ---------- */
export function Tracker() {
  const cv = useRef(null)
  useEffect(() => {
    const ppl = Array.from({ length: 7 }, (_, i) => ({ x: Math.random(), y: 0.45 + Math.random() * 0.3, v: (Math.random() - 0.5) * 0.0012, t: i === 2 }))
    const trail = []
    return run(cv.current, (x, W, H, t) => {
      x.clearRect(0, 0, W, H)
      x.strokeStyle = 'rgba(96,177,255,.08)'
      for (let i = 0; i < 12; i++) { const y = H * 0.38 + i * i * 3.2; x.beginPath(); x.moveTo(0, y); x.lineTo(W, y); x.stroke() }
      for (let i = -10; i <= 10; i++) { x.beginPath(); x.moveTo(W / 2 + i * 30, H * 0.38); x.lineTo(W / 2 + i * 140, H); x.stroke() }
      ppl.forEach((p) => {
        if (t) { p.x += p.v; if (p.x < 0.05 || p.x > 0.95) p.v *= -1 }
        const X = p.x * W, Y = p.y * H, s = 0.6 + p.y * 0.9, w = 26 * s, h = 70 * s
        x.fillStyle = p.t ? '#cfe4ff' : '#22324d'
        x.beginPath(); x.arc(X, Y - h * 0.82, w * 0.32, 0, 7); x.fill()
        rrect(x, X - w * 0.32, Y - h * 0.66, w * 0.64, h * 0.66, 6); x.fill()
        if (p.t) {
          x.fillStyle = '#60b1ff'
          x.fillRect(X + w * 0.2, Y - h * 0.5, w * 0.5, w * 0.4)
          trail.push([X, Y]); if (trail.length > 90) trail.shift()
          x.strokeStyle = '#60b1ff'; x.lineWidth = 1.5
          x.strokeRect(X - w * 0.7, Y - h - 6, w * 1.6, h + 12)
          x.font = MONO
          const lb = 'ID 07 · tracked · 0.94', tw = x.measureText(lb).width + 10
          x.fillStyle = '#60b1ff'; x.fillRect(X - w * 0.7, Y - h - 24, tw, 17)
          x.fillStyle = '#06101f'; x.fillText(lb, X - w * 0.7 + 5, Y - h - 12)
        } else {
          x.strokeStyle = 'rgba(255,255,255,.22)'; x.lineWidth = 1
          x.strokeRect(X - w * 0.6, Y - h - 4, w * 1.2, h + 8)
        }
      })
      x.strokeStyle = 'rgba(96,177,255,.6)'; x.setLineDash([2, 4]); x.beginPath()
      trail.forEach((p, i) => (i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1])))
      x.stroke(); x.setLineDash([])
      x.font = MONO; x.fillStyle = 'rgba(255,255,255,.5)'
      x.fillText('CAM 02 · MEMORY BANK: 1 MATCH', 14, 22)
    })
  }, [])
  return (
    <div className="relative">
      <canvas ref={cv} className="block h-[360px] w-full" aria-label="Target Locker following a described object across frames" />
      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/50 px-3 py-2.5 text-[13.5px] backdrop-blur-md">
        <Icon name="eye" className="h-4 w-4 flex-shrink-0 text-brand-light" />
        <span>Find</span>
        <b className="font-normal text-white/60">person carrying a box, near the loading bay</b>
      </div>
    </div>
  )
}

export const SHOWCASES = {
  agents: { title: 'agent trace · refund #4821', C: AgentTrace },
  vision: { title: 'training · run 14', C: VisionTraining },
  software: { title: 'system architecture', C: SoftwareLayers },
  apps: { title: 'app prototype', C: AppShowcase },
  api: { title: 'integration hub · live events', C: ApiFlow },
  content: { title: 'content studio · this month', C: ContentStudio },
}
