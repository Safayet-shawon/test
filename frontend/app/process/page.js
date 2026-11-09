import Nav from "@/components/Nav";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Process · zerosoft",
  description: "How a zerosoft project runs: brief, design, build, launch and care.",
  alternates: { canonical: "/process" },
};

// Dedicated page: the same section as on the home page, on its own.
export default function ProcessPage() {
  return (
    <main id="top" className="subpage">
      <Nav />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
