import Link from "next/link";
import { exploreCards, pickups } from "@/content/home";
import { mainNav } from "@/content/navigation";
import { brand, ui } from "@/content/site";
import { Placeholder } from "@/components/Placeholder";
import { otherLocale, t, type Locale } from "@/lib/i18n";
import { hrefFor } from "@/lib/routes";

const PICKUP_LIMIT = 3;

export function HomePage({ locale }: { locale: Locale }) {
  const secondary = otherLocale(locale);
  const visiblePickups = pickups.slice(0, PICKUP_LIMIT);

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">{brand.name}</p>
          <h1 lang={locale}>{t(brand.line, locale)}</h1>
          <p className="hero-sub" lang={secondary}>
            {t(brand.line, secondary)}
          </p>
          <div className="hero-actions">
            <Link className="hero-cta" href={hrefFor(locale, "bars")}>
              {t(ui.findBar, locale)}
              <span aria-hidden="true"> →</span>
            </Link>
            <Link className="hero-cta hero-cta-secondary" href={hrefFor(locale, "cocktails")}>
              {t(ui.findCocktail, locale)}
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
          <p className="hero-note">{t(ui.heroNote, locale)}</p>
        </div>
      </section>

      <section className="explore" aria-labelledby="explore-heading">
        <div className="section-inner">
          <div className="section-head">
            <h2 id="explore-heading" className="latin-display">
              {t(ui.exploreTitle, locale)}
            </h2>
            <p>{t(ui.exploreSub, locale)}</p>
          </div>
          <ol className="explore-list">
            {exploreCards.map((card, index) => {
              const label = mainNav.find((item) => item.id === card.id)?.label ?? card.id;
              const number = String(index + 1).padStart(2, "0");
              return (
                <li key={card.id}>
                  <Link className="explore-link" href={hrefFor(locale, card.id)}>
                    <span className="index">{number}</span>
                    <span className="explore-label">{label}</span>
                    <span className="explore-text">{t(card.text, locale)}</span>
                    <span className="explore-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="pickup" aria-labelledby="pickup-heading">
        <div className="section-inner">
          <div className="section-head">
            <h2 id="pickup-heading" className="latin-display">
              {t(ui.pickupTitle, locale)}
            </h2>
            <p>{t(ui.pickupSub, locale)}</p>
          </div>
          <ol className="pickup-list">
            {visiblePickups.map((item) => (
              <li key={item.id}>
                <article className="pickup-card">
                  <Link className="pickup-link" href={hrefFor(locale, item.page)}>
                    <Placeholder tone={item.tone} label={t(ui.sample, locale)} />
                    <p className="eyebrow">{t(item.kicker, locale)}</p>
                    <h3>{t(item.title, locale)}</h3>
                    <p>{t(item.summary, locale)}</p>
                    <span className="text-link">
                      {t(ui.read, locale)}
                      <span aria-hidden="true"> →</span>
                    </span>
                  </Link>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
