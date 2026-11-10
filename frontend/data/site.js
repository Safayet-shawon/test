// ---- Edit me: all copy / contact details live here ----
export const SITE = {
  name: "zerosoft",
  legalName: "zerosoft",
  url: "https://zerosoft26.com", // used for search engines and link previews
  // Quotations are sent from and to this inbox (see app/api/quote/route.js).
  email: "info@zerosoft26.com",
  phone: "", // e.g. "+880 1XXX-XXXXXX". Shown in the footer and contact block when set.
  address: {
    line1: "Road 32, Mohakhali DOHS",
    city: "Dhaka",
    postcode: "1206",
    country: "Bangladesh",
  },
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Road+32+Mohakhali+DOHS+Dhaka+1206",
  hours: "", // e.g. "Sunday to Thursday, 10 am to 7 pm". Hidden when empty.
  // Footer links, e.g. { label: "LinkedIn", href: "https://www.linkedin.com/company/..." }. Empty = hidden.
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
    travel: 0.25,
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

// ---------------------------------------------------------------------------------------------
// WORK
// Media per project: `shots` (screenshots in /public/projects; a second one crossfades) or
// `video` (a scroll recording in /public/video/<id>.mp4 with <id>.poster.jpg).
// `link` shows a "Visit website" button.
// ---------------------------------------------------------------------------------------------

// Home page "Selected work": the strongest projects, in order. The full list is on /work.
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
    shots: ["/projects/singledot.webp"],
  },
  {
    id: "architect",
    tag: "Portfolio",
    title: "Architect Shakil",
    blurb:
      "A portfolio for an architect, photographer, traveller and author, with a counting intro, swiping roles, galleries and a content back end.",
    stack: ["Next.js", "NestJS", "Redis"],
    result: "Portfolio site with galleries and CMS",
    link: "https://arshakil.vercel.app",
    shots: ["/projects/architect.webp"],
  },
  {
    id: "winner-erp",
    tag: "Management system",
    title: "Winner Apparels ERP",
    blurb:
      "A management system for a garment factory: inventory and warehouses, production plans from cutting to finishing, procurement, HR and payroll, and reports.",
    stack: ["React", "Laravel", "Recharts"],
    result: "Inventory, production, procurement and HR in one system",
    link: "https://winner-apparels-erp.vercel.app",
    shots: ["/projects/winner.webp", "/projects/winner-2.webp"],
  },
  {
    id: "moonstar",
    tag: "Website + portal",
    title: "Moon Star Power & Technology",
    blurb: "A company website for a power-equipment supplier, plus a private staff portal for quotations, approvals and engineering load sizing.",
    stack: ["Next.js", "Express", "PostgreSQL"],
    result: "Company site, staff portal, quotation engine",
    link: "https://moonstar-web-five.vercel.app",
    shots: ["/projects/moonstar.webp"],
  },
  {
    id: "turf",
    tag: "Booking platform",
    title: "turf.bd",
    blurb: "A booking site for football turfs in Bangladesh: venues, offers, my bookings and a venue admin. Built as a demo with fictional venues.",
    stack: ["Booking", "Offers", "Admin"],
    result: "Booking site and venue admin",
    link: "https://turf-sigma-nine.vercel.app",
    video: "turf",
    poster: "/video/turf.poster.jpg",
  },
];

// The Work page: one tab per service. Websites are grouped by the business they serve.
export const WORK_TABS = [
  { id: "websites", label: "Websites", blurb: "Public websites, grouped by the business they serve." },
  { id: "systems", label: "Management systems", blurb: "The software a business runs on: ERP, CRM and staff portals." },
  { id: "saas", label: "SaaS", blurb: "Products built to be used by many customers at once." },
  { id: "samples", label: "Samples", blurb: "Demo builds that show an idea. Their content is fictional." },
];

export const SECTORS = [
  ["apparel", "Apparel and fashion"],
  ["power", "Power and engineering"],
  ["design", "Architecture, interiors and construction"],
  ["lighting", "Lighting and home automation"],
  ["travel", "Travel and pilgrimage"],
  ["pets", "Pets"],
  ["digital", "Digital products"],
];

const rec = (id) => ({ video: id, poster: `/video/${id}.poster.jpg` });

