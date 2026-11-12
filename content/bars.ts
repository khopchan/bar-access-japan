import type { Bar, BarFact } from "@/content/types";
import type { L10n } from "@/lib/i18n";

const kicker: L10n = { ja: "EXPLORE BARS / サンプル", en: "EXPLORE BARS / SAMPLE" };
const byline: L10n = { ja: "サンプル店舗", en: "Sample venue" };
const credit: L10n = { ja: "写真クレジット未設定", en: "Photo credit unset" };
const unset: L10n = { ja: "未設定", en: "Unset" };

/** 実用情報は全店おなじ。実在の住所・価格・確認日は置かない。 */
export const sampleFacts: BarFact[] = [
  { id: "area", label: { ja: "エリア", en: "Area" }, value: unset },
  { id: "hours", label: { ja: "時間", en: "Hours" }, value: unset },
  { id: "seats", label: { ja: "席", en: "Seats" }, value: unset },
  { id: "price", label: { ja: "価格", en: "Prices" }, value: unset },
  {
    id: "checked",
    label: { ja: "確認日", en: "Date checked" },
    value: { ja: "未確認（サンプル）", en: "Unchecked (sample)" },
  },
];

/**
 * 架空の店舗設定。店名・住所・価格は未設定のまま。
 */
export const bars: Bar[] = [
  {
    slug: "bar-a",
    tone: "lacquer",
    kicker,
    byline,
    credit,
    facts: sampleFacts,
    title: { ja: "サンプル店舗 A", en: "Sample venue A" },
    dek: {
      ja: "カウンターが中心の小さな店、という設定です。店名も住所も未設定です。",
      en: "A setting only: a small bar built around the counter. The name and the address are unset.",
    },
    concept: [
      {
        ja: "席はカウンターに沿って並ぶ、という仮定だけを置く。何席かは書かない。照明は低く、会話は隣で切れる、という方向のサンプルである。",
        en: "The only assumption is that seats follow the counter. How many is not written. A sample in one direction: low light, and talk that stops at the next seat.",
      },
      {
        ja: "系列も立地も与えない。このページの写真枠は、図柄のプレースホルダであり、店の外観ではない。",
        en: "No group and no location are assigned. The picture frame on this page is a graphic placeholder, not the exterior of a bar.",
      },
    ],
  },
  {
    slug: "bar-b",
    tone: "ash",
    kicker,
    byline,
    credit,
    facts: sampleFacts,
    title: { ja: "サンプル店舗 B", en: "Sample venue B" },
    dek: {
      ja: "ホテルの一角にある店、という設定です。施設名も所在地も未設定です。",
      en: "A setting only: a bar in the corner of a hotel. The property name and the location are unset.",
    },
    concept: [
      {
        ja: "ロビーから一段入ったところ、という位置関係だけを想像させる。ホテルの名前は出さない。宿泊客かどうかも、この原稿では問わない。",
        en: "The only spatial hint is a step in from a lobby. The hotel is not named. Whether a guest is staying the night is not asked.",
      },
      {
        ja: "営業時間は未設定のままにする。夜の始まりを、時刻で固定しないためのサンプルである。",
        en: "Hours stay unset. The sample refuses to pin the start of the night to a clock time.",
      },
    ],
  },
  {
    slug: "bar-c",
    tone: "dusk",
    kicker,
    byline,
    credit,
    facts: sampleFacts,
    title: { ja: "サンプル店舗 C", en: "Sample venue C" },
    dek: {
      ja: "夜だけ開く店、という設定です。営業時間も住所も未設定です。",
      en: "A setting only: a bar that opens at night. Hours and the address are unset.",
    },
    concept: [
      {
        ja: "昼の姿は、このサンプルでは存在しないことにする。扉の時間も書いていない。夜だけ、という方向を示すための設定である。",
        en: "In this sample, a daytime version does not exist. The hour of the door is not written. The setting exists to point in one direction: night only.",
      },
      {
        ja: "メニューの価格帯も置かない。頼めるものの名も出さない。概念の輪郭だけがある。",
        en: "No price range is listed, and no menu item is named. Only the outline of a concept is here.",
      },
    ],
  },
  {
    slug: "bar-d",
    tone: "wine",
    kicker,
    byline,
    credit,
    facts: sampleFacts,
    title: { ja: "サンプル店舗 D", en: "Sample venue D" },
    dek: {
      ja: "立ち席が混ざる小さな店、という設定です。定員も住所も未設定です。",
      en: "A setting only: a small bar with some standing room. Capacity and the address are unset.",
    },
    concept: [
      {
        ja: "座る席と、立ったままの幅が同じカウンターにある、という仮定である。何人が立てるかは書かない。",
        en: "The assumption is that seated places and a standing width share one counter. How many can stand is not written.",
      },
      {
        ja: "この設定は、実在の店の類型図ではない。確認日は空欄のまま、未確認と表示する。",
        en: "The setting is not a typology of real bars. The date-checked field stays empty, and the page says so.",
      },
    ],
  },
];
