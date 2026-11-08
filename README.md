# zerosoft portfolio

Next.js site lives in [`/frontend`](./frontend).

## Deploy on Vercel
Import the repo and set **Root Directory** to `frontend`. Framework preset: Next.js (auto-detected). No env vars needed.

## What's on the page
1. **Brand intro** (`components/Intro.js`, styles under "Brand intro" in `globals.css`): about 2 seconds. A 1-second loader
   ring draws in and becomes the "0" of the logo mark, the mark slides left and "zerosoft26" appears. Plays once per
   tab; any key, click, scroll or swipe skips it; skipped for reduced-motion users.
2. **Hero** (`Hero.js`, `HeroScene.js`, `DemoSites.js`): "Websites for any business." with a carousel that mixes
   real client projects (labelled "Client project") and concept designs (labelled "Concept design").
3. **Selected work** (`Work.js`): six projects with real screenshots, then an "Also built" list.
4. **What we build** (`Services.js`): websites, web apps and stores, as horizontal-scroll panels.
5. **After launch** (`Care.js`), **How we work** (`Process.js`), **About** (`About.js`), **Contact** (`Contact.js`),
   **Footer** (`Footer.js`).

## Edit content
- Copy, hero businesses, projects, contact email: `frontend/data/site.js`
- **Contact email**: `SITE.email` is still a placeholder (`hello@zerosoft.dev`). Replace it before launch.
- **Form delivery**: set `NEXT_PUBLIC_FORM_ENDPOINT` (e.g. a Formspree URL) to send messages directly. Without it,
  the form opens the visitor's email app addressed to `SITE.email`.
- **Location and socials**: `SITE.location`, `SITE.socials` (hidden until set).
- **Hero real projects**: entries with `layout: "real"` in `BUSINESSES`, using a screenshot from `public/projects`.
- **Project screenshots**: `frontend/public/projects/<id>.webp` (optional `<id>-2.webp` crossfades).
- **Fonts**: Unbounded (headings) and Space Grotesk (everything else). Fraunces is only used inside concept demos.

## Run locally
```bash
cd frontend && npm install && npm run dev
```
