// ---- Edit me: all copy / contact details live here ----
export const SITE = {
  name: "prixon",
  // Contact form opens the visitor's mail app addressed to this email.
  email: "hello@prixon.dev",
};

// Businesses cycled in the hero animation (object -> website).
export const BUSINESSES = [
  {
    kind: "pizza",
    label: "pizza shops",
    url: "slicehouse.com",
    name: "Slice House",
    nav: ["Menu", "Story", "Order"],
    headline: "Hot. Cheesy. At your door.",
    sub: "Stone-baked pies in 20 minutes.",
    cta: "Order now",
    bg: "#FFF3DC",
    fg: "#2B1408",
    accent: "#E8230A",
    items: [
      ["Margherita", "$11"],
      ["Pepperoni", "$13"],
      ["Truffle", "$16"],
    ],
  },
  {
    kind: "sneaker",
    label: "sneaker drops",
    url: "kicksmith.co",
    name: "KICKSMITH",
    nav: ["Drops", "Men", "Cart"],
    headline: "Limited kicks. Zero restocks.",
    sub: "Next drop in 02:14:09.",
    cta: "Get notified",
    bg: "#0E1220",
    fg: "#FFFFFF",
    accent: "#FF2400",
    items: [
      ["AirLoom 01", "$140"],
      ["Volt Low", "$120"],
      ["Mono Hi", "$160"],
    ],
  },
  {
    kind: "coffee",
    label: "coffee brands",
    url: "brewline.shop",
    name: "brewline",
    nav: ["Beans", "Subscribe", "Cart"],
    headline: "Fresh roast, every Monday.",
    sub: "Small-batch beans, subscribe & skip anytime.",
    cta: "Start my box",
    bg: "#EFE6DA",
    fg: "#2A1A12",
    accent: "#1034A6",
    items: [
      ["Ethiopia", "$18"],
      ["Colombia", "$16"],
      ["House blend", "$14"],
    ],
  },
];

// Sample projects — replace with your real work.
// Add `video: "/videos/yourclip.mp4"` to show a real recorded clip instead of the animated loop.
export const PROJECTS = [
  {
    id: "flowdesk",
    variant: "dash",
    tag: "SaaS",
    title: "Flowdesk",
    blurb: "Analytics dashboard for fast-moving ops teams. Live charts, dark mode, zero clutter.",
    stack: ["Next.js", "Postgres", "Stripe"],
    result: "Launched in 5 weeks",
    video: null,
  },
  {
    id: "slicehouse",
    variant: "order",
    tag: "Website",
    title: "Slice House",
    blurb: "Pizza ordering that feels like a game. Build-your-pie, live tracker, one-tap reorder.",
    stack: ["Next.js", "Sanity", "Vercel"],
    result: "+38% online orders",
    video: null,
  },
  {
    id: "kicksmith",
    variant: "shop",
    tag: "Product",
    title: "Kicksmith",
    blurb: "Sneaker drop store with countdowns, queue rooms and checkout that survives the rush.",
    stack: ["Next.js", "Shopify", "Edge"],
    result: "Sold out in 11 min",
    video: null,
  },
  {
    id: "brewline",
    variant: "sub",
    tag: "Product",
    title: "Brewline",
    blurb: "Coffee subscription flow: pick, pause, skip, gift. Tiny taps, big retention.",
    stack: ["Next.js", "Stripe", "Resend"],
    result: "2x repeat customers",
    video: null,
  },
];
