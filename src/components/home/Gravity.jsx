import { useEffect, useState } from 'react'
import { ArrowDown, MousePointer2 } from 'lucide-react'
import { openRequest } from '../../lib/bus.js'
import GravityField from '../GravityField.jsx'
import { Label, Lines, Pill } from '../ui.jsx'

const BG = [
  'radial-gradient(circle at center, #ffffff 0%, #ecefff 35%, #c2d1ff 100%)',
  'radial-gradient(circle at center, #ffffff 0%, #fbffe5 38%, #e8ff9c 100%)',
  'radial-gradient(circle at center, #ffffff 0%, #fff0f1 38%, #ffd1d5 100%)',
]

// Four full-height sections over the 3D field. Scroll drives the field:
// float, drop and bounce, form a heart, fly into the lens.
export default function GravityStory() {
  const [stage, setStage] = useState(0)
  useEffect(() => {
    let raf = 0
    const on = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const p = scrollY / (innerHeight || 1)
        setStage(p > 1.55 ? 2 : p > 0.7 ? 1 : 0)
      })
    }
    addEventListener('scroll', on, { passive: true })
    on()
    return () => {
      removeEventListener('scroll', on)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="fixed inset-0 -z-10 transition-[background] duration-[1200ms] ease-[cubic-bezier(.65,0,.35,1)]" style={{ background: BG[stage] }} aria-hidden="true" />
      <GravityField fixed color="#2F69FF" />

      {/* 01 hero */}
      <section className="g-sec relative z-10 flex min-h-[100svh] items-end px-6 pb-12 md:px-12 md:pb-14">
        <div className="veil md:hidden" aria-hidden="true" />
        <div className="relative flex w-full flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="pointer-events-auto flex flex-col items-start">
            <p className="hero-in mb-4 font-display text-xs font-medium uppercase tracking-[0.05em] text-[#0E2AC5] md:mb-6 md:text-[14px]" style={{ '--d': '.15s' }}>
              [ Digital studio ]
            </p>
            <Lines as="h1" lines={['Less noise.', 'More gravity.']} className="hero-lines g-h1" delay={280} stagger={120} />
            <div className="hero-in mt-8 flex flex-wrap gap-3" style={{ '--d': '.8s' }}>
              <Pill variant="dark" arrow="right" onClick={() => openRequest()}>
                Let’s talk
              </Pill>
              <Pill variant="glass" to="/services">
                Explore services
              </Pill>
            </div>
          </div>
          <div className="hero-in pointer-events-auto md:w-[280px]" style={{ '--d': '.45s' }}>
            <p className="font-display text-[15px] font-medium leading-[1.35] text-neutral-900">
              We design and build software, mobile apps, websites, integrations, AI models and AI agents that remove friction and give your business weight.
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">© 2026 — Independent digital studio</p>
            <p className="mt-4 hidden animate-pulse items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 md:flex">
              <ArrowDown className="h-3.5 w-3.5" /> Scroll
            </p>
          </div>
        </div>
      </section>

      {/* 02 drop */}
      <section className="g-sec relative z-10 flex min-h-[100svh] items-center px-6 pb-40 pt-32 md:px-12 md:pt-40">
        <div className="grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="pointer-events-auto lg:col-span-7">
            <Label>02 — Engineering</Label>
            <Lines lines={['When ideas', 'meet engineering.']} className="g-h2 mt-6" />
            <p className="rise g-p mt-8 max-w-lg" style={{ '--d': '.2s' }}>
              Keep scrolling and the field drops into place. That is how we work: ideas meet real engineering, tested against real conditions, until everything settles into something that simply works.
            </p>
          </div>
          <div className="rise pointer-events-auto flex flex-col gap-3.5 lg:col-span-5 lg:pt-3" style={{ '--d': '.25s' }}>
            {[
              ['01', 'Discover', 'Workshop and prototype', 'A clickable plan in the first two weeks'],
              ['02', 'Build', 'Two-week sprints', 'A working demo every time'],
              ['03', 'Launch', 'Live, monitored, improving', 'Your team trained, the code is yours'],
            ].map(([n, k, v, d]) => (
              <div key={n} className="glass-stat">
                <div className="glass-stat-in">
                  <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">
                    <span className="text-neutral-500">{n}</span>
                    {k}
                    <span className="blue-dot ml-auto" />
                  </p>
                  <p className="mt-3 font-display text-[18px] font-semibold text-neutral-900">{v}</p>
                  <p className="mt-1 text-[13px] text-neutral-500">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 shape */}
      <section className="g-sec relative z-10 flex min-h-[100svh] flex-col justify-between px-6 py-36 md:px-12 md:py-44">
        <div className="pointer-events-auto">
          <Label>03 — Form</Label>
          <Lines lines={['Chaos, then form.']} className="g-h2 mt-6 max-w-2xl" />
        </div>
        <div className="pointer-events-auto max-w-sm self-end text-left md:text-right">
          <p className="rise g-p" style={{ '--d': '.15s' }}>
            Scattered spreadsheets, apps and chats reassemble into one clear system. Move your cursor through the shape and watch the order ripple, scatter and recover.
          </p>
          <span className="rise mt-7 inline-flex items-center gap-2 rounded-full border border-white/55 bg-white/35 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-700 backdrop-blur-md" style={{ '--d': '.28s' }}>
            <MousePointer2 className="h-3.5 w-3.5" /> Swipe through it
          </span>
        </div>
      </section>

      {/* 04 release */}
      <section className="g-sec relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 py-36 text-center md:px-12 md:py-44">
        <div className="pointer-events-auto max-w-3xl">
          <Label className="text-center">04 — Release</Label>
          <Lines lines={['And then,', 'weightless.']} className="g-h2 g-h2-xl mx-auto mt-7" />
          <p className="rise g-p mx-auto mt-8 max-w-md" style={{ '--d': '.24s' }}>
            Launch day. The heavy lifting is done, your team is free and the product just runs. Less noise, more gravity.
          </p>
        </div>
      </section>
    </>
  )
}
