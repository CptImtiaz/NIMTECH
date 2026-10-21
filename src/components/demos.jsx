import { useEffect, useRef, useState } from 'react'
import { Check, MapPin, Truck, Camera, CalendarCheck, Send } from 'lucide-react'
import { REDUCE } from '../lib/canvas.js'

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

/* ---------------- On-demand app (customer + partner) ---------------- */
const RORO = [
  ['Book a service', 'New job nearby'],
  ['Partner on the way', 'Navigate to customer'],
  ['Job done', 'Proof of completion'],
  ['Rated 5 stars', 'Paid out'],
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
          <p className="rr-h">Book a service</p>
          <div className="rr-sizes">
            {['Standard', 'Express', 'Scheduled'].map((s, i) => (
              <span key={s} className={i === 1 ? 'on' : ''}>
                <b>{s}</b>
                <small>{['Today', 'In 60 min', 'Pick a time'][i]}</small>
              </span>
            ))}
          </div>
          <p className="rr-field">
            <MapPin className="h-3.5 w-3.5" /> Your saved address
          </p>
          <span className="rr-btn">Confirm booking</span>
        </>
      )
    if (step === 1)
      return (
        <>
          <p className="rr-h">Partner on the way</p>
          <RouteMap moving />
          <p className="rr-row">
            <Truck className="h-4 w-4" /> Arriving in <b>18 min</b>
          </p>
        </>
      )
    if (step === 2)
      return (
        <>
          <p className="rr-h">Job done</p>
          <div className="rr-done">
            <Check className="h-7 w-7" />
          </div>
          <p className="rr-row">Photo proof saved · paid in app</p>
          <span className="rr-btn">Rate your partner</span>
        </>
      )
    return (
      <>
        <p className="rr-h">Thanks for rating</p>
        <div className="rr-done">
          <CalendarCheck className="h-7 w-7" />
        </div>
        <p className="rr-row">★★★★★ · Book again in one tap</p>
      </>
    )
  }
  if (step === 0)
    return (
      <>
        <p className="rr-h">New job · 2.4 km</p>
        <div className="rr-job">
          <b>Express job</b>
          <small>2.4 km away · today</small>
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
        <p className="rr-h">Proof of completion</p>
        <div className="rr-cam">
          <Camera className="h-7 w-7" />
        </div>
        <span className="rr-btn">Mark job done</span>
      </>
    )
  return (
    <>
      <p className="rr-h">Job complete</p>
      <div className="rr-done">
        <Check className="h-7 w-7" />
      </div>
      <p className="rr-row">Paid out · next job at 2pm</p>
    </>
  )
}

