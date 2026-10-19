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
    <div className="relative min-h-screen overflow-x-clip bg-white">
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-brand-light to-brand" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[900px] overflow-hidden">
        <div className="absolute -left-[220px] -top-[260px] h-[620px] w-[820px] rounded-full bg-brand-light opacity-30 blur-[140px]" />
        <div className="absolute -left-[120px] -top-[180px] h-[380px] w-[520px] rounded-full bg-brand-mid opacity-25 blur-[120px]" />
        <div className="absolute left-[180px] top-[40px] h-[240px] w-[360px] rounded-full bg-brand-light opacity-20 blur-[100px]" />
      </div>
      <Navbar />
      <AnimatePresence mode="wait" onExitComplete={() => (lenis.current ? lenis.current.scrollTo(0, { immediate: true }) : scrollTo(0, 0))}>
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -16, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative z-10"
        >
          <FrozenOutlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </div>
  )
}

// Keeps the outgoing page's content while it animates out.
function FrozenOutlet() {
  const outlet = useOutlet()
  const [frozen] = useState(outlet)
  return frozen
}
