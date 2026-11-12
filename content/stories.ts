import type { Article } from "@/content/types";

const byline = { ja: "サンプルデスク", en: "Sample desk" };
const credit = { ja: "写真クレジット未設定", en: "Photo credit unset" };
const kicker = { ja: "STORIES / サンプル", en: "STORIES / SAMPLE" };

/**
 * 読みもの。人物も店も架空。実在の店名・人名は置かない。
 */
export const stories: Article[] = [
  {
    slug: "story-quiet",
    tone: "lacquer",
    kicker,
    byline,
    credit,
    title: { ja: "カウンターの静けさについて", en: "On the Quiet of the Counter" },
    dek: {
      ja: "音が少ないことを、欠落としては書かない。語り手も店も架空の、サンプル原稿です。",
      en: "A quiet room is not written here as a lack. The narrator and the bar are fictional. This is a sample.",
    },
    before: [
      {
        ja: "扉が閉まる。外の音は壁に一度あたって、細くなる。カウンターまでの数歩を、この原稿は架空の寸法で書いている。住所はない。",
        en: "The door shuts. Outside sound thins against the wall. The steps to the counter are written to a fictional measure. There is no address.",
      },
      {
        ja: "グラスが置かれる音だけが、はっきりしている。会話は隣同士でも低い。静けさは命令ではなく、席と席のあいだに残された幅だ、という仮定で進める。",
        en: "Only the glass, set down, is distinct. Talk stays low, even between neighbors. The piece assumes that quiet is not an order, but the width left between seats.",
      },
      {
        ja: "サンプルのバーテンダーは名前を持たない。注文を聞き、短く返し、次の席へ目を移す。手順は書かない。ここにあるのは、夜の速度だけだ。",
        en: "The sample bartender has no name. An order is heard, answered briefly, and the eyes move on. No method is described. What remains is the speed of the night.",
      },
    ],
    pull: {
      ja: "静けさは、欠落ではない。席と席のあいだに残された幅だ。",
      en: "Quiet is not a lack. It is the width left between one seat and the next.",
    },
    after: [
      {
        ja: "この原稿に価格はない。酒の銘柄もない。あるのは、氷が溶ける前に会話が一段落する、という架空の時間だけだ。",
        en: "This text has no prices and no brand names. It has only a fictional interval, in which a conversation finishes before the ice is gone.",
      },
      {
        ja: "読み終えても、実在の店の情報は増えない。それが、この試作の意図である。",
        en: "Finishing the piece adds nothing about a real bar. That is the intent of the prototype.",
      },
    ],
  },
  {
    slug: "story-glass",
    tone: "ash",
    kicker,
    byline,
    credit,
    title: { ja: "グラスが戻るまで", en: "Until the Glass Comes Back" },
    dek: {
      ja: "ある夜の観察を装った架空のサンプルです。人物は実在しません。",
      en: "A fictional sample in the shape of one night’s observation. The person is not real.",
    },
    before: [
      {
        ja: "空になったグラスは、すぐには戻らない。この原稿では、その待ち時間を架空の客の側から見ている。客にも名前はない。",
        en: "An empty glass is not replaced at once. This sample watches that wait from the side of a fictional guest. The guest has no name.",
      },
      {
        ja: "戻ってくるまでのあいだに、席の姿勢が少し変わる。肘を引き、声を落とす。作法の解説ではない。観察のふりをした、短い記述である。",
        en: "While it is away, the posture at the seat changes slightly. An elbow comes in. The voice drops. This is not a manual. It is a short description pretending to be an observation.",
      },
      {
        ja: "グラスが戻る。中身の説明はしない。色も香りも、サンプルの単語以上には進めない。",
        en: "The glass returns. The contents are not explained. Color and aroma stay inside the words of the sample.",
      },
    ],
    pull: {
      ja: "待つ時間は、省略すると夜が短くなりすぎる。",
      en: "Cut the waiting out, and the night becomes too short.",
    },
    after: [
      {
        ja: "会計の金額は書いていない。店の名も書いていない。戻ったグラスが、この原稿の最後の事実である。",
        en: "The bill is not written down, and neither is the bar’s name. The returned glass is the last fact in the piece.",
      },
      {
        ja: "事実といっても、確認された記録ではない。試作のページに置くための、架空の夜である。",
        en: "Fact, here, is not a checked record. It is a fictional night, placed on a prototype page.",
      },
    ],
  },
  {
    slug: "story-door",
    tone: "dusk",
    kicker,
    byline,
    credit,
    title: { ja: "扉の向こうの一分", en: "One Minute Past the Door" },
    dek: {
      ja: "店に入る直前を書いた、架空のサンプルです。場所は特定しません。",
      en: "A fictional sample about the minute before stepping inside. The place is not identified.",
    },
    before: [
      {
        ja: "扉の前で、一分だけ立つ。この原稿の店は、通りの名を持たない。看板の文字も、サンプルという一語に置き換えてある。",
        en: "One minute standing at the door. The bar in this piece has no street name. The letters on the sign are replaced by the single word sample.",
      },
      {
        ja: "中の光は低い。人の数は数えない。入るかどうかを決めるための実用ガイドではなく、その一分の密度だけを残す。",
        en: "The light inside is low. The people are not counted. This is not a practical guide for deciding to enter. It keeps only the density of that minute.",
      },
      {
        ja: "ノブに手をかけて、原稿は終わる直前まで外にいる。内部の席の配置は、まだ知らないことにしてある。",
        en: "A hand on the handle, and the text stays outside until nearly the end. The arrangement of seats is still treated as unknown.",
      },
    ],
    pull: {
      ja: "入る前の一分は、店の一部である。",
      en: "The minute before entering is part of the bar.",
    },
    after: [
      {
        ja: "扉が開く音だけを書いて、原稿は中に入る。そこから先の会話は、別のサンプルに譲る。",
        en: "The piece records only the sound of the door opening, then goes in. Conversation after that is left to another sample.",
      },
      {
        ja: "地図は付けない。この一分は、どの街でも、どの店でもない。",
        en: "There is no map. This minute belongs to no city and to no bar.",
      },
    ],
  },
  {
    slug: "story-ice",
    tone: "ink",
    kicker,
    byline,
    credit,
    title: { ja: "氷が小さくなるまで", en: "While the Ice Gets Smaller" },
    dek: {
      ja: "時間の測り方を、氷に仮託したサンプル原稿です。銘柄も店名も出てきません。",
      en: "A sample that borrows ice as a way to measure time. No brand and no bar name appear.",
    },
    before: [
      {
        ja: "氷は、時計のかわりに置いてある。小さくなっていくことを、この原稿は急がない。溶ける速度の数字は持っていない。",
        en: "The ice stands in for a clock. The text does not hurry it along. It has no figure for how fast the melt is.",
      },
      {
        ja: "会話は氷の輪郭が変わるころに、一度切れる。沈黙を失敗だとは書かない。サンプルの夜では、沈黙も席の使い方のひとつだ。",
        en: "Talk breaks once, around the time the outline of the ice changes. Silence is not written as a failure. In this sample night, silence is one way to use a seat.",
      },
      {
        ja: "氷が小さくなったあと、何を頼むかは決めていない。次の一杯は、この原稿の外にある。",
        en: "What to ask for after the ice is smaller is undecided. The next drink sits outside this text.",
      },
    ],
    pull: {
      ja: "夜の長さは、氷の輪郭で足りる。",
      en: "The length of a night can be told by the outline of the ice.",
    },
    after: [
      {
        ja: "温度も度数も書いていない。残っているのは、輪郭が変わった、という観察だけだ。",
        en: "Temperature and strength are absent. What is left is the observation that an outline changed.",
      },
      {
        ja: "この観察は、どのカウンターでも再現できる記録ではない。試作のための、一つの書き方である。",
        en: "The observation is not a record that can be repeated at a real counter. It is one way of writing, for the prototype.",
      },
    ],
  },
];
