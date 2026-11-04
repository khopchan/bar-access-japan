import type { L10n } from "@/lib/i18n";

/**
 * サイト全体の設定。実在の店名・人物・住所・価格・イベントは書かない。
 * メールと Instagram は公開前のプレースホルダ。差し替えるときはこのファイルだけを編集する。
 */
export const brand = {
  name: "BAR ACCESS JAPAN",
  line: {
    ja: "日本のバー文化への扉を、すべての人に。",
    en: "Access the real side of Japan's Bar Culture.",
  },
} as const satisfies { name: string; line: L10n };

export const site = {
  contactEmail: "contact@example.com",
  instagram: {
    label: "Instagram",
    href: "https://www.instagram.com/",
    pending: true,
    note: {
      ja: "アカウントは準備中です。リンク先は Instagram のウェブサイトです。",
      en: "The account is not live yet. The link opens the Instagram website.",
    },
  },
} as const;

export const ui = {
  skip: { ja: "本文へスキップ", en: "Skip to content" },
  menuOpen: { ja: "メニューを開く", en: "Open menu" },
  menuClose: { ja: "メニューを閉じる", en: "Close menu" },
  primaryNav: { ja: "主要", en: "Primary" },
  footerNav: { ja: "フッター", en: "Footer" },
  newTab: { ja: "（新しいタブで開きます）", en: "(opens in a new tab)" },
  prototypeMark: { ja: "試作", en: "Prototype" },
  sample: { ja: "サンプル", en: "Sample" },
  heroNote: {
    ja: "試作。掲載はすべてサンプルです。",
    en: "Prototype. Every listing is a sample.",
  },
  noticeLabel: { ja: "PROTOTYPE", en: "PROTOTYPE" },
  noticeBody: {
    ja: "このページは試作です。並んでいる名前はサンプルで、実在の店舗、人物、住所、価格、イベントを示すものではありません。",
    en: "This page is a prototype. The names below are samples. They do not stand for a real bar, person, address, price, or event.",
  },
  comingSoon: { ja: "近日公開", en: "Coming soon" },
  serviceCta: { ja: "この件で連絡する", en: "Contact about this" },
  read: { ja: "読む", en: "Read" },
  findBar: { ja: "BARを探す", en: "Find a bar" },
  findCocktail: { ja: "カクテルを探す", en: "Find a cocktail" },
  exploreTitle: { ja: "EXPLORE", en: "EXPLORE" },
  exploreSub: { ja: "五つの入口", en: "Five entrances" },
  pickupTitle: { ja: "PICK UP", en: "PICK UP" },
  pickupSub: { ja: "三つのサンプル", en: "Three samples" },
} as const satisfies Record<string, L10n | { ja: string; en: string }>;
