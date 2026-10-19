import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ServiceBody from '../../components/ServiceBody.jsx'
import './vesper.css'

const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4'
const SPARK = 'M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z'

const NAV: [string, string, string, number][] = [
  ['Benefits', '#benefits', 'vp-appear--scale', 0.16],
  ['How It Works', '#how-it-works', 'vp-appear--soft', 0.28],
  ['FAQs', '#faqs', 'vp-appear--scale', 0.4],
  ['Pricing', '/contact?service=ai-agents', 'vp-appear--soft', 0.52],
]

const d = (s: number, extra: React.CSSProperties = {}) => ({ '--d': `${s}s`, ...extra }) as React.CSSProperties

function Mark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <g transform="rotate(-30 12 12)">
        <circle cx="7.3" cy="3.2" r="1.45" />
        <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
        <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
        <circle cx="16.7" cy="20.8" r="1.45" />
      </g>
    </svg>
  )
}

export default function AgentsLanding() {
  const root = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  // Mark each entrance as finished; force everything visible if CSS
  // animations never start (old browsers, disabled animations).
  useEffect(() => {
    const scope = root.current
    if (!scope) return
    const els = [...scope.querySelectorAll<HTMLElement>('.vp-appear, .vp-hero-photo')]
    els.forEach((el) => el.addEventListener('animationend', (e) => e.target === el && el.classList.add('is-in'), { once: true }))
    let r2 = 0
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        const running = els.some((el) => el.getAnimations?.().some((a) => a.playState === 'running' || a.playState === 'finished'))
        if (!running) els.forEach((el) => el.classList.add('is-in'))
      })
    })
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const mq = matchMedia('(min-width: 901px)')
    const wide = (e: MediaQueryListEvent) => e.matches && setOpen(false)
    addEventListener('keydown', esc)
    mq.addEventListener('change', wide)
    return () => {
      document.body.style.overflow = ''
      removeEventListener('keydown', esc)
      mq.removeEventListener('change', wide)
    }
  }, [open])

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    if (href.startsWith('#')) document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    else navigate(href)
  }

  return (
    <div ref={root} className={`vesper ${open ? 'menu-open' : ''}`}>
      <div className="vp-stage" id="top">
        <video className="vp-hero-photo" src={VIDEO} autoPlay loop muted playsInline preload="auto" aria-hidden="true" />
        <div className="vp-page">
          <div className="vp-menu-backdrop" onClick={() => setOpen(false)} />
          <header className="vp-header">
            <Link to="/" className="vp-logo vp-appear vp-appear--scale" style={d(0.08)} aria-label="NIMTECH">
              <Mark />
              <span>
                NIM<span className="vp-logo-suffix">TECH</span>
              </span>
            </Link>
            <nav className="vp-nav" id="site-nav" aria-label="Primary">
              {NAV.map(([label, href, cls, delay]) => (
                <a key={label} href={href} onClick={go(href)} className={`vp-pill vp-appear ${cls}`} style={d(delay)}>
                  {label}
                </a>
              ))}
            </nav>
            <div className="vp-right">
              <a href="/contact?service=ai-agents" onClick={go('/contact?service=ai-agents')} className="vp-btn vp-solid vp-header-cta vp-appear vp-appear--scale" style={d(0.34)}>
                Start for Free
              </a>
              <button type="button" className="vp-burger vp-appear vp-appear--scale" style={d(0.34)} aria-controls="site-nav" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((v) => !v)}>
                <span>
                  <i />
                  <i />
                  <i />
                </span>
              </button>
            </div>
          </header>

          <main className="vp-hero">
            <div className="vp-copy">
              <span className="vp-badge vp-appear vp-appear--pop" style={d(0.22)}>
                <span className="vp-badge-star">
                  <svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                    <path d={SPARK} />
                  </svg>
                </span>
                Operational AI Infrastructure
              </span>
              <h1 className="vp-h1">
                <span className="vp-line">
                  <span className="vp-appear vp-appear--mask" style={d(0.42)}>
                    Train <em>AI agents</em> on your
                  </span>
                </span>
                <span className="vp-line">
                  <span className="vp-appear vp-appear--mask" style={d(0.62)}>
                    workflows in minutes.
                  </span>
                </span>
              </h1>
              <p className="vp-lede vp-appear vp-appear--soft" style={d(0.82, { animationDuration: '1.25s' })}>
                Deploy adaptive AI agents that learn, execute, and scale operational tasks across your business.
              </p>
              <div className="vp-actions">
                <a href="/contact?service=ai-agents" onClick={go('/contact?service=ai-agents')} className="vp-btn vp-solid vp-appear vp-appear--btn" style={d(0.96)}>
                  Start for Free
                </a>
                <a href="#show" onClick={go('#show')} className="vp-btn vp-ghost vp-appear vp-appear--side" style={d(1.1)}>
                  See it in action
                </a>
              </div>
            </div>
          </main>

          <footer className="vp-stats">
            <span className="vp-stat vp-appear vp-appear--stat" style={d(1.12)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <defs>
                  <linearGradient id="vp-g1" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffffff" stopOpacity=".38" />
                    <stop offset="1" stopColor="#3a3a3a" stopOpacity=".62" />
                  </linearGradient>
                  <linearGradient id="vp-g2" x1="13" y1="2" x2="24" y2="22" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#3a3a3a" stopOpacity=".38" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity=".62" />
                  </linearGradient>
                </defs>
                <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#vp-g1)" />
                <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#vp-g2)" />
                <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a" />
              </svg>
              4.2M+ workflows automated
            </span>
            <span className="vp-stat vp-appear vp-appear--stat" style={d(1.28)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#ffffff" />
                <path d="M12 7.1v7.4M8.15 12.35L12 16.2l3.85-3.85" stroke="#111" strokeWidth="1.85" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              92% reduction in manual operations
            </span>
            <span className="vp-stat vp-appear vp-appear--stat" style={d(1.44)}>
              <svg viewBox="0 0 40 22" className="vp-wide" aria-hidden="true">
                <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b" />
                <path d="M5.6 9.2 6.4 4.6l3 3.4zM14.8 9.2 14 4.6l-3 3.4z" fill="#f4f4f4" />
                <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4" />
                <circle cx="8.7" cy="11.6" r="0.7" fill="#1a1a1a" />
                <circle cx="11.7" cy="11.6" r="0.7" fill="#1a1a1a" />
                <circle cx="20.2" cy="11" r="9.2" fill="#ffffff" />
                <circle cx="17.4" cy="9.6" r="1.7" fill="#111" />
                <circle cx="23" cy="9.6" r="1.7" fill="#111" />
                <ellipse cx="20.2" cy="12.4" rx="1" ry="0.7" fill="#111" />
                <path d="M17.6 14.6c1.5 1.4 3.7 1.4 5.2 0" stroke="#111" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d" />
                <text x="30.2" y="15.1" fontSize="12.5" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontWeight="700">
                  e
                </text>
              </svg>
              180+ operational teams onboarded
            </span>
          </footer>
        </div>
      </div>
      <ServiceBody id="ai-agents" />
    </div>
  )
}
