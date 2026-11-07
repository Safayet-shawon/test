import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Marquee className="alt" items={["Next.js", "React", "TypeScript", "Node", "NestJS", "Redis", "Docker", "Microservices"]} />
      <Process />
      <Contact />
    </main>
  );
}
