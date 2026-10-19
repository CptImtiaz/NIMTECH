export const REDUCE =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Shared pointer state (normalised -0.5..0.5 plus client coords)
export const P = { x: 0, y: 0, cx: -9999, cy: -9999 }
if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      P.x = e.clientX / innerWidth - 0.5
      P.y = e.clientY / innerHeight - 0.5
      P.cx = e.clientX
      P.cy = e.clientY
    },
    { passive: true },
  )
}

// Runs draw(ctx, W, H, t) every frame while the canvas is on screen.
export function run(c, draw, opt = {}) {
  const x = c.getContext('2d')
  let W = 1, H = 1, vis = true, raf, alive = true
  const dpr = Math.min(devicePixelRatio || 1, opt.dpr || 1.75)
  const rs = () => {
    W = c.clientWidth || 1
    H = c.clientHeight || 1
    c.width = Math.round(W * dpr)
    c.height = Math.round(H * dpr)
    x.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  rs()
  const ro = new ResizeObserver(rs)
  ro.observe(c)
  const io = new IntersectionObserver((es) => (vis = es[0].isIntersecting))
  io.observe(c)
  const f = (t) => {
    if (!alive) return
    raf = requestAnimationFrame(f)
    if (!vis || document.hidden) return
    draw(x, W, H, REDUCE ? 0 : t)
  }
  raf = requestAnimationFrame(f)
  return () => {
    alive = false
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
  }
}

export function local(c) {
  const r = c.getBoundingClientRect()
  return { x: P.cx - r.left, y: P.cy - r.top }
}

export function rrect(x, X, Y, w, h, r) {
  x.beginPath()
  if (x.roundRect) x.roundRect(X, Y, w, h, r)
  else x.rect(X, Y, w, h)
}

export const MONO = '500 11px ui-monospace,"SF Mono",Menlo,monospace'
