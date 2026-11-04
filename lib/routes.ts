import type { Locale } from "@/lib/i18n";

export const sectionIds = ["bars", "cocktails", "stories", "events", "guide"] as const;

export type SectionId = (typeof sectionIds)[number];

export const pageIds = [
  "home",
  ...sectionIds,
  "about",
  "services",
  "contact",
  "privacy",
] as const;

export type PageId = (typeof pageIds)[number];

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

export function isSectionId(page: PageId): page is SectionId {
  return (sectionIds as readonly string[]).includes(page);
}

export function hrefFor(locale: Locale, page: PageId): string {
  if (page === "home") {
    return locale === "en" ? "/en" : "/";
  }
  const tail = slugs[page];
  return locale === "en" ? `/en/${tail}` : `/${tail}`;
}

function pageFromSlug(slug: string): Exclude<PageId, "home"> | null {
  const match = (Object.entries(slugs) as [Exclude<PageId, "home">, string][]).find(
    ([, value]) => value === slug,
  );
  return match ? match[0] : null;
}

export function parseSlug(slug: string[] | undefined): { locale: Locale; page: PageId } | null {
  if (!slug || slug.length === 0) {
    return { locale: "ja", page: "home" };
  }

  if (slug[0] === "en") {
    if (slug.length === 1) return { locale: "en", page: "home" };
    if (slug.length !== 2) return null;
    const page = pageFromSlug(slug[1]);
    return page ? { locale: "en", page } : null;
  }

  if (slug.length !== 1) return null;
  const page = pageFromSlug(slug[0]);
  return page ? { locale: "ja", page } : null;
}

export function staticParams(): { slug: string[] }[] {
  const tails = Object.values(slugs);
  return [
    { slug: [] },
    { slug: ["en"] },
    ...tails.map((tail) => ({ slug: [tail] })),
    ...tails.map((tail) => ({ slug: ["en", tail] })),
  ];
}
