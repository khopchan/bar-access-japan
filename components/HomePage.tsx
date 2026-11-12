import Link from "next/link";
import { brand, ui } from "@/content/site";
import { StoryCard } from "@/components/StoryCard";
import { homeCards } from "@/lib/catalog";
import { t, type Locale } from "@/lib/i18n";
import { hrefFor } from "@/lib/routes";

export function HomePage({ locale }: { locale: Locale }) {
  const { lead, grid, latest } = homeCards(locale);
  const sample = t(ui.sample, locale);

  return (
    <div className="home">
      <div className="masthead-block">
        <p className="masthead">{t(brand.line, locale)}</p>
        <p className="hero-note">{t(ui.heroNote, locale)}</p>
        <p className="lead-actions">
          <Link className="text-link" href={hrefFor(locale, "bars")}>
            {t(ui.findBar, locale)}
            <span aria-hidden="true"> →</span>
          </Link>
          <Link className="text-link" href={hrefFor(locale, "cocktails")}>
            {t(ui.findCocktail, locale)}
            <span aria-hidden="true"> →</span>
          </Link>
        </p>
      </div>

      <StoryCard card={lead} sampleLabel={sample} heading="h1" variant="lead" />

      <div className="home-split">
        <ol className="card-grid">
          {grid.map((card) => (
            <li key={card.id} data-reveal>
              <StoryCard card={card} sampleLabel={sample} heading="h2" variant="grid" />
            </li>
          ))}
        </ol>
        <section className="latest" aria-labelledby="latest-heading">
          <h2 id="latest-heading" className="latest-title">
            {t(ui.latestTitle, locale)}
          </h2>
          <ol className="river">
            {latest.map((card) => (
              <li key={card.id} data-reveal>
                <StoryCard card={card} sampleLabel={sample} heading="h3" variant="river" />
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
