# Motion blueprint

Motion explains the idea (material → system) and guides reading. Most of the page is still; movement happens when a section arrives or when the reader scrolls a story.

## Engine

| Piece | File | Notes |
|---|---|---|
| GSAP registration | `src/lib/gsap.ts` | ScrollTrigger + SplitText, global defaults `expo.out / 1.1s` |
| Smooth scroll | `src/components/motion/SmoothScroll.tsx` | Lenis driven by `gsap.ticker`; each Lenis scroll calls `ScrollTrigger.update`. Touch stays native. Off for reduced motion. Resets to top and refreshes triggers on route change. |
| Choreographer | `src/components/motion/Choreographer.tsx` | Animates server-rendered sections through data attributes; waits for `document.fonts.ready` before splitting text; fully reverted on route change |
| No-flash boot | inline script in `src/app/layout.tsx` | Adds `js-motion` before first paint so reveal targets start hidden; removed after 3.5 s if scripts never run |

## Inventory

| # | Technique | Where | Behaviour |
|---|---|---|---|
| 1 | Cinematic entrance | Hero | CSS keyframes from first paint (no hydration wait, no LCP delay): masked line rise for the headline, staggered fade for meta, copy and CTAs; WebGL dust settles into dunes over 2.6 s |
| 2 | Pinned scroll story | Hero | Pinned for 110% of the viewport (70% on phones). Grains sweep left→right, arc up and settle into a perspective lattice with standing modules; copy recedes; the statement "Raw ideas in. Precise, working systems out." arrives; phase bar 01→02 fills |
| 3 | Material displacement | Hero | Pointer parts the sand around it (screen-space push in the vertex shader), lights the lattice |
| 4 | Particle movement | Hero | Wind drift, slow dune migration, occasional saltation hops; light from the left shades slopes |
| 5 | Line reveals (SplitText) | Every `data-split` heading | Lines rise out of a mask, staggered 0.1 s |
| 6 | Character reveal | Footer wordmark | Characters rise one by one |
| 7 | Word-by-word scrub | Manifesto | Words light from 16% to 100% opacity as the paragraph is scrolled |
| 8 | Count-up | Stats | 0 → value on entry (server HTML holds the real number) |
| 9 | Horizontal scroll | Selected work (≥1024px) | Section pins and the track moves sideways; each screenshot unmasks with `clip-path` and drifts inside its frame (`containerAnimation`) |
| 10 | Pinned stepper | Process (≥901px) | Pinned for 2.2 viewports; giant numeral rolls 01→04; rust rail fills; active step lit, others dimmed |
| 11 | Stacking chapters | About | CSS `position: sticky`: each chapter slides over the last, changing environment parchment → sand → graphite |
| 12 | Staggered entries | Lists, footer columns | Children rise 28px in sequence |
| 13 | Hover feedback | Services rows, buttons, work items | Ink fill expands from the row's centre line; arrow rotates; buttons fill from below; work items play their scroll recording |
| 14 | Navigation | Header | Hides on scroll down, returns on scroll up; recolours to the tone underneath; mobile menu unmasks top→bottom with staggered links |
| 15 | Scroll progress | Top edge | 2px rust→amber bar scrubbed to page progress |
| 16 | Background transitions | Whole page | Tone changes between sections (ink → parchment → ivory → graphite → sand → ink) |

Deliberately not used: a custom cursor (no benefit to reading or clicking), bounce, constant floating, spinning.

## Safety rules

- Every `useEffect` that creates triggers uses `gsap.context` or `gsap.matchMedia` and reverts on cleanup.
- Pinned sections sit inside a React-owned `div.pin-wrap`, so the pin spacer never moves a node React will remove (this fixed a `removeChild` crash on client-side navigation).
- A pinned element is never also the trigger of a second ScrollTrigger; the hero's copy timeline is attached to the pinning trigger itself.
- GSAP tweens that start while a CSS entrance is running use explicit `fromTo` values.
- Canvas loop stops when the hero is off screen or the tab is hidden; `webglcontextlost` is handled.
- `prefers-reduced-motion`: no Lenis, no reveals (content visible), no pinning animations, hero shows one still frame; CSS transitions shortened to ~0.

## Verified

Refresh, direct URL loads (`/work`, `/services#systems`), client navigation, back and forward, mobile menu open/close/Escape, and reduced-motion rendering were tested in Chrome with Playwright; see `DEPLOYMENT_REPORT.md`.
