"use client";
import { useState } from "react";
import { SITE } from "@/data/site";
import Reveal from "./Reveal";
import { Arrow } from "./Icons";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`New project from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("project")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-in">
        <Reveal className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h2>
            Describe
            <br />
            your <span className="scribble">project</span>
          </h2>
          <p>
            Pizza shop, SaaS, sneaker brand, something weird? Tell us in a few lines. We reply fast.
          </p>
        </Reveal>

        <Reveal as="form" delay={120} className="form" onSubmit={submit}>
          <label>
            Your name
            <input name="name" required placeholder="Alex" />
          </label>
          <label>
            Email
            <input name="email" type="email" required placeholder="alex@brand.com" />
          </label>
          <label>
            What are we building?
            <textarea name="project" required rows={5} placeholder="I run a pizza shop and want online orders..." />
          </label>
          <button className="btn btn-mocha" type="submit">
            {sent ? "Opening your mail app…" : "Send it"} <Arrow />
          </button>
        </Reveal>
      </div>

      <footer className="footer">
        <div className="wordmark" aria-hidden="true">
          {SITE.name}
        </div>
        <p>© {new Date().getFullYear()} {SITE.name}. Made with too much coffee.</p>
      </footer>
    </section>
  );
}
