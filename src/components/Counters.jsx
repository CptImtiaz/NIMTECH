import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { Reveal } from './motion.jsx'

// Facts drawn from how NIMTECH works, not invented metrics.
const FACTS = [
  [6, '', 'Practices under one roof', 'AI agents, vision, software, apps, integration and content.'],
  [2, '‑week', 'Sprint cycle', 'A working demo you can test at the end of every sprint.'],
  [1, ' day', 'Reply time', 'A senior engineer answers every enquiry within one working day.'],
  [100, '%', 'Ownership', 'Code, trained models, datasets and infrastructure are yours.'],
]

function Num({ to, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (n) => setV(Math.round(n)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref} className="tabular-nums">
      {v}
      {suffix}
    </span>
  )
}

export default function Counters() {
  return (
    <section className="dark-band relative overflow-hidden py-20 md:py-28">
      <div className="wrap relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map(([n, s, label, text], i) => (
          <Reveal key={label} delay={i * 0.08} className="border-t border-white/15 pt-6">
            <div className="font-fustat text-[clamp(48px,5vw,72px)] font-bold leading-none tracking-[-.04em] text-white">
              <Num to={n} suffix={s} />
            </div>
            <b className="mt-4 block font-medium text-white">{label}</b>
            <p className="mt-1.5 text-[14.5px] text-white/55">{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