export function AppDemo() {
  const ref = useRef(null)
  const [step, setStep] = useState(0)
  const [auto, setAuto] = useState(true)
  useTick(ref, 3200, () => setStep((s) => (s + 1) % 4), auto)
  return (
    <div ref={ref} className="rr">
      <div className="rr-phones">
        {['customer', 'driver'].map((role) => (
          <div key={role} className="rr-phone">
            <span className="rr-role">{role === 'customer' ? 'Customer app' : 'Partner app'}</span>
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
            <small>Partner: {d}</small>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Management software dashboard ---------------- */
export { default as DashboardDemo } from './Dashboard.jsx'
import DashboardDemo from './Dashboard.jsx'

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
        <video ref={v} poster="/projects/tracking.webp" muted loop playsInline preload="none" aria-label="Object tracking model following one vehicle from a drone">
          <source src="/projects/tracking.mp4" type="video/mp4" />
          <source src="/projects/tracking.webm" type="video/webm" />
        </video>
        <span className="vz-scan" />
        <span className="vz-corner c-tl" />
        <span className="vz-corner c-tr" />
        <span className="vz-corner c-bl" />
        <span className="vz-corner c-br" />
        <span className="vz-stat">
          conf {conf.toFixed(1)}% · 30 fps
        </span>
      </div>
      <SkinScanner />
    </div>
  )
}

// Skin analysis on the visitor's own camera. Frames are measured in the
// browser (nothing is uploaded): redness from the red-green balance, shine
// from specular highlights, texture from local contrast, evenness from the
// spread of brightness, all in the centre of the frame.
const SKIN_DEFAULT = [['Hydration', 82], ['Redness', 24], ['Texture', 67], ['Evenness', 74]]

function measure(ctx, w, h) {
  const d = ctx.getImageData(0, 0, w, h).data
  let red = 0, shine = 0, lum = 0, lum2 = 0, edge = 0, n = 0
  const L = new Float32Array(w * h)
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const k = (y * w + x) * 4
      const r = d[k], g = d[k + 1], b = d[k + 2]
      const l = 0.299 * r + 0.587 * g + 0.114 * b
      L[y * w + x] = l
      red += Math.max(0, r - g) / 255
      if (l > 225) shine++
      lum += l
      lum2 += l * l
      n++
    }
  for (let y = 1; y < h - 1; y++)
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x
      edge += Math.abs(L[i] - L[i - 1]) + Math.abs(L[i] - L[i - w])
    }
  const mean = lum / n
  const sd = Math.sqrt(Math.max(0, lum2 / n - mean * mean))
  const pct = (v) => Math.round(Math.max(4, Math.min(96, v)))
  return [
    ['Hydration', pct(100 - (shine / n) * 900 - sd * 0.15)],
    ['Redness', pct((red / n) * 260)],
    ['Texture', pct(100 - (edge / n) * 4)],
    ['Evenness', pct(100 - sd * 0.9)],
  ]
}

function SkinScanner() {
  const video = useRef(null)
  const canvas = useRef(null)
  const stream = useRef(null)
  const [state, setState] = useState('idle') // idle | asking | live | denied
  const [vals, setVals] = useState(SKIN_DEFAULT)

  const stop = () => {
    stream.current?.getTracks().forEach((t) => t.stop())
    stream.current = null
    setState('idle')
    setVals(SKIN_DEFAULT)
  }
  const start = async () => {
    if (!navigator.mediaDevices?.getUserMedia) return setState('denied')
    setState('asking')
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }, audio: false })
      stream.current = s
      video.current.srcObject = s
      await video.current.play().catch(() => {})
      setState('live')
    } catch {
      setState('denied')
    }
  }
  useEffect(() => () => stream.current?.getTracks().forEach((t) => t.stop()), [])
  useEffect(() => {
    if (state !== 'live') return
    const c = canvas.current
    const ctx = c.getContext('2d', { willReadFrequently: true })
    const t = setInterval(() => {
      const vd = video.current
      if (!vd || vd.readyState < 2) return
      const S = 64
      const sw = vd.videoWidth * 0.36, sh = vd.videoHeight * 0.5
      ctx.drawImage(vd, (vd.videoWidth - sw) / 2, vd.videoHeight * 0.2, sw, sh, 0, 0, S, S)
      const next = measure(ctx, S, S)
      setVals((prev) => prev.map(([k, p], i) => [k, Math.round(p + (next[i][1] - p) * 0.35)]))
    }, 450)
    return () => clearInterval(t)
  }, [state])

  const live = state === 'live'
  return (
    <div className="vz-skin">
      <SkinVisual hidden={live} />
      <video ref={video} muted playsInline className={`vz-video ${live ? 'on' : ''}`} aria-label="Your camera preview" />
      <canvas ref={canvas} width="64" height="64" hidden />
      {live && <span className="vz-oval" aria-hidden="true" />}
      <span className="vz-mesh" />
      <div className="vz-top">
        <span className="vz-pill">{live ? '● Live · on your device' : 'Skin analysis AI'}</span>
        {live ? (
          <button type="button" onClick={stop} className="vz-btn">
            Stop camera
          </button>
        ) : (
          <button type="button" onClick={start} className="vz-btn" disabled={state === 'asking'}>
            {state === 'asking' ? 'Starting…' : state === 'denied' ? 'Camera blocked · retry' : 'Scan with my camera'}
          </button>
        )}
      </div>
      <ul aria-live="polite">
        {vals.map(([k, n], i) => (
          <li key={k} style={{ '--n': `${n}%`, '--i': i }}>
            <span>{k}</span>
            <i />
            <b>{n}</b>
          </li>
        ))}
      </ul>
      <p className="vz-note">Demo only, not medical advice. Video never leaves your device.</p>
    </div>
  )
}

