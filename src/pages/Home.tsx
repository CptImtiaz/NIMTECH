import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { CASES, INDUSTRIES, ORDER, SERVICES } from '../data/content.js'
import Hero, { type StageHandle } from '../components/Hero'
import type { CoreId } from '../three/Stage'
import { CaseCard, CTA, Eyebrow, FAQ, Marquee, Section, SectionHead, Statement, svcName } from '../components/blocks.jsx'
import { ArrowUpRight, Icon } from '../components/Icons.jsx'
import { EASE, Reveal, SplitText, Tilt } from '../components/motion.jsx'
import { SHOWCASES } from '../components/Showcases.jsx'
import Counters from '../components/Counters.jsx'
import { HOME_FAQ } from '../data/site.js'

const V = (id: string) => `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/${id}.mp4`
const SERVICE_VIDEOS: Record<string, string> = {
  'ai-agents': V('hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31'),
  'computer-vision': V('hf_20260815_034306_229eccbe-fd8f-40fb-8002-9868ef2bb1a8'),
  software: V('hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4'),
  apps: V('hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6'),
  'api-integration': V('hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8'),
  'ai-content': V('hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903'),
}
type Svc = (typeof SERVICES)[keyof typeof SERVICES]

function useWide(q = '(min-width: 900px)') {
  const [wide, setWide] = useState(false)
  useEffect(() => {
    const m = matchMedia(q)
    const f = () => setWide(m.matches)
    f()
    m.addEventListener('change', f)
    return () => m.removeEventListener('change', f)
  }, [q])
  return wide
}

function LazyVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { margin: '300px' })
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (inView) v.play().catch(() => {})
    else v.pause()
  }, [inView])
  return <video ref={ref} src={inView ? src : undefined} muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" aria-hidden="true" />
}

function ServiceCard({ id, i }: { id: string; i: number }) {
  const s = SERVICES[id as keyof typeof SERVICES] as Svc
  return (
    <Tilt className="rounded-[28px]">
      <Link to={`/services/${id}`} className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-surface">
        <div className="relative h-[46%] min-h-[180px] overflow-hidden">
          <LazyVideo src={SERVICE_VIDEOS[id]} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
          <span className="absolute left-6 top-6 grid h-12 w-12 place-items-center rounded-2xl border border-white/70 bg-white/80 text-brand backdrop-blur-md">
            <Icon name={s.icon} className="h-5 w-5" />
          </span>
          <span className="absolute right-6 top-6 rounded-full bg-white/80 px-2 py-0.5 font-mono text-xs text-ink-soft">0{i + 1} / 06</span>
        </div>
        <div className="flex flex-1 flex-col p-7">
          <h3 className="font-display text-[clamp(26px,2.4vw,34px)] font-semibold tracking-[-.03em] text-ink">{svcName(id)}</h3>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">{s.one}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {s.tags.slice(0, 4).map((t: string) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-brand-cyan">
            Explore {svcName(id)}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </div>
      </Link>
    </Tilt>
  )
}

function CoverCard({ id, i, n, progress }: { id: string; i: number; n: number; progress: MotionValue<number> }) {
  const c = i / (n - 1)
  const rotateY = useTransform(progress, [c - 0.35, c, c + 0.35], [32, 0, -32])
  const scale = useTransform(progress, [c - 0.35, c, c + 0.35], [0.86, 1, 0.86])
  const opacity = useTransform(progress, [c - 0.6, c, c + 0.6], [0.35, 1, 0.35])
  return (
    <motion.div style={{ rotateY, scale, opacity, transformPerspective: 1400 }} className="h-[min(560px,64vh)] w-[min(440px,78vw)] shrink-0">
      <ServiceCard id={id} i={i} />
    </motion.div>
  )
}

// Pinned section: vertical scroll drives a horizontal 3D coverflow.
function ServicesRail() {
  const wide = useWide()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${((ORDER.length - 1) / ORDER.length) * 100}%`])
  if (!wide) {
    return (
      <Section>
        <SectionHead eyebrow="What we do" title="Six practices. <em>One team.</em>" />
        <div className="grid gap-5">
          {ORDER.map((id, i) => (
            <Reveal key={id} className="h-[520px]">
              <ServiceCard id={id} i={i} />
            </Reveal>
          ))}
        </div>
      </Section>
    )
  }
  return (
    <section ref={ref} className="relative" style={{ height: `${ORDER.length * 70 + 60}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pb-6 pt-28">
        <div className="wrap mb-8 flex items-end justify-between gap-8">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <SplitText as="h2" lines={['Six practices. <em>One team.</em>']} inView className="h2" />
          </div>
          <p className="lede hidden max-w-[34ch] lg:block">Most projects combine two or three. We bring all of it under one roof.</p>
        </div>
        <motion.div style={{ x }} className="flex gap-8 pl-[max(20px,calc((100vw-1280px)/2+56px))]">
          {ORDER.map((id, i) => (
            <CoverCard key={id} id={id} i={i} n={ORDER.length} progress={scrollYProgress} />
          ))}
          <div className="w-[30vw] shrink-0" />
        </motion.div>
        <div className="wrap mt-10">
          <div className="h-px w-full bg-line">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-gradient-to-r from-brand to-brand-cyan" />
          </div>
        </div>
      </div>
    </section>
  )
}

