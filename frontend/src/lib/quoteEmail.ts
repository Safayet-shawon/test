import { summary, money, greetName, type Quote, type Estimate } from "@/data/quote";
import { SITE } from "@/data/site";

const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => (({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }) as Record<string, string>)[c]);
const nl = (s: string) => esc(s).replace(/\n/g, "<br>");
const address = `${SITE.address.line1}, ${SITE.address.city} ${SITE.address.postcode}, ${SITE.address.country}`;

function layout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f1e8d8;font-family:Arial,Helvetica,sans-serif;color:#141311">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1e8d8;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden">
<tr><td style="padding:22px 28px;background:#141311;color:#ffffff;font-size:20px;letter-spacing:-0.3px"><b>zero</b>soft</td></tr>
<tr><td style="padding:28px">
<h1 style="margin:0 0 16px;font-size:22px;line-height:1.3">${esc(title)}</h1>
${body}
</td></tr>
<tr><td style="padding:18px 28px;background:#f8f5ef;color:#6e6559;font-size:12px;line-height:1.6">
zerosoft · ${esc(address)}<br>
<a href="mailto:${SITE.email}" style="color:#7a4527">${SITE.email}</a>${SITE.phone ? ` · ${esc(SITE.phone)}` : ""} · <a href="${SITE.url}" style="color:#7a4527">${SITE.url.replace(/^https?:\/\//, "")}</a>
</td></tr></table></td></tr></table></body></html>`;
}

const table = (rows: [string, string][]) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;line-height:1.5;margin:0 0 20px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:9px 12px 9px 0;border-bottom:1px solid #e6d3b6;color:#6e6559;vertical-align:top;width:38%">${esc(k)}</td><td style="padding:9px 0;border-bottom:1px solid #e6d3b6;vertical-align:top">${v}</td></tr>`
    )
    .join("")}</table>`;

const items = (est: Estimate) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;line-height:1.5;margin:0 0 8px">${est.items
    .map(
      (i) =>
        `<tr><td style="padding:7px 0;border-bottom:1px solid #e6d3b6">${esc(i.label)}</td><td align="right" style="padding:7px 0;border-bottom:1px solid #e6d3b6;white-space:nowrap">${est.priced ? money(i.price ?? 0) : ""}</td></tr>`
    )
    .join("")}</table>`;

const estimateBlock = (est: Estimate) =>
  est.priced
    ? `<p style="margin:12px 0 20px;padding:14px 16px;background:#f1e8d8;border-radius:10px;font-size:15px">Initial estimate: <b>${money(est.low)} to ${money(est.high)}</b>${est.weeks ? `, about ${est.weeks} weeks` : ""}.<br><span style="color:#6e6559;font-size:13px">A final price follows after a short call to confirm the details.</span></p>`
    : `<p style="margin:12px 0 20px;padding:14px 16px;background:#f1e8d8;border-radius:10px;font-size:14px">We are preparing a detailed, itemised quotation for this scope. You will receive it within one business day.</p>`;

// Email to the client
export function clientEmail(q: Quote, ref: string, est: Estimate) {
  const first = greetName(q.name);
  const body = `
<p style="margin:0 0 14px;font-size:15px;line-height:1.6">Hi ${esc(first)},</p>
<p style="margin:0 0 20px;font-size:15px;line-height:1.6">Thank you for your request. Here is the scope we received. Your reference is <b>${esc(ref)}</b>.</p>
<h2 style="margin:0 0 6px;font-size:16px">Scope</h2>
${items(est)}
${estimateBlock(est)}
<h2 style="margin:0 0 6px;font-size:16px">Project details</h2>
${table(summary(q, "details").map(([k, v]) => [k, esc(v)]))}
<h2 style="margin:0 0 8px;font-size:16px">What happens next</h2>
<ol style="margin:0 0 20px;padding-left:18px;font-size:14px;line-height:1.7">
<li>We review your request and may call you to clarify a few details.</li>
<li>You receive a detailed quotation with timeline and payment milestones.</li>
<li>Once you approve, we start with the design.</li>
</ol>
<p style="margin:0;font-size:14px;line-height:1.6">To add or change anything, just reply to this email.</p>
<p style="margin:16px 0 0;font-size:14px">The zerosoft team</p>`;
  const text = [
    `Hi ${first},`,
    "",
    `Thank you for your request. Your reference is ${ref}.`,
    "",
    "Scope:",
    ...est.items.map((i) => `- ${i.label}${est.priced ? `: ${money(i.price ?? 0)}` : ""}`),
    "",
    est.priced
      ? `Initial estimate: ${money(est.low)} to ${money(est.high)}${est.weeks ? `, about ${est.weeks} weeks` : ""}. A final price follows after a short call.`
      : "We are preparing a detailed, itemised quotation and will send it within one business day.",
    "",
    "Project details:",
    ...summary(q, "details").map(([k, v]) => `${k}: ${v}`),
    "",
    "To add or change anything, reply to this email.",
    "",
    "The zerosoft team",
    `${address} · ${SITE.email}`,
  ].join("\n");
  return { subject: `Your zerosoft quotation request ${ref}`, html: layout("Your quotation request", body), text };
}

// Email to us
export function teamEmail(q: Quote, ref: string, est: Estimate, meta: { time: string }) {
  const contact: [string, string][] = [
    ["Name", esc(q.name)],
    ["Company", esc(q.company || "-")],
    ["Email", `<a href="mailto:${esc(q.email)}">${esc(q.email)}</a>`],
    ["Phone", `<a href="tel:${esc(q.phone.replace(/[^\d+]/g, ""))}">${esc(q.phone)}</a>`],
  ];
  const body = `
<p style="margin:0 0 18px;font-size:15px">New quotation request <b>${esc(ref)}</b>. Reply to this email to answer the client directly.</p>
${table(contact)}
<h2 style="margin:0 0 6px;font-size:16px">About the business</h2>
<p style="margin:0 0 18px;font-size:14px;line-height:1.6">${nl(q.about)}</p>
${q.notes ? `<h2 style="margin:0 0 6px;font-size:16px">Notes</h2><p style="margin:0 0 18px;font-size:14px;line-height:1.6">${nl(q.notes)}</p>` : ""}
<h2 style="margin:0 0 6px;font-size:16px">Scope (${est.items.length} items)</h2>
${items(est)}
${est.priced ? `<p style="font-size:14px">Estimate sent: <b>${money(est.low)} to ${money(est.high)}</b> (total ${money(est.total)})</p>` : `<p style="font-size:14px;color:#9a3412">No prices set for this scope yet: send the client a quotation within one business day.</p>`}
<h2 style="margin:18px 0 6px;font-size:16px">Answers</h2>
${table(summary(q).map(([k, v]) => [k, esc(v)]))}
<p style="margin:0;font-size:12px;color:#6e6559">Received ${esc(meta.time)}. The client was sent a copy of this scope.</p>`;
  const text = [
    `New quotation request ${ref}`,
    `Name: ${q.name}`,
    `Company: ${q.company || "-"}`,
    `Email: ${q.email}`,
    `Phone: ${q.phone}`,
    "",
    "About the business:",
    q.about,
    q.notes ? `\nNotes:\n${q.notes}` : "",
    "",
    "Scope:",
    ...est.items.map((i) => `- ${i.label}`),
    "",
    ...summary(q).map(([k, v]) => `${k}: ${v}`),
  ].join("\n");
  return {
    subject: `New quotation request ${ref}: ${q.name}${q.company ? `, ${q.company}` : ""}`,
    html: layout(`New request from ${q.name}`, body),
    text,
  };
}
