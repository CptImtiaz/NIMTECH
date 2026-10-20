import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ORDER, SERVICES } from '../data/content.js'
import { INSIGHTS } from '../data/insights.js'
import { COMPANY_LINKS, NAV } from '../data/site.js'
import { svcName } from './blocks.jsx'
import { ArrowRight, Icon, Logo } from './Icons.jsx'
import { EASE } from './motion.jsx'

// Full-width top bar with a services mega menu, in the style of large
// engineering firms: practices, a short intro and a featured insight.
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 10))

  useEffect(() => {
    setOpen(false)
    setMega(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && (setOpen(false), setMega(false))
    addEventListener('keydown', esc)
    return () => removeEventListener('keydown', esc)
  }, [open])

  const feat = INSIGHTS[0]
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${scrolled || mega || open ? 'glass-strong border-b border-line shadow-[0_10px_30px_-24px_rgba(10,15,41,.4)]' : 'border-b border-transparent'}`}
        onMouseLeave={() => setMega(false)}
      >
        <nav aria-label="Primary" className="wrap flex h-[72px] items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 font-display text-[19px] font-semibold tracking-[-.02em] text-ink" aria-label="NIMTECH home">
            <Logo className="h-8 w-8" />
            NIMTECH
          </Link>

          <ul className="hidden h-full items-stretch lg:flex">
            {NAV.map((n) => (
              <li key={n.to} className="flex" onMouseEnter={() => setMega(!!n.mega)}>
                <NavLink
                  to={n.to}
                  className={({ isActive }) => `navlink ${isActive || (n.mega && pathname.startsWith('/services')) ? 'active' : ''}`}
                  onFocus={() => setMega(!!n.mega)}
                  aria-haspopup={n.mega ? 'true' : undefined}
                  aria-expanded={n.mega ? mega : undefined}
                >
                  {n.label}
                  {n.mega && (
                    <motion.svg animate={{ rotate: mega ? 180 : 0 }} viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <path d="M3 4.5l3 3 3-3" />
                    </motion.svg>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            <Link to="/contact" className="hidden px-3 text-[14.5px] font-medium text-ink-soft hover:text-ink sm:inline">
              Contact
            </Link>
            <Link to="/contact" className="nav-cta">
              <span className="hidden min-[420px]:inline">Start a project</span>
              <span className="min-[420px]:hidden">Contact</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-10 w-10 place-items-center rounded-[10px] border border-line text-ink lg:hidden"
            >
              <span className="grid gap-[5px]">
                <motion.i animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-[16px] rounded bg-current" />
                <motion.i animate={{ opacity: open ? 0 : 1 }} className="block h-[1.5px] w-[16px] rounded bg-current" />
                <motion.i animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-[16px] rounded bg-current" />
              </span>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mega && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="absolute inset-x-0 top-full hidden border-t border-line bg-white shadow-[0_40px_60px_-40px_rgba(10,15,41,.35)] lg:block"
            >
              <div className="wrap grid grid-cols-[1fr_2.2fr_1.1fr] gap-10 py-10" role="menu">
                <div>
                  <span className="kicker">What we do</span>
                  <p className="mt-4 font-display text-[22px] font-semibold leading-snug tracking-[-.02em] text-ink">Six practices. One engineering team.</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">Most programmes combine two or three. We plan, build and run them together.</p>
                  <Link to="/services" className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-brand">
                    All services <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                  {ORDER.map((id) => (
                    <Link key={id} to={`/services/${id}`} role="menuitem" className="group flex gap-3.5 rounded-[12px] p-3.5 transition-colors hover:bg-surface">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-brand/[.07] text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                        <Icon name={SERVICES[id].icon} className="h-[18px] w-[18px]" />
                      </span>
                      <span>
                        <b className="block text-[14.5px] font-semibold text-ink">{svcName(id)}</b>
                        <small className="mt-0.5 block text-[13px] leading-snug text-ink-soft">{SERVICES[id].short}</small>
                      </span>
                    </Link>
                  ))}
                </div>
                <Link to={`/insights/${feat.slug}`} className="group flex flex-col justify-between rounded-[14px] bg-deep p-6 text-white">
                  <span className="kicker kicker-dark">Featured insight</span>
                  <span className="mt-6 font-display text-[19px] font-semibold leading-snug tracking-[-.015em] group-hover:underline">{feat.title}</span>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13.5px] text-white/70">
                    Read the {feat.kind.toLowerCase()} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white px-5 pb-10 pt-24 lg:hidden"
          >
            <MobileGroup label="Services" delay={0}>
              <div className="grid gap-1 sm:grid-cols-2">
                {ORDER.map((id) => (
                  <Link key={id} to={`/services/${id}`} className="flex items-center gap-3 rounded-[10px] border border-line px-3.5 py-3 text-[15px] font-medium text-ink">
                    <Icon name={SERVICES[id].icon} className="h-4 w-4 text-brand" />
                    {svcName(id)}
                  </Link>
                ))}
              </div>
            </MobileGroup>
            <MobileGroup label="Company" delay={0.08}>
              {[['/', 'Home'], ['/industries', 'Industries'], ...COMPANY_LINKS.filter(([to]) => to !== '/industries'), ['/contact', 'Contact']].map(([to, l], i) => (
                <motion.div key={to} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.03, duration: 0.4, ease: EASE }}>
                  <Link to={to} className="flex items-center justify-between border-b border-line py-3.5 font-display text-[22px] font-semibold tracking-[-.02em] text-ink">
                    {l}
                    <ArrowRight className="h-4 w-4 text-brand" />
                  </Link>
                </motion.div>
              ))}
            </MobileGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function MobileGroup({ label, children, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4, ease: EASE }} className="mb-8">
      <span className="kicker mb-3">{label}</span>
      <div className="mt-3">{children}</div>
    </motion.div>
  )
}