// Futuristic face-scan illustration: a 3D-lit head built from a point mesh
// with heat zones on the cheeks and T-zone.
function SkinVisual({ hidden }) {
  const pts = []
  for (let y = 0; y < 24; y++)
    for (let x = 0; x < 18; x++) {
      const px = 60 + x * 10, py = 40 + y * 10
      const dx = (px - 145) / 78, dy = (py - 150) / 104
      if (dx * dx + dy * dy < 1) pts.push([px + (y % 2) * 5, py, 0.35 + 0.65 * (1 - (dx * dx + dy * dy))])
    }
  return (
    <svg viewBox="0 0 290 300" className={`vz-art ${hidden ? 'off' : ''}`} aria-label="Face scan illustration" role="img">
      <defs>
        <radialGradient id="sk-face" cx="0.42" cy="0.38" r="0.7">
          <stop offset="0" stopColor="#ffe3da" />
          <stop offset="0.55" stopColor="#f2a7a0" />
          <stop offset="1" stopColor="#5a2440" />
        </radialGradient>
        <radialGradient id="sk-heat" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff4d6d" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ff4d6d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sk-oil" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e1fc03" stopOpacity="0.6" />
          <stop offset="1" stopColor="#e1fc03" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sk-line" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#5ee7d0" stopOpacity="0" />
          <stop offset="0.5" stopColor="#5ee7d0" />
          <stop offset="1" stopColor="#5ee7d0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="145" cy="150" rx="82" ry="108" fill="url(#sk-face)" />
      <ellipse cx="108" cy="172" rx="28" ry="20" fill="url(#sk-heat)" />
      <ellipse cx="182" cy="172" rx="28" ry="20" fill="url(#sk-heat)" />
      <ellipse cx="145" cy="92" rx="40" ry="22" fill="url(#sk-oil)" />
      <ellipse cx="145" cy="150" rx="12" ry="34" fill="url(#sk-oil)" />
      <g fill="#ffffff">
        {pts.map(([x, y, o], i) => (
          <circle key={i} cx={x} cy={y} r="1.3" opacity={o * 0.8} />
        ))}
      </g>
      <g fill="none" stroke="#ffffff" strokeOpacity=".35" strokeWidth=".8">
        <path d="M100 135h30M160 135h30M145 120v52M120 205q25 14 50 0" />
        <ellipse cx="145" cy="150" rx="60" ry="84" />
        <ellipse cx="145" cy="150" rx="34" ry="96" />
      </g>
      <rect className="vz-sweep" x="55" y="40" width="180" height="6" fill="url(#sk-line)" />
      <g fill="none" stroke="#5ee7d0" strokeWidth="1.4">
        <circle cx="108" cy="172" r="16" strokeDasharray="3 4" />
        <circle cx="145" cy="92" r="14" strokeDasharray="3 4" />
      </g>
      <g fontFamily="monospace" fontSize="8" fill="#5ee7d0">
        <text x="196" y="96">T-ZONE · SHINE</text>
        <text x="20" y="200">CHEEK · REDNESS</text>
      </g>
    </svg>
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
  apps: AppDemo,
  'api-integration': FlowDemo,
  websites: BrowserDemo,
  'ai-models': VisionDemo,
  'ai-agents': WhatsAppDemo,
}
