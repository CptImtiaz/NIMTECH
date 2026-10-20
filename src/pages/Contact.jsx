import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ORDER, SERVICES } from '../data/content.js'
import { EMAIL, HQ, WHATSAPP, WHATSAPP_LABEL } from '../data/site.js'
import { PageHero } from '../components/Heroes.jsx'
import { Button, CopyEmail, Section, svcName } from '../components/blocks.jsx'
import { EASE, Reveal } from '../components/motion.jsx'

const OPTIONS = ['Not sure yet', ...ORDER.map(svcName), 'Careers']

export default function Contact() {
  const [params] = useSearchParams()
  const pre = params.get('service')
  const initial = pre === 'careers' ? 'Careers' : SERVICES[pre] ? svcName(pre) : 'Not sure yet'
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
      <PageHero badge="Contact" h1={['Tell us what', '<em>to build.</em>']} lede="A few lines about the problem is enough. A senior engineer replies within one working day." primary={['Write to us', '#form']} />
      <Section id="form">
        <div className="grid items-start gap-7 lg:grid-cols-[1.2fr_.8fr]">
          <Reveal>
            <form onSubmit={submit} noValidate className="card grid gap-4 sm:grid-cols-2">
              <Field label="Name"><input value={form.name} onChange={set('name')} autoComplete="name" /></Field>
              <Field label="Company"><input value={form.company} onChange={set('company')} autoComplete="organization" /></Field>
              <Field label="Work email"><input type="email" value={form.email} onChange={set('email')} autoComplete="email" /></Field>
              <Field label="Phone / WhatsApp"><input inputMode="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" /></Field>
              <Field label="What do you need?" full>
                <select value={form.service} onChange={set('service')}>
                  {OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Tell us about the problem" full>
                <textarea value={form.message} onChange={set('message')} placeholder="What are you trying to achieve, and what’s getting in the way?" />
              </Field>
              <div className="sm:col-span-2">
                <button type="submit" className="btn btn-primary">
                  <span>Prepare enquiry</span>
                </button>
              </div>
              <AnimatePresence>
                {out && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="flex flex-wrap items-center gap-3 text-[14.5px] sm:col-span-2" role="status">
                    {out.error ? (
                      <span className="text-red-600">{out.error}</span>
                    ) : (
                      <>
                        <span className="text-ink">Your enquiry is ready. Send it by:</span>
                        <Button href={out.wa} target="_blank" rel="noopener noreferrer">WhatsApp</Button>
                        <Button href={out.mail} variant="glass">Email</Button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
          <div className="grid gap-4">
            {[
              ['Email', EMAIL, 'The best way to reach the team.', true],
              ['WhatsApp', WHATSAPP_LABEL, 'For quick questions.'],
              ['Headquarters', HQ, 'Working with clients worldwide.'],
              ['Response time', 'Within one working day', 'In your time zone.'],
            ].map((c, i) => (
              <Reveal key={c[0]} delay={i * 0.07}>
                <div className="card">
                  <span className="card-num">{c[0].toUpperCase()}</span>
                  <p className="h3 break-words">{c[1]}</p>
                  <p className="card-text">{c[2]}</p>
                  {c[3] && <div><CopyEmail label="Copy email" /></div>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
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
