import type { L10n, Locale } from "@/lib/i18n";

/**
 * サイト全体の設定。店・カクテル・記事の本文は research/ にある。
 * メールと、このサイト自身の Instagram はまだプレースホルダ。差し替えるときはこのファイルを編集する。
 */

export function verifiedLabel(date: string, locale: Locale): string {
  return locale === "ja" ? `確認日 ${date}` : `Last verified ${date}`;
}

export function verifiedValue(date: string, locale: Locale): string {
  return locale === "ja" ? `${date}（公開情報に基づく）` : `${date} (from public sources)`;
}
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
  sample: { ja: "サンプル", en: "Sample" },
  photoLabel: { ja: "写真未掲載", en: "No photo" },
  heroNote: {
    ja: "公開情報をもとにした、日本のバーとカクテルの案内です。",
    en: "A guide to Japan’s bars and cocktails, drawn from public sources.",
  },
  noticeLabel: { ja: "SAMPLE", en: "SAMPLE" },
  noticeBody: {
    ja: "この一覧はまだサンプルです。日程、会場、出演者は実在の告知ではありません。",
    en: "This list is still a sample. Dates, rooms, and names are not real announcements.",
  },
  comingSoon: { ja: "近日公開", en: "Coming soon" },
  serviceCta: { ja: "この件で連絡する", en: "Contact about this" },
  read: { ja: "読む", en: "Read" },
  findBar: { ja: "BARを探す", en: "Find a bar" },
  findCocktail: { ja: "カクテルを探す", en: "Find a cocktail" },
  latestTitle: { ja: "LATEST", en: "LATEST" },
  relatedTitle: { ja: "関連", en: "Related" },
  linkedDrinks: { ja: "この店とつながるカクテル", en: "Cocktails linked to this bar" },
  linkedBars: { ja: "このカクテルとつながる店", en: "Bars linked to this drink" },
  nearbyTitle: { ja: "同じ都市の店", en: "More in this city" },
  mentionedTitle: { ja: "関連する記事", en: "Related stories" },
  sourcesTitle: { ja: "出典", en: "Sources" },
  conceptTitle: { ja: "コンセプト", en: "Concept" },
  practicalTitle: { ja: "実用情報", en: "Practical information" },
  pullCaption: { ja: "本文より", en: "From the piece" },
  searchOpen: { ja: "検索", en: "Search" },
  searchClose: { ja: "検索を閉じる", en: "Close search" },
  searchPlaceholder: { ja: "店、カクテル、記事を探す", en: "Search bars, cocktails, stories" },
  searchHint: { ja: "店名、エリア、人、カクテル、記事から探します。", en: "Searches bars, areas, people, cocktails, and stories." },
  searchEmpty: { ja: "一致するものはありません。", en: "No matches." },
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
