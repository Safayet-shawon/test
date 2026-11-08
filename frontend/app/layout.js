import { Unbounded, Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";

const display = Unbounded({ subsets: ["latin"], variable: "--font-display", display: "swap" });
// Our own brand uses two fonts: Unbounded (big headings) and Space Grotesk (everything else).
// Fraunces is only used inside the concept demo sites in the hero, which have their own looks.
const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap", style: ["normal", "italic"] });
const body = Space_Grotesk({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: "zerosoft · Software for any business",
  description:
    "zerosoft designs and builds websites, web apps and SaaS for any business, and looks after them once they're live.",
};

export const viewport = { themeColor: "#14121b" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${serif.variable}`}>
      <head>
        {/* decide before first paint whether the pendulum intro plays (once per session, not for reduced-motion) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var r=document.documentElement;if(localStorage.getItem('zerosoft-theme')==='dark'){r.dataset.theme='dark'}}catch(e){}try{var r=document.documentElement;if(location.pathname!=='/'||sessionStorage.getItem('zerosoft-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){r.classList.add('intro-skip')}else{r.classList.add('intro-lock')}}catch(e){}",
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: SITE.name,
              url: SITE.url,
              email: SITE.email,
              ...(SITE.phone ? { telephone: SITE.phone } : {}),
              description: "Websites, management systems, SaaS and apps for growing businesses.",
              address: {
                "@type": "PostalAddress",
                streetAddress: SITE.address.line1,
                addressLocality: SITE.address.city,
                postalCode: SITE.address.postcode,
                addressCountry: "BD",
              },
            }),
          }}
        />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
