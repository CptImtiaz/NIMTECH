import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Eye, KeyRound, LifeBuoy, ShieldCheck, Users, Zap } from 'lucide-react'
import { SERVICES } from '../../data/services.js'
import { DashboardDemo, AppDemo, BrowserDemo, VisionDemo, FlowDemo, WhatsAppDemo } from '../demos.jsx'
import Orb from '../Orb.jsx'
import { Eyebrow, Label, Lines, Pill } from '../ui.jsx'

/* ---------------- Live demos in tabs ---------------- */
const LAB = [
  ['software', 'Software', DashboardDemo],
  ['apps', 'Mobile apps', AppDemo],
  ['websites', 'Websites', BrowserDemo],
  ['api-integration', 'Integration', FlowDemo],
  ['ai-models', 'AI models', VisionDemo],
  ['ai-agents', 'AI agents', WhatsAppDemo],
]

export function DemoLab() {
  const [i, setI] = useState(0)
  const [id, , Demo] = LAB[i]
  return (
    <section className="bg-white">
      <div className="wrap pb-20 lg:pb-28">
        <div className="lab rise">
          <div className="lab-glow" style={{ '--c': SERVICES[id].color }} aria-hidden="true" />
          <div className="relative text-center">
            <Eyebrow light>Live demos</Eyebrow>
            <Lines lines={['Don’t imagine it.', 'Try it.']} className="h-section mx-auto mt-5 text-white" />
            <p className="mx-auto mt-4 max-w-[46ch] text-[16px] text-white/55">Six interactive samples, one for each service. Click around, everything here responds.</p>
          </div>
          <div className="relative mt-10 flex justify-center">
            <div className="seg" role="tablist" aria-label="Demos">
              {LAB.map(([k, l], j) => (
                <button key={k} type="button" role="tab" aria-selected={i === j} onClick={() => setI(j)}>
                  {i === j && <motion.span layoutId="seg" className="seg-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <span className="relative inline-flex items-center gap-2">
                    <Orb color={SERVICES[k].color} className="h-3 w-3" />
                    {l}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div key={id} className="lab-stage relative mt-10">
            <Demo />
          </div>
          <div className="relative mt-10 flex justify-center">
            <Pill variant="light" arrow="up-right" to={`/services/${id}`}>
              {SERVICES[id].name}
            </Pill>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- WhatsApp agent ---------------- */
export function AgentSpot() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <Label>AI agents</Label>
          <Lines lines={['Your WhatsApp,', 'answered in seconds.']} className="h-section mt-6" />
          <p className="rise mt-6 max-w-[46ch] text-[17px] leading-relaxed text-neutral-600" style={{ '--d': '.12s' }}>
            An AI agent replies to customers day and night: prices, delivery, bookings and orders. When a question needs a person, it hands over with the full chat.
          </p>
          <ul className="rise mt-8 grid gap-3 text-[15px] text-neutral-800" style={{ '--d': '.18s' }}>
            {['Replies in your tone, in any language', 'Takes orders and bookings into your system', 'Hands tricky chats to your team'].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#25d366]/15 text-[#128c4a]">✓</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rise dark-stage" style={{ '--d': '.1s' }}>
          <WhatsAppDemo />
        </div>
      </div>
    </section>
  )
}

/* ---------------- Process with a scroll-drawn line ---------------- */
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
    <section ref={ref} className="bg-white py-24 md:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Label>How we work</Label>
          <Lines lines={['From idea to launch,', 'no surprises.']} className="h-section mt-6" />
        </div>
        <ol className="relative pl-10">
          <span className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px bg-[#e6e5e2]" aria-hidden="true" />
          <motion.span style={{ height: h }} className="absolute left-[11px] top-2 w-px bg-linear-to-b from-[#2f69ff] via-[#a068ff] to-[#ff4d6d]" aria-hidden="true" />
          {STEPS.map(([t, w, d], i) => (
            <li key={t} className="rise relative pb-16 last:pb-0" style={{ '--d': `${i * 0.06}s` }}>
              <span className="proc-dot" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0E2AC5]">{w}</p>
              <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">{t}</h3>
              <p className="mt-3 max-w-[46ch] text-[17px] leading-relaxed text-neutral-600">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------------- Why us bento ---------------- */
const WHY = [
  [Users, 'Senior team only', 'The people you meet are the people who build.', 'lg:col-span-2', '#2F69FF'],
  [Eye, 'Demo every two weeks', 'Always know where things stand.', '', '#E1FC03'],
  [KeyRound, 'You own everything', 'Code, models, data and accounts.', '', '#FFC5C2'],
  [ShieldCheck, 'Secure by default', 'Roles, encryption and audit logs from day one.', '', '#96E5FF'],
  [Zap, 'Fast and light', 'Pages and apps that load in a blink.', '', '#A068FF'],
  [LifeBuoy, 'Support after launch', 'We stay to fix, improve and grow it.', 'lg:col-span-2', '#25D3A0'],
]

export function WhyBento() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="wrap">
        <Label>Why NIMTECH</Label>
        <Lines lines={['Simple to start.', 'Built to last.']} className="h-section mt-6" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map(([Ico, t, d, span, c], i) => (
            <li key={t} className={`why-card spot rise ${span}`} style={{ '--d': `${(i % 4) * 0.06}s` }}>
              <Orb color={c} className="why-orb" />
              <span className="why-ic">
                <Ico className="h-5 w-5" />
              </span>
              <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight">{t}</h3>
              <p className="mt-2 text-[15px] text-neutral-600">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
