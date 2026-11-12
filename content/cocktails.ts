import type { L10n } from "@/lib/i18n";
import type { Tone } from "@/lib/tones";

/**
 * 味の方向だけを示すサンプル。銘柄・配合・価格は書かない。
 */
export const spiritBases = ["gin", "whisky", "shochu", "wine", "unspecified"] as const;
export type SpiritBase = (typeof spiritBases)[number];

export const flavors = ["aroma", "finish", "light", "after"] as const;
export type Flavor = (typeof flavors)[number];

export const baseLabels: Record<SpiritBase, L10n> = {
  gin: { ja: "ジン", en: "Gin" },
  whisky: { ja: "ウイスキー", en: "Whisky" },
  shochu: { ja: "焼酎", en: "Shochu" },
  wine: { ja: "ワイン", en: "Wine" },
  unspecified: { ja: "指定なし", en: "Unspecified" },
};

export const flavorLabels: Record<Flavor, L10n> = {
  aroma: { ja: "香り", en: "Aroma" },
  finish: { ja: "余韻", en: "Finish" },
  light: { ja: "軽い", en: "Light" },
  after: { ja: "食後", en: "After" },
};

export const cocktailUi = {
  base: { ja: "ベース", en: "Base" },
  flavor: { ja: "味わい", en: "Flavor" },
  all: { ja: "すべて", en: "All" },
  empty: {
    ja: "この条件に合うサンプルはありません。",
    en: "No sample matches these filters.",
  },
  shownJa: "件",
  shownEn: "shown",
} as const;

export type Cocktail = {
  slug: string;
  tone: Tone;
  title: L10n;
  dek: L10n;
  credit: L10n;
  base: SpiritBase;
  flavor: Flavor;
};

const credit: L10n = { ja: "写真クレジット未設定", en: "Photo credit unset" };

export const cocktails: Cocktail[] = [
  {
    slug: "cocktail-01",
    tone: "wine",
    base: "gin",
    flavor: "aroma",
    credit,
    title: { ja: "サンプル 01 — 香りと余白", en: "Sample 01 — Aroma and space" },
    dek: {
      ja: "短い香りが先に立つ、という方向だけです。材料、配合、価格は書いていません。",
      en: "One direction only: a short aroma arrives first. Ingredients, measures, and price are absent.",
    },
  },
  {
    slug: "cocktail-02",
    tone: "ink",
    base: "whisky",
    flavor: "finish",
    credit,
    title: { ja: "サンプル 02 — 長い余韻", en: "Sample 02 — A long finish" },
    dek: {
      ja: "食後に想像するためのサンプルです。ベースの銘柄は指定していません。",
      en: "A sample meant to be imagined after a meal. No brand of the base spirit is named.",
    },
  },
  {
    slug: "cocktail-03",
    tone: "bone",
    base: "unspecified",
    flavor: "light",
    credit,
    title: { ja: "サンプル 03 — 低い度数", en: "Sample 03 — A lower strength" },
    dek: {
      ja: "会話が続く夜、という方向です。度数の数字もレシピもありません。",
      en: "A direction: a night that leaves room for talk. There is no number for the strength, and no recipe.",
    },
  },
  {
    slug: "cocktail-04",
    tone: "lacquer",
    base: "wine",
    flavor: "after",
    credit,
    title: { ja: "サンプル 04 — 食後の仮定", en: "Sample 04 — An after-dinner assumption" },
    dek: {
      ja: "食事のあと、という位置だけを示すサンプルです。産地も価格も未設定です。",
      en: "A sample that marks only a place in the night: after the meal. Origin and price are unset.",
    },
  },
  {
    slug: "cocktail-05",
    tone: "dusk",
    base: "shochu",
    flavor: "aroma",
    credit,
    title: { ja: "サンプル 05 — 短い香り", en: "Sample 05 — A short aroma" },
    dek: {
      ja: "焼酎をベースの分類に置いた、架空の一杯です。銘柄は書いていません。",
      en: "A fictional drink filed under shochu as a base category. No brand is written.",
    },
  },
  {
    slug: "cocktail-06",
    tone: "ash",
    base: "gin",
    flavor: "light",
    credit,
    title: { ja: "サンプル 06 — 会話のための一杯", en: "Sample 06 — A drink for talk" },
    dek: {
      ja: "長く席にいる夜、という方向です。配合はサンプルにも載せていません。",
      en: "A direction: a night spent longer at the seat. The sample does not carry a formula.",
    },
  },
  {
    slug: "cocktail-07",
    tone: "wine",
    base: "unspecified",
    flavor: "finish",
    credit,
    title: { ja: "サンプル 07 — 余韻だけ", en: "Sample 07 — Finish alone" },
    dek: {
      ja: "何をベースにするかを、わざと未設定にしたサンプルです。",
      en: "A sample that leaves the base unspecified on purpose.",
    },
  },
  {
    slug: "cocktail-08",
    tone: "ink",
    base: "whisky",
    flavor: "after",
    credit,
    title: { ja: "サンプル 08 — 食後の想定", en: "Sample 08 — Imagined after dinner" },
    dek: {
      ja: "ウイスキーという分類だけのサンプルです。銘柄も価格もありません。",
      en: "A sample of the category whisky, and nothing finer. No brand and no price.",
    },
  },
];
