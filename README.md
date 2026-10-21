# NIMTECH

Website for NIMTECH, a senior team that designs, builds and runs AI
agents, computer vision, software, mobile apps, integrations and AI
content for growing businesses. Built with React, Vite, Tailwind CSS,
Framer Motion, hls.js and Lenis.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run typecheck # TypeScript check (.tsx pages; JS files are allowed)
npm run build     # client build, SSR build, then prerender every route into dist/
npm run preview   # serve the production build
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Video hero ("Build Faster"), six services, real projects, the AI automation mosaic, delivery tabs, AI agents orbit, why NIMTECH, FAQ |
| `/services` | All services and how we deliver |
| `/services/:id` | Service page: dark hero with the service's 3D render, what you get, related projects, four steps, FAQ (`computer-vision`, `software`, `api-integration`, `ai-content`) |
| `/services/ai-agents` | The agent cast in orbit, the manifesto, "Chat anywhere", then the service detail |
| `/services/apps` | Daylight hero around the concept app "Nestling", night falls for the home-screen story, then the service detail |
| `/work` | All projects with pictures, filterable by service |
| `/about` | Story, values and how we deliver |
| `/insights`, `/insights/:slug` | Insights index and articles (`src/data/insights.js`) |
| `/contact` | Enquiry form (opens WhatsApp or email) and contact details |

## Design

- **Header** (`src/components/Header.jsx`): morphing dropdown with three
  panels (services, work, company) and a mobile sheet.
- **Footer** (`src/components/Footer.jsx`): blue-hour meadow video with a
  frosted NIMTECH wordmark.
- **Home sections** (`src/components/home/`): `VideoHero` (Mux HLS
  stream), `ServicesGrid`, `ProjectsShowcase`, `Mosaic` (five-card
  automation mosaic, plays its entrance once), `DeliverTabs` (stages cycle
  every 4 seconds over a video), `AgentOrbit` (typed headline, orbiting
  agents, count-up), `CoreFeatures`.
- **Shared pieces** (`src/components/ui.jsx`): `PageHero`, `StartButton`,
  `Faq`, `CtaBand`.
- **Styles** (`src/styles/`): `site.css` (tokens, header, footer, shared),
  `home.css` (home sections, project art), `agents.css`, `apps.css`.
- **Type** (self-hosted via Fontsource): Instrument Sans and Instrument
  Serif for headlines, Inter for text, Plus Jakarta Sans (mosaic),
  Urbanist (agents orbit), Figtree (Apps page), Geist (header).
- **Agent cast** (`src/components/Puppet.jsx`): 16 claymation-style
  puppet agents drawn in SVG.
- Elements with the `rise` class fade up as they scroll into view
  (`--d` sets a delay). Everything respects reduced motion.

## Editing content

- `src/data/services.js`: the six services (tagline, description, what you
  get, steps, FAQ).
- `src/data/projects.js`: projects shown on Home, Work and service pages.
  Pictures live in `public/projects/`; projects without a screenshot use an
  illustrated cover from `src/components/ProjectMedia.jsx`.
- `src/data/site.js`: email (nimtech.itsolution@gmail.com), WhatsApp
  number, HQ and the home FAQ. **Replace the WhatsApp placeholder before
  launch.**

## SEO and AI search

- `src/data/seo.js`: title, description and structured data (Organization,
  WebSite, WebPage, Service, FAQPage, BreadcrumbList) for every route.
  **Set the real domain with `VITE_SITE_URL` at build time** (default
  `https://www.nimtech.com`), and bump `UPDATED` when content changes.
- `scripts/prerender.mjs` writes each route's HTML plus `sitemap.xml`,
  `robots.txt` and `llms.txt`. Unknown paths get `dist/404.html`.
- `src/components/Seo.jsx` keeps the head in step during client navigation.

## Security and hosting

- `vercel.json` (Vercel) and `public/_headers` (Netlify, Cloudflare Pages)
  set a Content Security Policy and the usual security headers. The CSP
  allows the video and image hosts the site uses (Mux, CloudFront,
  Unsplash, r2.dev); add any new host there.
- No secrets live in the repo; the contact form opens the visitor's own
  email or WhatsApp, so there is no backend.
