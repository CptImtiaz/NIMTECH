// Responsive photo. `src` is a sizer from data/images.js (w => url) or a
// plain path. If the photo can't load, the gradient behind it shows.
export default function Photo({ src, alt = '', className = '', sizes = '100vw', eager = false }) {
  const sized = typeof src === 'function'
  return (
    <img
      src={sized ? src(1400) : src}
      srcSet={sized ? `${src(640)} 640w, ${src(1000)} 1000w, ${src(1400)} 1400w, ${src(2000)} 2000w` : undefined}
      sizes={sized ? sizes : undefined}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={eager ? 'high' : undefined}
      onError={(e) => (e.currentTarget.style.opacity = '0')}
      className={className}
    />
  )
}
