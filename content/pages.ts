import type { L10n, Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { isSectionId, type PageId } from "@/lib/routes";
import { brand, ui } from "@/content/site";
import { sections } from "@/content/sections";
import { servicesIntro } from "@/content/services";

export type EditorialSection = {
  id: string;
  heading: L10n;
  paragraphs: L10n[];
};

export type EditorialDoc = {
  kicker: L10n;
  title: L10n;
  lede: L10n;
  sections: EditorialSection[];
};

export const aboutDoc: EditorialDoc = {
  kicker: { ja: "ABOUT", en: "ABOUT" },
  title: { ja: "BAR ACCESS JAPAN", en: "BAR ACCESS JAPAN" },
  lede: {
    ja: "日本のバー文化を、必要な人へ静かに渡すためのメディアであり、サービスの窓口です。",
    en: "A media title, and a door to services, for passing Japan’s bar culture to the people who need it.",
  },
  sections: [
    {
      id: "what",
      heading: { ja: "媒体とサービス", en: "A media title and a service" },
      paragraphs: [
        {
          ja: "カウンターの作法、グラス、夜の空気。それらを、静かに、正確に残します。読みものを置くことと、夜の案内や発信を引き受けることを、同じ名前の下で扱います。",
          en: "The manners of the counter, the glass, the air of the night. The aim is to keep them quiet and exact. Stories and the work of guiding or speaking for a night sit under one name.",
        },
      ],
    },
    {
      id: "who",
      heading: { ja: "届ける相手", en: "Who it is for" },
      paragraphs: [
        {
          ja: "日本を訪れる人。日本の外からバーを知りたい人。店の言葉を英語にしたい人。同じ内容を、日本語と英語で読めます。",
          en: "People visiting Japan. People outside Japan who want to understand the bar. People who want a bar’s words in English. The same pages exist in Japanese and in English.",
        },
      ],
    },
    {
      id: "prototype",
      heading: { ja: "いまは試作", en: "A prototype, for now" },
      paragraphs: [
        {
          ja: "このサイトに並ぶ店、人、記事、イベント、価格はすべてサンプルです。実在の情報は、確認できるまで置きません。",
          en: "Every bar, person, story, event, and price on this site is a sample. Real information waits until it can be checked.",
        },
      ],
    },
  ],
};

export const privacyDoc: EditorialDoc = {
  kicker: { ja: "POLICY", en: "POLICY" },
  title: {
    ja: "プライバシー / 編集方針",
    en: "Privacy / Editorial Policy",
  },
  lede: {
    ja: "何を書き、何を受け取らないか。試作の段階で、先に置いておきます。",
    en: "What this site will publish, and what it will not collect. Set down now, while the site is still a prototype.",
  },
  sections: [
    {
      id: "editorial",
      heading: { ja: "編集方針", en: "Editorial policy" },
      paragraphs: [
        {
          ja: "BAR ACCESS JAPAN は、確認できたことだけを公開したいと考えています。試作のあいだは、実在の店舗名、人物名、住所、価格、イベントを置きません。サンプルであることは、ページの上で分かるようにします。",
          en: "BAR ACCESS JAPAN intends to publish only what can be checked. During this prototype, real bar names, people, addresses, prices, and events are left out. A page says when its contents are samples.",
        },
      ],
    },
    {
      id: "privacy",
      heading: { ja: "プライバシー", en: "Privacy" },
      paragraphs: [
        {
          ja: "お問い合わせフォームはブラウザの中だけで動きます。入力した内容を、このサイトのサーバーへ送ることはありません。メールのリンクを開いたとき、お使いのメールソフトが起動します。解析用のタグは入れていません。",
          en: "The contact form runs only in the browser. What you type is not sent to this site’s server. Opening the mail link starts your own mail app. No analytics tag is installed.",
        },
      ],
    },
    {
      id: "external",
      heading: { ja: "外部サイト", en: "Other sites" },
      paragraphs: [
        {
          ja: "Instagram のリンクは、アカウント準備前のものです。開くのは Instagram のウェブサイトです。リンク先での扱いは、そのサイトの方針に従います。",
          en: "The Instagram link is a placeholder, used before an account exists. It opens the Instagram website. What happens there follows that site’s own policy.",
        },
      ],
    },
  ],
};

export const contactCopy = {
  kicker: { ja: "CONTACT", en: "CONTACT" },
  title: { ja: "連絡する", en: "Contact" },
  lede: {
    ja: "取材、サービス、掲載についての窓口です。フォームは画面上の試作で、入力はサーバーへ送られません。",
    en: "For stories, services, and publication. The form is a prototype on the page. Nothing is sent to a server.",
  },
  emailCaption: { ja: "メール（プレースホルダ）", en: "Email (placeholder)" },
  name: { ja: "名前", en: "Name" },
  email: { ja: "メールアドレス", en: "Email" },
  topic: { ja: "用件", en: "Topic" },
  message: { ja: "本文", en: "Message" },
  submit: { ja: "送信する", en: "Send" },
  general: { ja: "一般", en: "General" },
  successTitle: { ja: "送信されていません", en: "Nothing was sent" },
  successBody: {
    ja: "これは試作フォームです。入力内容は保存も送信もされていません。メールソフトで書く場合は、次のリンクを開いてください。",
    en: "This is a prototype form. What you typed was neither stored nor sent. Open the link below to write in your mail app.",
  },
  mailto: { ja: "メールソフトで開く", en: "Open in a mail app" },
  back: { ja: "入力に戻る", en: "Back to the form" },
  subjectPrefix: { ja: "BAR ACCESS JAPAN", en: "BAR ACCESS JAPAN" },
  errors: {
    name: { ja: "名前を入力してください。", en: "Enter a name." },
    email: { ja: "メールアドレスの形式を確認してください。", en: "Check the email address." },
    message: { ja: "本文を入力してください。", en: "Enter a message." },
  },
} as const;

const fixedMeta: Partial<Record<PageId, { title: L10n; description: L10n }>> = {
  home: {
    title: { ja: brand.name, en: brand.name },
    description: {
      ja: `${brand.line.ja} ${ui.heroNote.ja}`,
      en: `${brand.line.en} ${ui.heroNote.en}`,
    },
  },
  about: {
    title: aboutDoc.title,
    description: aboutDoc.lede,
  },
  services: {
    title: servicesIntro.title,
    description: servicesIntro.lede,
  },
  contact: {
    title: contactCopy.title,
    description: contactCopy.lede,
  },
  privacy: {
    title: privacyDoc.title,
    description: privacyDoc.lede,
  },
};

export function getPageMeta(page: PageId, locale: Locale): { title: string; description: string } {
  if (isSectionId(page)) {
    const section = sections[page];
    return { title: t(section.title, locale), description: t(section.lede, locale) };
  }
  const meta = fixedMeta[page];
  if (!meta) {
    return { title: brand.name, description: t(brand.line, locale) };
  }
  return { title: t(meta.title, locale), description: t(meta.description, locale) };
}
