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
| `/` | Home: liquid-glass hero with crossfading video, about, featured video, Innovation × Vision, service video cards |
| `/services` | All services |
| `/services/ai-agents` | AI Agents landing (liquid-metal pills, bottom-centred hero, stats) |
| `/services/computer-vision` | Computer Vision landing with HUD video hero and six live example demos |
| `/services/software` | Software landing with a fully coded dashboard preview |
| `/services/apps` | Apps landing (HLS video hero) with six coded example apps |
| `/services/api-integration` | Integration (canvas hero) |
| `/services/ai-content` | AI Content landing: A.R.I.A typewriter and mouse-scrubbed video |
| `/industries`, `/work`, `/process`, `/technology`, `/company`, `/careers`, `/contact` | Company pages |

Every service landing continues into the same detailed sections: problem,
capabilities, live showcase, process, use cases, stack, FAQ and CTA.

The site uses clean URLs, so the host must serve `index.html` for every
path. `vercel.json` (Vercel) and `public/_redirects` (Netlify) already do
this.

Background videos stream from CloudFront and Mux (via `hls.js`); the AI
Content page loads Helvetica Now from onlinewebfonts.

## Editing content

- `src/data/content.js`: all service, industry, case study and role copy.
  Accent words are wrapped in `<em>…</em>`.
- `src/data/site.js`: **email, WhatsApp number and HQ. Replace the
  placeholders before launch.**
- Hero stats on the AI Agents page (4.2M+ workflows, 92%, 180+ teams), the
  "GPT‑5 support" badge on Software, and the social links on Home are
  placeholders from the design briefs. Replace them with real figures and
  URLs before launch.

## Motion

- Video heroes: crossfading loop (Home), mouse‑scrubbed video (AI Content),
  HUD overlay with scan line and pointer reticle (Computer Vision, Apps).
- `src/components/VisionDemos.jsx`: six procedurally animated computer
  vision examples (defects, shelves, fruit counting, OCR, PPE, traffic).
- `src/components/AppGallery.jsx`: six example apps coded as live UIs with
  3D tilt.
- `src/lib/visuals.js`: animated canvas heroes for the remaining pages.
- `src/components/Showcases.jsx`: live "console" demos (agent trace, model
  training, architecture layers, app prototype, integration hub, content
  studio, Target Locker tracker).
- `src/components/motion.jsx`: split-text reveals, scroll reveals,
  scroll-linked statements, magnetic buttons and parallax.

Animations pause when off screen and respect the visitor's reduced-motion
setting.
