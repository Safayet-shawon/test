import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Manifesto from "@/components/sections/Manifesto";
import Chapters from "@/components/sections/Chapters";
import Cta from "@/components/Cta";

export const metadata: Metadata = {
  title: "About",
  description: "zerosoft is a small software studio in Dhaka: one team from design to hosting.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHead
        kicker="About"
        title={
          <>
            One team, from design <em>to hosting.</em>
          </>
        }
      />
      <Manifesto />
      <Chapters />
      <Cta />
    </>
  );
}
