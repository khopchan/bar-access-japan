import { ui } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";
import { PrototypeNotice } from "@/components/PrototypeNotice";
import { StoryCard } from "@/components/StoryCard";
import type { CardModel } from "@/lib/cards";
import { t, type Locale } from "@/lib/i18n";

export function CategoryLanding({
  locale,
  kicker,
  title,
  lede,
  featured,
  rest,
}: {
  locale: Locale;
  kicker: string;
  title: string;
  lede: string;
  featured: CardModel | null;
  rest: CardModel[];
}) {
  const sample = t(ui.sample, locale);

  return (
    <article className="sheet">
      <PageHeader kicker={kicker} title={title} lede={lede} />
      <PrototypeNotice locale={locale} />
      {featured ? <StoryCard card={featured} sampleLabel={sample} heading="h2" variant="feature" /> : null}
      {rest.length > 0 ? (
        <ol className="river river-list">
          {rest.map((card) => (
            <li key={card.id} data-reveal>
              <StoryCard card={card} sampleLabel={sample} heading="h3" variant="river" />
            </li>
          ))}
        </ol>
      ) : null}
    </article>
  );
}
