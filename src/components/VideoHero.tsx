import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Button } from './blocks.jsx'
import { SplitText, EASE } from './motion.jsx'
import { Rich } from '../lib/rich.jsx'

interface Props {
  src: string
  badge: string
  h1: string[]
  lede: string
  primary: [string, string]
  secondary?: [string, string]
  stats?: string[]
  readouts?: string[]
}

// Plays an mp4 directly, or an HLS (.m3u8) stream via hls.js where the
// browser has no native HLS support.
function useVideoSource(ref: React.RefObject<HTMLVideoElement>, src: string) {
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (!src.endsWith('.m3u8') || v.canPlayType('application/vnd.apple.mpegurl')) {
      v.src = src
      return
    }
    let hls: { destroy: () => void } | undefined
    let cancelled = false
    import('hls.js').then(({ default: Hls }) => {
      if (cancelled || !Hls.isSupported()) return
      const h = new Hls({ capLevelToPlayerSize: true })
      h.loadSource(src)
      h.attachMedia(v)
      hls = h
    })
    return () => {
      cancelled = true
      hls?.destroy()
    }
  }, [ref, src])
}

const fadeUp = (d: number) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.1, ease: EASE, delay: d },
})

export default function VideoHero({ src, badge, h1, lede, primary, secondary, stats, readouts = [] }: Props) {
  const video = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  const rx = useSpring(mx, { stiffness: 300, damping: 30 })
  const ry = useSpring(my, { stiffness: 300, damping: 30 })
  const [tick, setTick] = useState(0)
  useVideoSource(video, src)

  useEffect(() => {
    const iv = setInterval(() => setTick((v) => v + 1), 900)
    return () => clearInterval(iv)
  }, [])

  return (
    <section
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left)
        my.set(e.clientY - r.top)
      }}
    >
      <video ref={video} autoPlay loop muted playsInline preload="auto" onCanPlay={() => setReady(true)} className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000" style={{ opacity: ready ? 1 : 0 }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.55)_0%,transparent_25%,transparent_50%,rgba(0,0,0,.85)_88%,#000_100%)]" />
      <div className="hud-scan pointer-events-none absolute inset-x-0 h-24" aria-hidden="true" />
      <div className="hud-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* frame corners */}
      {['left-4 top-24 border-l border-t', 'right-4 top-24 border-r border-t', 'left-4 bottom-4 border-b border-l', 'right-4 bottom-4 border-b border-r'].map((c) => (
        <span key={c} className={`pointer-events-none absolute h-8 w-8 border-brand-light/70 md:h-12 md:w-12 ${c}`} aria-hidden="true" />
      ))}

      {/* pointer reticle */}
      <motion.div style={{ x: rx, y: ry }} className="pointer-events-none absolute left-0 top-0 hidden md:block" aria-hidden="true">
        <div className="-translate-x-1/2 -translate-y-1/2">
          <svg width="88" height="88" viewBox="0 0 88 88" className="animate-[spin_8s_linear_infinite] text-brand-light/80">
            <circle cx="44" cy="44" r="30" fill="none" stroke="currentColor" strokeDasharray="4 6" />
            <path d="M44 4v14M44 70v14M4 44h14M70 44h14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </motion.div>

      {/* readouts */}
      <div className="pointer-events-none absolute right-6 top-28 hidden flex-col items-end gap-1 font-mono text-[11px] text-brand-light/80 md:flex">
        {readouts.map((r, i) => (
          <motion.span key={r} {...fadeUp(1.2 + i * 0.1)}>
            {r.replace('{n}', String(8 + ((tick * 7) % 9)))}
          </motion.span>
        ))}
      </div>

      <div className="wrap relative z-10 flex flex-1 items-end justify-center pb-14 pt-40">
        <div className="flex max-w-[1000px] flex-col items-center text-center">
          <motion.span {...fadeUp(0.15)} className="badge">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-light shadow-[0_0_10px_#60B1FF]" />
            {badge}
          </motion.span>
          <SplitText lines={h1} delay={0.3} className="mt-6 font-fustat text-[clamp(40px,6vw,84px)] font-bold leading-[1.02] tracking-[-.045em] text-white" />
          <motion.p {...fadeUp(0.8)} className="mt-6 max-w-[600px] text-[clamp(16px,1.3vw,18.5px)] leading-[1.6] text-white/70">
            <Rich text={lede} />
          </motion.p>
          <motion.div {...fadeUp(0.95)} className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to={primary[1]}>{primary[0]}</Button>
            {secondary && (
              <Button to={secondary[1]} variant="glass">
                {secondary[0]}
              </Button>
            )}
          </motion.div>
        </div>
      </div>
      {stats && (
        <div className="wrap relative z-10 grid gap-3 pb-10 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div key={s} {...fadeUp(1.1 + i * 0.12)} className="liquid-glass flex items-center gap-3 rounded-2xl px-4 py-3 text-[14px] text-white">
              <span className="font-mono text-[11px] text-brand-light">0{i + 1}</span>
              {s}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
