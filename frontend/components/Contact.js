"use client";
import { useState } from "react";
import { SITE } from "@/data/site";
import Reveal from "./Reveal";
import { Arrow } from "./Icons";

// Set NEXT_PUBLIC_FORM_ENDPOINT (e.g. a Formspree URL) to send messages directly.
// Without it, the form opens the visitor's email app addressed to SITE.email.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function check(name, value) {
  const v = value.trim();
  if (name === "name" && !v) return "Add your name so we know who to reply to.";
  if (name === "email" && !v) return "Add your email so we can reply.";
  if (name === "email" && !EMAIL_RE.test(v)) return "This email looks incomplete. Check for a missing @ or domain.";
  if (name === "project" && v.length < 10) return "Tell us a little more: a sentence or two is enough.";
  return "";
}

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", project: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: check(name, value) }));
  };
  const onBlur = (e) => {
    const { name, value } = e.target;
    if (value) setErrors((er) => ({ ...er, [name]: check(name, value) }));
  };

  async function submit(e) {
    e.preventDefault();
    const next = Object.fromEntries(Object.keys(values).map((k) => [k, check(k, values[k])]));
    setErrors(next);
    const firstBad = Object.keys(next).find((k) => next[k]);
    if (firstBad) {
      e.currentTarget.elements[firstBad].focus();
      return;
    }
    if (!ENDPOINT) {
      const subject = encodeURIComponent(`New project from ${values.name}`);
      const body = encodeURIComponent(`${values.project}\n\n${values.name} (${values.email})`);
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const field = (name, label, props = {}) => {
    const { as: Tag = "input", ...rest } = props;
    return (
      <label className={errors[name] ? "has-error" : undefined}>
        {label}
        <Tag
          name={name}
          value={values[name]}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `e-${name}` : undefined}
          {...rest}
        />
        {errors[name] && (
          <span className="field-error" id={`e-${name}`}>
            {errors[name]}
          </span>
        )}
      </label>
    );
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-in">
        <Reveal className="contact-copy">
          <h2>Tell us about your project</h2>
          <p>
            A few lines about your business and what you need is enough. We&apos;ll reply by email with next steps.
          </p>
          <p className="contact-direct">
            Or email us directly at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </Reveal>

        {status === "sent" ? (
          <div className="form form-done" role="status">
            <h3>Thanks{values.name ? `, ${values.name.split(" ")[0]}` : ""}.</h3>
            <p>
              {ENDPOINT
                ? "Your message is on its way. We'll reply by email soon."
                : "Your email app should have opened with the message ready. Press send there to reach us."}
            </p>
            <button type="button" className="btn btn-ghost" onClick={() => setStatus("idle")}>
              Write another message
            </button>
          </div>
        ) : (
          <Reveal as="form" delay={120} className="form" onSubmit={submit} noValidate>
            {field("name", "Your name", { autoComplete: "name" })}
            {field("email", "Email", { type: "email", autoComplete: "email", inputMode: "email" })}
            {field("project", "What are we building?", {
              as: "textarea",
              rows: 5,
              placeholder: "e.g. A booking site for our clinic, live by March",
            })}
            {status === "error" && (
              <p className="form-error" role="alert">
                Your message didn&apos;t send. Try again, or email us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
            )}
            <button className="btn btn-violet" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"} <Arrow />
            </button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
