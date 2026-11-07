import { Unbounded, Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";

const display = Unbounded({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap", style: ["normal", "italic"] });
const body = Space_Grotesk({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  title: "zerosoft — websites for any business",
  description:
    "We design and build SaaS, custom websites and products that make people stop scrolling. Pizza shop or unicorn startup — we make the website.",
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
