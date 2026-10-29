import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { ORDER, SERVICES, svcName } from '../data/services.js'
import { EMAIL, WHATSAPP } from '../data/site.js'
import { openRequest } from '../lib/bus.js'
import { useClock } from '../lib/clock.js'
import { startScroll, stopScroll } from '../lib/scroll.js'
import { Logo, LogoMark } from './Icons.jsx'
import { NAV } from './Header.jsx'
import { Pill } from './ui.jsx'

// Open/close with an exit animation: `mounted` stays true until it fades.
function useOverlay(event) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [detail, setDetail] = useState(null)
  useEffect(() => {
    const on = (e) => {
      setDetail(e.detail || null)
      setMounted(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)))
    }
    addEventListener(event, on)
    return () => removeEventListener(event, on)
  }, [event])
  useEffect(() => {
    if (!mounted) return
    stopScroll()
    return () => startScroll()
  }, [mounted])
  const close = () => {
    setOpen(false)
    setTimeout(() => setMounted(false), 420)
  }
  useEffect(() => {
    if (!mounted) return
    const k = (e) => e.key === 'Escape' && close()
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [mounted])
  return { open, mounted, close, detail }
}

/* ---------------- Full-screen menu ---------------- */
export function NavMenu() {
  const { open, mounted, close } = useOverlay('nim:menu')
  const nav = useNavigate()
  const { time, live } = useClock()
  if (!mounted) return null
  const go = (to) => {
    close()
    if (to) nav(to)
    else setTimeout(() => openRequest(), 430)
  }
  return (
    <div className={`menu ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu">
      <div className="menu-orbs" aria-hidden="true">
        {ORDER.map((id, i) => (
          <span key={id} style={{ '--c': SERVICES[id].color, '--i': i }} />
        ))}
      </div>
      <div className="wrap flex items-center justify-between py-5 sm:py-6">
        <span className="flex items-center gap-2 font-grotesk text-lg font-bold tracking-[0.22em]">
          <Logo className="h-6 w-6" light /> NIMTECH
        </span>
        <button type="button" onClick={close} className="menu-close" autoFocus>
          <X className="h-3.5 w-3.5" /> Close
        </button>
      </div>
      <nav className="wrap relative flex flex-1 flex-col justify-center" aria-label="Menu">
        <ul className="grid gap-1">
          {NAV.map(([l, to], i) => (
            <li key={l}>
              <button type="button" onClick={() => go(to)} className="menu-item group" style={{ transitionDelay: `${i * 45 + 80}ms` }}>
                <span className="menu-n">0{i + 1}</span>
                <span className="menu-l">{l}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="wrap menu-foot">
        <span>Local time{live ? ` — ${time}` : ''}</span>
        <button type="button" onClick={() => go(null)} className="hover:text-white hover:underline">
          Start a project →
        </button>
      </div>
    </div>
  )
}

/* ---------------- Request modal ---------------- */
export function RequestModal() {
  const { open, mounted, close, detail } = useOverlay('nim:request')
  const [state, setState] = useState('form') // form | sending | done
  const [msg, setMsg] = useState(null)
  const [svc, setSvc] = useState('Not sure yet')
  const form = useRef(null)

  useEffect(() => {
    if (open) setSvc(detail?.service ? svcName(detail.service) : 'Not sure yet')
  }, [open, detail])
  useEffect(() => {
    if (mounted) return
    const t = setTimeout(() => {
      setState('form')
      setMsg(null)
      form.current?.reset()
    }, 300)
    return () => clearTimeout(t)
  }, [mounted])

  if (!mounted) return null
  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const v = Object.fromEntries([...f.entries()].map(([k, x]) => [k, String(x).trim()]))
    const txt = `Hi NIMTECH, I'm ${v.name}.\nInterested in: ${svc}\n\n${v.project}\n\nEmail: ${v.email}`
    setState('sending')
    setTimeout(() => {
      setMsg({
        mail: `mailto:${EMAIL}?subject=${encodeURIComponent('Project enquiry: ' + svc)}&body=${encodeURIComponent(txt)}`,
        wa: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`,
      })
      setState('done')
    }, 600)
  }

  return (
    <div className={`modal ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="req-title" onClick={close}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={close} className="modal-x" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
        {state !== 'done' ? (
          <>
            <div className="mb-6 grid gap-1.5">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2f69ff]" /> Start a project
              </span>
              <h2 id="req-title" className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Tell us what you’re building.
              </h2>
            </div>
            <form ref={form} onSubmit={submit} className="flex flex-col gap-4">
              <label className="field">
                Name
                <input name="name" required placeholder="Your name" autoComplete="name" />
              </label>
              <label className="field">
                Email
                <input name="email" type="email" required placeholder="you@company.com" autoComplete="email" />
              </label>
              <fieldset className="field">
                <legend className="mb-2">Service</legend>
                <div className="flex flex-wrap gap-1.5">
                  {['Not sure yet', ...ORDER.map(svcName)].map((o) => (
                    <button key={o} type="button" onClick={() => setSvc(o)} aria-pressed={svc === o} className={`chip-opt ${svc === o ? 'on' : ''}`}>
                      {o.replace(' Development', '')}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className="field">
                Project
                <textarea name="project" rows={4} required placeholder="A few words about your project, timeline, and budget." />
              </label>
              <div className="mt-2 flex items-center justify-between gap-4">
                <span className="text-xs text-neutral-500">We reply within one business day.</span>
                <Pill type="submit" variant="dark" arrow="up-right">
                  {state === 'sending' ? 'Preparing…' : 'Send request'}
                </Pill>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[#0a0a0a] text-2xl text-[#5175ff]">
              <LogoMark className="h-6 w-6" />
            </span>
            <h2 className="font-display text-2xl font-semibold">Your request is ready</h2>
            <p className="max-w-[34ch] text-sm text-neutral-600">Choose how to send it. We’ll get back to you within one business day.</p>
            <div className="flex flex-wrap justify-center gap-2">
              <a href={msg.wa} target="_blank" rel="noopener noreferrer" className="pill-btn pill-dark bg-[#1fa855]!">
                Send on WhatsApp
              </a>
              <a href={msg.mail} className="pill-btn pill-outline">
                Send by email
              </a>
            </div>
            <button type="button" onClick={close} className="mt-2 text-sm text-neutral-500 underline-offset-4 hover:underline">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
