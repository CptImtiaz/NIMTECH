import { useId } from 'react'

// The NIMTECH agent cast: claymation-style puppet heads in office clothes,
// drawn as SVG (fuzzy fur from a turbulence filter, clay shading from
// radial gradients). Every agent has a name, a role and a look.
export const CAST = [
  { name: 'Emma', role: 'Support lead', skin: '#3FBFAE', hair: '#F2783A', style: 'curly', coat: '#1F2A44', shirt: '#FFFFFF', acc: 'glasses' },
  { name: 'Kofi', role: 'Finance ops', skin: '#7B5CF0', hair: '#1D1A2B', style: 'flat', coat: '#C9A46A', shirt: '#EAF2FF', acc: 'tie' },
  { name: 'Mira', role: 'Recruiter', skin: '#F27D52', hair: '#7A2E1C', style: 'bun', coat: '#2F7BF6', shirt: '#FFFFFF', acc: 'earring' },
  { name: 'Otto', role: 'DevOps engineer', skin: '#59B64C', hair: '#F4D03F', style: 'spiky', coat: '#3A3A3A', shirt: '#F2F2F2', acc: 'headset' },
  { name: 'Juno', role: 'Sales development', skin: '#F06BA8', hair: '#3B1F5C', style: 'bob', coat: '#141414', shirt: '#FFE8F2', acc: 'none' },
  { name: 'Ravi', role: 'Data analyst', skin: '#4C8DF6', hair: '#0F1B3D', style: 'side', coat: '#E9E4D8', shirt: '#2F7BF6', acc: 'glasses' },
  { name: 'Lola', role: 'Marketing', skin: '#F5C33B', hair: '#E2475C', style: 'curly', coat: '#2E8B6E', shirt: '#FFFFFF', acc: 'bow' },
  { name: 'Bram', role: 'Legal ops', skin: '#E2894C', hair: '#F7F2E7', style: 'flat', coat: '#24304F', shirt: '#FFFFFF', acc: 'tie' },
  { name: 'Nia', role: 'Researcher', skin: '#A56BE8', hair: '#F7B731', style: 'puff', coat: '#F3EFE6', shirt: '#7B5CF0', acc: 'glasses' },
  { name: 'Taro', role: 'QA engineer', skin: '#2DB3C9', hair: '#163A40', style: 'spiky', coat: '#E85D3F', shirt: '#FFFFFF', acc: 'none' },
  { name: 'Ivy', role: 'Executive assistant', skin: '#7FCB6A', hair: '#5B2A86', style: 'bob', coat: '#1D1D1D', shirt: '#FFFFFF', acc: 'earring' },
  { name: 'Max', role: 'IT helpdesk', skin: '#F0A13C', hair: '#2C2C2C', style: 'side', coat: '#3B6FD8', shirt: '#F2F2F2', acc: 'headset' },
  { name: 'Suki', role: 'Content writer', skin: '#EF6F8E', hair: '#111111', style: 'bun', coat: '#F6D7A7', shirt: '#2E2E2E', acc: 'none' },
  { name: 'Dev', role: 'Software engineer', skin: '#5A7BEF', hair: '#FF9F43', style: 'puff', coat: '#2B2B2B', shirt: '#59B64C', acc: 'glasses' },
  { name: 'Pia', role: 'Customer success', skin: '#45C48F', hair: '#F2E35B', style: 'curly', coat: '#7B5CF0', shirt: '#FFFFFF', acc: 'bow' },
  { name: 'Hugo', role: 'Procurement', skin: '#D96CE0', hair: '#2A1A3A', style: 'flat', coat: '#4A4A4A', shirt: '#FFFFFF', acc: 'tie' },
]

