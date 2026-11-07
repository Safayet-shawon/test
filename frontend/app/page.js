import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Motion from "@/components/Motion";
import Intro from "@/components/Intro";

export default function Page() {
  return (
    <main>
      <Intro />
      <Motion />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Work />
      <Process />
      <Contact />
    </main>
  );
}
