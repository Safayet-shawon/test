import { sanitize, validate, estimate, reference } from "@/data/quote";
import { clientEmail, teamEmail } from "@/lib/quoteEmail";
import { sendMail, mailConfigured, MAIL_TO } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Best-effort limit per IP (per server instance): 5 requests per 10 minutes.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

const json = (body, status = 200) => Response.json(body, { status });

export async function POST(req) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (limited(ip)) return json({ ok: false, error: "Too many requests." }, 429);

  let input;
  try {
    input = await req.json();
  } catch {
    return json({ ok: false, error: "We couldn't read your request." }, 400);
  }
  const q = sanitize(input);
  const ref = reference();
  const est = estimate(q);

  // Bots fill the hidden field: pretend it worked, send nothing.
  if (q.website) return json({ ok: true, ref, delivered: false });

  const errors = validate(q);
  if (Object.keys(errors).length) return json({ ok: false, error: "Some answers are missing. Go back and check each step.", errors }, 400);

  if (!mailConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[quote] mail not configured; would send ${ref} for ${q.email}`);
      return json({ ok: true, ref, delivered: false, estimate: est });
    }
    console.error("[quote] SMTP_* or RESEND_API_KEY is not set");
    return json({ ok: false, error: "Our quotation inbox is not connected yet." }, 503);
  }

  // 1) to us first, so a lead is never lost (reply goes to the client).
  //    If this fails, the client sees an error and can try again.
  try {
    const t = teamEmail(q, ref, est, { time: new Date().toISOString() });
    await sendMail({ to: MAIL_TO, replyTo: `${q.name.replace(/["<>]/g, "")} <${q.email}>`, ...t });
  } catch (e) {
    console.error("[quote] team email failed", ref, e?.message);
    return json({ ok: false, error: "Your request didn't send." }, 502);
  }
  // 2) to the client (reply comes to us). If only this fails, we still have the request.
  let clientDelivered = false;
  try {
    const c = clientEmail(q, ref, est);
    await sendMail({ to: q.email, replyTo: MAIL_TO, ...c });
    clientDelivered = true;
  } catch (e) {
    console.error("[quote] client email failed", ref, e?.message);
  }
  return json({ ok: true, ref, delivered: clientDelivered, estimate: est });
}
