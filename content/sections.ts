import type { L10n } from "@/lib/i18n";
import type { SectionId } from "@/lib/routes";

/**
 * 5つのセクションの導入。個別の項目は stories / bars / cocktails / events / guides にある。
 * 実在の店名・人物・住所・価格・イベントは書かない。
 */
export type SectionIntro = {
  kicker: L10n;
  title: L10n;
  lede: L10n;
};

export const sections: Record<SectionId, SectionIntro> = {
  bars: {
    kicker: { ja: "EXPLORE BARS", en: "EXPLORE BARS" },
    title: { ja: "バーを探す", en: "Explore bars" },
    lede: {
      ja: "店を探すための場所です。いま並んでいるのは試作のサンプルで、営業時間も住所も未設定です。",
      en: "A place to look for bars. What is listed now is prototype sample material. Hours and addresses are unset.",
    },
  },
  cocktails: {
    kicker: { ja: "COCKTAILS", en: "COCKTAILS" },
    title: { ja: "カクテルを探す", en: "Cocktails" },
    lede: {
      ja: "カクテルを探すための場所です。味の方向だけを示すサンプルで、レシピと価格はありません。ベースと味わいで絞れます。",
      en: "A place to look for cocktails. These samples suggest a direction of taste. There is no recipe and no price. Filter by base and flavor.",
    },
  },
  stories: {
    kicker: { ja: "STORIES", en: "STORIES" },
    title: { ja: "物語", en: "Stories" },
    lede: {
      ja: "バー文化をめぐる読みものです。人物も店も、ここにあるのは架空のサンプルです。",
      en: "Reading on bar culture. The people and the places here are fictional samples.",
    },
  },
  events: {
    kicker: { ja: "EVENTS", en: "EVENTS" },
    title: { ja: "イベント", en: "Events" },
    lede: {
      ja: "集まりや夜の予定を置く場所です。日程も会場も未定のサンプルだけを、これからと終了に分けて置いています。",
      en: "A place for gatherings. Only samples are shown, with the date and the room unset, split into upcoming and ended.",
    },
  },
  guide: {
    kicker: { ja: "GUIDE", en: "GUIDE" },
    title: { ja: "案内", en: "Guide" },
    lede: {
      ja: "バーという場所の過ごし方を、短く残すための案内です。特定の店への行き方ではありません。",
      en: "Short notes on how to be in a bar. Not directions to any particular address.",
    },
  },
};
