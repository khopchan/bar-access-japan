import type { L10n } from "@/lib/i18n";
import type { Tone } from "@/lib/tones";

/** Long-form piece. Body is original; sources and the date checked live beside it. */
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
  sources: string[];
  related: string[];
  lastVerified: string;
};

export type BarFact = {
  id: string;
  label: L10n;
  value: L10n;
};

/** official: the bar’s own page. secondary: another listing. unverified: confirm before a visit. */
export type HoursStatus = "official" | "secondary" | "unverified";

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
  cityId: string;
  areaId: string;
  city: L10n;
  area: L10n;
  hoursStatus: HoursStatus;
  sources: string[];
  lastVerified: string;
};
