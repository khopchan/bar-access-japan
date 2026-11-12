import type { L10n } from "@/lib/i18n";
import type { Tone } from "@/lib/tones";
import { asCopy, asTone } from "@/content/load";
import editorialJson from "@/research/cocktails.json";
import richJson from "@/research/cocktails.data.json";

/**
 * ベースの分類。データ側の baseSpirit を、フィルターに出す分類へ対応させる。
 * bitter-aperitif（アメリカーノ）は aperitif。指定なしには落とさない。
 */
const SPIRIT = {
  gin: "gin",
  whisky: "whisky",
  rum: "rum",
  vodka: "vodka",
  brandy: "brandy",
  tequila: "tequila",
  liqueur: "liqueur",
  shochu: "shochu",
  wine: "wine",
  sherry: "sherry",
  "bitter-aperitif": "aperitif",
} as const;

export const spiritBases = [
  "gin",
  "whisky",
  "rum",
  "vodka",
  "brandy",
  "tequila",
  "liqueur",
  "shochu",
  "wine",
  "sherry",
  "aperitif",
] as const;
export type SpiritBase = (typeof spiritBases)[number];

export const flavors = ["aroma", "finish", "light", "after"] as const;
export type Flavor = (typeof flavors)[number];

export const baseLabels: Record<SpiritBase, L10n> = {
  gin: { ja: "ジン", en: "Gin" },
  whisky: { ja: "ウイスキー", en: "Whisky" },
  rum: { ja: "ラム", en: "Rum" },
  vodka: { ja: "ウオッカ", en: "Vodka" },
  brandy: { ja: "ブランデー", en: "Brandy" },
  tequila: { ja: "テキーラ", en: "Tequila" },
  liqueur: { ja: "リキュール", en: "Liqueur" },
  shochu: { ja: "焼酎", en: "Shochu" },
  wine: { ja: "ワイン", en: "Wine" },
  sherry: { ja: "シェリー", en: "Sherry" },
  aperitif: { ja: "ビター・アペリティフ", en: "Bitter aperitif" },
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
    ja: "この条件に合うカクテルはありません。",
    en: "No cocktails match these filters.",
  },
  recipe: { ja: "レシピ", en: "Recipe" },
  ingredients: { ja: "材料", en: "Ingredients" },
  method: { ja: "作り方", en: "Method" },
  glass: { ja: "グラス", en: "Glass" },
  garnish: { ja: "ガーニッシュ", en: "Garnish" },
  specSource: { ja: "配合の出典", en: "Spec source" },
  history: { ja: "来歴", en: "History" },
  japan: { ja: "日本のバーでは", en: "In Japanese bars" },
  recipeNote: {
    ja: "配合は出典にある標準のレシピです。店では分量も作り方も異なることがあります。",
    en: "This is a standard spec from the cited source. A bar may measure and build it differently.",
  },
} as const;

export type Cocktail = {
  slug: string;
  tone: Tone;
  title: L10n;
  dek: L10n;
  credit: L10n;
  base: SpiritBase;
  flavor: Flavor;
  spec: L10n[];
  specSource: string;
  method: L10n;
  glass: L10n;
  garnish: L10n | null;
  history: L10n;
  japan: L10n | null;
  barSlugs: string[];
  sources: string[];
  lastVerified: string;
};

type Copy = { ja: string; en: string };

type EditorialCocktail = {
  slug: string;
  tone: string;
  title: Copy;
  dek: Copy;
  credit: Copy;
  flavor: string;
};

type RichCocktail = {
  slug: string;
  baseSpirit: string;
  spec: Copy[];
  specSource: string;
  method: Copy;
  glass: Copy;
  garnish: Copy | null;
  history: Copy;
  japan: Copy | null;
  barSlugs: string[];
  sources: string[];
  lastVerified: string;
};

function spiritOf(value: string, slug: string): SpiritBase {
  if (Object.prototype.hasOwnProperty.call(SPIRIT, value)) return SPIRIT[value as keyof typeof SPIRIT];
  throw new Error(`Unknown base spirit “${value}” on ${slug}`);
}

function flavorOf(value: string, slug: string): Flavor {
  if ((flavors as readonly string[]).includes(value)) return value as Flavor;
  throw new Error(`Unknown flavor “${value}” on ${slug}`);
}

function loadCocktails(editorial: EditorialCocktail[], rich: RichCocktail[]): Cocktail[] {
  if (editorial.length !== rich.length) {
    throw new Error(`Cocktail count mismatch: ${editorial.length} editorial, ${rich.length} rich`);
  }
  const richBySlug = new Map<string, RichCocktail>();
  for (const item of rich) {
    if (richBySlug.has(item.slug)) throw new Error(`Duplicate cocktail slug: ${item.slug}`);
    richBySlug.set(item.slug, item);
  }

  return editorial.map((item) => {
    const extra = richBySlug.get(item.slug);
    if (!extra) throw new Error(`Missing rich cocktail: ${item.slug}`);
    if (!extra.sources.length) throw new Error(`No sources for ${item.slug}`);
    if (!/^https?:\/\//.test(extra.specSource)) throw new Error(`Bad spec source on ${item.slug}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(extra.lastVerified)) throw new Error(`Bad verification date on ${item.slug}`);
    return {
      slug: item.slug,
      tone: asTone(item.tone, item.slug),
      title: asCopy(item.title, item.slug, "title"),
      dek: asCopy(item.dek, item.slug, "dek"),
      credit: asCopy(item.credit, item.slug, "credit"),
      base: spiritOf(extra.baseSpirit, item.slug),
      flavor: flavorOf(item.flavor, item.slug),
      spec: extra.spec.map((line, index) => asCopy(line, item.slug, `spec[${index}]`)),
      specSource: extra.specSource,
      method: asCopy(extra.method, item.slug, "method"),
      glass: asCopy(extra.glass, item.slug, "glass"),
      garnish: extra.garnish ? asCopy(extra.garnish, item.slug, "garnish") : null,
      history: asCopy(extra.history, item.slug, "history"),
      japan: extra.japan ? asCopy(extra.japan, item.slug, "japan") : null,
      barSlugs: extra.barSlugs,
      sources: extra.sources,
      lastVerified: extra.lastVerified,
    };
  });
}

export const cocktails: Cocktail[] = loadCocktails(
  editorialJson as EditorialCocktail[],
  richJson as RichCocktail[],
);
