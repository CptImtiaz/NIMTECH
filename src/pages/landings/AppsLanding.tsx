import { useCallback, useRef } from 'react'
import AppGallery from '../../components/AppGallery.jsx'
import ServiceBody from '../../components/ServiceBody.jsx'
import { Section, SectionHead } from '../../components/blocks.jsx'
import { DayHero, HomeScreenNight, NightBackdrop } from '../../components/apps/Gaia.jsx'

// Apps: a calm daylight hero built around a concept app, night falling for
// the home-screen story, then the gallery and the service detail.
export default function AppsLanding() {
  const night = useRef<HTMLDivElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const onNight = useCallback((n: number) => {
    if (night.current) night.current.style.opacity = String(n)
    root.current?.style.setProperty('--night', String(n))
  }, [])
  return (
    <div ref={root} className="gaia relative">
      <NightBackdrop ref={night} />
      <DayHero />
      <HomeScreenNight onNight={onNight} />
      <ServiceBody
        id="apps"
        extra={
          <Section tight id="examples">
            <SectionHead eyebrow="Showcase" title="Apps for every <em>kind of business.</em>" lede="Six example apps, coded as live interfaces: ordering, fitness, fintech, field work, healthcare and smart home. Hover a phone to tilt it." />
            <AppGallery />
          </Section>
        }
      />
    </div>
  )
}
