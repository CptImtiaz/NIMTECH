# NIMTECH

Website for NIMTECH, a global engineering studio for AI agents, computer
vision, software, apps, systems integration and B2B AI content. Built with
React, Vite, Tailwind CSS, Framer Motion and Lenis.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # serve the production build
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/services` | All services |
| `/services/:id` | One page per practice: `ai-agents`, `computer-vision`, `software`, `apps`, `api-integration`, `ai-content` |
| `/industries` | Industries |
| `/work` | Illustrative case studies with service filter |
| `/process` | How we work |
| `/technology` | Stack and the Target Locker research model |
| `/company` | About |
| `/careers` | Open roles and hiring process |
| `/contact` | Enquiry form that prepares a WhatsApp or email message |

The site uses clean URLs, so the host must serve `index.html` for every
path. `vercel.json` (Vercel) and `public/_redirects` (Netlify) already do
this.

## Editing content

- `src/data/content.js`: all service, industry, case study and role copy.
  Accent words are wrapped in `<em>…</em>`.
- `src/data/site.js`: **email, WhatsApp number and HQ. Replace the
  placeholders before launch.**
- `src/components/TrustedBy.jsx`: placeholder client logos.

## Motion

Everything is drawn in the browser, with no external video:

- `src/components/Orb.jsx`: WebGL liquid-glass orb on the home hero, which
  follows the pointer. Falls back to a CSS orb without WebGL.
- `src/lib/visuals.js`: animated canvas heroes per service (agent
  constellation, vision scanner, isometric blocks, floating screens, data
  streams, kinetic type, horizon).
- `src/components/Showcases.jsx`: live "console" demos (agent trace, model
  training, architecture layers, app prototype, integration hub, content
  studio, Target Locker tracker).
- `src/components/motion.jsx`: split-text headline reveals, scroll reveals,
  scroll-linked statements, magnetic buttons and parallax.

Animations pause when off screen and respect the visitor's reduced-motion
setting.
