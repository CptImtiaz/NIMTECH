// A glossy 3D-looking sphere drawn in CSS (no image). `glass` makes it
// translucent with a bright rim.
export default function Orb({ color = '#2F69FF', glass = false, className = '', style }) {
  return <span className={`orb ${glass ? 'orb-glass' : ''} ${className}`} style={{ '--c': color, ...style }} aria-hidden="true" />
}
