# Creative direction — organic material × digital engineering

**Idea:** raw material becomes a precise, working system. Sand stands for the raw idea a client brings; the engineered lattice it settles into stands for the software zerosoft builds. The hero shows this transformation literally, and the rest of the site carries the same material language through colour, grain and type.

## Palette

Defined once as Tailwind `@theme` tokens in `frontend/src/app/globals.css`.

| Token | Hex | Use |
|---|---|---|
| ivory | `#F8F5EF` | Lightest environment (services), form surfaces |
| parchment | `#F1E8D8` | Default light environment, text on dark |
| sand | `#E6D3B6` | Process environment, grains |
| dune | `#D6BF98` | Grain variation |
| amber | `#C99B61` | Primary accent on dark, primary button, highlights |
| bronze | `#A96D37` | Accent on light (italic emphasis, active step) |
| rust | `#7A4527` | Deep accent: process numerals, progress rail |
| graphite | `#25221E` | Work environment, third about chapter |
| coal | `#1B1916` | Dark surfaces |
| ink | `#141311` | Darkest environment: hero, care, call to action, footer |
| stone / ash | `#6E6559` / `#A89F92` | Muted text on light / on dark (both pass WCAG AA on their backgrounds) |

Sections declare a tone (`data-tone="light|ivory|sand|graphite|dark"`) that swaps background, text, muted, line and accent variables, so the page alternates between paper, sand and ink environments instead of being uniformly beige. The nav reads the tone under it and recolours itself.

A fixed SVG-noise film (`body::after`, multiply, 22%) gives every environment a tactile grain.

## Typography

| Role | Face | Why |
|---|---|---|
| Display | **Instrument Serif** (with true italic) | Editorial and expressive; the italic carries emphasis in amber/bronze ("*any business.*") |
| Text | **Manrope** | Highly legible, slightly technical geometry |
| Labels, data, indices | **IBM Plex Mono** | Engineering precision for metadata, step numbers and tags |

All three load through `next/font` (self-hosted, `display: swap`). Display sizes use `clamp()` so they scale continuously from 320px to large desktops.

## Visual system

- Hairline rules and numbered indices (`01`–`05`) instead of cards and icon grids.
- Pill tags in mono for technologies and features.
- Buttons fill from the bottom like poured sand on hover.
- Real project screenshots and scroll recordings only; no stock photography.
- Logo: a zero built from grains, crossed by an amber slash of grains, beside the existing two-weight "**zero**soft" wordmark.

## What we avoided

Blue/purple gradients, neon glows, glass cards, generic 3D spheres, stock photos of programmers, dashboard mock-ups, and any layout or artwork from the reference site.
