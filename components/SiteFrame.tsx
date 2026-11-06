import type { ReactNode } from "react";
import { mainNav } from "@/content/navigation";
import { ui } from "@/content/site";
import { SiteFooter } from "@/components/SiteFooter";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";
import { SiteHeader, type HeaderModel } from "@/components/SiteHeader";
import { t, type Locale } from "@/lib/i18n";
import { hrefFor, type PageId } from "@/lib/routes";

export function SiteFrame({
  locale,
  page,
  children,
}: {
  locale: Locale;
  page: PageId;
  children: ReactNode;
}) {
  const model: HeaderModel = {
    locale,
    pageId: page,
    overlay: page === "home",
    homeHref: hrefFor(locale, "home"),
    menuOpenLabel: t(ui.menuOpen, locale),
    menuCloseLabel: t(ui.menuClose, locale),
    navLabel: t(ui.primaryNav, locale),
    items: mainNav.map((item) => ({
      href: hrefFor(locale, item.id),
      label: item.label,
      current: item.id === page,
    })),
    languages: [
      { href: hrefFor("ja", page), label: "JP", lang: "ja", current: locale === "ja" },
      { href: hrefFor("en", page), label: "EN", lang: "en", current: locale === "en" },
    ],
  };

  return (
    <div lang={locale} className={locale === "en" ? "locale-en" : "locale-ja"}>
      <a className="skip-link" href="#main">
        {t(ui.skip, locale)}
      </a>
      <SiteHeader model={model} />
      <main id="main" tabIndex={-1} className={page === "home" ? "page page-home" : "page page-sheet"}>
        {children}
      </main>
      <SiteFooter locale={locale} page={page} />
      <AnalyticsConsent locale={locale} />
    </div>
  );
}
