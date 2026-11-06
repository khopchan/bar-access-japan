import Link from "next/link";
import { footerNav } from "@/content/navigation";
import { brand, site, ui } from "@/content/site";
import { LangSwitch, type LanguageLink } from "@/components/LangSwitch";
import { AnalyticsPreferencesButton } from "@/components/AnalyticsConsent";
import { t, type Locale } from "@/lib/i18n";
import { hrefFor, type PageId } from "@/lib/routes";

export function SiteFooter({ locale, page }: { locale: Locale; page: PageId }) {
  const languages: LanguageLink[] = [
    { href: hrefFor("ja", page), label: "JP", lang: "ja", current: locale === "ja" },
    { href: hrefFor("en", page), label: "EN", lang: "en", current: locale === "en" },
  ];
  const year = new Date().getFullYear();
  const beforePrivacy = footerNav.filter((item) => item.id !== "privacy");
  const privacy = footerNav.find((item) => item.id === "privacy");

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-mark latin-display">{brand.name}</p>
        <p className="footer-line">{t(brand.line, locale)}</p>
        <nav aria-label={t(ui.footerNav, locale)}>
          <ul className="footer-links">
            {beforePrivacy.map((item) => (
              <li key={item.id}>
                <Link href={hrefFor(locale, item.id)} aria-current={page === item.id ? "page" : undefined}>
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
            <li><AnalyticsPreferencesButton locale={locale} /></li>
            {privacy ? (
              <li>
                <Link href={hrefFor(locale, privacy.id)} aria-current={page === privacy.id ? "page" : undefined}>
                  {t(privacy.label, locale)}
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
        {site.instagram.pending ? <p className="footer-note">{t(site.instagram.note, locale)}</p> : null}
        <LangSwitch languages={languages} />
        <p className="footer-legal">
          © {year} {brand.name} · {t(ui.prototypeMark, locale)}
        </p>
      </div>
    </footer>
  );
}
