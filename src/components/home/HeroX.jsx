import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, MessageCircle, Truck } from 'lucide-react'
import { ORDER, SERVICES } from '../../data/services.js'
import { REDUCE } from '../../lib/canvas.js'
import { StartButton } from '../ui.jsx'

const SRC = 'https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8'
const EASE = [0.16, 1, 0.3, 1]
const LINES = [
  ['We', 'build', 'the'],
  ['intelligent', 'software'],
  ['your', 'business', 'runs', 'on.'],
]

// Home hero: streaming video under an aurora, a perspective grid floor,
// a word-by-word headline and glass cards that drift with the pointer.
export default function HeroX() {
  const sec = useRef(null)
  const vid = useRef(null)

  useEffect(() => {
    const v = vid.current
    if (!v || REDUCE) return
    let hls
    let dead = false
    const play = () => v.play().catch(() => {})
    if (v.canPlayType('application/vnd.apple.mpegurl')) {
      v.src = SRC
      v.addEventListener('loadedmetadata', play, { once: true })
    } else {
      import('hls.js').then(({ default: Hls }) => {
        if (dead || !Hls.isSupported()) return
        hls = new Hls({ capLevelToPlayerSize: true })
        hls.loadSource(SRC)
        hls.attachMedia(v)
        hls.on(Hls.Events.MANIFEST_PARSED, play)
      })
    }
    return () => {
      dead = true
      hls?.destroy()
    }
  }, [])

  useEffect(() => {
    const s = sec.current
    if (!s || REDUCE) return
    let raf = 0, tx = 0, ty = 0, x = 0, y = 0
    const move = (e) => {
      tx = e.clientX / innerWidth - 0.5
      ty = e.clientY / innerHeight - 0.5
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const loop = () => {
      x += (tx - x) * 0.08
      y += (ty - y) * 0.08
      s.style.setProperty('--px', x.toFixed(4))
      s.style.setProperty('--py', y.toFixed(4))
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(loop) : 0
    }
    addEventListener('pointermove', move, { passive: true })
    return () => {
      removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  let w = 0
  return (
    <section ref={sec} className="hx" data-theme="dark">
      <video ref={vid} muted loop playsInline className="hx-video" aria-hidden="true" />
      <div className="hx-aurora" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="hx-floor" aria-hidden="true" />
      <div className="hx-noise" aria-hidden="true" />

      <div className="hx-content">
        <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="hx-pill">
          <span className="hx-live" /> Software · Apps · Websites · AI
        </motion.span>
        <h1 className="hx-h1">
          {LINES.map((line, li) => (
            <span key={li} className={`hx-line ${li === 1 ? 'hx-grad' : ''}`}>
              {line.map((word) => {
                const d = 0.15 + w++ * 0.07
                return (
                  <motion.span key={word} className="hx-word" initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: d, duration: 0.9, ease: EASE }}>
                    {word}
                  </motion.span>
                )
              })}
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease: EASE }} className="hx-sub">
          Management software, mobile apps, websites, integrations, AI models and AI agents, designed and built by one senior team.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.8, ease: EASE }} className="hx-cta">
          <StartButton />
          <Link to="/services" className="hx-ghost">
            Explore services <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <div className="hx-cards" aria-hidden="true">
        <div className="hx-card c1" style={{ '--z': 1.4 }}>
          <p className="hx-k">
            <MessageCircle className="h-3.5 w-3.5 text-[#25d366]" /> WhatsApp AI agent
          </p>
          <p className="hx-bub in">Do you deliver today?</p>
          <p className="hx-bub out">Yes! Order before 3pm and it arrives today 🚚</p>
        </div>
        <div className="hx-card c2" style={{ '--z': 2 }}>
          <p className="hx-k">AI model · tracking</p>
          <div className="hx-ring">
            <b>97%</b>
          </div>
          <small>confidence, live video</small>
        </div>
        <div className="hx-card c3" style={{ '--z': 1.1 }}>
          <span className="hx-ok">
            <Truck className="h-4 w-4" />
          </span>
          <span>
            <b>Bin delivered</b>
            <small>Driver app · 14:20</small>
          </span>
        </div>
        <div className="hx-card c4" style={{ '--z': 1.7 }}>
          <p className="hx-k">
            <Check className="h-3.5 w-3.5 text-emerald-400" /> Release live
          </p>
          <div className="hx-bars">
            {[38, 52, 46, 70, 64, 88, 96].map((h, i) => (
              <i key={i} style={{ height: `${h}%`, animationDelay: `${1.2 + i * 0.08}s` }} />
            ))}
          </div>
        </div>
      </div>

      <nav className="hx-marquee" aria-label="Services">
        <ul>
          {[...ORDER, ...ORDER].map((id, i) => (
            <li key={i} aria-hidden={i >= ORDER.length}>
              <Link to={`/services/${id}`} tabIndex={i >= ORDER.length ? -1 : undefined}>
                {SERVICES[id].name}
              </Link>
              <span>✦</span>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
