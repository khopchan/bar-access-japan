import type { L10n } from "@/lib/i18n";
import type { Bar, BarFact, HoursStatus } from "@/content/types";
import { asCopy, asTone } from "@/content/load";
import editorialJson from "@/research/bars.json";
import richJson from "@/research/bars.data.json";

/**
 * 掲載店。本文は research/bars.json、都市・出典・営業時間の確度は research/bars.data.json。
 * エリアの絞り込みは areaId。表示名が分かれる3件だけ、フィルター用の短いラベルを置く。
 */
const AREA_FILTER_LABEL: Record<string, L10n> = {
  shibuya: { ja: "渋谷", en: "Shibuya" },
  kitashinchi: { ja: "北新地・堂島", en: "Kitashinchi & Dojima" },
  kawaramachi: { ja: "河原町・木屋町", en: "Kawaramachi & Kiyamachi" },
};

type Copy = { ja: string; en: string };

type EditorialBar = {
  slug: string;
  tone: string;
  kicker: Copy;
  title: Copy;
  dek: Copy;
  byline: Copy;
  credit: Copy;
  concept: Copy[];
  facts: { id: string; label: Copy; value: Copy }[];
};

type RichBar = {
  slug: string;
  city: Copy;
  cityId: string;
  area: Copy;
  areaId: string;
  hoursStatus: string;
  sources: string[];
  lastVerified: string;
};

export const barUi = {
  city: { ja: "都市", en: "City" },
  area: { ja: "エリア", en: "Area" },
  all: { ja: "すべて", en: "All" },
  empty: {
    ja: "この条件に合う店はありません。",
    en: "No bars match these filters.",
  },
} as const;

function hoursStatusOf(value: string, slug: string): HoursStatus {
  if (value === "official" || value === "secondary") return value;
  if (value === "要確認") return "unverified";
  throw new Error(`Unknown hours status “${value}” on ${slug}`);
}

function loadBars(editorial: EditorialBar[], rich: RichBar[]): Bar[] {
  if (editorial.length !== rich.length) {
    throw new Error(`Bar count mismatch: ${editorial.length} editorial, ${rich.length} rich`);
  }
  const richBySlug = new Map<string, RichBar>();
  for (const item of rich) {
    if (richBySlug.has(item.slug)) throw new Error(`Duplicate bar slug: ${item.slug}`);
    richBySlug.set(item.slug, item);
  }

  return editorial.map((item) => {
    const extra = richBySlug.get(item.slug);
    if (!extra) throw new Error(`Missing rich bar: ${item.slug}`);
    if (!extra.cityId || !extra.areaId) throw new Error(`Missing city or area on ${item.slug}`);
    if (!extra.sources.length) throw new Error(`No sources for ${item.slug}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(extra.lastVerified)) throw new Error(`Bad verification date on ${item.slug}`);
    const facts: BarFact[] = item.facts.map((fact) => ({
      id: fact.id,
      label: asCopy(fact.label, item.slug, fact.id),
      value: asCopy(fact.value, item.slug, fact.id),
    }));
    if (!facts.some((fact) => fact.id === "hours") || !facts.some((fact) => fact.id === "checked")) {
      throw new Error(`Bar ${item.slug} is missing hours or the date checked`);
    }
    for (const fact of facts) {
      if ((fact.id === "web" || fact.id === "instagram") && !/^https?:\/\//.test(fact.value.ja)) {
        throw new Error(`Bar ${item.slug} has a ${fact.id} value that is not a URL`);
      }
    }
    return {
      slug: item.slug,
      tone: asTone(item.tone, item.slug),
      kicker: asCopy(item.kicker, item.slug, "kicker"),
      title: asCopy(item.title, item.slug, "title"),
      dek: asCopy(item.dek, item.slug, "dek"),
      byline: asCopy(item.byline, item.slug, "byline"),
      credit: asCopy(item.credit, item.slug, "credit"),
      concept: item.concept.map((paragraph, index) => asCopy(paragraph, item.slug, `concept[${index}]`)),
      facts,
      cityId: extra.cityId,
      areaId: extra.areaId,
      city: asCopy(extra.city, item.slug, "city"),
      area: asCopy(extra.area, item.slug, "area"),
      hoursStatus: hoursStatusOf(extra.hoursStatus, item.slug),
      sources: extra.sources,
      lastVerified: extra.lastVerified,
    };
  });
}

export const bars: Bar[] = loadBars(editorialJson as EditorialBar[], richJson as RichBar[]);

export type CityFilter = { id: string; label: L10n };
export type AreaFilter = { id: string; cityId: string; label: L10n };

function collectPlaces(list: Bar[]): { cities: CityFilter[]; areas: AreaFilter[] } {
  const cities: CityFilter[] = [];
  const areas: AreaFilter[] = [];
  const seenCity = new Set<string>();
  const seenArea = new Set<string>();
  const areaLabels = new Map<string, L10n>();

  for (const bar of list) {
    if (!seenCity.has(bar.cityId)) {
      seenCity.add(bar.cityId);
      cities.push({ id: bar.cityId, label: bar.city });
    }
    const label = AREA_FILTER_LABEL[bar.areaId] ?? bar.area;
    const previous = areaLabels.get(bar.areaId);
    if (previous && (previous.ja !== label.ja || previous.en !== label.en)) {
      throw new Error(`Area ${bar.areaId} has conflicting filter labels. Add one in AREA_FILTER_LABEL.`);
    }
    areaLabels.set(bar.areaId, label);
    if (!seenArea.has(bar.areaId)) {
      seenArea.add(bar.areaId);
      areas.push({ id: bar.areaId, cityId: bar.cityId, label });
    }
  }

  return { cities, areas };
}

const places = collectPlaces(bars);
export const barCities = places.cities;
export const barAreas = places.areas;
