"use client";
import { useEffect, useRef, useState } from "react";
import { Browser, Storefront, Database, Cloud, DeviceMobile, GearSix, Check } from "@phosphor-icons/react";
import {
  NEEDS,
  BUSINESS_TYPES,
  DETAILS,
  STEPS,
  EMPTY,
  visibleGroups,
  validate,
  summary,
  estimate,
  money,
  greetName,
} from "@/data/quote";
import { SITE } from "@/data/site";
import { Arrow } from "./Icons";

const NEED_ICONS = { website: Browser, store: Storefront, system: Database, saas: Cloud, mobile: DeviceMobile, custom: GearSix };
const DRAFT_KEY = "zerosoft-quote-draft";

// ---- small building blocks ------------------------------------------------------------------
function Chip({ type, name, checked, onChange, children }) {
  return (
    <label className={`q-chip${checked ? " is-on" : ""}`}>
      <input type={type} name={name} checked={checked} onChange={onChange} />
      <span className="q-chip-box" aria-hidden="true">
        {checked && <Check size={12} weight="bold" />}
      </span>
      {children}
    </label>
  );
}

function Field({ id, label, error, hint, children }) {
  return (
    <div className={`q-field${error ? " has-error" : ""}`}>
      <label htmlFor={`q-${id}`}>{label}</label>
      {children}
      {hint && !error && <p className="q-hint">{hint}</p>}
      {error && (
        <p className="q-error" id={`q-${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}

function Group({ title, hint, error, id, children }) {
  return (
    <fieldset className={`q-group${error ? " has-error" : ""}`} id={id}>
      <legend>{title}</legend>
      {hint && <p className="q-hint">{hint}</p>}
      <div className="q-chips">{children}</div>
      {error && <p className="q-error">{error}</p>}
    </fieldset>
  );
}

// ---- the form -------------------------------------------------------------------------------
export default function QuoteForm() {
  const [q, setQ] = useState(EMPTY);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [result, setResult] = useState(null);
  const [failMsg, setFailMsg] = useState("");
  const headRef = useRef(null);
  const loaded = useRef(false);

  // restore a draft (same browser), then keep it saved
  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
      if (d?.q) {
        setQ({ ...EMPTY, ...d.q, website: "" });
        setStep(Math.min(d.step || 0, STEPS.length - 1));
      }
    } catch {}
    loaded.current = true;
  }, []);
  useEffect(() => {
    if (!loaded.current || status === "sent") return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ q: { ...q, consent: false }, step }));
    } catch {}
  }, [q, step, status]);

  const stepId = STEPS[step].id;
  const set = (patch) => setQ((p) => ({ ...p, ...patch }));
  const recheck = (next) => {
    // clear errors as soon as the field is fixed; only show new ones on blur or Continue
    const e = validate(next, stepId);
    setErrors((old) => Object.fromEntries(Object.keys(old).filter((k) => e[k]).map((k) => [k, e[k]])));
  };
  const update = (patch) => {
    const next = { ...q, ...patch };
    setQ(next);
    recheck(next);
  };

  const toggleNeed = (id) => update({ needs: q.needs.includes(id) ? q.needs.filter((n) => n !== id) : [...q.needs, id] });
  const setFeature = (g, id) => {
    const cur = q.features[g.id];
    let v = id;
    if (g.type === "many") {
      const arr = Array.isArray(cur) ? cur : [];
      v = arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
    }
    update({ features: { ...q.features, [g.id]: v } });
  };
  const setDetail = (d, id) => update({ details: { ...q.details, [d.id]: q.details[d.id] === id && !d.required ? undefined : id } });

  const blur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const e = validate(q, stepId);
    if (q[field] !== "" && e[field]) setErrors((old) => ({ ...old, [field]: e[field] }));
  };

  const go = (to) => {
    setStep(to);
    setErrors({});
    requestAnimationFrame(() => {
      headRef.current?.focus({ preventScroll: true });
      headRef.current?.closest(".q-wrap")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };
  const next = () => {
    const e = validate(q, stepId);
    if (Object.keys(e).length) {
      setErrors(e);
      const first = Object.keys(e)[0];
      requestAnimationFrame(() => {
        const el = document.getElementById(`q-${first}`) || document.getElementById(first);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        if (el?.focus && el.tagName !== "FIELDSET") el.focus({ preventScroll: true });
      });
      return;
    }
    go(step + 1);
  };

  async function submit() {
    const e = validate(q);
    if (Object.keys(e).length) {
      const bad = STEPS.findIndex((s) => Object.keys(validate(q, s.id)).length);
      go(bad);
      setTimeout(() => setErrors(validate(q, STEPS[bad].id)), 0);
      return;
    }
    setStatus("sending");
    setFailMsg("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(q),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setFailMsg(
          res.status === 429
            ? "You have sent several requests in a short time. Please wait a few minutes and try again."
            : data.error || "Your request didn't send."
        );
        setStatus("error");
        return;
      }
      setResult(data);
      setStatus("sent");
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {}
      requestAnimationFrame(() => headRef.current?.focus());
    } catch {
      setFailMsg("We couldn't reach our server. Check your connection and try again.");
      setStatus("error");
    }
  }

  const groups = visibleGroups(q);
  const est = estimate(q);
  const rows = summary(q);
  const err = (k) => errors[k];
  const aria = (k) => ({ "aria-invalid": Boolean(err(k)), "aria-describedby": err(k) ? `q-${k}-err` : undefined });

  // ---- sent ----------------------------------------------------------------------------------
  if (status === "sent" && result) {
    return (
      <div className="q-wrap">
        <div className="q-card q-done" role="status">
          <span className="q-done-ico" aria-hidden="true">
            <Check size={28} weight="bold" />
          </span>
          <h2 ref={headRef} tabIndex={-1}>
            Thank you, {greetName(q.name)}.
          </h2>
          <p className="q-ref">
            Reference <b>{result.ref}</b>
          </p>
          {result.estimate?.priced && (
            <p className="q-done-est">
              Initial estimate: <b>{money(result.estimate.low)} to {money(result.estimate.high)}</b>
              {result.estimate.weeks ? `, about ${result.estimate.weeks} weeks` : ""}
            </p>
          )}
          <p>
            {result.delivered
              ? `We have emailed a summary of your request to ${q.email}. `
              : "We have received your request. "}
            Our team will review it and send you a detailed quotation within one business day.
          </p>
          <p className="q-muted">
            Need to add something? Reply to our email or write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with
            your reference.
          </p>
          <a href="/" className="btn btn-violet">
            Back to the home page
          </a>
        </div>
      </div>
    );
  }

  // ---- steps ---------------------------------------------------------------------------------
  return (
    <div className="q-wrap">
      <ol className="q-steps" aria-label="Quotation steps">
        {STEPS.map((s, i) => (
          <li key={s.id} className={i === step ? "is-on" : i < step ? "is-done" : undefined} aria-current={i === step ? "step" : undefined}>
            {i < step ? (
              <button type="button" onClick={() => go(i)}>
                <span className="q-step-n">
                  <Check size={12} weight="bold" aria-hidden="true" />
                </span>
                <span className="q-step-l">{s.label}</span>
              </button>
            ) : (
              <span className="q-step-in">
                <span className="q-step-n">{i + 1}</span>
                <span className="q-step-l">{s.label}</span>
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="q-layout">
        <form
          className="q-card"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            stepId === "review" ? submit() : next();
          }}
        >
          {/* honeypot: hidden from people and screen readers */}
          <div className="q-hp" aria-hidden="true">
            <label>
              Website
              <input tabIndex={-1} autoComplete="off" value={q.website} onChange={(e) => set({ website: e.target.value })} />
            </label>
          </div>

          {stepId === "project" && (
            <>
              <h2 ref={headRef} tabIndex={-1}>
                What do you need?
              </h2>
              <p className="q-lead">Pick everything that applies. The next step only asks about what you choose here.</p>
              <fieldset className={`q-needs${err("needs") ? " has-error" : ""}`} id="needs">
                <legend className="sr-only">What do you need?</legend>
                {NEEDS.map((n) => {
                  const I = NEED_ICONS[n.id];
                  const on = q.needs.includes(n.id);
                  return (
                    <label key={n.id} className={`q-need${on ? " is-on" : ""}`}>
                      <input type="checkbox" checked={on} onChange={() => toggleNeed(n.id)} />
                      <span className="q-need-ico" aria-hidden="true">
                        <I size={22} />
                      </span>
                      <span className="q-need-t">{n.label}</span>
                      <span className="q-need-h">{n.hint}</span>
                      <span className="q-need-tick" aria-hidden="true">
                        {on && <Check size={12} weight="bold" />}
                      </span>
                    </label>
                  );
                })}
              </fieldset>
              {err("needs") && <p className="q-error">{err("needs")}</p>}

              <Group id="business" title="What kind of business is it for?" error={err("business")}>
                {BUSINESS_TYPES.map((b) => (
                  <Chip key={b} type="radio" name="business" checked={q.business === b} onChange={() => update({ business: b })}>
                    {b}
                  </Chip>
                ))}
              </Group>
              {q.business === "Other" && (
                <Field id="businessOther" label="Type of business" error={err("businessOther")}>
                  <input
                    id="q-businessOther"
                    value={q.businessOther}
                    onChange={(e) => update({ businessOther: e.target.value })}
                    onBlur={() => blur("businessOther")}
                    placeholder="e.g. Pharmacy chain"
                    {...aria("businessOther")}
                  />
                </Field>
              )}
            </>
          )}

          {stepId === "features" && (
            <>
              <h2 ref={headRef} tabIndex={-1}>
                Which features do you need?
              </h2>
              <p className="q-lead">Choose what fits today. We can always add more later.</p>
              {groups.map((g) => (
                <Group key={g.id} id={`f-${g.id}`} title={g.title} error={err(`f-${g.id}`)}>
                  {g.options.map((o) => {
                    const v = q.features[g.id];
                    const on = g.type === "one" ? v === o.id : Array.isArray(v) && v.includes(o.id);
                    return (
                      <Chip key={o.id} type={g.type === "one" ? "radio" : "checkbox"} name={g.id} checked={on} onChange={() => setFeature(g, o.id)}>
                        {o.label}
                      </Chip>
                    );
                  })}
                </Group>
              ))}
            </>
          )}

          {stepId === "details" && (
            <>
              <h2 ref={headRef} tabIndex={-1}>
                Timeline and budget
              </h2>
              <p className="q-lead">This helps us suggest a scope that fits.</p>
              {DETAILS.map((d) => (
                <Group key={d.id} id={`d-${d.id}`} title={d.title} hint={d.hint} error={err(`d-${d.id}`)}>
                  {d.options.map((o) => (
                    <Chip key={o.id} type="radio" name={d.id} checked={q.details[d.id] === o.id} onChange={() => setDetail(d, o.id)}>
                      {o.label}
                    </Chip>
                  ))}
                </Group>
              ))}
              <Field id="existing" label="Current website or system (optional)" hint="A link, or the name of the software you use now.">
                <input id="q-existing" value={q.existing} onChange={(e) => set({ existing: e.target.value })} placeholder="e.g. www.yourcompany.com or Excel sheets" />
              </Field>
            </>
          )}

          {stepId === "contact" && (
            <>
              <h2 ref={headRef} tabIndex={-1}>
                Where should we send the quotation?
              </h2>
              <p className="q-lead">We only use these details to reply about this project.</p>
              <div className="q-row">
                <Field id="name" label="Your name" error={err("name")}>
                  <input id="q-name" autoComplete="name" value={q.name} onChange={(e) => update({ name: e.target.value })} onBlur={() => blur("name")} {...aria("name")} />
                </Field>
                <Field id="company" label="Company (optional)">
                  <input id="q-company" autoComplete="organization" value={q.company} onChange={(e) => set({ company: e.target.value })} />
                </Field>
              </div>
              <div className="q-row">
                <Field id="email" label="Email" error={err("email")}>
                  <input id="q-email" type="email" inputMode="email" autoComplete="email" value={q.email} onChange={(e) => update({ email: e.target.value })} onBlur={() => blur("email")} {...aria("email")} />
                </Field>
                <Field id="phone" label="Phone or WhatsApp" error={err("phone")}>
                  <input id="q-phone" type="tel" inputMode="tel" autoComplete="tel" value={q.phone} onChange={(e) => update({ phone: e.target.value })} onBlur={() => blur("phone")} placeholder="01712 345678" {...aria("phone")} />
                </Field>
              </div>
              <Field id="about" label="Describe your business" error={err("about")} hint="What you do, who your customers are, and what this project should fix.">
                <textarea id="q-about" rows={4} value={q.about} onChange={(e) => update({ about: e.target.value })} onBlur={() => blur("about")} placeholder="e.g. We run 3 pharmacy branches in Dhaka and track stock in Excel. We want one system for stock, sales and staff." {...aria("about")} />
              </Field>
              <Field id="notes" label="Anything else? (optional)">
                <textarea id="q-notes" rows={3} value={q.notes} onChange={(e) => set({ notes: e.target.value })} placeholder="Deadlines, examples you like, must-have features" />
              </Field>
              <label className={`q-consent${err("consent") ? " has-error" : ""}`} id="consent">
                <input type="checkbox" checked={q.consent} onChange={(e) => update({ consent: e.target.checked })} />
                <span>
                  I agree that zerosoft may contact me about this quotation. See our <a href="/privacy">privacy policy</a>.
                </span>
              </label>
              {err("consent") && <p className="q-error">{err("consent")}</p>}
            </>
          )}

          {stepId === "review" && (
            <>
              <h2 ref={headRef} tabIndex={-1}>
                Review your request
              </h2>
              <p className="q-lead">Check the details, then send. We reply with a detailed quotation within one business day.</p>
              <dl className="q-review">
                {rows.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
                <div>
                  <dt>Contact</dt>
                  <dd>
                    {q.name}
                    {q.company ? `, ${q.company}` : ""}
                    <br />
                    {q.email} · {q.phone}
                  </dd>
                </div>
                <div>
                  <dt>About the business</dt>
                  <dd className="q-pre">{q.about}</dd>
                </div>
                {q.notes && (
                  <div>
                    <dt>Notes</dt>
                    <dd className="q-pre">{q.notes}</dd>
                  </div>
                )}
              </dl>
              {status === "error" && (
                <p className="q-fail" role="alert">
                  {failMsg} You can also email us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
                </p>
              )}
            </>
          )}

          <div className="q-nav">
            {step > 0 ? (
              <button type="button" className="btn btn-ghost" onClick={() => go(step - 1)}>
                Back
              </button>
            ) : (
              <span />
            )}
            <span className="q-count">
              Step {step + 1} of {STEPS.length}
            </span>
            <button type="submit" className="btn btn-violet" disabled={status === "sending"}>
              {stepId === "review"
                ? status === "sending"
                  ? "Sending…"
                  : "Send quotation request"
                : `Continue to ${STEPS[step + 1].label.toLowerCase()}`}
              {status !== "sending" && <Arrow />}
            </button>
          </div>
        </form>

        {/* live scope summary */}
        <aside className={`q-side${est.items.length ? "" : " is-empty"}`} aria-label="Your quotation so far">
          <h3>Your quotation</h3>
          {est.items.length === 0 ? (
            <p className="q-muted">Choose what you need and your scope builds up here.</p>
          ) : (
            <ul className="q-items">
              {est.items.map((it, i) => (
                <li key={i}>
                  <span>{it.label}</span>
                  {est.priced && <span className="q-price">{money(it.price)}</span>}
                </li>
              ))}
            </ul>
          )}
          <div className="q-side-foot">
            {est.priced ? (
              <p>
                Estimate <b>{money(est.low)} to {money(est.high)}</b>
                {est.weeks ? <span> · about {est.weeks} weeks</span> : null}
              </p>
            ) : (
              <p className="q-muted">
                {est.items.length} item{est.items.length === 1 ? "" : "s"} selected. You get a detailed, itemised
                quotation by email.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
