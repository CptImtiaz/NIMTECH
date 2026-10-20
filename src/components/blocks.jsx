import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Rich } from '../lib/rich.jsx'
import { ORDER, SERVICES } from '../data/content.js'
import { EMAIL } from '../data/site.js'
import { ArrowRight, ArrowUpRight, Icon } from './Icons.jsx'
import { EASE, Reveal, ScrollWords, SplitText, Tilt } from './motion.jsx'
import { useToast } from './Toast.jsx'

export const svcName = (id) => SERVICES[id].nav || SERVICES[id].name

/* ---------- buttons ---------- */
/** @param {Record<string, any>} props */
export function Button({ to, href, children, variant = 'primary', arrow = true, className = '', ...rest }) {
  // full class names so Tailwind keeps them
  const v = { primary: 'btn-primary', ghost: 'btn-ghost', glass: 'btn-ghost', dark: 'btn-dark', light: 'btn-light' }[variant] || 'btn-primary'
  const cls = `btn ${v} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="btn-icon">
          <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </>
  )
  const jump = (e) => {
    e.preventDefault()
    document.getElementById(to.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return to?.startsWith('#') ? (
    <a href={to} onClick={jump} className={cls} {...rest}>
      {inner}
    </a>
  ) : to ? (
    <Link to={to} className={cls} {...rest}>
      {inner}
    </Link>
  ) : href ? (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  ) : (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  )
}

export function CopyEmail({ variant = 'ghost', label }) {
  const toast = useToast()
  const copy = () => {
    const ok = () => toast(`Copied ${EMAIL}`)
    try {
      navigator.clipboard.writeText(EMAIL).then(ok, () => toast(EMAIL))
    } catch {
      toast(EMAIL)
    }
  }
  return (
    <Button variant={variant} arrow={false} onClick={copy}>
      {label || EMAIL}
    </Button>
  )
}

/* ---------- section scaffolding ---------- */
/** @param {Record<string, any>} props */
export function Section({ children, className = '', id, tight = false, dark = false }) {
  return (
    <section id={id} className={`relative ${tight ? 'pb-20 pt-0 md:pb-28' : 'py-20 md:py-28'} ${dark ? 'dark-band' : ''} ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  )
}

export function Eyebrow({ children, className = '' }) {
  return (
    <Reveal y={16} className={`eyebrow ${className}`}>
      <span className="eyebrow-dot" />
      {children}
    </Reveal>
  )
}

/** @param {Record<string, any>} props */
export function SectionHead({ eyebrow, title, lede }) {
  return (
    <div className="mb-12 grid items-end gap-x-16 gap-y-5 md:mb-20 md:grid-cols-[1.15fr_.85fr]">
      <div className="min-w-0">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <SplitText as="h2" lines={[title]} inView stagger={0.04} className="h2" />
      </div>
      {lede && (
        <Reveal delay={0.15} as="p" className="lede min-w-0">
          <Rich text={lede} />
        </Reveal>
      )}
    </div>
  )
}

export function Statement({ text }) {
  return (
    <Section>
      <ScrollWords text={text} className="statement" />
    </Section>
  )
}

