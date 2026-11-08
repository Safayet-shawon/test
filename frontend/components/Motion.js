"use client";
import { useEffect } from "react";

// Site-wide life: hero parallax/tilt, magnetic buttons, card tilt,
// stacked-card depth, and a scroll progress bar. All disabled for reduced-motion.
export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce) return;
    const root = document.documentElement;
    const glow = document.querySelector(".cursor-glow");
    const prog = document.querySelector(".scroll-prog");
    const hero = document.querySelector(".hero");
    let mx = innerWidth / 2,
      my = innerHeight / 2,
      gx = mx,
      gy = my,
      raf = 0;

    // ---- scroll: progress bar + stacked cards get pushed back by the next card ----
    const onScroll = () => {
      const max = root.scrollHeight - innerHeight;
      if (prog) prog.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      const cards = document.querySelectorAll(".card");
      cards.forEach((c, i) => {
        const nx = cards[i + 1];
        if (!nx || innerWidth <= 900) return c.style.removeProperty("--sc");
        const r = c.getBoundingClientRect();
        const n = nx.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (r.bottom - n.top) / r.height));
        c.style.setProperty("--sc", (1 - 0.06 * p).toFixed(3));
        c.style.setProperty("--br", (1 - 0.18 * p).toFixed(3));
      });
    };

    // ---- pointer: glow follows, hero parallax, tilt, magnet ----
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (hero) {
        const r = hero.getBoundingClientRect();
        if (r.bottom > 0) {
          hero.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
          hero.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
        }
      }
      const t = e.target.closest?.("[data-tilt]");
      document.querySelectorAll("[data-tilt].tilting").forEach((el) => {
        if (el !== t) {
          el.classList.remove("tilting");
          el.style.removeProperty("--rx");
          el.style.removeProperty("--ry");
        }
      });
      if (t) {
        const r = t.getBoundingClientRect();
        t.classList.add("tilting");
        t.style.setProperty("--ry", `${(((e.clientX - r.left) / r.width) * 2 - 1) * 7}deg`);
        t.style.setProperty("--rx", `${(((e.clientY - r.top) / r.height) * 2 - 1) * -6}deg`);
      }
      const b = e.target.closest?.(".btn, .nav-cta");
      document.querySelectorAll(".magnet").forEach((el) => {
        if (el !== b) {
          el.classList.remove("magnet");
          el.style.translate = "";
        }
      });
      if (b) {
        const r = b.getBoundingClientRect();
        b.classList.add("magnet");
        b.style.translate = `${(e.clientX - (r.left + r.width / 2)) * 0.18}px ${(e.clientY - (r.top + r.height / 2)) * 0.28}px`;
      }
    };

    const loop = () => {
      gx += (mx - gx) * 0.12;
      gy += (my - gy) * 0.12;
      if (glow) glow.style.transform = `translate3d(${gx - 190}px, ${gy - 190}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(loop);
    } else if (glow) {
      glow.style.display = "none";
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <div className="scroll-prog" aria-hidden="true" />
    </>
  );
}
