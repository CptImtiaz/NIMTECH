# NIMTECH

Website for NIMTECH, a global engineering studio for AI agents, computer
vision, software, apps, systems integration and AI content. Built with
React, Vite, Tailwind CSS, Framer Motion and Lenis.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run typecheck # TypeScript check (.tsx pages; JS files are allowed)
npm run build     # production build into dist/
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

The site uses clean URLs, so the host must serve `index.html` for every
path. `vercel.json` (Vercel) and `public/_redirects` (Netlify) already do
this. Service cards on Home stream background videos from CloudFront.

## Design system

- **Palette** (`tailwind.config.js`): near-black `night` / `surface`, text
  `ink`, one accent family `brand` (#2F7BFF) → `brand-light` (#5FB0FF) →
  `brand-cyan` (#5CE1FF). Green and red appear only as pass/fail signals.
- **Type**: Space Grotesk for every heading, Inter for body text.

## Editing content

- `src/data/content.js`: all service, industry, case study and role copy.
  Accent words are wrapped in `<em>…</em>`.
- `src/data/site.js`: **email, WhatsApp number and HQ. Replace the
  placeholders before launch.**
- Case studies on the Work page are illustrative; replace them as real
  projects go live.

## Motion

- `src/three/Scene.tsx`: lazy-loaded react-three-fiber scenes (glass core,
  neural network, vision lens, data blocks, phones, data streams, content
  helix, particle galaxy) with mouse and scroll parallax. They pause when off
  screen and fall back to a CSS orb without WebGL.
- `src/components/Hero.tsx`: the shared hero used by every page.
- `src/components/motion.jsx`: 3D scroll reveals, split-text headlines,
  pointer-tilt cards with glare, scroll-lit statements, magnetic buttons.
- `src/components/Ambient.jsx`: aurora and 3D grid floor behind every page,
  plus the custom cursor.
- `src/components/Layout.jsx`: smooth scrolling, scroll progress bar and the
  curtain + 3D page transition.
- Showcases: `VisionDemos.jsx`, `AppGallery.jsx`, `Showcases.jsx`.

Everything respects the visitor's reduced-motion setting.
