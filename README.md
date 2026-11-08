# zerosoft portfolio

Next.js site lives in [`/frontend`](./frontend).

## Deploy on Vercel
Import the repo and set **Root Directory** to `frontend`. Framework preset: Next.js (auto-detected).

- Every push to any branch creates a **preview** deployment (Vercel → Deployments).
- Only the branch set under **Settings → Environments → Production → Branch Tracking** (older dashboards:
  Settings → Git → Production Branch) deploys to the live site. Changing GitHub's default branch does not change it.
- "Redeploy" rebuilds the same commit. To put a different branch live, open its newest deployment and use
  **⋯ → Promote to Production**, or merge it into the production branch.

### Quotation emails (required for the quotation form)
The form at `/quote` posts to `app/api/quote/route.js`, which sends two emails from `info@zerosoft26.com`:
one to us (reply goes to the client) and one to the client (reply comes to us). Add these in
**Vercel → Settings → Environment Variables**, then redeploy (see `frontend/.env.example`):

| Variable | Value |
| --- | --- |
| `SMTP_HOST` | your email provider's SMTP server, e.g. `smtp.gmail.com`, `smtp.zoho.com`, `smtp.hostinger.com` |
| `SMTP_PORT` | `465` (or `587`) |
| `SMTP_USER` | `info@zerosoft26.com` |
| `SMTP_PASS` | the mailbox password or app password |

Or set `RESEND_API_KEY` instead, after verifying `zerosoft26.com` in Resend. Without either, the live form shows
"Our quotation inbox is not connected yet" and nothing is sent.

## What's on the page
1. **Brand intro** (`components/Intro.js`, styles under "Brand intro" in `globals.css`): about 2 seconds. A 1-second loader
   ring draws in and becomes the "0" of the logo mark, the mark slides left and "zerosoft26" appears. Plays once per
   tab; any key, click, scroll or swipe skips it; skipped for reduced-motion users.
2. **Hero** (`Hero.js`, `HeroScene.js`, `DemoSites.js`): "Software for any business." with a carousel that mixes
   real client projects (labelled "Client project") and concept designs (labelled "Concept design").
3. **Selected work** (`Work.js`): six projects with real screenshots, then an "Also built" list.
4. **What we build** (`Services.js`): websites, web apps and stores, as horizontal-scroll panels.
5. **After launch** (`Care.js`), **How we work** (`Process.js`), **About** (`About.js`), **Contact** (`Contact.js`),
   **Footer** (`Footer.js`).

## Edit content
- Copy, hero businesses, projects, contact details (email, phone, address): `frontend/data/site.js`
- Quotation questions, options and prices: `frontend/data/quote.js` (prices are `null` until decided)
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
