"use client";
import { useEffect, useState } from "react";
import { SITE } from "@/data/site";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`nav ${solid ? "solid" : ""}`}>
      <a href="#top" className="logo">
        {SITE.name}
        <i />
      </a>
      <nav>
        <a href="#services">Services</a>
        <a href="#work">Work</a>
        <a href="#contact" className="nav-cta">
          Start a project
        </a>
      </nav>
    </header>
  );
}
