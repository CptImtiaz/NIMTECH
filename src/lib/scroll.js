// Scroll lock shared by the loader, menu and request modal. Layout
// registers its Lenis instance here.
let lenis = null
let locks = 0
export const setLenis = (l) => (lenis = l)
export const getLenis = () => lenis

export function stopScroll() {
  locks++
  lenis?.stop()
  const h = document.documentElement.style
  h.position = 'relative'
  h.overflow = 'hidden'
  h.height = '100%'
}
export function startScroll() {
  locks = Math.max(0, locks - 1)
  if (locks) return
  lenis?.start()
  const h = document.documentElement.style
  h.removeProperty('position')
  h.removeProperty('overflow')
  h.removeProperty('height')
}

// Smooth-scroll to a section by id.
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: 0 })
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset, behavior: 'smooth' })
}
