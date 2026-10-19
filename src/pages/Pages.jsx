import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { CASES, INDUSTRIES, ORDER, ROLES } from '../data/content.js'
import { PageHero } from '../components/Heroes.jsx'
import { CaseCard, Cards, CTA, NextLink, Panel, Section, SectionHead, ServiceRows, StackTable, Statement, Steps, svcName } from '../components/blocks.jsx'
import { ArrowUpRight } from '../components/Icons.jsx'
import { Tracker } from '../components/Showcases.jsx'
import { EASE, Reveal } from '../components/motion.jsx'

const ENGAGEMENT = [
  ['rocket', 'Project', 'A defined scope delivered by a dedicated team, from discovery to launch.'],
  ['users', 'Dedicated team', 'A reserved squad for continuous product and AI work.'],
  ['loop', 'Ongoing partnership', 'Monitoring, improvement and new features after launch.'],
]

const TRACKER_COPY = 'An open‑vocabulary tracking model developed by our research team. Describe what to find in plain words, and it detects, segments and follows it across frames and cameras, remembering it when it reappears.'

/* ---------- Services ---------- */
export function Services() {
  return (
    <>
      <PageHero badge="Services" h1={['Six practices,', '<em>one engineering team.</em>']} lede="Pick one, or combine them into a single project with one plan, one timeline and one point of contact." primary={['Start a Project', '/contact']} secondary={['How we work', '/process']} />
      <Section>
        <ServiceRows />
      </Section>
      <Section tight>
        <SectionHead eyebrow="Better together" title="How our services <em>combine.</em>" lede="The strongest projects connect more than one capability." />
        <Cards
          cols={4}
          list={[
            ['vision', 'Vision model + mobile app', 'A custom model running on the phone camera for field inspections.'],
            ['agents', 'AI agent + integrations', 'An agent that can read and act across your ERP, CRM and helpdesk.'],
            ['software', 'Platform + AI features', 'Business software with search, summaries and predictions built in.'],
            ['content', 'Content studio + agents', 'Content produced weekly, with an agent that answers buyer questions.'],
          ]}
        />
      </Section>
      <Section tight>
        <SectionHead eyebrow="Engagement" title="Ways to <em>work together.</em>" />
        <Cards list={ENGAGEMENT} cols={3} />
      </Section>
      <CTA />
    </>
  )
}

