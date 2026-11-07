import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Motion from "@/components/Motion";

export default function Page() {
  return (
    <main>
      <Motion />
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Process />
      <Contact />
    </main>
  );
}
