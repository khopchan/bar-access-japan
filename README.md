# BAR ACCESS JAPAN

日本のバー文化を世界へ渡す、デジタルメディア兼サービスの試作サイトです。
ブランドラインは「日本のバー文化への扉を、すべての人に。」/ “Access the real side of Japan's Bar Culture.”

English: a static-friendly Next.js prototype. Japanese is the default (`/`). English lives under `/en`. No real bar names, people, addresses, prices, or events are included. There are no photographs — picture frames are typographic placeholders with a credit slot.

The layout follows an editorial magazine pattern (lead story, story cards, a Latest river, category landings, a long article, a bar page). It is not a copy of any other publication’s code, text, or images.

## Stack / スタック

- Next.js（App Router）+ React + TypeScript
- スタイルは `app/globals.css` のみ（UI フレームワークなし）
- ページは `generateStaticParams` で静的生成
- 写真は使わない。色面は CSS のグラデーション。公式ロゴだけ `public/brand/`
- Vercel へゼロコンフィグで配置できる（`vercel.json` も環境変数も不要）

任意: 公開 URL をメタデータに固定したいときだけ `NEXT_PUBLIC_SITE_URL`（例: `https://example.com`）を置く。未設定でもビルドとデプロイは通る。

## Folder structure / フォルダ構成

```
app/
  layout.tsx              フォント、html、共通メタデータ
  globals.css             色・タイポグラフィ・レイアウト
  [[...slug]]/page.tsx    日英すべての入口（一覧と詳細）
  icon.png                黒地のモノグラム（ファビコン）
  apple-icon.png
  not-found.tsx
  error.tsx
public/brand/             公式ロゴ。不透明な PNG / JPG
  monogram-on-dark.png    ヘッダー（黒地に白）
  monogram-on-light.png   明るい地（白地に黒）
  shield.jpg              盾。フッターと About
  badge.jpg               縦型バッジ。About
  og.jpg                  共有用画像
components/               表示部品。文案は持たない
content/                  編集する文案（各フィールドが ja / en）
  site.ts                 ブランド、メール、Instagram、共通 UI
  navigation.ts           グローバルナビ 5 項目とフッター
  home.ts                 トップのリード / グリッド / Latest の並び
  sections.ts             5 セクションの導入文
  stories.ts              記事（STORIES）
  guides.ts               記事（GUIDE）
  bars.ts                 店舗。実用情報に「確認日」
  cocktails.ts            カクテル。ベースと味わい
  events.ts               イベント。これから / 終了
  services.ts             サービス 6 件
  pages.ts                About、Contact、Privacy、メタデータ
lib/
  i18n.ts                 Locale と t()
  routes.ts               パス。一覧と詳細
  catalog.ts              カードと検索索引の組み立て
  cards.ts                カードの型
  brand.ts                ロゴの寸法
  tones.ts                抽象プレースホルダの色名
  site-url.ts             metadataBase
```

## Editing content / コンテンツの編集

文案は `content/` にまとめてある。表示文は次の形にする。

```ts
{ ja: "日本語", en: "English" }
```

- 日本語が既定。英語ページは同じデータから `/en` を組み立てる。
- グローバルナビは `content/navigation.ts` の 5 項目（EXPLORE BARS、COCKTAILS、STORIES、EVENTS、GUIDE）。SERVICES / ABOUT / CONTACT はフッターだけ。
- トップの並びは `content/home.ts` の `homeLayout`。`kind` と `slug` で、記事・案内・店舗・カクテル・イベントを指す。
- 記事の本文は `stories.ts` と `guides.ts`。`before`、`pull`（引き抜き）、`after`。人物名は「サンプルデスク」。
- 店舗は `bars.ts`。写真枠、コンセプト、実用情報の順。実用情報の最後が `確認日`（英語は Date checked）。サンプルは「未確認（サンプル）」。
- カクテルは `cocktails.ts`。`base`（gin / whisky / shochu / wine / unspecified）と `flavor`（aroma / finish / light / after）。レシピと価格は書かない。
- イベントは `events.ts` の `status`: `upcoming` か `ended`。日程・会場・料金は置かない。
- サービスは `content/services.ts`。`comingSoon: true` で「近日公開」バッジが出る。
- 連絡先メールと Instagram URL は `content/site.ts`。いまはプレースホルダ。公開前のアカウント説明を消すときは `instagram.pending` を `false` にする。
- 赤は `app/globals.css` の `--baj-red`（公式の盾の赤 `#e40719`）。

実在の店名、人物、住所、価格、イベントは書かない。サンプルであることが、キッカーと試作の注記で分かるようにする。

ロゴは不透明な画像です。黒地のモノグラムは黒いヘッダーの上に、盾と白地のモノグラムとバッジは白いプレートの上に置いています。

## Routes / パス

| ページ | 日本語 | English |
| --- | --- | --- |
| トップ | `/` | `/en` |
| EXPLORE BARS | `/bars` | `/en/bars` |
| 店舗詳細 | `/bars/bar-a` | `/en/bars/bar-a` |
| COCKTAILS | `/cocktails` | `/en/cocktails` |
| STORIES | `/stories` | `/en/stories` |
| 記事 | `/stories/story-quiet` | `/en/stories/story-quiet` |
| EVENTS | `/events` | `/en/events` |
| GUIDE | `/guide` | `/en/guide` |
| 案内の記事 | `/guide/guide-reserve` | `/en/guide/guide-reserve` |
| About | `/about` | `/en/about` |
| Services | `/services` | `/en/services` |
| Contact | `/contact` | `/en/contact` |
| Privacy / Editorial Policy | `/privacy` | `/en/privacy` |

店舗のスラッグは `bar-a` から `bar-d`。記事と案内のスラッグは各ファイルの `slug`。言語切替は、見ている詳細ページの相手言語へ移る。

ヘッダーの検索は、読み込んだサンプルの見出しと紹介文だけを見る。サーバーへは送らない。カクテルの絞り込み（ベース / 味わい）もページ内だけで完結する。

「夜の便り」の登録欄は試作です。アドレスは保存も送信もされません。Contact のフォームも同じで、`method="dialog"` のためスクリプトなしでもサーバーへ POST しません。メールリンク（プレースホルダ）を開いたときだけ、利用者のメールソフトが起動する。

## Local development / ローカル開発

```bash
npm install
npm run dev
```

開発サーバーは http://localhost:3000 で開く。

## Build / ビルド

```bash
npm run build
npm start
```

`npm run build` は型チェックと、日英すべての静的ページ生成を行う。

動きの長さとイージングは [MOTION.md](MOTION.md) にまとめてある。`prefers-reduced-motion` ではアニメーションを止める。

## Deploy to Vercel / Vercel への配置

1. このリポジトリを Vercel にインポートする。
2. Framework Preset は Next.js のままにする。
3. Build Command は `npm run build`、Install Command は `npm install`。Output の上書きは不要。
4. 環境変数なしで Deploy する。

追加の `vercel.json` は置いていない。Node.js 20 以上が必要。
