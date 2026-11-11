# Website architecture

## Routes

| Route | Type | Content |
|---|---|---|
| `/` | Static | Hero → Who we are (manifesto + stats) → What we build → Selected work → How we work → After launch → About chapters → Call to action |
| `/services` | Static | Five services with tags and links to real examples; anchors `#websites`, `#saas`, `#apps`, `#custom`, `#systems` |
| `/work` | Static + client filter | All 19 projects; filter by Websites / Management systems / SaaS / Samples; hover plays scroll recordings |
| `/process` | Static | Pinned process stepper + about chapters |
| `/after-launch` | Static | Care plan |
| `/about` | Static | Manifesto, stats, chapters |
| `/quote` | Static + client form | Five-step quotation form |
| `/privacy` | Static | Privacy policy |
| `/api/quote` | Node.js function | Validates and emails quotation requests |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon.svg` | Generated | SEO and sharing |

The URLs match the previous live site.

## Source layout (`frontend/src`)

```
app/
  layout.tsx            fonts, metadata, boot script, Nav/Footer, motion providers
  globals.css           tokens (@theme), tones, components, responsive rules
  page.tsx …            one folder per route
  api/quote/route.ts    quotation endpoint
  sitemap.ts robots.ts opengraph-image.tsx icon.svg not-found.tsx
components/
  hero/Hero.tsx         pinned scroll story (client)
  hero/SandField.tsx    WebGL grains (client, dynamically imported, ssr: false)
  motion/               SmoothScroll (Lenis) + Choreographer (data-attribute motion)
  sections/             Manifesto, ServicesList, Care, Chapters (server);
                        SelectedWork, ProcessPinned (client, pinned)
  quote/QuoteForm.tsx   quotation form (client)
  work/WorkIndex.tsx    filterable project grid (client)
  Nav, Footer, Cta, PageHead, Logo, JsonLd
data/
  site.ts               every company fact and piece of copy
  quote.ts              quotation questions, validation, estimate, summary
lib/
  gsap.ts mail.ts quoteEmail.ts
```

## Rendering decisions

- **Server first.** Every page is statically prerendered. Client Components are limited to the hero, two pinned sections, nav, work filter, form and the motion providers.
- **Heavy visual loads last.** `SandField` is a dynamic import with `ssr: false`; the headline (the LCP element) is plain HTML animated by CSS, so it paints immediately. The canvas fades in once its first frame is drawn, over a CSS gradient fallback.
- **No three.js.** The hero is ~250 lines of raw WebGL: one static vertex buffer of random seeds; all motion is in the vertex shader. Grain count adapts: 90k desktop, 50k on ≤4-core devices, 26k on phones; DPR capped at 1.75 (1.5 on phones).
- **Images** use `next/image` (AVIF/WebP, responsive `sizes`); above-the-fold project images load eagerly, the rest lazily. Scroll recordings use `preload="none"` and play only on hover.
- **Fonts** via `next/font/google` (self-hosted, swap).

## Quotation pipeline

`QuoteForm` (browser) and `/api/quote` (server) both import `data/quote.ts`, so the questions, validation and estimate logic can never drift apart.

1. Browser validates each step; draft is saved locally.
2. Server re-sanitises (known ids only, length limits), checks the honeypot, validates again and rate-limits (5 per 10 min per IP per instance).
3. Team email is sent first (reply-to = client). If it fails, the client sees an error and nothing claims success.
4. Client copy is sent second; the success screen says whether it was delivered.
5. No mail configuration in production → 503 and a visible error with the email address.

## SEO

- `metadata` per page: unique title (template `%s · zerosoft`), description, canonical.
- Open Graph + Twitter `summary_large_image` with a generated 1200×630 image.
- `ProfessionalService` JSON-LD with only verified facts: name, URL, email, street address, services.
- One `h1` per page, semantic sections with `aria-labelledby`, descriptive `alt` text, `robots.txt` disallowing `/api/`.

## Security headers

Set in `next.config.ts`: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`; `X-Powered-By` removed.
