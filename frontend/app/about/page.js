import Nav from "@/components/Nav";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About · zerosoft",
  description: "zerosoft is a small software studio in Dhaka: one team from design to hosting.",
  alternates: { canonical: "/about" },
};

// Dedicated page: the same section as on the home page, on its own.
export default function AboutPage() {
  return (
    <main id="top" className="subpage">
      <Nav />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
