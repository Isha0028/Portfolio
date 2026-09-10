# Isha — Portfolio

Personal portfolio built with React, TypeScript, Vite, and Tailwind CSS v4.
Motion is built on [GSAP](https://gsap.com) + ScrollTrigger (scroll reveals,
the pinned horizontal project gallery, the hero's split-text entrance),
[Lenis](https://lenis.darkroom.engineering/) for inertial smooth scroll, and
a [Three.js](https://threejs.org) shader background in the hero — a
domain-warped simplex-noise gradient that reacts to the pointer.

## Sections

Hero, About, Skills, Experience (Fery Rides), Projects (pinned horizontal
gallery on desktop, swipeable on mobile), Education, Achievements &
Leadership, and Contact — sourced from `src/data/resume.ts`.

## Motion system

- `src/lib/gsap.ts` — single place GSAP + ScrollTrigger are registered.
- `src/components/Reveal.tsx` — scroll-triggered fade/slide-up wrapper used
  by every section.
- `src/components/SmoothScroll.tsx` — Lenis wired into the GSAP ticker so
  ScrollTrigger stays in sync with the smooth scroll.
- `src/components/WebGLHero.tsx` — the Three.js shader plane behind the
  hero; lazy-loaded so it doesn't block first paint, pauses when off-screen
  or the tab is hidden, and respects `prefers-reduced-motion`.
- `src/components/CustomCursor.tsx` / `Magnetic.tsx` — the ring cursor and
  magnetic hover effect on buttons/icons; both no-op on touch devices.
- `src/components/Preloader.tsx` — percentage-counter loading screen shown
  once per page load.

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
```

## Updating content

All resume content (bio, skills, experience, projects, education, awards)
lives in `src/data/resume.ts` — edit it there and every section updates
automatically.

To swap the placeholder avatar for a real photo, drop the image in
`src/assets/`, import it in `src/components/Avatar.tsx`, and render an
`<img>` in place of the monogram.
