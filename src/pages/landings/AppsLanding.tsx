import { SERVICES } from '../../data/content.js'
import ServiceBody from '../../components/ServiceBody.jsx'
import VideoHero from '../../components/VideoHero'
import AppGallery from '../../components/AppGallery.jsx'
import { Section, SectionHead } from '../../components/blocks.jsx'

const STREAM = 'https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8'

export default function AppsLanding() {
  const s = SERVICES.apps
  return (
    <>
      <VideoHero
        src={STREAM}
        badge={s.badge}
        h1={s.h1}
        lede={s.lede}
        primary={['Start a Project', '/contact?service=apps']}
        secondary={['See example apps', '#examples']}
        stats={s.stats}
        readouts={['BUILD 2.14.0', 'CRASH‑FREE 99.9%', 'iOS · ANDROID']}
      />
      <ServiceBody
        id="apps"
        extra={
          <Section tight id="examples">
            <SectionHead eyebrow="Showcase" title="Apps for every <em>kind of business.</em>" lede="Six example apps, coded as live interfaces: ordering, fitness, fintech, field work, healthcare and smart home. Hover a phone to tilt it." />
            <AppGallery />
          </Section>
        }
      />
    </>
  )
}
