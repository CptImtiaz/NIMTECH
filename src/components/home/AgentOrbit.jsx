import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Puppet, { CAST } from '../Puppet.jsx'
import { REDUCE } from '../../lib/canvas.js'

const LINE = 'Hire AI agents that work around the clock, '
const REST = 'live in weeks, not months.'
const TEXT = LINE + REST

// [cast index, orbit, angle, radius, size, square, glow]
const SEATS = [
  [0, 1, 270, 177, 58, true, '#A068FF'],
  [1, 2, 60, 251, 58, false, '#F5C344'],
  [2, 2, 180, 251, 70, false, '#F06BA8'],
  [3, 2, 300, 251, 58, true, '#4C8DF6'],
  [5, 3, 130, 325, 76, false, '#F06BA8'],
  [6, 4, 30, 399, 58, false, '#A068FF'],
  [10, 4, 95, 399, 76, true, '#F0A13C'],
  [12, 4, 220, 399, 76, true, '#EF6F8E'],
  [13, 4, 320, 399, 58, false, '#A068FF'],
]
const CHANNELS = ['Slack', 'WhatsApp', 'Email', 'Microsoft Teams', 'Shopify', 'Google Drive', 'Notion', 'HubSpot', 'Zendesk', 'Your ERP']

// AI agents teaser: typed headline, orbiting agent cast, live count.
export default function AgentOrbit() {
  const ref = useRef(null)
  const [n, setN] = useState(TEXT.length)
  const [count, setCount] = useState(CAST.length)
  const [go, setGo] = useState(false)

  useEffect(() => {
    if (REDUCE || !ref.current) return
    setN(0)
    setCount(0)
    const timers = []
    let dead = false
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        setGo(true)
        let i = 0
        const type = () => {
          i += 1
          setN(i)
          if (i < TEXT.length) timers.push(setTimeout(type, 35))
        }
        timers.push(setTimeout(type, 400))
        const t0 = performance.now() + 1200
        const tick = (t) => {
          const k = Math.min(1, Math.max(0, (t - t0) / 2000))
          setCount(Math.round(CAST.length * (1 - (1 - k) ** 3)))
          if (k < 1 && !dead) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.3 },
    )
    io.observe(ref.current)
    return () => {
      io.disconnect()
      dead = true
      timers.forEach(clearTimeout)
    }
  }, [])

  const typed = TEXT.slice(0, n)
  return (
    <section ref={ref} className={`ao ${go ? 'ao-go' : ''}`} data-theme="dark">
      <div className="ao-inner">
        <div className="ao-left">
          <span className="eyebrow text-white/70">AI agents</span>
          <h2 className="ao-h">
            <span className="sr-only">{TEXT}</span>
            <span aria-hidden="true">
              <span className="text-white">{typed.slice(0, LINE.length)}</span>
              <span className="text-[#c4a4ff]">{typed.slice(LINE.length)}</span>
              {n < TEXT.length && <span className="ao-caret" />}
            </span>
          </h2>
          <p className="ao-p">Each agent has a name, a role and clear limits. It answers customers, processes documents and updates your systems, and asks a person before anything important.</p>
          <div className="ao-cta">
            <span className="btn-border-wrap">
              <Link to="/services/ai-agents" className="ao-btn">
                Meet the agents
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </Link>
            </span>
            <span className="btn-border-wrap">
              <Link to="/contact" className="ao-btn ao-btn--ghost">
                Plan my first agent
              </Link>
            </span>
          </div>
          <div className="ao-cursor" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M4 2L20 11L11 13L9 22L4 2Z" fill="#A068FF" />
            </svg>
            <span>Emma</span>
          </div>
        </div>

        <div className="ao-right" aria-hidden="true">
          <div className="ao-stage">
            {[1, 2, 3, 4].map((o) => (
              <div key={o} className={`ao-orbit ao-o${o}`}>
                {o === 1 && (
                  <div className="ao-center">
                    <b>{count}</b>
                    <span>agent roles</span>
                  </div>
                )}
                {SEATS.filter((s) => s[1] === o).map(([ci, , a, r, size, sq, glow], k) => (
                  <div key={ci} className="ao-seat" style={{ '--a': `${a}deg`, '--r': `${r}px`, '--k': k + o }}>
                    <div className="ao-face" style={{ width: size, height: size, borderRadius: sq ? 20 : '50%', boxShadow: `0 0 28px ${glow}88` }}>
                      <Puppet c={CAST[ci]} size={size} tile={false} label={false} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ticker ticker--dark">
        <ul className="ticker__track">
          {[...CHANNELS, ...CHANNELS].map((c, i) => (
            <li key={i} aria-hidden={i >= CHANNELS.length}>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
