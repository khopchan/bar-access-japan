import Link from "next/link";
import { footerNav, mainNav } from "@/content/navigation";
import { brand, site, ui } from "@/content/site";
import { AnalyticsPreferencesButton } from "@/components/AnalyticsConsent";
import { Shield } from "@/components/BrandMark";
import { LangSwitch, type LanguageLink } from "@/components/LangSwitch";
import { t, type Locale } from "@/lib/i18n";
import { hrefFor, type PageId } from "@/lib/routes";

export function SiteFooter({
  locale,
  languages,
  current,
}: {
  locale: Locale;
  languages: LanguageLink[];
  current: PageId;
}) {
  const year = new Date().getFullYear();
  const beforePrivacy = footerNav.filter((item) => item.id !== "privacy");
  const privacy = footerNav.find((item) => item.id === "privacy");

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand-plate brand-plate-compact">
            <Shield className="brand-shield" />
          </div>
          <p className="footer-line">{t(brand.line, locale)}</p>
        </div>
        <div className="footer-columns">
          <nav aria-label={t(ui.primaryNav, locale)}>
            <ul className="footer-links">
              {mainNav.map((item) => (
                <li key={item.id}>
                  <Link href={hrefFor(locale, item.id)} aria-current={current === item.id ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t(ui.footerNav, locale)}>
            <ul className="footer-links">
              {beforePrivacy.map((item) => (
                <li key={item.id}>
                  <Link href={hrefFor(locale, item.id)} aria-current={current === item.id ? "page" : undefined}>
                    {t(item.label, locale)}
                  </Link>
                </li>
              ))}
              <li>
                <a href={site.instagram.href} target="_blank" rel="noopener noreferrer">
                  {site.instagram.label}
                  <span className="visually-hidden"> {t(ui.newTab, locale)}</span>
                </a>
              </li>
              <li>
                <AnalyticsPreferencesButton locale={locale} />
              </li>
              {privacy ? (
                <li>
                  <Link href={hrefFor(locale, privacy.id)} aria-current={current === privacy.id ? "page" : undefined}>
                    {t(privacy.label, locale)}
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
        {site.instagram.pending ? <p className="footer-note">{t(site.instagram.note, locale)}</p> : null}
        <LangSwitch languages={languages} />
        <p className="footer-legal">
          © {year} {brand.name} · {t(ui.prototypeMark, locale)}
        </p>
      </div>
    </footer>
  );
}
