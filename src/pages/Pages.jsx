import { Link } from 'react-router-dom'
import { ORDER, SERVICES } from '../data/services.js'
import { HQ } from '../data/site.js'
import { AboutStatement, ServiceCards, SolveRows, Stats } from '../components/home/Blocks.jsx'
import { DemoLab, Process, WhyBento } from '../components/home/Sections.jsx'
import Orb from '../components/Orb.jsx'
import { PageHero, Pill, TalkButton } from '../components/ui.jsx'

const Body = ({ children }) => <div className="relative z-10 overflow-clip rounded-t-[2.5rem] bg-white md:rounded-t-[4rem]">{children}</div>

export function Services() {
  return (
    <>
      <PageHero label="Services" title={['Six services,', 'one senior team.']} text="Software, mobile apps, API integration, websites, AI models and AI agents. Pick one to see a live demo and how it works." color="#A068FF">
        <TalkButton />
      </PageHero>
      <Body>
        <ServiceCards title="Pick a service" />
        <DemoLab />
        <SolveRows />
      </Body>
    </>
  )
}

export function About() {
  return (
    <>
      <PageHero label="About NIMTECH" title={['A senior team that', 'builds what works.']} text={`An independent studio in ${HQ}, building software, apps, websites and AI for businesses around the world.`} color="#2F69FF">
        <TalkButton />
      </PageHero>
      <Body>
        <AboutStatement />
        <Stats />
        <WhyBento />
        <Process />
      </Body>
    </>
  )
}

export function NotFound() {
  return (
    <section className="relative grid min-h-[90svh] place-items-center overflow-hidden px-6 text-center">
      <div className="ph-bg" style={{ '--c': '#FFC5C2' }} />
      <div className="relative">
        <div className="mx-auto flex w-fit items-center gap-3">
          <Orb color="#2F69FF" className="h-24 w-24 md:h-36 md:w-36" />
          <Orb color="#FFC5C2" glass className="h-16 w-16 md:h-24 md:w-24" />
          <Orb color="#E1FC03" className="h-20 w-20 md:h-28 md:w-28" />
        </div>
        <p className="mono-label mt-10">[ 404 — Lost in orbit ]</p>
        <h1 className="h-hero mt-4">This page drifted away.</h1>
        <p className="mx-auto mt-5 max-w-[40ch] text-neutral-600">The link may be old. Try the home page or one of our services.</p>
        <div className="mt-8 flex justify-center">
          <Pill variant="dark" arrow="right" to="/">
            Back to home
          </Pill>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {ORDER.map((id) => (
            <li key={id}>
              <Link to={`/services/${id}`} className="glass-chip hover:bg-white">
                {SERVICES[id].short}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