const shade = (hex, k) => {
  const n = parseInt(hex.slice(1), 16)
  const f = (v) => Math.max(0, Math.min(255, Math.round(k > 0 ? v + (255 - v) * k : v * (1 + k))))
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`
}

function Hair({ style, fill }) {
  switch (style) {
    case 'curly':
      return (
        <g fill={fill}>
          {[[16, 17, 6], [22, 13, 6.5], [29, 11.5, 7], [36, 13, 6.5], [41, 18, 5.5], [13, 23, 4.5], [43, 24, 4.5]].map(([x, y, r]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r={r} />
          ))}
        </g>
      )
    case 'flat':
      return <path d="M11 23c0-9 7.5-14.5 17-14.5S45 14 45 23c-3-3-8-4.5-17-4.5S14 20 11 23z" fill={fill} />
    case 'bun':
      return (
        <g fill={fill}>
          <circle cx="28" cy="7" r="5.5" />
          <path d="M11.5 24c0-10 7-15 16.5-15s16.5 5 16.5 15c-4-4.5-9.5-6.5-16.5-6.5S15.5 19.5 11.5 24z" />
        </g>
      )
    case 'spiky':
      return <path d="M12 22l2-9 4 5 3-9 4 6 3-8 3 8 4-6 3 9 4-5 2 9c-4-3-9-4.5-16-4.5S16 19 12 22z" fill={fill} />
    case 'bob':
      return <path d="M9 34c-1-15 7-24 19-24s20 9 19 24c-2-1-3.5-3-4-7-3-4-8-7-15-7s-12 3-15 7c-.5 4-2 6-4 7z" fill={fill} />
    case 'side':
      return <path d="M11 22c1-8 8-13.5 17-13.5 9.5 0 16 5 17 12-6-1-12-4-15-7.5C26 17 18 21 11 22z" fill={fill} />
    case 'puff':
    default:
      return <ellipse cx="28" cy="12" rx="16" ry="9" fill={fill} />
  }
}

/** One agent tile. `size` is the tile width in px (height is 1.25×). */
/** @param {Record<string, any>} props */
export default function Puppet({ c, size = 56, className = '', tile = true, label = true }) {
  const id = c.name + useId().replace(/[^a-zA-Z0-9]/g, '')
  const skinLight = shade(c.skin, 0.38)
  const skinDark = shade(c.skin, -0.32)
  return (
    <svg viewBox="0 0 56 70" width={size} height={size * 1.25} className={className} role={label ? 'img' : undefined} aria-label={label ? `${c.name}, ${c.role}` : undefined} aria-hidden={label ? undefined : true}>
      <defs>
        <radialGradient id={`s${id}`} cx="0.36" cy="0.3" r="0.8">
          <stop offset="0" stopColor={skinLight} />
          <stop offset="0.55" stopColor={c.skin} />
          <stop offset="1" stopColor={skinDark} />
        </radialGradient>
        <radialGradient id={`c${id}`} cx="0.35" cy="0.1" r="1">
          <stop offset="0" stopColor={shade(c.coat, 0.18)} />
          <stop offset="1" stopColor={shade(c.coat, -0.25)} />
        </radialGradient>
        <filter id={`f${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed={c.name.length} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={`h${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed={c.name.length + 3} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      {tile && <rect width="56" height="70" rx="12" fill="#F0EEEB" />}

      {/* shoulders: blazer, shirt, collar */}
      <path d="M4 70c1-10 7-15.5 15-17.5h18c8 2 14 7.5 15 17.5z" fill={`url(#c${id})`} />
      <path d="M21 52.5h14l-7 11z" fill={c.shirt} />
      <path d="M21 52.5l-4 6 7 1.5 4-7.5zM35 52.5l4 6-7 1.5-4-7.5z" fill={shade(c.shirt, -0.08)} />
      <path d="M19 53l7 17h-4l-7-13zM37 53l-7 17h4l7-13z" fill={shade(c.coat, -0.35)} opacity=".55" />
      {c.acc === 'tie' && <path d="M26.5 59.5h3l1.2 9-2.7 1.5-2.7-1.5z" fill="#E2475C" />}
      {c.acc === 'bow' && <path d="M22.5 56.5l5.5 2.5 5.5-2.5v5l-5.5-2.5-5.5 2.5z" fill="#2F7BF6" />}

      {/* neck */}
      <rect x="23" y="45" width="10" height="10" rx="4" fill={skinDark} />

      {/* head with fuzzy fur edge */}
      <g filter={`url(#f${id})`}>
        <ellipse cx="28" cy="31" rx="17.5" ry="17" fill={`url(#s${id})`} />
        <ellipse cx="10.5" cy="32" rx="3.2" ry="4.4" fill={c.skin} />
        <ellipse cx="45.5" cy="32" rx="3.2" ry="4.4" fill={skinDark} />
      </g>
      <g filter={`url(#h${id})`}>
        <Hair style={c.style} fill={c.hair} />
      </g>

      {/* Muppet face */}
      <path d="M18 38.5c2 6.5 18 6.5 20 0-2 2-6.5 3-10 3s-8-1-10-3z" fill="#2A0F12" />
      <path d="M23.5 41.4c1.5 1.6 7.5 1.6 9 0-1.5-.5-3-.8-4.5-.8s-3 .3-4.5.8z" fill="#F07C8F" />
      <ellipse cx="28" cy="34.5" rx="3.6" ry="2.9" fill={shade(c.skin, -0.45)} />
      <ellipse cx="27" cy="33.6" rx="1.1" ry=".7" fill="#fff" opacity=".55" />
      <ellipse cx="22.6" cy="27.5" rx="4.6" ry="5.1" fill="#FFFFFF" />
      <ellipse cx="33.4" cy="27.5" rx="4.6" ry="5.1" fill="#FFFFFF" />
      <circle cx="23.6" cy="28.6" r="2.1" fill="#121212" />
      <circle cx="32.4" cy="28.6" r="2.1" fill="#121212" />
      <circle cx="24.3" cy="27.8" r=".7" fill="#fff" />
      <circle cx="33.1" cy="27.8" r=".7" fill="#fff" />
      <path d="M18.5 22.6c2-1.6 5-1.9 7-.9M30.5 21.7c2-1 5-.7 7 .9" stroke={shade(c.hair, -0.1)} strokeWidth="1.4" strokeLinecap="round" fill="none" />

      {c.acc === 'glasses' && (
        <g fill="none" stroke="#141414" strokeWidth="1.3">
          <circle cx="22.6" cy="27.8" r="5.4" />
          <circle cx="33.4" cy="27.8" r="5.4" />
          <path d="M28 27.5h0M17.2 27l-5-1.5M38.8 27l5-1.5" />
        </g>
      )}
      {c.acc === 'headset' && (
        <g fill="none" stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round">
          <path d="M10 30c0-12 8-19 18-19s18 7 18 19" />
          <rect x="7.5" y="28" width="5" height="8" rx="2.5" fill="#1A1A1A" />
          <path d="M10 36c1 5 4 7 9 7.5" />
        </g>
      )}
      {c.acc === 'earring' && <circle cx="45.5" cy="38" r="1.6" fill="#F4D03F" />}
    </svg>
  )
}
