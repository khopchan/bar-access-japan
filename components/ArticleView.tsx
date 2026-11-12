import Link from "next/link";
import { RelatedCards } from "@/components/RelatedCards";
import { ReadingProgress } from "@/components/Motion";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { Sources } from "@/components/Sources";
import { ui, verifiedLabel } from "@/content/site";
import type { Article } from "@/content/types";
import { linkedCards } from "@/lib/catalog";
import { t, type Locale } from "@/lib/i18n";
import { hrefFor, type DetailKind } from "@/lib/routes";

export function ArticleView({
  locale,
  article,
  kind,
}: {
  locale: Locale;
  article: Article;
  kind: Extract<DetailKind, "story" | "guide">;
}) {
  const frame = t(ui.photoLabel, locale);
  const related = linkedCards(article.related, locale);
  const sectionHref = hrefFor(locale, kind === "story" ? "stories" : "guide");
  const sectionLabel = kind === "story" ? "STORIES" : "GUIDE";

  return (
    <article className="sheet article-sheet">
      <ReadingProgress />
      <PageHeader kicker={t(article.kicker, locale)} title={t(article.title, locale)} lede={t(article.dek, locale)} />
      <p className="meta article-meta">
        <span className="byline">{t(article.byline, locale)}</span>
        <span>{verifiedLabel(article.lastVerified, locale)}</span>
      </p>
      <Placeholder tone={article.tone} label={frame} credit={t(article.credit, locale)} ratio="wide" />
      <div className="prose">
        {article.before.map((paragraph, index) => (
          <p key={`before-${index}`}>{t(paragraph, locale)}</p>
        ))}
        <blockquote className="pull" data-reveal>
          <p>{t(article.pull, locale)}</p>
          <footer>{t(ui.pullCaption, locale)}</footer>
        </blockquote>
        {article.after.map((paragraph, index) => (
          <p key={`after-${index}`}>{t(paragraph, locale)}</p>
        ))}
      </div>
      <Sources locale={locale} urls={article.sources} lastVerified={article.lastVerified} />
      <RelatedCards id="related-heading" title={t(ui.relatedTitle, locale)} cards={related} frameLabel={frame} />
      <p className="article-back">
        <Link className="text-link" href={sectionHref}>
          {sectionLabel}
          <span aria-hidden="true"> →</span>
        </Link>
      </p>
    </article>
  );
}
