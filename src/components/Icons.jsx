import { ICON_PATHS } from '../data/icons.js'

export function Icon({ name, className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] || '' }}
    />
  )
}

export function ArrowRight({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

export function ArrowUpRight({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

export function Star({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L10 14.85 4.75 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  )
}

export function Spark({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.6c.55 0 .88.55 1.08 2.1.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22.2-1.55.53-2.1 1.08-2.1Z" />
    </svg>
  )
}

// `light` inverts the tile for dark backgrounds
export function Logo({ className = 'h-7 w-7', light = false }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill={light ? '#fff' : '#0A0F29'} />
      <path d="M8.5 23.5V8.5h3.2l7.6 9.6V8.5h3.2v15h-3.2l-7.6-9.6v9.6z" fill={light ? '#0A0F29' : '#fff'} />
      <rect x="23.5" y="4.5" width="4" height="4" rx="1" fill="#0066dd" />
    </svg>
  )
}
