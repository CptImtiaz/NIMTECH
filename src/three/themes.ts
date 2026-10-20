// Light-weight data for the 3D stage, kept apart so pages can use it
// without loading three.js up front.
export type CoreId = 'globe' | 'ai' | 'vision' | 'software' | 'apps' | 'api' | 'content'
export type NodeLayout = 'home' | 'side'

// Hero background tint per scene [glow, mid, outer] of the radial wash
export const THEMES: Record<CoreId, [string, string, string]> = {
  globe: ['#dfe5ff', '#f3f5ff', '#ffffff'],
  ai: ['#dde3ff', '#f3f5ff', '#ffffff'],
  vision: ['#d6f3f1', '#f1fbfa', '#ffffff'],
  software: ['#e6e0ff', '#f6f4ff', '#ffffff'],
  apps: ['#dde6ff', '#f3f6ff', '#ffffff'],
  api: ['#d8f2ef', '#f1faf9', '#ffffff'],
  content: ['#ebe3ff', '#f8f5ff', '#ffffff'],
}

// True when the browser has hardware-accelerated WebGL. Software renderers
// (no GPU, blocklisted drivers) report a major performance caveat; they get
// the static orb instead, since the 3D scene would freeze the page there.
// Add ?3d to the URL to force the scene anyway (not remembered).
export function hasWebGL() {
  // Creating a probe context is slow on software renderers, so the answer
  // is kept for the session.
  const KEY = 'nimtech-gl'
  if (new URLSearchParams(location.search).has('3d')) return probe(true)
  try {
    const seen = sessionStorage.getItem(KEY)
    if (seen) return seen === '1'
  } catch {}
  const ok = probe(false)
  try {
    sessionStorage.setItem(KEY, ok ? '1' : '0')
  } catch {}
  return ok
}

function probe(force: boolean) {
  try {
    const opts = { failIfMajorPerformanceCaveat: !force }
    const c = document.createElement('canvas')
    const gl = (c.getContext('webgl2', opts) || c.getContext('webgl', opts)) as WebGLRenderingContext | null
    if (!gl) return false
    const dbg = gl.getExtension('WEBGL_debug_renderer_info')
    const name = String(gl.getParameter(dbg ? dbg.UNMASKED_RENDERER_WEBGL : gl.RENDERER))
    const sw = /swiftshader|llvmpipe|softpipe|software/i.test(name)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return force || !sw
  } catch {
    return false
  }
}
