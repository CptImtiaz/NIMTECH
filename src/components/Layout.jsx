import { useEffect, useRef, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import { REDUCE } from '../lib/canvas.js'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

// pages whose first screen is light, so the header uses dark text
const LIGHT = ['/services/apps']

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

  // reveal `.rise` elements as they scroll into view
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -10% 0px' },
    )
    const scan = () => document.querySelectorAll('.rise:not(.in)').forEach((el) => io.observe(el))
    const t = setTimeout(scan, 50)
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      clearTimeout(t)
      mo.disconnect()
      io.disconnect()
    }
  }, [pathname])

  return (
    <div className="relative min-h-screen overflow-x-clip bg-white">
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-[#3054ff]" />
      <Header tone={LIGHT.includes(pathname) ? 'light' : 'dark'} />
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => (lenis.current ? lenis.current.scrollTo(0, { immediate: true }) : scrollTo(0, 0))}>
        <motion.main key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="relative z-[1]">
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
