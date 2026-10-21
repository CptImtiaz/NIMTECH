import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronRight, Menu } from 'lucide-react'
import { ORDER, SERVICES } from '../data/services.js'
import { openMenu, openRequest } from '../lib/bus.js'
import { useClock } from '../lib/clock.js'
import { onReady } from '../lib/intro.js'
import { Logo } from './Icons.jsx'

export const NAV = [
  ['Home', '/'],
  ['Services', '/services'],
  ['AI Agents', '/services/ai-agents'],
  ['Studio', '/about'],
  ['Insights', '/insights'],
  ['Contact', null],
]

// Header over the hero: logo, nav with a services dropdown, live clock,
// menu button and a glass "Contact us" pill.
export default function Header({ onDark = false }) {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const { time, date } = useClock()
  const [shown, setShown] = useState(false)
  const [dd, setDd] = useState(false)
  useEffect(() => onReady(() => setTimeout(() => setShown(true), 150)), [])
  useEffect(() => setDd(false), [pathname])

  return (
    <header className={`hdr ${shown ? 'in' : ''} ${onDark ? 'on-dark' : ''}`}>
      <div className="hdr-bar">
        <Link to="/" className="hdr-logo" aria-label="NIMTECH home">
          <Logo className="h-7 w-7" light={onDark} />
          <span>NIMTECH</span>
        </Link>

        <nav aria-label="Main" className="hdr-nav">
          <ul>
            {NAV.map(([l, to]) => {
              const isSvc = l === 'Services'
              return (
                <li key={l} className={isSvc ? 'relative' : ''} onPointerEnter={() => isSvc && setDd(true)} onPointerLeave={() => isSvc && setDd(false)}>
                  <button
                    type="button"
                    className="hdr-link"
                    aria-current={pathname === to ? 'page' : undefined}
                    aria-expanded={isSvc ? dd : undefined}
                    onClick={() => (to ? nav(to) : openRequest())}
                  >
                    <span>{l}</span>
                    {isSvc && <span className="text-xs opacity-60">▾</span>}
                  </button>
                  {isSvc && (
                    <div className={`hdr-dd ${dd ? 'open' : ''}`}>
                      {ORDER.map((id, i) => (
                        <Link key={id} to={`/services/${id}`} className="hdr-dd-item">
                          <span className="hdr-dd-dot" style={{ '--c': SERVICES[id].color }} />
                          <span className="min-w-0">
                            <b>{SERVICES[id].short}</b>
                            <small>{SERVICES[id].tagline}</small>
                          </span>
                          <span className="ml-auto font-mono text-[10px] text-neutral-400">0{i + 1}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hdr-right">
          <div className="hdr-clock" aria-label="Local time">
            <span className="text-neutral-500">Local time</span>
            <span className="min-w-[3.5rem] font-medium tabular-nums text-neutral-900">{time}</span>
            <span className="text-neutral-300">•</span>
            <span className="font-medium">{date}</span>
          </div>
          <button type="button" className="hdr-menu" onClick={openMenu} aria-label="Open menu">
            <Menu className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Menu</span>
          </button>
          <button type="button" className="glass-pill group hidden sm:inline-flex" onClick={() => openRequest()}>
            <span>Contact us</span>
            <span className="blue-orb">
              <ChevronRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
