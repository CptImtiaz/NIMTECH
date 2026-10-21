import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PROJECTS } from '../../data/projects.js'
import { svcName } from '../../data/services.js'
import ProjectMedia from '../ProjectMedia.jsx'

// Real projects: a list on the left, the picked project large on the right.
export default function ProjectsShowcase({ ids = ['sultana', 'seaescape', 'target-locker', 'skinscan', 'courier'] }) {
  const list = ids.map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean)
  const [cur, setCur] = useState(list[0].id)
  const p = list.find((x) => x.id === cur)

  return (
    <section className="bg-[#0b0b0f] py-24 text-white md:py-32" data-theme="dark">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="rise">
            <span className="eyebrow text-white/60">Our work</span>
            <h2 className="h2 mt-5 max-w-[16ch] text-white">
              Real projects, <em>real results.</em>
            </h2>
          </div>
          <Link to="/work" className="rise pill pill-light" style={{ '--d': '.1s' }}>
            All projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <ul className="rise space-y-2" role="tablist" aria-label="Projects">
            {list.map((x) => (
              <li key={x.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={cur === x.id}
                  onClick={() => setCur(x.id)}
                  onMouseEnter={() => setCur(x.id)}
                  className={`w-full rounded-2xl border px-5 py-4 text-left transition-all ${cur === x.id ? 'border-white/20 bg-white/[.08]' : 'border-transparent hover:bg-white/[.04]'}`}
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-display text-xl font-semibold">{x.name}</span>
                    <span className="shrink-0 text-xs text-white/50">{x.kind}</span>
                  </span>
                  <span className={`grid transition-all duration-500 ${cur === x.id ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <span className="overflow-hidden text-[15px] leading-relaxed text-white/65">{x.line}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="rise relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[.03]" style={{ '--d': '.1s' }}>
            <div key={p.id} className="fade-swap aspect-[16/11] w-full overflow-hidden">
              <ProjectMedia p={p} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-5">
              <p className="text-[15px] text-white/80">
                <span className="text-white/45">{svcName(p.s)} · </span>
                {p.result}
              </p>
              <ul className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
