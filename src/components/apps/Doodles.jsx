// Hand-drawn outline doodles for the Apps page: single-weight black lines
// with the odd lemon-yellow fill, slightly wobbly on purpose. Each is
// drawn in a 64×64 box.
const Y = '#FEE951'

export const DOODLES = {
  bottle: (
    <>
      <path d="M26 8c0-2 2-3 6-3s6 1 6 3l1 6H25z" fill={Y} />
      <path d="M26 8c0-2 2-3 6-3s6 1 6 3l1 6H25zM23 14h18l-1 4c3 2 4 5 4 9v26c0 4-3 6-6 6H26c-3 0-6-2-6-6V27c0-4 1-7 4-9z" />
      <path d="M24 30h6M24 37h8M24 44h6" />
    </>
  ),
  pacifier: (
    <>
      <path d="M14 30c0-6 8-10 18-10s18 4 18 10-8 10-18 10-18-4-18-10z" fill={Y} />
      <path d="M14 30c0-6 8-10 18-10s18 4 18 10-8 10-18 10-18-4-18-10z" />
      <circle cx="32" cy="30" r="5" />
      <path d="M28 40c-1 6 0 12 4 14 4-2 5-8 4-14" />
      <path d="M29 20c0-6 6-8 6-2" />
    </>
  ),
  rattle: (
    <>
      <circle cx="24" cy="22" r="13" />
      <path d="M17 18c3-3 7-4 11-2M15 26c5 2 11 2 16-1" />
      <path d="M33 32l17 18c2 2 2 5-1 6s-4 0-6-2L27 36" fill={Y} />
      <path d="M33 32l17 18c2 2 2 5-1 6s-4 0-6-2L27 36" />
    </>
  ),
  star: <path d="M32 7l6 15 16 1-12 10 4 16-14-9-14 9 4-16-12-10 16-1z" fill={Y} />,
  duck: (
    <>
      <path d="M12 38c0-6 6-8 12-6-2-10 4-18 13-18s13 8 11 15c6 0 10 4 9 10-1 9-12 15-26 15S12 47 12 38z" />
      <path d="M48 24c3 0 8 1 10 3-2 2-6 3-10 2" fill={Y} />
      <circle cx="41" cy="21" r="1.6" fill="#1D1D1B" />
      <path d="M24 40c4 4 12 4 17 0" />
    </>
  ),
  block: (
    <>
      <path d="M12 22l20-10 20 10v22L32 56 12 44z" />
      <path d="M12 22l20 10 20-10M32 32v24" />
      <path d="M18 34l6 13M24 34l-6 13M19 42h5" />
      <path d="M38 34c4-2 7 0 6 4s-5 4-6 8M38 46c3 2 7 1 7-2" />
    </>
  ),
  owl: (
    <>
      <path d="M16 18l4 6c3-3 8-5 12-5s9 2 12 5l4-6v28c0 8-7 12-16 12s-16-4-16-12z" />
      <circle cx="25" cy="30" r="6" fill={Y} />
      <circle cx="39" cy="30" r="6" fill={Y} />
      <circle cx="25" cy="30" r="6" />
      <circle cx="39" cy="30" r="6" />
      <circle cx="25" cy="30" r="1.8" fill="#1D1D1B" />
      <circle cx="39" cy="30" r="1.8" fill="#1D1D1B" />
      <path d="M30 37l2 3 2-3M24 46c2 2 4 2 6 0M34 46c2 2 4 2 6 0" />
    </>
  ),
  teddy: (
    <>
      <circle cx="18" cy="16" r="6" />
      <circle cx="46" cy="16" r="6" />
      <circle cx="32" cy="26" r="15" />
      <ellipse cx="32" cy="31" rx="6" ry="4.5" fill={Y} />
      <ellipse cx="32" cy="31" rx="6" ry="4.5" />
      <path d="M30 29h4M32 30v3" />
      <circle cx="26" cy="22" r="1.4" fill="#1D1D1B" />
      <circle cx="38" cy="22" r="1.4" fill="#1D1D1B" />
      <path d="M20 40c-6 4-8 12-4 16h32c4-4 2-12-4-16" />
    </>
  ),
  giraffe: (
    <>
      <path d="M22 58V30c0-8 2-14 6-18l-2-6 4 2 3-4 1 5 6 3c4 2 4 7-1 8l-5 1c-1 3-1 8-1 12v25" />
      <circle cx="34" cy="13" r="1.4" fill="#1D1D1B" />
      <circle cx="28" cy="28" r="2.5" fill={Y} />
      <circle cx="31" cy="38" r="3" fill={Y} />
      <circle cx="27" cy="48" r="2.5" fill={Y} />
    </>
  ),
  thermometer: (
    <>
      <path d="M28 10c0-3 2-5 4-5s4 2 4 5v28c4 2 6 6 6 10 0 6-5 10-10 10s-10-4-10-10c0-4 2-8 6-10z" />
      <circle cx="32" cy="48" r="5" fill={Y} />
      <path d="M32 43V22M36 16h4M36 22h3M36 28h4" />
    </>
  ),
  sock: (
    <>
      <path d="M24 6h16v26l6 10c3 5 1 12-6 14-5 1-9-1-12-5l-9-12c-3-4-2-8 1-11l4-3z" fill={Y} />
      <path d="M24 6h16v26l6 10c3 5 1 12-6 14-5 1-9-1-12-5l-9-12c-3-4-2-8 1-11l4-3zM24 14h16" />
    </>
  ),
  moon: (
    <>
      <path d="M40 10c-12 2-19 12-17 24s12 19 24 17c-6 7-18 9-27 3S7 35 12 24 30 6 40 10z" fill={Y} />
      <path d="M40 10c-12 2-19 12-17 24s12 19 24 17c-6 7-18 9-27 3S7 35 12 24 30 6 40 10z" />
    </>
  ),
  spoon: (
    <>
      <ellipse cx="22" cy="20" rx="9" ry="12" transform="rotate(-35 22 20)" />
      <path d="M28 28l24 26" />
    </>
  ),
  ball: (
    <>
      <circle cx="32" cy="32" r="20" />
      <path d="M14 26c10 4 26 4 36 0M16 42c10-4 22-4 32 0" />
      <path d="M32 12c-6 12-6 28 0 40" />
    </>
  ),
  cloud: <path d="M16 44c-6 0-9-5-7-10s7-6 10-4c1-7 7-11 14-10 6 1 10 6 10 11 6-1 11 3 11 8s-4 6-8 6z" />,
  heart: <path d="M32 54C18 44 10 36 12 26c1-7 9-11 15-7 2 1 4 3 5 5 1-2 3-4 5-5 6-4 14 0 15 7 2 10-6 18-20 28z" fill={Y} />,
}

