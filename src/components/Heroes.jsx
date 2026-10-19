import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { VIS } from '../lib/visuals.js'
import { Rich } from '../lib/rich.jsx'
import { Button } from './blocks.jsx'
import { Spark } from './Icons.jsx'
import { EASE, SplitText } from './motion.jsx'

const fadeUp = (d) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.1, ease: EASE, delay: d },
})

function HeroCanvas({ vis }) {
  const ref = useRef(null)
  useEffect(() => VIS[vis]?.(ref.current), [vis])
  return <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-40 md:opacity-100" aria-hidden="true" />
}

function Badge({ children, d = 0.15 }) {
  return (
    <motion.span {...fadeUp(d)} className="badge">
      <motion.span initial={{ scale: 0.2, rotate: -60 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.9, ease: EASE, delay: d + 0.1 }} className="text-brand">
        <Spark className="h-4 w-4" />
      </motion.span>
      {children}
    </motion.span>
  )
}

export function PageHero({ vis = 'orbit', badge, h1, lede, primary, secondary, stats, tall = false }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const o = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  return (
    <section ref={ref} className={`relative flex flex-col overflow-hidden ${tall ? 'min-h-[100svh]' : 'min-h-[86svh]'}`}>
      <motion.div style={{ y }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.8, delay: 0.1 }} className="pointer-events-auto absolute inset-0">
        <HeroCanvas vis={vis} />
      </motion.div>
      <div className="hero-veil pointer-events-none absolute inset-0" aria-hidden="true" />
      <motion.div style={{ opacity: o }} className="wrap relative z-10 flex flex-1 items-end justify-center pb-16 pt-40">
        <div className="flex max-w-[1000px] flex-col items-center text-center">
          <Badge>{badge}</Badge>
          <SplitText lines={h1} delay={0.3} className="mt-6 font-fustat text-[clamp(40px,6vw,80px)] font-bold leading-[1.04] tracking-[-.045em] text-ink" />
          <motion.p {...fadeUp(0.8)} className="mt-6 max-w-[580px] text-[clamp(16px,1.3vw,18.5px)] leading-[1.6] text-ink-soft">
            <Rich text={lede} />
          </motion.p>
          <motion.div {...fadeUp(0.95)} className="mt-9 flex flex-wrap justify-center gap-3">
            {primary && <Button to={primary[1]}>{primary[0]}</Button>}
            {secondary && <Button to={secondary[1]} variant="glass" onClick={secondary[2]}>{secondary[0]}</Button>}
          </motion.div>
        </div>
      </motion.div>
      {stats && (
        <div className="wrap relative z-10 grid gap-3 pb-10 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div key={s} {...fadeUp(1.1 + i * 0.12)} className="glass flex items-center gap-3 rounded-2xl px-4 py-3 text-[14px] text-ink">
              <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-brand text-white">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 12 4.5 4.5L19 7" />
                </svg>
              </span>
              {s}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
