import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView, useScroll } from 'framer-motion'
import { INDUSTRIES, ORDER, SERVICES } from '../data/content.js'
import { INSIGHTS } from '../data/insights.js'
import GlassHero from '../components/GlassHero.jsx'
import AgentsTeaser from '../components/agents/AgentsTeaser.jsx'
import Projects from '../components/Projects.jsx'
import { GITHUB } from '../data/projects.js'
import { CTA, Eyebrow, FAQ, Marquee, Section, SectionHead, svcName } from '../components/blocks.jsx'
import { ArrowRight, ArrowUpRight, Icon } from '../components/Icons.jsx'
import { EASE, Reveal, SplitText } from '../components/motion.jsx'
import { SHOWCASES } from '../components/Showcases.jsx'
import Counters from '../components/Counters.jsx'
import InsightCard from '../components/InsightCard.jsx'
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
const svc = (id: string) => SERVICES[id as keyof typeof SERVICES] as Svc

// Technologies we build with (not a claim of partnership)
const STACK = ['AWS', 'Microsoft Azure', 'Google Cloud', 'NVIDIA', 'OpenAI', 'Anthropic', 'Llama', 'PyTorch', 'Kubernetes', 'PostgreSQL', 'Snowflake', 'Salesforce', 'SAP', 'Shopify', 'Flutter', 'React']

function LazyVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { margin: '300px' })
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (inView) v.play().catch(() => {})
    else v.pause()
  }, [inView])
  return <video ref={ref} src={inView ? src : undefined} muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
}