/** @param {Record<string, any>} props */
export function Doodle({ name, className = '', size = 64, stroke = '#1D1D1B', ...rest }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      {DOODLES[name]}
    </svg>
  )
}

// A parent cradling a baby with a bottle, for the night section (cream on dark)
export function Cradle({ className = '' }) {
  return (
    <svg viewBox="0 0 260 220" className={className} fill="none" stroke="#F2F2ED" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M118 52c0-16 12-28 28-28s27 12 27 28-11 30-27 30-28-14-28-30z" />
      <path d="M120 44c8-16 34-22 52-6M126 36c4 6 10 9 18 9" />
      <path d="M140 60c3 3 8 3 11 0" />
      <path d="M128 84c-30 6-52 26-60 56-4 16-6 32-6 52M170 84c22 8 36 24 42 46 4 16 6 38 6 62" />
      <path d="M78 150c18 22 52 32 86 24 18-4 34-14 44-28" />
      <path d="M96 128c8-12 22-18 36-18 20 0 34 10 40 22" />
      <path d="M100 132c-6 6-6 16 2 20 10 6 30 8 48 4 12-3 20-10 22-18" />
      <circle cx="116" cy="124" r="14" />
      <path d="M110 122c2 2 4 2 6 0M114 130c2 1 4 1 6-1" />
      <path d="M130 116l26-24 8 8-26 24" />
      <path d="M156 92l6-6 8 8-6 6" />
      <circle cx="214" cy="40" r="7" fill="#FEE951" stroke="none" />
    </svg>
  )
}