/* ---------- marquee ---------- */
export function Marquee({ items, dark = false }) {
  const list = [...items, ...items]
  return (
    <div className={`marquee ${dark ? 'marquee-dark' : ''}`} aria-hidden="true">
      <div className="marquee-track">
        {list.map((m, i) => (
          <span key={i} className="marquee-item">
            {m}
            <span className="h-1.5 w-1.5 bg-brand" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- cards ---------- */
function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function Card({ children, className = '', to, delay = 0 }) {
  const inner = (
    <Tilt>
      <div onPointerMove={spotlight} className={`card h-full ${to ? 'card-link' : ''} ${className}`}>
        {children}
      </div>
    </Tilt>
  )
  return (
    <Reveal delay={delay} className="h-full">
      {to ? (
        <Link to={to} className="block h-full">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </Reveal>
  )
}

// list items: [icon, title, text] or, when numbered, [title, text]
export function Cards({ list, cols = 3, numbered = false }) {
  const grid = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[cols]
  return (
    <div className={`grid gap-4 ${grid}`}>
      {list.map((c, i) => (
        <Card key={i} delay={(i % 4) * 0.07}>
          {numbered ? <span className="card-num">0{i + 1}</span> : <span className="card-icon"><Icon name={c[0]} /></span>}
          <h3 className="h3">{numbered ? c[0] : c[1]}</h3>
          <p className="card-text">{numbered ? c[1] : c[2]}</p>
        </Card>
      ))}
    </div>
  )
}

/* ---------- service rows ---------- */
export function ServiceRows() {
  return (
    <div className="border-t border-line">
      {ORDER.map((id, i) => {
        const s = SERVICES[id]
        return (
          <Reveal key={id} delay={i * 0.05}>
            <Link to={`/services/${id}`} className="srow group">
              <span className="font-mono text-xs text-ink-dim">0{i + 1}</span>
              <h3 className="srow-title">{svcName(id)}</h3>
              <div className="min-w-0">
                <p className="text-ink-soft">{s.one}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
              <span className="srow-go">
                <ArrowUpRight />
              </span>
            </Link>
          </Reveal>
        )
      })}
    </div>
  )
}

/* ---------- sticky process steps ---------- */
/** @param {Record<string, any>} props */
export function Steps({ title, list, lede, eyebrow = 'Process', id }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <Section id={id}>
      <div className="grid items-start gap-12 md:grid-cols-[.85fr_1.15fr]">
        <div className="min-w-0 md:sticky md:top-32">
          <Eyebrow>{eyebrow}</Eyebrow>
          <SplitText as="h2" lines={[title]} inView className="h2" />
          {lede && (
            <Reveal as="p" delay={0.1} className="lede mt-5">
              {lede}
            </Reveal>
          )}
        </div>
        <div ref={ref} className="relative ml-1.5 min-w-0">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-line" />
          <motion.div style={{ scaleY }} className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-brand-light to-brand" />
          {list.map((s, i) => (
            <Step key={i} i={i} s={s} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function Step({ s, i }) {
  return (
    <Reveal className="relative pb-12 pl-10 last:pb-0">
      <motion.span
        className="absolute -left-[6px] top-1.5 h-[13px] w-[13px] rounded-full border border-brand/50 bg-white"
        initial={{ scale: 0.6 }}
        whileInView={{ scale: 1, backgroundColor: '#0066dd', boxShadow: '0 0 0 6px rgba(0, 102, 221,.14)' }}
        viewport={{ margin: '0px 0px -45% 0px' }}
        transition={{ duration: 0.5, ease: EASE }}
      />
      <span className="font-mono text-[11.5px] tracking-[.1em] text-ink-dim">STEP 0{i + 1}</span>
      <h3 className="h3 mb-2 mt-1.5">{s[0]}</h3>
      <p className="max-w-[52ch] text-ink-soft">{s[1]}</p>
    </Reveal>
  )
}

/* ---------- label/description rows ---------- */
export function Rows({ list, render }) {
  return (
    <div className="border-t border-line">
      {list.map((r, i) => (
        <Reveal key={i} className="row group">
          <b className="font-fustat text-lg font-bold tracking-[-.02em] transition-colors group-hover:text-brand">{r[0]}</b>
          <div className="min-w-0">{render ? render(r) : <p className="text-ink-soft">{r[1]}</p>}</div>
        </Reveal>
      ))}
    </div>
  )
}

export function StackTable({ list }) {
  return (
    <Rows
      list={list}
      render={(r) => (
        <div className="flex flex-wrap gap-2">
          {r[1].split(', ').map((c) => (
            <span key={c} className="chip">{c}</span>
          ))}
        </div>
      )}
    />
  )
}

/* ---------- FAQ ---------- */
export function FAQ({ list }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="max-w-[920px] border-t border-line">
      {list.map((f, i) => {
        const on = open === i
        return (
          <Reveal key={i} className="border-b border-line">
            <button type="button" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-5 py-6 text-left font-display text-[clamp(17px,1.5vw,20px)] font-semibold tracking-[-.015em]">
              {f[0]}
              <motion.span animate={{ backgroundColor: on ? '#0066dd' : 'rgba(255,255,255,0)', color: on ? '#fff' : '#0A0F29' }} transition={{ duration: 0.3, ease: EASE }} className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-[10px] border border-line">
                <motion.svg animate={{ rotate: on ? 45 : 0 }} transition={{ duration: 0.4, ease: EASE }} viewBox="0 0 12 12" className="h-3 w-3" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M6 1v10M1 6h10" />
                </motion.svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: EASE }} className="overflow-hidden">
                  <p className="max-w-[70ch] pb-6 text-ink-soft">{f[1]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        )
      })}
    </div>
  )
}

/* ---------- call to action ---------- */
export function CTA({ title = 'Have a problem <em>worth solving?</em>', text = 'Tell us what you’re trying to achieve. A senior engineer will reply within one working day.' }) {
  return (
    <Section>
      <Reveal y={40} className="cta-panel">
        <div className="relative grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="kicker kicker-dark">Start a project</span>
            <SplitText as="h2" lines={[title]} inView className="h2 mt-5 max-w-[18ch] text-white [&_.accent]:text-brand-light" />
          </div>
          <div className="grid gap-6 lg:justify-items-end">
            <p className="max-w-[42ch] text-[16.5px] leading-relaxed text-white/70 lg:text-right">{text}</p>
            <div className="flex flex-wrap gap-3">
              <Button to="/contact" variant="light">Start a Project</Button>
              <CopyEmail variant="dark" />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

/* ---------- work ---------- */
export function CaseCard({ c }) {
  return (
    <Tilt>
    <div onPointerMove={spotlight} className="card h-full justify-between">
      <div className="grid gap-3">
        <span className="font-mono text-[11.5px] uppercase tracking-[.08em] text-brand-cyan">
          {svcName(c.s)} · {c.ind}
        </span>
        <h3 className="h3">{c.t}</h3>
        <p className="card-text">{c.ch}</p>
        <ul className="grid gap-1.5 text-[14.5px] text-ink-soft">
          {c.did.map((d) => (
            <li key={d} className="flex gap-2">
              <span className="mt-[9px] h-1 w-3 flex-shrink-0 rounded-full bg-brand/40" />
              {d}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 border-t border-line pt-4 text-[14.5px] font-medium text-ink">{c.out}</p>
    </div>
    </Tilt>
  )
}

/* ---------- next page link ---------- */
export function NextLink({ to, label, small }) {
  return (
    <div className="wrap">
      <Link to={to} className="group flex flex-wrap items-center justify-between gap-6 border-t border-line py-14">
        <div>
          <small className="mb-1.5 block text-sm text-ink-soft">{small}</small>
          <span className="h2 block transition-colors duration-300 group-hover:text-brand">{label}</span>
        </div>
        <span className="grid h-14 w-14 place-items-center rounded-[12px] border border-line transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
          <ArrowRight className="h-5 w-5" />
        </span>
      </Link>
    </div>
  )
}

/* ---------- dark console panel ---------- */
export function Panel({ title, children, className = '' }) {
  return (
    <Reveal y={70} className={`console ${className}`}>
      {title && (
        <div className="console-bar">
          <i />
          <i />
          <i />
          <span className="ml-2">{title}</span>
          <span className="console-live">LIVE</span>
        </div>
      )}
      {children}
    </Reveal>
  )
}
