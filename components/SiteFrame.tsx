import type { ReactNode } from "react";
import { mainNav } from "@/content/navigation";
import { brand, ui } from "@/content/site";
import { Newsletter } from "@/components/Newsletter";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, type HeaderModel } from "@/components/SiteHeader";
import { searchHits } from "@/lib/catalog";
import { t, type Locale } from "@/lib/i18n";
import { alternateHrefs, hrefFor, navId, type ParsedRoute } from "@/lib/routes";

export function SiteFrame({ route, children }: { route: ParsedRoute; children: ReactNode }) {
  const locale: Locale = route.locale;
  const current = navId(route);
  const alternates = alternateHrefs(route);
  const languages = [
    { href: alternates.ja, label: "JP", lang: "ja", current: locale === "ja" },
    { href: alternates.en, label: "EN", lang: "en", current: locale === "en" },
  ];

  const model: HeaderModel = {
    homeHref: hrefFor(locale, "home"),
    brandName: brand.name,
    menuOpenLabel: t(ui.menuOpen, locale),
    menuCloseLabel: t(ui.menuClose, locale),
    navLabel: t(ui.primaryNav, locale),
    items: mainNav.map((item) => ({
      href: hrefFor(locale, item.id),
      label: item.label,
      current: item.id === current,
    })),
    languages,
    search: {
      openLabel: t(ui.searchOpen, locale),
      closeLabel: t(ui.searchClose, locale),
      placeholder: t(ui.searchPlaceholder, locale),
      hint: t(ui.searchHint, locale),
      empty: t(ui.searchEmpty, locale),
      more: t(ui.searchMore, locale),
      label: t(ui.searchLabel, locale),
      hits: searchHits(locale),
    },
  };

  return (
    <div lang={locale} className={locale === "en" ? "locale-en" : "locale-ja"}>
      <a className="skip-link" href="#main">
        {t(ui.skip, locale)}
      </a>
      <SiteHeader model={model} />
      <main id="main" tabIndex={-1}>
        {children}
        <Newsletter
          kicker={t(ui.newsletterKicker, locale)}
          title={t(ui.newsletterTitle, locale)}
          body={t(ui.newsletterBody, locale)}
          emailLabel={t(ui.newsletterEmail, locale)}
          submitLabel={t(ui.newsletterSubmit, locale)}
          errorLabel={t(ui.newsletterError, locale)}
          thanksTitle={t(ui.newsletterThanksTitle, locale)}
          thanksBody={t(ui.newsletterThanksBody, locale)}
        />
      </main>
      <SiteFooter locale={locale} languages={languages} current={current} />
    </div>
  );
}
