// ---- Edit me: all copy / contact details live here ----
export const SITE = {
  name: "zerosoft",
  // Contact form opens the visitor's mail app addressed to this email.
  email: "hello@zerosoft.dev",
};

// Hero animation order: "any business" intro first, then each business -> its website.
// `label` = sticker word (left), `single` = scene caption, `theme` = scene colour (t) + text on it (on).
// Each demo site uses its OWN look (real photography, own fonts + colours) — not ours.
// Photos live in /public/hero (swap file-for-file with your own).
export const INTRO = {
  kind: "any",
  label: "any business",
  single: "business",
  theme: { t: "#14121b", on: "#ffffff" },
};

export const BUSINESSES = [
  {
    kind: "interior",
    layout: "interior",
    tone: "light",
    label: "interior studios",
    single: "interior studio",
    theme: { t: "#8a5a3c", on: "#ffffff" },
    url: "lumenandoak.com",
    name: "Lumen & Oak",
    nav: ["Projects", "Services", "Studio"],
    navCta: "Book",
    kicker: "Interior design studio",
    headline: "Rooms you'll never want to leave.",
    sub: "Homes and offices, designed end to end.",
    cta: "Get a free estimate",
    swatches: ["#d9c4a3", "#a47551", "#6b705c", "#2f3e46", "#e0b25a"],
    room: "Living room · 24 m²",
    hero: "/hero/int-hero.webp",
    thumb: "/hero/int-after.webp",
    before: "/hero/int-before.webp",
    after: "/hero/int-after.webp",
  },
  {
    kind: "estate",
    layout: "estate",
    tone: "dark",
    label: "real estate",
    single: "real estate agency",
    theme: { t: "#1f3a5f", on: "#ffffff" },
    url: "northgate.homes",
    name: "NORTHGATE",
    nav: ["Buy", "Rent", "Sell"],
    headline: "Find a home that feels like yours.",
    hero: "/hero/est-hero.webp",
    thumb: "/hero/est-hero.webp",
    listings: [
      { img: "/hero/est-hero.webp", price: "$1.2M", title: "Oak Residence", meta: "4 bd · 3 ba · 2,400 ft²" },
      { img: "/hero/est-2.webp", price: "$890k", title: "Skyline House", meta: "3 bd · 2 ba · 1,900 ft²" },
      { img: "/hero/est-3.webp", price: "$640k", title: "Library House", meta: "2 bd · 2 ba · 1,450 ft²" },
    ],
  },
  {
    kind: "travel",
    layout: "travel",
    tone: "dark",
    label: "travel agencies",
    single: "travel agency",
    theme: { t: "#ff7a59", on: "#ffffff" },
    url: "wanderly.travel",
    name: "Wanderly",
    nav: ["Destinations", "Book"],
    kicker: "Curated journeys",
    headline: "Go where the signal ends.",
    cta: "Plan my trip",
    dest: "MALDIVES",
    from: "DAC",
    to: "MLE",
    hero: "/hero/tr-hero.webp",
    thumb: "/hero/tr-hero.webp",
    stack: [
      { img: "/hero/tr-alpine.webp", t: "Alpine Peaks", p: "from $890" },
      { img: "/hero/tr-sunrise.webp", t: "Golden Sunrise", p: "from $620" },
      { img: "/hero/tr-heritage.webp", t: "Old Town", p: "from $480" },
    ],
  },
  {
    kind: "photo",
    layout: "photo",
    tone: "dark",
    label: "photographers",
    single: "photographer",
    theme: { t: "#3a3a46", on: "#f5b700" },
    url: "framelight.studio",
    name: "FRAME/LIGHT",
    nav: ["Work", "Prints", "About"],
    headline: "Moments, framed.",
    cta: "View portfolio",
    hero: "/hero/ph-hero.webp",
    thumb: "/hero/ph-hero.webp",
    strip: ["/hero/ph-1.webp", "/hero/ph-2.webp", "/hero/ph-3.webp", "/hero/ph-4.webp", "/hero/ph-5.webp", "/hero/ph-hero.webp"],
  },
  {
    kind: "saas",
    layout: "dash",
    tone: "dark",
    label: "SaaS startups",
    single: "SaaS startup",
    theme: { t: "#5b5bf0", on: "#ffffff" },
    url: "flowdesk.app",
    name: "flowdesk",
    accent: "#7c7cff",
  },
  {
    kind: "hardware",
    layout: "tech",
    tone: "dark",
    label: "electronics",
    single: "electronics brand",
    theme: { t: "#0a6cff", on: "#ffffff" },
    url: "voltelectronics.com",
    name: "Volt Electronics",
    nav: ["Phones", "Teardown", "Buy"],
    headline: "Take it apart.",
    sub: "See every layer of the new Volt One.",
    cta: "Explore the teardown",
    specs: [["Display", "6.1\" OLED · 120Hz"], ["Chip", "3 nm · 8-core"], ["Battery", "All-day, 24 h"]],
  },
];

// Real work. `link` shows a "Visit site" button. Edit the copy freely.
export const PROJECTS = [
  {
    id: "microservice",
    variant: "micro",
    tag: "SaaS",
    title: "EcomMS — Microservice E-commerce",
    blurb:
      "A full e-commerce platform in two apps: a customer storefront (47 sample products across 12 departments, cart and checkout) and an admin console (catalog, inventory, orders, customers, reviews, reports). Both are built against clean Auth, Product, Order and Notification service boundaries, ready for an API gateway.",
    stack: ["Next.js", "TypeScript", "TanStack Query", "Microservices"],
    result: "2 apps · 4 service boundaries · API gateway",
    link: null,
    video: null,
  },
  {
    id: "tomadachis",
    variant: "flow",
    tag: "Project",
    title: "tomadachis.com",
    blurb:
      "Your complete pet ecosystem. Shop premium products, book vet appointments, adopt a new best friend, read guides and join the community — in one warm, playful site.",
    stack: ["Pet shop", "Vet care", "Adopt", "Community"],
    result: "Shop · Vet Care · Adopt · Community",
    link: "https://tomadachis.com",
    video: null,
  },
  {
    id: "architect",
    variant: "arch",
    tag: "Project",
    title: "Architect Shakil Portfolio",
    blurb:
      "Portfolio for AR. Shakhaouth Hossain Shakil — architect, photographer, traveller, author. A counting intro that ends in a polaroid, a swiping-roles hero, galleries and a custom cursor.",
    stack: ["Next.js", "Framer Motion", "NestJS", "Redis"],
    result: "Full-stack: Next.js + NestJS",
    link: null,
    video: null,
  },
  {
    id: "singledot",
    variant: "calc",
    tag: "Project",
    title: "Single Dot Studio",
    blurb:
      "Interior design website with a live cost calculator: visitors pick room sizes, get an instant estimate and a quotation PDF by email. A full admin panel manages the content, pricing and enquiries.",
    stack: ["Next.js", "Postgres", "Redis", "PDF + Mail"],
    result: "Public site + admin panel + API",
    link: "https://singledotstudio.com",
    video: null,
  },
];

// "How we work" strip
export const PROCESS = [
  ["01", "Discover", "We learn your business, your customers and what a win looks like."],
  ["02", "Design", "Real brand colours, real content, a look that is unmistakably yours."],
  ["03", "Build", "Fast, accessible code. You see progress from week one."],
  ["04", "Launch", "We ship, measure and keep improving after day one."],
];
