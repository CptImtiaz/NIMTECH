import { forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { REDUCE, useReduced } from '../../lib/canvas.js'
import { Cradle, Doodle, DOODLES } from './Doodles.jsx'
import NestPhone, { APP, FeedCard } from './NestPhone.jsx'

const NAMES = Object.keys(DOODLES)

function rng(seed) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
}

// A heap of doodles spilling up from a bottom corner. Items settle in on
// load (no bounce) and drift a little with scroll.
function Pile({ side, count }) {
  const items = useMemo(() => {
    const r = rng(side === 'left' ? 17 : 41)
    return Array.from({ length: count }, (_, i) => {
      const u = Math.pow(r(), 1.35) // 0 = corner, 1 = toward the phone
      const h = (1 - u) ** 1.25 * 80 + 6 // heap height in % at this x
      return {
        name: NAMES[(i * 7 + (side === 'left' ? 0 : 3)) % NAMES.length],
        x: u * 86 - 4,
        y: Math.pow(r(), 1.4) * h - 3,
        size: 56 + r() * 46,
        rot: (r() - 0.5) * 70,
        d: 0.25 + (i / count) * 0.9 + r() * 0.2,
        z: Math.round((1 - u) * 10 + r() * 5),
      }
    })
  }, [side, count])
  return (
    <div className={`pile pile-${side}`} aria-hidden="true">
      {items.map((it, i) => (
        <span
          key={i}
          className="pile-item"
          style={{ [side]: `${it.x}%`, bottom: `${it.y}%`, zIndex: it.z, '--r': `${it.rot}deg`, '--d': `${it.d}s` }}
        >
          <Doodle name={it.name} size={it.size} />
        </span>
      ))}
    </div>
  )
}

function StoreButton({ to, children, small }) {
  return (
    <Link to={to} className={`nest-black ${small ? 'h-10 px-4 text-[13px]' : 'h-[52px] px-6 text-[15px]'}`}>
      {children}
    </Link>
  )
}

/* ---------- hero (daylight) ---------- */
export function DayHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const reduced = useReduced()
  const lift = useTransform(scrollYProgress, [0, 1], [0, -60])
  const sink = useTransform(scrollYProgress, [0, 1], [0, 50])
  return (
    <section ref={ref} className="relative overflow-hidden pt-[150px] md:pt-[170px]">
      <div className="relative z-10 mx-auto max-w-[760px] px-5 text-center">
        <h1 className="nest-h1">
          Apps people open at 4am
          <span className="block text-[var(--ink-muted)]">without thinking.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[360px] text-[16px] leading-6 text-[var(--ink-soft)]">We design and build iPhone and Android apps around the moment people actually use them. A working prototype in two weeks, both app stores after that.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <StoreButton to="/contact?service=apps">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M12 3l9 5v8l-9 5-9-5V8z" opacity=".25" />
              <path d="M12 3l9 5-9 5-9-5z" />
            </svg>
            Start your app
          </StoreButton>
          <a href="#home-screen" onClick={(e) => (e.preventDefault(), document.getElementById('home-screen')?.scrollIntoView({ behavior: 'smooth' }))} className="nest-ghost">
            See the concept app →
          </a>
        </div>
        <p className="mt-4 text-[13px] text-[var(--ink-soft)]">Fixed-price discovery. You own the code. Not a template.</p>
      </div>

      <motion.div style={{ y: reduced ? 0 : lift }} className="relative z-10 mx-auto mt-14 w-fit pb-24">
        <NestPhone className="nest-phone-lg" />
        <p className="mt-5 text-center text-[12px] text-[var(--ink-faint)]">{APP}, a concept baby-tracking app designed by NIMTECH</p>
      </motion.div>

      <motion.div style={{ y: reduced ? 0 : sink }} className="pointer-events-none absolute inset-x-0 bottom-0 top-[42%]">
        <Pile side="left" count={36} />
        <Pile side="right" count={36} />
      </motion.div>
    </section>
  )
}

