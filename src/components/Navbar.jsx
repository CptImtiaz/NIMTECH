import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ORDER, SERVICES } from '../data/content.js'
import { INSIGHTS } from '../data/insights.js'
import { COMPANY_LINKS, NAV } from '../data/site.js'
import { svcName } from './blocks.jsx'
import { ArrowRight, ArrowUpRight, Icon, Logo } from './Icons.jsx'
import { EASE } from './motion.jsx'

// Floating liquid-glass bar with a services mega menu (practices, a short
// intro and a featured insight). Turns to dark glass over dark sections.
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

  // switch to dark glass while a [data-theme="dark"] section sits under the bar
  const [dark, setDark] = useState(false)
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const y = 52
      const hit = [...document.querySelectorAll('[data-theme="dark"]')].some((el) => {
        const r = el.getBoundingClientRect()
        return r.top <= y && r.bottom >= y
      })
      setDark(hit)
    }
    const on = () => raf || (raf = requestAnimationFrame(check))
    check()
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    const t = setTimeout(check, 400)
    return () => {
      removeEventListener('scroll', on)
      removeEventListener('resize', on)
      cancelAnimationFrame(raf)
      clearTimeout(t)
    }
  }, [pathname])

  const feat = INSIGHTS[0]
  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-[30px]"
        onMouseLeave={() => setMega(false)}
      >
        <nav aria-label="Primary" className={`liquid-nav pointer-events-auto relative flex w-fit max-w-full items-center gap-3 p-2 sm:gap-6 lg:gap-8 ${dark && !open ? 'on-dark' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
          <Link to="/" className="nav-brand flex items-center gap-2 pl-2 font-display text-[20px] font-bold tracking-[-.02em]" aria-label="NIMTECH home">
            <Logo className="h-7 w-7" light={dark && !open} />
            NIMTECH
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((n) => (
              <li key={n.to} onMouseEnter={() => setMega(!!n.mega)}>
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

          <div className="flex items-center gap-1.5">
            <Link to="/contact" className="glass-btn">
              <span className="hidden min-[420px]:inline">Start a project</span>
              <span className="min-[420px]:hidden">Contact</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="nav-burger grid h-10 w-10 place-items-center rounded-[12px] lg:hidden"
            >
              <span className="grid gap-[5px]">
                <motion.i animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-[16px] rounded bg-current" />
                <motion.i animate={{ opacity: open ? 0 : 1 }} className="block h-[1.5px] w-[16px] rounded bg-current" />
                <motion.i animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-[16px] rounded bg-current" />
              </span>
            </button>
          </div>

          <AnimatePresence>
            {mega && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="absolute left-1/2 top-full hidden w-[min(940px,calc(100vw-48px))] -translate-x-1/2 pt-3 lg:block"
              >
                <div className="glass-menu grid grid-cols-[1fr_2.1fr_1.1fr] gap-6 rounded-[20px] p-6" role="menu">
                  <div className="pl-1 pt-1">
                    <span className="kicker">What we do</span>
                    <p className="mt-4 font-display text-[21px] font-bold leading-snug tracking-[-.02em] text-ink">Six practices. One engineering team.</p>
                    <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">Most programmes combine two or three. We plan, build and run them together.</p>
                    <Link to="/services" className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-brand">
                      All services <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {ORDER.map((id) => (
                      <Link key={id} to={`/services/${id}`} role="menuitem" className="group flex gap-3 rounded-[12px] p-3 transition-colors hover:bg-brand/[.06]">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-brand/[.08] text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                          <Icon name={SERVICES[id].icon} className="h-[18px] w-[18px]" />
                        </span>
                        <span>
                          <b className="block text-[14px] font-semibold text-ink">{svcName(id)}</b>
                          <small className="mt-0.5 block text-[12.5px] leading-snug text-ink-soft">{SERVICES[id].short}</small>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link to={`/insights/${feat.slug}`} className="group flex flex-col justify-between rounded-[14px] bg-deep p-5 text-white">
                    <span className="kicker kicker-dark">Featured insight</span>
                    <span className="mt-6 font-display text-[18px] font-bold leading-snug tracking-[-.015em] group-hover:underline">{feat.title}</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-[13px] text-white/70">
                      Read the {feat.kind.toLowerCase()} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white px-5 pb-10 pt-28 lg:hidden"
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
