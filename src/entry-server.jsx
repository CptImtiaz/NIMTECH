import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Root from './Root.jsx'

export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <Root />
      </StaticRouter>
    </React.StrictMode>,
  )
}

export { ROUTES, headTags, SITE_URL, UPDATED, pageMeta } from './data/seo.js'
export { ORDER, SERVICES } from './data/services.js'
export { EMAIL, HQ, WHATSAPP } from './data/site.js'
export { INSIGHTS } from './data/insights.js'
