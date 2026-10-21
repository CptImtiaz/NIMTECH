import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Mail, MapPin, MessageCircle } from 'lucide-react'
import { ORDER, SERVICES, svcName } from '../data/services.js'
import { EMAIL, HQ, WHATSAPP, WHATSAPP_LABEL } from '../data/site.js'
import { PageHero } from '../components/ui.jsx'
import { IMG } from '../data/images.js'

const EASE = [0.16, 1, 0.3, 1]
const OPTIONS = ['Not sure yet', ...ORDER.map(svcName)]

export default function Contact() {
  const [params] = useSearchParams()
  const pre = params.get('service')
  const initial = SERVICES[pre] ? svcName(pre) : 'Not sure yet'
  const [form, setForm] = useState({ name: '', company: '', email: params.get('email') || '', phone: '', service: initial, message: '' })
  const [out, setOut] = useState(null)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const v = Object.fromEntries(Object.entries(form).map(([k, x]) => [k, x.trim()]))
    if (!(v.name && (v.email || v.phone) && v.message)) {
      setOut({ error: 'Please add your name, an email or phone number, and a short description.' })
      return
    }
    const txt = `Hi NIMTECH, I’m ${v.name}${v.company ? ' from ' + v.company : ''}.\nInterested in: ${v.service}\n\n${v.message}\n\n${v.email ? 'Email: ' + v.email + '\n' : ''}${v.phone ? 'Phone: ' + v.phone : ''}`
    setOut({
      wa: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`,
      mail: `mailto:${EMAIL}?subject=${encodeURIComponent('Project enquiry: ' + v.service)}&body=${encodeURIComponent(txt)}`,
    })
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us what" accent="to build." text="A few lines about the problem is enough. A senior engineer replies within one working day." image={IMG.laptop} />
      <section id="form" className="py-20 md:py-28">
        <div className="wrap grid items-start gap-8 lg:grid-cols-[1.25fr_.75fr]">
          <form onSubmit={submit} noValidate className="rise grid gap-5 glass-card rounded-[28px] p-6 sm:grid-cols-2 md:p-10">
            <Field label="Name"><input value={form.name} onChange={set('name')} autoComplete="name" /></Field>
            <Field label="Company"><input value={form.company} onChange={set('company')} autoComplete="organization" /></Field>
            <Field label="Work email"><input type="email" value={form.email} onChange={set('email')} autoComplete="email" /></Field>
            <Field label="Phone / WhatsApp"><input inputMode="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" /></Field>
            <fieldset className="sm:col-span-2">
              <legend className="mb-3 text-sm font-medium text-white/70">What do you need?</legend>
              <div className="flex flex-wrap gap-2">
                {OPTIONS.map((o) => (
                  <button key={o} type="button" onClick={() => setForm((f) => ({ ...f, service: o }))} aria-pressed={form.service === o} className={`rounded-full px-4 py-2 text-sm transition-colors ${form.service === o ? 'bg-white text-black' : 'bg-white/[.04] text-white/75 ring-1 ring-white/15 hover:ring-white/40'}`}>
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>
            <Field label="Tell us about the problem" full>
              <textarea rows={5} value={form.message} onChange={set('message')} placeholder="What are you trying to achieve, and what’s getting in the way?" />
            </Field>
            <div className="sm:col-span-2">
              <button type="submit" className="start-btn !pr-6">Prepare my enquiry</button>
            </div>
            <AnimatePresence>
              {out && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="flex flex-wrap items-center gap-3 text-[15px] sm:col-span-2" role="status">
                  {out.error ? (
                    <span className="text-red-400">{out.error}</span>
                  ) : (
                    <>
                      <span>Your enquiry is ready. Send it by:</span>
                      <a href={out.wa} target="_blank" rel="noopener noreferrer" className="pill bg-[#25d366] px-5 py-2.5 text-white">WhatsApp</a>
                      <a href={out.mail} className="hx-ghost !py-2.5">Email</a>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
          <ul className="grid gap-3">
            {[
              [Mail, 'Email', EMAIL, `mailto:${EMAIL}`],
              [MessageCircle, 'WhatsApp', WHATSAPP_LABEL, `https://wa.me/${WHATSAPP}`],
              [MapPin, 'Based in', HQ, null],
              [Clock, 'Reply time', 'Within one working day', null],
            ].map(([Ico, k, v, href], i) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#3054ff] to-[#a068ff] text-white"><Ico className="h-5 w-5" /></span>
                  <span className="min-w-0">
                    <span className="block text-sm text-white/50">{k}</span>
                    <span className="block break-words font-display text-lg font-semibold">{v}</span>
                  </span>
                </>
              )
              const cls = 'spot flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/[.03] p-5 transition-colors'
              return (
                <li key={k} className="rise" style={{ '--d': `${i * 0.06}s` }}>
                  {href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={`${cls} hover:border-white/30`}>{inner}</a> : <div className={cls}>{inner}</div>}
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}

function Field({ label, children, full }) {
  return (
    <label className={`field ${full ? 'sm:col-span-2' : ''}`}>
      {label}
      {children}
    </label>
  )
}
