import { SERVICES } from '../../data/content.js'
import ServiceBody from '../../components/ServiceBody.jsx'
import VideoHero from '../../components/VideoHero'
import VisionDemos from '../../components/VisionDemos.jsx'
import { Section, SectionHead } from '../../components/blocks.jsx'

const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_034306_229eccbe-fd8f-40fb-8002-9868ef2bb1a8.mp4'

export default function VisionLanding() {
  const s = SERVICES['computer-vision']
  return (
    <>
      <VideoHero
        src={VIDEO}
        badge={s.badge}
        h1={s.h1}
        lede={s.lede}
        primary={['Start a Project', '/contact?service=computer-vision']}
        secondary={['See examples', '#examples']}
        stats={s.stats}
        readouts={['MODEL · DETECTOR v14', 'INFERENCE 11 ms', 'OBJECTS {n}', 'mAP 0.71']}
      />
      <ServiceBody
        id="computer-vision"
        extra={
          <Section tight id="examples">
            <SectionHead eyebrow="Showcase" title="What vision models <em>can see.</em>" lede="Six examples of the kinds of models we build, from the factory floor to the farm. Each one is an illustrative, animated recreation of a real‑world task." />
            <VisionDemos />
          </Section>
        }
      />
    </>
  )
}
