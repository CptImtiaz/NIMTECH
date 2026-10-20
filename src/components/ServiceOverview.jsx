import { Link } from 'react-router-dom'
import { ORDER, SERVICES } from '../data/content.js'
import { svcName } from './blocks.jsx'
import { ArrowUpRight, Icon } from './Icons.jsx'
import { Reveal } from './motion.jsx'
import { Rich } from '../lib/rich.jsx'

// One card per service: what it is, what you get and how it runs.
export default function ServiceOverview() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {ORDER.map((id, i) => {
        const s = SERVICES[id]
        return (
          <Reveal key={id} delay={(i % 3) * 0.08} className="h-full">
            <Link to={`/services/${id}`} className="card card-link group h-full">
              <div className="flex items-center justify-between">
                <span className="card-icon !mb-0">
                  <Icon name={s.icon} />
                </span>
                <span className="font-mono text-[11.5px] text-ink-dim">0{i + 1}</span>
              </div>
              <h3 className="h3 mt-3 !text-[22px] transition-colors group-hover:text-brand">{svcName(id)}</h3>
              <p className="card-text">
                <Rich text={s.lede} />
              </p>
              <div className="mt-2">
                <p className="font-mono text-[11px] uppercase tracking-[.1em] text-ink-dim">What you get</p>
                <ul className="mt-2.5 grid gap-1.5 text-[14px] text-ink">
                  {s.caps.slice(0, 4).map((c) => (
                    <li key={c[1]} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {c[1]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto border-t border-line pt-4">
                <p className="text-[13px] leading-relaxed text-ink-soft">
                  <span className="font-medium text-ink">How it runs: </span>
                  {s.process.slice(0, 4).map((p) => p[0]).join(' → ')}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-brand">
                  Explore {svcName(id)} <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        )
      })}
    </div>
  )
}
