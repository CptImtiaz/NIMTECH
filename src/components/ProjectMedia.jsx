import { useEffect, useRef } from 'react'
import { REDUCE } from '../lib/canvas.js'

// Picture for a project: its real screenshot or clip, or an illustrated
// cover drawn in CSS for work we can't show as a screenshot.
export default function ProjectMedia({ p, className = '' }) {
  const v = useRef(null)
  useEffect(() => {
    const el = v.current
    if (!el || REDUCE) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (p.video)
    return (
      <video ref={v} src={p.video} poster={p.image} muted loop playsInline preload="none" className={`h-full w-full object-cover ${className}`} aria-label={`${p.name} demo`} />
    )
  if (p.image) return <img src={p.image} alt={`${p.name}: ${p.kind.toLowerCase()}`} loading="lazy" decoding="async" className={`h-full w-full object-cover object-top ${className}`} />
  const Art = ART[p.art]
  return (
    <div className={`art art-${p.art} ${className}`} role="img" aria-label={`${p.name} illustration`}>
      <Art />
    </div>
  )
}

const Skin = () => (
  <>
    <div className="art-face">
      <span className="art-scan" />
    </div>
    <ul className="art-maps">
      {['Redness', 'Oiliness', 'Texture', 'Pores'].map((m, i) => (
        <li key={m} style={{ '--i': i }}>
          <i />
          {m}
        </li>
      ))}
    </ul>
  </>
)

const Courier = () => (
  <div className="art-flow">
    <span className="art-node">
      <b>New order</b>#1048 · Shopify
    </span>
    <span className="art-pipe" />
    <span className="art-node">
      <b>Address checked</b>Postcode valid
    </span>
    <span className="art-pipe" />
    <span className="art-node is-done">
      <b>Courier booked</b>Label ready
    </span>
  </div>
)

const Sms = () => (
  <div className="art-phone">
    <span className="art-bubble">Hi Aisha, order #1048 confirmed: 2 items, RM 86.00. Thank you!</span>
    <span className="art-bubble is-me">Thanks!</span>
  </div>
)

const Nest = () => (
  <div className="art-phone art-phone--nest">
    <small>Last feed</small>
    <b>2h 10m ago</b>
    <span className="art-ring" />
    <small>Next nap · 3:40 AM</small>
  </div>
)

const Agent = () => (
  <div className="art-chat">
    <span className="art-msg">
      <i>E</i>Refund for #2231 approved and sent.
    </span>
    <span className="art-msg">
      <i>E</i>Invoice from Acme flagged for review.
    </span>
    <span className="art-msg is-me">Great, thanks Emma</span>
  </div>
)

const ART = { skin: Skin, courier: Courier, sms: Sms, nest: Nest, agent: Agent }
