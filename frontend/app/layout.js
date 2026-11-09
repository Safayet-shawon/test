import { Fraunces, Josefin_Sans, Urbanist, Lexend_Zetta, Hanken_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";

// Fraunces is only used inside the concept demo sites in the hero, which have their own looks.
const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap", style: ["normal", "italic"] });
// Brand type: Josefin Sans for headings (very thin and bold mixed), Urbanist for text,
// Lexend Zetta for small wide labels and big numbers.
const head = Josefin_Sans({ subsets: ["latin"], variable: "--font-head", display: "swap" });
const text = Urbanist({ subsets: ["latin"], variable: "--font-text", display: "swap" });
// Hanken Grotesk: only for the hero headline, a neutral modern grotesk that reads professional.
const hero = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hero", display: "swap", weight: ["400", "800"] });
// Geist: the project cards in Our work (titles, one-line descriptions, tags and links).
const card = Geist({ subsets: ["latin"], variable: "--font-card", display: "swap", weight: ["400", "500", "600"] });
const wide = Lexend_Zetta({ subsets: ["latin"], variable: "--font-wide", display: "swap", weight: ["200", "300", "500"], preload: false });

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: "zerosoft · Software for any business",
  description:
    "zerosoft designs and builds websites, web apps and SaaS for any business, and looks after them once they're live.",
};

export const viewport = { themeColor: "#14121b" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${head.variable} ${text.variable} ${wide.variable} ${hero.variable} ${card.variable}`}>
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
