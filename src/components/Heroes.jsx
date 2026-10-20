import Hero from './Hero'

// Every page uses the shared 3D hero. `vis` picks the scene: a service
// scene, or the delivery globe for company pages.
const CORE = { agents: 'ai', vision: 'vision', software: 'software', apps: 'apps', api: 'api', content: 'content', globe: 'globe' }

/** @param {Record<string, any>} props */
export function PageHero({ vis = 'globe', badge, h1, lede, primary, secondary, stats }) {
  return <Hero core={CORE[vis] || 'globe'} badge={badge} h1={h1} lede={lede} primary={primary} secondary={secondary} stats={stats} />
}
