import { sections } from "@/content/sections";
import { ui } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { PrototypeNotice } from "@/components/PrototypeNotice";
import { t, type Locale } from "@/lib/i18n";
import type { SectionId } from "@/lib/routes";

export function SectionPage({ locale, page }: { locale: Locale; page: SectionId }) {
  const section = sections[page];

  return (
    <article className="sheet">
      <PageHeader
        kicker={t(section.kicker, locale)}
        title={t(section.title, locale)}
        lede={t(section.lede, locale)}
      />
      <PrototypeNotice locale={locale} />
      <ol className="entry-list">
        {section.entries.map((entry, index) => (
          <li key={entry.id} className="entry">
            <span className="index">{String(index + 1).padStart(2, "0")}</span>
            <Placeholder tone={entry.tone} label={t(ui.sample, locale)} />
            <div className="entry-copy">
              <p className="eyebrow">{t(entry.kicker, locale)}</p>
              <h2>{t(entry.title, locale)}</h2>
              <p>{t(entry.body, locale)}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
