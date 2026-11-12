import { eventUi, events } from "@/content/events";
import { sections } from "@/content/sections";
import { ui } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";
import { PrototypeNotice } from "@/components/PrototypeNotice";
import { StoryCard } from "@/components/StoryCard";
import { eventCards } from "@/lib/catalog";
import type { CardModel } from "@/lib/cards";
import { t, type Locale } from "@/lib/i18n";

export function EventsPage({ locale }: { locale: Locale }) {
  const section = sections.events;
  const sample = t(ui.sample, locale);
  const cards = new Map(eventCards(locale).map((card) => [card.id, card]));
  const pick = (status: "upcoming" | "ended"): CardModel[] =>
    events.filter((item) => item.status === status).flatMap((item) => {
      const card = cards.get(item.slug);
      return card ? [card] : [];
    });
  const upcoming = pick("upcoming");
  const ended = pick("ended");
  const [featured, ...rest] = upcoming;

  return (
    <article className="sheet">
      <PageHeader kicker={t(section.kicker, locale)} title={t(section.title, locale)} lede={t(section.lede, locale)} />
      <PrototypeNotice locale={locale} />

      <section className="event-group" aria-labelledby="events-upcoming">
        <h2 id="events-upcoming">{t(eventUi.upcoming, locale)}</h2>
        <p className="group-note">{t(eventUi.upcomingNote, locale)}</p>
        {featured ? <StoryCard card={featured} frameLabel={sample} heading="h3" variant="feature" /> : null}
        {rest.length > 0 ? (
          <ol className="river river-list">
            {rest.map((card) => (
              <li key={card.id} data-reveal>
                <StoryCard card={card} frameLabel={sample} heading="h3" variant="river" />
              </li>
            ))}
          </ol>
        ) : null}
      </section>

      <section className="event-group" aria-labelledby="events-ended">
        <h2 id="events-ended">{t(eventUi.ended, locale)}</h2>
        <p className="group-note">{t(eventUi.endedNote, locale)}</p>
        <ol className="river river-list">
          {ended.map((card) => (
            <li key={card.id} data-reveal>
              <StoryCard card={card} frameLabel={sample} heading="h3" variant="river" />
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
