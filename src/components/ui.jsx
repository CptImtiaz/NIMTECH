import { Children, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react'
import { openRequest } from '../lib/bus.js'
import GravityField from './GravityField.jsx'

/* ---------------- buttons and labels ---------------- */

// Pill button: dark, light or outline, with an optional arrow badge.
// Renders a Link (`to`), an anchor (`href`) or a button.
export function Pill({ variant = 'dark', arrow, to, href, children, className = '', ...rest }) {
  const Icon = arrow === 'up-right' ? ArrowUpRight : ArrowRight
  const cls = `pill-btn pill-${variant} ${arrow ? 'has-arrow' : ''} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="pill-badge">
          <Icon className={`h-4 w-4 ${arrow === 'up-right' ? 'arr-ur' : 'arr-r'}`} />
        </span>
      )}
    </>
  )
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>
  return <button type="button" className={cls} {...rest}>{inner}</button>
}

export const TalkButton = ({ service, children = 'Let’s talk', variant = 'dark' }) => (
  <Pill variant={variant} arrow="right" onClick={() => openRequest(service)}>
    {children}
  </Pill>
)

// "[ 02 — Physics ]" mono label
export const Label = ({ children, light, className = '' }) => (
  <p className={`mono-label rise ${light ? 'text-white/50' : ''} ${className}`}>[ {children} ]</p>
)

// Dot eyebrow
export const Eyebrow = ({ children, light, className = '' }) => (
  <span className={`eyebrow ${light ? 'eyebrow-light' : ''} ${className}`}>{children}</span>
)

/* ---------------- text reveals ---------------- */

// Heading revealed line by line from a clip. `lines`: array of strings or nodes.
export function Lines({ as: Tag = 'h2', lines, className = '', stagger = 120, delay = 0 }) {
  return (
    <Tag className={`lines ${className}`}>
      {(Array.isArray(lines) ? lines : [lines]).map((l, i) => (
        <span key={i} className="line">
          <span style={{ transitionDelay: `${delay + i * stagger}ms`, '--ld': `${delay + i * stagger}ms` }}>{l}</span>
        </span>
      ))}
    </Tag>
  )
}

// Paragraph or heading revealed word by word. Children may mix strings and
// <span className="muted"> parts.
export function Words({ as: Tag = 'h2', children, className = '', stagger = 35 }) {
  let n = 0
  const split = (node, cls) =>
    String(node)
      .split(/(\s+)/)
      .map((w, i) =>
        /^\s+$/.test(w) || !w ? (
          w
        ) : (
          <span key={`${n}-${i}`} className={`word ${cls || ''}`} style={{ transitionDelay: `${n++ * stagger}ms` }}>
            {w}
          </span>
        ),
      )
  return (
    <Tag className={`words ${className}`}>
      {Children.map(children, (c) => (typeof c === 'string' ? split(c) : split(c.props.children, c.props.className)))}
    </Tag>
  )
}

/* ---------------- page pieces ---------------- */

// Inner-page hero: the 3D field in the service colour behind big type.
export function PageHero({ label, title, text, color = '#2F69FF', tags, children }) {
  return (
    <section className="ph">
      <div className="ph-bg" style={{ '--c': color }} aria-hidden="true" />
      <GravityField color={color} count={40} offset={0.24} className="max-lg:bottom-[42%]!" />
      <div className="veil lg:hidden" aria-hidden="true" />
      <div className="wrap pointer-events-none relative z-10 flex min-h-[88svh] flex-col justify-end pb-14 pt-36">
        <div className="pointer-events-auto max-w-4xl">
          <p className="mono-label hero-in" style={{ '--d': '.1s' }}>
            [ {label} ]
          </p>
          <Lines as="h1" lines={Array.isArray(title) ? title : [title]} className="hero-title mt-6 hero-lines" delay={250} />
          {text && (
            <p className="hero-in mt-7 max-w-[44ch] font-display text-[17px] font-medium leading-[1.45] text-neutral-700 md:text-[19px]" style={{ '--d': '.55s' }}>
              {text}
            </p>
          )}
          {tags && (
            <ul className="hero-in mt-7 flex flex-wrap gap-2" style={{ '--d': '.65s' }}>
              {tags.map((t) => (
                <li key={t} className="glass-chip">
                  {t}
                </li>
              ))}
            </ul>
          )}
          {children && (
            <div className="hero-in mt-9" style={{ '--d': '.75s' }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function Faq({ items, title = 'Questions, answered.' }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <Label>FAQ</Label>
          <Lines lines={[title]} className="h-section mt-6" />
        </div>
        <ul>
          {items.map(([q, a], i) => (
            <li key={q} className="rise border-t border-[#e6e5e2] first:border-t-0" style={{ '--d': `${i * 0.06}s` }}>
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className={`faq-row ${open === i ? 'on' : ''}`}>
                <h3>{q}</h3>
                <span className="faq-ic">
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <div className={`grid transition-all duration-500 ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-[16px] leading-relaxed text-neutral-600">{a}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export const Arrow = ArrowUpRight
