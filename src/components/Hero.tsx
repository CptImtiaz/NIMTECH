import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { hasWebGL, THEMES, type CoreId, type NodeLayout } from '../three/themes'
import type { Stage } from '../three/Stage'
import { REDUCE } from '../lib/canvas.js'
import { Rich } from '../lib/rich.jsx'
import { Button } from './blocks.jsx'
import { EASE, SplitText } from './motion.jsx'

interface Props {
  core?: CoreId
  layout?: NodeLayout
  badge: string
  h1: string[]
  lede?: string
  primary?: [string, string]
  secondary?: [string, string]
  stats?: string[]
  children?: React.ReactNode
  aside?: React.ReactNode
  onStage?: (s: StageHandle) => void
}

export interface StageHandle {
  switchTo: (id: CoreId) => boolean
}

const fade = (d: number) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.1, ease: EASE, delay: d },
})

// Bubbles rising through the hero, as in the original stage.
function Bubbles() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (REDUCE) return
    const iv = setInterval(() => {
      const box = ref.current
      if (!box || document.hidden) return
      const b = document.createElement('span')
      const size = Math.random() * 20 + 10
      const d = Math.random() * 6 + 4
      b.className = 'bubble'
      b.style.width = `${size}px`
      b.style.left = `${Math.random() * 100}%`
      b.style.opacity = String(Math.random() * 0.4 + 0.2)
      b.style.animation = `floatUp ${d}s linear forwards`
      box.appendChild(b)
      setTimeout(() => b.remove(), d * 1000)
    }, 450)
    return () => clearInterval(iv)
  }, [])
  return <div ref={ref} className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true" />
}

// The shared hero: theme-tinted radial background, the 3D stage anchored to
// a layout slot, copy in a fixed column, optional right-hand aside (home).
export default function Hero({ core = 'brand', layout = 'side', badge, h1, lede, primary, secondary, stats, children, aside, onStage }: Props) {
  const host = useRef<HTMLElement>(null)
  const anchor = useRef<HTMLDivElement>(null)
  const bg = useRef<HTMLCanvasElement>(null)
  const coreCv = useRef<HTMLCanvasElement>(null)
  const fg = useRef<HTMLCanvasElement>(null)
  const [webgl] = useState(hasWebGL)
  const { scrollYProgress } = useScroll({ target: host, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const o = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const theme = THEMES[core]

  useEffect(() => {
    if (!webgl || !host.current || !anchor.current || !bg.current || !coreCv.current || !fg.current) return
    let stage: Stage | undefined
    let dead = false
    const h = host.current
    const els = { host: h, anchor: anchor.current, bg: bg.current, core: coreCv.current, fg: fg.current }
    // three.js loads on demand so the page paints first
    import('../three/Stage').then(({ createStage }) => {
      if (dead) return
      try {
        stage = createStage({ ...els, id: core, layout, reduce: REDUCE })
      } catch (e) {
        console.error('3D stage unavailable', e)
        return
      }
      onStage?.({
        switchTo: (id) => {
          const ok = stage!.switchTo(id)
          if (ok) {
            const t = THEMES[id]
            gsap.to(h, { '--bg-inner': t[0], '--bg-mid': t[1], '--bg-outer': t[2], duration: REDUCE ? 0 : 1.5, ease: 'power2.inOut' })
          }
          return ok
        },
      })
    })
    return () => {
      dead = true
      stage?.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webgl, core, layout])

  const home = layout === 'home'
  return (
    <section
      ref={host}
      className="stage-hero relative isolate overflow-hidden"
      style={{ '--bg-inner': theme[0], '--bg-mid': theme[1], '--bg-outer': theme[2] } as React.CSSProperties}
    >
      <Bubbles />
      <canvas ref={bg} className="pointer-events-none absolute inset-0 z-[1] h-full w-full" aria-hidden="true" />
      <canvas ref={coreCv} className="stage-core pointer-events-none absolute inset-0 z-[2] h-full w-full" aria-hidden="true" />

      <motion.div style={{ y, opacity: o }} className="wrap relative z-[3] grid min-h-[100svh] items-center gap-y-6 pb-32 pt-28 lg:grid-cols-12 lg:gap-x-8 lg:pb-28 lg:pt-32">
        <div className={`order-2 min-w-0 lg:order-1 ${home ? 'lg:col-span-5' : 'lg:col-span-7'}`}>
          <motion.span {...fade(0.15)} className="badge">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-cyan shadow-[0_0_12px_#3EE7FF]" />
            {badge}
          </motion.span>
          <SplitText
            lines={h1}
            delay={0.3}
            stagger={0.05}
            className={`mt-6 font-display font-semibold leading-[1.04] tracking-[-.035em] text-ink ${home ? 'text-[clamp(42px,4.8vw,76px)]' : 'text-[clamp(36px,3.9vw,60px)]'}`}
          />
          {lede && (
            <motion.p {...fade(0.75)} className="mt-6 max-w-[34rem] text-[clamp(16px,1.2vw,18px)] leading-[1.65] text-ink-soft">
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

        <div ref={anchor} className={`order-1 h-[38svh] min-h-[260px] lg:order-2 lg:h-[64vh] ${home ? 'lg:col-span-4' : 'lg:col-span-5'}`} aria-hidden="true">
          {!webgl && <div className="orb-fallback mx-auto aspect-square h-full max-h-[420px] rounded-full" />}
        </div>

        {aside && <div className="order-3 min-w-0 lg:col-span-3">{aside}</div>}
      </motion.div>

      <canvas ref={fg} className="pointer-events-none absolute inset-0 z-[4] h-full w-full" aria-hidden="true" />

      {stats && (
        <div className="relative z-[5] -mt-24 pb-7 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0">
          <div className="wrap">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {stats.map((s, i) => (
                <motion.div key={s} {...fade(1.1 + i * 0.12)} className="flex items-center gap-3 bg-night/75 px-5 py-4 text-[14px] text-ink backdrop-blur-xl">
                  <span className="font-mono text-[11px] text-brand-cyan">0{i + 1}</span>
                  {s}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
