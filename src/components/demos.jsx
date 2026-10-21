import { useEffect, useRef, useState } from 'react'
import { Check, MapPin, Truck, Camera, CalendarCheck, Building2, Plane, Wallet, HeartPulse, Leaf, Send } from 'lucide-react'
import { REDUCE } from '../lib/canvas.js'
import Photo from './Photo.jsx'
import { IMG } from '../data/images.js'

// Interactive product demos, one per service. All data shown is sample data.

// Runs `fn` every `ms` while the element is on screen.
function useTick(ref, ms, fn, on = true) {
  const f = useRef(fn)
  f.current = fn
  useEffect(() => {
    const el = ref.current
    if (!el || REDUCE || !on) return
    let t
    const io = new IntersectionObserver(([e]) => {
      clearInterval(t)
      if (e.isIntersecting) t = setInterval(() => f.current(), ms)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      clearInterval(t)
    }
  }, [ref, ms, on])
}

/* ---------------- WhatsApp auto-reply agent ---------------- */
const QA = [
  ['Do you deliver today?', 'Yes! Orders placed before 3pm arrive today. Shall I place one for you? 🚚'],
  ['Price for 2 boxes?', '2 boxes are RM 90, gift wrap included. Want me to reserve them?'],
  ['Book for Saturday', 'Saturday has 10am, 1pm and 4pm free. Which time suits you?'],
  ['Talk to a person', 'Of course. I’ve passed this to Aisha on our team; she’ll reply in a few minutes. 🙌'],
]
const START = [
  ['in', 'Hi! Are you open on Sunday?', 0],
  ['out', 'Hi 👋 Yes, we’re open Sunday 10am to 6pm. How can I help?', 1],
]
let mid = 2

export function WhatsAppDemo() {
  const ref = useRef(null)
  const [msgs, setMsgs] = useState(START)
  const [typing, setTyping] = useState(false)
  const [auto, setAuto] = useState(true)
  const [k, setK] = useState(0)
  const body = useRef(null)

  const ask = (i, manual) => {
    if (typing) return
    if (manual) setAuto(false)
    const [q, a] = QA[i]
    setMsgs((m) => [...m, ['in', q, mid++]].slice(-7))
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, ['out', a, mid++]].slice(-7))
    }, 1300)
  }
  useTick(ref, 4200, () => {
    ask(k % QA.length)
    setK((x) => x + 1)
  }, auto)
  useEffect(() => {
    const b = body.current
    if (b) b.scrollTo({ top: b.scrollHeight, behavior: REDUCE ? 'auto' : 'smooth' })
  }, [msgs, typing])

  return (
    <div ref={ref} className="wa">
      <div className="wa-phone">
        <div className="wa-top">
          <span className="wa-avatar">N</span>
          <span className="min-w-0">
            <b>Your Business</b>
            <small>{typing ? 'typing…' : 'AI agent · online'}</small>
          </span>
        </div>
        <div ref={body} className="wa-body" aria-live="polite">
          {msgs.map(([who, t, id]) => (
            <p key={id} className={`wa-msg wa-${who}`}>
              {t}
              <time>{who === 'out' ? '✓✓' : ''}</time>
            </p>
          ))}
          {typing && (
            <p className="wa-msg wa-out wa-typing" aria-label="Agent is typing">
              <i />
              <i />
              <i />
            </p>
          )}
        </div>
        <div className="wa-input">
          <span>Message</span>
          <Send className="h-4 w-4" />
        </div>
      </div>
      <div className="wa-chips">
        <p>Try asking:</p>
        {QA.map(([q], i) => (
          <button key={q} type="button" onClick={() => ask(i, true)} disabled={typing}>
            {q}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------------- RoRo bin app (customer + driver) ---------------- */
const RORO = [
  ['Order a bin', 'New job nearby'],
  ['Driver on the way', 'Navigate to site'],
  ['Bin delivered', 'Proof of delivery'],
  ['Pickup booked', 'Job complete'],
]

function RouteMap({ moving }) {
  return (
    <div className="rr-map">
      <svg viewBox="0 0 200 140" aria-hidden="true">
        <path d="M0 40h200M0 95h200M50 0v140M135 0v140" stroke="#ffffff14" strokeWidth="10" />
        <path id="rr-route" d="M20 120 C 60 120, 50 95, 90 95 S 135 60, 135 40 L 180 30" fill="none" stroke="#3054ff" strokeWidth="3" strokeDasharray="5 5" />
        <circle cx="180" cy="30" r="6" fill="#22c55e" />
        <g>
          <circle r="7" fill="#fff" />
          <circle r="4" fill="#3054ff" />
          {moving && !REDUCE && <animateMotion dur="5s" repeatCount="indefinite" rotate="0"><mpath href="#rr-route" /></animateMotion>}
        </g>
      </svg>
    </div>
  )
}

function RoroScreen({ step, role }) {
  if (role === 'customer') {
    if (step === 0)
      return (
        <>
          <p className="rr-h">Choose a bin</p>
          <div className="rr-sizes">
            {['6 yd', '10 yd', '20 yd'].map((s, i) => (
              <span key={s} className={i === 1 ? 'on' : ''}>
                <b>{s}</b>
                <small>{['Small reno', 'Kitchen', 'Big clear-out'][i]}</small>
              </span>
            ))}
          </div>
          <p className="rr-field">
            <MapPin className="h-3.5 w-3.5" /> 12 Jalan Ampang, KL
          </p>
          <span className="rr-btn">Request bin</span>
        </>
      )
    if (step === 1)
      return (
        <>
          <p className="rr-h">Driver on the way</p>
          <RouteMap moving />
          <p className="rr-row">
            <Truck className="h-4 w-4" /> Arriving in <b>18 min</b>
          </p>
        </>
      )
    if (step === 2)
      return (
        <>
          <p className="rr-h">Bin delivered</p>
          <div className="rr-done">
            <Check className="h-7 w-7" />
          </div>
          <p className="rr-row">Placed on driveway · photo saved</p>
          <span className="rr-btn">Schedule pickup</span>
        </>
      )
    return (
      <>
        <p className="rr-h">Pickup booked</p>
        <div className="rr-done">
          <CalendarCheck className="h-7 w-7" />
        </div>
        <p className="rr-row">Friday, 9:00 to 11:00 AM</p>
      </>
    )
  }
  if (step === 0)
    return (
      <>
        <p className="rr-h">New job · 2.4 km</p>
        <div className="rr-job">
          <b>10 yd bin</b>
          <small>12 Jalan Ampang · today</small>
        </div>
        <span className="rr-btn rr-pulse">Accept job</span>
      </>
    )
  if (step === 1)
    return (
      <>
        <p className="rr-h">Navigate</p>
        <RouteMap moving />
        <p className="rr-row">Next: turn right in 300 m</p>
      </>
    )
  if (step === 2)
    return (
      <>
        <p className="rr-h">Proof of delivery</p>
        <div className="rr-cam">
          <Camera className="h-7 w-7" />
        </div>
        <span className="rr-btn">Confirm drop-off</span>
      </>
    )
  return (
    <>
      <p className="rr-h">Job complete</p>
      <div className="rr-done">
        <Check className="h-7 w-7" />
      </div>
      <p className="rr-row">3 jobs today · next at 2pm</p>
    </>
  )
}

export function RoroDemo() {
  const ref = useRef(null)
  const [step, setStep] = useState(0)
  const [auto, setAuto] = useState(true)
  useTick(ref, 3200, () => setStep((s) => (s + 1) % 4), auto)
  return (
    <div ref={ref} className="rr">
      <div className="rr-phones">
        {['customer', 'driver'].map((role) => (
          <div key={role} className="rr-phone">
            <span className="rr-role">{role === 'customer' ? 'Customer app' : 'Driver app'}</span>
            <div key={step} className="rr-screen">
              <RoroScreen step={step} role={role} />
            </div>
          </div>
        ))}
      </div>
      <div className="rr-steps" role="tablist" aria-label="App steps">
        {RORO.map(([c, d], i) => (
          <button key={c} type="button" role="tab" aria-selected={step === i} onClick={() => (setStep(i), setAuto(false))}>
            <span>{i + 1}</span>
            <b>{c}</b>
            <small>Driver: {d}</small>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Management software dashboard ---------------- */
const MODS = [
  ['Company', Building2, [['Staff', '248'], ['Branches', '6'], ['Approvals', '12']], [40, 55, 48, 62, 70, 66, 74, 80, 77, 85, 90, 94], ['HR policy update · approved', 'New branch · Penang', 'Leave request · Sarah']],
  ['Trips', Plane, [['Trips today', '36'], ['On time', '97%'], ['Seats sold', '1,204']], [30, 42, 38, 55, 61, 58, 72, 69, 80, 76, 88, 92], ['KL → Langkawi · boarding', 'Island tour · 12 guests', 'Driver swap · Bus 4']],
  ['Fintech', Wallet, [['Volume', 'RM 1.2M'], ['Invoices', '3,410'], ['Overdue', '2%']], [50, 46, 58, 63, 60, 71, 69, 78, 82, 79, 88, 96], ['Payout batch · sent', 'Invoice #8841 · paid', 'Refund · RM 120']],
  ['Healthcare', HeartPulse, [['Patients', '5,960'], ['Visits today', '142'], ['No-shows', '3%']], [35, 40, 52, 49, 57, 63, 60, 68, 72, 70, 79, 84], ['Dr. Lee · 14 visits', 'Lab results · ready', 'Reminder SMS · sent']],
  ['Wellness', Leaf, [['Products', '312'], ['Orders', '1,887'], ['Low stock', '4']], [44, 52, 49, 60, 58, 66, 74, 70, 81, 86, 84, 93], ['Collagen drink · restock', 'Distributor · Johor', 'Order #2231 · shipped']],
]

export function DashboardDemo() {
  const ref = useRef(null)
  const [m, setM] = useState(0)
  const [auto, setAuto] = useState(true)
  useTick(ref, 3600, () => setM((x) => (x + 1) % MODS.length), auto)
  const [name, , kpis, bars, rows] = MODS[m]
  return (
    <div ref={ref} className="db">
      <aside className="db-side" role="tablist" aria-label="Modules">
        <span className="db-logo">admin</span>
        {MODS.map(([n, Ico], i) => (
          <button key={n} type="button" role="tab" aria-selected={m === i} onClick={() => (setM(i), setAuto(false))}>
            <Ico className="h-4 w-4" />
            <span>{n}</span>
          </button>
        ))}
      </aside>
      <div key={m} className="db-main">
        <p className="db-title">{name} overview</p>
        <div className="db-kpis">
          {kpis.map(([k, v]) => (
            <div key={k}>
              <small>{k}</small>
              <b>{v}</b>
            </div>
          ))}
        </div>
        <div className="db-chart" aria-hidden="true">
          {bars.map((h, i) => (
            <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 40}ms` }} />
          ))}
        </div>
        <ul className="db-rows">
          {rows.map((r) => (
            <li key={r}>
              <span />
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ---------------- Websites in a browser ---------------- */
const SITES = [
  ['Food brand', 'sweets-shop.my', '/projects/sultana.webp'],
  ['Boat booking', 'island-trips.my', '/projects/seaescape.webp'],
]

export function BrowserDemo() {
  const ref = useRef(null)
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  useTick(ref, 4500, () => setI((x) => (x + 1) % SITES.length), auto)
  return (
    <div ref={ref} className="br">
      <div className="br-bar">
        <span className="br-dots">
          <i />
          <i />
          <i />
        </span>
        <div className="br-tabs" role="tablist">
          {SITES.map(([t], k) => (
            <button key={t} type="button" role="tab" aria-selected={i === k} onClick={() => (setI(k), setAuto(false))}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <p className="br-url">🔒 {SITES[i][1]}</p>
      <div className="br-view">
        <img key={i} src={SITES[i][2]} alt={`${SITES[i][0]} website we built`} loading="lazy" />
        <span className="br-badge">⚡ Loads in under 1s · mobile-first</span>
      </div>
    </div>
  )
}

/* ---------------- AI models: tracking + skin analysis ---------------- */
export function VisionDemo() {
  const v = useRef(null)
  const [conf, setConf] = useState(97.4)
  useTick(v, 700, () => setConf(95 + Math.random() * 4.5))
  useEffect(() => {
    const el = v.current
    if (!el || REDUCE) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div className="vz">
      <div className="vz-cam">
        <video ref={v} src="/projects/target-locker.webm" poster="/projects/target-locker.jpg" muted loop playsInline preload="none" aria-label="Object tracking demo from a drone" />
        <span className="vz-scan" />
        <span className="vz-corner tl" />
        <span className="vz-corner tr" />
        <span className="vz-corner bl" />
        <span className="vz-corner br" />
        <span className="vz-tag">● LOCKED · object #1</span>
        <span className="vz-stat">
          conf {conf.toFixed(1)}% · 30 fps
        </span>
      </div>
      <div className="vz-skin">
        <Photo src={IMG.skincare} alt="Face photo used for skin analysis" sizes="(min-width: 1024px) 30vw, 90vw" />
        <span className="vz-mesh" />
        <ul>
          {[
            ['Hydration', 82],
            ['Redness', 24],
            ['Texture', 67],
            ['Pores', 41],
          ].map(([k, n], i) => (
            <li key={k} style={{ '--n': `${n}%`, '--i': i }}>
              <span>{k}</span>
              <i />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ---------------- API integration flow ---------------- */
const NODES = [
  ['Online shop', 40, 50],
  ['Courier', 330, 20],
  ['SMS', 330, 95],
  ['Accounting', 330, 170],
]
const LOG = ['order #1048 → courier booked · 142 ms', 'order #1048 → SMS sent · 88 ms', 'invoice #1048 → accounting · 210 ms', 'order #1049 → courier booked · 131 ms', 'stock synced · 61 ms', 'order #1049 → SMS sent · 92 ms']

export function FlowDemo() {
  const ref = useRef(null)
  const [n, setN] = useState(3)
  useTick(ref, 1400, () => setN((x) => x + 1))
  return (
    <div ref={ref} className="fl">
      <svg viewBox="0 0 440 210" className="fl-svg" aria-hidden="true">
        {NODES.slice(1).map(([, x, y], i) => (
          <g key={i}>
            <path id={`fl${i}`} d={`M120 105 C 220 105, 220 ${y + 15}, ${x} ${y + 15}`} fill="none" stroke="#ffffff22" strokeWidth="2" />
            <path d={`M120 105 C 220 105, 220 ${y + 15}, ${x} ${y + 15}`} fill="none" stroke="url(#flg)" strokeWidth="2" className="fl-run" style={{ animationDelay: `${i * 0.4}s` }} />
            {!REDUCE && (
              <circle r="4" fill="#8ea2ff">
                <animateMotion dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite">
                  <mpath href={`#fl${i}`} />
                </animateMotion>
              </circle>
            )}
          </g>
        ))}
        <defs>
          <linearGradient id="flg">
            <stop offset="0" stopColor="#3054ff" />
            <stop offset="1" stopColor="#a068ff" />
          </linearGradient>
        </defs>
      </svg>
      <span className="fl-node fl-src" style={{ left: '2%', top: '38%' }}>
        🛒 Online shop
      </span>
      <span className="fl-hub">NIMTECH bridge</span>
      {NODES.slice(1).map(([t, , y]) => (
        <span key={t} className="fl-node" style={{ right: '2%', top: `${(y / 210) * 100}%` }}>
          {t === 'Courier' ? '🚚' : t === 'SMS' ? '💬' : '📒'} {t}
        </span>
      ))}
      <ul className="fl-log" aria-live="off">
        {[0, 1, 2].map((k) => (
          <li key={n - k}>
            <Check className="h-3.5 w-3.5 text-emerald-400" /> {LOG[(n - k) % LOG.length]}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const DEMOS = {
  software: DashboardDemo,
  apps: RoroDemo,
  'api-integration': FlowDemo,
  websites: BrowserDemo,
  'ai-models': VisionDemo,
  'ai-agents': WhatsAppDemo,
}
