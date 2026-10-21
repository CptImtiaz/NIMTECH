import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ORDER, SERVICES } from '../../data/services.js'
import { openRequest } from '../../lib/bus.js'
import Orb from '../Orb.jsx'
import { Eyebrow, Label, Lines, Pill, Words } from '../ui.jsx'

/* ---------------- 3D sphere art per service ---------------- */
// [left%, top%, size%, glass]
const ARTS = [
  [[50, 50, 46, 0], [24, 30, 20, 1], [78, 70, 24, 0], [80, 24, 12, 0], [22, 76, 14, 1]],
  [[42, 46, 40, 1], [72, 36, 28, 0], [66, 76, 18, 0], [20, 72, 16, 0], [24, 22, 10, 1]],
  [[30, 50, 30, 0], [70, 50, 30, 1], [50, 22, 14, 0], [50, 80, 16, 0], [86, 18, 9, 0]],
  [[56, 50, 50, 0], [22, 32, 18, 1], [24, 74, 12, 0], [86, 80, 14, 1], [84, 20, 10, 0]],
  [[50, 48, 34, 1], [26, 28, 18, 0], [76, 30, 22, 0], [30, 76, 20, 0], [74, 76, 16, 1]],
  [[48, 52, 42, 0], [80, 44, 24, 1], [20, 40, 18, 0], [64, 18, 12, 0], [30, 82, 12, 1]],
]

export function SphereArt({ i = 0, color, className = '' }) {
  return (
    <div className={`sphere-art ${className}`} aria-hidden="true">
      {ARTS[i % ARTS.length].map(([x, y, s, g], k) => (
        <Orb key={k} color={color} glass={!!g} className="sphere-art-orb" style={{ left: `${x}%`, top: `${y}%`, width: `${s}%`, '--k': k, '--z': (k % 3) + 1 }} />
      ))}
    </div>
  )
}

