import Hero from "@/components/hero/Hero";
import Manifesto from "@/components/sections/Manifesto";
import ServicesList from "@/components/sections/ServicesList";
import SelectedWork from "@/components/sections/SelectedWork";
import ProcessPinned from "@/components/sections/ProcessPinned";
import Care from "@/components/sections/Care";
import Chapters from "@/components/sections/Chapters";
import Cta from "@/components/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <ServicesList />
      <SelectedWork />
      <ProcessPinned />
      <Care />
      <Chapters />
      <Cta />
    </>
  );
}
