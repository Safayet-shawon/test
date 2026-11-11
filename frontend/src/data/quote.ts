// =============================================================================================
// QUOTATION FORM: every question, option and (later) price lives here.
// Used by the form in the browser (src/components/quote/QuoteForm.tsx) and by the server that emails the
// quotation (src/app/api/quote/route.ts), so both always agree.
//
// PRICING (to be decided): every option has `price` (BDT, one-off) and `days` (working days).
// They are `null` for now. While any chosen option has no price, the form and the emails show the
// scope only and say a detailed quotation follows. When all chosen options have prices, an
// estimate range is shown automatically (see ESTIMATE below).
// =============================================================================================


export type Option = { id: string; label: string; hint?: string; price?: number | null; days?: number | null };
export type FeatureGroup = {
  id: string;
  item?: string;
  title: string;
  type: "one" | "many";
  when: string[];
  required?: boolean;
  options: Option[];
};
export type Detail = { id: string; title: string; hint?: string; required?: boolean; options: Option[] };
export type Quote = {
  needs: string[];
  business: string;
  businessOther: string;
  features: Record<string, string | string[] | undefined>;
  details: Record<string, string | undefined>;
  existing: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  about: string;
  notes: string;
  consent: boolean;
  website: string;
};
export type LineItem = { section: string; label: string; price?: number | null; days?: number | null };
export type Estimate = { items: LineItem[]; priced: boolean; total: number; low: number; high: number; weeks: number | null };

export const CURRENCY = "BDT";

export const ESTIMATE = {
  show: true, // set false to never show numbers, even when prices are filled in
  low: 0.9, // range shown to the client: total × low ... total × high
  high: 1.2,
};

// ---- Step 1: what they need, and their business ------------------------------------------
export const NEEDS: Option[] = [
  { id: "website", label: "Website", hint: "Company site, portfolio or landing page", price: null, days: null },
  { id: "store", label: "Online store", hint: "Sell products with cart and checkout", price: null, days: null },
  { id: "system", label: "Management system", hint: "ERP, CRM, inventory, HR or staff portal", price: null, days: null },
  { id: "saas", label: "Web app / SaaS", hint: "A product your customers sign up for", price: null, days: null },
  { id: "mobile", label: "Mobile app", hint: "Android and iOS", price: null, days: null },
  { id: "custom", label: "Custom software", hint: "Calculators, quotation engines, automation", price: null, days: null },
];

export const BUSINESS_TYPES = [
  "Retail and e-commerce",
  "Garments and manufacturing",
  "Travel, Hajj and tourism",
  "Real estate and construction",
  "Architecture and interiors",
  "Engineering and power",
  "Healthcare and clinics",
  "Education and training",
  "Restaurants and food",
  "Professional services",
  "Non-profit",
  "Other",
];

