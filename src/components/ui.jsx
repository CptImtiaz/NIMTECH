import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'
import Photo from './Photo.jsx'

const EASE = [0.16, 1, 0.3, 1]
const up = (d = 0) => ({ initial: { opacity: 0, y: 28, filter: 'blur(8px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' }, transition: { delay: d, duration: 0.9, ease: EASE } })

// First screen for inner pages: a full-bleed photo that slowly zooms,
// dark veil, grid, and the headline rising in.
export function PageHero({ eyebrow, title, accent, text, image, tags, children }) {
  return (
    <section className="ph" data-theme="dark">
      {image && (
        <div className="ph-bg" aria-hidden="true">
          <Photo src={image} eager />
        </div>
      )}
      <div className="ph-veil" aria-hidden="true" />
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="ph-orb" aria-hidden="true" />
      <div className="wrap relative">
        <motion.span {...up(0)} className="hx-pill">
          <span className="hx-live" /> {eyebrow}
        </motion.span>
        <motion.h1 {...up(0.08)} className="display mt-7 max-w-[17ch] text-[46px] sm:text-6xl lg:text-[84px]">
          {title} {accent && <em className="grad-text pr-2">{accent}</em>}
        </motion.h1>
        {text && (
          <motion.p {...up(0.18)} className="lede mt-6 max-w-[56ch] text-white/70">
            {text}
          </motion.p>
        )}
        {tags && (
          <motion.ul {...up(0.26)} className="mt-8 flex flex-wrap gap-2">
            {tags.map((t) => (
              <li key={t} className="rounded-full border border-white/15 bg-white/[.06] px-4 py-1.5 text-sm text-white/80 backdrop-blur-md">
                {t}
              </li>
            ))}
          </motion.ul>
        )}
        {children && <motion.div {...up(0.32)}>{children}</motion.div>}
      </div>
    </section>
  )
}

// Primary call to action used on every page.
export function StartButton({ to = '/contact', children = 'Start your project' }) {
  return (
    <Link to={to} className="start-btn group">
      <span className="relative">{children}</span>
      <span className="arrow-dot relative">
        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}

export function Faq({ items, title = 'Questions, answered.' }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <span className="eyebrow rise text-white/70">FAQ</span>
          <h2 className="h2 rise mt-5">{title}</h2>
        </div>
        <ul className="grid gap-3">
          {items.map(([q, a], i) => (
            <li key={q} className={`faq-item rise ${open === i ? 'on' : ''}`} style={{ '--d': `${i * 0.05}s` }}>
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 p-6 text-left">
                <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{q}</h3>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-500 ${open === i ? 'rotate-45 bg-white text-black' : ''}`}>
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <div className={`grid transition-all duration-500 ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <p className="overflow-hidden px-6 pb-6 text-[17px] leading-relaxed text-white/65">{a}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// Closing call to action: a glowing orb rising over a horizon.
export function CtaBand({ title = 'Have an idea?', accent = 'Let’s build it.', text = 'Tell us what you want to fix or build. We reply within one working day with questions and a first plan.' }) {
  return (
    <section className="px-3 pb-3 pt-10 sm:px-5 sm:pb-5">
      <div className="cta rise" data-theme="dark">
        <div className="cta-orb" aria-hidden="true" />
        <div className="cta-rings" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="relative">
          <h2 className="display mx-auto max-w-[14ch] text-5xl md:text-7xl">
            {title} <em className="grad-text">{accent}</em>
          </h2>
          <p className="lede mx-auto mt-6 max-w-[46ch] text-white/70">{text}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <StartButton />
          </div>
        </div>
      </div>
    </section>
  )
}
