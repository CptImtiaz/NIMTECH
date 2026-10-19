# NIMTECH

Marketing site for NIMTECH, built with React, Vite and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # serve the production build
```

## Structure

- `src/components/Navbar.jsx`: sticky "liquid glass" navbar (collapses to a menu on mobile)
- `src/components/Hero.jsx`: headline, rating badge, subheadline and primary CTA
- `src/components/GlassyOrb.jsx`: animated orb on the right of the hero
- `src/components/TrustedBy.jsx`: "Trusted by" logo strip (placeholder logos)
- `src/index.css`: glass surface and orb colour grade

## The glassy orb

The orb video has a black background. `mix-blend-mode: screen` hides black
only on a dark page; on a pure white page anything screen-blended turns
white. So `GlassyOrb` draws each frame to a canvas and turns brightness into
transparency, then applies the colour grade
`hue-rotate(-55deg) saturate(250%) brightness(1.2) contrast(1.1)`.

Reading video frames needs the video host to allow cross-origin access. If it
doesn't, the component falls back to a plain `<video>` with
`mix-blend-screen`, which will not show up on white. For reliable results,
host the video yourself (once you have the rights to use it) and point the
site at it:

```bash
VITE_ORB_SRC=./orb.webm npm run build   # with the file placed in public/orb.webm
```
