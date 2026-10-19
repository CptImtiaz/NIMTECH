import Hero from './Hero'

// Every page uses the shared 3D Hero. `vis` names a 3D scene variant;
// pages without their own scene get the particle galaxy.
const SCENE = { agents: 'agents', vision: 'vision', software: 'software', apps: 'apps', api: 'api', content: 'content', orbit: 'orbit' }

/** @param {Record<string, any>} props */
export function PageHero({ vis = 'orbit', badge, h1, lede, primary, secondary, stats }) {
  return <Hero scene={SCENE[vis] || 'orbit'} badge={badge} h1={h1} lede={lede} primary={primary} secondary={secondary} stats={stats} />
}
