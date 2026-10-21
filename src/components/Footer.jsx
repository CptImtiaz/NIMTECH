import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react'
import { ORDER, SERVICES } from '../data/services.js'
import { EMAIL, HQ, WHATSAPP } from '../data/site.js'
import { openRequest } from '../lib/bus.js'
import { Lines, Pill } from './ui.jsx'

const WORDS = ['Software', 'Mobile apps', 'Websites', 'API integration', 'AI models', 'AI agents']

// Black footer: a ticker of services, a call to action, link columns and a
// giant faint wordmark.
export default function Footer() {
  const cols = [
    ['Services', ORDER.map((id) => [SERVICES[id].short, `/services/${id}`])],
    [
      'Studio',
      [
        ['About', '/about'],
        ['All services', '/services'],
        ['Insights', '/insights'],
        ['Contact', '/contact'],
      ],
    ],
    [
      'Get in touch',
      [
        [EMAIL, `mailto:${EMAIL}`],
        ['WhatsApp', `https://wa.me/${WHATSAPP}`],
        [HQ, null],
        ['Working worldwide', null],
      ],
    ],
  ]
  return (
    <footer className="foot">
      <div className="foot-glow a" aria-hidden="true" />
      <div className="foot-glow b" aria-hidden="true" />
      <div className="foot-ticker" aria-hidden="true">
        <div className="foot-track">
          {[0, 1].map((k) => (
            <span key={k} className="inline-flex items-center">
              {WORDS.map((w) => (
                <span key={w} className="inline-flex items-center">
                  <span className="px-8">{w}</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2f69ff]" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="wrap relative z-10 pb-10 pt-16 md:pt-24">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mono-label text-white/40">[ Let’s collaborate ]</p>
            <Lines lines={['Have an idea', 'with real weight?']} className="h-hero mt-6 max-w-[16ch] text-white" stagger={100} />
          </div>
          <div className="flex flex-wrap gap-3">
            <Pill variant="light" arrow="up-right" onClick={() => openRequest()}>
              Start a project
            </Pill>
            <a href={`mailto:${EMAIL}`} className="foot-mail group">
              <span>{EMAIL}</span>
              <span className="blue-orb !h-10 !w-10">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </a>
          </div>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-grotesk text-lg font-bold tracking-[0.22em]">NIMTECH</p>
            <p className="mt-4 max-w-[20rem] text-sm leading-relaxed text-white/55">An independent studio building software, apps, websites and AI for growing businesses.</p>
          </div>
          {cols.map(([t, links], i) => (
            <nav key={t} aria-label={t} className="rise" style={{ '--d': `${i * 0.08}s` }}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{t}</h3>
              <ul className="mt-5 space-y-3">
                {links.map(([l, to]) => (
                  <li key={l}>
                    {to ? (
                      to.startsWith('/') ? (
                        <Link to={to} className="foot-link group">
                          {l}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      ) : (
                        <a href={to} className="foot-link group" target={to.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                          <span className="break-all">{l}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )
                    ) : (
                      <span className="text-[15px] text-white/55">{l}</span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
          <p className="flex items-center gap-3 font-mono text-[11px] text-white/40">
            <span className="font-grotesk text-sm font-bold tracking-[0.22em] text-white">NIMTECH</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#2f69ff]" />© {new Date().getFullYear()} — All rights reserved.
          </p>
          <div className="flex gap-2">
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="foot-round">
              <Mail className="h-4 w-4" />
            </a>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="foot-round">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <p className="foot-mark" aria-hidden="true">
        NIMTECH
      </p>
    </footer>
  )
}
