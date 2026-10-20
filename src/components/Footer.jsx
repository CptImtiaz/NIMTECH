import { Link } from 'react-router-dom'
import { INDUSTRIES, ORDER } from '../data/content.js'
import { INSIGHTS } from '../data/insights.js'
import { COMPANY_LINKS, EMAIL, HQ } from '../data/site.js'
import { Button, svcName } from './blocks.jsx'
import { ArrowRight, Logo } from './Icons.jsx'

export default function Footer() {
  return (
    <footer className="dark-band relative mt-10 overflow-hidden">
      <div className="wrap relative">
        <div className="grid gap-10 border-b border-white/10 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">
          <div className="min-w-0">
            <Link to="/" className="flex items-center gap-2.5 font-display text-[20px] font-semibold tracking-[-.02em]">
              <Logo className="h-8 w-8" light />
              NIMTECH
            </Link>
            <p className="mt-5 max-w-[34ch] text-[14.5px] leading-relaxed text-white/70">An engineering firm for AI agents, computer vision, software, apps, integration and AI content. Headquartered in {HQ}, delivering worldwide.</p>
            <div className="mt-7">
              <Button to="/contact" variant="light">Start a Project</Button>
            </div>
          </div>
          <FootCol title="Services" links={ORDER.map((id) => [`/services/${id}`, svcName(id)])} />
          <FootCol title="Industries" links={INDUSTRIES.slice(0, 6).map((x) => ['/industries', x[0]])} />
          <FootCol title="Company" links={[...COMPANY_LINKS, ['/contact', 'Contact']]} />
          <div>
            <p className="mb-4 font-mono text-[11.5px] font-medium uppercase tracking-[.14em] text-white/55">Latest insights</p>
            <ul className="grid gap-4">
              {INSIGHTS.map((a) => (
                <li key={a.slug}>
                  <Link to={`/insights/${a.slug}`} className="group block text-[14px] leading-snug text-white/80 hover:text-white">
                    {a.title}
                    <span className="mt-1 flex items-center gap-1.5 text-[12.5px] text-white/50 group-hover:text-brand-light">
                      {a.kind} · {a.read} min <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <address className="flex flex-wrap items-center justify-between gap-4 py-7 text-[13px] not-italic text-white/55">
          <span>© {new Date().getFullYear()} NIMTECH. All rights reserved.</span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a>
            <span>{HQ}</span>
            <Link to="/contact" className="hover:text-white">Contact form</Link>
          </span>
        </address>
      </div>
    </footer>
  )
}

function FootCol({ title, links }) {
  return (
    <div>
      <p className="mb-4 font-mono text-[11.5px] font-medium uppercase tracking-[.14em] text-white/55">{title}</p>
      <ul className="grid gap-2.5 text-[14.5px]">
        {links.map(([to, l]) => (
          <li key={to + l}>
            <Link to={to} className="text-white/75 transition-colors hover:text-white">{l}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
