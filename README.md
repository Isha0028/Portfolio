# Isha — Portfolio

Personal portfolio built with React, TypeScript, Vite, Tailwind CSS v4, and
[anime.js v4](https://animejs.com) for scroll-triggered and entrance animations.

## Sections

Hero, About, Skills, Experience (Fery Rides), Projects, Education,
Achievements & Leadership, and Contact — sourced from `src/data/resume.ts`.

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
