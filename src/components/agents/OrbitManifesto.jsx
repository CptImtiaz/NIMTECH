import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useScroll } from 'framer-motion'
import Puppet, { CAST } from '../Puppet.jsx'
import { REDUCE, useReduced } from '../../lib/canvas.js'
import { Flower, IMessageIcon, INTEGRATIONS, MailIcon, SlackIcon } from './AppIcons.jsx'

const MANIFESTO =
  'NIMTECH agents aren’t chatbots or workflows. They’re built to do real work, with names, roles, and access to your tools. They deliver from day one, and grow as they learn how your team works.'
const WORDS = MANIFESTO.split(' ')

// fixed "random" scatter targets: x, y in -1..1 of the viewport, depth 0 (far) .. 1 (near)
const SCATTER = [
  [-0.78, -0.62, 0.9], [0.7, -0.7, 0.35], [-0.9, 0.05, 0.5], [0.86, 0.1, 0.95], [-0.5, 0.72, 0.25], [0.42, 0.8, 0.7],
  [-0.2, -0.86, 0.15], [0.22, -0.5, 0.05], [-0.62, -0.28, 0.1], [0.6, -0.2, 0.2], [0.05, 0.9, 0.45], [-0.88, 0.62, 0.8],
  [0.9, 0.66, 0.3], [-0.34, 0.38, 0.0], [0.36, 0.4, 0.12], [0.12, -0.92, 0.6],
]
const ease = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3))

// Hero (cast orbiting the headline) and manifesto (the orbit breaks apart
// and the words light up) share one pinned stage driven by scroll.
export default function OrbitManifesto() {
  const ref = useRef(null)
  const stage = useRef(null)
  const tiles = useRef([])
  const copy = useRef(null)
  const words = useRef([])
  const reduced = useReduced()
  const [lit, setLit] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useEffect(() => {
    let raf = 0, rot = 0, last = performance.now(), litN = -1
    const n = CAST.length
    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const el = stage.current
      if (!el) return
      const W = el.clientWidth, H = el.clientHeight
      const mobile = W < 700
      const p = REDUCE ? 0 : scrollYProgress.get()
      const s = ease((p - 0.04) / 0.36) // scatter amount
      rot += (REDUCE ? 0 : dt * ((Math.PI * 2) / 60)) * (1 - s)
      const rx = mobile ? W * 0.5 - 20 : Math.min(W * 0.42, 640)
      const ry = mobile ? H * 0.4 : Math.min(H * 0.38, 330)
      const base = mobile ? 0.72 : 1
      tiles.current.forEach((t, i) => {
        if (!t) return
        const a = rot + (i / n) * Math.PI * 2
        const ox = Math.cos(a) * rx, oy = Math.sin(a) * ry
        const [sx, sy, d] = SCATTER[i]
        const tx = sx * W * (mobile ? 0.46 : 0.47), ty = sy * H * 0.46
        const x = ox + (tx - ox) * s, y = oy + (ty - oy) * s
        const sc = base * (1 + ((mobile ? 0.6 + d * 0.7 : 0.55 + d * 1.25) - 1) * s)
        // tiles drifting behind the manifesto are dimmed so the words stay legible
        const behind = Math.abs(x) < W * (mobile ? 0.48 : 0.32) && Math.abs(y) < H * (mobile ? 0.26 : 0.2)
        const op = (1 + ((0.28 + d * 0.72) - 1) * s) * (behind ? 1 - 0.65 * s : 1)
        t.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${sc})`
        t.style.opacity = String(op)
        t.style.filter = s > 0.02 ? `blur(${(1 - d) * 1.6 * s}px)` : ''
        t.style.zIndex = String(Math.round(d * 10))
        t.dataset.live = s < 0.1 ? '1' : '0'
      })
      if (copy.current) {
        const k = REDUCE ? 0 : Math.min(1, p / 0.12)
        copy.current.style.opacity = String(1 - k)
        copy.current.style.transform = `translateY(${-k * 40}px)`
        copy.current.style.pointerEvents = k > 0.5 ? 'none' : ''
      }
      const w = REDUCE ? WORDS.length : Math.round(ease((p - 0.3) / 0.55) * WORDS.length)
      if (w !== litN) {
        litN = w
        setLit(w)
      }
      const m = words.current[0]?.parentElement?.parentElement // the manifesto wrapper
      if (m) m.style.opacity = REDUCE ? '1' : String(Math.min(1, Math.max(0, (p - 0.18) / 0.1)))
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [scrollYProgress])

  // the manifesto: pinned over the scattered cast, or a plain block when motion is reduced
  const manifestoEl = (
    <div className={reduced ? 'grid place-items-center px-5 py-28' : 'pointer-events-none absolute inset-0 z-[15] grid place-items-center px-5'} style={{ opacity: reduced ? 1 : 0 }}>
      <p className="agents-manifesto">
        <span className="sr-only">{MANIFESTO}</span>
        {WORDS.map((w, i) => (
          <span key={i} ref={(el) => (words.current[i] = el)} aria-hidden="true" className={i < lit ? 'on' : ''}>
            {w}{' '}
          </span>
        ))}
      </p>
    </div>
  )

  return (
    <section ref={ref} data-theme="dark" className={`agents-x relative ${reduced ? '' : 'h-[300vh]'}`} aria-label="NIMTECH agents">
      <div ref={stage} className={`${reduced ? 'relative min-h-[100svh]' : 'sticky top-0 h-[100svh]'} overflow-hidden`}>
        {/* the cast */}
        <div className="absolute left-1/2 top-1/2 z-[1] h-0 w-0">
          {CAST.map((c, i) => (
            <div key={c.name} ref={(el) => (tiles.current[i] = el)} className="agent-tile" style={{ transform: 'translate3d(0,0,0)' }}>
              <div className="agent-tile-inner" tabIndex={-1}>
                <Puppet c={c} size={56} />
                <span className="agent-tip">
                  <b>{c.name}</b> {c.role}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* hero copy */}
        <div ref={copy} className="pointer-events-none absolute inset-0 z-[20] grid place-items-center px-5">
          <div className="pointer-events-auto text-center">
            <span className="inline-flex items-center gap-2 text-[13px] text-[#ACACAC]">
              <Flower className="h-4 w-4" /> NIMTECH Agents
            </span>
            <h1 className="agents-h1 mt-5">
              Agents that live
              <br />
              in the cloud
            </h1>
            <Link to="/contact?service=ai-agents" className="agents-cta mt-8">Make your first agent</Link>
            <p className="mt-5 flex items-center justify-center gap-2 text-[12px] text-[#8F8F8F]">
              Chat on <SlackIcon className="h-4 w-4" /> <MailIcon className="h-4 w-4" /> <IMessageIcon className="h-4 w-4" />
            </p>
          </div>
          <div className="pointer-events-auto absolute bottom-6 right-5 hidden items-center gap-3 text-[12px] text-[#8F8F8F] md:flex lg:right-10">
            Works with
            <span className="flex items-center gap-2.5 text-[#C9C9C9]">
              {INTEGRATIONS.map(([name, g]) => (
                <svg key={name} viewBox="0 0 24 24" className="h-[18px] w-[18px]" role="img" aria-label={name}>
                  {g}
                </svg>
              ))}
            </span>
            <span>+ any API</span>
          </div>
        </div>

        {!reduced && manifestoEl}
      </div>
      {reduced && manifestoEl}
    </section>
  )
}
