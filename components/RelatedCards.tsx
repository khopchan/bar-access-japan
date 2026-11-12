import { StoryCard } from "@/components/StoryCard";
import type { CardModel } from "@/lib/cards";

export function RelatedCards({
  id,
  title,
  cards,
  frameLabel,
}: {
  id: string;
  title: string;
  cards: CardModel[];
  frameLabel: string;
}) {
  if (cards.length === 0) return null;

  return (
    <section className="related" data-reveal aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      <ol className="card-grid">
        {cards.map((card) => (
          <li key={card.id}>
            <StoryCard card={card} frameLabel={frameLabel} heading="h3" variant="grid" />
          </li>
        ))}
      </ol>
    </section>
  );
}
