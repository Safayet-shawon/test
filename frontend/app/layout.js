import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const sans = Geist({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  title: "prixon — websites for any business",
  description:
    "We design and build SaaS, custom websites and products that make people stop scrolling. Pizza shop or unicorn startup — we make the website.",
};

export const viewport = { themeColor: "#6f2dbd" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
