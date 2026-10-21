import { useEffect, useMemo, useRef, useState } from 'react'
import { Bell, Building2, HeartPulse, Leaf, Plane, Search, Wallet, Activity, ArrowUpRight, ArrowDownRight, Cpu } from 'lucide-react'
import { REDUCE } from '../lib/canvas.js'

// Management software demo: a live "command centre" with modules, KPIs,
// an interactive area chart, a ring breakdown, a live activity feed and a
// records table. All numbers are generated sample data.

const MODULES = [
  {
    name: 'Company', icon: Building2, color: '#5175ff',
    kpis: [['Headcount', 248, ''], ['Open approvals', 12, ''], ['Branches', 6, ''], ['Payroll', 412, 'k']],
    series: 'Active staff', ring: [['Operations', 38], ['Sales', 24], ['Tech', 22], ['Admin', 16]],
    feed: ['Leave request approved', 'New hire onboarded', 'Policy update signed', 'Branch report filed', 'Expense claim approved'],
    rows: [['Onboarding · Ops', 'Ali R.', 'Done'], ['Contract renewal', 'Mei L.', 'Review'], ['Laptop request', 'Daniel K.', 'Pending'], ['Payroll run', 'Finance', 'Done']],
  },
  {
    name: 'Trips', icon: Plane, color: '#5ee7d0',
    kpis: [['Trips today', 36, ''], ['On time', 97, '%'], ['Seats sold', 1204, ''], ['Revenue', 86, 'k']],
    series: 'Bookings', ring: [['Day tours', 42], ['Transfers', 27], ['Private', 19], ['Groups', 12]],
    feed: ['Booking confirmed · 4 guests', 'Driver checked in', 'Morning tour boarded', 'Refund processed', 'Vehicle swapped · Bus 4'],
    rows: [['Island tour', '12 guests', 'Boarding'], ['Airport transfer', '2 guests', 'Done'], ['Private charter', '6 guests', 'Review'], ['City tour', '18 guests', 'Pending']],
  },
  {
    name: 'Fintech', icon: Wallet, color: '#e1fc03',
    kpis: [['Volume', 1.2, 'M'], ['Invoices', 3410, ''], ['Overdue', 2, '%'], ['Payouts', 318, '']],
    series: 'Payment volume', ring: [['Cards', 46], ['Bank', 28], ['Wallet', 18], ['Other', 8]],
    feed: ['Payout batch sent', 'Invoice #8841 paid', 'Refund RM 120 issued', 'Reconciliation matched', 'Wallet top-up received'],
    rows: [['INV-8841', 'RM 2,400', 'Done'], ['INV-8842', 'RM 980', 'Pending'], ['Payout #312', 'RM 18,200', 'Review'], ['INV-8843', 'RM 1,150', 'Done']],
  },
  {
    name: 'Healthcare', icon: HeartPulse, color: '#ff8fa3',
    kpis: [['Patients', 5960, ''], ['Visits today', 142, ''], ['No-shows', 3, '%'], ['Avg wait', 11, 'm']],
    series: 'Visits', ring: [['General', 44], ['Dental', 21], ['Lab', 20], ['Specialist', 15]],
    feed: ['Lab results ready', 'Reminder SMS sent', 'Visit checked in', 'Prescription signed', 'Follow-up booked'],
    rows: [['Dr. Tan · General', '14 visits', 'Done'], ['Lab batch 22', '38 tests', 'Review'], ['Dental · Room 2', '6 visits', 'Boarding'], ['Telehealth', '9 calls', 'Pending']],
  },
  {
    name: 'Wellness', icon: Leaf, color: '#a068ff',
    kpis: [['Products', 312, ''], ['Orders', 1887, ''], ['Low stock', 4, ''], ['Repeat buyers', 61, '%']],
    series: 'Orders', ring: [['Supplements', 39], ['Skincare', 31], ['Drinks', 19], ['Bundles', 11]],
    feed: ['Order shipped', 'Distributor restocked', 'Low stock alert · Collagen', 'New reseller approved', 'Bundle promo live'],
    rows: [['Collagen drink', '120 units', 'Pending'], ['Vitamin C serum', '840 units', 'Done'], ['Distributor · Johor', '3 orders', 'Review'], ['Detox bundle', '62 units', 'Done']],
  },
]
const RANGES = [['7D', 7], ['30D', 30], ['12M', 12]]

