import { CASES, INDUSTRIES, ORDER } from '../data/content.js'
import { HomeHero } from '../components/Heroes.jsx'
import { Button, CaseCard, Card, Cards, CTA, FAQ, Marquee, Panel, Section, SectionHead, ServiceRows, Statement, Steps, svcName } from '../components/blocks.jsx'
import { SHOWCASES } from '../components/Showcases.jsx'
import { Reveal } from '../components/motion.jsx'
import TrustedBy from '../components/TrustedBy.jsx'
import Counters from '../components/Counters.jsx'

const Vision = SHOWCASES.vision.C

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustedBy />
      <Marquee items={ORDER.map(svcName)} />
      <Statement text="We’re an engineering studio for companies that want AI and software done <em>properly.</em> You bring the problem. We design, build and run the system that solves it." />

      <Section tight>
        <SectionHead eyebrow="What we do" title="Six practices. <em>One team.</em>" lede="Most projects combine two or three. A vision model needs an app, an agent needs integrations, a launch needs content. We bring all of it under one roof." />
        <ServiceRows />
      </Section>

      <Counters />

      <Section>
        <SectionHead eyebrow="Featured capability" title="Vision models trained on <em>your world.</em>" lede="Our computer vision practice builds custom models end to end, from data collection and labelling to training, evaluation and deployment on edge devices." />
        <Panel title={SHOWCASES.vision.title}>
          <Vision />
        </Panel>
        <p className="mt-3.5 text-[13px] text-ink-dim">Illustrative training run.</p>
        <div className="mt-7">
          <Button to="/services/computer-vision" variant="glass">Explore computer vision</Button>
        </div>
      </Section>

      <Steps
        title="How we <em>work.</em>"
        lede="A clear, repeatable delivery model, whichever service you need."
        list={[
          ['Discover', 'We start with the problem, the people and the data, not with a technology.'],
          ['Prove', 'For AI work, we test on your real data first, so you see results before you commit.'],
          ['Build', 'Two‑week sprints with a working demo at the end of each.'],
          ['Launch', 'Production release with monitoring, documentation and training.'],
          ['Evolve', 'Ongoing improvement as your users, data and business change.'],
        ]}
      />

      <Section>
        <SectionHead eyebrow="Industries" title="Built for <em>real operations.</em>" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((x, i) => (
            <Card key={x[0]} to="/industries" delay={(i % 4) * 0.07}>
              <h3 className="h3">{x[0]}</h3>
              <p className="card-text">{x[1]}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Work" title="What a project <em>looks like.</em>" lede="Illustrative examples of the kind of problems we solve." />
        <div className="grid gap-4 lg:grid-cols-3">
          {CASES.slice(0, 3).map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08} className="h-full">
              <CaseCard c={c} />
            </Reveal>
          ))}
        </div>
        <div className="mt-7">
          <Button to="/work" variant="glass">See all work</Button>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Principles" title="How we’re <em>different.</em>" />
        <Cards
          cols={4}
          list={[
            ['spark', 'Engineered, not plugged in', 'We build and train our own models when off‑the‑shelf isn’t good enough.'],
            ['chart', 'Proof before scale', 'Every AI project starts with a test on your real data.'],
            ['shield', 'Secure by design', 'Your data stays in your environment, under your permissions.'],
            ['code', 'Yours to keep', 'Code, models, data and accounts belong to you.'],
          ]}
        />
      </Section>

      <Section>
        <SectionHead eyebrow="FAQ" title="Common <em>questions.</em>" />
        <FAQ
          list={[
            ['What kind of companies do you work with?', 'Growing companies and enterprise teams in many industries, anywhere in the world, from first AI project to large platforms.'],
            ['Do you work with clients outside Malaysia?', 'Yes. Most of our work is remote, with overlap hours for calls and sprint demos in your time zone.'],
            ['Can you join our existing team?', 'Yes. We can lead a project, work alongside your engineers, or hand over gradually.'],
            ['How does a project start?', 'With a short discovery: we learn the problem, review your data and systems, and propose a clear plan.'],
            ['Who owns what you build?', 'You do: source code, trained models, datasets and infrastructure.'],
          ]}
        />
      </Section>

      <CTA />
    </>
  )
}
