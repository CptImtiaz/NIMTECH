// Page titles, descriptions and structured data. Used by the client <Seo>
// head updater and by scripts/prerender.mjs, which writes them into the
// static HTML of every route.
import { ORDER, SERVICES } from './content.js'
import { INSIGHTS } from './insights.js'
import { EMAIL, HOME_FAQ, HQ } from './site.js'

// Production origin. Set VITE_SITE_URL at build time when the domain changes.
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://www.nimtech.com').replace(/\/$/, '')
export const SITE_NAME = 'NIMTECH'
export const OG_IMAGE = '/og.jpg'
// First published and last updated dates, shown to search engines
export const PUBLISHED = '2026-10-20'
export const UPDATED = '2026-10-20'

const strip = (t) => String(t).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()

const PAGES = {
  '/': {
    title: 'NIMTECH | AI, Computer Vision & Software Engineering Firm',
    description: 'NIMTECH is a global engineering firm that designs, builds and runs AI agents, computer vision, custom software, mobile apps, systems integration and AI content, from first prototype to production at scale.',
  },
  '/services': {
    title: 'Services | AI, Computer Vision, Software & Apps | NIMTECH',
    description: 'Six practices under one team: AI agents, computer vision and model training, custom software, mobile and web apps, API and systems integration, and AI content.',
    crumb: 'Services',
  },
  '/industries': {
    title: 'Industries | AI & Software Solutions by Sector | NIMTECH',
    description: 'AI, computer vision and software for retail, logistics, manufacturing, healthcare, finance, property, education and the public sector.',
    crumb: 'Industries',
  },
  '/work': {
    title: 'Work & Case Studies | AI, Vision and App Projects | NIMTECH',
    description: 'Examples of AI agents, vision systems, platforms and apps NIMTECH has designed and shipped, with the problem, the build and the result.',
    crumb: 'Work',
  },
  '/process': {
    title: 'How We Work | Discovery to Support in Five Phases | NIMTECH',
    description: 'Discovery, design, build, launch and support: how NIMTECH runs projects, communicates progress and keeps quality and security high.',
    crumb: 'How we work',
  },
  '/technology': {
    title: 'Technology & Research | Our AI and Software Stack | NIMTECH',
    description: 'The models, frameworks and cloud platforms NIMTECH builds with, and Target Locker, our in-house model for finding and tracking objects across video.',
    crumb: 'Technology',
  },
  '/company': {
    title: 'About NIMTECH | Engineering Studio for AI & Software',
    description: `NIMTECH is a senior engineering team based in ${HQ}, working with companies worldwide on AI, computer vision, software and apps.`,
    crumb: 'Company',
  },
  '/careers': {
    title: 'Careers at NIMTECH | AI, Vision & Software Engineering Jobs',
    description: 'Open roles at NIMTECH for engineers, researchers and designers working on AI agents, computer vision, software and apps.',
    crumb: 'Careers',
  },
  '/contact': {
    title: 'Contact NIMTECH | Start Your AI or Software Project',
    description: 'Tell us about your project. We reply within one business day with questions, a first approach and next steps.',
    crumb: 'Contact',
  },
}

// Service titles kept to 50-60 characters for search results
const SERVICE_TITLES = {
  'ai-agents': 'AI Agent Development | Agents, RAG & Copilots | NIMTECH',
  'computer-vision': 'Computer Vision Development & Model Training | NIMTECH',
  software: 'Custom Software Development | Platforms & Portals | NIMTECH',
  apps: 'App Development | iOS, Android & Cross-Platform | NIMTECH',
  'api-integration': 'API & Systems Integration | Connect Every System | NIMTECH',
  'ai-content': 'AI Content Production | Any Format, Any Channel | NIMTECH',
}

for (const id of ORDER) {
  const s = SERVICES[id]
  PAGES[`/services/${id}`] = {
    title: SERVICE_TITLES[id] || `${s.name} | NIMTECH`,
    description: strip(s.lede),
    crumb: s.name,
    service: id,
  }
}

