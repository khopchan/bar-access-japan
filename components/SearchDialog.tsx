"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { SearchHit } from "@/lib/cards";

const RESULT_CAP = 12;

export function SearchDialog({
  hits,
  label,
  placeholder,
  hint,
  empty,
  more,
  closeLabel,
  onClose,
}: {
  hits: SearchHit[];
  label: string;
  placeholder: string;
  hint: string;
  empty: string;
  more: string;
  closeLabel: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const inputId = useId();
  const [query, setQuery] = useState("");

  onCloseRef.current = onClose;

  const q = query.trim().toLocaleLowerCase();
  const matches = q
    ? hits.filter((hit) => `${hit.title}\n${hit.dek}\n${hit.kicker}`.toLocaleLowerCase().includes(q))
    : [];
  const shown = matches.slice(0, RESULT_CAP);

  useEffect(() => {
    inputRef.current?.focus();
    const root = dialogRef.current;
    if (!root) return;
    const node: HTMLDivElement = root;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const items = node.querySelectorAll<HTMLElement>("a, button, input");
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dialogRef.current?.querySelector<HTMLAnchorElement>(".search-hit")?.click();
  }

  return (
    <div
      ref={dialogRef}
      id="search-dialog"
      className="search-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="search-inner">
        <div className="search-bar">
          <form className="search-form" role="search" method="dialog" onSubmit={onSubmit}>
            <label className="visually-hidden" id={titleId} htmlFor={inputId}>
              {label}
            </label>
            <input
              ref={inputRef}
              id={inputId}
              type="search"
              value={query}
              placeholder={placeholder}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>
          <button type="button" className="text-button" onClick={onClose}>
            {closeLabel}
          </button>
        </div>
        {q.length === 0 ? <p className="search-hint">{hint}</p> : null}
        {q.length > 0 && shown.length === 0 ? <p className="search-hint">{empty}</p> : null}
        {shown.length > 0 ? (
          <ul className="search-results">
            {shown.map((hit) => (
              <li key={`${hit.href}-${hit.title}`}>
                <Link className="search-hit" href={hit.href} onClick={onClose}>
                  <span className="kicker">{hit.kicker}</span>
                  <span className="search-title">{hit.title}</span>
                  <span className="dek">{hit.dek}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        {matches.length > RESULT_CAP ? <p className="search-hint">{more}</p> : null}
      </div>
    </div>
  );
}
