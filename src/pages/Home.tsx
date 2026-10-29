import GravityStory from '../components/home/Gravity.jsx'
import { AboutStatement, ServiceCards, SolveRows, Stats } from '../components/home/Blocks.jsx'
import { DemoLab, WhyBento } from '../components/home/Sections.jsx'
import { Faq } from '../components/ui.jsx'
import { HOME_FAQ } from '../data/site.js'

export default function Home() {
  return (
    <>
      <GravityStory />
      {/* data-g-cover: the 3D field hides while this panel fills the screen */}
      <div data-g-cover className="relative z-10 overflow-clip rounded-t-[2.5rem] bg-white md:rounded-t-[4rem]">
        <AboutStatement />
        <ServiceCards />
        <DemoLab />
        <SolveRows />
        <Stats />
        <WhyBento />
        <Faq items={HOME_FAQ} />
      </div>
    </>
  )
}
