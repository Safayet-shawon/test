"use client";
import { useEffect, useState } from "react";
import Logo from "./Logo";

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
      <a href="#top" aria-label="zerosoft home">
        <Logo />
      </a>
      <nav>
        <a href="#work">Work</a>
        <a href="#services">Services</a>
        <a href="#process">Process</a>
        <a href="#about">About</a>
        <a href="#contact" className="nav-cta">
          Start a project
        </a>
      </nav>
    </header>
  );
}
