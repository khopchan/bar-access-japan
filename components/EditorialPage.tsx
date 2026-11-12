import { aboutDoc, privacyDoc } from "@/content/pages";
import { ui } from "@/content/site";
import { BrandPlate } from "@/components/BrandMark";
import { PageHeader } from "@/components/PageHeader";
import { t, type Locale } from "@/lib/i18n";

export function EditorialPage({ locale, page }: { locale: Locale; page: "about" | "privacy" }) {
  const doc = page === "about" ? aboutDoc : privacyDoc;

  return (
    <article className="sheet">
      <PageHeader kicker={t(doc.kicker, locale)} title={t(doc.title, locale)} lede={t(doc.lede, locale)} />
      {page === "about" ? <BrandPlate caption={t(ui.brandCaption, locale)} /> : null}
      <div className="prose">
        {doc.sections.map((section) => (
          <section key={section.id} aria-labelledby={`${page}-${section.id}`}>
            <h2 id={`${page}-${section.id}`}>{t(section.heading, locale)}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.en}>{t(paragraph, locale)}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
