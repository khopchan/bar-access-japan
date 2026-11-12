import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import type { CardModel } from "@/lib/cards";

const ratio = {
  lead: "landscape",
  feature: "landscape",
  grid: "portrait",
  river: "square",
} as const;

export function StoryCard({
  card,
  sampleLabel,
  heading,
  variant,
}: {
  card: CardModel;
  sampleLabel: string;
  heading: "h1" | "h2" | "h3";
  variant: keyof typeof ratio;
}) {
  const Title = heading;
  const onFigure = variant === "lead" || variant === "feature";

  return (
    <article id={card.id} className={`story-card is-${variant}`}>
      <Link href={card.href}>
        <Placeholder tone={card.tone} label={sampleLabel} ratio={ratio[variant]} credit={onFigure ? card.credit : undefined} />
        <div className="card-copy">
          <p className="kicker-row">
            <span className="kicker">{card.kicker}</span>
            {card.badge ? <span className="badge">{card.badge}</span> : null}
          </p>
          <Title>{card.title}</Title>
          <p className="dek">{card.dek}</p>
          <p className="meta">
            <span className="byline">{card.byline}</span>
            {onFigure ? null : <span className="credit-line">{card.credit}</span>}
          </p>
        </div>
      </Link>
    </article>
  );
}
