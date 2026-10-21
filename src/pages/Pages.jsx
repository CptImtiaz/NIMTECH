import { Link } from 'react-router-dom'
import { ORDER, SERVICES } from '../data/services.js'
import { HQ } from '../data/site.js'
import { IMG } from '../data/images.js'
import ServiceReel from '../components/home/ServiceReel.jsx'
import { DemoLab, Process, WhyBento } from '../components/home/Sections.jsx'
import Photo from '../components/Photo.jsx'
import { CtaBand, PageHero, StartButton } from '../components/ui.jsx'

export function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Six services," accent="one senior team." text="Software, mobile apps, API integration, websites, AI models and AI agents. Pick a service to see a live demo, real projects and how it works." image={IMG.circuit} />
      <ServiceReel title={false} />
      <DemoLab />
      <CtaBand />
    </>
  )
}

export function About() {
  return (
    <>
      <PageHero eyebrow="About NIMTECH" title="A senior team that" accent="builds what works." text={`We are an engineering studio in ${HQ}, building software, apps, websites and AI for businesses around the world.`} image={IMG.team} />
      <section className="py-24 md:py-32">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="eyebrow rise text-white/70">Our story</span>
            <h2 className="h2 rise mt-5" style={{ '--d': '.06s' }}>
              Useful technology, <em className="grad-text">made simple.</em>
            </h2>
            <div className="rise mt-8 space-y-5 text-[18px] leading-relaxed text-white/70" style={{ '--d': '.12s' }}>
              <p>NIMTECH started with a simple belief: growing businesses deserve the same quality of software and AI as large companies, without long contracts or jargon.</p>
              <p>We keep the team small and senior, show working software often, and measure success by what changes for your business.</p>
            </div>
          </div>
          <div className="rise about-photo" style={{ '--d': '.1s' }}>
            <Photo src={IMG.engineer} alt="Engineer at work" sizes="(min-width: 1024px) 45vw, 90vw" />
          </div>
        </div>
      </section>
      <WhyBento />
      <Process />
      <CtaBand />
    </>
  )
}

export function NotFound() {
  return (
    <section className="relative grid min-h-[90svh] place-items-center overflow-hidden px-6 text-center" data-theme="dark">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="ph-orb" />
      <div className="relative">
        <p className="display grad-text text-[120px] md:text-[200px]">404</p>
        <h1 className="display text-3xl md:text-5xl">This page took a day off.</h1>
        <p className="lede mx-auto mt-5 max-w-[40ch] text-white/65">The link may be old. Try the home page or one of our services.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <StartButton to="/">Back to home</StartButton>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {ORDER.map((id) => (
            <li key={id}>
              <Link to={`/services/${id}`} className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 hover:text-white">
                {SERVICES[id].short}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
