import { Navigate, useParams } from 'react-router-dom'
import { ORDER, SERVICES } from '../data/content.js'
import { PageHero } from '../components/Heroes.jsx'
import { Cards, CTA, FAQ, Marquee, NextLink, Panel, Rows, Section, SectionHead, StackTable, Steps, svcName } from '../components/blocks.jsx'
import { SHOWCASES, Tracker } from '../components/Showcases.jsx'

export default function Service() {
  const { id } = useParams()
  const s = SERVICES[id]
  if (!s) return <Navigate to="/services" replace />
  const next = ORDER[(ORDER.indexOf(id) + 1) % ORDER.length]
  const Show = SHOWCASES[s.vis]

  return (
    <>
      <PageHero vis={s.vis} tall badge={s.badge} h1={s.h1} lede={s.lede} primary={['Start a Project', `/contact?service=${id}`]} secondary={['See how it works', '#show']} stats={s.stats} />
      <Marquee items={s.caps.map((c) => c[1])} />

      <Section>
        <SectionHead eyebrow="The problem" title={s.problemT} />
        <Cards list={s.problems} cols={4} numbered />
      </Section>

      <Section tight>
        <SectionHead eyebrow={s.name} title={s.capsT} />
        <Cards list={s.caps} cols={3} />
      </Section>

      <Section tight id="show">
        <SectionHead eyebrow="In action" title={s.showT} lede={s.showP} />
        <Panel title={Show.title}>
          <Show.C />
        </Panel>
      </Section>

      {s.research && (
        <Section tight>
          <SectionHead eyebrow="Our research" title="Powered by <em>Target Locker.</em>" lede="Our in‑house tracking model. Describe what to find in plain words, and it detects, segments and follows it across frames and cameras, remembering it when it reappears." />
          <Panel>
            <Tracker />
          </Panel>
        </Section>
      )}

      <Steps title={s.processT} list={s.process} />

      <Section tight>
        <SectionHead eyebrow="Use cases" title={s.usesT} />
        <Rows list={s.uses} />
      </Section>

      <Section tight>
        <SectionHead eyebrow="Technology" title={s.stackT} />
        <StackTable list={s.stack} />
      </Section>

      <Section tight>
        <SectionHead eyebrow="Why NIMTECH" title="Why teams <em>choose us.</em>" />
        <Cards list={s.why} cols={4} numbered />
      </Section>

      <Section tight>
        <SectionHead eyebrow="FAQ" title="Questions, <em>answered.</em>" />
        <FAQ list={s.faq} />
      </Section>

      <CTA />
      <NextLink to={`/services/${next}`} small="Next service" label={svcName(next)} />
    </>
  )
}
