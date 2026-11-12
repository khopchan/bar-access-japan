import type { L10n } from "@/lib/i18n";

/**
 * サービス6件。料金・提携先・実施例が決まり次第、ここを書き換える。
 */
export const servicesIntro = {
  kicker: { ja: "SERVICES", en: "SERVICES" },
  title: { ja: "仕事", en: "Services" },
  lede: {
    ja: "BAR ACCESS JAPAN が扱う仕事です。料金と実施例は、まだ置いていません。",
    en: "The work of BAR ACCESS JAPAN. Fees and case studies are not listed yet.",
  },
} as const satisfies { kicker: L10n; title: L10n; lede: L10n };

export const services: {
  id: string;
  comingSoon?: boolean;
  title: L10n;
  body: L10n;
}[] = [
  {
    id: "night-tours",
    title: { ja: "訪日バーナイトツアー", en: "Inbound Bar Night Tours" },
    body: {
      ja: "日本を訪れる人に、バー文化の夜を案内するツアーです。コース、店、料金は未定です。",
      en: "Night tours that introduce Japan’s bar culture to people visiting the country. Routes, bars, and fees are unset.",
    },
  },
  {
    id: "reservation",
    title: { ja: "予約・アテンド", en: "Reservation & Attend Service" },
    body: {
      ja: "予約の手配と、当日そばにいるアテンドです。対応する店と料金は、まだ決めていません。",
      en: "Help with reservations, and someone beside you on the night. Partner bars and fees are not set yet.",
    },
  },
  {
    id: "guest-shift",
    title: { ja: "ゲストシフト・イベント制作", en: "Guest Shift & Event Production" },
    body: {
      ja: "ゲストシフトと、夜のイベントの企画・制作です。出演者名と開催日は置いていません。",
      en: "Guest shifts, and the planning and production of night events. No performer names and no dates are listed.",
    },
  },
  {
    id: "corporate",
    title: { ja: "企業・ホテル向けバー体験", en: "Corporate & Hotel Bar Experiences" },
    body: {
      ja: "企業やホテルのための、バー体験のプログラムです。提携先と料金は未定です。",
      en: "Bar experiences arranged for companies and hotels. Partners and fees are unset.",
    },
  },
  {
    id: "english-pr",
    title: { ja: "店舗特集・英語PR支援", en: "Store Features & English PR" },
    body: {
      ja: "店の特集づくりと、英語での発信の支援です。提携先は、これから載せます。",
      en: "Editorial features for a bar, and support for speaking about it in English. Partners will be listed later.",
    },
  },
  {
    id: "passport",
    comingSoon: true,
    title: { ja: "BAR Passport メンバーシップ", en: "BAR Passport Membership" },
    body: {
      ja: "会員制度の構想です。近日公開で、いまは加入できません。特典と料金は未定です。",
      en: "A membership in concept. Coming soon, and not open to join. Benefits and fees are unset.",
    },
  },
];
