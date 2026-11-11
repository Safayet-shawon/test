import type { Metadata } from "next";
import ProcessPinned from "@/components/sections/ProcessPinned";
import Chapters from "@/components/sections/Chapters";
import Cta from "@/components/Cta";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Brief, design, build, launch and care: how zerosoft takes a project from the first conversation to a live, maintained product.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <ProcessPinned heading="h1" />
      <Chapters />
      <Cta />
    </>
  );
}
