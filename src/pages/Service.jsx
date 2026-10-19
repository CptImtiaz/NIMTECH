import { Navigate, useParams } from 'react-router-dom'
import { SERVICES } from '../data/content.js'
import Hero from '../components/Hero'
import ServiceBody from '../components/ServiceBody.jsx'

const CORE = { agents: 'ai', vision: 'vision', software: 'software', apps: 'apps', api: 'api', content: 'content' }

// Shared service page: 3D hero for the practice, optional hero extras
// (`heroExtra`), an optional section right after the hero (`afterHero`),
// an optional showcase after the capabilities (`extra`),
// then the standard service sections.
/** @param {Record<string, any>} props */
export function ServicePage({ id, heroExtra = null, afterHero = null, extra = null, lede, ctas = true }) {
  const s = SERVICES[id]
  return (
    <>
      <Hero core={CORE[s.vis]} badge={s.badge} h1={s.h1} lede={lede === undefined ? s.lede : lede} primary={ctas ? ['Start a Project', `/contact?service=${id}`] : undefined} secondary={!ctas ? undefined : extra ? ['See examples', '#examples'] : ['See how it works', '#show']} stats={s.stats}>
        {heroExtra}
      </Hero>
      {afterHero}
      <ServiceBody id={id} extra={extra} />
    </>
  )
}

export default function Service() {
  const { id } = useParams()
  if (!SERVICES[id]) return <Navigate to="/services" replace />
  return <ServicePage id={id} />
}
