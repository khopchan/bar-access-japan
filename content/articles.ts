import type { Article } from "@/content/types";
import { asCopy, asTone } from "@/content/load";

type Copy = { ja: string; en: string };

export type EditorialArticle = {
  slug: string;
  tone: string;
  kicker: Copy;
  title: Copy;
  dek: Copy;
  byline: Copy;
  credit: Copy;
  before: Copy[];
  pull: Copy;
  after: Copy[];
};

export type ArticleExtra = {
  slug: string;
  sources: string[];
  related: string[];
  lastVerified: string;
};

export function loadArticles(editorial: EditorialArticle[], extras: ArticleExtra[]): Article[] {
  if (editorial.length !== extras.length) {
    throw new Error(`Article count mismatch: ${editorial.length} editorial, ${extras.length} rich`);
  }
  const extraBySlug = new Map<string, ArticleExtra>();
  for (const extra of extras) {
    if (extraBySlug.has(extra.slug)) throw new Error(`Duplicate article slug: ${extra.slug}`);
    extraBySlug.set(extra.slug, extra);
  }

  return editorial.map((item) => {
    const extra = extraBySlug.get(item.slug);
    if (!extra) throw new Error(`Missing rich article: ${item.slug}`);
    if (!extra.sources.length) throw new Error(`No sources for ${item.slug}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(extra.lastVerified)) throw new Error(`Bad verification date on ${item.slug}`);
    return {
      slug: item.slug,
      tone: asTone(item.tone, item.slug),
      kicker: asCopy(item.kicker, item.slug, "kicker"),
      title: asCopy(item.title, item.slug, "title"),
      dek: asCopy(item.dek, item.slug, "dek"),
      byline: asCopy(item.byline, item.slug, "byline"),
      credit: asCopy(item.credit, item.slug, "credit"),
      before: item.before.map((paragraph, index) => asCopy(paragraph, item.slug, `before[${index}]`)),
      pull: asCopy(item.pull, item.slug, "pull"),
      after: item.after.map((paragraph, index) => asCopy(paragraph, item.slug, `after[${index}]`)),
      sources: extra.sources,
      related: extra.related,
      lastVerified: extra.lastVerified,
    };
  });
}
