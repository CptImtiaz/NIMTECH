import { useEffect, useRef, useState } from 'react'
import { onReady } from '../lib/intro.js'
import { useReduced } from '../lib/canvas.js'
import Orb from './Orb.jsx'

// The 3D sphere field. `fixed`: full-screen behind the page, driven by
// scroll (home). Otherwise it fills its parent and just floats (heroes).
// Loads three.js after first paint; without WebGL or with reduced motion
// it shows a still cluster of CSS spheres instead.
export default function GravityField({ color = '#2F69FF', fixed = false, count, morph = fixed, offset = 0, className = '' }) {
  const box = useRef(null)
  const cv = useRef(null)
  const reduced = useReduced()
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (reduced) return
    const container = box.current
    const canvas = cv.current
    if (!container || !canvas) return
    let dispose = () => {}
    let dead = false
    const control = { progress: 0, started: false, paused: false }
    const mouse = { x: 99, y: 99, isDown: false }

    const move = (e) => {
      const r = fixed ? { left: 0, top: 0, width: innerWidth, height: innerHeight } : container.getBoundingClientRect()
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1
      mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1
    }
    const down = () => (mouse.isDown = true)
    const up = () => (mouse.isDown = false)
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        control.progress = fixed ? window.scrollY / (innerHeight || 1) : 0
      })
    }
    addEventListener('pointermove', move, { passive: true })
    addEventListener('mousedown', down)
    addEventListener('mouseup', up)
    addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // pause when the hero is off screen
    // pause when off screen or the tab is hidden
    let onScreen = true
    const sync = () => (control.paused = !onScreen || document.hidden)
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      sync()
    })
    if (!fixed) io.observe(container)
    document.addEventListener('visibilitychange', sync)

    // build the scene once the intro is done and the browser is idle
    let t = 0
    const idle = (f) => ('requestIdleCallback' in window ? requestIdleCallback(f, { timeout: 1200 }) : setTimeout(f, 200))
    const stopReady = onReady(() => (t = idle(boot)))
    const boot = () => {
      import('../three/gravity.js')
        .then(({ createGravity }) => {
          if (dead) return
          try {
            dispose = createGravity({ canvas, container, ballColor: color, control, mouse, count: count && innerWidth < 768 ? Math.round(count * 0.6) : count, morph, offsetX: innerWidth >= 1024 ? offset : 0 })
          } catch {
            setFailed(true)
            return
          }
          setTimeout(() => (control.started = true), 120)
        })
        .catch(() => setFailed(true))
    }

    return () => {
      dead = true
      stopReady()
      if ('cancelIdleCallback' in window) cancelIdleCallback(t)
      clearTimeout(t)
      dispose()
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
      cancelAnimationFrame(raf)
      removeEventListener('pointermove', move)
      removeEventListener('mousedown', down)
      removeEventListener('mouseup', up)
      removeEventListener('scroll', onScroll)
    }
  }, [color, fixed, count, morph, offset, reduced])

  return (
    <div ref={box} className={`${fixed ? 'fixed inset-0 z-0' : 'absolute inset-0'} pointer-events-none ${className}`} aria-hidden="true">
      {reduced || failed ? <StillCluster color={color} /> : <canvas ref={cv} className="block h-full w-full" />}
    </div>
  )
}

// Static fallback: a few CSS spheres in the service colour.
function StillCluster({ color }) {
  const s = [
    [50, 48, 18],
    [38, 40, 11],
    [62, 38, 9],
    [58, 60, 13],
    [42, 62, 8],
    [70, 52, 7],
    [30, 54, 6],
  ]
  return (
    <div className="absolute inset-0">
      {s.map(([x, y, r], i) => (
        <Orb key={i} color={color} className="absolute" style={{ left: `${x}%`, top: `${y}%`, width: `${r}vmin`, height: `${r}vmin`, transform: 'translate(-50%,-50%)' }} />
      ))}
    </div>
  )
}
