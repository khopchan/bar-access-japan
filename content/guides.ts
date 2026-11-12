import type { Article } from "@/content/types";

const byline = { ja: "サンプルデスク", en: "Sample desk" };
const credit = { ja: "写真クレジット未設定", en: "Photo credit unset" };
const kicker = { ja: "GUIDE / サンプル", en: "GUIDE / SAMPLE" };

/**
 * 過ごし方の一般論。特定の店の規則でも、行き方でもない。
 */
export const guides: Article[] = [
  {
    slug: "guide-reserve",
    tone: "ash",
    kicker,
    byline,
    credit,
    title: { ja: "予約という礼儀", en: "The Courtesy of a Reservation" },
    dek: {
      ja: "席を頼むときの一般論です。実在の店の予約方法は書いていません。",
      en: "A general note on asking for a seat. It does not describe how to book any real bar.",
    },
    before: [
      {
        ja: "人数と時間を、先に短く伝える。この原稿が置く作法は、それだけだ。店名も電話番号も、サンプルにはない。",
        en: "State the number of people and the time, briefly, first. That is the only manner this text sets down. The sample has no bar name and no phone number.",
      },
      {
        ja: "希望を長く並べない。席の種類も、頼む前から細かく指定しない。相手が確かめられる形にしておく、という一般論である。",
        en: "Do not line up a long list of wishes. Do not specify the kind of seat in detail before anyone has asked. A general note: leave something the other person can confirm.",
      },
    ],
    pull: {
      ja: "礼儀は、短いほうが届く。",
      en: "A courtesy arrives more clearly when it is short.",
    },
    after: [
      {
        ja: "断られたときの別案は書いていない。このページは、予約サイトでも取扱店の一覧でもない。",
        en: "There is no alternate plan for a refusal. This page is not a booking site and not a list of bars that take reservations.",
      },
      {
        ja: "実際の店では、その店のやり方に従う。ここにあるのは、試作の文章だけだ。",
        en: "At a real bar, follow that bar’s own way. What is here is only prototype text.",
      },
    ],
  },
  {
    slug: "guide-counter",
    tone: "dusk",
    kicker,
    byline,
    credit,
    title: { ja: "カウンターの座り方", en: "Sitting at the Counter" },
    dek: {
      ja: "隣との距離を乱さない、という一般論です。特定の店の規則ではありません。",
      en: "A general note about leaving the next seat its space. It is not a house rule from a real bar.",
    },
    before: [
      {
        ja: "席に着いたら、荷物は足元か、自分の幅の中に収める。隣の席の前には置かない。この原稿は、それ以上の細則を持たない。",
        en: "Once seated, keep a bag at the feet, or inside your own width. Do not place it in front of the next seat. This text has no finer rule than that.",
      },
      {
        ja: "声の大きさは、隣の会話を覆わない程度、という仮定である。正しい音量の数字はない。",
        en: "The assumption is that a voice should not cover the conversation next to it. There is no correct number for the volume.",
      },
    ],
    pull: {
      ja: "カウンターは、共有の幅でできている。",
      en: "A counter is made of a shared width.",
    },
    after: [
      {
        ja: "写真の撮り方も、このサンプルでは扱わない。席の上のものは、頼んだものだけが見えていれば足りる、と書いておく。",
        en: "How to take a photograph is outside this sample. It is enough, here, that the seat shows only what was asked for.",
      },
      {
        ja: "店ごとの決まりは、その店で確かめる。この文章は、どの店の掲示でもない。",
        en: "A house rule is confirmed at that house. This is not a notice from any bar.",
      },
    ],
  },
  {
    slug: "guide-leave",
    tone: "lacquer",
    kicker,
    byline,
    credit,
    title: { ja: "帰り際に", en: "Before You Leave" },
    dek: {
      ja: "会計と挨拶を急がない、という一般論です。料金の例は置いていません。",
      en: "A general note: the bill and the goodbye do not need to be rushed. No sample price is given.",
    },
    before: [
      {
        ja: "立つ前に、空いたグラスの位置を少し整える。この原稿では、それを最後の所作にしている。金額の確認のしかたは、店に任せる。",
        en: "Before standing, the empty glass is set a little straighter. In this text, that is the last gesture. How a total is checked is left to the bar.",
      },
      {
        ja: "挨拶は短くてよい。次の約束や、店の評価は、この場の話題にしない。サンプルは、夜を評価で閉じない。",
        en: "A goodbye can be short. The next appointment, and a verdict on the bar, are not the subject of the moment. The sample does not close the night with a rating.",
      },
    ],
    pull: {
      ja: "帰り際は、評価の時間ではない。",
      en: "The moment of leaving is not a time for a verdict.",
    },
    after: [
      {
        ja: "チップの習慣も、このページでは地域ごとに説明しない。未設定のままにする。",
        en: "Tipping customs are not explained here by region. They stay unset.",
      },
      {
        ja: "外に出てからの道順もない。試作は、扉の内側の礼儀だけを、一般論として残す。",
        en: "There are no directions for after you are outside. The prototype keeps only a general courtesy from inside the door.",
      },
    ],
  },
];
