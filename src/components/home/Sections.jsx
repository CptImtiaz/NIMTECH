import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Eye, KeyRound, LifeBuoy, ShieldCheck, Users, Zap } from 'lucide-react'
import { DashboardDemo, RoroDemo, BrowserDemo, VisionDemo, FlowDemo, WhatsAppDemo } from '../demos.jsx'

/* ---------------- Live demos in tabs ---------------- */
const LAB = [
  ['software', 'Management software', DashboardDemo, 'Company, trips, fintech, healthcare and wellness, each a module in one admin.'],
  ['apps', 'Mobile apps', RoroDemo, 'A RoRo bin app: the customer orders a bin, a driver accepts, delivers and collects it.'],
  ['websites', 'Websites', BrowserDemo, 'Brand and booking sites that load fast and sell from the phone.'],
  ['ai-models', 'AI models', VisionDemo, 'Object tracking in video and skin analysis from one photo.'],
  ['api-integration', 'Integrations', FlowDemo, 'Orders flow from the shop to the courier, SMS and accounting on their own.'],
]

export function DemoLab() {
  const [i, setI] = useState(0)
  const [id, label, Demo, note] = LAB[i]
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="lab-glow" aria-hidden="true" />
      <div className="wrap relative">
        <div className="text-center">
          <span className="eyebrow rise text-white/70">Live demos</span>
          <h2 className="h2 rise mx-auto mt-5 max-w-[18ch]" style={{ '--d': '.06s' }}>
            Don’t imagine it. <em className="grad-text">Try it.</em>
          </h2>
          <p className="rise mx-auto mt-5 max-w-[52ch] text-[17px] text-white/60" style={{ '--d': '.12s' }}>
            Click through working samples of what we build. Everything here is interactive.
          </p>
        </div>
        <div className="rise mt-10 flex justify-center" style={{ '--d': '.16s' }}>
          <div className="seg" role="tablist" aria-label="Demos">
            {LAB.map(([k, l], j) => (
              <button key={k} type="button" role="tab" aria-selected={i === j} onClick={() => setI(j)}>
                {i === j && <motion.span layoutId="seg" className="seg-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="relative">{l}</span>
              </button>
            ))}
          </div>
        </div>
        <div key={id} className="lab-stage mt-10">
          <Demo />
        </div>
        <p className="mt-8 text-center text-[15px] text-white/55">
          {note}{' '}
          <Link to={`/services/${id}`} className="font-medium text-[#8ea2ff] hover:text-white">
            {label} →
          </Link>
        </p>
      </div>
    </section>
  )
}

/* ---------------- WhatsApp agent ---------------- */
export function AgentSpot() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="agent-glow" aria-hidden="true" />
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <span className="eyebrow rise text-white/70">AI agents</span>
          <h2 className="h2 rise mt-5" style={{ '--d': '.06s' }}>
            Your WhatsApp, <em className="grad-text">answered in seconds.</em>
          </h2>
          <p className="rise mt-6 max-w-[46ch] text-[17px] leading-relaxed text-white/65" style={{ '--d': '.12s' }}>
            An AI agent replies to customers day and night: prices, delivery, bookings and orders. When a question needs a person, it hands over with the full chat.
          </p>
          <ul className="rise mt-8 grid gap-3 text-[15px] text-white/80" style={{ '--d': '.18s' }}>
            {['Replies in your tone, in any language', 'Takes orders and bookings into your system', 'Hands tricky chats to your team'].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#25d366]/15 text-[#25d366]">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <Link to="/services/ai-agents" className="rise hx-ghost mt-10 inline-flex" style={{ '--d': '.24s' }}>
            AI agent development <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="rise" style={{ '--d': '.1s' }}>
          <WhatsAppDemo />
        </div>
      </div>
    </section>
  )
}

/* ---------------- Process with a scroll-driven line ---------------- */
const STEPS = [
  ['Discover', 'Week 1', 'A short call and a workshop. We agree the goal and the number that proves it worked.'],
  ['Design', 'Week 2', 'A clickable prototype you can try on your phone before we write code.'],
  ['Build', 'Weeks 3+', 'Two-week sprints. You see a working demo every time and decide what comes next.'],
  ['Launch and grow', 'Go live', 'We launch, train your team, watch the numbers and keep improving.'],
]

export function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return (
    <section ref={ref} className="py-24 md:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-[.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow rise text-white/70">How we work</span>
          <h2 className="h2 rise mt-5" style={{ '--d': '.06s' }}>
            From idea to launch, <em className="grad-text">no surprises.</em>
          </h2>
          <p className="rise mt-6 max-w-[40ch] text-[17px] text-white/60" style={{ '--d': '.12s' }}>
            Four clear stages, one team, and a working demo every two weeks.
          </p>
        </div>
        <ol className="relative pl-10">
          <span className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px bg-white/10" aria-hidden="true" />
          <motion.span style={{ height: h }} className="absolute left-[11px] top-2 w-px bg-gradient-to-b from-[#3054ff] via-[#a068ff] to-[#25d3a0]" aria-hidden="true" />
          {STEPS.map(([t, w, d], i) => (
            <li key={t} className="rise relative pb-16 last:pb-0" style={{ '--d': `${i * 0.06}s` }}>
              <span className="proc-dot" />
              <p className="text-sm font-medium text-[#8ea2ff]">{w}</p>
              <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">{t}</h3>
              <p className="mt-3 max-w-[46ch] text-[17px] leading-relaxed text-white/60">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------------- Why us bento ---------------- */
const WHY = [
  [Users, 'Senior team only', 'The people you meet are the people who build.', 'lg:col-span-2'],
  [Eye, 'Demo every two weeks', 'Always know where things stand.', ''],
  [KeyRound, 'You own everything', 'Code, models, data and accounts.', ''],
  [ShieldCheck, 'Secure by default', 'Roles, encryption and audit logs from day one.', ''],
  [Zap, 'Fast and light', 'Pages and apps that load in a blink.', ''],
  [LifeBuoy, 'Support after launch', 'We stay to fix, improve and grow it.', 'lg:col-span-2'],
]

export function WhyBento() {
  return (
    <section className="py-24 md:py-36">
      <div className="wrap">
        <span className="eyebrow rise text-white/70">Why NIMTECH</span>
        <h2 className="h2 rise mt-5 max-w-[18ch]" style={{ '--d': '.06s' }}>
          Simple to start. <em className="grad-text">Built to last.</em>
        </h2>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map(([Ico, t, d, span], i) => (
            <li key={t} className={`glass-card spot rise ${span}`} style={{ '--d': `${(i % 4) * 0.06}s` }}>
              <span className="icon-orb">
                <Ico className="h-5 w-5" />
              </span>
              <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight">{t}</h3>
              <p className="mt-2 text-[16px] text-white/60">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