PAGES['/insights'] = {
  title: 'Insights | Guides on AI Agents, Vision & Integration | NIMTECH',
  description: 'Practical guides and perspectives from NIMTECH engineers on AI agents, computer vision, software and systems integration.',
  crumb: 'Insights',
}
for (const a of INSIGHTS) {
  PAGES[`/insights/${a.slug}`] = {
    title: `${a.seo || a.title} | NIMTECH`,
    description: a.sum,
    crumb: a.title,
    article: a,
  }
}

export const ROUTES = Object.keys(PAGES)

export const NOT_FOUND = {
  title: 'Page not found | NIMTECH',
  description: 'This page does not exist. Find our services, work and contact details on the NIMTECH home page.',
  noindex: true,
}

export function pageMeta(path) {
  const p = path.replace(/\/+$/, '') || '/'
  return PAGES[p] ? { path: p, ...PAGES[p] } : { path: p, ...NOT_FOUND }
}

const ORG_ID = `${SITE_URL}/#organization`

const organization = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.svg`,
  email: EMAIL,
  description: PAGES['/'].description,
  address: { '@type': 'PostalAddress', addressLocality: HQ.split(',')[0], addressCountry: 'MY' },
  areaServed: 'Worldwide',
  knowsAbout: ORDER.map((id) => SERVICES[id].name),
})

const faqPage = (list) => ({
  '@type': 'FAQPage',
  mainEntity: list.map(([q, a]) => ({
    '@type': 'Question',
    name: strip(q),
    acceptedAnswer: { '@type': 'Answer', text: strip(a) },
  })),
})

// JSON-LD graph for a page.
export function schema(path) {
  const m = pageMeta(path)
  const url = `${SITE_URL}${m.path === '/' ? '/' : m.path}`
  const graph = [
    organization(),
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: SITE_NAME, publisher: { '@id': ORG_ID }, inLanguage: 'en' },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: m.title,
      description: m.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': ORG_ID },
      datePublished: PUBLISHED,
      dateModified: UPDATED,
      inLanguage: 'en',
    },
  ]
  if (m.path === '/') graph.push(faqPage(HOME_FAQ))
  if (m.crumb) {
    const items = [['Home', '/']]
    if (m.service) items.push(['Services', '/services'])
    if (m.article) items.push(['Insights', '/insights'])
    items.push([m.crumb, m.path])
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: items.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE_URL}${p}` })),
    })
  }
  if (m.service) {
    const s = SERVICES[m.service]
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: s.name,
      serviceType: s.short,
      description: strip(s.lede),
      provider: { '@id': ORG_ID },
      areaServed: 'Worldwide',
      url,
    })
    if (s.faq?.length) graph.push(faqPage(s.faq))
  }
  if (m.article) {
    const a = m.article
    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: a.title,
      description: a.sum,
      datePublished: a.date,
      dateModified: a.date,
      author: { '@type': 'Organization', name: 'NIMTECH engineering team', url: `${SITE_URL}/company` },
      publisher: { '@id': ORG_ID },
      mainEntityOfPage: url,
      image: `${SITE_URL}${OG_IMAGE}`,
      about: SERVICES[a.s].name,
      inLanguage: 'en',
    })
  }
  if (m.path === '/services') {
    graph.push({
      '@type': 'ItemList',
      itemListElement: ORDER.map((id, i) => ({ '@type': 'ListItem', position: i + 1, name: SERVICES[id].name, url: `${SITE_URL}/services/${id}` })),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// <head> tags for a page, as an HTML string (used by the prerenderer).
export function headTags(path) {
  const m = pageMeta(path)
  const url = `${SITE_URL}${m.path === '/' ? '/' : m.path}`
  const img = `${SITE_URL}${OG_IMAGE}`
  const t = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    m.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    `<meta property="article:published_time" content="${PUBLISHED}" />`,
    `<meta property="article:modified_time" content="${UPDATED}" />`,
  ]
  if (!m.noindex) t.push(`<script type="application/ld+json">${JSON.stringify(schema(m.path)).replace(/</g, '\\u003c')}</script>`)
  return t.join('\n    ')
}
