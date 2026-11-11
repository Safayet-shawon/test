# Project audit

Audit carried out on 11 November 2026, before the redesign.

## Sources inspected

| Source | Finding |
|---|---|
| `zerosoft26.com` (live) | "Software for any business." Pages: home, `/services`, `/process`, `/work`, `/after-launch`, `/about`, `/quote`, `/privacy`. Email `info@zerosoft26.com`, address Road 32, Mohakhali DOHS, Dhaka 1206. No phone or social links published. |
| Local repo (`Sazin14/ZeroSoft_pfo` clone) | Branches: `main` / `claude/optimistic-edison-zrebr0` (older single-page site with a `mailto:` contact form and a placeholder email), `claude/redesign`, `zerosoft-studio-site`, and `claude/original-polish`. |
| `claude/original-polish` | The source the live site is built from: same routes, the five-step quotation form, `POST /api/quote` with SMTP/Resend email, a privacy policy and 19 projects with screenshots and scroll recordings. **This branch was used as the source of truth** and is the base of the redesign branch. |
| `github.com/Safayet-shawon/test` | Reachable and empty (no branches), so nothing there could be overwritten. |
| `ciuslabs.com` | Reference for quality only: editorial hierarchy, numbered process, restrained motion, a confident closing call to action. No layout, text or graphics were copied. |

## Business facts kept (all verified from the live site or its source)

- Services: Websites, SaaS products, Apps, Custom software, Management systems (with their tags).
- Process: Brief, Design, Build, Launch & care.
- After-launch care: Maintenance, Traffic, Scaling, Databases, Backups.
- About: the three chapters (the beginning, the workshop, the long run).
- Stats: 19 projects and 7 industries are **counted from the project list**, not invented; "1 team" is the live site's own claim.
- Work: the 19 projects with their real links, tags and media. Demo builds stay labelled as samples with fictional content.

Nothing was added that the sources don't support: no clients, testimonials, results, years, team size, awards or partners.

## Functionality preserved

| Feature | Status |
|---|---|
| Five-step quotation form (needs → features → scope → details → review) | Ported to TypeScript unchanged in behaviour: conditional feature groups, per-step validation, honeypot, draft saved in `localStorage`, live scope sidebar, reference number |
| `POST /api/quote` | Ported to a typed Route Handler: sanitising, validation, per-IP rate limit, team email first then client copy, honest 503 when mail isn't configured |
| HTML + text emails | Same content, recoloured to the new palette |
| Privacy policy | Same text |
| All live URLs | Same paths, so links and search results keep working |

## Problems found and fixed

| Problem | Fix |
|---|---|
| JavaScript only, no types | Full TypeScript (strict) |
| ~9,000-line global stylesheet, several unused hero demos | New design system; unused demo images (`public/hero`) removed |
| No sitemap, robots, Open Graph or Twitter cards; canonical only on some pages | Added `sitemap.xml`, `robots.txt`, generated OG image, canonical on every page |
| Older `main` branch showed "Opening your mail app…" as if sent | Not carried forward; the live quotation API is used everywhere |
