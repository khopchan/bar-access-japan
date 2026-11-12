import type { L10n } from "@/lib/i18n";
import { tones, type Tone } from "@/lib/tones";

export function asTone(value: string, slug: string): Tone {
  if ((tones as readonly string[]).includes(value)) return value as Tone;
  throw new Error(`Unknown tone “${value}” on ${slug}`);
}

export function asCopy(value: { ja?: string; en?: string } | null | undefined, slug: string, field: string): L10n {
  if (!value || typeof value.ja !== "string" || typeof value.en !== "string" || !value.ja.trim() || !value.en.trim()) {
    throw new Error(`Missing ${field} on ${slug}`);
  }
  return { ja: value.ja, en: value.en };
}
