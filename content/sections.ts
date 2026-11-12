import type { L10n } from "@/lib/i18n";
import type { SectionId } from "@/lib/routes";

/**
 * 5つのセクションの導入。個別の項目は stories / bars / cocktails / events / guides にある。
 * イベントだけは、まだサンプルである。
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
      ja: "東京のエリアから京都、大阪、福岡まで。営業時間には出典の確度を添えています。二次情報と、まだ確認できない時間は、訪れる前に店へ確認してください。",
      en: "From Tokyo’s neighborhoods to Kyoto, Osaka, and Fukuoka. Hours show how sure the source is. Confirm a secondary or unchecked time with the bar before you visit.",
    },
  },
  cocktails: {
    kicker: { ja: "COCKTAILS", en: "COCKTAILS" },
    title: { ja: "カクテルを探す", en: "Cocktails" },
    lede: {
      ja: "日本のバーで出会う一杯と、出典にある標準のレシピです。ベースと味わいで絞れます。店では分量も作り方も異なることがあります。",
      en: "Drinks you meet in Japanese bars, with a standard recipe from a cited source. Filter by base and flavor. A bar may measure and build it differently.",
    },
  },
  stories: {
    kicker: { ja: "STORIES", en: "STORIES" },
    title: { ja: "物語", en: "Stories" },
    lede: {
      ja: "賞の夜、ハイボール、横浜の古典、雪国、銀座のハードシェイク。確認できた範囲で書いています。",
      en: "Awards night, the highball, Yokohama’s classics, Yukiguni, and Ginza’s hard shake — written within what could be checked.",
    },
  },
  events: {
    kicker: { ja: "EVENTS", en: "EVENTS" },
    title: { ja: "イベント", en: "Events" },
    lede: {
      ja: "集まりを置く場所です。いま並んでいるのはサンプルだけで、日程も会場も実在の告知ではありません。",
      en: "A place for gatherings. What is listed now is sample material only. The dates and rooms are not real announcements.",
    },
  },
  guide: {
    kicker: { ja: "GUIDE", en: "GUIDE" },
    title: { ja: "案内", en: "Guide" },
    lede: {
      ja: "席料の目安と、おまかせのカウンターの過ごし方です。特定の店の規則そのものではありません。",
      en: "A note on cover charges, and on sitting down to an omakase counter. Not a house rule copied from any one bar.",
    },
  },
};
