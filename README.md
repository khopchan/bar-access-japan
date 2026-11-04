# BAR ACCESS JAPAN

日本のバー文化を世界へ渡す、デジタルメディア兼サービスの試作サイトです。
ブランドラインは「日本のバー文化への扉を、すべての人に。」/ “Access the real side of Japan's Bar Culture.”

English: a static-friendly Next.js prototype. Japanese is the default (`/`). English lives under `/en`. No real bar names, people, addresses, prices, or events are included. There are no photographs.

## Stack / スタック

- Next.js（App Router）+ React + TypeScript
- スタイルは `app/globals.css` のみ（UI フレームワークなし）
- ページは `generateStaticParams` で静的生成
- 画像ファイルは使わない。色面は CSS のグラデーション
- Vercel へゼロコンフィグで配置できる（`vercel.json` も環境変数も不要）

任意: 公開 URL をメタデータに固定したいときだけ `NEXT_PUBLIC_SITE_URL`（例: `https://example.com`）を置く。未設定でもビルドとデプロイは通る。

## Folder structure / フォルダ構成

```
app/
  layout.tsx              フォント、html、共通メタデータ
  globals.css             色・タイポグラフィ・レイアウト
  [[...slug]]/page.tsx    全日英ページの入口
  not-found.tsx
  error.tsx
  icon.svg
components/               表示部品。文案は持たない
content/                  編集する文案（各フィールドが ja / en）
  site.ts                 ブランド、メール、Instagram、共通 UI
  navigation.ts           グローバルナビとフッター
  home.ts                 トップの EXPLORE と PICK UP
  sections.ts             EXPLORE BARS / COCKTAILS / STORIES / EVENTS / GUIDE
  services.ts             サービス 6 件
  pages.ts                About、Contact、Privacy、メタデータ
lib/
  i18n.ts                 Locale と t()
  routes.ts               パスとページ ID
  tones.ts                抽象プレースホルダの色名
  site-url.ts             metadataBase
```

## Editing content / コンテンツの編集

文案は `content/` にまとめてある。表示文は次の形にする。

```ts
{ ja: "日本語", en: "English" }
```

- 日本語が既定。英語ページは同じデータから `/en` を組み立てる。
- グローバルナビは `content/navigation.ts` の 5 項目（EXPLORE BARS、COCKTAILS、STORIES、EVENTS、GUIDE）。ここを増減するとナビが変わる。
- トップの PICK UP は `content/home.ts` の `pickups`。ホームは先頭から最大 3 件だけ出す。
- サービスは `content/services.ts`。`comingSoon: true` で「近日公開」バッジが出る。
- 連絡先メールと Instagram URL は `content/site.ts`。いまはプレースホルダ（`contact@example.com` と Instagram の公式サイト）。公開前のアカウント説明を消すときは `instagram.pending` を `false` にする。
- 赤は `app/globals.css` の `--baj-red`。

実在の店名、人物、住所、価格、イベントは書かない。サンプルであることが文面で分かるようにする。写真は置かず、`Placeholder` の CSS 面を使う。

## Routes / パス

| ページ | 日本語 | English |
| --- | --- | --- |
| トップ | `/` | `/en` |
| EXPLORE BARS | `/bars` | `/en/bars` |
| COCKTAILS | `/cocktails` | `/en/cocktails` |
| STORIES | `/stories` | `/en/stories` |
| EVENTS | `/events` | `/en/events` |
| GUIDE | `/guide` | `/en/guide` |
| About | `/about` | `/en/about` |
| Services | `/services` | `/en/services` |
| Contact | `/contact` | `/en/contact` |
| Privacy / Editorial Policy | `/privacy` | `/en/privacy` |

Services はフッターからのみ辿る。メインナビには入れない。言語切替は、見ているページの相手言語へ移る。

Contact のフォームはブラウザ内だけ。送信してもサーバーへは届かない。`method="dialog"` なので、スクリプトなしでもサーバーへ POST しない。メールリンク（プレースホルダ）を開いたときだけ、利用者のメールソフトが起動する。

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

## Deploy to Vercel / Vercel への配置

1. このリポジトリを Vercel にインポートする。
2. Framework Preset は Next.js のままにする。
3. Build Command は `npm run build`、Install Command は `npm install`。Output の上書きは不要。
4. 環境変数なしで Deploy する。

追加の `vercel.json` は置いていない。Node.js 20 以上が必要。
