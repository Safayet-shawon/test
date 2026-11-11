// All company facts and copy live here. Everything below comes from the live zerosoft26.com
// site and its source; nothing is invented. Edit freely.

export const SITE = {
  name: "zerosoft",
  url: "https://zerosoft26.com",
  // Quotations are sent from and to this inbox (see src/app/api/quote/route.ts).
  email: "info@zerosoft26.com",
  phone: "", // e.g. "+880 1XXX-XXXXXX". Shown in the footer when set.
  address: {
    line1: "Road 32, Mohakhali DOHS",
    city: "Dhaka",
    postcode: "1206",
    country: "Bangladesh",
  },
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Road+32+Mohakhali+DOHS+Dhaka+1206",
  // Footer links, e.g. { label: "LinkedIn", href: "https://www.linkedin.com/company/..." }. Empty = hidden.
  socials: [] as { label: string; href: string }[],
  tagline: "Software for any business.",
  description:
    "zerosoft designs and builds websites, web apps and SaaS for any business, and looks after them once they're live.",
};

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/after-launch", label: "After launch" },
  { href: "/about", label: "About" },
];

export type Service = { id: string; title: string; line: string; tags: string[]; text: string };

// What we build. Titles and tags are the live site's; `text` expands them without adding claims.
export const SERVICES: Service[] = [
  {
    id: "websites",
    title: "Websites",
    line: "Brand sites, stores and landing pages.",
    tags: ["Brand sites", "Stores", "Landing pages"],
    text: "Company sites, portfolios and online stores, designed around your brand and content, never a bought theme.",
  },
  {
    id: "saas",
    title: "SaaS products",
    line: "Products many customers sign up for.",
    tags: ["Dashboards", "Auth and billing", "Microservices"],
    text: "Sign-up, accounts, billing and dashboards, on an architecture that can grow into separate services.",
  },
  {
    id: "apps",
    title: "Apps",
    line: "Mobile, web apps and product design.",
    tags: ["Mobile", "Web apps", "Product design"],
    text: "Android, iOS and web apps, from the first screen design to the build.",
  },
  {
    id: "custom",
    title: "Custom software",
    line: "Quotation engines, calculators, integrations.",
    tags: ["Quotation engines", "Calculators", "Integrations"],
    text: "The tool your business needs and can't buy off the shelf: estimates, PDFs, automation and connections.",
  },
  {
    id: "systems",
    title: "Management systems",
    line: "ERP, CRM and staff portals.",
    tags: ["ERP", "CRM", "Staff portals"],
    text: "The software a business runs on: inventory, production, sales, HR and the reports that tie them together.",
  },
];

export const PROCESS = [
  { title: "Brief", text: "Tell us the goal. We map how your business works.", detail: "How customers find you, what they ask, where the day gets stuck. Only then do we draw a single screen." },
  { title: "Design", text: "Your brand, your content. Never a template.", detail: "Real colours, real words and real photographs, so the result is unmistakably yours." },
  { title: "Build", text: "Working pages from week one.", detail: "The hands that sketch your screens write the code. You see progress, not status reports." },
  { title: "Launch & care", text: "We ship it, then keep it fast and safe.", detail: "Hosting, monitoring, backups and updates, so it works as hard a year from now." },
];

export const CARE = [
  ["Maintenance", "Updates, security patches and fixes, with uptime alerts that reach us before your customers notice."],
  ["Traffic", "Caching, a CDN and load balancing, so a busy launch day doesn't take the site down."],
  ["Scaling", "Capacity that grows with demand and shrinks when it's quiet, so you only pay for what you use."],
  ["Databases", "Migrations, tuning and access control for PostgreSQL, MySQL and Redis as your data grows."],
  ["Backups", "Automated, encrypted backups, with restores we test before you ever need one."],
] as const;

export const ABOUT = [
  {
    no: "i.",
    kicker: "The beginning",
    title: ["Every good thing we build begins with a ", "blank page."],
    text: [
      "No bought theme. No template with your logo dropped in.",
      "We sit with you first: how customers find you, what they ask, where the day gets stuck. Only then do we draw a single screen.",
    ],
  },
  {
    no: "ii.",
    kicker: "The workshop",
    title: ["One team. One table. ", "No hand-offs."],
    text: [
      "The hands that sketch your screens are the hands that write the code.",
      "Ideas don't get lost between departments, because there are none. You talk to the people building it, and you see working pages from the first week.",
    ],
  },
  {
    no: "iii.",
    kicker: "The long run",
    title: ["Launch day is only the ", "middle of the story."],
    text: [
      "We host what we build, watch it, back it up and keep making it better.",
      "The site you paid for should be working just as hard a year from now.",
    ],
  },
];

