# Prixon portfolio

Next.js frontend lives in [`/frontend`](./frontend).

## Deploy on Vercel
Import the repo and set **Root Directory** to `frontend`. Framework preset: Next.js (auto-detected). No env vars needed.

## Edit content
- Copy, projects, businesses in the hero animation, contact email: `frontend/data/site.js`
- Colors: CSS variables at the top of `frontend/app/globals.css`
- Real project videos: drop `.mp4` files in `frontend/public/videos/` and set `video: "/videos/name.mp4"` on a project.

## Run locally
```bash
cd frontend && npm install && npm run dev
```
