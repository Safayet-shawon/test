# Prixon portfolio

Next.js site lives in [`/frontend`](./frontend).

## Deploy on Vercel
Import the repo and set **Root Directory** to `frontend`. Framework preset: Next.js (auto-detected). No env vars needed.

## What's on the page
1. **Pendulum intro** (`components/Intro.js`): black screen, white string, small purple ball in simple harmonic motion. Every turning point reveals one of our projects. Plays once per browser tab, skippable (button, click, Esc), skipped for reduced-motion users.
2. **Hero** (`Hero.js`, `HeroScene.js`): "Websites for *any business*" then one demo site per business, each in its own real look. Pieces drop in with a soft bounce and fall away before the next business.
3. **What we make** (`Services.js`): dark, horizontal-scroll panels that end by pointing to the work.
4. **Our work** (`Work.js`): stacked project cards with real screenshots.
5. **How we work**, **Contact**.

## Edit content
- Copy, hero businesses, projects, contact email: `frontend/data/site.js`
- **Contact email**: change `SITE.email` (currently a placeholder, `hello@prixon.dev`). The form opens the visitor's mail app addressed to it.
- **Project screenshots**: add `frontend/public/projects/<project-id>.webp` (and optional `<project-id>-2.webp`, crossfades). Ids: `microservice`, `tomadachis`, `architect`, `singledot`. Without a file the card falls back to an animated stand-in. Tall screenshots auto-scroll. Add `link: "https://..."` on a project to show a "Visit site" button.
- **Hero demo photos**: `frontend/public/hero/*.webp` (swap file-for-file).
- **Intro work list**: `WORK` at the top of `frontend/components/Intro.js`.
- Colours and tokens: top of `frontend/app/globals.css`.

## Run locally
```bash
cd frontend && npm install && npm run dev
```
