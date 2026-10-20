import { Link } from 'react-router-dom'
import { svcName } from './blocks.jsx'
import { ArrowUpRight } from './Icons.jsx'
import { Reveal } from './motion.jsx'

// Article card with a generated cover (pattern varies by position)
/** @param {Record<string, any>} props */
export default function InsightCard({ a, i = 0 }) {
  return (
    <Reveal delay={(i % 3) * 0.08} className="h-full">
      <Link to={`/insights/${a.slug}`} className="card card-link group h-full">
        <div className="insight-art -mx-7 -mt-7 mb-3" data-k={i % 3}>
          <span className="absolute left-6 top-5 rounded-md bg-white px-2 py-1 font-mono text-[11px] text-ink">{a.kind}</span>
        </div>
        <span className="font-mono text-[11.5px] uppercase tracking-[.08em] text-brand">{svcName(a.s)}</span>
        <h3 className="h3 !text-[21px] transition-colors group-hover:text-brand">{a.title}</h3>
        <p className="card-text">{a.sum}</p>
        <span className="mt-auto flex items-center justify-between border-t border-line pt-4 text-[13px] text-ink-soft">
          {a.read} min read
          <ArrowUpRight className="h-4 w-4 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </Reveal>
  )
}
