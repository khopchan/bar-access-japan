import { aboutDoc, contactCopy } from "@/content/pages";
import { barAreas, barCities, bars } from "@/content/bars";
import { baseLabels, cocktails, flavorLabels, type Cocktail } from "@/content/cocktails";
import { eventUi, events, type SampleEvent } from "@/content/events";
import { guides } from "@/content/guides";
import { homeLayout, type HomeRef } from "@/content/home";
import { services } from "@/content/services";
import { sections } from "@/content/sections";
import { stories } from "@/content/stories";
import type { Article, Bar } from "@/content/types";
import type { CardModel, SearchHit } from "@/lib/cards";
import { t, type Locale, type L10n } from "@/lib/i18n";
import { hrefFor, hrefForDetail, sectionIds } from "@/lib/routes";

const eventKicker = { ja: "EVENTS / サンプル", en: "EVENTS / SAMPLE" };

function articleCard(article: Article, locale: Locale, href: string): CardModel {
  return {
    id: article.slug,
    href,
    kicker: t(article.kicker, locale),
    title: t(article.title, locale),
    dek: t(article.dek, locale),
    byline: t(article.byline, locale),
    credit: t(article.credit, locale),
    tone: article.tone,
  };
}

function barCard(bar: Bar, locale: Locale): CardModel {
  return {
    id: bar.slug,
    href: hrefForDetail(locale, "bar", bar.slug),
    kicker: t(bar.kicker, locale),
    title: t(bar.title, locale),
    dek: t(bar.dek, locale),
    byline: t(bar.byline, locale),
    credit: t(bar.credit, locale),
    tone: bar.tone,
  };
}

function cocktailCard(item: Cocktail, locale: Locale): CardModel {
  return {
    id: item.slug,
    href: hrefForDetail(locale, "cocktail", item.slug),
    kicker: `COCKTAILS / ${t(baseLabels[item.base], locale)}`,
    title: t(item.title, locale),
    dek: t(item.dek, locale),
    byline: `${t(baseLabels[item.base], locale)} · ${t(flavorLabels[item.flavor], locale)}`,
    credit: t(item.credit, locale),
    tone: item.tone,
  };
}

function eventCard(item: SampleEvent, locale: Locale): CardModel {
  return {
    id: item.slug,
    href: `${hrefFor(locale, "events")}#${item.slug}`,
    kicker: t(eventKicker, locale),
    title: t(item.title, locale),
    dek: t(item.dek, locale),
    byline: t(item.when, locale),
    credit: t(item.credit, locale),
    tone: item.tone,
    badge: t(item.status === "upcoming" ? eventUi.upcoming : eventUi.ended, locale),
  };
}

export function cardForRef(ref: HomeRef, locale: Locale): CardModel {
  if (ref.kind === "story") {
    const article = stories.find((item) => item.slug === ref.slug);
    if (!article) throw new Error(`Missing story: ${ref.slug}`);
    return articleCard(article, locale, hrefForDetail(locale, "story", article.slug));
  }
  if (ref.kind === "guide") {
    const article = guides.find((item) => item.slug === ref.slug);
    if (!article) throw new Error(`Missing guide: ${ref.slug}`);
    return articleCard(article, locale, hrefForDetail(locale, "guide", article.slug));
  }
  if (ref.kind === "bar") {
    const bar = bars.find((item) => item.slug === ref.slug);
    if (!bar) throw new Error(`Missing bar: ${ref.slug}`);
    return barCard(bar, locale);
  }
  if (ref.kind === "cocktail") {
    const item = cocktails.find((entry) => entry.slug === ref.slug);
    if (!item) throw new Error(`Missing cocktail: ${ref.slug}`);
    return cocktailCard(item, locale);
  }
  const item = events.find((entry) => entry.slug === ref.slug);
  if (!item) throw new Error(`Missing event: ${ref.slug}`);
  return eventCard(item, locale);
}

export function homeCards(locale: Locale): { lead: CardModel; grid: CardModel[]; latest: CardModel[] } {
  return {
    lead: cardForRef(homeLayout.lead, locale),
    grid: homeLayout.grid.map((ref) => cardForRef(ref, locale)),
    latest: homeLayout.latest.map((ref) => cardForRef(ref, locale)),
  };
}

