// Light-weight data for the 3D stage, kept apart so pages can use it
// without loading three.js up front.
export type CoreId = 'ai' | 'vision' | 'software' | 'apps' | 'api' | 'content' | 'helmet' | 'brand'
export type NodeLayout = 'home' | 'side'

// Hero colour themes [inner, mid, outer] of the radial background
export const THEMES: Record<CoreId, [string, string, string]> = {
  ai: ['#2a46c9', '#101b5c', '#05060f'],
  vision: ['#0b7fa6', '#07344d', '#05060f'],
  software: ['#5b34c4', '#24145e', '#05060f'],
  apps: ['#1d64d6', '#0b2c66', '#05060f'],
  api: ['#0f8a96', '#073b48', '#05060f'],
  content: ['#8a36c2', '#3a175e', '#05060f'],
  helmet: ['#3a4fd6', '#141c5e', '#05060f'],
  brand: ['#3150d8', '#121a5a', '#05060f'],
}


export function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}
