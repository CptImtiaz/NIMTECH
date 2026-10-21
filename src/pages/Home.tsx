import VideoHero from '../components/home/VideoHero.jsx'
import ServicesGrid from '../components/home/ServicesGrid.jsx'
import Mosaic from '../components/home/Mosaic.jsx'
import DeliverTabs from '../components/home/DeliverTabs.jsx'
import ProjectsShowcase from '../components/home/ProjectsShowcase.jsx'
import CoreFeatures from '../components/home/CoreFeatures.jsx'
import AgentOrbit from '../components/home/AgentOrbit.jsx'
import { CtaBand, Faq } from '../components/ui.jsx'
import { HOME_FAQ } from '../data/site.js'

export default function Home() {
  return (
    <>
      <VideoHero />
      <ServicesGrid />
      <ProjectsShowcase />
      <Mosaic />
      <DeliverTabs />
      <AgentOrbit />
      <CoreFeatures />
      <Faq items={HOME_FAQ} />
      <CtaBand />
    </>
  )
}
