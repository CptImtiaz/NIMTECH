export function ArrowRight({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

export function ArrowUpRight({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

export function Star({ className = '' }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L10 14.85 4.75 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  )
}

export function Logo({ className = '' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="nimtech-logo" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B1FF" />
          <stop offset="1" stopColor="#0084FF" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#nimtech-logo)" />
      <path d="M9 23V9h3l8 9.5V9h3v14h-3l-8-9.5V23z" fill="#fff" />
    </svg>
  )
}
