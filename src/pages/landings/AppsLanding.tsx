import { ServicePage } from '../Service.jsx'
import AppGallery from '../../components/AppGallery.jsx'
import { Section, SectionHead } from '../../components/blocks.jsx'

export default function AppsLanding() {
  return (
    <ServicePage
      id="apps"
      extra={
        <Section tight id="examples">
          <SectionHead eyebrow="Showcase" title="Apps for every <em>kind of business.</em>" lede="Six example apps, coded as live interfaces: ordering, fitness, fintech, field work, healthcare and smart home. Hover a phone to tilt it." />
          <AppGallery />
        </Section>
      }
    />
  )
}
