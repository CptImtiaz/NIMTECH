import { lazy, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Variant } from '../three/Scene'
import { Rich } from '../lib/rich.jsx'
import { Button } from './blocks.jsx'
import { EASE, SplitText } from './motion.jsx'

const Scene = lazy(() => import('../three/Scene'))

interface Props {
  scene?: Variant
  badge: string
  h1: string[]
  lede?: string
  primary?: [string, string]
  secondary?: [string, string]
  stats?: string[]
  size?: 'xl' | 'lg'
  children?: React.ReactNode
}

const fade = (d: number) => ({
  initial: { opacity: 0, y: 26, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.1, ease: EASE, delay: d },
})

// The one hero used by every page: 3D scene on the right (behind on
// phones), copy locked to the same left column, stats strip at the base.
export default function Hero({ scene = 'orbit', badge, h1, lede, primary, secondary, stats, size = 'lg', children }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -90])
  const o = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <motion.div className="absolute inset-0" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2, ease: EASE }}>
        <Suspense fallback={<div className="hero-glow absolute inset-0" />}>
          <Scene variant={scene} />
        </Suspense>
      </motion.div>
      <div className="hero-veil pointer-events-none absolute inset-0" aria-hidden="true" />

      <motion.div style={{ y, opacity: o }} className="wrap relative z-10 flex flex-1 flex-col pb-10 pt-[44svh] lg:justify-center lg:pb-12 lg:pt-32">
        <div className="max-w-[790px]">
          <motion.span {...fade(0.15)} className="badge">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-cyan shadow-[0_0_12px_#5CE1FF]" />
            {badge}
          </motion.span>
          <SplitText
            lines={h1}
            delay={0.3}
            stagger={0.05}
            className={`mt-6 font-display font-semibold leading-[1.02] tracking-[-.04em] text-ink ${size === 'xl' ? 'text-[clamp(42px,5.3vw,88px)]' : 'text-[clamp(36px,4.3vw,70px)]'}`}
          />
          {lede && (
            <motion.p {...fade(0.75)} className="mt-6 max-w-[560px] text-[clamp(16px,1.25vw,18.5px)] leading-[1.6] text-ink-soft">
              <Rich text={lede} />
            </motion.p>
          )}
          {children && <motion.div {...fade(0.85)}>{children}</motion.div>}
          {(primary || secondary) && (
            <motion.div {...fade(0.95)} className="mt-9 flex flex-wrap gap-3">
              {primary && <Button to={primary[1]}>{primary[0]}</Button>}
              {secondary && (
                <Button to={secondary[1]} variant="glass">
                  {secondary[0]}
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {stats && (
        <div className="wrap relative z-10 pb-8">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {stats.map((s, i) => (
              <motion.div key={s} {...fade(1.1 + i * 0.12)} className="flex items-center gap-3 bg-night/80 px-5 py-4 text-[14px] text-ink backdrop-blur-xl">
                <span className="font-mono text-[11px] text-brand-cyan">0{i + 1}</span>
                {s}
              </motion.div>
            ))}
          </div>
        </div>
      )}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 lg:block" aria-hidden="true">
        <span className="scroll-cue" />
      </motion.div>
    </section>
  )
}
