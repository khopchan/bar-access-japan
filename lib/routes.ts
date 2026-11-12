import { bars } from "@/content/bars";
import { cocktails } from "@/content/cocktails";
import { guides } from "@/content/guides";
import { stories } from "@/content/stories";
import type { Locale } from "@/lib/i18n";

export const sectionIds = ["bars", "cocktails", "stories", "events", "guide"] as const;

export type SectionId = (typeof sectionIds)[number];

export const pageIds = ["home", ...sectionIds, "about", "services", "contact", "privacy"] as const;

export type PageId = (typeof pageIds)[number];

export type DetailKind = "story" | "bar" | "guide" | "cocktail";

export type ParsedRoute =
  | { locale: Locale; kind: "page"; page: PageId }
  | { locale: Locale; kind: "story"; slug: string }
  | { locale: Locale; kind: "bar"; slug: string }
  | { locale: Locale; kind: "guide"; slug: string }
  | { locale: Locale; kind: "cocktail"; slug: string };

const slugs = {
  bars: "bars",
  cocktails: "cocktails",
  stories: "stories",
  events: "events",
  guide: "guide",
  about: "about",
  services: "services",
  contact: "contact",
  privacy: "privacy",
} as const satisfies Record<Exclude<PageId, "home">, string>;

const detailSection = {
  story: "stories",
  bar: "bars",
  guide: "guide",
  cocktail: "cocktails",
} as const satisfies Record<DetailKind, string>;

export function isSectionId(page: PageId): page is SectionId {
  return (sectionIds as readonly string[]).includes(page);
}

export function pathFor(locale: Locale, tail = ""): string {
  if (!tail) return locale === "en" ? "/en" : "/";
  return locale === "en" ? `/en/${tail}` : `/${tail}`;
}

export function hrefFor(locale: Locale, page: PageId): string {
  if (page === "home") return pathFor(locale);
  return pathFor(locale, slugs[page]);
}

export function hrefForDetail(locale: Locale, kind: DetailKind, slug: string): string {
  return pathFor(locale, `${detailSection[kind]}/${slug}`);
}

export function navId(route: ParsedRoute): PageId {
  if (route.kind === "story") return "stories";
  if (route.kind === "bar") return "bars";
  if (route.kind === "guide") return "guide";
  if (route.kind === "cocktail") return "cocktails";
  return route.page;
}

export function alternateHrefs(route: ParsedRoute): { ja: string; en: string } {
  if (route.kind === "page") {
    return { ja: hrefFor("ja", route.page), en: hrefFor("en", route.page) };
  }
  return {
    ja: hrefForDetail("ja", route.kind, route.slug),
    en: hrefForDetail("en", route.kind, route.slug),
  };
}

function pageFromSlug(slug: string): Exclude<PageId, "home"> | null {
  const match = (Object.entries(slugs) as [Exclude<PageId, "home">, string][]).find(([, value]) => value === slug);
  return match ? match[0] : null;
}

function knownDetail(kind: DetailKind, slug: string): boolean {
  if (kind === "story") return stories.some((item) => item.slug === slug);
  if (kind === "bar") return bars.some((item) => item.slug === slug);
  if (kind === "cocktail") return cocktails.some((item) => item.slug === slug);
  return guides.some((item) => item.slug === slug);
}

export function parseSlug(slug: string[] | undefined): ParsedRoute | null {
  if (!slug || slug.length === 0) return { locale: "ja", kind: "page", page: "home" };

  const locale: Locale = slug[0] === "en" ? "en" : "ja";
  const parts = locale === "en" ? slug.slice(1) : slug;
  if (parts.length === 0) return { locale, kind: "page", page: "home" };

  if (parts.length === 1) {
    const page = pageFromSlug(parts[0]);
    return page ? { locale, kind: "page", page } : null;
  }

  if (parts.length === 2) {
    const section = parts[0];
    const kind: DetailKind | null =
      section === "stories"
        ? "story"
        : section === "bars"
          ? "bar"
          : section === "guide"
            ? "guide"
            : section === "cocktails"
              ? "cocktail"
              : null;
    if (!kind || !knownDetail(kind, parts[1])) return null;
    return { locale, kind, slug: parts[1] };
  }

  return null;
}

export function staticParams(): { slug: string[] }[] {
  const tails = Object.values(slugs);
  const details: { section: string; slug: string }[] = [
    ...stories.map((item) => ({ section: "stories", slug: item.slug })),
    ...bars.map((item) => ({ section: "bars", slug: item.slug })),
    ...guides.map((item) => ({ section: "guide", slug: item.slug })),
    ...cocktails.map((item) => ({ section: "cocktails", slug: item.slug })),
  ];

  return [
    { slug: [] },
    { slug: ["en"] },
    ...tails.map((tail) => ({ slug: [tail] })),
    ...tails.map((tail) => ({ slug: ["en", tail] })),
    ...details.map((item) => ({ slug: [item.section, item.slug] })),
    ...details.map((item) => ({ slug: ["en", item.section, item.slug] })),
  ];
}
