import { useCallback, useRef } from 'react'
import { ServiceDetail } from '../Service.jsx'
import { DayHero, HomeScreenNight, NightBackdrop } from '../../components/apps/Gaia.jsx'

// Apps: a calm daylight hero built around a concept app, night falling for
// the home-screen story, then the service detail.
export default function AppsLanding() {
  const night = useRef<HTMLDivElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const onNight = useCallback((n: number) => {
    if (night.current) night.current.style.opacity = String(n)
    root.current?.style.setProperty('--night', String(n))
  }, [])
  return (
    <>
      <div ref={root} className="gaia relative">
        <NightBackdrop ref={night} />
        <DayHero />
        <HomeScreenNight onNight={onNight} />
      </div>
      <ServiceDetail id="apps" />
    </>
  )
}
