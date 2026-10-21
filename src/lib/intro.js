// Intro gate: the loader calls markReady() when it has left the screen;
// above-the-fold reveals and the 3D fly-in wait for it.
let ready = false
const subs = new Set()
export const isReady = () => ready
export function markReady() {
  if (ready) return
  ready = true
  subs.forEach((f) => f())
  subs.clear()
}
export function onReady(f) {
  if (ready) f()
  else subs.add(f)
  return () => subs.delete(f)
}
