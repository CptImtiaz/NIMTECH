import { Link } from 'react-router-dom'
import Puppet, { CAST } from '../Puppet.jsx'
import { Reveal } from '../motion.jsx'
import { Flower, IMessageIcon, MailIcon, SlackIcon } from './AppIcons.jsx'

// Home teaser for the AI Agents page: dark panel with the cast drifting by.
export default function AgentsTeaser() {
  const rows = [CAST.slice(0, 8), CAST.slice(8)]
  return (
    <section className="py-12 md:py-20">
      <div className="wrap">
        <Reveal y={40}>
          <div data-theme="dark" className="agents-x grid items-center gap-10 overflow-hidden rounded-[22px] px-6 py-12 md:px-12 md:py-16 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <span className="inline-flex items-center gap-2 text-[13px] text-[#ACACAC]">
                <Flower className="h-4 w-4" /> NIMTECH Agents
              </span>
              <h2 className="agents-h3 mt-5 max-w-[16ch]">Hire agents with names, roles and their own computer.</h2>
              <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-[#ACACAC]">Emma clears the support queue, Kofi reconciles invoices, Otto watches your deploys. Each agent works in your tools and talks to your team on Slack, email or iMessage.</p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link to="/services/ai-agents" className="agents-cta">Meet the agents</Link>
                <span className="flex items-center gap-2 text-[12px] text-[#8F8F8F]">
                  Chat on <SlackIcon /> <MailIcon /> <IMessageIcon />
                </span>
              </div>
            </div>
            <div className="teaser-rows grid gap-4" aria-hidden="true">
              {rows.map((r, i) => (
                <div key={i} className="overflow-hidden">
                  <div className={`teaser-track ${i ? 'rev' : ''}`}>
                    {[...r, ...r].map((c, k) => (
                      <figure key={k} className="shrink-0">
                        <Puppet c={c} size={84} label={false} className="rounded-[12px] shadow-[0_16px_40px_-16px_rgba(0,0,0,.5)]" />
                        <figcaption className="mt-2 text-center text-[11.5px] text-[#ACACAC]">
                          <b className="font-medium text-[#F5F5F5]">{c.name}</b> · {c.role}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