/* ---------- Industries ---------- */
export function Industries() {
  return (
    <>
      <PageHero badge="Industries" h1={['Built for how your', '<em>industry works.</em>']} lede="The same engineering, shaped around the data, regulations and workflows of your sector." primary={['Start a Project', '/contact']} secondary={['See our work', '/work']} />
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {INDUSTRIES.map((x, i) => (
            <Reveal key={x[0]} delay={(i % 2) * 0.08} className="h-full">
              <div className="card h-full">
                <span className="card-num">0{i + 1}</span>
                <h3 className="h3">{x[0]}</h3>
                <p className="card-text">{x[1]}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-3">
                  {x[2].map((id) => (
                    <Link key={id} to={`/services/${id}`} className="chip chip-link">
                      {svcName(id)} <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Statement text="Every sector has its own data, its own rules and its own edge cases. <em>We learn yours</em> before we write a line of code." />
      <CTA />
    </>
  )
}

/* ---------- Work ---------- */
export function Work() {
  const [f, setF] = useState('all')
  const shown = CASES.filter((c) => f === 'all' || c.s === f)
  return (
    <>
      <PageHero badge="Work" h1={['Problems in.', '<em>Systems out.</em>']} lede="Illustrative examples across our six practices, showing the challenge, what we build and the outcome we design for." primary={['Start a Project', '/contact']} secondary={['Our services', '/services']} />
      <Section>
        <LayoutGroup>
          <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by service">
            {['all', ...ORDER].map((id) => (
              <button key={id} type="button" aria-pressed={f === id} onClick={() => setF(id)} className={`filter ${f === id ? 'on' : ''}`}>
                {f === id && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-brand" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="relative">{id === 'all' ? 'All' : svcName(id)}</span>
              </button>
            ))}
          </div>
          <motion.div layout className="grid gap-4 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {shown.map((c) => (
                <motion.div key={c.t} layout initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5, ease: EASE }}>
                  <CaseCard c={c} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
        <p className="mt-4 text-[13px] text-ink-dim">Illustrative scenarios, not results from named clients. Real case studies will be published as projects go live.</p>
      </Section>
      <CTA title="Seen something close to <em>your problem?</em>" />
    </>
  )
}

/* ---------- Process ---------- */
export function Process() {
  return (
    <>
      <PageHero badge="How we work" h1={['A clear path from', '<em>idea to production.</em>']} lede="The same disciplined process on every project, adapted to the size of the problem." primary={['Start a Project', '/contact']} secondary={['Our technology', '/technology']} />
      <Steps
        title="Five <em>phases.</em>"
        list={[
          ['Discover', 'Workshops with your team, a review of data and systems, and a written plan with scope, risks and success metrics.'],
          ['Prove', 'A proof of concept on your own data. For AI and vision, we agree accuracy targets before the full build.'],
          ['Build', 'Two‑week sprints, each ending with a working demo you can test and steer.'],
          ['Launch', 'Security review, load testing, migration, training and a staged rollout.'],
          ['Evolve', 'Monitoring, user feedback and regular releases after launch.'],
        ]}
      />
      <Section tight>
        <SectionHead eyebrow="Communication" title="You’ll always know <em>where things stand.</em>" />
        <Cards
          cols={4}
          list={[
            ['eye', 'Sprint demos', 'Working software every two weeks, not slide decks.'],
            ['layers', 'Shared boards', 'See every task, decision and blocker in real time.'],
            ['chart', 'Weekly updates', 'Progress, risks and next steps in one short note.'],
            ['users', 'One lead', 'A single senior point of contact who knows your project.'],
          ]}
        />
      </Section>
      <Section tight>
        <SectionHead eyebrow="Quality & security" title="Built to be <em>trusted.</em>" />
        <Cards
          cols={4}
          list={[
            ['shield', 'Security reviews', 'Threat modelling, dependency scanning and access controls.'],
            ['code', 'Code quality', 'Reviews, automated tests and CI on every change.'],
            ['chart', 'AI evaluation', 'Measured accuracy, safety checks and regression tests for models and agents.'],
            ['db', 'Data privacy', 'GDPR and PDPA aware, with data kept in your environment.'],
          ]}
        />
      </Section>
      <Section tight>
        <SectionHead eyebrow="Engagement" title="Ways to <em>work together.</em>" />
        <Cards list={ENGAGEMENT} cols={3} />
      </Section>
      <CTA />
      <NextLink to="/technology" small="Next" label="Technology" />
    </>
  )
}

/* ---------- Technology ---------- */
export function Technology() {
  return (
    <>
      <PageHero badge="Technology" h1={['The right tools for', '<em>each problem.</em>']} lede="We stay model‑agnostic and cloud‑agnostic, choosing proven technology that fits your constraints." primary={['Start a Project', '/contact']} secondary={['How we work', '/process']} />
      <Section>
        <SectionHead eyebrow="Stack" title="What we <em>build with.</em>" />
        <StackTable
          list={[
            ['AI & agents', 'GPT, Claude, Gemini, Llama, LangGraph, LlamaIndex, Model Context Protocol'],
            ['Computer vision', 'PyTorch, YOLO, RF‑DETR, SAM 2, Grounding DINO, SigLIP, OpenCV'],
            ['MLOps', 'MLflow, Weights & Biases, ONNX, TensorRT, OpenVINO, NVIDIA Jetson'],
            ['Web', 'TypeScript, React, Next.js, Node.js, Python, Go'],
            ['Mobile', 'Flutter, React Native, Swift, Kotlin, Core ML, TensorFlow Lite'],
            ['Data', 'PostgreSQL, Redis, BigQuery, Snowflake, pgvector'],
            ['Cloud & DevOps', 'AWS, Google Cloud, Azure, Docker, Kubernetes, Terraform'],
            ['Integration', 'REST, GraphQL, Kafka, webhooks, n8n, OpenAPI'],
          ]}
        />
      </Section>
      <Section tight>
        <SectionHead eyebrow="Research" title="Target Locker, <em>our tracking model.</em>" lede={TRACKER_COPY} />
        <Panel>
          <Tracker />
        </Panel>
      </Section>
      <CTA />
    </>
  )
}

/* ---------- Company ---------- */
export function Company() {
  return (
    <>
      <PageHero badge="About NIMTECH" h1={['Engineers and researchers', '<em>building what’s next.</em>']} lede="NIMTECH is a global engineering studio headquartered in Kuala Lumpur, working with clients across time zones." primary={['Work with us', '/contact']} secondary={['Careers', '/careers']} />
      <Statement text="We started where research meets real work. Our team trains its own vision models, then puts them to work in the real world <em>alongside the software, apps and agents</em> businesses run on." />
      <Section tight>
        <SectionHead eyebrow="Values" title="What we <em>believe.</em>" />
        <Cards
          cols={4}
          numbered
          list={[
            ['Problems first', 'We start from what you need to achieve, not from a technology we want to sell.'],
            ['Prove it early', 'Real data, real tests, before big commitments.'],
            ['Show the work', 'Demos every two weeks and nothing hidden.'],
            ['Leave it better', 'Documented, tested systems your team can own.'],
          ]}
        />
      </Section>
      <Section tight>
        <SectionHead eyebrow="Research" title="Target Locker, <em>our tracking model.</em>" lede="Our in‑house research model finds objects from a text description, segments and tracks them across frames and cameras, and re‑identifies them with a memory bank. It powers our computer vision work." />
        <Panel>
          <Tracker />
        </Panel>
      </Section>
      <Section tight>
        <SectionHead eyebrow="Team" title="Who builds <em>your project.</em>" lede="A small senior team on every project, led by one person you can always reach." />
        <Cards
          list={[
            ['layers', 'Solutions architects', 'Own discovery, scope and technical design.'],
            ['cpu', 'AI & vision engineers', 'Build agents, train models and run evaluation.'],
            ['code', 'Software & mobile engineers', 'Ship web platforms, apps and APIs.'],
            ['bolt', 'Integration engineers', 'Connect payment, commerce and ERP systems.'],
            ['pen', 'Content editors', 'Turn AI drafts into accurate B2B content.'],
            ['users', 'Delivery leads', 'Run sprints, demos and launches.'],
          ]}
        />
      </Section>
      <CTA title="Let’s build something <em>that lasts.</em>" />
    </>
  )
}

/* ---------- Careers ---------- */
export function Careers() {
  return (
    <>
      <PageHero badge="Careers" h1={['Build AI that works', '<em>in the real world.</em>']} lede="We’re growing a remote‑first team of engineers, researchers, editors and delivery leads." primary={['See open roles', '#roles']} secondary={['About us', '/company']} />
      <Section id="roles">
        <SectionHead eyebrow="Open roles" title="Roles we’re <em>hiring for.</em>" />
        <div className="border-t border-line">
          {ROLES.map((r, i) => (
            <Reveal key={r[0]} delay={i * 0.04}>
              <Link to="/contact?service=careers" className="srow group">
                <span className="font-mono text-xs text-ink-dim">0{i + 1}</span>
                <h3 className="srow-title !text-[clamp(20px,2vw,28px)]">{r[0]}</h3>
                <div className="min-w-0">
                  <p className="text-ink-soft">{r[1]}</p>
                  <span className="tag mt-3 inline-block">{r[2]}</span>
                </div>
                <span className="srow-go">
                  <ArrowUpRight />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tight>
        <SectionHead eyebrow="Working here" title="What to <em>expect.</em>" />
        <Cards
          cols={4}
          list={[
            ['globe', 'Remote‑first', 'Work where you do your best work, with shared overlap hours.'],
            ['rocket', 'Real problems', 'Ship to real users, factories and stores.'],
            ['spark', 'Research time', 'Explore new models and tools, and share what you learn.'],
            ['users', 'Small senior teams', 'Short meetings, direct contact with clients.'],
          ]}
        />
      </Section>
      <Steps
        eyebrow="Hiring"
        title="Hiring <em>process.</em>"
        list={[
          ['Intro call', 'A short conversation about you and the role.'],
          ['Technical conversation', 'Talk through real problems with our engineers.'],
          ['Paid exercise', 'A small, realistic task, paid for your time.'],
          ['Offer', 'A decision within days, not weeks.'],
        ]}
      />
      <CTA title="Don’t see <em>your role?</em>" text="Tell us what you’re great at. We’re always happy to meet strong people." />
    </>
  )
}

/* ---------- 404 ---------- */
export function NotFound() {
  return (
    <>
      <PageHero badge="404" h1={['This page drifted', '<em>out of orbit.</em>']} lede="The link may be old or mistyped. Let’s get you back on course." primary={['Back to home', '/']} secondary={['Our services', '/services']} />
      <div className="pb-10" />
    </>
  )
}

