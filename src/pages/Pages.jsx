import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Handshake, KeyRound, Users } from 'lucide-react'
import { ORDER, SERVICES } from '../data/services.js'
import { PROJECTS } from '../data/projects.js'
import { HQ } from '../data/site.js'
import ServicesGrid from '../components/home/ServicesGrid.jsx'
import DeliverTabs from '../components/home/DeliverTabs.jsx'
import { CtaBand, PageHero, StartButton } from '../components/ui.jsx'
import { ProjectCard } from './Service.jsx'

export function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="One team for" accent="AI and software." text="From an AI agent that answers customers to a full booking platform: pick a service to see what you get, real projects and how it works." image="/posters/globe.webp" />
      <ServicesGrid />
      <DeliverTabs />
      <CtaBand />
    </>
  )
}

export function Work() {
  const [f, setF] = useState('all')
  const used = ORDER.filter((id) => PROJECTS.some((p) => p.s === id))
  const list = f === 'all' ? PROJECTS : PROJECTS.filter((p) => p.s === f)
  return (
    <>
      <PageHero eyebrow="Our work" title="Real projects," accent="real results." text="Websites, booking platforms, vision models, integrations and apps our team has designed and built." />
      <section className="bg-white py-20 md:py-28">
        <div className="wrap">
          <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter projects">
            {['all', ...used].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setF(k)}
                aria-pressed={f === k}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${f === k ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                {k === 'all' ? 'All projects' : SERVICES[k].name}
              </button>
            ))}
          </div>
          <div key={f} className="mt-12 grid gap-x-6 gap-y-16 md:grid-cols-2">
            {list.map((p, i) => (
              <ProjectCard key={p.id} p={p} i={i} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Your project" accent="could be next." />
    </>
  )
}

const VALUES = [
  [Users, 'Senior people only', 'The people you meet are the people who build. No hand-offs to juniors.'],
  [Eye, 'Progress you can see', 'A working demo every two weeks, so you always know where things stand.'],
  [KeyRound, 'You own everything', 'Code, models, data and accounts are yours from day one.'],
  [Handshake, 'Honest advice', 'If AI is not the right answer, we will tell you, and suggest what is.'],
]

export function About() {
  return (
    <>
      <PageHero eyebrow="About NIMTECH" title="A senior team that" accent="builds what works." text={`We are an engineering studio in ${HQ}, building AI agents, computer vision, software and apps for businesses around the world.`} image="/posters/ai.webp" />
      <section className="bg-white py-24 md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <span className="eyebrow rise">Our story</span>
            <h2 className="h2 rise mt-5" style={{ '--d': '.06s' }}>
              Useful technology, <em>made simple.</em>
            </h2>
          </div>
          <div className="rise space-y-5 text-[18px] leading-relaxed text-neutral-700" style={{ '--d': '.12s' }}>
            <p>NIMTECH started with a simple belief: growing businesses deserve the same quality of AI and software as large companies, without the long contracts and the jargon.</p>
            <p>We keep the team small and senior. We work in short sprints, show working software often, and measure success by the result for your business, not by hours billed.</p>
          </div>
        </div>
        <ul className="wrap mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(([Ico, t, d], i) => (
            <li key={t} className="get-card rise" style={{ '--d': `${i * 0.07}s` }}>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-black text-white">
                <Ico className="h-5 w-5" />
              </span>
              <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight">{t}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-neutral-600">{d}</p>
            </li>
          ))}
        </ul>
      </section>
      <DeliverTabs />
      <CtaBand />
    </>
  )
}

export function NotFound() {
  return (
    <section className="relative grid min-h-[90svh] place-items-center overflow-hidden bg-black px-6 text-center text-white" data-theme="dark">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="relative">
        <p className="display bg-gradient-to-b from-white to-[#b4c0ff] bg-clip-text text-[120px] text-transparent md:text-[200px]">404</p>
        <h1 className="display text-3xl md:text-5xl">This page took a day off.</h1>
        <p className="lede mx-auto mt-5 max-w-[40ch] text-white/65">The link may be old. Try the home page or one of our services.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <StartButton to="/">Back to home</StartButton>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {ORDER.map((id) => (
            <li key={id}>
              <Link to={`/services/${id}`} className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 hover:text-white">
                {SERVICES[id].name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
