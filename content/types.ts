import type { L10n } from "@/lib/i18n";
import type { Tone } from "@/lib/tones";

/** Long-form sample. People, bars, and dates in the prose are not real. */
export type Article = {
  slug: string;
  tone: Tone;
  kicker: L10n;
  title: L10n;
  dek: L10n;
  byline: L10n;
  credit: L10n;
  before: L10n[];
  pull: L10n;
  after: L10n[];
};

export type BarFact = {
  id: string;
  label: L10n;
  value: L10n;
};

export type Bar = {
  slug: string;
  tone: Tone;
  kicker: L10n;
  title: L10n;
  dek: L10n;
  byline: L10n;
  credit: L10n;
  concept: L10n[];
  facts: BarFact[];
};