export function storyCards(locale: Locale): CardModel[] {
  return stories.map((article) => articleCard(article, locale, hrefForDetail(locale, "story", article.slug)));
}

export function guideCards(locale: Locale): CardModel[] {
  return guides.map((article) => articleCard(article, locale, hrefForDetail(locale, "guide", article.slug)));
}

export type BarListItem = {
  id: string;
  cityId: string;
  areaId: string;
  card: CardModel;
};

export function barList(locale: Locale): BarListItem[] {
  return bars.map((bar) => ({
    id: bar.slug,
    cityId: bar.cityId,
    areaId: bar.areaId,
    card: barCard(bar, locale),
  }));
}

export function barFilterOptions(locale: Locale): {
  cities: { id: string; label: string }[];
  areas: { id: string; cityId: string; label: string }[];
} {
  return {
    cities: barCities.map((city) => ({ id: city.id, label: t(city.label, locale) })),
    areas: barAreas.map((area) => ({ id: area.id, cityId: area.cityId, label: t(area.label, locale) })),
  };
}

export function eventCards(locale: Locale): CardModel[] {
  return events.map((item) => eventCard(item, locale));
}

export type CocktailListItem = {
  id: string;
  base: string;
  flavor: string;
  card: CardModel;
};

export function cocktailList(locale: Locale): CocktailListItem[] {
  return cocktails.map((item) => ({
    id: item.slug,
    base: item.base,
    flavor: item.flavor,
    card: cocktailCard(item, locale),
  }));
}

export function storyBySlug(slug: string): Article | undefined {
  return stories.find((item) => item.slug === slug);
}

export function guideBySlug(slug: string): Article | undefined {
  return guides.find((item) => item.slug === slug);
}

export function barBySlug(slug: string): Bar | undefined {
  return bars.find((item) => item.slug === slug);
}

export function cocktailBySlug(slug: string): Cocktail | undefined {
  return cocktails.find((item) => item.slug === slug);
}

export function linkedCards(slugs: readonly string[], locale: Locale): CardModel[] {
  return slugs.map((slug) => {
    const bar = bars.find((item) => item.slug === slug);
    if (bar) return barCard(bar, locale);
    const cocktail = cocktails.find((item) => item.slug === slug);
    if (cocktail) return cocktailCard(cocktail, locale);
    const story = stories.find((item) => item.slug === slug);
    if (story) return articleCard(story, locale, hrefForDetail(locale, "story", story.slug));
    const guide = guides.find((item) => item.slug === slug);
    if (guide) return articleCard(guide, locale, hrefForDetail(locale, "guide", guide.slug));
    throw new Error(`Missing related entry: ${slug}`);
  });
}

export function cocktailsForBar(slug: string, locale: Locale): CardModel[] {
  return cocktails.filter((item) => item.barSlugs.includes(slug)).map((item) => cocktailCard(item, locale));
}

export function barsForCocktail(slug: string, locale: Locale): CardModel[] {
  const cocktail = cocktails.find((item) => item.slug === slug);
  if (!cocktail) return [];
  return cocktail.barSlugs.map((barSlug) => {
    const bar = bars.find((item) => item.slug === barSlug);
    if (!bar) throw new Error(`Cocktail ${slug} links a missing bar: ${barSlug}`);
    return barCard(bar, locale);
  });
}

export function articlesMentioning(slug: string, locale: Locale): CardModel[] {
  const found: CardModel[] = [];
  for (const article of stories) {
    if (article.related.includes(slug)) {
      found.push(articleCard(article, locale, hrefForDetail(locale, "story", article.slug)));
    }
  }
  for (const article of guides) {
    if (article.related.includes(slug)) {
      found.push(articleCard(article, locale, hrefForDetail(locale, "guide", article.slug)));
    }
  }
  return found;
}

export function nearbyBars(slug: string, locale: Locale): CardModel[] {
  const bar = bars.find((item) => item.slug === slug);
  if (!bar) return [];
  const others = bars.filter((item) => item.slug !== slug && item.cityId === bar.cityId);
  const sameArea = others.filter((item) => item.areaId === bar.areaId);
  const sameCity = others.filter((item) => item.areaId !== bar.areaId);
  return [...sameArea, ...sameCity].slice(0, 3).map((item) => barCard(item, locale));
}

