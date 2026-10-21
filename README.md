# NIMTECH

Website for NIMTECH, a senior team that builds software, mobile apps,
websites, API integrations, AI models and AI agents for growing
businesses. Built with React, Vite, Tailwind CSS,
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
| `/` | Hero (video, aurora, moving grid, floating cards), services reel, pinned project gallery, live demos, WhatsApp agent demo, process, why us, FAQ |
| `/services` | All services and the live demos |
| `/services/:id` | Photo hero, live demo, what you get, projects, four steps, FAQ (`software`, `apps`, `api-integration`, `websites`, `ai-models`) |
| `/services/ai-agents` | The agent cast in orbit, manifesto, chat anywhere, WhatsApp demo, then the service detail |
| `/about` | Story, why us, process |
| `/insights`, `/insights/:slug` | Insights index and articles (`src/data/insights.js`) |
| `/contact` | Enquiry form (opens WhatsApp or email) and contact details |

## Design

A dark, futuristic system: gradient-shimmer headlines, glass cards with a
glow that follows the pointer (`.spot`), photo heroes with a slow zoom,
and elements that fade up as they scroll in (`.rise`). Everything respects
reduced motion.

- **Header** (`src/components/Header.jsx`): morphing dropdown (services,
  solutions, company) and a mobile sheet.
- **Footer** (`src/components/Footer.jsx`): meadow video with a frosted
  wordmark.
- **Home** (`src/components/home/`): `HeroX`, `ServiceReel`, `Showcase`,
  and `Sections.jsx` (`DemoLab`, `AgentSpot`, `Process`, `WhyBento`).
- **Live demos** (`src/components/demos.jsx`): management dashboard, RoRo
  bin customer and driver apps, website browser, object tracking and skin
  analysis, integration flow, WhatsApp auto-reply. Sample data only.
- **Shared pieces** (`src/components/ui.jsx`): `PageHero`, `StartButton`,
  `Faq`, `CtaBand`. `Photo.jsx` renders responsive photos.
- **Styles**: `src/styles/site.css` (tokens, header, footer, forms) and
  `src/styles/home.css` (everything else).

## Editing content

- `src/data/services.js`: the six services (tagline, description, photo,
  what you get, steps, FAQ).
- `src/data/projects.js`: project showcases, described by type (no client
  names). Screenshots of our builds live in `public/projects/`.
- `src/data/images.js`: photos, loaded from the Unsplash CDN. Swap any ID
  for your own photo or a different Unsplash image.
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
  Unsplash); add any new host there.
- No secrets live in the repo; the contact form opens the visitor's own
  email or WhatsApp, so there is no backend.
