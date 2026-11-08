import { Unbounded, Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";

const display = Unbounded({ subsets: ["latin"], variable: "--font-display", display: "swap" });
// Our own brand uses two fonts: Unbounded (big headings) and Space Grotesk (everything else).
// Fraunces is only used inside the concept demo sites in the hero, which have their own looks.
const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap", style: ["normal", "italic"] });
const body = Space_Grotesk({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
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
              "try{var r=document.documentElement;if(sessionStorage.getItem('zerosoft-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){r.classList.add('intro-skip')}else{r.classList.add('intro-lock')}}catch(e){}",
          }}
        />
      </head>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
