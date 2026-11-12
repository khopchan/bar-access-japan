"use client";

import { useMemo, useState } from "react";
import { StoryCard } from "@/components/StoryCard";
import type { CardModel } from "@/lib/cards";
import type { Locale } from "@/lib/i18n";

export type CocktailListItem = {
  id: string;
  base: string;
  flavor: string;
  card: CardModel;
};

export function CocktailBrowser({
  locale,
  frameLabel,
  items,
  labels,
}: {
  locale: Locale;
  frameLabel: string;
  items: CocktailListItem[];
  labels: {
    base: string;
    flavor: string;
    all: string;
    empty: string;
    bases: { id: string; label: string }[];
    flavors: { id: string; label: string }[];
  };
}) {
  const [base, setBase] = useState("all");
  const [flavor, setFlavor] = useState("all");

  const visible = useMemo(
    () => items.filter((item) => (base === "all" || item.base === base) && (flavor === "all" || item.flavor === flavor)),
    [items, base, flavor],
  );
  const count = locale === "ja" ? `${visible.length}件` : `${visible.length} shown`;
  const featureId = visible[0]?.id;

  return (
    <div className="cocktail-browser">
      <div className="filters">
        <fieldset>
          <legend>{labels.base}</legend>
          <div className="filter-row">
            <FilterButton pressed={base === "all"} onClick={() => setBase("all")}>
              {labels.all}
            </FilterButton>
            {labels.bases.map((item) => (
              <FilterButton key={item.id} pressed={base === item.id} onClick={() => setBase(item.id)}>
                {item.label}
              </FilterButton>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>{labels.flavor}</legend>
          <div className="filter-row">
            <FilterButton pressed={flavor === "all"} onClick={() => setFlavor("all")}>
              {labels.all}
            </FilterButton>
            {labels.flavors.map((item) => (
              <FilterButton key={item.id} pressed={flavor === item.id} onClick={() => setFlavor(item.id)}>
                {item.label}
              </FilterButton>
            ))}
          </div>
        </fieldset>
        <p className="filter-count" aria-live="polite">
          {count}
        </p>
      </div>

      {visible.length === 0 ? <p className="group-note">{labels.empty}</p> : null}

      <ol className="cocktail-list">
        {items.map((item) => {
          const match = visible.some((entry) => entry.id === item.id);
          const featured = item.id === featureId;
          return (
            <li key={item.id} hidden={!match}>
              <StoryCard
                card={item.card}
                frameLabel={frameLabel}
                heading={featured ? "h2" : "h3"}
                variant={featured ? "feature" : "river"}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function FilterButton({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button type="button" aria-pressed={pressed} onClick={onClick}>
      {children}
    </button>
  );
}
