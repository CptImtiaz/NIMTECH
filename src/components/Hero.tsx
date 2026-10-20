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
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay: d },
})

// The shared hero: copy on the left, the service's 3D scene centred on an
// anchor slot on the right (above the copy on phones), stats along the base.
export default function Hero({ core = 'globe', layout = 'side', badge, h1, lede, primary, secondary, stats, children, aside, onStage }: Props) {
  const host = useRef<HTMLElement>(null)
  const anchor = useRef<HTMLDivElement>(null)
  const cv = useRef<HTMLCanvasElement>(null)
  // null until mounted, so the prerendered HTML and hydration agree
  const [webgl, setWebgl] = useState<boolean | null>(null)
  const [ready, setReady] = useState(false)
  const [poster, setPoster] = useState(core)
  useEffect(() => {
    const run = () => setWebgl(hasWebGL())
    if (!('requestIdleCallback' in window)) return void setTimeout(run, 200)
    const id = requestIdleCallback(run, { timeout: 1200 })
    return () => cancelIdleCallback(id)
  }, [])
  const { scrollYProgress } = useScroll({ target: host, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -60])
  const o = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const theme = THEMES[core]

  useEffect(() => {
    if (!webgl || !host.current || !anchor.current || !cv.current) return
    let stage: Stage | undefined
    let dead = false
    const h = host.current
    const els = { host: h, anchor: anchor.current, canvas: cv.current }
    // three.js loads on demand, and the scene is built once the browser is
    // idle, so the copy paints and responds first
    const idle = (cb: () => void) => ('requestIdleCallback' in window ? requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 300))
    import('../three/Stage').then(({ createStage }) => new Promise<typeof createStage>((ok) => idle(() => ok(createStage)))).then((createStage) => {
      if (dead) return
      try {
        stage = createStage({ ...els, id: core, reduce: REDUCE })
      } catch (e) {
        console.error('3D stage unavailable', e)
        setWebgl(false)
        return
      }
      setReady(true)
      if (new URLSearchParams(location.search).has('poster')) (window as unknown as { __stage: Stage }).__stage = stage
      onStage?.({
        switchTo: (id) => {
          const ok = stage!.switchTo(id)
          if (ok) {
            const t = THEMES[id]
            gsap.to(h, { '--bg-inner': t[0], '--bg-mid': t[1], '--bg-outer': t[2], duration: REDUCE ? 0 : 1.2, ease: 'power2.inOut' })
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
  }, [webgl, core])

  // without WebGL the switcher still changes the static poster
  useEffect(() => {
    if (webgl === false) onStage?.({ switchTo: (id) => (setPoster(id), true) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webgl])

  const home = layout === 'home'
  return (
    <section
      ref={host}
      className="stage-hero relative isolate overflow-hidden"
      style={{ '--bg-inner': theme[0], '--bg-mid': theme[1], '--bg-outer': theme[2] } as React.CSSProperties}
    >
      <div className="hero-grid pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      <canvas ref={cv} className={`pointer-events-none absolute inset-0 z-[1] h-full w-full transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />

      <motion.div style={{ y, opacity: o }} className="wrap relative z-[3] grid min-h-[100svh] items-center gap-y-4 pb-36 pt-28 lg:grid-cols-12 lg:gap-x-10 lg:pb-32 lg:pt-36">
        <div className={`order-2 min-w-0 lg:order-1 ${home ? 'lg:col-span-5' : 'lg:col-span-6'}`}>
          <motion.span {...fade(0.1)} className="kicker">
            {badge}
          </motion.span>
          <SplitText
            lines={h1}
            delay={0.2}
            stagger={0.045}
            className={`mt-5 font-display font-bold leading-[1.05] tracking-[-.03em] text-ink ${home ? 'text-[clamp(40px,4.3vw,64px)]' : 'text-[clamp(36px,3.7vw,56px)]'}`}
          />
          {lede && (
            <motion.p {...fade(0.6)} className="mt-6 max-w-[36rem] text-[clamp(16px,1.2vw,18.5px)] leading-[1.6] text-ink-soft">
              <Rich text={lede} />
            </motion.p>
          )}
          {children && <motion.div {...fade(0.7)}>{children}</motion.div>}
          {(primary || secondary) && (
            <motion.div {...fade(0.8)} className="mt-9 flex flex-wrap gap-3">
              {primary && <Button to={primary[1]}>{primary[0]}</Button>}
              {secondary && (
                <Button to={secondary[1]} variant="ghost">
                  {secondary[0]}
                </Button>
              )}
            </motion.div>
          )}
        </div>

        <div ref={anchor} className={`order-1 h-[40svh] min-h-[280px] lg:order-2 lg:h-[66vh] ${home ? 'lg:col-span-5' : 'lg:col-span-6'}`} aria-hidden="true">
          {webgl === false && (
            <div className="grid h-full place-items-center">
              <img src={`/posters/${poster}.webp`} alt="" width="900" height="900" className="poster max-h-full w-auto max-w-full" />
            </div>
          )}
        </div>

        {aside && <div className="order-3 hidden min-w-0 lg:col-span-2 lg:block">{aside}</div>}
      </motion.div>

      {stats && (
        <div className="relative z-[5] -mt-28 pb-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0">
          <div className="wrap">
            <div className="grid border-t border-line sm:grid-cols-3">
              {stats.map((s, i) => (
                <motion.div key={s} {...fade(0.9 + i * 0.1)} className="flex items-baseline gap-3 py-5 pr-6 text-[14.5px] text-ink sm:border-l sm:border-line sm:pl-6 sm:first:border-l-0 sm:first:pl-0">
                  <span className="font-mono text-[11px] text-brand">0{i + 1}</span>
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
