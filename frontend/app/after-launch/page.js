import Nav from "@/components/Nav";
import Care from "@/components/Care";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "After launch · zerosoft",
  description: "Hosting, monitoring, backups, scaling and updates after your site goes live.",
  alternates: { canonical: "/after-launch" },
};

// Dedicated page: the same section as on the home page, on its own.
export default function AfterLaunchPage() {
  return (
    <main id="top" className="subpage">
      <Nav />
      <Care />
      <Contact />
      <Footer />
    </main>
  );
}
