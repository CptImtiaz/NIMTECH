import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { INSIGHTS, insight } from '../data/insights.js'
import { svcName } from '../data/services.js'
import { PageHero } from '../components/ui.jsx'

const fmt = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

const TONES = [
  ['#3054ff', '#a068ff'],
  ['#ff7a45', '#a068ff'],
  ['#16a34a', '#3054ff'],
]

function Card({ a, i }) {
  const [x, y] = TONES[i % 3]
  return (
    <Link to={`/insights/${a.slug}`} className="rise group flex h-full flex-col overflow-hidden spot rounded-[26px] border border-[#e6e5e2] bg-white transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(14,42,197,.3)]" style={{ '--d': `${(i % 2) * 0.08}s` }}>
      <div className="insight-cover relative h-48 transition-transform duration-700 group-hover:scale-[1.02]" style={{ '--a': x, '--b': y }}>
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black">{a.kind}</span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <span className="text-xs font-medium uppercase tracking-wider text-[#0E2AC5]">{svcName(a.s)}</span>
        <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight">{a.title}</h3>
        <p className="mt-3 text-[16px] leading-relaxed text-neutral-600">{a.sum}</p>
        <span className="mt-auto flex items-center justify-between pt-6 text-sm text-neutral-500">
          {a.read} min read
          <ArrowUpRight className="h-5 w-5 text-neutral-900 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

/* ---------- index ---------- */
export function InsightsIndex() {
  return (
    <>
      <PageHero label="Insights" title={['Practical thinking on', 'AI and software.']} text="Short guides from the engineers who build these systems, written for business owners." color="#E1FC03" />
      <section className="relative z-10 rounded-t-[2.5rem] bg-white py-20 md:rounded-t-[4rem] md:py-28">
        <div className="wrap grid gap-5 md:grid-cols-2">
          {INSIGHTS.map((a, i) => (
            <Card key={a.slug} a={a} i={i} />
          ))}
        </div>
      </section>
    </>
  )
}

/* ---------- article ---------- */
export function Article() {
  const { slug } = useParams()
  const a = insight(slug)
  if (!a) return <Navigate to="/insights" replace />
  const more = INSIGHTS.filter((x) => x.slug !== a.slug)
  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden pb-16 pt-36 md:pt-44">
          <div className="ph-bg" style={{ '--c': '#96E5FF' }} aria-hidden="true" />
          <div className="wrap max-w-[900px]">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px] text-neutral-500">
              <Link to="/" className="hover:text-neutral-900">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/insights" className="hover:text-neutral-900">Insights</Link>
            </nav>
            <span className="mt-8 block text-xs font-medium uppercase tracking-wider text-[#0E2AC5]">
              {a.kind} · <Link to={`/services/${a.s}`} className="hover:underline">{svcName(a.s)}</Link>
            </span>
            <h1 className="mt-4 font-display text-[clamp(34px,4.6vw,60px)] font-medium leading-[1.02] tracking-tight">{a.title}</h1>
            <p className="mt-6 text-[19px] leading-relaxed text-neutral-700">{a.sum}</p>
            <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-neutral-500">
              <span>By the NIMTECH engineering team</span>
              <time dateTime={a.date}>{fmt(a.date)}</time>
              <span>{a.read} min read</span>
            </p>
          </div>
        </header>
        <div className="wrap grid max-w-[1100px] gap-12 py-16 lg:grid-cols-[1fr_300px]">
          <div className="prose-nim min-w-0">
            {a.body.map(([h, ps]) => (
              <section key={h}>
                <h2>{h}</h2>
                {ps.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </section>
            ))}
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[22px] bg-[#f1f0ee] p-6">
              <p className="text-sm font-semibold">Key takeaways</p>
              <ul className="mt-4 grid gap-3 text-[15px] leading-relaxed">
                {a.takeaways.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3054ff]" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link to={`/contact?service=${a.s}`} className="pill-btn pill-dark mt-6 w-full justify-center">
                Talk to an engineer <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </article>
      <section className="py-20">
        <div className="wrap">
          <p className="eyebrow">Keep reading</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {more.map((x, i) => (
              <Card key={x.slug} a={x} i={i + 1} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
