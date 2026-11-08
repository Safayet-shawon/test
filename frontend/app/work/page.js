import Nav from "@/components/Nav";
import AllWork from "@/components/AllWork";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "All work · zerosoft",
  description: "Websites, management systems, SaaS and samples built by zerosoft, sorted by service and by the business they serve.",
};

export default function WorkPage() {
  return (
    <main id="top" className="subpage">
      <Nav />
      <section className="work work-page" aria-labelledby="all-work-title">
        <div className="work-head">
          <h1 id="all-work-title">All work</h1>
          <p className="work-sub">Every project we have shipped, sorted by what we built and the business it serves.</p>
        </div>
        <AllWork />
      </section>
      <Contact />
      <Footer />
    </main>
  );
}
