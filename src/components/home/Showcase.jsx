import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../../data/projects.js'
import { SERVICES } from '../../data/services.js'
import { useReduced } from '../../lib/canvas.js'
import Photo from '../Photo.jsx'

const IDS = ['food', 'boat', 'company', 'roro', 'skin', 'whatsapp', 'fintech', 'health', 'tracking', 'courier']

// Projects we have built, as a gallery that slides sideways while the
// section is pinned. Phones get a swipeable row instead.
export default function Showcase() {
  const list = IDS.map((id) => PROJECTS.find((p) => p.id === id))
  const wrap = useRef(null)
  const track = useRef(null)
  const reduced = useReduced()
  const [dist, setDist] = useState(0)
  const d = useRef(0)
  d.current = dist
  const [wide, setWide] = useState(false)

  useEffect(() => {
    const m = matchMedia('(min-width: 1024px)')
    const fit = () => {
      setWide(m.matches)
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - innerWidth + 48))
    }
    fit()
    addEventListener('resize', fit)
    return () => removeEventListener('resize', fit)
  }, [])

  const pin = wide && !reduced
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  const x = useSpring(useTransform(scrollYProgress, (v) => -v * d.current), { stiffness: 120, damping: 30, mass: 0.3 })
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={wrap} className="relative" style={pin ? { height: `calc(100vh + ${dist}px)` } : undefined}>
      <div className={pin ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden' : 'py-24'}>
        <div className="wrap flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow rise text-white/70">Built by our team</span>
            <h2 className="h2 rise mt-5 max-w-[16ch]" style={{ '--d': '.06s' }}>
              Real projects for <em className="grad-text">real businesses.</em>
            </h2>
          </div>
          {pin && (
            <div className="h-[2px] w-48 overflow-hidden rounded bg-white/10">
              <motion.div className="h-full bg-gradient-to-r from-[#3054ff] to-[#a068ff]" style={{ width: bar }} />
            </div>
          )}
        </div>
        <motion.ul ref={track} style={pin ? { x } : undefined} className={`mt-12 flex gap-5 px-5 sm:px-8 lg:px-12 ${pin ? 'w-max' : 'snap-x snap-mandatory overflow-x-auto pb-4'}`}>
          {list.map((p, i) => (
            <li key={p.id} className="show-card spot snap-start">
              <Link to={`/services/${p.s}`} className="block">
                <div className="show-img">
                  <Photo src={p.image} alt={p.title} sizes="(min-width: 1024px) 520px, 85vw" />
                  {p.shot && <img src={p.shot} alt={`${p.title}, our build`} loading="lazy" className="show-shot" />}
                  <span className="show-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[.14em] text-[#8ea2ff]">{SERVICES[p.s].short}</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/60">{p.line}</p>
                  </div>
                  <span className="show-go">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