/* ---------- the home screen (night falls) ---------- */
export function HomeScreenNight({ onNight }) {
  const ref = useRef(null)
  const wrap = useRef(null)
  const slot = useRef(null)
  const card = useRef(null)
  const [out, setOut] = useState(false)
  const [geo, setGeo] = useState(null)

  // place the pop-out: it starts exactly over the in-phone Feed card and
  // ends 1.5× larger, overlapping the phone's left edge
  useLayoutEffect(() => {
    const measure = () => {
      const w = wrap.current?.getBoundingClientRect()
      const f = slot.current?.getBoundingClientRect()
      if (!w || !f) return
      const left = f.left - w.left - f.width * 1.5 * 0.42
      const top = f.top - w.top - f.height * 0.25
      setGeo({ left, top, width: f.width, dx: f.left - w.left - left, dy: f.top - w.top - top })
    }
    measure()
    document.fonts?.ready.then(measure)
    addEventListener('resize', measure)
    return () => removeEventListener('resize', measure)
  }, [])
  const [time, setTime] = useState({ p: 0, label: '4:12am', show: false })

  useEffect(() => {
    // night falls as the section rises past the middle of the screen and
    // lifts again before the light sections after it
    let raf = 0
    const tick = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect(), vh = innerHeight
      const n = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / (vh * 0.35))) * Math.min(1, Math.max(0, (r.bottom - vh * 0.45) / (vh * 0.3)))
      onNight?.(n)
      const k = Math.min(1, Math.max(0, (vh * 0.5 - r.top) / r.height))
      const mins = k < 0.6 ? 12 + Math.round((k / 0.6) * 21) : 33 + Math.round(((k - 0.6) / 0.4) * 9)
      setTime({ p: k, label: `4:${String(mins).padStart(2, '0')}am`, show: n > 0.6 })
    }
    const on = () => raf || (raf = requestAnimationFrame(tick))
    tick()
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    return () => {
      removeEventListener('scroll', on)
      removeEventListener('resize', on)
      cancelAnimationFrame(raf)
    }
  }, [onNight])

  useEffect(() => {
    if (REDUCE) return void setOut(true)
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOut(true), { threshold: 0.35 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} id="home-screen" data-theme="dark" className="night-text relative py-28 md:py-40">
      <div className="clock-rail" style={{ opacity: time.show ? 1 : 0 }} aria-hidden="true">
        <div className="clock-ticks" />
        <span className="clock-label" style={{ top: `${8 + time.p * 80}%` }}>
          {time.label}
        </span>
      </div>
      <div className="mx-auto grid max-w-[1180px] items-center gap-16 px-5 md:px-10 lg:grid-cols-2">
        <div>
          <span className="nest-eyebrow">The home screen</span>
          <h2 className="nest-h2 mt-6">
            See the last feed
            <span className="block text-[var(--nt-faint)]">at a glance.</span>
          </h2>
          <p className="mt-6 max-w-[440px] text-[16px] leading-6 text-[var(--nt-soft)]">It is 4am, neither of you can remember, and neither of you wants to be the one who asks. The card at the top of the home screen already says: 4h 50m ago, 90ml.</p>
          <p className="mt-4 max-w-[440px] text-[14px] leading-6 text-[var(--nt-faint)]">That is how we design every app: find the one question people have at the worst moment, and answer it before they ask.</p>
          <Cradle className="mt-10 w-[min(320px,80%)]" />
        </div>
        <div ref={wrap} className="relative mx-auto">
          <NestPhone className="nest-phone-sm" feedRef={slot} hideFeed ago="4h 50m" amount="90" perch />
          {geo && (
            <FeedCard
              ref={card}
              ago="4h 50m"
              amount="90"
              className={`nest-pop ${out ? 'out' : ''}`}
              style={{ left: geo.left, top: geo.top, width: geo.width, '--dx': `${geo.dx}px`, '--dy': `${geo.dy}px` }}
            />
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------- day → night backdrop ---------- */
// Fixed behind the page; the parent sets the night layer's opacity.
export const NightBackdrop = forwardRef(function NightBackdrop(_, ref) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <div className="nest-day absolute inset-0" />
      <div ref={ref} className="nest-night absolute inset-0" style={{ opacity: 0 }} />
    </div>
  )
})
