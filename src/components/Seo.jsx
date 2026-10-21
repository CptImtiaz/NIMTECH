import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pageMeta, schema, SITE_URL } from '../data/seo.js'

// Keeps the <head> in step with client-side navigation. The first load
// already has these tags from the prerendered HTML.
export default function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const m = pageMeta(pathname)
    const url = `${SITE_URL}${m.path === '/' ? '/' : m.path}`
    document.title = m.title
    const set = (sel, attr, val) => {
      let el = document.head.querySelector(sel)
      if (!el) {
        const [, tag, k, v] = sel.match(/^(\w+)\[(\w+)="([^"]+)"\]$/)
        el = document.createElement(tag)
        el.setAttribute(k, v)
        document.head.appendChild(el)
      }
      el.setAttribute(attr, val)
    }
    set('meta[name="description"]', 'content', m.description)
    set('meta[property="og:title"]', 'content', m.title)
    set('meta[property="og:description"]', 'content', m.description)
    set('meta[property="og:url"]', 'content', url)
    set('meta[name="twitter:title"]', 'content', m.title)
    set('meta[name="twitter:description"]', 'content', m.description)
    set('link[rel="canonical"]', 'href', url)
    set('meta[name="robots"]', 'content', m.noindex ? 'noindex' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    set('script[type="application/ld+json"]', 'type', 'application/ld+json')
    document.head.querySelector('script[type="application/ld+json"]').textContent = m.noindex ? '{}' : JSON.stringify(schema(m.path))
  }, [pathname])
  return null
}
