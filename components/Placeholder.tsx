import type { Tone } from "@/lib/tones";

export function Placeholder({
  tone,
  label,
  credit,
  ratio = "portrait",
}: {
  tone: Tone;
  label: string;
  credit?: string;
  ratio?: "portrait" | "landscape" | "wide" | "square";
}) {
  return (
    <figure className={`ph ph-${ratio}`}>
      <span className={`ph-fill ph-${tone}`} aria-hidden="true" />
      <span className="ph-label">{label}</span>
      {credit ? <figcaption className="ph-credit">{credit}</figcaption> : null}
    </figure>
  );
}
