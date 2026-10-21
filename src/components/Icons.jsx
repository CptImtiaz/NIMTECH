// NIMTECH logo mark. `light` inverts the tile for dark backgrounds.
export function Logo({ className = 'h-7 w-7', light = false }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill={light ? '#fff' : '#0A0F29'} />
      <path d="M8.5 23.5V8.5h3.2l7.6 9.6V8.5h3.2v15h-3.2l-7.6-9.6v9.6z" fill={light ? '#0A0F29' : '#fff'} />
      <rect x="23.5" y="4.5" width="4" height="4" rx="1" fill="#3054ff" />
    </svg>
  )
}

// Four-point spark used as a decorative accent.
export function LogoMark({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="currentColor" aria-hidden="true">
      <path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
    </svg>
  )
}
