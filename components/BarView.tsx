import Link from "next/link";
import { RelatedCards } from "@/components/RelatedCards";
import { Placeholder } from "@/components/Placeholder";
import { ReadingProgress } from "@/components/Motion";
import { Sources } from "@/components/Sources";
import { ui } from "@/content/site";
import type { Bar, BarFact, HoursStatus } from "@/content/types";
import { articlesMentioning, cocktailsForBar, nearbyBars } from "@/lib/catalog";
import { t, type Locale } from "@/lib/i18n";
import { hostLabel, isHttp } from "@/lib/links";
import { hrefFor } from "@/lib/routes";

const secondaryMark = {
  ja: "（二次情報・訪問前に要確認）",
  en: "(secondary source; please confirm)",
} as const;

const secondaryLabel = {
  ja: "二次情報・訪問前に要確認",
  en: "secondary source; please confirm",
} as const;

export function BarView({ locale, bar }: { locale: Locale; bar: Bar }) {
  const frame = t(ui.photoLabel, locale);
  const drinks = cocktailsForBar(bar.slug, locale);
  const stories = articlesMentioning(bar.slug, locale);
  const nearby = nearbyBars(bar.slug, locale);

  return (
    <article className="sheet bar-sheet">
      <ReadingProgress />
      <Placeholder tone={bar.tone} label={frame} credit={t(bar.credit, locale)} ratio="wide" />
      <header className="page-header bar-header">
        <p className="kicker">{t(bar.kicker, locale)}</p>
        <h1>{t(bar.title, locale)}</h1>
        <p className="lede">{t(bar.dek, locale)}</p>
        <p className="meta">
          <span className="byline">{t(bar.byline, locale)}</span>
        </p>
      </header>
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
              <div key={fact.id} className={factClass(fact, bar.hoursStatus)}>
                <dt>{t(fact.label, locale)}</dt>
                <dd>
                  <FactValue fact={fact} locale={locale} hoursStatus={bar.hoursStatus} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
      <Sources locale={locale} urls={bar.sources} lastVerified={bar.lastVerified} />
      <RelatedCards id="related-drinks" title={t(ui.linkedDrinks, locale)} cards={drinks} frameLabel={frame} />
      <RelatedCards id="related-stories" title={t(ui.mentionedTitle, locale)} cards={stories} frameLabel={frame} />
      <RelatedCards id="related-nearby" title={t(ui.nearbyTitle, locale)} cards={nearby} frameLabel={frame} />
      <p className="article-back">
        <Link className="text-link" href={hrefFor(locale, "bars")}>
          EXPLORE BARS
          <span aria-hidden="true"> →</span>
        </Link>
      </p>
    </article>
  );
}

function factClass(fact: BarFact, hoursStatus: HoursStatus): string {
  if (fact.id === "checked") return "fact fact-checked";
  if (fact.id === "hours" && hoursStatus !== "official") return "fact fact-caution";
  return "fact";
}

function FactValue({
  fact,
  locale,
  hoursStatus,
}: {
  fact: BarFact;
  locale: Locale;
  hoursStatus: HoursStatus;
}) {
  const value = t(fact.value, locale);
  if (fact.id === "hours") return <HoursValue value={value} status={hoursStatus} locale={locale} />;
  if ((fact.id === "web" || fact.id === "instagram") && isHttp(value)) {
    const label = fact.id === "instagram" ? "Instagram" : hostLabel(value);
    return (
      <a href={value} target="_blank" rel="noopener noreferrer">
        {label}
        <span className="visually-hidden"> {t(ui.newTab, locale)}</span>
      </a>
    );
  }
  return value;
}

function HoursValue({ value, status, locale }: { value: string; status: HoursStatus; locale: Locale }) {
  if (status === "secondary") {
    const mark = secondaryMark[locale];
    const body = value.endsWith(mark) ? value.slice(0, -mark.length).trim() : value;
    return (
      <>
        {body ? <span className="hours-body">{body}</span> : null}
        <span className="caution">{secondaryLabel[locale]}</span>
      </>
    );
  }
  if (status === "unverified") return <span className="caution">{value}</span>;
  return value;
}
