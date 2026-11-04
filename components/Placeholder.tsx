import type { Tone } from "@/lib/tones";

export function Placeholder({ tone, label }: { tone: Tone; label: string }) {
  return (
    <div className={`ph ph-${tone}`}>
      <span className="ph-label">{label}</span>
    </div>
  );
}
