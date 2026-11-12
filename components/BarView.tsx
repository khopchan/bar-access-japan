import Link from "next/link";
import { ui } from "@/content/site";
import type { Bar } from "@/content/types";
import { ReadingProgress } from "@/components/Motion";
import { Placeholder } from "@/components/Placeholder";
import { PrototypeNotice } from "@/components/PrototypeNotice";
import { StoryCard } from "@/components/StoryCard";
import { relatedBars } from "@/lib/catalog";
import { t, type Locale } from "@/lib/i18n";
import { hrefFor } from "@/lib/routes";

export function BarView({ locale, bar }: { locale: Locale; bar: Bar }) {
  const sample = t(ui.sample, locale);
  const related = relatedBars(bar.slug, locale);

  return (
    <article className="sheet bar-sheet">
      <ReadingProgress />
      <Placeholder tone={bar.tone} label={sample} credit={t(bar.credit, locale)} ratio="wide" />
      <header className="page-header bar-header">
        <p className="kicker">{t(bar.kicker, locale)}</p>
        <h1>{t(bar.title, locale)}</h1>
        <p className="lede">{t(bar.dek, locale)}</p>
        <p className="meta">
          <span className="byline">{t(bar.byline, locale)}</span>
        </p>
      </header>
      <PrototypeNotice locale={locale} />
      <div className="bar-body">
        <section className="prose" aria-labelledby="bar-concept">
          <h2 id="bar-concept">{t(ui.conceptTitle, locale)}</h2>
          {bar.concept.map((paragraph, index) => (
            <p key={index}>{t(paragraph, locale)}</p>
          ))}
        </section>
        <section className="facts" data-reveal aria-labelledby="bar-facts">
          <h2 id="bar-facts">{t(ui.practicalTitle, locale)}</h2>
          <dl>
            {bar.facts.map((fact) => (
              <div key={fact.id} className={fact.id === "checked" ? "fact fact-checked" : "fact"}>
                <dt>{t(fact.label, locale)}</dt>
                <dd>{t(fact.value, locale)}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
      <p className="article-back">
        <Link className="text-link" href={hrefFor(locale, "bars")}>
          EXPLORE BARS
          <span aria-hidden="true"> →</span>
        </Link>
      </p>
      {related.length > 0 ? (
        <section className="related" data-reveal aria-labelledby="related-bars">
          <h2 id="related-bars">{t(ui.relatedTitle, locale)}</h2>
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