// ---- Step 2: features, shown only for what they picked in step 1 --------------------------
// `when`: the group appears if ANY of these needs is selected. `type`: "one" or "many".
export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: "pages",
    item: "Website pages", // short name used in the scope list
    title: "How many pages will the website have?",
    type: "one",
    when: ["website"],
    required: true,
    options: [
      { id: "p5", label: "1 to 5", price: null, days: null },
      { id: "p10", label: "6 to 10", price: null, days: null },
      { id: "p20", label: "11 to 20", price: null, days: null },
      { id: "p20plus", label: "More than 20", price: null, days: null },
    ],
  },
  {
    id: "site",
    title: "Website features",
    type: "many",
    when: ["website"],
    options: [
      { id: "cms", label: "Admin panel to edit content", price: null, days: null },
      { id: "forms", label: "Contact and quote request forms", price: null, days: null },
      { id: "blog", label: "Blog or news", price: null, days: null },
      { id: "gallery", label: "Gallery or portfolio", price: null, days: null },
      { id: "booking", label: "Online booking or appointments", price: null, days: null },
      { id: "chat", label: "WhatsApp and live chat", price: null, days: null },
      { id: "bilingual", label: "Bangla and English", price: null, days: null },
      { id: "seo", label: "SEO setup and Google Business", price: null, days: null },
    ],
  },
  {
    id: "products",
    item: "Products", // short name used in the scope list
    title: "How many products will you sell?",
    type: "one",
    when: ["store"],
    required: true,
    options: [
      { id: "s50", label: "Up to 50", price: null, days: null },
      { id: "s500", label: "51 to 500", price: null, days: null },
      { id: "s500plus", label: "More than 500", price: null, days: null },
    ],
  },
  {
    id: "store",
    title: "Store features",
    type: "many",
    when: ["store"],
    options: [
      { id: "payments", label: "Online payments (bKash, Nagad, cards)", price: null, days: null },
      { id: "cod", label: "Cash on delivery", price: null, days: null },
      { id: "courier", label: "Courier and delivery tracking", price: null, days: null },
      { id: "coupons", label: "Discount codes and offers", price: null, days: null },
      { id: "accounts", label: "Customer accounts and order history", price: null, days: null },
      { id: "variants", label: "Sizes, colours and stock per variant", price: null, days: null },
    ],
  },
  {
    id: "modules",
    title: "Which parts of your business should the system run?",
    type: "many",
    when: ["system", "saas", "store", "custom"],
    options: [
      { id: "admin", label: "Admin panel and dashboard", price: null, days: null },
      { id: "staff", label: "Staff, roles and permissions", price: null, days: null },
      { id: "hr", label: "Attendance, leave and payroll", price: null, days: null },
      { id: "inventory", label: "Inventory and warehouses", price: null, days: null },
      { id: "sales", label: "Sales, orders and invoices", price: null, days: null },
      { id: "purchase", label: "Purchasing and suppliers", price: null, days: null },
      { id: "crm", label: "Customers and leads (CRM)", price: null, days: null },
      { id: "accounts", label: "Accounts, expenses and payments", price: null, days: null },
      { id: "production", label: "Production planning", price: null, days: null },
      { id: "quotes", label: "Quotations and estimates", price: null, days: null },
      { id: "scheduling", label: "Bookings and scheduling", price: null, days: null },
      { id: "reports", label: "Reports and analytics", price: null, days: null },
    ],
  },
  {
    id: "users",
    item: "Staff users", // short name used in the scope list
    title: "How many staff will use the system?",
    type: "one",
    when: ["system", "saas", "custom"],
    required: true,
    options: [
      { id: "u5", label: "1 to 5", price: null, days: null },
      { id: "u20", label: "6 to 20", price: null, days: null },
      { id: "u100", label: "21 to 100", price: null, days: null },
      { id: "u100plus", label: "More than 100", price: null, days: null },
    ],
  },
  {
    id: "saas",
    title: "SaaS features",
    type: "many",
    when: ["saas"],
    options: [
      { id: "signup", label: "Customer sign-up and accounts", price: null, days: null },
      { id: "billing", label: "Subscriptions and billing", price: null, days: null },
      { id: "tenants", label: "Separate data for each customer", price: null, days: null },
      { id: "api", label: "Public API", price: null, days: null },
    ],
  },
  {
    id: "platforms",
    item: "Platforms", // short name used in the scope list
    title: "Which phones should the app run on?",
    type: "one",
    when: ["mobile"],
    required: true,
    options: [
      { id: "android", label: "Android", price: null, days: null },
      { id: "ios", label: "iPhone (iOS)", price: null, days: null },
      { id: "both", label: "Both", price: null, days: null },
    ],
  },
  {
    id: "app",
    title: "App features",
    type: "many",
    when: ["mobile"],
    options: [
      { id: "push", label: "Push notifications", price: null, days: null },
      { id: "offline", label: "Works offline", price: null, days: null },
      { id: "maps", label: "Maps and location", price: null, days: null },
      { id: "camera", label: "Camera and file uploads", price: null, days: null },
      { id: "inapp", label: "In-app payments", price: null, days: null },
    ],
  },
  {
    id: "integrations",
    title: "Connections and extras",
    type: "many",
    when: ["website", "store", "system", "saas", "mobile", "custom"],
    options: [
      { id: "sms", label: "SMS notifications", price: null, days: null },
      { id: "email", label: "Email notifications", price: null, days: null },
      { id: "import", label: "Import existing data (Excel, old system)", price: null, days: null },
      { id: "pdf", label: "PDF documents (invoices, quotations)", price: null, days: null },
      { id: "maps", label: "Google Maps", price: null, days: null },
    ],
  },
];

