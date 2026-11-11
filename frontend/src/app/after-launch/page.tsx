import type { Metadata } from "next";
import Care from "@/components/sections/Care";
import Cta from "@/components/Cta";

export const metadata: Metadata = {
  title: "After launch",
  description: "Hosting, monitoring, backups, scaling and updates after your site goes live.",
  alternates: { canonical: "/after-launch" },
};

export default function AfterLaunchPage() {
  return (
    <>
      <Care heading="h1" />
      <Cta title="Need someone to look after yours?" />
    </>
  );
}
