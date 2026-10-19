import { ORDER, SERVICES } from '../data/content.js'
import { Cards, CTA, FAQ, Marquee, NextLink, Panel, Rows, Section, SectionHead, StackTable, Steps, svcName } from './blocks.jsx'
import { SHOWCASES, Tracker } from './Showcases.jsx'

// Everything below a service hero: problem, capabilities, live showcase,
// process, use cases, stack, reasons, FAQ and the next-service link.
// `extra` is rendered after the capabilities (e.g. a showcase gallery).
/** @param {Record<string, any>} props */
export default function ServiceBody({ id, extra = null, showcase = true }) {
  const s = SERVICES[id]
  const next = ORDER[(ORDER.indexOf(id) + 1) % ORDER.length]
  const Show = SHOWCASES[s.vis]
  return (
    <div className="relative bg-black">
      <Marquee items={s.caps.map((c) => c[1])} />

      <Section>
        <SectionHead eyebrow="The problem" title={s.problemT} />
        <Cards list={s.problems} cols={4} numbered />
      </Section>

      <Section tight>
        <SectionHead eyebrow={s.name} title={s.capsT} />
        <Cards list={s.caps} cols={3} />
      </Section>

      {extra}

      {showcase && (
        <Section tight id="show">
          <SectionHead eyebrow="In action" title={s.showT} lede={s.showP} />
          <Panel title={Show.title}>
            <Show.C />
          </Panel>
        </Section>
      )}

      {s.research && (
        <Section tight>
          <SectionHead eyebrow="Our research" title="Powered by <em>Target Locker.</em>" lede="Our in‑house tracking model. Describe what to find in plain words, and it detects, segments and follows it across frames and cameras, remembering it when it reappears." />
          <Panel>
            <Tracker />
          </Panel>
        </Section>
      )}

      <Steps id="how-it-works" title={s.processT} list={s.process} />

      <Section tight>
        <SectionHead eyebrow="Use cases" title={s.usesT} />
        <Rows list={s.uses} />
      </Section>

      <Section tight>
        <SectionHead eyebrow="Technology" title={s.stackT} />
        <StackTable list={s.stack} />
      </Section>

      <Section tight id="benefits">
        <SectionHead eyebrow="Why NIMTECH" title="Why teams <em>choose us.</em>" />
        <Cards list={s.why} cols={4} numbered />
      </Section>

      <Section tight id="faqs">
        <SectionHead eyebrow="FAQ" title="Questions, <em>answered.</em>" />
        <FAQ list={s.faq} />
      </Section>

      <CTA />
      <NextLink to={`/services/${next}`} small="Next service" label={svcName(next)} />
    </div>
  )
}