/* ---------------- About statement ---------------- */
export function AboutStatement() {
  return (
    <section id="about" className="bg-white">
      <div className="wrap grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div className="relative min-h-[16rem] lg:min-h-[22rem]">
          <SphereArt i={0} color="#2F69FF" className="absolute inset-0 m-auto max-w-[24rem]" />
          <Eyebrow className="relative">The Studio</Eyebrow>
        </div>
        <div className="flex flex-col gap-10">
          <Words className="font-display text-2xl font-medium leading-[1.35] tracking-[-0.01em] sm:text-[1.875rem]">
            We partner with growing businesses to ship{' '}
            <span className="text-[#8d8d8d]">software, mobile apps, websites, integrations, AI models and AI agents, built by one senior team.</span>
          </Words>
          <div className="rise flex flex-wrap items-end justify-between gap-6 border-t border-[#e6e5e2] pt-6" style={{ '--d': '.2s' }}>
            <div>
              <p className="text-sm text-neutral-500">Six services, one team</p>
              <div className="mt-3 flex gap-2">
                {ORDER.map((id) => (
                  <Link key={id} to={`/services/${id}`} className="social-chip" aria-label={SERVICES[id].name}>
                    <Orb color={SERVICES[id].color} className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
            <Pill variant="outline" arrow="right" to="/about">
              About us
            </Pill>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- We / Build / → / Better ---------------- */
export function CreateBand() {
  const tiles = [
    ['We', 'bg-[#f1f0ee] text-[#111]'],
    ['Build', 'bg-gradient-to-br from-[#5175ff] to-[#0e2ac5] text-white'],
    [null, 'bg-[#0a0a0a] text-white'],
    ['Better', 'bg-[#f1f0ee]/60 text-[#111]/35'],
  ]
  return (
    <section className="bg-white">
      <ul className="wrap flex flex-col gap-3 py-10 sm:flex-row sm:gap-4">
        {tiles.map(([w, cls], i) => (
          <li key={i} className="rise flex-1" style={{ '--d': `${i * 0.12}s` }}>
            <span className={`band-tile ${cls}`}>{w || <ArrowRight className="h-9 w-9 sm:h-12 sm:w-12" />}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ---------------- Service cards (all six) ---------------- */
export function ServiceCards({ title = 'Everything we build' }) {
  return (
    <section id="services" className="bg-white">
      <div className="wrap pb-20 pt-10 lg:pb-28">
        <div className="text-center">
          <Eyebrow className="rise rounded-full border border-[#e6e5e2] px-4 py-1.5">Services</Eyebrow>
          <Lines lines={[title]} className="h-section mx-auto mt-6 w-fit" />
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ORDER.map((id, i) => {
            const s = SERVICES[id]
            return (
              <li key={id} className="rise" style={{ '--d': `${(i % 3) * 0.09}s` }}>
                <Link to={`/services/${id}`} className="svc-card spot group" style={{ '--c': s.color }}>
                  <div className="flex items-start justify-between text-xs uppercase tracking-[0.04em] text-white/45">
                    <span>0{i + 1} — {s.short}</span>
                    <span className="svc-badge">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                  <SphereArt i={i} color={s.color} className="svc-art" />
                  <div className="relative">
                    <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.75rem]">{s.name}</h3>
                    <p className="mt-2 max-w-[28rem] text-sm text-white/55">{s.tagline}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {s.tags.slice(0, 3).map((t) => (
                        <li key={t} className="tag-light">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ---------------- What we solve: hover-fill rows ---------------- */
const SOLVE = [
  ['Management systems', 'Company, trips, finance, healthcare and products in one admin.', 'software'],
  ['Booking and ordering websites', 'Customers book, order and pay from their phone.', 'websites'],
  ['On-demand apps', 'Customer and partner apps with live tracking.', 'apps'],
  ['Shop and courier automation', 'Orders, couriers, SMS and accounts connected.', 'api-integration'],
  ['Vision and image AI', 'Track objects, analyse photos, read documents.', 'ai-models'],
  ['WhatsApp auto-reply agents', 'Instant answers and orders, 24/7.', 'ai-agents'],
]

export function SolveRows() {
  return (
    <section className="bg-white">
      <div className="wrap py-20 lg:py-28">
        <Eyebrow className="rise">What we solve</Eyebrow>
        <Lines lines={['Problems we fix best']} className="h-section mb-12 mt-5 max-w-[16ch] sm:mb-14" />
        <ul>
          {SOLVE.map(([t, d, id], i) => (
            <li key={t} className="rise border-t border-[#e6e5e2] first:border-t-0" style={{ '--d': `${i * 0.08}s` }}>
              <Link to={`/services/${id}`} className="solve-row group">
                <span className="w-7 text-sm font-medium text-neutral-400 sm:w-10">0{i + 1}</span>
                <h3 className="flex-1 font-display text-2xl font-medium tracking-[-0.01em] sm:text-[1.875rem] md:text-4xl">{t}</h3>
                <p className="hidden max-w-[20rem] text-sm text-neutral-500 lg:block">{d}</p>
                <span className="solve-badge" style={{ '--c': SERVICES[id].color }}>
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------- Stats with scroll count-up ---------------- */
const STATS = [
  [6, '', 'Services under one roof'],
  [2, ' wks', 'Between working demos'],
  [24, '/7', 'AI agents on duty'],
  [100, '%', 'Code and data you own'],
]

function Count({ to, suffix }) {
  const ref = useRef(null)
  const [v, setV] = useState(to)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let last = 0
    const on = () => {
      const now = performance.now()
      if (now - last < 30) return
      last = now
      const r = el.getBoundingClientRect()
      // 0 when its top hits the viewport bottom, 1 when its centre hits the centre
      const start = innerHeight
      const end = innerHeight / 2 - r.height / 2
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)))
      setV(Math.round(p * to))
    }
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [to])
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="bg-white">
      <div className="wrap pb-20 lg:pb-28">
        <div className="stats-panel rise">
          <Eyebrow light>By the numbers</Eyebrow>
          <Lines lines={['Proof in how we work,', 'not just in words.']} className="mt-4 max-w-[20ch] font-display text-3xl font-medium tracking-[-0.01em] md:text-4xl" />
          <ul className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {STATS.map(([n, s, l], i) => (
              <li key={l} className="rise" style={{ '--d': `${i * 0.09}s` }}>
                <p className="font-display text-5xl font-semibold tracking-[-0.02em] sm:text-6xl md:text-7xl">
                  <Count to={n} suffix={s} />
                </p>
                <p className="mt-3 text-sm text-white/55">{l}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
            <p className="max-w-[40ch] text-sm text-white/55">Tell us your idea. We’ll reply within one business day with questions and a first plan.</p>
            <Pill variant="light" arrow="up-right" onClick={() => openRequest()}>
              Start a project
            </Pill>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Label }
