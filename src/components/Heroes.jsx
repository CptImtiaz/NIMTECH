import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { VIS } from '../lib/visuals.js'
import { Rich } from '../lib/rich.jsx'
import { Button } from './blocks.jsx'
import { Icon, Spark, Star } from './Icons.jsx'
import { EASE, SplitText } from './motion.jsx'
import Orb from './Orb.jsx'

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

const ORBIT_CHIPS = [
  ['agents', 'AI Agents', 'left-[2%] top-[18%]', 0],
  ['vision', 'Computer Vision', 'right-[0%] top-[10%]', 0.8],
  ['apps', 'iOS & Android', 'right-[4%] bottom-[22%]', 1.6],
  ['api', 'Integrations', 'left-[6%] bottom-[14%]', 2.4],
]

export function HomeHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const copyO = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative overflow-hidden pb-10 pt-36 md:pt-44">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <HeroCanvas vis="home" />
      </div>
      <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="wrap relative grid items-center gap-6 lg:grid-cols-[1.05fr_1fr]">
        <motion.div style={{ y: copyY, opacity: copyO }} className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div {...fadeUp(0.1)} className="rating">
            <span className="flex gap-0.5 text-star" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 + i * 0.07, type: 'spring', stiffness: 400, damping: 14 }}>
                  <Star className="h-4 w-4" />
                </motion.span>
              ))}
            </span>
            <span>Rated 4.9/5 by 2700+ customers</span>
          </motion.div>

          <SplitText
            lines={['Turn ideas into <em>intelligent</em>', 'systems that ship.']}
            delay={0.25}
            stagger={0.06}
            className="mt-7 font-fustat text-[44px] font-bold leading-[1.05] tracking-[-2px] text-ink sm:text-[60px] lg:text-[75px]"
          />

          <motion.p {...fadeUp(0.75)} className="mt-6 max-w-[540px] text-[18px] leading-[1.55] tracking-[-.4px] text-ink-soft">
            NIMTECH designs, builds and runs AI agents, custom vision models, software, apps and integrations for companies around the world.
          </motion.p>

          <motion.div {...fadeUp(0.9)} className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button to="/contact">Start a Project</Button>
            <Button to="/services" variant="glass">Explore Services</Button>
          </motion.div>

          <motion.ul {...fadeUp(1.05)} className="mt-12 grid w-full max-w-[560px] grid-cols-3 gap-4 border-t border-line pt-6 text-left">
            {[['6', 'practices, one senior team'], ['2‑wk', 'sprints with live demos'], ['100%', 'code, models & data are yours']].map(([n, l]) => (
              <li key={l}>
                <b className="block font-fustat text-[26px] font-bold tracking-[-1px] text-ink">{n}</b>
                <span className="text-[13px] leading-snug text-ink-soft">{l}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div style={{ y: orbY, scale: orbScale }} className="relative mx-auto aspect-square w-full max-w-[640px]">
          <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.8, ease: EASE, delay: 0.2 }} className="absolute inset-0">
            <Orb className="h-full w-full scale-125" />
          </motion.div>
          {ORBIT_CHIPS.map(([icon, label, pos, d]) => (
            <motion.div
              key={label}
              className={`absolute ${pos} hidden sm:block`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
              transition={{ opacity: { delay: 1 + d * 0.2, duration: 0.8 }, scale: { delay: 1 + d * 0.2, duration: 0.8, ease: EASE }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: d } }}
            >
              <div className="glass-strong flex items-center gap-2 rounded-2xl px-3.5 py-2.5 text-sm font-medium text-ink">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand/10 text-brand">
                  <Icon name={icon} className="h-4 w-4" />
                </span>
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
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
