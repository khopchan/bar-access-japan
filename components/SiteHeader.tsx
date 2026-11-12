"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Monogram } from "@/components/BrandMark";
import { LangSwitch, type LanguageLink } from "@/components/LangSwitch";
import { SearchDialog } from "@/components/SearchDialog";
import type { SearchHit } from "@/lib/cards";

export type HeaderModel = {
  homeHref: string;
  brandName: string;
  menuOpenLabel: string;
  menuCloseLabel: string;
  navLabel: string;
  items: { href: string; label: string; current: boolean }[];
  languages: LanguageLink[];
  search: {
    openLabel: string;
    closeLabel: string;
    placeholder: string;
    hint: string;
    empty: string;
    more: string;
    label: string;
    hits: SearchHit[];
  };
};

const DESKTOP_NAV = "(min-width: 1040px)";

export function SiteHeader({ model }: { model: HeaderModel }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const navId = useId();

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    const apply = () => {
      frame = 0;
      const next = window.scrollY > 28;
      setCompact((prev) => (prev === next ? prev : next));
      document.documentElement.classList.toggle("is-header-compact", next);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.classList.remove("is-header-compact");
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_NAV);
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const locked = open || searchOpen;
    if (!locked) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    const skip = document.querySelector(".skip-link");
    if (main) main.inert = true;
    if (footer instanceof HTMLElement) footer.inert = true;
    if (skip instanceof HTMLElement) skip.inert = true;
    return () => {
      document.body.style.overflow = previousOverflow;
      if (main) main.inert = false;
      if (footer instanceof HTMLElement) footer.inert = false;
      if (skip instanceof HTMLElement) skip.inert = false;
    };
  }, [open, searchOpen]);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus({ preventScroll: true });
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function closeSearch() {
    setSearchOpen(false);
    searchRef.current?.focus();
  }

  const headerClass = [
    "site-header",
    compact ? "is-compact" : "",
    open ? "is-menu-open" : "",
    searchOpen ? "is-search-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass}>
      <div className="header-bar">
        <div className="header-start">
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls={navId}
            onClick={() => {
              setSearchOpen(false);
              setOpen((value) => !value);
            }}
          >
            <span className="nav-toggle-lines" aria-hidden="true" />
            <span className="visually-hidden">{open ? model.menuCloseLabel : model.menuOpenLabel}</span>
          </button>
        </div>
        <Link href={model.homeHref} className="wordmark">
          <Monogram priority />
          <span className="visually-hidden">{model.brandName}</span>
        </Link>
        <div className="header-end">
          <button
            ref={searchRef}
            type="button"
            className="search-toggle"
            aria-expanded={searchOpen}
            aria-controls="search-dialog"
            onClick={() => {
              setOpen(false);
              setSearchOpen((value) => !value);
            }}
          >
            <SearchIcon />
            <span className="visually-hidden">
              {searchOpen ? model.search.closeLabel : model.search.openLabel}
            </span>
          </button>
          <LangSwitch languages={model.languages} />
        </div>
      </div>
      <nav
        id={navId}
        className="section-nav"
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
      </nav>
      {searchOpen ? (
        <SearchDialog
          hits={model.search.hits}
          label={model.search.label}
          placeholder={model.search.placeholder}
          hint={model.search.hint}
          empty={model.search.empty}
          more={model.search.more}
          closeLabel={model.search.closeLabel}
          onClose={closeSearch}
        />
      ) : null}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="10.5" cy="10.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 15.5 L20 20.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
