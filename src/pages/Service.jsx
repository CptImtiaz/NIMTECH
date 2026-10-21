import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SERVICES } from '../data/services.js'
import { projectsFor } from '../data/projects.js'
import ProjectMedia from '../components/ProjectMedia.jsx'
import { CtaBand, Faq, PageHero, StartButton } from '../components/ui.jsx'

// Service page: dark hero with the service's 3D render, then the detail.
export default function Service() {
  const { id } = useParams()
  const s = SERVICES[id]
  if (!s) return <Navigate to="/services" replace />
  return (
    <>
      <PageHero eyebrow={s.name} title={s.tagline} text={s.desc} image={`/posters/${s.scene}.webp`}>
        <div className="mt-10">
          <StartButton to={`/contact?service=${id}`}>Talk about {s.name.toLowerCase()}</StartButton>
        </div>
      </PageHero>
      <ServiceDetail id={id} />
    </>
  )
}

// What you get, related projects, how it works, questions, call to action.
export function ServiceDetail({ id }) {
  const s = SERVICES[id]
  const work = projectsFor(id)
  return (
    <>
      <section className="bg-white py-24 md:py-32">
        <div className="wrap">
          <span className="eyebrow rise">What you get</span>
          <h2 className="h2 rise mt-5 max-w-[20ch]" style={{ '--d': '.06s' }}>
            Everything you need, <em>nothing you don’t.</em>
          </h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.get.map(([t, d], i) => (
              <li key={t} className="get-card rise" style={{ '--d': `${i * 0.07}s` }}>
                <span className="get-num">0{i + 1}</span>
                <h3 className="mt-14 font-display text-2xl font-semibold tracking-tight">{t}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-neutral-600">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {work.length > 0 && (
        <section className="bg-[#f4f4f6] py-24 md:py-32">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="eyebrow rise">Built by our team</span>
                <h2 className="h2 rise mt-5" style={{ '--d': '.06s' }}>
                  See it <em>in action.</em>
                </h2>
              </div>
              <Link to="/work" className="pill-ghost rise">
                All projects <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className={`mt-12 grid gap-5 ${work.length > 1 ? 'md:grid-cols-2' : ''}`}>
              {work.map((p, i) => (
                <ProjectCard key={p.id} p={p} i={i} wide={work.length === 1} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-black py-24 text-white md:py-32" data-theme="dark">
        <div className="wrap">
          <span className="eyebrow rise text-white/70">How it works</span>
          <h2 className="h2 rise mt-5 max-w-[18ch]" style={{ '--d': '.06s' }}>
            Four steps, <em>clear at every stage.</em>
          </h2>
          <ol className="steps mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            {s.steps.map(([t, d], i) => (
              <li key={t} className="rise relative" style={{ '--d': `${i * 0.1}s` }}>
                <span className="step-dot">{i + 1}</span>
                <h3 className="mt-6 font-display text-2xl font-semibold">{t}</h3>
                <p className="mt-2 max-w-[28ch] text-[16px] leading-relaxed text-white/60">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faq items={s.faq} />
      <CtaBand />
    </>
  )
}

export function ProjectCard({ p, i = 0, wide = false }) {
  return (
    <article className="proj-card rise group" style={{ '--d': `${(i % 2) * 0.08}s` }}>
      <div className={`overflow-hidden rounded-[22px] bg-neutral-200 ${wide ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}>
        <ProjectMedia p={p} className="transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
        <span className="text-sm text-neutral-500">{p.kind}</span>
      </div>
      <p className="mt-2 max-w-[60ch] text-[16px] leading-relaxed text-neutral-600">{p.line}</p>
      <p className="mt-3 flex items-start gap-2 text-[15px] font-medium text-neutral-900">
        <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#3054ff]" />
        {p.result}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <li key={t} className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-neutral-600">
            {t}
          </li>
        ))}
      </ul>
    </article>
  )
}
