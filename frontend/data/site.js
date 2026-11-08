// ---- Edit me: all copy / contact details live here ----
export const SITE = {
  name: "zerosoft",
  // Contact form opens the visitor's mail app addressed to this email.
  email: "hello@zerosoft.dev", // placeholder: replace with a real inbox before launch
  // Shown in the footer when set, e.g. "Dhaka, Bangladesh".
  location: "",
  // Footer links, e.g. { label: "GitHub", href: "https://github.com/..." }. Empty = hidden.
  socials: [],
};

// Hero animation order: "any business" intro first, then each business -> its website.
// `label` = sticker word (left), `single` = scene caption, `theme` = scene colour (t) + text on it (on).
// Each demo site uses its OWN look (real photography, own fonts + colours) — not ours.
// Concept designs are labelled "Concept design" in the hero; real client work is labelled "Client project".
// Photos live in /public/hero (swap file-for-file with your own).
export const INTRO = {
  kind: "any",
  label: "any business",
  single: "business",
  theme: { t: "#14121b", on: "#ffffff" },
};

export const BUSINESSES = [
  // Real client projects: `layout: "real"` shows the live site's screenshot, labelled "Client project".
  {
    kind: "real-singledot",
    layout: "real",
    real: true,
    tone: "light",
    label: "interior studios",
    single: "interior studio",
    theme: { t: "#8a5a3c", on: "#ffffff" },
    url: "singledotstudio.com",
    name: "Single Dot Studio",
    shot: "/projects/singledot.webp",
    travel: 0.32,
    bg: "#f4efe8",
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
    kind: "real-tomadachis",
    layout: "real",
    real: true,
    tone: "light",
    label: "pet care",
    single: "pet care brand",
    theme: { t: "#e0607e", on: "#ffffff" },
    url: "tomadachis.com",
    name: "tomadachis",
    shot: "/projects/tomadachis.webp",
    travel: 0,
    bg: "#fff6f8",
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
    kind: "real-ecomms",
    layout: "real",
    real: true,
    tone: "light",
    label: "online stores",
    single: "online store",
    theme: { t: "#4f46e5", on: "#ffffff" },
    url: "EcomMS storefront",
    name: "EcomMS",
    shot: "/projects/microservice.webp",
    travel: 0.3,
    bg: "#ffffff",
  },
  {
    kind: "perfume",
    layout: "perfume",
    tone: "dark",
    label: "perfume stores",
    single: "perfume store",
    theme: { t: "#b08d57", on: "#140e08" },
    url: "maisonaure.com",
    name: "MAISON AURE",
    nav: ["Fragrances", "Discovery set", "Bag"],
    kicker: "Eau de parfum",
    headline: "Aurore",
    sub: "Bergamot, oud and warm vanilla.",
    cta: "Add to bag · $148",
    notes: [["Top", "Bergamot"], ["Heart", "Black oud"], ["Base", "Vanilla"]],
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

// Selected work, strongest first. Each needs a screenshot at public/projects/<id>.webp.
// `link` shows a "Visit website" button. `result` = what was delivered (or a real outcome, if you have one).
export const PROJECTS = [
  {
    id: "singledot",
    tag: "Website + admin",
    title: "Single Dot Studio",
    blurb:
      "An interior design site with a live cost calculator. Visitors size their rooms, get an instant estimate and receive a PDF quote by email.",
    stack: ["Next.js", "Postgres", "Redis"],
    result: "Public site, cost calculator, quotation PDFs, admin panel",
    link: "https://singledotstudio.com",
  },
  {
    id: "microservice",
    tag: "E-commerce",
    title: "EcomMS",
    blurb: "A storefront and an admin console for a full online store, built on separate auth, product, order and notification services.",
    stack: ["Next.js", "TypeScript", "Microservices"],
    result: "Storefront, admin console, 4 back-end services",
    link: null,
  },
  {
    id: "tomadachis",
    tag: "Website",
    title: "tomadachis",
    blurb: "A pet care platform: an online shop, vet appointments, adoption and a community, in one warm, friendly site.",
    stack: ["Shop", "Bookings", "Community"],
    result: "Shop, vet bookings, adoption and community in one site",
    link: "https://tomadachis.com",
  },
  {
    id: "moonstar",
    tag: "Website + portal",
    title: "Moon Star Power & Technology",
    blurb: "A company website for a power-equipment supplier, plus a private staff portal for quotations, approvals and engineering load sizing.",
    stack: ["Next.js", "Express", "PostgreSQL"],
    result: "Company site, staff portal, quotation engine",
    link: null,
    shotLabel: "gallery",
  },
  {
    id: "unifab",
    tag: "Product",
    title: "UNIFAB",
    blurb: "A scroll-driven storefront for a single garment, with a real-time 3D scene and art-directed photography.",
    stack: ["three.js", "GSAP", "Vite"],
    result: "3D product story and storefront",
    link: null,
    shotLabel: "gallery",
  },
  {
    id: "architect",
    tag: "Portfolio",
    title: "Architect Shakil",
    blurb: "A portfolio for an architect, photographer and author, with galleries, an animated intro and a content back end.",
    stack: ["Next.js", "NestJS", "Redis"],
    result: "Portfolio site with galleries and CMS",
    link: null,
  },
];

// Shipped work without screenshots yet: shown as a short list under the cards.
export const ALSO_BUILT = [
  ["Winner Apparels", "Garment manufacturing", "Management app for inventory, production planning, procurement and HR."],
  ["Sohrab Air International", "Travel and Hajj services", "Bilingual Bangla and English website with an admin CRM."],
];

// "How we work" strip
export const PROCESS = [
  ["01", "Discover", "We learn your business, your customers and what a good result looks like."],
  ["02", "Design", "Page designs with your real content and brand, reviewed together."],
  ["03", "Build", "Fast, accessible code, with progress you can see along the way."],
  ["04", "Launch", "We put it live, then keep it fast, safe and up to date."],
];