// ---------------------------------------------------------------------------------------------
// WORK. Media: `shots` (screenshots in /public/projects) or `video` (a scroll recording in
// /public/video/<id>.mp4 with <id>.poster.jpg). `link` shows a "Visit" button.
// ---------------------------------------------------------------------------------------------
export type Project = {
  id: string;
  tag: string;
  title: string;
  blurb: string;
  stack: string[];
  result: string;
  link: string | null;
  image: string;
  video?: string;
};

// Home page "Selected work", in order.
export const FEATURED: Project[] = [
  {
    id: "singledot",
    tag: "Website + admin",
    title: "Single Dot Studio",
    blurb:
      "An interior design site with a live cost calculator. Visitors size their rooms, get an instant estimate and receive a PDF quote by email.",
    stack: ["Next.js", "Postgres", "Redis"],
    result: "Public site, cost calculator, quotation PDFs, admin panel",
    link: "https://singledotstudio.com",
    image: "/projects/singledot.webp",
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
    image: "/projects/winner.webp",
  },
  {
    id: "moonstar",
    tag: "Website + portal",
    title: "Moon Star Power & Technology",
    blurb:
      "A company website for a power-equipment supplier, plus a private staff portal for quotations, approvals and engineering load sizing.",
    stack: ["Next.js", "Express", "PostgreSQL"],
    result: "Company site, staff portal, quotation engine",
    link: "https://moonstar-web-five.vercel.app",
    image: "/projects/moonstar.webp",
  },
  {
    id: "unifab",
    tag: "Website",
    title: "UNIFAB",
    blurb:
      "A scroll-driven storefront for one concept garment, a sandstone cotton panjabi: a real-time 3D scene walks through the cloth, the cut, the stitch and the finished looks.",
    stack: ["three.js", "GSAP", "Lenis"],
    result: "Fashion label with a 3D scroll story",
    link: "https://cinematic-clothing.vercel.app",
    image: "/projects/unifab.webp",
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
    image: "/projects/architect.webp",
  },
];

export const WORK_TABS = [
  { id: "all", label: "All" },
  { id: "websites", label: "Websites" },
  { id: "systems", label: "Management systems" },
  { id: "saas", label: "SaaS" },
  { id: "samples", label: "Samples" },
] as const;

export const SECTORS: Record<string, string> = {
  apparel: "Apparel and fashion",
  power: "Power and engineering",
  design: "Architecture, interiors and construction",
  lighting: "Lighting and home automation",
  travel: "Travel and pilgrimage",
  pets: "Pets",
  digital: "Digital products",
};

export type WorkItem = {
  id: string;
  tab: "websites" | "systems" | "saas" | "samples";
  sector?: keyof typeof SECTORS;
  title: string;
  kind: string;
  tags: string[];
  link: string | null;
  image: string;
  video?: string;
};

const rec = (id: string) => ({ video: `/video/${id}.mp4`, image: `/video/${id}.poster.jpg` });

