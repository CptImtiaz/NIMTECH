import { Navigate, useParams } from 'react-router-dom'
import { SERVICES } from '../data/services.js'
import { projectsFor } from '../data/projects.js'
import { DEMOS } from '../components/demos.jsx'
import Photo from '../components/Photo.jsx'
import { CtaBand, Faq, PageHero, StartButton } from '../components/ui.jsx'

// Service page: photo hero, then the detail.
export default function Service() {
  const { id } = useParams()
  const s = SERVICES[id]
  if (!s) return <Navigate to="/services" replace />
  return (
    <>
      <PageHero eyebrow={s.name} title={s.tagline} text={s.desc} image={s.image} tags={s.tags}>
        <div className="mt-10">
          <StartButton to={`/contact?service=${id}`}>Talk to us about it</StartButton>
        </div>
      </PageHero>
      <ServiceDetail id={id} />
    </>
  )
}

// Live demo, what you get, projects, how it works, questions, call to action.
export function ServiceDetail({ id, demo = true }) {
  const s = SERVICES[id]
  const work = projectsFor(id)
  const Demo = DEMOS[id]
  return (
    <>
      {demo && Demo && (
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="lab-glow" aria-hidden="true" />
          <div className="wrap relative">
            <span className="eyebrow rise text-white/70">Live demo</span>
            <h2 className="h2 rise mt-5 max-w-[18ch]" style={{ '--d': '.06s' }}>
              See it <em className="grad-text">in action.</em>
            </h2>
            <p className="rise mt-4 text-[15px] text-white/50" style={{ '--d': '.1s' }}>
              Interactive sample. Click around.
            </p>
            <div className="rise lab-stage mt-10" style={{ '--d': '.14s' }}>
              <Demo />
            </div>
          </div>
        </section>
      )}

      <section className="py-24 md:py-32">
        <div className="wrap">
          <span className="eyebrow rise text-white/70">What you get</span>
          <h2 className="h2 rise mt-5 max-w-[20ch]" style={{ '--d': '.06s' }}>
            Everything you need, <em className="grad-text">nothing you don’t.</em>
          </h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.get.map(([t, d], i) => (
              <li key={t} className="glass-card spot rise" style={{ '--d': `${i * 0.07}s` }}>
                <span className="get-num">0{i + 1}</span>
                <h3 className="mt-12 font-display text-2xl font-semibold tracking-tight">{t}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-white/60">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {work.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="wrap">
            <span className="eyebrow rise text-white/70">Built by our team</span>
            <h2 className="h2 rise mt-5" style={{ '--d': '.06s' }}>
              Real projects, <em className="grad-text">real results.</em>
            </h2>
            <div className={`mt-12 grid gap-5 ${work.length > 1 ? 'md:grid-cols-2' : ''} ${work.length > 3 ? 'lg:grid-cols-3' : ''}`}>
              {work.map((p, i) => (
                <article key={p.id} className="show-card spot rise !w-auto" style={{ '--d': `${(i % 3) * 0.08}s` }}>
                  <div className="show-img">
                    <Photo src={p.image} alt={p.title} sizes="(min-width: 1024px) 33vw, 90vw" />
                    {p.shot && <img src={p.shot} alt={`${p.title}, our build`} loading="lazy" className="show-shot" />}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/60">{p.line}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <li key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 md:py-32">
        <div className="wrap">
          <span className="eyebrow rise text-white/70">How it works</span>
          <h2 className="h2 rise mt-5 max-w-[18ch]" style={{ '--d': '.06s' }}>
            Four steps, <em className="grad-text">clear at every stage.</em>
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
