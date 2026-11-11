import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import WorkIndex from "@/components/work/WorkIndex";
import Cta from "@/components/Cta";
import { ALL_WORK, SECTORS } from "@/data/site";

export const metadata: Metadata = {
  title: "Our work",
  description: `${ALL_WORK.length} websites, management systems, SaaS and demo builds by zerosoft, across ${Object.keys(SECTORS).length} industries.`,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHead
        kicker="Our work"
        title={
          <>
            {ALL_WORK.length} projects, <em>in use.</em>
          </>
        }
        lede="Websites grouped by the business they serve, the systems businesses run on, and a few demo builds. Hover a project to see it move."
      />
      <WorkIndex />
      <Cta title="Want yours on this page?" />
    </>
  );
}
