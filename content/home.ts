import type { L10n } from "@/lib/i18n";
import type { SectionId } from "@/lib/routes";
import type { Tone } from "@/lib/tones";

export const exploreCards: { id: SectionId; text: L10n }[] = [
  {
    id: "bars",
    text: {
      ja: "店を探す。いま置いているのは、実在しないサンプルだけです。",
      en: "Look for bars. Only fictional samples are listed.",
    },
  },
  {
    id: "cocktails",
    text: {
      ja: "カクテルを探す。レシピも価格も、まだありません。",
      en: "Look for cocktails. No recipes and no prices yet.",
    },
  },
  {
    id: "stories",
    text: {
      ja: "夜の読みもの。人物も店も架空です。",
      en: "Reading for the night. People and bars are fictional.",
    },
  },
  {
    id: "events",
    text: {
      ja: "集まりの予告。日程も会場も未定のサンプルです。",
      en: "Notices of gatherings. Dates and places are unset samples.",
    },
  },
  {
    id: "guide",
    text: {
      ja: "バーでの過ごし方。特定の店への案内ではありません。",
      en: "How to spend time in a bar. Not a route to any one address.",
    },
  },
];

/** トップの PICK UP。表示は最大3件。 */
export const pickups: {
  id: string;
  page: SectionId;
  tone: Tone;
  kicker: L10n;
  title: L10n;
  summary: L10n;
}[] = [
  {
    id: "pickup-story",
    page: "stories",
    tone: "lacquer",
    kicker: { ja: "STORY / サンプル", en: "STORY / SAMPLE" },
    title: { ja: "カウンターの静けさについて", en: "On the Quiet of the Counter" },
    summary: {
      ja: "試作のためのサンプル原稿です。実在の店や人は出てきません。",
      en: "A sample essay for this prototype. No real bar or person appears.",
    },
  },
  {
    id: "pickup-cocktail",
    page: "cocktails",
    tone: "wine",
    kicker: { ja: "COCKTAIL / サンプル", en: "COCKTAIL / SAMPLE" },
    title: { ja: "サンプル 01 — 香りと余白", en: "Sample 01 — Aroma and Space" },
    summary: {
      ja: "架空のカクテルです。レシピと価格は書いていません。",
      en: "A fictional cocktail. The recipe and the price are absent.",
    },
  },
  {
    id: "pickup-guide",
    page: "guide",
    tone: "bone",
    kicker: { ja: "GUIDE / サンプル", en: "GUIDE / SAMPLE" },
    title: { ja: "はじめての夜に、三つの作法", en: "Three Manners for a First Night" },
    summary: {
      ja: "バーでの過ごし方を示すサンプルです。特定の店舗案内ではありません。",
      en: "A sample of how to spend time in a bar. Not a guide to a specific venue.",
    },
  },
];
