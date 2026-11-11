import type { Metadata } from "next";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How zerosoft handles the details you send through this website.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "8 November 2026";

export default function PrivacyPage() {
  const a = SITE.address;
  return (
    <section className="tone" data-tone="light">
      <div className="wrap" style={{ paddingTop: "calc(var(--nav-h) + 5rem)", paddingBottom: "6rem" }}>
        <article className="legal">
          <h1 className="display h-lg">Privacy policy</h1>
          <p className="label">Last updated {UPDATED}</p>

          <h2>What we collect</h2>
          <p>
            When you request a quotation, we receive the details you enter: your name, email, phone number, company, a description of your
            business and your answers about the project. We do not collect anything else through the form.
          </p>

          <h2>How we use it</h2>
          <p>
            We use these details only to reply to you, prepare your quotation and discuss your project. We email a copy of your request to
            you and to our team inbox. We do not sell your details or share them for marketing.
          </p>

          <h2>Where it is kept</h2>
          <p>
            Requests are stored in our email inbox. While you fill in the form, your answers are saved in your own browser so you do not
            lose them; they are removed when you send the form, and you can clear them at any time by clearing your browser data. Our
            hosting provider keeps standard server logs, such as IP addresses, for security.
          </p>

          <h2>Cookies</h2>
          <p>This website does not use advertising or tracking cookies.</p>

          <h2>Your choices</h2>
          <p>
            You can ask us to show, correct or delete the details you sent us. Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we
            will reply within 30 days.
          </p>

          <h2>Contact</h2>
          <p>
            zerosoft, {a.line1}, {a.city} {a.postcode}, {a.country}. <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </article>
      </div>
    </section>
  );
}
