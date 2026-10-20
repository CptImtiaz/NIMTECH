import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { PROJECTS } from '../data/projects.js'
import { svcName } from './blocks.jsx'
import { ArrowUpRight } from './Icons.jsx'
import { Reveal } from './motion.jsx'

function Video({ src, poster }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '200px' })
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (inView) v.play().catch(() => {})
    else v.pause()
  }, [inView])
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" className="h-full w-full object-cover" aria-hidden="true" />
}

// Illustrated visuals for projects without a screenshot
function Art({ kind }) {
  if (kind === 'skin')
    return (
      <div className="grid h-full place-items-center bg-[#0B1220]">
        <svg viewBox="0 0 200 150" className="h-[85%]" aria-hidden="true">
          <defs>
            <radialGradient id="sk-a" cx=".42" cy=".42" r=".5"><stop offset="0" stopColor="#ff5d73" stopOpacity=".85" /><stop offset="1" stopColor="#ff5d73" stopOpacity="0" /></radialGradient>
            <radialGradient id="sk-b" cx=".6" cy=".55" r=".45"><stop offset="0" stopColor="#ffd166" stopOpacity=".8" /><stop offset="1" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
            <radialGradient id="sk-c" cx=".5" cy=".3" r=".4"><stop offset="0" stopColor="#60b1ff" stopOpacity=".8" /><stop offset="1" stopColor="#60b1ff" stopOpacity="0" /></radialGradient>
          </defs>
          <ellipse cx="100" cy="75" rx="42" ry="56" fill="#1d2a44" stroke="#60b1ff" strokeOpacity=".5" />
          <ellipse cx="100" cy="75" rx="42" ry="56" fill="url(#sk-c)" />
          <ellipse cx="82" cy="88" rx="22" ry="18" fill="url(#sk-a)" />
          <ellipse cx="120" cy="88" rx="22" ry="18" fill="url(#sk-a)" />
          <ellipse cx="100" cy="80" rx="12" ry="22" fill="url(#sk-b)" />
          {[...Array(36)].map((_, i) => (
            <circle key={i} cx={70 + ((i * 37) % 60)} cy={45 + ((i * 53) % 70)} r="1.1" fill="#fff" opacity=".6" />
          ))}
          {['Redness 0.81', 'Oiliness 0.74', 'Texture 0.62'].map((t, i) => (
            <g key={t} transform={`translate(${i % 2 ? 150 : 6} ${30 + i * 32})`}>
              <rect width="46" height="16" rx="8" fill="#fff" opacity=".1" />
              <text x="23" y="11" fontSize="6.5" fill="#fff" textAnchor="middle" fontFamily="Inter Variable, sans-serif">{t}</text>
            </g>
          ))}
        </svg>
      </div>
    )
  const sms = kind === 'sms'
  return (
    <div className="grid h-full place-items-center bg-[#0B1220] px-6">
      <svg viewBox="0 0 220 120" className="w-full max-w-[340px]" aria-hidden="true" fontFamily="Inter Variable, sans-serif">
        <rect x="4" y="38" width="62" height="44" rx="10" fill="#95BF47" />
        <text x="35" y="64" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="700">Shopify</text>
        <rect x="80" y="44" width="60" height="32" rx="8" fill="#1d2a44" stroke="#60b1ff" />
        <text x="110" y="58" fontSize="7.5" fill="#fff" textAnchor="middle">verify</text>
        <text x="110" y="68" fontSize="7.5" fill="#60b1ff" textAnchor="middle">webhook</text>
        <path d="M66 60h14M140 60h14" stroke="#60b1ff" strokeWidth="1.5" strokeDasharray="3 3">
          <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite" />
        </path>
        {sms ? (
          <g>
            <rect x="154" y="26" width="62" height="68" rx="10" fill="#f5f5f5" />
            <rect x="160" y="40" width="50" height="30" rx="8" fill="#2F7BF6" />
            <text x="185" y="52" fontSize="6" fill="#fff" textAnchor="middle">Order #1042</text>
            <text x="185" y="62" fontSize="6" fill="#fff" textAnchor="middle">confirmed ✓</text>
            <text x="185" y="84" fontSize="6.5" fill="#0b0f1a" textAnchor="middle" fontWeight="600">SMS</text>
          </g>
        ) : (
          <g>
            <rect x="154" y="38" width="62" height="44" rx="10" fill="#E8352B" />
            <text x="185" y="58" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">Pathao</text>
            <text x="185" y="70" fontSize="6.5" fill="#fff" textAnchor="middle">courier booked</text>
          </g>
        )}
      </svg>
    </div>
  )
}

/** @param {Record<string, any>} props */
export default function Projects({ limit }) {
  const list = limit ? PROJECTS.slice(0, limit) : PROJECTS
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {list.map((p, i) => (
        <Reveal key={p.id} delay={(i % 3) * 0.08} className="h-full">
          <a href={p.repo} target="_blank" rel="noopener noreferrer" className="card card-link group h-full !p-0">
            <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-deep">
              {p.video ? <Video src={p.video} poster={p.poster} /> : p.image ? <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" width="1200" height="750" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" /> : <Art kind={p.art} />}
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[11px] text-ink backdrop-blur">{p.kind}</span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <span className="font-mono text-[11.5px] uppercase tracking-[.08em] text-brand">{svcName(p.s)}</span>
              <h3 className="h3 !text-[21px] transition-colors group-hover:text-brand">{p.name}</h3>
              <p className="card-text">{p.text}</p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                <span className="flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </span>
                <span className="inline-flex items-center gap-1 text-[13px] font-medium text-ink">
                  GitHub <ArrowUpRight className="h-3.5 w-3.5 text-brand" />
                </span>
              </div>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  )
}