// Tabs that flip between the live console demos in 3D.
const LAB = [
  ['agents', 'AI agent trace'],
  ['vision', 'Model training'],
  ['api', 'Integration hub'],
  ['content', 'Content studio'],
] as const
function LiveLab() {
  const [k, setK] = useState(0)
  const Show = SHOWCASES[LAB[k][0]]
  return (
    <Section>
      <SectionHead eyebrow="Live lab" title="Watch the systems <em>work.</em>" lede="Interactive recreations of what we build: every run traced, every model measured, every event accounted for." />
      <div className="mb-6 flex flex-wrap gap-2" role="tablist">
        {LAB.map(([id, label], i) => (
          <button key={id} role="tab" aria-selected={k === i} onClick={() => setK(i)} className={`filter ${k === i ? 'on' : ''}`}>
            {k === i && <motion.span layoutId="lab-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-brand to-brand-mid" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            <span className="relative">{label}</span>
          </button>
        ))}
      </div>
      <div style={{ perspective: 1600 }}>
        <AnimatePresence mode="wait">
          <motion.div key={k} initial={{ opacity: 0, rotateX: -18, y: 40 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} exit={{ opacity: 0, rotateX: 14, y: -30 }} transition={{ duration: 0.6, ease: EASE }} className="console">
            <div className="console-bar">
              <i />
              <i />
              <i />
              <span className="ml-2">{Show.title}</span>
              <span className="console-live">LIVE</span>
            </div>
            <Show.C />
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}

// Sticky cards that stack and recede in depth as the next one arrives.
const PROCESS = [
  ['Discover', 'We start with the problem, the people and the data, not with a technology.', 'eye'],
  ['Prove', 'For AI work, we test on your real data first, so you see results before you commit.', 'chart'],
  ['Build', 'Two‑week sprints with a working demo at the end of each.', 'code'],
  ['Launch', 'Production release with monitoring, documentation and training.', 'rocket'],
  ['Evolve', 'Ongoing improvement as your users, data and business change.', 'loop'],
]
function StackCard({ step, i, n, progress }: { step: string[]; i: number; n: number; progress: MotionValue<number> }) {
  const start = i / n
  const scale = useTransform(progress, [start, 1], [1, 1 - (n - i) * 0.04])
  const rotateX = useTransform(progress, [start, 1], [0, (n - i) * 2.5])
  const brightness = useTransform(progress, [start, 1], [1, 0.9 + i * 0.02])
  const filter = useTransform(brightness, (b) => `brightness(${b})`)
  return (
    <div className="sticky flex h-[70vh] items-start justify-center" style={{ top: `calc(18vh + ${i * 22}px)` }}>
      <motion.div style={{ scale, rotateX, filter, transformPerspective: 1400, transformOrigin: 'top center' }} className="relative w-full max-w-[920px] overflow-hidden rounded-[28px] border border-line bg-gradient-to-br from-surface to-night p-8 md:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
        <div className="relative flex items-start justify-between gap-6">
          <div>
            <span className="font-mono text-xs tracking-[.12em] text-brand-cyan">STEP 0{i + 1}</span>
            <h3 className="mt-3 font-display text-[clamp(34px,4.6vw,64px)] font-semibold leading-none tracking-[-.04em] text-ink">{step[0]}</h3>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-ink-soft">{step[1]}</p>
          </div>
          <span className="hidden h-16 w-16 shrink-0 place-items-center rounded-2xl border border-line bg-surface text-brand md:grid">
            <Icon name={step[2]} className="h-7 w-7" />
          </span>
        </div>
        <div className="relative mt-10 h-1 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-cyan" style={{ width: `${((i + 1) / n) * 100}%` }} />
        </div>
      </motion.div>
    </div>
  )
}
function ProcessStack() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section className="relative pt-24 md:pt-36">
      <div className="wrap">
        <SectionHead eyebrow="Process" title="How we <em>work.</em>" lede="A clear, repeatable delivery model, whichever service you need." />
        <div ref={ref} data-stack className="relative pb-[10vh]">
          {PROCESS.map((p, i) => (
            <StackCard key={p[0]} step={p} i={i} n={PROCESS.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}

function IndustryRails() {
  const a = INDUSTRIES.map((x: unknown[]) => x[0] as string)
  return (
    <section className="py-20">
      <div className="wrap mb-10">
        <Eyebrow>Industries</Eyebrow>
        <SplitText as="h2" lines={['Built for <em>real operations.</em>']} inView className="h2" />
      </div>
      <Marquee items={a} />
      <div className="[&_.marquee-track]:[animation-direction:reverse]">
        <Marquee items={[...a].reverse()} />
      </div>
      <div className="wrap mt-8">
        <Link to="/industries" className="inline-flex items-center gap-2 text-sm font-medium text-brand-cyan">
          Explore industries <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}


/* ---------- home hero: service carousel driving the 3D stage ---------- */
const CORE_OF: Record<string, CoreId> = { 'ai-agents': 'ai', 'computer-vision': 'vision', software: 'software', apps: 'apps', 'api-integration': 'api', 'ai-content': 'content' }

function HomeHero() {
  const stage = useRef<StageHandle | null>(null)
  const [active, setActive] = useState(0)
  const pick = (i: number) => {
    const n = (i + ORDER.length) % ORDER.length
    if (n === active) return
    if (stage.current && !stage.current.switchTo(CORE_OF[ORDER[n]])) return
    setActive(n)
  }
  const id = ORDER[active]
  const s = SERVICES[id as keyof typeof SERVICES] as Svc
  const offset = Math.min(active, ORDER.length - 2)
  const aside = (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.9 }} className="flex flex-col items-center gap-5 lg:items-end">
      <div className="w-[310px] overflow-hidden px-3 pb-1 pt-16">
        <div className="flex gap-4 transition-transform duration-700 [transition-timing-function:cubic-bezier(.2,.8,.2,1)]" style={{ transform: `translateX(${-offset * 151}px)` }} role="tablist" aria-label="Services">
          {ORDER.map((sid, i) => {
            const sv = SERVICES[sid as keyof typeof SERVICES] as Svc
            const on = i === active
            return (
              <button key={sid} type="button" role="tab" aria-selected={on} onClick={() => pick(i)} className={`svc-card group ${on ? 'on' : ''}`}>
                <span className="svc-chip">
                  <Icon name={sv.icon} className="h-9 w-9" />
                </span>
                <span className="text-[12.5px] font-semibold leading-tight text-ink">{svcName(sid)}</span>
                <span className="text-[11px] leading-tight text-ink-soft">{sv.tags[0]}</span>
              </button>
            )
          })}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs tabular-nums tracking-[.08em] text-ink-soft">
          {String(active + 1).padStart(2, '0')} / {String(ORDER.length).padStart(2, '0')}
        </span>
        <button type="button" onClick={() => pick(active - 1)} aria-label="Previous service" className="round-btn">←</button>
        <button type="button" onClick={() => pick(active + 1)} aria-label="Next service" className="round-btn">→</button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="max-w-[290px] text-center lg:text-right">
          <p className="text-[14px] leading-relaxed text-ink-soft">{s.one}</p>
          <Link to={`/services/${id}`} className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-brand-cyan">
            Explore {svcName(id)} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
  return (
    <Hero
      core="ai"
      layout="home"
      badge="AI & Software Engineering Studio"
      h1={['We engineer', '<em>intelligent</em> systems.']}
      lede="NIMTECH designs, builds and runs AI agents, custom vision models, software, apps and integrations for companies around the world."
      primary={['Start a Project', '/contact']}
      secondary={['Explore Services', '/services']}
      aside={aside}
      onStage={(h) => (stage.current = h)}
    >
      <div className="mt-8 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white text-brand">
          <Icon name="vision" className="h-5 w-5" />
        </span>
        <span className="leading-tight">
          <span className="block font-mono text-[10.5px] tracking-[.14em] text-ink-soft">IN‑HOUSE VISION MODEL</span>
          <span className="text-[13.5px] font-semibold text-ink">Target Locker AI</span>
        </span>
      </div>
    </Hero>
  )
}

export default function Home() {
  return (
    <>
      <HomeHero />
      <Marquee items={ORDER.map(svcName)} />
      <Statement text="We’re an engineering studio for companies that want AI and software done <em>properly.</em> You bring the problem. We design, build and run the system that solves it." />
      <ServicesRail />
      <Counters />
      <LiveLab />
      <ProcessStack />
      <Section>
        <SectionHead eyebrow="Work" title="What a project <em>looks like.</em>" lede="Illustrative examples of the kind of problems we solve." />
        <div className="grid gap-5 lg:grid-cols-3">
          {CASES.slice(0, 3).map((c: { t: string }, i: number) => (
            <Reveal key={c.t} delay={i * 0.08} className="h-full">
              <CaseCard c={c} />
            </Reveal>
          ))}
        </div>
      </Section>
      <IndustryRails />
      <Section>
        <SectionHead eyebrow="FAQ" title="Common <em>questions.</em>" />
        <FAQ list={HOME_FAQ} />
      </Section>
      <CTA />
    </>
  )
}
