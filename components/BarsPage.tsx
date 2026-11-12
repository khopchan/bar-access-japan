import { barUi } from "@/content/bars";
import { sections } from "@/content/sections";
import { ui } from "@/content/site";
import { BarBrowser } from "@/components/BarBrowser";
import { PageHeader } from "@/components/PageHeader";
import { barFilterOptions, barList } from "@/lib/catalog";
import { t, type Locale } from "@/lib/i18n";

export function BarsPage({ locale }: { locale: Locale }) {
  const section = sections.bars;
  const filters = barFilterOptions(locale);

  return (
    <article className="sheet">
      <PageHeader kicker={t(section.kicker, locale)} title={t(section.title, locale)} lede={t(section.lede, locale)} />
      <BarBrowser
        locale={locale}
        frameLabel={t(ui.photoLabel, locale)}
        items={barList(locale)}
        cities={filters.cities}
        areas={filters.areas}
        labels={{
          city: t(barUi.city, locale),
          area: t(barUi.area, locale),
          all: t(barUi.all, locale),
          empty: t(barUi.empty, locale),
        }}
      />
    </article>
  );
}
