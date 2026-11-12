import Link from "next/link";
import { ui } from "@/content/site";
import type { Article } from "@/content/types";
import { ReadingProgress } from "@/components/Motion";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { PrototypeNotice } from "@/components/PrototypeNotice";
import { StoryCard } from "@/components/StoryCard";
import { relatedJournal } from "@/lib/catalog";
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
  const sample = t(ui.sample, locale);
  const related = relatedJournal(kind, article.slug, locale);
  const sectionHref = hrefFor(locale, kind === "story" ? "stories" : "guide");
  const sectionLabel = kind === "story" ? "STORIES" : "GUIDE";

  return (
    <article className="sheet article-sheet">
      <ReadingProgress />
      <PageHeader kicker={t(article.kicker, locale)} title={t(article.title, locale)} lede={t(article.dek, locale)} />
      <p className="meta article-meta">
        <span className="byline">{t(article.byline, locale)}</span>
      </p>
      <PrototypeNotice locale={locale} />
      <Placeholder tone={article.tone} label={sample} credit={t(article.credit, locale)} ratio="wide" />
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
      <p className="article-back">
        <Link className="text-link" href={sectionHref}>
          {sectionLabel}
          <span aria-hidden="true"> →</span>
        </Link>
      </p>
      {related.length > 0 ? (
        <section className="related" data-reveal aria-labelledby="related-heading">
          <h2 id="related-heading">{t(ui.relatedTitle, locale)}</h2>
          <ol className="card-grid">
            {related.map((card) => (
              <li key={card.id}>
                <StoryCard card={card} sampleLabel={sample} heading="h3" variant="grid" />
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </article>
  );
}
