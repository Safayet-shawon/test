# Deployment report

Date: 11 November 2026.

## Where it runs

| | |
|---|---|
| Production | **https://zerosoft26.com** (also `https://www.zerosoft26.com`) |
| Vercel team / project | `shuttle26` / `zerosoft26` (the project that already owned the domain) |
| Production deployment | `dpl_95MW6daqJp7DtmpRKfdZjV945Nbk` · https://zerosoft26-oscnuk7d8-shuttle26.vercel.app |
| Built from commit | `4fe5073` on `feature/zerosoft-cinematic-redesign` (later commits only change docs) |
| Repository | https://github.com/Safayet-shawon/test, branches `main` and `feature/zerosoft-cinematic-redesign` |
| Project settings | Framework: Next.js · Root Directory: `frontend` · Node 26.x |
| Previous production (rollback target) | `dpl_2UChxsod1sDNsFXSSpWgscGP4ozM` — `vercel rollback dpl_2UChxsod1sDNsFXSSpWgscGP4ozM --scope shuttle26` |

DNS is on Cloudflare (`julian` / `rafe.ns.cloudflare.com`) and already points to Vercel; no DNS change was needed or made.

## How it was deployed

The Vercel CLI (logged in as `safayet-shawon`) was used from the repository root:

1. `vercel deploy` → preview, checked with `vercel curl` (previews are behind Vercel Authentication).
2. `vercel promote <preview>` → production, after every route returned 200 and the API validated input.
3. The production URL was then tested in Chrome (Playwright) and with Lighthouse.

Four production promotions were made; each fixed something found while verifying the one before:

| Deployment | Change |
|---|---|
| `dpl_32gx…` | First release of the redesign |
| `dpl_AbST…` | Images served unoptimised: Vercel image optimisation answers **402 Payment Required** on this account |
| `dpl_3Rqp…` | Hero subtitle painted from the first frame; WebGL starts when idle; AA contrast for manifesto words |
| `dpl_95MW…` | Rust accent on sand sections (bronze was 2.9:1) |

## Verification on https://zerosoft26.com (production)

| Check | Result |
|---|---|
| HTTPS, HSTS | 200, `Strict-Transport-Security: max-age=63072000`; `http://` → 308 to `https://` |
| All routes | `/`, `/services`, `/work`, `/process`, `/after-launch`, `/about`, `/quote`, `/privacy` → 200; unknown path → custom 404 |
| SEO endpoints | `/robots.txt`, `/sitemap.xml`, `/opengraph-image` (PNG), `/icon.svg` → 200 |
| Metadata | Title, description, canonical `https://zerosoft26.com/`, OG image, JSON-LD present; one `h1` per page |
| Internal links | All 8 unique internal links on the home page → 200 |
| Client navigation | Home → Work via nav, filter (Samples = 4 of 19), back, forward, reload: all correct |
| Direct anchor | `/services#systems` lands 96px from the top (below the nav) |
| Mobile menu | Opens, navigates (closes on route change), closes with Escape |
| Reduced motion | No hidden content, no smooth-scroll hijack |
| Console | No errors or failed requests on any tested page |
| Horizontal overflow | None at 1440px and 390px |
| Quotation form | All five steps, validation messages, conditional groups, review; on submit the API answers **503 "Our quotation inbox is not connected yet."** and the form shows that error with `info@zerosoft26.com` as a fallback (no fake success) |

### Lighthouse (production, Lighthouse 12)

| | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Desktop | 98 | 100 | 100 | 100 | 0.8 s | 0 | 110 ms |
| Mobile (simulated slow 4G, 4× CPU) | 71 | 100 | 100 | 100 | 3.6 s | 0 | 630 ms |

Mobile LCP is the hero subtitle; its delay comes from web-font arrival and main-thread JavaScript (GSAP, Lenis, SplitText) under heavy simulated throttling. The WebGL field already loads lazily and starts on idle with fewer grains on phones.

## Needs the owner

1. **Connect the quotation inbox.** The project has no environment variables, so quotation requests cannot be emailed (the old live site was in the same state). In Vercel → `zerosoft26` → Settings → Environment Variables (Production), add either `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER=info@zerosoft26.com`, `SMTP_PASS`, or `RESEND_API_KEY` (after verifying zerosoft26.com in Resend). Then redeploy (`vercel deploy --prod --scope shuttle26` from the repo root).
2. **Connect GitHub for automatic deploys (optional).** `vercel git connect https://github.com/Safayet-shawon/test.git` failed because the Vercel GitHub app has no access to that repository. Grant it at GitHub → Settings → Applications → Vercel → Repository access, then connect it in the project's Git settings (production branch `main`, root `frontend`).
3. **Image optimisation (optional).** Vercel returns 402 for `/_next/image` on this account; images are served as pre-compressed files instead. If optimisation becomes available, remove `images.unoptimized` in `frontend/next.config.ts`.