export const ALL_WORK: WorkItem[] = [
  // Websites
  { id: "winner-site", tab: "websites", sector: "apparel", title: "Winner Apparels", kind: "Garment manufacturer website", tags: ["Collections", "Request a quote", "FAQ"], link: "https://winner-apparels-site.vercel.app", ...rec("winner-site") },
  { id: "unifab", tab: "websites", sector: "apparel", title: "UNIFAB", kind: "Fashion label with a 3D scroll story", tags: ["three.js", "GSAP", "Vite"], link: "https://cinematic-clothing.vercel.app", image: "/projects/unifab.webp" },
  { id: "moonstar", tab: "websites", sector: "power", title: "Moon Star Power & Technology", kind: "Power equipment company website", tags: ["Next.js", "Express", "PostgreSQL"], link: "https://moonstar-web-five.vercel.app", image: "/projects/moonstar.webp" },
  { id: "alphatek", tab: "websites", sector: "power", title: "Alphatek Engineering", kind: "Industrial automation website", tags: ["Products", "Brands", "Request a quote"], link: "https://alphatek-engineering.vercel.app", ...rec("alphatek") },
  { id: "singledot", tab: "websites", sector: "design", title: "Single Dot Studio", kind: "Interior design website with a cost calculator", tags: ["Next.js", "PostgreSQL", "PDF quotes"], link: "https://singledotstudio.com", image: "/projects/singledot.webp" },
  { id: "kolpo", tab: "websites", sector: "design", title: "KOLPO", kind: "Architecture and construction website", tags: ["Projects", "Services", "Journal"], link: "https://kolpo-tau.vercel.app", ...rec("kolpo") },
  { id: "architect", tab: "websites", sector: "design", title: "Architect Shakil", kind: "Personal portfolio", tags: ["Next.js", "NestJS", "Galleries"], link: "https://arshakil.vercel.app", image: "/projects/architect.webp" },
  { id: "wadia", tab: "websites", sector: "lighting", title: "WADIA", kind: "Lighting and home automation store", tags: ["Shop", "Room planner", "Before and after"], link: "https://wahdialights.vercel.app", ...rec("wadia") },
  { id: "sohrab", tab: "websites", sector: "travel", title: "Sohrab Air International", kind: "Bilingual Hajj, Umrah and ticketing website", tags: ["Bangla + English", "Packages", "Requests"], link: null, image: "/projects/sohrab-2.webp" },
  { id: "tomadachis", tab: "websites", sector: "pets", title: "tomadachis", kind: "Pet care platform", tags: ["Shop", "Vet booking", "Adoption"], link: "https://tomadachis.com", image: "/projects/tomadachis.webp" },
  { id: "praxivon", tab: "websites", sector: "digital", title: "Praxivon Labs", kind: "Studio website", tags: ["Brand site"], link: "https://praxivonlabs-nine.vercel.app", ...rec("praxivon") },

  // Management systems
  { id: "winner-erp", tab: "systems", title: "Winner Apparels ERP", kind: "Garment factory management system", tags: ["Inventory", "Production", "HR and payroll"], link: "https://winner-apparels-erp.vercel.app", image: "/projects/winner.webp" },
  { id: "sohrab-crm", tab: "systems", title: "Sohrab Air CRM", kind: "Travel agency CRM", tags: ["Lead pipeline", "Packages", "Payroll"], link: null, image: "/projects/sohrab.webp" },
  { id: "moonstar-portal", tab: "systems", title: "Moon Star staff portal", kind: "Quotations and approvals portal", tags: ["Role-based access", "Quotations", "PDF reports"], link: "https://moonstar-web-five.vercel.app/portal", ...rec("moonstar-portal") },

  // SaaS
  { id: "microservice", tab: "saas", title: "EcomMS", kind: "E-commerce platform on microservices", tags: ["Next.js", "TypeScript", "Microservices"], link: null, image: "/projects/microservice.webp" },

  // Samples (demo builds; their content is fictional)
  { id: "turf", tab: "samples", title: "turf.bd", kind: "Football turf booking demo", tags: ["Booking", "Offers", "Demo"], link: "https://turf-sigma-nine.vercel.app", ...rec("turf") },
  { id: "turf-admin", tab: "samples", title: "turf.bd admin", kind: "Venue admin demo", tags: ["Admin", "Demo"], link: "https://turf-sigma-nine.vercel.app/admin/login", ...rec("turf-admin") },
  { id: "moonstar-demo", tab: "samples", title: "Moon Star demo site", kind: "Demo copy of a company site", tags: ["Demo", "Consultation form"], link: "https://moonstar-demo-web.vercel.app", ...rec("moonstar-demo") },
  { id: "singledot-v2", tab: "samples", title: "Single Dot Studio v2", kind: "Redesign concept", tags: ["Redesign", "Calculator"], link: "https://singledotstudio-v2.vercel.app", ...rec("singledot-v2") },
];

export const STATS = [
  { n: ALL_WORK.length, label: "projects shipped" },
  { n: Object.keys(SECTORS).length, label: "industries served" },
  { n: 1, label: "team, design to hosting" },
];

export const fullAddress = `${SITE.address.line1}, ${SITE.address.city} ${SITE.address.postcode}, ${SITE.address.country}`;
