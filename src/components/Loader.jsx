import { useEffect, useRef, useState } from 'react'
import { markReady } from '../lib/intro.js'
import { startScroll, stopScroll } from '../lib/scroll.js'
import { Logo } from './Icons.jsx'

const FILL_MS = 1300
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

// Intro: a dark panel that counts 000 to 100, then slides up and lets the
// page (and the 3D field) start.
export default function Loader() {
  const [n, setN] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)
  const panel = useRef(null)

  useEffect(() => {
    // already seen this session: no intro
    if (document.documentElement.classList.contains('no-intro')) {
      setGone(true)
      markReady()
      return
    }
    try {
      sessionStorage.setItem('nim-intro', '1')
    } catch {}
    stopScroll()
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / FILL_MS)
      setN(Math.round(ease(t) * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setLeaving(true)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (!leaving) return
    const done = () => {
      setGone(true)
      startScroll()
      markReady()
    }
    const t = setTimeout(done, 760)
    return () => clearTimeout(t)
  }, [leaving])

  if (gone) return null
  return (
    <div ref={panel} className={`loader ${leaving ? 'is-leaving' : ''}`} role="status" aria-label="Loading">
      <div className="loader-center">
        <p className="loader-brand">
          <Logo className="h-7.5 w-7.5" light />
          NIMTECH
        </p>
        <p className="loader-tag">Software, apps and AI with real gravity.</p>
      </div>
      <div className="loader-progress">
        <div className="loader-track">
          <div className="loader-fill" style={{ width: `${n}%` }} />
        </div>
        <div className="loader-row">
          <span>{n < 100 ? 'Calibrating gravity field' : 'Entering orbit'}</span>
          <span className="loader-num">{String(n).padStart(3, '0')}</span>
        </div>
      </div>
    </div>
  )
}