/* ---------- capabilities: auto-advancing tabs with media ---------- */
function Capabilities() {
  const [k, setK] = useState(0)
  const [hold, setHold] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-20% 0px' })
  useEffect(() => {
    if (hold || !inView) return
    const t = setTimeout(() => setK((v) => (v + 1) % ORDER.length), 4500)
    return () => clearTimeout(t)
  }, [k, hold, inView])
  const id = ORDER[k]
  const s = svc(id)
  return (
    <Section id="capabilities">
      <SectionHead eyebrow="What we do" title="Six practices. <em>One accountable team.</em>" lede="Most programmes combine two or three. We bring strategy, engineering and operations together, so nothing falls between suppliers." />
      <div ref={ref} className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
        <div role="tablist" aria-label="Services" className="border-t border-line">
          {ORDER.map((sid, i) => (
            <button key={sid} type="button" role="tab" aria-selected={i === k} onClick={() => (setK(i), setHold(true))} className={`tab ${i === k ? 'on' : ''} ${hold ? 'held' : ''}`}>
              <span className="flex items-center gap-4">
                <span className="font-mono text-[12px] font-normal text-brand">0{i + 1}</span>
                {svcName(sid)}
              </span>
              <ArrowRight className={`h-4 w-4 transition-transform ${i === k ? 'translate-x-0 text-brand' : '-translate-x-2 opacity-0'}`} />
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: EASE }} className="overflow-hidden rounded-[16px] border border-line bg-white">
            <div className="relative h-[220px] overflow-hidden bg-deep md:h-[260px]">
              <LazyVideo src={SERVICE_VIDEOS[id]} />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/10 to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4 text-white">
                <span className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-[10px] bg-white text-brand">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-display text-[22px] font-semibold tracking-[-.02em]">{svcName(id)}</span>
                </span>
                <span className="font-mono text-[11px] text-white/75">0{k + 1} / 06</span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-[17px] leading-relaxed text-ink">{s.one}</p>
              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {s.caps.slice(0, 4).map((c: string[]) => (
                  <li key={c[1]} className="flex gap-3 text-[14.5px] text-ink-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand" />
                    {c[1]}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t: string) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <Link to={`/services/${id}`} className="inline-flex items-center gap-2 text-[14.5px] font-medium text-brand">
                  Explore {svcName(id)} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}

/* ---------- industries grid ---------- */
function Industries() {
  return (
    <Section className="bg-surface">
      <SectionHead eyebrow="Industries" title="Built for how <em>your sector works.</em>" lede="The same engineering, shaped around the data, regulation and workflows of each industry." />
      <div className="grid gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {(INDUSTRIES as [string, string, string[]][]).map((x, i) => (
          <Link key={x[0]} to="/industries" className="group flex h-full flex-col bg-white p-6 transition-colors duration-300 hover:bg-deep">
            <span className="font-mono text-[11.5px] text-brand group-hover:text-brand-light">0{i + 1}</span>
            <h3 className="h3 mt-8 group-hover:text-white">{x[0]}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-soft group-hover:text-white/70">{x[1]}</p>
            <span className="mt-auto flex flex-wrap gap-1.5 pt-6">
              {x[2].map((sid) => (
                <span key={sid} className="rounded-md bg-surface px-2 py-1 text-[11.5px] text-ink-soft group-hover:bg-white/10 group-hover:text-white/80">{svcName(sid)}</span>
              ))}
            </span>
          </Link>
        ))}
      </div>
    </Section>
  )
}

/* ---------- live lab: interactive recreations of what we build ---------- */
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
      <SectionHead eyebrow="Engineering in action" title="See the systems <em>at work.</em>" lede="Interactive recreations of what we deliver: every agent run traced, every model measured, every event accounted for." />
      <div className="mb-6 flex flex-wrap gap-2" role="tablist">
        {LAB.map(([id, label], i) => (
          <button key={id} role="tab" aria-selected={k === i} onClick={() => setK(i)} className={`filter ${k === i ? 'on' : ''}`}>
            {label}
          </button>
        ))}
      </div>
      <div style={{ perspective: 1600 }}>
        <AnimatePresence mode="wait">
          <motion.div key={k} initial={{ opacity: 0, rotateX: -10, y: 30 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} exit={{ opacity: 0, rotateX: 8, y: -20 }} transition={{ duration: 0.5, ease: EASE }} className="console">
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

/* ---------- engagement models ---------- */
const MODELS = [
  ['01', 'Discovery sprint', '2–4 weeks', 'We map the problem, test feasibility on your real data and leave you with a costed plan, a prototype and a clear go or no-go.', ['Workshops with your team', 'Data and systems review', 'Prototype and roadmap']],
  ['02', 'Delivery team', 'Fixed scope or ongoing', 'A senior, cross-functional team designs, builds and launches the system in two-week sprints, with a working demo at the end of each.', ['Product, engineering and ML', 'Fortnightly demos', 'Security and QA built in']],
  ['03', 'Managed service', 'After launch', 'We run, monitor and improve what we built, with clear service levels, so it keeps getting better as your business changes.', ['Monitoring and on-call', 'Model and content updates', 'Quarterly roadmap reviews']],
] as const
function Engage() {
  return (
    <Section>
      <SectionHead eyebrow="How we engage" title="Start small. <em>Scale with confidence.</em>" lede="Three ways to work with us, from a short discovery sprint to a long-term managed service." />
      <div className="grid gap-4 lg:grid-cols-3">
        {MODELS.map(([n, t, when, text, items], i) => {
          const dark = i === 1
          return (
            <Reveal key={n} delay={i * 0.08} className="h-full">
              <div className={`card h-full ${dark ? '!border-deep !bg-deep' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className={`card-num ${dark ? '!text-brand-light' : ''}`}>{n}</span>
                  <span className={`rounded-md px-2 py-1 font-mono text-[11px] ${dark ? 'bg-white/10 text-white/80' : 'bg-surface text-ink-soft'}`}>{when}</span>
                </div>
                <h3 className={`h3 mt-6 !text-[24px] ${dark ? '!text-white' : ''}`}>{t}</h3>
                <p className={`card-text ${dark ? '!text-white/70' : ''}`}>{text}</p>
                <ul className={`mt-auto grid gap-2 border-t pt-5 text-[14px] ${dark ? 'border-white/15 text-white/80' : 'border-line text-ink-soft'}`}>
                  {items.map((x) => (
                    <li key={x} className="flex items-center gap-2.5">
                      <svg viewBox="0 0 16 16" className={`h-4 w-4 shrink-0 ${dark ? 'text-brand-light' : 'text-brand'}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M3 8.5l3 3 7-7" />
                      </svg>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

/* ---------- delivery process: a line that draws across five phases ---------- */
const PROCESS = [
  ['Discover', 'The problem, the people and the data, before any technology.'],
  ['Prove', 'Results on your real data before you commit to the full build.'],
  ['Build', 'Two-week sprints with a working demo at the end of each.'],
  ['Launch', 'Production release with monitoring, documentation and training.'],
  ['Evolve', 'Continuous improvement as your users and business change.'],
]
function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  return (
    <Section className="!pt-0">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Delivery</Eyebrow>
          <SplitText as="h2" lines={['One proven path, <em>idea to production.</em>']} inView className="h2" />
        </div>
        <Link to="/process" className="inline-flex items-center gap-2 text-[14.5px] font-medium text-brand">
          How we work <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div ref={ref} className="relative grid gap-8 md:grid-cols-5 md:gap-6">
        <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-line md:block" />
        <motion.div style={{ scaleX: scrollYProgress }} className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-brand md:block" />
        {PROCESS.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.08} className="relative">
            <span className="relative z-[1] block h-[15px] w-[15px] border-2 border-brand bg-white" />
            <span className="mt-5 block font-mono text-[11.5px] text-brand">PHASE 0{i + 1}</span>
            <h3 className="h3 mt-1.5">{t}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{d}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ---------- insights ---------- */
function Insights() {
  return (
    <Section className="bg-surface">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Insights</Eyebrow>
          <SplitText as="h2" lines={['Thinking from <em>our engineers.</em>']} inView className="h2" />
        </div>
        <Link to="/insights" className="inline-flex items-center gap-2 text-[14.5px] font-medium text-brand">
          All insights <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {INSIGHTS.map((a, i) => (
          <InsightCard key={a.slug} a={a} i={i} />
        ))}
      </div>
    </Section>
  )
}

export default function Home() {
  return (
    <>
      <GlassHero />
      <section aria-label="Technologies we build with" className="border-y border-line">
        <div className="wrap flex flex-col items-center gap-0 md:flex-row md:gap-8">
          <span className="shrink-0 pt-5 font-mono text-[11.5px] uppercase tracking-[.14em] text-ink-dim md:pt-0">Built with</span>
          <div className="w-full min-w-0 flex-1">
            <Marquee items={STACK} />
          </div>
        </div>
      </section>
      <Capabilities />
      <Counters />
      <Industries />
      <AgentsTeaser />
      <Section>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Projects</Eyebrow>
            <SplitText as="h2" lines={['Real work, <em>open on GitHub.</em>']} inView className="h2" />
            <p className="lede mt-4">A selection of what our team has built and published: vision research, booking platforms, brand sites and commerce integrations.</p>
          </div>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[14.5px] font-medium text-brand">
            Our GitHub <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <Projects />
      </Section>
      <LiveLab />
      <Engage />
      <Process />
      <Insights />
      <Section>
        <SectionHead eyebrow="FAQ" title="Common <em>questions.</em>" />
        <FAQ list={HOME_FAQ} />
      </Section>
      <CTA />
    </>
  )
}
