import { Navigate, useParams } from 'react-router-dom'
import { ORDER, SERVICES } from '../data/services.js'
import { DEMOS } from '../components/demos.jsx'
import { SphereArt } from '../components/home/Blocks.jsx'
import { CtaBand, Faq, Label, Lines, PageHero, Pill, TalkButton } from '../components/ui.jsx'

// Service page: 3D hero in the service colour, then the detail.
export default function Service() {
  const { id } = useParams()
  const s = SERVICES[id]
  if (!s) return <Navigate to="/services" replace />
  return (
    <>
      <PageHero label={s.name} title={s.tagline} text={s.desc} color={s.color} tags={s.tags}>
        <div className="flex flex-wrap gap-3">
          <TalkButton service={id}>Talk to us about it</TalkButton>
          <Pill variant="glass" to="/services">
            All services
          </Pill>
        </div>
      </PageHero>
      <ServiceDetail id={id} />
    </>
  )
}

// Live demo, what you get, how it works, other services, FAQ, CTA.
export function ServiceDetail({ id, demo = true }) {
  const s = SERVICES[id]
  const Demo = DEMOS[id]
  const idx = ORDER.indexOf(id)
  return (
    <div className="relative z-10 overflow-clip rounded-t-[2.5rem] bg-white md:rounded-t-[4rem]">
      {demo && Demo && (
        <section className="bg-white pt-16 md:pt-24">
          <div className="wrap">
            <div className="lab rise">
              <div className="lab-glow" style={{ '--c': s.color }} aria-hidden="true" />
              <div className="relative">
                <p className="mono-label text-white/50">[ Live demo ]</p>
                <Lines lines={['See it in action.']} className="h-section mt-5 text-white" />
                <p className="mt-3 text-[15px] text-white/50">Interactive sample. Click around.</p>
              </div>
              <div className="lab-stage relative mt-10">
                <Demo />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Label>What you get</Label>
            <Lines lines={['Everything you need,', 'nothing you don’t.']} className="h-section mt-6" />
            <SphereArt i={idx} color={s.color} className="mt-10 hidden aspect-square max-w-[18rem] lg:block" />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {s.get.map(([t, d], i) => (
              <li key={t} className="why-card spot rise" style={{ '--d': `${i * 0.07}s` }}>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">0{i + 1}</span>
                <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight">{t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white pb-24 md:pb-32">
        <div className="wrap">
          <div className="stats-panel rise">
            <p className="mono-label text-white/50">[ How it works ]</p>
            <Lines lines={['Four steps,', 'clear at every stage.']} className="h-section mt-5 text-white" />
            <ol className="steps mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
              {s.steps.map(([t, d], i) => (
                <li key={t} className="rise relative" style={{ '--d': `${i * 0.1}s` }}>
                  <span className="step-dot" style={{ '--c': s.color }}>
                    {i + 1}
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold">{t}</h3>
                  <p className="mt-2 max-w-[28ch] text-[15px] leading-relaxed text-white/55">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Faq items={s.faq} />
      <CtaBand />
    </div>
  )
}
