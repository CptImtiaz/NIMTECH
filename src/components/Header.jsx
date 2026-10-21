import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ORDER, SERVICES } from '../data/services.js'
import { PROJECTS } from '../data/projects.js'
import Photo from './Photo.jsx'
import { Logo } from './Icons.jsx'

// Header with one shared dropdown that morphs (position, width, height)
// between menus, sliding its content in the direction of travel.
const MENUS = ['services', 'solutions', 'company']
const PAD = 20

// two showcase cards in the Solutions menu
const SOLUTIONS = ['roro', 'whatsapp'].map((id) => PROJECTS.find((p) => p.id === id))

const Chevron = () => (
  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true">
    <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Header({ tone = 'dark' }) {
  const { pathname } = useLocation()
  const header = useRef(null)
  const nav = useRef(null)
  const dd = useRef(null)
  const panels = useRef({})
  const triggers = useRef({})
  const cur = useRef(null)
  const timer = useRef(0)
  const [openId, setOpenId] = useState(null)
  const [img, setImg] = useState(0)
  const [sheet, setSheet] = useState(false)

  const place = useCallback((id) => {
    const p = panels.current[id], t = triggers.current[id], d = dd.current, h = header.current
    if (!p || !t || !d || !h) return
    const w = p.offsetWidth, ht = p.offsetHeight
    const tr = t.getBoundingClientRect(), hr = h.getBoundingClientRect()
    let x = tr.left - PAD
    x = Math.max(hr.left + 12, Math.min(x, hr.right - w - 12))
    x -= (d.offsetParent || h).getBoundingClientRect().left
    d.style.setProperty('--x', `${x}px`)
    d.style.setProperty('--w', `${w}px`)
    d.style.setProperty('--h', `${ht}px`)
  }, [])

  const open = useCallback(
    (id) => {
      clearTimeout(timer.current)
      const d = dd.current
      if (!d || cur.current === id) return
      const p = panels.current[id]
      if (!cur.current) {
        d.classList.add('instant', 'snap')
        Object.values(panels.current).forEach((x) => {
          x.classList.add('snap')
          x.removeAttribute('data-state')
        })
        place(id)
        void d.offsetWidth
        d.classList.remove('snap')
        Object.values(panels.current).forEach((x) => x.classList.remove('snap'))
        d.classList.add('open')
        requestAnimationFrame(() => d.classList.remove('instant'))
      } else {
        const dir = MENUS.indexOf(id) > MENUS.indexOf(cur.current) ? 1 : -1
        panels.current[cur.current].dataset.state = dir > 0 ? 'exit-left' : 'exit-right'
        p.classList.add('snap')
        p.dataset.state = dir > 0 ? 'exit-right' : 'exit-left'
        void p.offsetWidth
        p.classList.remove('snap')
        place(id)
      }
      p.dataset.state = 'active'
      cur.current = id
      setOpenId(id)
    },
    [place],
  )

  const close = useCallback(() => {
    const d = dd.current
    if (!d) return
    d.classList.remove('open')
    if (cur.current) panels.current[cur.current]?.removeAttribute('data-state')
    cur.current = null
    setOpenId(null)
  }, [])

  const later = useCallback((ms = 140) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(close, ms)
  }, [close])

  useEffect(() => {
    close()
    setSheet(false)
  }, [pathname, close])

  useEffect(() => {
    const key = (e) => {
      if (e.key !== 'Escape') return
      const was = cur.current
      close()
      setSheet(false)
      if (was) triggers.current[was]?.focus()
    }
    const down = (e) => nav.current && !nav.current.contains(e.target) && close()
    const resize = () => cur.current && place(cur.current)
    addEventListener('keydown', key)
    document.addEventListener('pointerdown', down)
    addEventListener('resize', resize)
    return () => {
      removeEventListener('keydown', key)
      document.removeEventListener('pointerdown', down)
      removeEventListener('resize', resize)
    }
  }, [close, place])

  const trig = (id, label) => (
    <li>
      <button
        type="button"
        className="trigger"
        ref={(el) => (triggers.current[id] = el)}
        aria-expanded={openId === id}
        onPointerEnter={(e) => e.pointerType === 'mouse' && open(id)}
        onClick={() => (cur.current === id ? close() : open(id))}
      >
        {label}
        <Chevron />
      </button>
    </li>
  )

  return (
    <header ref={header} className={`site-header tone-${tone}`}>
      <div className="bar">
        <Link to="/" className="logo" aria-label="NIMTECH home">
          <Logo className="h-7 w-7" light={tone === 'dark'} />
          <span>NIMTECH</span>
        </Link>

        <nav
          ref={nav}
          className="desktop-nav"
          aria-label="Main"
          onPointerEnter={() => clearTimeout(timer.current)}
          onPointerLeave={(e) => e.pointerType === 'mouse' && later()}
          onBlur={(e) => !nav.current?.contains(e.relatedTarget) && later(0)}
        >
          <ul className="links">
            {trig('services', 'Services')}
            {trig('solutions', 'Solutions')}
            {trig('company', 'Company')}
            <li>
              <Link to="/services/ai-agents" className="plain-link" onPointerEnter={(e) => e.pointerType === 'mouse' && later(60)}>
                AI Agents
              </Link>
            </li>
          </ul>

          <div className="dd" ref={dd}>
            <div className="panel p-services" ref={(el) => (panels.current.services = el)}>
              <div className="d-list">
                {ORDER.map((id, i) => (
                  <Link key={id} to={`/services/${id}`} className={`d-item ${img === i ? 'is-active' : ''}`} onPointerEnter={() => setImg(i)} onFocus={() => setImg(i)} onClick={close}>
                    <strong>{SERVICES[id].short}</strong>
                    <span>{SERVICES[id].tagline}</span>
                  </Link>
                ))}
              </div>
              <div className="d-media" aria-hidden="true">
                {ORDER.map((id, i) => (
                  <Photo key={id} src={SERVICES[id].image} sizes="300px" className={img === i ? 'is-active' : ''} />
                ))}
              </div>
            </div>
            <div className="panel p-work" ref={(el) => (panels.current.solutions = el)}>
              {SOLUTIONS.map((p) => (
                <Link key={p.id} to={`/services/${p.s}`} className="card" onClick={close}>
                  <Photo src={p.image} sizes="240px" />
                  <strong>{p.title}</strong>
                  <span>{p.line.split(',')[0]}.</span>
                </Link>
              ))}
            </div>
            <div className="panel p-company" ref={(el) => (panels.current.company = el)}>
              {[
                ['/about', 'About us'],
                ['/services', 'All services'],
                ['/insights', 'Insights'],
                ['/contact', 'Contact'],
              ].map(([to, l]) => (
                <Link key={l} to={to} className="r-link" onClick={close}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="actions">
          <Link to="/contact" className="cta">
            Start a project
          </Link>
          <button type="button" className="menu-btn" aria-label={sheet ? 'Close menu' : 'Open menu'} aria-expanded={sheet} onClick={() => setSheet((v) => !v)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 5.5h12M2 10.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`sheet ${sheet ? 'open' : ''}`}>
        <h3>Services</h3>
        {ORDER.map((id) => (
          <Link key={id} to={`/services/${id}`}>
            {SERVICES[id].short}
          </Link>
        ))}
        <h3>Company</h3>
        <Link to="/about">About us</Link>
        <Link to="/insights">Insights</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </header>
  )
}
