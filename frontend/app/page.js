import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Contact />
    </main>
  );
}