function both(copy: L10n): string {
  return `${copy.ja}\n${copy.en}`;
}

function lines(copies: L10n[]): string {
  return copies.map(both).join("\n");
}

function assertGraph(): void {
  const barSlugs = new Set(bars.map((item) => item.slug));
  const cocktailSlugs = new Set(cocktails.map((item) => item.slug));
  const articleSlugs = new Set([...stories, ...guides].map((item) => item.slug));
  for (const cocktail of cocktails) {
    for (const slug of cocktail.barSlugs) {
      if (!barSlugs.has(slug)) throw new Error(`Cocktail ${cocktail.slug} links unknown bar ${slug}`);
    }
  }
  for (const article of [...stories, ...guides]) {
    for (const slug of article.related) {
      if (!barSlugs.has(slug) && !cocktailSlugs.has(slug) && !articleSlugs.has(slug)) {
        throw new Error(`Article ${article.slug} links unknown entry ${slug}`);
      }
    }
  }
}

assertGraph();

export function searchHits(locale: Locale): SearchHit[] {
  const hits: SearchHit[] = [];

  for (const id of sectionIds) {
    const section = sections[id];
    hits.push({
      href: hrefFor(locale, id),
      title: t(section.title, locale),
      kicker: t(section.kicker, locale),
      dek: t(section.lede, locale),
    });
  }

  for (const article of stories) {
    hits.push({
      href: hrefForDetail(locale, "story", article.slug),
      title: t(article.title, locale),
      kicker: t(article.kicker, locale),
      dek: t(article.dek, locale),
      extra: [both(article.title), both(article.pull), lines(article.before), lines(article.after)].join("\n"),
    });
  }

  for (const article of guides) {
    hits.push({
      href: hrefForDetail(locale, "guide", article.slug),
      title: t(article.title, locale),
      kicker: t(article.kicker, locale),
      dek: t(article.dek, locale),
      extra: [both(article.title), both(article.pull), lines(article.before), lines(article.after)].join("\n"),
    });
  }

  for (const bar of bars) {
    const facts = bar.facts
      .filter((fact) => fact.id !== "web" && fact.id !== "instagram")
      .map((fact) => both(fact.value));
    hits.push({
      href: hrefForDetail(locale, "bar", bar.slug),
      title: t(bar.title, locale),
      kicker: t(bar.kicker, locale),
      dek: t(bar.dek, locale),
      extra: [both(bar.title), both(bar.city), both(bar.area), both(bar.byline), ...facts, lines(bar.concept)].join("\n"),
    });
  }

  for (const item of cocktails) {
    const parts = [
      both(item.title),
      both(baseLabels[item.base]),
      both(flavorLabels[item.flavor]),
      lines(item.spec),
      both(item.method),
      both(item.glass),
      item.garnish ? both(item.garnish) : "",
      both(item.history),
      item.japan ? both(item.japan) : "",
    ];
    hits.push({
      href: hrefForDetail(locale, "cocktail", item.slug),
      title: t(item.title, locale),
      kicker: `COCKTAILS / ${t(baseLabels[item.base], locale)}`,
      dek: t(item.dek, locale),
      extra: parts.filter(Boolean).join("\n"),
    });
  }

  for (const item of events) {
    hits.push({
      href: `${hrefFor(locale, "events")}#${item.slug}`,
      title: t(item.title, locale),
      kicker: t(eventKicker, locale),
      dek: t(item.dek, locale),
    });
  }

  for (const service of services) {
    hits.push({
      href: `${hrefFor(locale, "services")}#${service.id}`,
      title: t(service.title, locale),
      kicker: "SERVICES",
      dek: t(service.body, locale),
    });
  }

  hits.push(
    {
      href: hrefFor(locale, "about"),
      title: t(aboutDoc.title, locale),
      kicker: "ABOUT",
      dek: t(aboutDoc.lede, locale),
    },
    {
      href: hrefFor(locale, "contact"),
      title: t(contactCopy.title, locale),
      kicker: "CONTACT",
      dek: t(contactCopy.lede, locale),
    },
  );

  return hits;
}
