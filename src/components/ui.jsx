import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'

const up = (d = 0) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.7, ease: [0.16, 1, 0.3, 1] } })

// Dark first screen for inner pages: eyebrow, big headline, short line,
// optional picture on the right.
export function PageHero({ eyebrow, title, accent, text, image, imageAlt = '', children }) {
  return (
    <section className="relative isolate overflow-hidden bg-black pb-20 pt-36 text-white md:pb-28 md:pt-44" data-theme="dark">
      <div className="pointer-events-none absolute left-[10%] top-[-30%] -z-10 h-[620px] w-[620px] rounded-full bg-[#3054ff]/25 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-30%] right-[5%] -z-10 h-[520px] w-[520px] rounded-full bg-[#a068ff]/20 blur-[140px]" />
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <div className={`wrap grid items-center gap-12 ${image ? 'lg:grid-cols-[1.1fr_.9fr]' : ''}`}>
        <div>
          <motion.span {...up(0)} className="eyebrow text-white/75">
            {eyebrow}
          </motion.span>
          <motion.h1 {...up(0.08)} className="display mt-6 max-w-[16ch] text-[44px] sm:text-6xl lg:text-[80px]">
            {title} {accent && <em className="bg-gradient-to-r from-white to-[#b4c0ff] bg-clip-text pr-2 text-transparent">{accent}</em>}
          </motion.h1>
          {text && (
            <motion.p {...up(0.16)} className="lede mt-6 max-w-[54ch] text-white/70">
              {text}
            </motion.p>
          )}
          {children && <motion.div {...up(0.24)}>{children}</motion.div>}
        </div>
        {image && (
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative">
            <div className="absolute inset-[12%] -z-10 rounded-full bg-[#3054ff]/30 blur-3xl" />
            <img src={image} alt={imageAlt} className="float-y mx-auto w-full max-w-[520px]" />
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Primary call to action used on every page.
export function StartButton({ to = '/contact', children = 'Start your project', light = true }) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-4 rounded-full py-2 pl-6 pr-2 font-display text-lg font-medium transition-all duration-300 hover:scale-[1.03] ${light ? 'bg-white text-[#0a0400] hover:shadow-[0_0_24px_rgba(255,255,255,0.3)]' : 'bg-black text-white'}`}>
      {children}
      <span className="arrow-dot">
        <ArrowRight className="h-5 w-5" />
      </span>
    </Link>
  )
}

export function Faq({ items, title = 'Questions, answered.' }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rise">
          <span className="eyebrow">FAQ</span>
          <h2 className="h2 mt-5">{title}</h2>
        </div>
        <ul className="divide-y divide-black/10 border-y border-black/10">
          {items.map(([q, a], i) => (
            <li key={q} className="rise" style={{ '--d': `${i * 0.05}s` }}>
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{q}</h3>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/15 transition-transform duration-500 ${open === i ? 'rotate-45 bg-black text-white' : ''}`}>
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <div className={`grid transition-all duration-500 ${open === i ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'}`}>
                <p className="overflow-hidden text-[17px] leading-relaxed text-neutral-600">{a}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// Closing call to action: a big rounded panel with a moving gradient.
export function CtaBand({ title = 'Have an idea?', accent = 'Let’s build it.', text = 'Tell us what you want to fix or build. We reply within one working day with questions and a first plan.' }) {
  return (
    <section className="bg-white px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="cta-band rise relative isolate overflow-hidden rounded-[32px] px-6 py-20 text-center text-white md:py-28" data-theme="dark">
        <h2 className="display mx-auto max-w-[14ch] text-5xl md:text-7xl">
          {title} <em>{accent}</em>
        </h2>
        <p className="lede mx-auto mt-6 max-w-[46ch] text-white/75">{text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <StartButton />
        </div>
      </div>
    </section>
  )
}
