# NIMTECH

Website for NIMTECH, a global engineering studio for AI agents, computer
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
| `/` | Home: 3D glass-core hero, pinned 3D service coverflow, live lab, stacking process cards, work, industries, FAQ |
| `/services` | All services |
| `/services/:id` | One page per practice, each with its own 3D scene (`ai-agents`, `computer-vision`, `software`, `apps`, `api-integration`, `ai-content`) |
| `/industries`, `/work`, `/process`, `/technology`, `/company`, `/careers`, `/contact` | Company pages |

Every page shares one design system: the same navbar, the same hero layout
(copy in a fixed left column, 3D scene on the right, stats strip at the base;
on phones the scene sits above the copy), one palette and one display font.
Extras per practice: live vision demos, coded example apps, a 3D dashboard
stage (Software) and the A.R.I.A typing agent (AI Content).

Every route is prerendered to static HTML (`dist/<route>/index.html`) and
hydrated in the browser, so search engines and AI crawlers get the full
text without running JavaScript. Unknown paths get `dist/404.html` with a
real 404 status. Service cards on Home stream background videos from
CloudFront.

## Design system

- **Palette** (`tailwind.config.js`): white `night` and `surface`, navy
  text `ink`, indigo `brand` (#4C63F6) with `brand-cyan` (#0E7490) and
  `brand-violet` (#7C5CFA) highlights. Dark `deep` panels (footer, CTA,
  consoles) give contrast. Each hero is tinted by its 3D stage theme
  (`src/three/themes.ts`). All text meets WCAG AA contrast.
- **Type** (self-hosted via Fontsource): Sora for headings, Inter for text,
  JetBrains Mono for labels.

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

## Motion

- `src/three/Stage.ts`: the 3D hero stage, ported from the Tegar Labs hero.
  A glossy centrepiece per service (AI icosahedron, vision lens, software
  slabs, phone, API knot, content prism, sci‑fi helmet) turns toward the
  cursor; floating shapes flee the pointer and morph when the service
  changes. three.js loads on demand once the browser is idle; phones and
  low-power devices get a lighter renderer, and browsers without a GPU
  (software WebGL) get a static orb instead. Add `?3d` to a URL to force
  the scene.
- `src/components/Hero.tsx`: the shared hero. The 3D core is centred on a
  layout anchor, so CSS decides exactly where it sits on every screen.
  The home hero adds a service carousel that switches the stage.
- `src/components/motion.jsx`: 3D scroll reveals, split-text headlines,
  pointer-tilt cards with glare, scroll-lit statements, magnetic buttons.
- `src/components/Ambient.jsx`: aurora and 3D grid floor behind every page,
  plus the custom cursor.
- Showcases: `VisionDemos.jsx`, `AppGallery.jsx`, `Showcases.jsx`.

Everything respects the visitor's reduced-motion setting.

## Credits

`public/models/scifi-helmet.glb`: "Sci Fi Helmet" by Michael Pavlovic,
CC0 1.0 (public domain), from the Khronos glTF Sample Assets. See
`public/models/CREDITS.txt`.
