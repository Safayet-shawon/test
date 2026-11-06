import { Unbounded, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Unbounded({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Space_Grotesk({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  title: "prixon — websites for any business",
  description:
    "We design and build SaaS, custom websites and products that make people stop scrolling. Pizza shop or unicorn startup — we make the website.",
};

export const viewport = { themeColor: "#566A48" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
