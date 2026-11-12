import Link from "next/link";
import { RelatedCards } from "@/components/RelatedCards";
import { Placeholder } from "@/components/Placeholder";
import { ReadingProgress } from "@/components/Motion";
import { Sources } from "@/components/Sources";
import { baseLabels, cocktailUi, flavorLabels, type Cocktail } from "@/content/cocktails";
import { ui, verifiedValue } from "@/content/site";
import { articlesMentioning, barsForCocktail } from "@/lib/catalog";
import { t, type Locale } from "@/lib/i18n";
import { sourceLabel } from "@/lib/links";
import { hrefFor } from "@/lib/routes";

export function CocktailView({ locale, cocktail }: { locale: Locale; cocktail: Cocktail }) {
  const frame = t(ui.photoLabel, locale);
  const bars = barsForCocktail(cocktail.slug, locale);
  const stories = articlesMentioning(cocktail.slug, locale);
  const checked = locale === "ja" ? "確認日" : "Date checked";

  return (
    <article className="sheet">
      <ReadingProgress />
      <Placeholder tone={cocktail.tone} label={frame} credit={t(cocktail.credit, locale)} ratio="wide" />
      <header className="page-header bar-header">
        <p className="kicker">COCKTAILS / {t(baseLabels[cocktail.base], locale)}</p>
        <h1>{t(cocktail.title, locale)}</h1>
        <p className="lede">{t(cocktail.dek, locale)}</p>
        <p className="meta">
          <span className="byline">
            {t(baseLabels[cocktail.base], locale)} · {t(flavorLabels[cocktail.flavor], locale)}
          </span>
        </p>
      </header>
      <div className="bar-body">
        <section className="prose" aria-labelledby="cocktail-history">
          <h2 id="cocktail-history">{t(cocktailUi.history, locale)}</h2>
          <p>{t(cocktail.history, locale)}</p>
          {cocktail.japan ? (
            <>
              <h2 id="cocktail-japan">{t(cocktailUi.japan, locale)}</h2>
              <p>{t(cocktail.japan, locale)}</p>
            </>
          ) : null}
        </section>
        <section className="facts" data-reveal aria-labelledby="cocktail-recipe">
          <h2 id="cocktail-recipe">{t(cocktailUi.recipe, locale)}</h2>
          <p className="group-note">{t(cocktailUi.recipeNote, locale)}</p>
          <dl>
            <div className="fact">
              <dt>{t(cocktailUi.ingredients, locale)}</dt>
              <dd>
                <span className="spec-lines">
                  {cocktail.spec.map((line, index) => (
                    <span key={index}>{t(line, locale)}</span>
                  ))}
                </span>
              </dd>
            </div>
            <div className="fact">
              <dt>{t(cocktailUi.method, locale)}</dt>
              <dd>{t(cocktail.method, locale)}</dd>
            </div>
            <div className="fact">
              <dt>{t(cocktailUi.glass, locale)}</dt>
              <dd>{t(cocktail.glass, locale)}</dd>
            </div>
            {cocktail.garnish ? (
              <div className="fact">
                <dt>{t(cocktailUi.garnish, locale)}</dt>
                <dd>{t(cocktail.garnish, locale)}</dd>
              </div>
            ) : null}
            <div className="fact">
              <dt>{t(cocktailUi.specSource, locale)}</dt>
              <dd>
                <a href={cocktail.specSource} title={cocktail.specSource} target="_blank" rel="noopener noreferrer">
                  {sourceLabel(cocktail.specSource)}
                  <span className="visually-hidden"> {t(ui.newTab, locale)}</span>
                </a>
              </dd>
            </div>
            <div className="fact fact-checked">
              <dt>{checked}</dt>
              <dd>{verifiedValue(cocktail.lastVerified, locale)}</dd>
            </div>
          </dl>
        </section>
      </div>
      <Sources locale={locale} urls={cocktail.sources} lastVerified={cocktail.lastVerified} />
      <RelatedCards id="related-bars" title={t(ui.linkedBars, locale)} cards={bars} frameLabel={frame} />
      <RelatedCards id="related-stories" title={t(ui.mentionedTitle, locale)} cards={stories} frameLabel={frame} />
      <p className="article-back">
        <Link className="text-link" href={hrefFor(locale, "cocktails")}>
          COCKTAILS
          <span aria-hidden="true"> →</span>
        </Link>
      </p>
    </article>
  );
}
