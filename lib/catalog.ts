import { aboutDoc, contactCopy } from "@/content/pages";
import { bars } from "@/content/bars";
import { baseLabels, cocktails, flavorLabels, type Cocktail } from "@/content/cocktails";
import { eventUi, events, type SampleEvent } from "@/content/events";
import { guides } from "@/content/guides";
import { homeLayout, type HomeRef } from "@/content/home";
import { services } from "@/content/services";
import { sections } from "@/content/sections";
import { stories } from "@/content/stories";
import type { Article, Bar } from "@/content/types";
import type { CardModel, SearchHit } from "@/lib/cards";
import { t, type Locale } from "@/lib/i18n";
import { hrefFor, hrefForDetail, sectionIds } from "@/lib/routes";

const sampleKicker = { ja: "サンプル", en: "Sample" };

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
    href: `${hrefFor(locale, "cocktails")}#${item.slug}`,
    kicker: t({ ja: "COCKTAILS / サンプル", en: "COCKTAILS / SAMPLE" }, locale),
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
    kicker: t({ ja: "EVENTS / サンプル", en: "EVENTS / SAMPLE" }, locale),
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
    if (!article) throw new Error(`Missing sample story: ${ref.slug}`);
    return articleCard(article, locale, hrefForDetail(locale, "story", article.slug));
  }
  if (ref.kind === "guide") {
    const article = guides.find((item) => item.slug === ref.slug);
    if (!article) throw new Error(`Missing sample guide: ${ref.slug}`);
    return articleCard(article, locale, hrefForDetail(locale, "guide", article.slug));
  }
  if (ref.kind === "bar") {
    const bar = bars.find((item) => item.slug === ref.slug);
    if (!bar) throw new Error(`Missing sample bar: ${ref.slug}`);
    return barCard(bar, locale);
  }
  if (ref.kind === "cocktail") {
    const item = cocktails.find((entry) => entry.slug === ref.slug);
    if (!item) throw new Error(`Missing sample cocktail: ${ref.slug}`);
    return cocktailCard(item, locale);
  }
  const item = events.find((entry) => entry.slug === ref.slug);
  if (!item) throw new Error(`Missing sample event: ${ref.slug}`);
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

export function barCards(locale: Locale): CardModel[] {
  return bars.map((bar) => barCard(bar, locale));
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

export function relatedJournal(kind: "story" | "guide", slug: string, locale: Locale): CardModel[] {
  const primary = kind === "story" ? stories : guides;
  const secondary = kind === "story" ? guides : stories;
  const primaryCards = primary
    .filter((item) => item.slug !== slug)
    .map((item) => articleCard(item, locale, hrefForDetail(locale, kind, item.slug)));
  const secondaryKind = kind === "story" ? "guide" : "story";
  const secondaryCards = secondary.map((item) =>
    articleCard(item, locale, hrefForDetail(locale, secondaryKind, item.slug)),
  );
  return [...primaryCards, ...secondaryCards].slice(0, 3);
}

export function relatedBars(slug: string, locale: Locale): CardModel[] {
  return bars
    .filter((item) => item.slug !== slug)
    .slice(0, 3)
    .map((item) => barCard(item, locale));
}

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
    });
  }

  for (const article of guides) {
    hits.push({
      href: hrefForDetail(locale, "guide", article.slug),
      title: t(article.title, locale),
      kicker: t(article.kicker, locale),
      dek: t(article.dek, locale),
    });
  }

  for (const bar of bars) {
    hits.push({
      href: hrefForDetail(locale, "bar", bar.slug),
      title: t(bar.title, locale),
      kicker: t(bar.kicker, locale),
      dek: t(bar.dek, locale),
    });
  }

  for (const item of cocktails) {
    hits.push({
      href: `${hrefFor(locale, "cocktails")}#${item.slug}`,
      title: t(item.title, locale),
      kicker: t(sampleKicker, locale),
      dek: t(item.dek, locale),
    });
  }

  for (const item of events) {
    hits.push({
      href: `${hrefFor(locale, "events")}#${item.slug}`,
      title: t(item.title, locale),
      kicker: t(sampleKicker, locale),
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
