import { Link, Navigate, useParams } from 'react-router-dom'
import { INSIGHTS, insight } from '../data/insights.js'
import { CTA, Section, svcName } from '../components/blocks.jsx'
import InsightCard from '../components/InsightCard.jsx'
import { ArrowRight } from '../components/Icons.jsx'
import { Reveal, SplitText } from '../components/motion.jsx'

const fmt = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

/* ---------- index ---------- */
export function InsightsIndex() {
  const [lead, ...rest] = INSIGHTS
  return (
    <>
      <section className="border-b border-line pb-16 pt-36 md:pt-44">
        <div className="wrap">
          <span className="kicker">Insights</span>
          <SplitText lines={['Practical thinking on', '<em>AI and software.</em>']} className="h1 mt-5 max-w-[18ch]" />
          <p className="lede mt-6">Guides and perspectives from the engineers who build and run these systems for our clients.</p>
        </div>
      </section>
      <Section>
        <Reveal>
          <Link to={`/insights/${lead.slug}`} className="group grid overflow-hidden rounded-[16px] border border-line bg-white lg:grid-cols-[1.1fr_1fr]">
            <div className="insight-art min-h-[240px] lg:min-h-[360px]" data-k="0" />
            <div className="flex flex-col p-7 md:p-10">
              <span className="font-mono text-[11.5px] uppercase tracking-[.08em] text-brand">Featured · {lead.kind}</span>
              <h2 className="h2 mt-4 !text-[clamp(28px,2.8vw,40px)] transition-colors group-hover:text-brand">{lead.title}</h2>
              <p className="lede mt-4">{lead.sum}</p>
              <span className="mt-auto flex items-center gap-2 pt-8 text-[14.5px] font-medium text-brand">
                Read the {lead.kind.toLowerCase()} <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </Reveal>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {rest.map((a, i) => (
            <InsightCard key={a.slug} a={a} i={i + 1} />
          ))}
        </div>
      </Section>
      <CTA title="Want this applied to <em>your problem?</em>" />
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
        <header className="border-b border-line pb-14 pt-36 md:pt-44">
          <div className="wrap max-w-[900px]">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px] text-ink-soft">
              <Link to="/" className="hover:text-ink">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/insights" className="hover:text-ink">Insights</Link>
            </nav>
            <span className="mt-8 block font-mono text-[12px] uppercase tracking-[.12em] text-brand">
              {a.kind} · <Link to={`/services/${a.s}`} className="hover:underline">{svcName(a.s)}</Link>
            </span>
            <h1 className="h1 mt-4 !text-[clamp(34px,4.2vw,58px)]">{a.title}</h1>
            <p className="lede mt-6 !text-[19px]">{a.sum}</p>
            <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-ink-soft">
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
            <div className="rounded-[14px] border border-line bg-surface p-6">
              <p className="kicker">Key takeaways</p>
              <ul className="mt-5 grid gap-3 text-[14.5px] leading-relaxed text-ink">
                {a.takeaways.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link to={`/contact?service=${a.s}`} className="btn btn-primary mt-6 w-full justify-center">
                Talk to an engineer
              </Link>
            </div>
          </aside>
        </div>
      </article>
      <Section className="bg-surface">
        <p className="kicker">Keep reading</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {more.map((x, i) => (
            <InsightCard key={x.slug} a={x} i={i + 1} />
          ))}
        </div>
      </Section>
      <CTA />
    </>
  )
}
