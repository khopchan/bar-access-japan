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
  latestTitle: { ja: "LATEST", en: "LATEST" },
  relatedTitle: { ja: "関連するサンプル", en: "Related samples" },
  conceptTitle: { ja: "コンセプト", en: "Concept" },
  practicalTitle: { ja: "実用情報", en: "Practical information" },
  pullCaption: { ja: "サンプル原稿より", en: "From the sample text" },
  searchOpen: { ja: "検索", en: "Search" },
  searchClose: { ja: "検索を閉じる", en: "Close search" },
  searchPlaceholder: { ja: "サンプルの中を探す", en: "Search the samples" },
  searchHint: { ja: "見出しと紹介文から探します。", en: "Searches headlines and standfirsts." },
  searchEmpty: { ja: "一致するサンプルはありません。", en: "No sample matches." },
  searchMore: { ja: "ほかにも一致があります。語を足してください。", en: "There are more matches. Add another word." },
  searchLabel: { ja: "検索", en: "Search" },
  newsletterKicker: { ja: "LETTER", en: "LETTER" },
  newsletterTitle: { ja: "夜の便り", en: "A letter for the night" },
  newsletterBody: {
    ja: "準備中の試作です。アドレスを入れても、保存も送信もされません。",
    en: "A prototype, not yet sending. An address typed here is neither stored nor sent.",
  },
  newsletterEmail: { ja: "メールアドレス", en: "Email" },
  newsletterSubmit: { ja: "登録する", en: "Subscribe" },
  newsletterError: { ja: "メールアドレスの形式を確認してください。", en: "Check the email address." },
  newsletterThanksTitle: { ja: "送信されていません", en: "Nothing was sent" },
  newsletterThanksBody: {
    ja: "この欄は試作です。アドレスは残っていません。",
    en: "This block is a prototype. The address was not kept.",
  },
  brandCaption: {
    ja: "公式の標章です。地色はロゴデータの背景に合わせています。",
    en: "Official marks, placed on a ground that matches the opaque artwork.",
  },
} as const satisfies Record<string, L10n | { ja: string; en: string }>;
