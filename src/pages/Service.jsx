import { Navigate, useParams } from 'react-router-dom'
import { SERVICES } from '../data/content.js'
import { PageHero } from '../components/Heroes.jsx'
import ServiceBody from '../components/ServiceBody.jsx'

// Generic service page: canvas hero plus the shared service sections.
export default function Service() {
  const { id } = useParams()
  const s = SERVICES[id]
  if (!s) return <Navigate to="/services" replace />
  return (
    <>
      <PageHero vis={s.vis} tall badge={s.badge} h1={s.h1} lede={s.lede} primary={['Start a Project', `/contact?service=${id}`]} secondary={['See how it works', '#show']} stats={s.stats} />
      <ServiceBody id={id} />
    </>
  )
}
