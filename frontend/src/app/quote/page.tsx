import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import QuoteForm from "@/components/quote/QuoteForm";

export const metadata: Metadata = {
  title: "Get a quotation",
  description:
    "Tell us what you need, pick the features and get an itemised quotation for your website, management system, SaaS or app.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <PageHead
        kicker="Start a project"
        title={
          <>
            Get a <em>quotation.</em>
          </>
        }
        lede="Five short steps, about two minutes. Tell us what you need and we email you an itemised scope, then a detailed quotation within one business day."
      />
      <section className="tone" data-tone="light" aria-label="Quotation form">
        <div className="wrap" style={{ paddingBlock: "3rem clamp(4rem, 8vw, 7rem)" }}>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
