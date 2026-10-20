import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ORDER, SERVICES } from '../data/content.js'
import { COMPANY_LINKS, NAV } from '../data/site.js'
import { svcName } from './blocks.jsx'
import { ArrowRight, ArrowUpRight, Icon, Logo } from './Icons.jsx'
import { EASE } from './motion.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 30))

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

  return (
    <>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.05 }}
        className="fixed inset-x-0 top-[18px] z-50 flex justify-center px-4 md:top-[30px]"
      >
        <nav
          aria-label="Primary"
          className={`glass-strong relative flex w-fit items-center gap-3 rounded-[16px] p-2 transition-shadow duration-500 sm:gap-6 lg:gap-10 ${scrolled ? 'nav-scrolled' : ''}`}
        >
          <Link to="/" className="flex items-center gap-2 pl-2 font-fustat text-[21px] font-bold tracking-[-.5px] text-ink" aria-label="NIMTECH home">
            <motion.span whileHover={{ rotate: 90 }} transition={{ duration: 0.6, ease: EASE }} className="inline-flex">
              <Logo className="h-7 w-7" />
            </motion.span>
            NIMTECH
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) =>
              n.mega ? (
                <li key={n.to} className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
                  <NavLink to={n.to} className={({ isActive }) => `navlink ${isActive || pathname.startsWith('/services') ? 'active' : ''}`} onFocus={() => setMega(true)}>
                    {n.label}
                    <motion.svg animate={{ rotate: mega ? 180 : 0 }} viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <path d="M3 4.5l3 3 3-3" />
                    </motion.svg>
                  </NavLink>
                  <AnimatePresence>
                    {mega && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="absolute left-1/2 top-full w-[680px] -translate-x-1/2 pt-4"
                      >
                        <div className="glass-menu grid grid-cols-2 gap-1 rounded-2xl p-2.5" role="menu">
                          {ORDER.map((id, i) => (
                            <motion.div key={id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.4, ease: EASE }}>
                              <Link to={`/services/${id}`} role="menuitem" className="group grid grid-cols-[38px_1fr] gap-3 rounded-xl p-3 transition-colors hover:bg-brand/[.06]">
                                <span className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-line bg-brand/5 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                                  <Icon name={SERVICES[id].icon} className="h-[18px] w-[18px]" />
                                </span>
                                <span>
                                  <b className="block text-[14px] font-semibold text-ink">{svcName(id)}</b>
                                  <small className="mt-0.5 block text-[12.5px] leading-snug text-ink-soft">{SERVICES[id].short}</small>
                                </span>
                              </Link>
                            </motion.div>
                          ))}
                          <Link to="/services" className="col-span-2 mt-1 flex justify-between rounded-xl border-t border-line px-3 py-3 text-[13px] text-ink-soft hover:text-brand">
                            <span>All services</span>
                            <ArrowRight />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={n.to}>
                  <NavLink to={n.to} className={({ isActive }) => `navlink ${isActive ? 'active' : ''}`}>
                    {n.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-1.5">
            <Link to="/contact" className="nav-cta">
              <span className="hidden min-[400px]:inline">Start a Project</span>
              <span className="min-[400px]:hidden">Contact</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative z-[60] grid h-10 w-10 place-items-center rounded-[12px] text-ink lg:hidden"
            >
              <span className="grid gap-[5px]">
                <motion.i animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-[18px] rounded bg-current" />
                <motion.i animate={{ opacity: open ? 0 : 1 }} className="block h-[1.5px] w-[18px] rounded bg-current" />
                <motion.i animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-[18px] rounded bg-current" />
              </span>
            </button>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white/95 px-5 pb-10 pt-32 backdrop-blur-2xl lg:hidden"
          >
            <MobileGroup label="Services" delay={0}>
              <div className="grid grid-cols-2 gap-2">
                {ORDER.map((id) => (
                  <Link key={id} to={`/services/${id}`} className="glass flex items-center gap-2 rounded-xl px-3 py-3 text-[14.5px] font-medium text-ink">
                    <Icon name={SERVICES[id].icon} className="h-4 w-4 text-brand" />
                    {svcName(id)}
                  </Link>
                ))}
              </div>
            </MobileGroup>
            <MobileGroup label="Company" delay={0.1}>
              {[['/', 'Home'], ...COMPANY_LINKS, ['/contact', 'Contact']].map(([to, l], i) => (
                <motion.div key={to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.04, duration: 0.5, ease: EASE }}>
                  <Link to={to} className="flex items-center justify-between border-b border-line py-3.5 font-fustat text-[26px] font-bold tracking-[-.03em] text-ink">
                    {l}
                    <ArrowRight className="h-5 w-5 text-brand" />
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
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5, ease: EASE }} className="mb-8">
      <span className="mb-3 block text-[11px] font-medium uppercase tracking-[.16em] text-ink-dim">{label}</span>
      {children}
    </motion.div>
  )
}