export const ALL_WORK = [
  // Websites
  { id: "winner-site", tab: "websites", sector: "apparel", title: "Winner Apparels", kind: "Garment manufacturer website",
    tags: ["Collections", "Request a quote", "FAQ"], link: "https://winner-apparels-site.vercel.app", ...rec("winner-site") },
  { id: "unifab", tab: "websites", sector: "apparel", title: "UNIFAB", kind: "Fashion label with a 3D scroll story",
    tags: ["three.js", "GSAP", "Vite"], link: "https://cinematic-clothing.vercel.app", shots: ["/projects/unifab.webp"] },
  { id: "moonstar", tab: "websites", sector: "power", title: "Moon Star Power & Technology", kind: "Power equipment company website",
    tags: ["Next.js", "Express", "PostgreSQL"], link: "https://moonstar-web-five.vercel.app", shots: ["/projects/moonstar.webp"] },
  { id: "alphatek", tab: "websites", sector: "power", title: "Alphatek Engineering", kind: "Industrial automation website",
    tags: ["Products", "Brands", "Request a quote"], link: "https://alphatek-engineering.vercel.app", ...rec("alphatek") },
  { id: "singledot", tab: "websites", sector: "design", title: "Single Dot Studio", kind: "Interior design website with a cost calculator",
    tags: ["Next.js", "PostgreSQL", "PDF quotes"], link: "https://singledotstudio.com", shots: ["/projects/singledot.webp"] },
  { id: "kolpo", tab: "websites", sector: "design", title: "KOLPO", kind: "Architecture and construction website",
    tags: ["Projects", "Services", "Journal"], link: "https://kolpo-tau.vercel.app", ...rec("kolpo") },
  { id: "architect", tab: "websites", sector: "design", title: "Architect Shakil", kind: "Personal portfolio",
    tags: ["Next.js", "NestJS", "Galleries"], link: "https://arshakil.vercel.app", shots: ["/projects/architect.webp"] },
  { id: "wadia", tab: "websites", sector: "lighting", title: "WADIA", kind: "Lighting and home automation store",
    tags: ["Shop", "Room planner", "Before and after"], link: "https://wahdialights.vercel.app", ...rec("wadia") },
  { id: "sohrab", tab: "websites", sector: "travel", title: "Sohrab Air International", kind: "Bilingual Hajj, Umrah and ticketing website",
    tags: ["Bangla + English", "Packages", "Requests"], link: null, shots: ["/projects/sohrab-2.webp"] },
  { id: "tomadachis", tab: "websites", sector: "pets", title: "tomadachis", kind: "Pet care platform",
    tags: ["Shop", "Vet booking", "Adoption"], link: "https://tomadachis.com", shots: ["/projects/tomadachis.webp"] },
  { id: "praxivon", tab: "websites", sector: "digital", title: "Praxivon Labs", kind: "Studio website",
    tags: ["Brand site"], link: "https://praxivonlabs-nine.vercel.app", ...rec("praxivon") },

  // Management systems
  { id: "winner-erp", tab: "systems", title: "Winner Apparels ERP", kind: "Garment factory management system",
    tags: ["Inventory", "Production", "HR and payroll"], link: "https://winner-apparels-erp.vercel.app",
    shots: ["/projects/winner.webp", "/projects/winner-2.webp"] },
  { id: "sohrab-crm", tab: "systems", title: "Sohrab Air CRM", kind: "Travel agency CRM",
    tags: ["Lead pipeline", "Packages", "Payroll"], link: null, shots: ["/projects/sohrab.webp"] },
  { id: "moonstar-portal", tab: "systems", title: "Moon Star staff portal", kind: "Quotations and approvals portal",
    tags: ["Role-based access", "Quotations", "PDF reports"], link: "https://moonstar-web-five.vercel.app/portal", ...rec("moonstar-portal") },

  // SaaS
  { id: "microservice", tab: "saas", title: "EcomMS", kind: "E-commerce platform on microservices",
    tags: ["Next.js", "TypeScript", "Microservices"], link: null,
    shots: ["/projects/microservice.webp", "/projects/microservice-2.webp"] },

  // Samples
  { id: "turf", tab: "samples", title: "turf.bd", kind: "Football turf booking demo",
    tags: ["Booking", "Offers", "Demo"], link: "https://turf-sigma-nine.vercel.app", ...rec("turf") },
  { id: "turf-admin", tab: "samples", title: "turf.bd admin", kind: "Venue admin demo",
    tags: ["Admin", "Demo"], link: "https://turf-sigma-nine.vercel.app/admin/login", ...rec("turf-admin") },
  { id: "moonstar-demo", tab: "samples", title: "Moon Star demo site", kind: "Demo copy of a company site",
    tags: ["Demo", "Consultation form"], link: "https://moonstar-demo-web.vercel.app", ...rec("moonstar-demo") },
  { id: "singledot-v2", tab: "samples", title: "Single Dot Studio v2", kind: "Redesign concept",
    tags: ["Redesign", "Calculator"], link: "https://singledotstudio-v2.vercel.app", ...rec("singledot-v2") },
];

// "How we work": four steps, an icon each, one short line.
export const PROCESS = [
  { icon: "brief", title: "Brief", text: "Tell us the goal. We map how your business works." },
  { icon: "design", title: "Design", text: "Your brand, your content. Never a template." },
  { icon: "build", title: "Build", text: "Working pages from week one." },
  { icon: "launch", title: "Launch & care", text: "We ship it, then keep it fast and safe." },
];

// "Services": what we build, right after the hero. Shown as text: the title and its tags as one line.
export const SERVICES = [
  { icon: "browser", title: "Websites", tags: ["Brand sites", "Stores", "Landing pages"] },
  { icon: "cloud", title: "SaaS products", tags: ["Dashboards", "Auth and billing", "Microservices"] },
  { icon: "phone", title: "Apps", tags: ["Mobile", "Web apps", "Product design"] },
  { icon: "code", title: "Custom software", tags: ["Quotation engines", "Calculators", "Integrations"] },
  { icon: "database", title: "Management systems", tags: ["ERP", "CRM", "Staff portals"] },
];
