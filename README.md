# NIMTECH

Website for NIMTECH, a global engineering firm for AI agents, computer
vision, software, apps, systems integration and AI content. Built with
React, Vite, Tailwind CSS, Framer Motion, three.js and Lenis.

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
| `/` | Home: 3D globe hero with a scene switcher, technology strip, capability tabs, facts, industries, client work, live lab, engagement models, delivery path, insights, FAQ |
| `/services` | All services |
| `/services/:id` | One page per practice, each with its own 3D scene (`ai-agents`, `computer-vision`, `software`, `apps`, `api-integration`, `ai-content`) |
| `/insights`, `/insights/:slug` | Insights index and articles (`src/data/insights.js`) |
| `/industries`, `/work`, `/process`, `/technology`, `/company`, `/careers`, `/contact` | Company pages |

Every page shares one design system, modelled on large engineering firms:
a full-width navbar with a services mega menu, a hero with copy on the left
and a 3D scene on the right (above the copy on phones), hairline grids,
crisp cards and a dark multi-column footer. Extras per practice: live
vision demos, coded example apps, a 3D dashboard stage (Software) and the
A.R.I.A typing agent (AI Content).

Every route is prerendered to static HTML (`dist/<route>/index.html`) and
hydrated in the browser, so search engines and AI crawlers get the full
text without running JavaScript. Unknown paths get `dist/404.html` with a
real 404 status. Service cards on Home stream background videos from
CloudFront.

## Design system

- **Palette** (`tailwind.config.js`): white `night` and `surface`, deep
  navy `ink` and `deep`, electric blue `brand` (#2A4BFF) with teal
  (`brand-cyan`, #0B7A75 for text) and violet accents. Dark `deep` bands
  for facts, CTA, consoles and the footer. All text meets WCAG AA contrast.
- **Type** (self-hosted via Fontsource): Geist for headings and text,
  Geist Mono for labels and data.

## SEO and AI search

- `src/data/seo.js`: title, description and structured data (Organization,
  WebSite, WebPage, Service, FAQPage, BreadcrumbList) for every route.
  **Set the real domain with `VITE_SITE_URL` at build time** (default
  `https://www.nimtech.com`), and bump `UPDATED` when content changes.
- `scripts/prerender.mjs` writes the route HTML plus `sitemap.xml`,
  `robots.txt` (search and AI crawlers allowed) and `llms.txt` (a Markdown
  summary for AI agents).
- `src/components/Seo.jsx` keeps the head in step during client navigation.
- `public/og.jpg` is the social share image (1200×630).

## Security and hosting

- `vercel.json` (Vercel) and `public/_headers` (Netlify, Cloudflare Pages)
  set a Content Security Policy, HSTS, `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` and long
  caching for hashed assets. If you add a third-party script, analytics or
  video host, add its domain to the CSP.
- No secrets live in the repo; the contact form opens the visitor's own
  email or WhatsApp, so there is no backend to attack.

## Editing content

- `src/data/content.js`: all service, industry, case study and role copy.
  Accent words are wrapped in `<em>…</em>`.
- `src/data/site.js`: **email, WhatsApp number and HQ. Replace the
  placeholders before launch.**
- Case studies on the Work page are illustrative; replace them as real
  projects go live.

## 3D scenes

`src/three/Stage.ts` renders one scene per practice on a single WebGL
canvas, centred on a layout "anchor" so CSS decides where it sits. Scenes
lean toward the pointer and react to it; switching animates one out and
the next in.

| Scene | File | Used on |
| --- | --- | --- |
| Delivery globe: dotted continents, arcs from Kuala Lumpur, orbiting satellites | `scenes/globe.ts` | Home, Company, Industries, Contact |
| Agent network: reasoning graph, signals, tool nodes; nodes light near the pointer | `scenes/network.ts` | AI Agents, Technology, Careers |
| Point-cloud scan with 3D detection boxes | `scenes/scan.ts` | Computer Vision |
| Architecture stack that parts with the pointer | `scenes/stack.ts` | Software, Work, Process |
| Phone, tablet and floating UI cards | `scenes/devices.ts` | Apps |
| API gateway hub with systems and two-way traffic | `scenes/hub.ts` | Integration, Services |
| Particle wave with media cards; the pointer sends ripples | `scenes/wave.ts` | AI Content |

three.js loads after first paint, once the browser is idle. Phones and
low-power devices get a lighter renderer. Browsers without a GPU
(software WebGL) get a static poster of the same scene
(`public/posters/*.webp`) instead. Add `?3d` to a URL to force the live
scene. The globe's land dots come from Natural Earth (public domain),
pre-baked into `src/three/land.ts`.

Elsewhere: `src/components/motion.jsx` (scroll reveals, split-text
headlines, tilt cards) and the showcases in `VisionDemos.jsx`,
`AppGallery.jsx` and `Showcases.jsx`. Everything respects the visitor's
reduced-motion setting.

## Credits

Globe land outlines: Natural Earth 1:110m land, public domain.
