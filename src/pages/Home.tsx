import GravityStory from '../components/home/Gravity.jsx'
import { AboutStatement, CreateBand, ServiceCards, SolveRows, Stats } from '../components/home/Blocks.jsx'
import { DemoLab, WhyBento } from '../components/home/Sections.jsx'
import { CtaBand, Faq } from '../components/ui.jsx'
import { HOME_FAQ } from '../data/site.js'

export default function Home() {
  return (
    <>
      <GravityStory />
      <div className="relative z-10 overflow-clip rounded-t-[2.5rem] bg-white md:rounded-t-[4rem]">
        <AboutStatement />
        <CreateBand />
        <ServiceCards />
        <DemoLab />
        <SolveRows />
        <Stats />
        <WhyBento />
        <Faq items={HOME_FAQ} />
        <CtaBand />
      </div>
    </>
  )
}
