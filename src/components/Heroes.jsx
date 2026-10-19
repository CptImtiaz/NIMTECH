import Hero from './Hero'

// Every page uses the shared 3D stage hero. `vis` names a service core;
// company-type pages show the sci-fi helmet, the rest the brand knot.
const CORE = { agents: 'ai', vision: 'vision', software: 'software', apps: 'apps', api: 'api', content: 'content', helmet: 'helmet', orbit: 'brand' }

/** @param {Record<string, any>} props */
export function PageHero({ vis = 'orbit', badge, h1, lede, primary, secondary, stats }) {
  return <Hero core={CORE[vis] || 'brand'} badge={badge} h1={h1} lede={lede} primary={primary} secondary={secondary} stats={stats} />
}
