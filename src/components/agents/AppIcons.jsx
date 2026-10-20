// Small channel and integration glyphs for the AI Agents page. These are
// simple generic marks drawn for this site, labelled with the product name.

/** @param {Record<string, any>} p */
export function Flower({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <ellipse cx="12" cy="6.2" rx="4" ry="5.2" fill="#F472B6" />
      <ellipse cx="17.8" cy="12" rx="5.2" ry="4" fill="#FB923C" />
      <ellipse cx="12" cy="17.8" rx="4" ry="5.2" fill="#4ADE80" />
      <ellipse cx="6.2" cy="12" rx="5.2" ry="4" fill="#60A5FA" />
      <circle cx="12" cy="12" r="2.4" fill="#101010" />
    </svg>
  )
}

/** @param {Record<string, any>} p */
export function IMessageIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label="iMessage">
      <rect width="24" height="24" rx="6" fill="#34C759" />
      <path d="M12 5.5c-4.1 0-7.3 2.6-7.3 5.9 0 1.9 1.1 3.6 2.8 4.7-.1 1-.6 1.9-1.3 2.6 1.6 0 3-.6 4-1.4.6.1 1.2.2 1.8.2 4.1 0 7.3-2.7 7.3-6.1S16.1 5.5 12 5.5z" fill="#fff" />
    </svg>
  )
}

/** @param {Record<string, any>} p */
export function MailIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label="Email">
      <rect width="24" height="24" rx="6" fill="#2F7BF6" />
      <rect x="5" y="7" width="14" height="10" rx="2" fill="#fff" />
      <path d="M5.6 8l6.4 4.8L18.4 8" stroke="#2F7BF6" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </svg>
  )
}

/** @param {Record<string, any>} p */
export function SlackIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label="Slack">
      <rect width="24" height="24" rx="6" fill="#fff" />
      <rect x="9" y="4.5" width="3" height="9" rx="1.5" fill="#36C5F0" />
      <rect x="10.5" y="9" width="9" height="3" rx="1.5" fill="#2EB67D" />
      <rect x="12" y="10.5" width="3" height="9" rx="1.5" fill="#ECB22E" />
      <rect x="4.5" y="12" width="9" height="3" rx="1.5" fill="#E01E5A" />
    </svg>
  )
}

const mono = 'currentColor'
// [name, path] in a 24-unit box, drawn in one colour
export const INTEGRATIONS = [
  ['Notion', <path key="n" d="M5 4.5l10-.8 4 2.8v13l-11 .8-3-3.2zM8.5 8v9M8.5 8l6 9V7.5" fill="none" stroke={mono} strokeWidth="1.6" strokeLinejoin="round" />],
  ['Linear', <g key="l" fill="none" stroke={mono} strokeWidth="1.6"><circle cx="12" cy="12" r="8" /><path d="M5.5 15.5l3 3M4.5 11.5l8 8M6 7.5l10.5 10.5" /></g>],
  ['Google Calendar', <g key="c" fill="none" stroke={mono} strokeWidth="1.6"><rect x="4" y="5" width="16" height="15" rx="2.5" /><path d="M4 9.5h16M8.5 3v4M15.5 3v4" /><text x="12" y="17.5" fontSize="7" textAnchor="middle" fill={mono} stroke="none" fontWeight="700">31</text></g>],
  ['GitHub', <g key="g" fill="none" stroke={mono} strokeWidth="1.6" strokeLinejoin="round"><path d="M12 3.5a8.5 8.5 0 0 0-2.7 16.6c.4 0 .6-.2.6-.5v-1.8c-2.4.5-2.9-1-2.9-1-.4-1-1-1.3-1-1.3-.8-.6.1-.5.1-.5.9 0 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8 0-.6.3-1 .5-1.2-1.9-.2-3.9-1-3.9-4.2 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.3.9a8 8 0 0 1 4.2 0c1.6-1.1 2.3-.9 2.3-.9.5 1.2.2 2.1.1 2.3.6.6.9 1.4.9 2.3 0 3.3-2 4-3.9 4.2.3.3.6.8.6 1.6v2.4c0 .3.2.6.6.5A8.5 8.5 0 0 0 12 3.5z" /></g>],
  ['Stripe', <g key="s" fill="none" stroke={mono} strokeWidth="1.7" strokeLinecap="round"><path d="M15.5 8.5c-.8-.7-2-1.2-3.4-1.2-1.9 0-3 .9-3 2.1 0 3.1 6.8 1.9 6.8 5.3 0 1.4-1.3 2.4-3.5 2.4-1.5 0-2.9-.5-3.9-1.3" /></g>],
  ['HubSpot', <g key="h" fill="none" stroke={mono} strokeWidth="1.6"><circle cx="15" cy="14" r="3.2" /><path d="M15 10.8V6.5M13.2 5h3.6M12.4 15.8l-5 3.2M12.8 12.2L6.5 7.8" /><circle cx="6" cy="7.4" r="1.4" /></g>],
]
