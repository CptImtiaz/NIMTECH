import { useEffect, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import { REDUCE } from '../lib/canvas.js'
import { onReady } from '../lib/intro.js'
import { getLenis, setLenis } from '../lib/scroll.js'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Loader from './Loader.jsx'
import Boundary from './Boundary.jsx'
import { NavMenu, RequestModal } from './Overlays.jsx'

export default function Layout() {
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })

  // smooth, weighty scroll
  useEffect(() => {
    if (REDUCE) return
    const l = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 })
    setLenis(l)
    let raf
    const loop = (t) => {
      l.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      l.destroy()
      setLenis(null)
    }
  }, [])

  // after the intro, mark the page so hero entrances play
  useEffect(() => onReady(() => document.documentElement.classList.add('is-ready')), [])

  // reveal `.rise`, `.lines` and `.words` as they scroll into view (once)
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -12% 0px' },
    )
    const scan = () => document.querySelectorAll('.rise:not(.in), .lines:not(.in), .words:not(.in)').forEach((el) => io.observe(el))
    const t = setTimeout(scan, 50)
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      clearTimeout(t)
      mo.disconnect()
      io.disconnect()
    }
  }, [pathname])

  // `.spot` cards get a glow that follows the pointer
  useEffect(() => {
    const move = (e) => {
      const el = e.target.closest?.('.spot')
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    addEventListener('pointermove', move, { passive: true })
    return () => removeEventListener('pointermove', move)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Loader />
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-[#2f69ff]" />
      <Header onDark={pathname === '/services/ai-agents'} />
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => (getLenis() ? getLenis().scrollTo(0, { immediate: true }) : scrollTo(0, 0))}>
        <motion.main id="main" key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="relative z-[1]">
          <Boundary fallback={<PageError />}>
            <FrozenOutlet />
          </Boundary>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <NavMenu />
      <RequestModal />
    </div>
  )
}

// Keeps the outgoing page's content while it animates out.
function FrozenOutlet() {
  const outlet = useOutlet()
  const [frozen] = useState(outlet)
  return frozen
}

function PageError() {
  return (
    <section className="grid min-h-[70svh] place-items-center px-6 text-center">
      <div>
        <p className="mono-label">[ Something went wrong ]</p>
        <h1 className="h-section mt-4">This page hit a snag.</h1>
        <button type="button" onClick={() => location.reload()} className="pill-btn pill-dark mt-8">
          Reload the page
        </button>
      </div>
    </section>
  )
}
