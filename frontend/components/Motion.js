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
    const prog = document.querySelector(".scroll-prog");
    const hero = document.querySelector(".hero");

    // ---- scroll: progress bar + stacked cards get pushed back by the next card ----
    // Runs at most once per frame, and only measures cards while the Work section is on screen.
    const cards = document.getElementsByClassName("card"); // live list (follows the Work tabs)
    const work = document.getElementById("work");
    let workOn = false;
    const io = work
      ? new IntersectionObserver(([e]) => {
          workOn = e.isIntersecting;
        }, { rootMargin: "200px 0px" })
      : null;
    if (io) io.observe(work);
    let scrollQueued = false;
    const paintScroll = () => {
      scrollQueued = false;
      const max = root.scrollHeight - innerHeight;
      if (prog) prog.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      if (!workOn) return;
      const vh = innerHeight;
      const wide = innerWidth > 900;
      const clamp = (x) => Math.min(1, Math.max(0, x));
      // read everything first...
      const rects = Array.from(cards, (c) => c.getBoundingClientRect());
      const sticks = wide ? Array.from(cards, (c) => parseFloat(getComputedStyle(c).top) || 0) : [];
      const stack = wide ? null : cards[0]?.parentElement?.getBoundingClientRect();
      // ...then write
      for (let i = 0; i < cards.length; i++) {
        const r = rects[i];
        const next = rects[i + 1];
        if (wide && next) {
          const p = clamp((r.bottom - next.top) / r.height);
          cards[i].style.setProperty("--sc", (1 - 0.06 * p).toFixed(3));
          cards[i].style.setProperty("--br", (1 - 0.18 * p).toFixed(3));
        }
        // the screenshot scrolls through the website as the card moves through the page
        let sp;
        if (!wide) {
          sp = stack ? clamp((vh - stack.top) / (vh + stack.height)) : 0; // phones: one row, all together
        } else {
          const enter = clamp((vh - r.top) / Math.max(1, vh - sticks[i])); // sliding in: 0 -> 1
          const leave = next
            ? clamp((vh - next.top) / Math.max(1, vh - sticks[i + 1])) // the next card covering it
            : clamp((vh - r.bottom) / (vh * 0.5)); // last card: as its bottom rises
          sp = 0.35 * enter + 0.65 * leave;
        }
        const shots = cards[i].querySelector(".shots");
        if (shots) {
          shots.classList.add("scrolly");
          shots.style.setProperty("--p", sp.toFixed(4));
        }
      }
    };
    const onScroll = () => {
      if (!scrollQueued) {
        scrollQueued = true;
        requestAnimationFrame(paintScroll);
      }
    };

    // ---- pointer: hero parallax, card tilt, magnetic buttons (once per frame) ----
    let lastMove = null;
    let moveQueued = false;
    const onMove = (e) => {
      lastMove = e;
      if (!moveQueued) {
        moveQueued = true;
        requestAnimationFrame(applyMove);
      }
    };
    const applyMove = () => {
      moveQueued = false;
      const e = lastMove;
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

    // ---- pause CSS animations in sections that are off screen ----
    const sectionIo = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.toggleAttribute("data-off", !e.isIntersecting)),
      { rootMargin: "100px 0px" }
    );
    document.querySelectorAll("main > section, .hero").forEach((el) => sectionIo.observe(el));

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io?.disconnect();
      sectionIo.disconnect();
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
