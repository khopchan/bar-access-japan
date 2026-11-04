import type { L10n } from "@/lib/i18n";
import type { SectionId } from "@/lib/routes";
import type { Tone } from "@/lib/tones";

export const exploreCards: { id: SectionId; text: L10n }[] = [
  { id:"bars", text:{ja:"都市とエリアから、バーとの出会いを。",en:"Find your way into the city's bar scene."} },
  { id:"cocktails", text:{ja:"一杯に宿る味わいとストーリー。",en:"Discover the stories behind the glass."} },
  { id:"stories", text:{ja:"人と文化、その舞台裏を読む。",en:"The people and ideas shaping the culture."} },
  { id:"events", text:{ja:"バー文化が交差する瞬間へ。",en:"Where the bar community comes together."} },
  { id:"guide", text:{ja:"はじめての一杯から、もっと深く。",en:"An introduction to the art of the bar."} },
];
/** Editorial placeholders only. Never present as verified reporting. */
export const pickups: {
 id:string;page:SectionId;tone:Tone;kicker:L10n;title:L10n;summary:L10n;
}[]=[
 {id:"pickup-story",page:"stories",tone:"lacquer",kicker:{ja:"STORIES / PREVIEW",en:"STORIES / PREVIEW"},title:{ja:"カウンターの向こう側にある文化",en:"The culture behind the counter"},summary:{ja:"公開準備中の編集テーマ。実在の人物・店舗を紹介する記事ではありません。",en:"An editorial theme in development, not a report about a specific person or venue."}},
 {id:"pickup-cocktail",page:"cocktails",tone:"wine",kicker:{ja:"COCKTAILS / PREVIEW",en:"COCKTAILS / PREVIEW"},title:{ja:"一杯から始まる発見",en:"A world in every glass"},summary:{ja:"カクテルの魅力を伝える企画のプレビューです。",en:"A preview of the stories and craft behind cocktails."}},
 {id:"pickup-guide",page:"guide",tone:"bone",kicker:{ja:"GUIDE / PREVIEW",en:"GUIDE / PREVIEW"},title:{ja:"日本のバーをもっと身近に",en:"Your introduction to Japanese bars"},summary:{ja:"訪日客や初心者に向けたガイドの企画プレビューです。",en:"A preview of the guide for first-time visitors and curious travelers."}}
];