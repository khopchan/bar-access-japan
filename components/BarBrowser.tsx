"use client";

import { useMemo, useState } from "react";
import { StoryCard } from "@/components/StoryCard";
import type { CardModel } from "@/lib/cards";
import type { Locale } from "@/lib/i18n";

export type BarListItem = {
  id: string;
  cityId: string;
  areaId: string;
  card: CardModel;
};

export function BarBrowser({
  locale,
  frameLabel,
  items,
  cities,
  areas,
  labels,
}: {
  locale: Locale;
  frameLabel: string;
  items: BarListItem[];
  cities: { id: string; label: string }[];
  areas: { id: string; cityId: string; label: string }[];
  labels: { city: string; area: string; all: string; empty: string };
}) {
  const [city, setCity] = useState("all");
  const [area, setArea] = useState("all");
  const cityAreas = city === "all" ? [] : areas.filter((item) => item.cityId === city);
  const showAreas = cityAreas.length > 1;
  const activeArea = showAreas ? area : "all";

  const visible = useMemo(
    () =>
      items.filter(
        (item) => (city === "all" || item.cityId === city) && (activeArea === "all" || item.areaId === activeArea),
      ),
    [items, city, activeArea],
  );
  const count = locale === "ja" ? `${visible.length}件` : `${visible.length} shown`;
  const featureId = visible[0]?.id;

  function selectCity(id: string) {
    setCity(id);
    setArea("all");
  }

  return (
    <div className="catalog-browser">
      <div className="filters">
        <fieldset>
          <legend>{labels.city}</legend>
          <div className="filter-row">
            <FilterButton pressed={city === "all"} onClick={() => selectCity("all")}>
              {labels.all}
            </FilterButton>
            {cities.map((item) => (
              <FilterButton key={item.id} pressed={city === item.id} onClick={() => selectCity(item.id)}>
                {item.label}
              </FilterButton>
            ))}
          </div>
        </fieldset>
        {showAreas ? (
          <fieldset>
            <legend>{labels.area}</legend>
            <div className="filter-row">
              <FilterButton pressed={area === "all"} onClick={() => setArea("all")}>
                {labels.all}
              </FilterButton>
              {cityAreas.map((item) => (
                <FilterButton key={item.id} pressed={area === item.id} onClick={() => setArea(item.id)}>
                  {item.label}
                </FilterButton>
              ))}
            </div>
          </fieldset>
        ) : null}
        <p className="filter-count" aria-live="polite">
          {count}
        </p>
      </div>

      {visible.length === 0 ? <p className="group-note">{labels.empty}</p> : null}

      <ol className="bar-list">
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
