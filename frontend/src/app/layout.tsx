import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Choreographer from "@/components/motion/Choreographer";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

// Display: Instrument Serif (editorial, with a true italic). Text: Manrope. Labels and data: IBM Plex Mono.
const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "zerosoft · Software for any business", template: "%s · zerosoft" },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: "zerosoft · Software for any business",
    description: SITE.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "zerosoft · Software for any business", description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#141311",
  width: "device-width",
  initialScale: 1,
};

// Before first paint: mark that scripted motion will run, so reveal targets start hidden instead of flashing.
// If the motion code never starts (blocked script, old browser), the class is removed after 3.5 s.
const BOOT = `try{var r=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){r.classList.add('js-motion');setTimeout(function(){if(!window.__zsMotion)r.classList.remove('js-motion')},3500)}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd />
        <SmoothScroll />
        <Choreographer />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
