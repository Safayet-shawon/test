import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

// Sends email through SMTP (any provider: Google Workspace, Zoho, Hostinger, cPanel, ...) or Resend.
// Set these in Vercel → Settings → Environment Variables (never commit them):
//   SMTP_HOST, SMTP_PORT (465 or 587), SMTP_USER, SMTP_PASS   — the info@zerosoft26.com mailbox
//   or RESEND_API_KEY                                           — if you use Resend instead
//   MAIL_FROM  (optional) default: "zerosoft <info@zerosoft26.com>"
//   MAIL_TO    (optional) where new requests are sent; default: info@zerosoft26.com
export const MAIL_FROM = process.env.MAIL_FROM || "zerosoft <info@zerosoft26.com>";
export const MAIL_TO = process.env.MAIL_TO || "info@zerosoft26.com";

export type Mail = { to: string; subject: string; html: string; text: string; replyTo?: string };

export function mailConfigured() {
  return Boolean(process.env.RESEND_API_KEY || (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS));
}

let transport: Transporter | undefined;
function smtp() {
  if (!transport) {
    const port = Number(process.env.SMTP_PORT || 465);
    transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transport;
}

export async function sendMail(msg: Mail) {
  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: MAIL_FROM, to: [msg.to], subject: msg.subject, html: msg.html, text: msg.text, reply_to: msg.replyTo }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    return;
  }
  await smtp().sendMail({ from: MAIL_FROM, ...msg });
}
