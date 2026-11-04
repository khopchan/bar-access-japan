import type { L10n } from "@/lib/i18n";
import type { SectionId } from "@/lib/routes";
import type { Tone } from "@/lib/tones";

/**
 * 5つのセクションページ。名前はすべてサンプル。
 * 実在の店名・人物・住所・価格・イベントは書かない。
 */
export type SectionEntry = {
  id: string;
  tone: Tone;
  kicker: L10n;
  title: L10n;
  body: L10n;
};

export type SectionContent = {
  kicker: L10n;
  title: L10n;
  lede: L10n;
  entries: SectionEntry[];
};

export const sections: Record<SectionId, SectionContent> = {
  bars: {
    kicker: { ja: "EXPLORE BARS", en: "EXPLORE BARS" },
    title: { ja: "バーを探す", en: "Explore bars" },
    lede: {
      ja: "店を探すための場所です。いま並んでいるのは試作のサンプルで、営業時間も住所も未設定です。",
      en: "A place to look for bars. What is listed now is prototype sample material. Hours and addresses are unset.",
    },
    entries: [
      {
        id: "bar-a",
        tone: "lacquer",
        kicker: { ja: "サンプル", en: "Sample" },
        title: { ja: "サンプル店舗 A", en: "Sample venue A" },
        body: {
          ja: "カウンターが中心の小さな店、という設定です。店名、住所、価格は未設定です。",
          en: "A setting only: a small bar built around the counter. The name, address, and prices are unset.",
        },
      },
      {
        id: "bar-b",
        tone: "ash",
        kicker: { ja: "サンプル", en: "Sample" },
        title: { ja: "サンプル店舗 B", en: "Sample venue B" },
        body: {
          ja: "ホテルの一角にある店、という設定です。系列名や所在地は未設定です。",
          en: "A setting only: a bar in the corner of a hotel. The group name and the location are unset.",
        },
      },
      {
        id: "bar-c",
        tone: "dusk",
        kicker: { ja: "サンプル", en: "Sample" },
        title: { ja: "サンプル店舗 C", en: "Sample venue C" },
        body: {
          ja: "夜だけ開く店、という設定です。営業時間も住所も未設定です。",
          en: "A setting only: a bar that opens at night. Hours and the address are unset.",
        },
      },
    ],
  },
  cocktails: {
    kicker: { ja: "COCKTAILS", en: "COCKTAILS" },
    title: { ja: "カクテルを探す", en: "Cocktails" },
    lede: {
      ja: "カクテルを探すための場所です。味の方向だけを示すサンプルで、レシピと価格はありません。",
      en: "A place to look for cocktails. These samples suggest a direction of taste. There is no recipe and no price.",
    },
    entries: [
      {
        id: "cocktail-01",
        tone: "wine",
        kicker: { ja: "サンプル", en: "Sample" },
        title: { ja: "サンプル 01 — 香りと余白", en: "Sample 01 — Aroma and space" },
        body: {
          ja: "短い香りが先に立つ、という方向だけを示すサンプルです。材料、配合、価格は書いていません。",
          en: "A sample of one direction: a short aroma arrives first. Ingredients, measures, and price are absent.",
        },
      },
      {
        id: "cocktail-02",
        tone: "ink",
        kicker: { ja: "サンプル", en: "Sample" },
        title: { ja: "サンプル 02 — 長い余韻", en: "Sample 02 — A long finish" },
        body: {
          ja: "食後に想像するためのサンプルです。ベースとなる酒の銘柄は指定していません。",
          en: "A sample meant to be imagined after a meal. No base spirit is named.",
        },
      },
      {
        id: "cocktail-03",
        tone: "bone",
        kicker: { ja: "サンプル", en: "Sample" },
        title: { ja: "サンプル 03 — 低い度数", en: "Sample 03 — A lower strength" },
        body: {
          ja: "会話が続く夜、という方向のサンプルです。レシピはありません。",
          en: "A sample in the direction of a night that leaves room for talk. There is no recipe.",
        },
      },
    ],
  },
  stories: {
    kicker: { ja: "STORIES", en: "STORIES" },
    title: { ja: "物語", en: "Stories" },
    lede: {
      ja: "バー文化をめぐる読みものです。人物も店も、ここにあるのは架空のサンプルです。",
      en: "Reading on bar culture. The people and the places here are fictional samples.",
    },
    entries: [
      {
        id: "story-quiet",
        tone: "dusk",
        kicker: { ja: "サンプル原稿", en: "Sample text" },
        title: { ja: "カウンターの静けさについて", en: "On the quiet of the counter" },
        body: {
          ja: "語り手も店も架空の、サンプル原稿です。",
          en: "A sample text. The narrator and the bar are both fictional.",
        },
      },
      {
        id: "story-glass",
        tone: "ash",
        kicker: { ja: "サンプル原稿", en: "Sample text" },
        title: { ja: "グラスが戻るまで", en: "Until the glass comes back" },
        body: {
          ja: "ある夜の観察を装った、架空のサンプルです。人物は実在しません。",
          en: "A fictional sample written in the shape of one night’s observation. The person is not real.",
        },
      },
      {
        id: "story-door",
        tone: "lacquer",
        kicker: { ja: "サンプル原稿", en: "Sample text" },
        title: { ja: "扉の向こうの一分", en: "One minute past the door" },
        body: {
          ja: "店に入る直前を書いた、架空のサンプルです。",
          en: "A fictional sample about the minute before stepping inside.",
        },
      },
    ],
  },
  events: {
    kicker: { ja: "EVENTS", en: "EVENTS" },
    title: { ja: "イベント", en: "Events" },
    lede: {
      ja: "集まりや夜の予定を置く場所です。日程も会場も未定のサンプルだけを置いています。",
      en: "A place for gatherings. Only samples are shown, with the date and the room unset.",
    },
    entries: [
      {
        id: "event-01",
        tone: "wine",
        kicker: { ja: "サンプル / 日程未定", en: "Sample / date unset" },
        title: { ja: "サンプルイベント 01", en: "Sample event 01" },
        body: {
          ja: "試飲という形式だけの告知です。日程、会場、料金は未定です。",
          en: "A notice of the form only: a tasting. Date, room, and fee are unset.",
        },
      },
      {
        id: "event-02",
        tone: "ink",
        kicker: { ja: "サンプル / 日程未定", en: "Sample / date unset" },
        title: { ja: "サンプルイベント 02", en: "Sample event 02" },
        body: {
          ja: "トークという形式だけの告知です。登壇者は未設定です。",
          en: "A notice of the form only: a talk. Speakers are unset.",
        },
      },
      {
        id: "event-03",
        tone: "bone",
        kicker: { ja: "サンプル / 日程未定", en: "Sample / date unset" },
        title: { ja: "サンプルイベント 03", en: "Sample event 03" },
        body: {
          ja: "ゲストシフトという形式だけの告知です。出演者と店は未設定です。",
          en: "A notice of the form only: a guest shift. The guest and the bar are unset.",
        },
      },
    ],
  },
  guide: {
    kicker: { ja: "GUIDE", en: "GUIDE" },
    title: { ja: "案内", en: "Guide" },
    lede: {
      ja: "バーという場所の過ごし方を、短く残すための案内です。特定の店への行き方ではありません。",
      en: "Short notes on how to be in a bar. Not directions to any particular address.",
    },
    entries: [
      {
        id: "guide-reserve",
        tone: "ash",
        kicker: { ja: "サンプル原稿", en: "Sample text" },
        title: { ja: "予約という礼儀", en: "The courtesy of a reservation" },
        body: {
          ja: "サンプル原稿です。席を頼むときは、人数と時間を短く伝える、という一般的な作法だけを書いています。",
          en: "A sample text. It only notes a general manner: when asking for a seat, state the number of people and the time, briefly.",
        },
      },
      {
        id: "guide-counter",
        tone: "dusk",
        kicker: { ja: "サンプル原稿", en: "Sample text" },
        title: { ja: "カウンターの座り方", en: "Sitting at the counter" },
        body: {
          ja: "サンプル原稿です。隣との距離を乱さない、という一般論です。特定の店の規則ではありません。",
          en: "A sample text. A general note about leaving the next seat its space. It is not a house rule from a real bar.",
        },
      },
      {
        id: "guide-leave",
        tone: "lacquer",
        kicker: { ja: "サンプル原稿", en: "Sample text" },
        title: { ja: "帰り際に", en: "Before you leave" },
        body: {
          ja: "サンプル原稿です。会計と挨拶を急がない、という一般論です。",
          en: "A sample text. A general note: the bill and the goodbye do not need to be rushed.",
        },
      },
    ],
  },
};
