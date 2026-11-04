import Link from "next/link";
import { exploreCards, pickups } from "@/content/home";
import { mainNav } from "@/content/navigation";
import { brand, ui } from "@/content/site";
import { otherLocale, t, type Locale } from "@/lib/i18n";
import { hrefFor } from "@/lib/routes";

const categories = ["bars", "cocktails", "stories", "events", "guide"] as const;

export function HomePage({ locale }: { locale: Locale }) {
  const secondary = otherLocale(locale);
  return (
    <div className="editorial-home">
      <section className="editorial-hero" aria-labelledby="editorial-hero-title">
        <div className="editorial-hero-visual" aria-hidden="true">
          <div className="editorial-hero-orb" />
          <div className="editorial-hero-reflection" />
          <span className="editorial-hero-visual-note">JAPAN / AFTER DARK</span>
        </div>
        <div className="editorial-hero-body">
          <p className="editorial-overline">AN INDEPENDENT GUIDE TO JAPAN'S BAR CULTURE <span className="editorial-red-dot">●</span> EST. 2026</p>
          <h1 id="editorial-hero-title" lang={locale}>
            {locale === "ja" ? <>THE ART OF<br /><em>THE NIGHT.</em></> : <>THE ART OF<br /><em>THE NIGHT.</em></>}
          </h1>
          <div className="editorial-hero-bottom">
            <div className="editorial-hero-description">
              <p lang={locale}>{t(brand.line, locale)}</p>
              <span lang={secondary}>{t(brand.line, secondary)}</span>
            </div>
            <div className="editorial-hero-actions">
              <Link href={hrefFor(locale, "bars")}>{t(ui.findBar, locale)} <span aria-hidden="true">↗</span></Link>
              <Link href={hrefFor(locale, "cocktails")}>{t(ui.findCocktail, locale)} <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
        <div className="editorial-hero-side" aria-hidden="true">DISCOVER THE CULTURE · BEHIND EVERY GLASS</div>
      </section>

      <section className="editorial-explore" aria-labelledby="explore-heading">
        <div className="editorial-section-kicker"><span>01 / DISCOVER</span><span>FIVE WAYS IN</span></div>
        <div className="editorial-heading-row">
          <h2 id="explore-heading">Explore <em>Japan.</em></h2>
          <p>{locale === "ja" ? "ひとつのグラスから、まだ知らない日本の夜へ。" : "Five perspectives on the people, places and rituals of Japan after dark."}</p>
        </div>
        <div className="editorial-explore-grid">
          {categories.map((id, i) => {
            const card = exploreCards.find((c) => c.id === id);
            const label = mainNav.find((c) => c.id === id)?.label ?? id;
            return (
              <Link className={`editorial-explore-card editorial-card-${id}`} href={hrefFor(locale, id)} key={id}>
                <div className="editorial-card-art" aria-hidden="true"><span className="editorial-art-shape" /></div>
                <div className="editorial-card-info">
                  <span className="editorial-card-number">{String(i + 1).padStart(2, "0")} / 05</span>
                  <h3>{label}</h3>
                  <p>{card ? t(card.text, locale) : ""}</p>
                  <span className="editorial-card-arrow" aria-hidden="true">↗</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="editorial-pickup" aria-labelledby="pickup-heading">
        <div className="editorial-section-kicker"><span>02 / EDITOR'S SELECTION</span><span>CURATED FOR YOU</span></div>
        <div className="editorial-heading-row editorial-pickup-heading">
          <h2 id="pickup-heading">The <em>edit.</em></h2>
          <p>{locale === "ja" ? "日本のバー文化を、少し深く知るための入り口。" : "Stories and discoveries from the world behind the bar."}</p>
        </div>
        <ol className="editorial-pickup-grid">
          {pickups.slice(0, 3).map((item, index) => (
            <li key={item.id}>
              <Link href={hrefFor(locale, item.page)} className="editorial-pickup-card">
                <div className={`editorial-pickup-art editorial-pickup-art-${index + 1}`} aria-hidden="true"><span /></div>
                <p className="editorial-pickup-meta">{t(item.kicker, locale)} <span>— {String(index + 1).padStart(2, "0")}</span></p>
                <h3>{t(item.title, locale)}</h3>
                <p className="editorial-pickup-summary">{t(item.summary, locale)}</p>
                <span className="editorial-read">{t(ui.read, locale)} ↗</span>
              </Link>
            </li>
          ))}
        </ol>
        <p className="editorial-prototype-disclosure">{locale === "ja" ? "掲載イメージはデザイン検証用の抽象アートワークです。記事・店舗・イベントの情報は公開前に編集確認します。" : "Abstract artwork is used for design review. Editorial content and venue details are subject to verification before publication."}</p>
      </section>
    </div>
  );
}
