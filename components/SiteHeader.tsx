"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { LangSwitch, type LanguageLink } from "@/components/LangSwitch";

export type HeaderModel = {
  locale: "ja" | "en";
  pageId: string;
  overlay: boolean;
  homeHref: string;
  menuOpenLabel: string;
  menuCloseLabel: string;
  navLabel: string;
  items: { href: string; label: string; current: boolean }[];
  languages: LanguageLink[];
};

const DESKTOP_NAV = "(min-width: 1040px)";

export function SiteHeader({ model }: { model: HeaderModel }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(!model.overlay);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const navId = useId();

  useEffect(() => {
    setOpen(false);
  }, [model.pageId, model.locale]);

  useEffect(() => {
    if (!model.overlay) {
      setSolid(true);
      return;
    }
    const onScroll = () => {
      setSolid(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [model.overlay]);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_NAV);
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    const skip = document.querySelector(".skip-link");
    if (main) main.inert = true;
    if (footer) footer.inert = true;
    if (skip instanceof HTMLElement) skip.inert = true;
    firstLinkRef.current?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      if (main) main.inert = false;
      if (footer) footer.inert = false;
      if (skip instanceof HTMLElement) skip.inert = false;
    };
  }, [open]);

  const headerClass = ["site-header", solid || open ? "is-solid" : "", open ? "is-menu-open" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass}>
      <div className="header-inner">
        <Link href={model.homeHref} className="wordmark">
          BAR ACCESS JAPAN
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls={navId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav-toggle-lines" aria-hidden="true" />
          <span className="visually-hidden">{open ? model.menuCloseLabel : model.menuOpenLabel}</span>
        </button>
        <nav
          id={navId}
          className="primary-nav"
          aria-label={model.navLabel}
          onClick={(event) => {
            const target = event.target;
            if (target instanceof Element && target.closest("a")) setOpen(false);
          }}
        >
          {model.items.map((item, index) => (
            <Link
              key={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={item.href}
              className="nav-link"
              aria-current={item.current ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <LangSwitch languages={model.languages} />
        </nav>
      </div>
    </header>
  );
}
