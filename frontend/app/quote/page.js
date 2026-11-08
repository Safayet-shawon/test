import Nav from "@/components/Nav";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Get a quotation · zerosoft",
  description:
    "Tell us what you need, pick the features and get an itemised quotation for your website, management system, SaaS or app.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <main id="top" className="subpage quote-page">
      <Nav />
      <section className="quote" aria-labelledby="quote-title">
        <div className="quote-head">
          <h1 id="quote-title">Get a quotation</h1>
          <p>
            Five short steps, about two minutes. Tell us what you need and we email you an itemised scope, then a detailed
            quotation within one business day.
          </p>
        </div>
        <QuoteForm />
      </section>
      <Footer />
    </main>
  );
}
