import { useEffect, useRef, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import { REDUCE } from '../lib/canvas.js'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import { EASE } from './motion.jsx'

export default function Layout() {
  const { pathname } = useLocation()
  const lenis = useRef(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })

  useEffect(() => {
    if (REDUCE) return
    const l = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.current = l
    let raf
    const loop = (t) => {
      l.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      l.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-clip bg-night">
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-brand" />
      <Navbar />
      {/* initial={false}: no curtain or page fade on first load, so the
          prerendered page shows at once */}
      <AnimatePresence initial={false}>
        <motion.div
          key={pathname}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[65] origin-top bg-gradient-to-b from-deep via-brand to-night"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0, transition: { duration: 0.8, ease: EASE, delay: 0.05 } }}
          exit={{ opacity: 0, transition: { duration: 0.01 } }}
        />
      </AnimatePresence>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => (lenis.current ? lenis.current.scrollTo(0, { immediate: true }) : scrollTo(0, 0))}>
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 40, rotateX: 6, scale: 0.98, transformPerspective: 1400 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, transitionEnd: { transform: 'none' } }}
          exit={{ opacity: 0, y: -30, rotateX: -4, scale: 0.98, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="relative z-[1]"
        >
          <FrozenOutlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

// Keeps the outgoing page's content while it animates out.
function FrozenOutlet() {
  const outlet = useOutlet()
  const [frozen] = useState(outlet)
  return frozen
}
