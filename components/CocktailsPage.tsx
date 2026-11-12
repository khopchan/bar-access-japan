import { baseLabels, cocktailUi, flavorLabels, flavors, spiritBases } from "@/content/cocktails";
import { sections } from "@/content/sections";
import { ui } from "@/content/site";
import { CocktailBrowser } from "@/components/CocktailBrowser";
import { PageHeader } from "@/components/PageHeader";
import { PrototypeNotice } from "@/components/PrototypeNotice";
import { cocktailList } from "@/lib/catalog";
import { t, type Locale } from "@/lib/i18n";

export function CocktailsPage({ locale }: { locale: Locale }) {
  const section = sections.cocktails;

  return (
    <article className="sheet">
      <PageHeader kicker={t(section.kicker, locale)} title={t(section.title, locale)} lede={t(section.lede, locale)} />
      <PrototypeNotice locale={locale} />
      <CocktailBrowser
        locale={locale}
        sampleLabel={t(ui.sample, locale)}
        items={cocktailList(locale)}
        labels={{
          base: t(cocktailUi.base, locale),
          flavor: t(cocktailUi.flavor, locale),
          all: t(cocktailUi.all, locale),
          empty: t(cocktailUi.empty, locale),
          bases: spiritBases.map((id) => ({ id, label: t(baseLabels[id], locale) })),
          flavors: flavors.map((id) => ({ id, label: t(flavorLabels[id], locale) })),
        }}
      />
    </article>
  );
}
