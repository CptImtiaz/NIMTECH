# NIMTECH

Website for NIMTECH, a senior team that builds software, mobile apps,
websites, API integrations, AI models and AI agents for growing
businesses. Built with React, Vite, Tailwind CSS,
Framer Motion, three.js and Lenis.

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
| `/` | 3D gravity story (float, drop, heart, fly-off, driven by scroll), studio statement, We/Build/Better band, six service cards, live demos, problems we fix, stats, why us, FAQ |
| `/services` | Service cards, live demos, problems we fix |
| `/services/:id` | 3D hero in the service colour, live demo, what you get, four steps, FAQ |
| `/services/ai-agents` | Agent cast in orbit, manifesto, chat anywhere, WhatsApp demo, service detail |
| `/about` | Studio statement, stats, why us, process |
| `/insights`, `/insights/:slug` | Articles (`src/data/insights.js`) |
| `/contact` | Enquiry form (opens WhatsApp or email) |

## Design

White-slate studio with ink cards and a cobalt accent. Raleway headlines,
Inter text, JetBrains Mono labels, Space Grotesk wordmark.

- **3D gravity field** (`src/three/gravity.js`, wrapped by
  `src/components/GravityField.jsx`): glass and matte spheres in a
  real-time physics sim (three.js, loaded after first paint). The cursor
  pushes them; a fast flick throws them. On Home it fills the screen and
  scroll drives it (float, drop and bounce, heart, fly into the lens) while
  the palette morphs blue, lime, pink. Inner pages use a smaller field in
  the service colour. Reduced motion or no WebGL shows still CSS spheres.
- **Intro loader** (`Loader.jsx`): counts 000 to 100, slides up, then the
  header and hero animate in (`src/lib/intro.js`). It plays once per
  browser session (`public/intro-gate.js`).
- **Phones**: inner-page heroes show still CSS spheres; the live 3D field
  runs on the home page and on desktop.
- **Header** with live local clock, services dropdown, Menu button and
  "Contact us"; **Menu** full-screen overlay; **Request modal** that
  prepares the enquiry for WhatsApp or email (`Overlays.jsx`). Any button
  can open it with `openRequest(serviceId)` from `src/lib/bus.js`.
- **CSS spheres** (`Orb.jsx`, `SphereArt` in `home/Blocks.jsx`) illustrate
  each service without photos.
- **Live demos** (`demos.jsx`; the software one is `Dashboard.jsx`, a live
  command centre with modules, KPIs, an interactive chart, a breakdown
  ring, an activity feed and records): admin dashboard, customer and partner app,
  websites, object tracking and skin analysis, integration flow, WhatsApp
  auto-reply. Sample data only.
- Reveals: `.rise` (fade, rise, unblur), `Lines` (line by line) and `Words`
  (word by word) in `ui.jsx`. Smooth scroll by Lenis.

## Editing content

- `src/data/services.js`: the six services (tagline, description, 3D colour,
  what you get, steps, FAQ).
- Website screenshots used in the website demo live in `public/projects/`.
- `src/data/site.js`: email (nimtech.itsolution@gmail.com), WhatsApp
  (+60 19-994 4917), HQ and the home FAQ.

## SEO and AI search

- `src/data/seo.js`: title, description and structured data (Organization,
  WebSite, WebPage, Service, FAQPage, BreadcrumbList) for every route.
  **Set the real domain with `VITE_SITE_URL` at build time** (default
  `https://nimtechit.vercel.app`), and bump `UPDATED` when content changes.
- `scripts/prerender.mjs` writes each route's HTML plus `sitemap.xml`,
  `robots.txt` and `llms.txt`. Unknown paths get `dist/404.html`.
- `src/components/Seo.jsx` keeps the head in step during client navigation.

## Security and hosting

- `vercel.json` (Vercel) and `public/_headers` (Netlify, Cloudflare Pages)
  set a Content Security Policy and the usual security headers. The CSP
  allows the video and image hosts the site uses ; add any new host there.
- No secrets live in the repo; the contact form opens the visitor's own
  email or WhatsApp, so there is no backend.
