import { ServicePage } from '../Service.jsx'
import VisionDemos from '../../components/VisionDemos.jsx'
import { Section, SectionHead } from '../../components/blocks.jsx'

export default function VisionLanding() {
  return (
    <ServicePage
      id="computer-vision"
      extra={
        <Section tight id="examples">
          <SectionHead eyebrow="Showcase" title="What vision models <em>can see.</em>" lede="Six examples of the kinds of models we build, from the factory floor to the farm. Each one is an illustrative, animated recreation of a real‑world task." />
          <VisionDemos />
        </Section>
      }
    />
  )
}
