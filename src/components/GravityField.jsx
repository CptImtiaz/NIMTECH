import { useEffect, useRef, useState } from 'react'
import { onReady } from '../lib/intro.js'
import { useReduced } from '../lib/canvas.js'
import Orb from './Orb.jsx'
import Boundary from './Boundary.jsx'

// The 3D sphere field. `fixed`: full-screen behind the page, driven by
// scroll (home). Otherwise it fills its parent and just floats (heroes).
// Loads three.js after first paint; without WebGL or with reduced motion
// it shows a still cluster of CSS spheres instead.
// If WebGL fails in an unexpected way, show the still spheres instead.
export default function GravityField(props) {
  return (
    <Boundary fallback={<div className={`${props.fixed ? 'g-fixed' : 'absolute inset-0'} pointer-events-none`} aria-hidden="true"><StillCluster color={props.color || '#2F69FF'} /></div>}>
      <Field {...props} />
    </Boundary>
  )
}

function Field({ color = '#2F69FF', fixed = false, count, morph = fixed, offset = 0, className = '' }) {
  const box = useRef(null)
  const cv = useRef(null)
  const reduced = useReduced()
  const [failed, setFailed] = useState(false)
  // the still spheres show from the first paint until the 3D is live
  const [live, setLive] = useState(false)

  // phones and low-core devices get live 3D only on the home page
  const [still, setStill] = useState(false)
  useEffect(() => {
    if (!fixed && (innerWidth < 768 || (navigator.hardwareConcurrency || 8) <= 4)) setStill(true)
  }, [fixed])

  useEffect(() => {
    if (reduced || still) return
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
    // viewport height measured once (and again only when the width changes),
    // so the phone address bar showing or hiding does not jolt the progress
    let vh = innerHeight || 1
    let vw = innerWidth
    const onResize = () => {
      if (innerWidth !== vw) {
        vw = innerWidth
        vh = innerHeight || 1
      }
    }
    addEventListener('resize', onResize)
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        control.progress = fixed ? window.scrollY / vh : 0
      })
    }
    addEventListener('pointermove', move, { passive: true })
    addEventListener('mousedown', down)
    addEventListener('mouseup', up)
    addEventListener('scroll', onScroll, { passive: true })
    onScroll()

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
    const boot = () => {
      import('../three/gravity.js')
        .then(({ createGravity }) => {
          if (dead) return
          try {
            dispose = createGravity({ canvas, container, ballColor: color, control, mouse, count: count && innerWidth < 768 ? Math.round(count * 0.6) : count, morph, offsetX: innerWidth >= 1024 ? offset : 0, onReady: () => !dead && setLive(true) })
          } catch {
            setFailed(true)
            return
          }
          setTimeout(() => (control.started = true), 120)
        })
        .catch(() => setFailed(true))
    }
    // Keep the main thread free while the page loads: the still spheres
    // show first and the 3D starts on the first mouse move, touch or
    // scroll, or after a few seconds.
    const EV = ['pointerdown', 'pointermove', 'touchstart', 'scroll', 'wheel', 'keydown']
    let wait = 0
    const go = () => {
      clearTimeout(wait)
      EV.forEach((e) => removeEventListener(e, go))
      t = idle(boot)
    }
    const start = () => {
      if (!fixed) return go()
      EV.forEach((e) => addEventListener(e, go, { passive: true, once: true }))
      wait = setTimeout(go, 4000)
    }
    // (registered after boot exists: onReady runs at once when already ready)
    const stopReady = onReady(start)

    return () => {
      dead = true
      stopReady()
      clearTimeout(wait)
      EV.forEach((e) => removeEventListener(e, go))
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
      removeEventListener('resize', onResize)
    }
  }, [color, fixed, count, morph, offset, reduced, still])

  return (
    <div ref={box} className={`${fixed ? 'g-fixed' : 'absolute inset-0'} pointer-events-none ${className}`} aria-hidden="true">
      {reduced || failed || still ? (
        <StillCluster color={color} />
      ) : (
        <>
          {fixed && (
            <div className={`g-standin ${live ? 'is-off' : ''}`}>
              <StillCluster color={color} />
            </div>
          )}
          <canvas ref={cv} className="relative block h-full w-full" />
        </>
      )}
    </div>
  )
}

// Static fallback: a few CSS spheres in the service colour.
function StillCluster({ color }) {
  // [left%, top%, size in vmax, glass]
  const s = [
    [68, 34, 22, 0],
    [84, 22, 11, 1],
    [52, 20, 9, 0],
    [88, 52, 14, 0],
    [60, 58, 12, 1],
    [76, 66, 8, 0],
    [40, 34, 6, 1],
    [94, 80, 9, 0],
  ]
  return (
    <div className="absolute inset-0 overflow-hidden">
      {s.map(([x, y, r, g], i) => (
        <Orb key={i} color={color} glass={!!g} className="sphere-art-orb" style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: `${r}vmax`, '--k': i, '--z': (i % 3) + 1 }} />
      ))}
    </div>
  )
}
