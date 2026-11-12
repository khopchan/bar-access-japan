import type { Tone } from "@/lib/tones";

export type CardModel = {
  id: string;
  href: string;
  kicker: string;
  title: string;
  dek: string;
  byline: string;
  credit: string;
  tone: Tone;
  badge?: string;
};

export type SearchHit = {
  href: string;
  title: string;
  kicker: string;
  dek: string;
};
