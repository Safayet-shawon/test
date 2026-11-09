import Nav from "@/components/Nav";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Services · zerosoft",
  description: "Websites, SaaS products, apps, custom software and management systems, designed and built by zerosoft.",
  alternates: { canonical: "/services" },
};

// Dedicated page: the same section as on the home page, on its own.
export default function ServicesPage() {
  return (
    <main id="top" className="subpage">
      <Nav />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