// deterministic pseudo-random so each module/range always looks the same
function seeded(seed) {
  let s = seed
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280)
}
function makeSeries(m, r) {
  const rnd = seeded(m * 97 + r * 13 + 7)
  const n = r === 7 ? 7 : r === 30 ? 30 : 12
  let v = 40 + rnd() * 10
  const a = []
  const b = []
  for (let i = 0; i < n; i++) {
    v += (rnd() - 0.35) * 9
    a.push(Math.max(8, v))
    b.push(Math.max(6, v * (0.72 + rnd() * 0.15)))
  }
  return [a, b]
}
const path = (pts, w, h, max) =>
  pts
    .map((v, i) => {
      const x = (i / (pts.length - 1)) * w
      const y = h - (v / max) * h
      return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')

function useCount(to, key) {
  const [v, setV] = useState(to)
  useEffect(() => {
    if (REDUCE) return setV(to)
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / 900)
      setV(to * (1 - Math.pow(1 - k, 3)))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, key])
  return v
}

function Kpi({ k, v, suf, delta, spark, color, mkey }) {
  const n = useCount(v, mkey)
  const shown = v % 1 ? n.toFixed(1) : Math.round(n).toLocaleString('en')
  const up = delta >= 0
  const max = Math.max(...spark)
  return (
    <div className="dx-kpi">
      <p className="dx-kpi-k">{k}</p>
      <p className="dx-kpi-v">
        {shown}
        <small>{suf}</small>
      </p>
      <div className="flex items-center justify-between">
        <span className={`dx-delta ${up ? 'up' : 'down'}`}>
          {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(delta).toFixed(1)}%
        </span>
        <svg viewBox="0 0 60 20" className="h-5 w-16" aria-hidden="true">
          <path d={path(spark, 60, 18, max)} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

export default function DashboardDemo() {
  const ref = useRef(null)
  const [m, setM] = useState(0)
  const [r, setR] = useState(1)
  const [hover, setHover] = useState(null)
  const [feed, setFeed] = useState([])
  const [auto, setAuto] = useState(true)
  const mod = MODULES[m]
  const [cur, prev] = useMemo(() => makeSeries(m, RANGES[r][1]), [m, r])
  const max = Math.max(...cur, ...prev) * 1.15
  const W = 560
  const H = 180

  // auto-tour modules until the visitor interacts; live feed ticks
  useEffect(() => {
    const el = ref.current
    if (!el || REDUCE) return
    let tour, live, on = false
    const io = new IntersectionObserver(([e]) => (on = e.isIntersecting))
    io.observe(el)
    let k = 0
    live = setInterval(() => {
      if (!on) return
      k++
      setFeed((f) => [{ id: Date.now(), t: mod.feed[k % mod.feed.length] }, ...f].slice(0, 5))
    }, 2200)
    if (auto) tour = setInterval(() => on && setM((x) => (x + 1) % MODULES.length), 6500)
    return () => {
      io.disconnect()
      clearInterval(live)
      clearInterval(tour)
    }
  }, [m, auto, mod.feed])
  useEffect(() => setFeed(mod.feed.slice(0, 3).map((t, i) => ({ id: `${m}-${i}`, t, old: true }))), [m, mod.feed])

  const pick = (i) => {
    setM(i)
    setAuto(false)
  }
  const onMove = (e) => {
    const box = e.currentTarget.getBoundingClientRect()
    const i = Math.round(((e.clientX - box.left) / box.width) * (cur.length - 1))
    setHover(Math.max(0, Math.min(cur.length - 1, i)))
  }
  const total = mod.ring.reduce((s, [, v]) => s + v, 0)
  let acc = 0
  const Ico = mod.icon

  return (
    <div ref={ref} className="dx" style={{ '--c': mod.color }}>
      <div className="dx-grid" aria-hidden="true" />
      <header className="dx-top">
        <span className="dx-brand">
          <span className="dx-brand-dot" /> NIMTECH<b>OS</b>
        </span>
        <span className="dx-crumb">
          Workspace <i>/</i> {mod.name}
        </span>
        <span className="dx-search">
          <Search className="h-3.5 w-3.5" /> Search records… <kbd>⌘K</kbd>
        </span>
        <span className="dx-live">
          <span className="dx-pulse" /> Live
        </span>
        <span className="dx-bell">
          <Bell className="h-4 w-4" />
          <i>3</i>
        </span>
        <span className="dx-avatar">NT</span>
      </header>

      <div className="dx-body">
        <nav className="dx-side" role="tablist" aria-label="Modules">
          {MODULES.map((x, i) => {
            const I = x.icon
            return (
              <button key={x.name} type="button" role="tab" aria-selected={m === i} onClick={() => pick(i)} style={{ '--mc': x.color }}>
                <I className="h-4 w-4" />
                <span>{x.name}</span>
                <em>{x.kpis[1][1] > 99 ? '99+' : x.kpis[1][1]}</em>
              </button>
            )
          })}
          <div className="dx-sys">
            <Cpu className="h-3.5 w-3.5" />
            <span>All systems normal</span>
            <i>
              <b style={{ width: '64%' }} />
            </i>
          </div>
        </nav>

        <main key={m} className="dx-main">
          <div className="dx-head">
            <div>
              <p className="dx-kicker">
                <Ico className="h-3.5 w-3.5" /> {mod.name} module
              </p>
              <h3 className="dx-title">{mod.name} command centre</h3>
            </div>
            <div className="dx-range" role="tablist" aria-label="Range">
              {RANGES.map(([l], i) => (
                <button key={l} type="button" role="tab" aria-selected={r === i} onClick={() => setR(i)}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="dx-kpis">
            {mod.kpis.map(([k, v, suf], i) => {
              const rnd = seeded(m * 31 + i * 7 + r)
              const spark = Array.from({ length: 12 }, (_, j) => 10 + j * (0.6 + rnd()) + rnd() * 6)
              return <Kpi key={k} k={k} v={v} suf={suf} delta={(rnd() - 0.25) * 18} spark={spark} color={mod.color} mkey={`${m}-${r}`} />
            })}
          </div>

          <div className="dx-row">
            <section className="dx-card dx-chart" aria-label={`${mod.series} chart`}>
              <div className="dx-card-h">
                <p>
                  {mod.series} <span>vs previous period</span>
                </p>
                <p className="dx-legend">
                  <i style={{ background: mod.color }} /> Now <i className="dashed" /> Before
                </p>
              </div>
              <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="dx-svg" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
                <defs>
                  <linearGradient id="dx-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor={mod.color} stopOpacity=".45" />
                    <stop offset="1" stopColor={mod.color} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((g) => (
                  <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} className="dx-gridline" />
                ))}
                <path d={`${path(cur, W, H, max)} L${W} ${H} L0 ${H}Z`} fill="url(#dx-fill)" className="dx-area" />
                <path d={path(prev, W, H, max)} fill="none" className="dx-prev" />
                <path d={path(cur, W, H, max)} fill="none" stroke={mod.color} className="dx-line" pathLength="1" />
                {hover !== null && (
                  <g>
                    <line x1={(hover / (cur.length - 1)) * W} x2={(hover / (cur.length - 1)) * W} y1="0" y2={H} className="dx-cross" />
                    <circle cx={(hover / (cur.length - 1)) * W} cy={H - (cur[hover] / max) * H} r="5" fill={mod.color} stroke="#0b0d1a" strokeWidth="2" />
                  </g>
                )}
              </svg>
              {hover !== null && (
                <span className="dx-tip" style={{ left: `${(hover / (cur.length - 1)) * 100}%` }}>
                  <b>{Math.round(cur[hover] * 12).toLocaleString('en')}</b> {RANGES[r][0] === '12M' ? `month ${hover + 1}` : `day ${hover + 1}`}
                </span>
              )}
            </section>

            <section className="dx-card dx-ring" aria-label="Breakdown">
              <div className="dx-card-h">
                <p>Breakdown</p>
              </div>
              <div className="dx-ring-body">
                <svg viewBox="0 0 120 120" className="dx-donut" aria-hidden="true">
                  <circle cx="60" cy="60" r="46" className="dx-donut-bg" />
                  {mod.ring.map(([l, v], i) => {
                    const len = (v / total) * 289
                    const el = (
                      <circle
                        key={l}
                        cx="60"
                        cy="60"
                        r="46"
                        fill="none"
                        stroke={mod.color}
                        strokeOpacity={1 - i * 0.22}
                        strokeWidth="12"
                        strokeDasharray={`${len - 3} ${289 - len + 3}`}
                        strokeDashoffset={-acc}
                        className="dx-seg"
                        style={{ animationDelay: `${i * 0.12}s` }}
                      />
                    )
                    acc += len
                    return el
                  })}
                  <text x="60" y="58" textAnchor="middle" className="dx-donut-v">
                    {mod.ring[0][1]}%
                  </text>
                  <text x="60" y="73" textAnchor="middle" className="dx-donut-l">
                    {mod.ring[0][0]}
                  </text>
                </svg>
                <ul className="dx-ring-legend">
                  {mod.ring.map(([l, v], i) => (
                    <li key={l}>
                      <i style={{ background: mod.color, opacity: 1 - i * 0.22 }} />
                      {l}
                      <b>{v}%</b>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <div className="dx-row dx-row-b">
            <section className="dx-card" aria-label="Live activity">
              <div className="dx-card-h">
                <p>
                  <Activity className="mr-1 inline h-3.5 w-3.5" /> Live activity
                </p>
              </div>
              <ul className="dx-feed" aria-live="off">
                {feed.map((f, i) => (
                  <li key={f.id} className={f.old ? '' : 'new'}>
                    <span className="dx-feed-dot" />
                    {f.t}
                    <time>{i === 0 && !f.old ? 'now' : `${(i + 1) * 3}m`}</time>
                  </li>
                ))}
              </ul>
            </section>
            <section className="dx-card dx-table" aria-label="Recent records">
              <div className="dx-card-h">
                <p>Recent records</p>
              </div>
              <table>
                <tbody>
                  {mod.rows.map(([a, b, st]) => (
                    <tr key={a}>
                      <td>{a}</td>
                      <td>{b}</td>
                      <td>
                        <span className={`dx-st ${st.toLowerCase()}`}>{st}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
