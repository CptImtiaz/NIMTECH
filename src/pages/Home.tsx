import HeroX from '../components/home/HeroX.jsx'
import ServiceReel from '../components/home/ServiceReel.jsx'
import Showcase from '../components/home/Showcase.jsx'
import { AgentSpot, DemoLab, Process, WhyBento } from '../components/home/Sections.jsx'
import { CtaBand, Faq } from '../components/ui.jsx'
import { HOME_FAQ } from '../data/site.js'

export default function Home() {
  return (
    <>
      <HeroX />
      <ServiceReel />
      <Showcase />
      <DemoLab />
      <AgentSpot />
      <Process />
      <WhyBento />
      <Faq items={HOME_FAQ} />
      <CtaBand />
    </>
  )
}
