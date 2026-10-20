// Light-weight data for the 3D stage, kept apart so pages can use it
// without loading three.js up front.
export type CoreId = 'ai' | 'vision' | 'software' | 'apps' | 'api' | 'content' | 'helmet' | 'brand'
export type NodeLayout = 'home' | 'side'

// Hero colour themes [inner, mid, outer] of the radial background
export const THEMES: Record<CoreId, [string, string, string]> = {
  ai: ['#c3cdff', '#eef1ff', '#ffffff'],
  vision: ['#b6ebf6', '#eaf9fc', '#ffffff'],
  software: ['#d9cbff', '#f4f0ff', '#ffffff'],
  apps: ['#c2d6ff', '#edf3ff', '#ffffff'],
  api: ['#b9eee6', '#ebfaf7', '#ffffff'],
  content: ['#efc9fa', '#fbf0fe', '#ffffff'],
  helmet: ['#cad3ff', '#f0f2ff', '#ffffff'],
  brand: ['#c3cdff', '#eef1ff', '#ffffff'],
}


export function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}