// ---- Step 3: scope -------------------------------------------------------------------------
export const DETAILS: Detail[] = [
  {
    id: "timeline",
    title: "When do you need it?",
    required: true,
    options: [
      { id: "asap", label: "Within a month" },
      { id: "q1", label: "1 to 3 months" },
      { id: "q2", label: "3 to 6 months" },
      { id: "flex", label: "Flexible" },
    ],
  },
  {
    id: "budget",
    title: "Budget range",
    hint: "Optional. It helps us suggest the right scope.",
    options: [
      { id: "b1", label: "Under ৳50,000" },
      { id: "b2", label: "৳50,000 to ৳1,50,000" },
      { id: "b3", label: "৳1,50,000 to ৳5,00,000" },
      { id: "b4", label: "৳5,00,000 to ৳15,00,000" },
      { id: "b5", label: "Above ৳15,00,000" },
      { id: "unsure", label: "Not sure yet" },
    ],
  },
  {
    id: "branding",
    title: "Branding",
    options: [
      { id: "full", label: "We have a logo and brand colours" },
      { id: "logo", label: "We have a logo only" },
      { id: "none", label: "We need a logo and branding", price: null, days: null },
    ],
  },
  {
    id: "care",
    title: "Hosting and maintenance after launch",
    options: [
      { id: "yes", label: "Yes, look after it for us" },
      { id: "unsure", label: "Not sure yet" },
      { id: "no", label: "No, we will manage it" },
    ],
  },
];

export const STEPS = [
  { id: "project", label: "Project" },
  { id: "features", label: "Features" },
  { id: "details", label: "Scope" },
  { id: "contact", label: "Your details" },
  { id: "review", label: "Review" },
];

export const EMPTY: Quote = {
  needs: [],
  business: "",
  businessOther: "",
  features: {}, // groupId -> optionId (one) or [optionId] (many)
  details: {}, // detailId -> optionId
  existing: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  about: "",
  notes: "",
  consent: false,
  website: "", // honeypot: real people never see or fill this
};

// ---------------------------------------------------------------------------------------------
// Helpers shared by the form and the server
// ---------------------------------------------------------------------------------------------
export const visibleGroups = (q: Quote) => FEATURE_GROUPS.filter((g) => g.when.some((n) => q.needs.includes(n)));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

// Errors for one step (or all steps when `step` is omitted). Keys are field ids.
export function validate(q: Quote, step?: string) {
  const e: Record<string, string> = {};
  const on = (s: string) => step === undefined || step === s;
  if (on("project")) {
    if (!q.needs.length) e.needs = "Pick at least one thing you need.";
    if (!q.business) e.business = "Choose the type of business.";
    if (q.business === "Other" && !q.businessOther.trim()) e.businessOther = "Tell us the type of business.";
  }
  if (on("features")) {
    for (const g of visibleGroups(q)) {
      if (g.required && !q.features[g.id]) e[`f-${g.id}`] = "Choose one option.";
    }
  }
  if (on("details")) {
    for (const d of DETAILS) if (d.required && !q.details[d.id]) e[`d-${d.id}`] = "Choose one option.";
  }
  if (on("contact")) {
    if (!q.name.trim()) e.name = "Add your name so we know who to reply to.";
    if (!q.email.trim()) e.email = "Add your email so we can send the quotation.";
    else if (!EMAIL_RE.test(q.email.trim())) e.email = "This email looks incomplete. Check for a missing @ or domain.";
    if (!q.phone.trim()) e.phone = "Add a phone number so we can call about details.";
    else if (!PHONE_RE.test(q.phone.trim())) e.phone = "Use digits only, e.g. 01712 345678 or +880 1712 345678.";
    if (q.about.trim().length < 20) e.about = "Tell us a little more: two or three sentences is enough.";
    if (!q.consent) e.consent = "Please agree so we can contact you about this quotation.";
  }
  return e;
}

// Server-side cleanup: keep only known ids and trim/limit text, so emails never carry junk.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sanitize(input: any): Quote {
  const q: Quote = { ...EMPTY, needs: [], features: {}, details: {} };
  const txt = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const needIds = new Set(NEEDS.map((n) => n.id));
  q.needs = Array.isArray(input?.needs) ? [...new Set<string>(input.needs.filter((n: string) => needIds.has(n)))] : [];
  q.business = BUSINESS_TYPES.includes(input?.business) ? input.business : "";
  q.businessOther = txt(input?.businessOther, 80);
  for (const g of visibleGroups(q)) {
    const ids = new Set(g.options.map((o) => o.id));
    const v = input?.features?.[g.id];
    if (g.type === "one" && ids.has(v)) q.features[g.id] = v;
    if (g.type === "many" && Array.isArray(v)) {
      const kept = [...new Set(v.filter((x: string) => ids.has(x)))];
      if (kept.length) q.features[g.id] = kept;
    }
  }
  for (const d of DETAILS) {
    const v = input?.details?.[d.id];
    if (d.options.some((o) => o.id === v)) q.details[d.id] = v;
  }
  q.existing = txt(input?.existing, 200);
  q.name = txt(input?.name, 100);
  q.email = txt(input?.email, 160);
  q.phone = txt(input?.phone, 30);
  q.company = txt(input?.company, 120);
  q.about = txt(input?.about, 2000);
  q.notes = txt(input?.notes, 2000);
  q.consent = input?.consent === true;
  q.website = txt(input?.website, 200);
  return q;
}

