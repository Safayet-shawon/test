# zerosoft — website

The website for **zerosoft**, a software studio in Dhaka that designs and builds websites, web apps, SaaS and management systems, and looks after them after launch.

The Next.js app lives in [`/frontend`](./frontend). Design and engineering notes are in [`/docs`](./docs).

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (tokens via `@theme`) plus hand-written CSS in `src/app/globals.css` |
| Motion | GSAP 3 + ScrollTrigger + SplitText, Lenis smooth scrolling |
| Hero visual | Hand-written WebGL (no three.js): ~90k sand grains computed in a vertex shader |
| Icons | lucide-react |
| Email | Nodemailer (SMTP) or Resend, from a Next.js Route Handler |
| Hosting | Vercel |

## Run locally

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

## Environment variables

Only the quotation form needs them. Copy `frontend/.env.example` to `frontend/.env.local` for local use; on Vercel add them under **Settings → Environment Variables**. Never commit real values.

| Variable | Required | Purpose |
|---|---|---|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | one of SMTP or Resend | Login for the `info@zerosoft26.com` mailbox |
| `SMTP_SECURE` | no | `true`/`false`; defaults to `true` on port 465 |
| `RESEND_API_KEY` | one of SMTP or Resend | Use Resend instead of SMTP (domain must be verified there) |
| `MAIL_FROM` | no | Default `zerosoft <info@zerosoft26.com>` |
| `MAIL_TO` | no | Where new requests go. Default `info@zerosoft26.com` |

Without mail settings, `POST /api/quote` returns **503** in production and the form shows an honest error with the email address as a fallback. In `next dev` it logs the request instead, so the form can be tested locally.

## Deploy on Vercel

Import the repository and set **Root Directory** to `frontend`. Framework preset: Next.js (auto-detected). Add the mail variables above for the quotation form. See [`docs/DEPLOYMENT_REPORT.md`](./docs/DEPLOYMENT_REPORT.md) for the current deployment.

## Editing content

All company facts and copy are in `frontend/src/data/site.ts` (contact details, services, process, care plan, about chapters, projects). The quotation questions, validation and future prices are in `frontend/src/data/quote.ts`. The form, the API and the emails all read from those two files, so they always agree.

- **Phone or social links:** set `SITE.phone` / `SITE.socials` in `site.ts`; they appear in the footer and structured data automatically.
- **Projects:** add to `ALL_WORK` (all work page) or `FEATURED` (home page). Screenshots go in `frontend/public/projects/`, scroll recordings in `frontend/public/video/<id>.mp4` with `<id>.poster.jpg`.
- **Prices:** fill `price` (BDT) and `days` on options in `quote.ts`; once every chosen option has a price the form and emails show an estimate range.

## Architecture in brief

- Pages are Server Components. Only interactive pieces are Client Components: the hero (canvas and scroll story), the pinned work and process sections, the nav, the work filter and the quotation form.
- One client component, `motion/Choreographer.tsx`, animates the server-rendered sections through `data-*` attributes (`data-reveal`, `data-split`, `data-words`, `data-stagger`, `data-count`), so sections ship no JavaScript of their own.
- Pinned sections are wrapped in a plain `div` so GSAP's pin spacer never moves a node React owns (this keeps client-side navigation safe).
- `prefers-reduced-motion` turns off Lenis, scroll scrubbing and reveals; the hero canvas renders one still frame.
