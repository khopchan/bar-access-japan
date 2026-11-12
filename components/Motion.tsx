"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

const REDUCE = "(prefers-reduced-motion: reduce)";

/** Fades the page in on each route. The key remounts the tree so the animation restarts. */
export function RouteFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="route-fade">
      {children}
    </div>
  );
}

/** Reveals [data-reveal] nodes once they enter the viewport. */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reduce = window.matchMedia(REDUCE).matches;
    if (reduce) {
      nodes.forEach((node) => node.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

/** Thin reading mark for long pages. Decorative; the article itself stays the content. */
export function ReadingProgress() {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const article = document.querySelector(".article-sheet, .bar-sheet");
    if (!article) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = article.getBoundingClientRect();
      const total = article.scrollHeight - window.innerHeight;
      const seen = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
      setScale(total > 0 ? seen / total : 0);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${scale})` }} />
    </div>
  );
}