const labelOf = (list: Option[], id?: string) => list.find((o) => o.id === id)?.label || "";

// The quotation's line items (scope), in a stable order. Used for the review step and emails.
export function lineItems(q: Quote): LineItem[] {
  const items: LineItem[] = [];
  for (const id of q.needs) {
    const n = NEEDS.find((x) => x.id === id)!;
    items.push({ section: "Project", label: n.label, price: n.price, days: n.days });
  }
  for (const g of visibleGroups(q)) {
    const v = q.features[g.id];
    if (!v) continue;
    const ids = Array.isArray(v) ? v : [v];
    for (const id of ids) {
      const o = g.options.find((x) => x.id === id)!;
      const label = g.type === "one" ? `${g.item || g.title.replace(/\?$/, "")}: ${o.label}` : o.label;
      items.push({ section: g.type === "one" ? "Size" : g.title, label, price: o.price, days: o.days });
    }
  }
  if (q.details.branding === "none") {
    const o = DETAILS.find((d) => d.id === "branding")!.options.find((x) => x.id === "none")!;
    items.push({ section: "Extras", label: "Logo and branding", price: o.price, days: o.days });
  }
  return items;
}

// Initial estimate. `priced` is false while any chosen item has no price yet.
export function estimate(q: Quote): Estimate {
  const items = lineItems(q);
  const priced = items.length > 0 && items.every((i) => typeof i.price === "number");
  const total = items.reduce((s, i) => s + (i.price || 0), 0);
  const days = items.reduce((s, i) => s + (i.days || 0), 0);
  return {
    items,
    priced: ESTIMATE.show && priced,
    total,
    low: Math.round((total * ESTIMATE.low) / 1000) * 1000,
    high: Math.round((total * ESTIMATE.high) / 1000) * 1000,
    weeks: days ? Math.max(1, Math.ceil(days / 5)) : null,
  };
}

// Name to greet with: skips titles and prefixes such as "Dr", "Md", "Mohammad", "Engr".
const PREFIXES = new Set(["dr", "mr", "mrs", "ms", "miss", "md", "mohammad", "mohammed", "muhammad", "mohd", "engr", "prof", "sheikh", "sk", "syed"]);
export function greetName(full: string) {
  const parts = String(full || "").trim().split(/\s+/).filter(Boolean);
  const rest = parts.filter((w, i) => i === parts.length - 1 || !PREFIXES.has(w.replace(/\./g, "").toLowerCase()));
  return rest[0] || parts[0] || "there";
}

export const money = (n: number) => `৳${Math.round(n).toLocaleString("en-IN")}`;

// Plain summary rows for the review step and emails: [label, value].
// `only: "details"` returns just the business and timeline/budget rows (no feature lists).
export function summary(q: Quote, only?: "details"): [string, string][] {
  const rows: [string, string][] = [];
  rows.push(["Needs", q.needs.map((id) => labelOf(NEEDS, id)).join(", ")]);
  rows.push(["Business", q.business === "Other" ? q.businessOther || "Other" : q.business]);
  for (const g of only === "details" ? [] : visibleGroups(q)) {
    const v = q.features[g.id];
    if (!v) continue;
    const ids = Array.isArray(v) ? v : [v];
    rows.push([g.item || g.title.replace(/\?$/, ""), ids.map((id) => labelOf(g.options, id)).join(", ")]);
  }
  for (const d of DETAILS) {
    if (q.details[d.id]) rows.push([d.title, labelOf(d.options, q.details[d.id])]);
  }
  if (q.existing) rows.push(["Current website or system", q.existing]);
  return rows;
}

// Reference number shown to the client and used as the email subject, e.g. ZS-261108-K7Q2.
export function reference(date = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  const d = `${String(date.getFullYear()).slice(2)}${p(date.getMonth() + 1)}${p(date.getDate())}`;
  const r = Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, "X");
  return `ZS-${d}-${r}`;
}
