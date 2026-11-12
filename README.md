# BAR ACCESS JAPAN

日本のバー文化を世界へ渡す、デジタルメディア兼サービスのサイトです。
ブランドラインは「日本のバー文化への扉を、すべての人に。」/ “Access the real side of Japan's Bar Culture.”

English: a static-friendly Next.js site. Japanese is the default (`/`). English lives under `/en`. Bars, cocktails, stories, and guides are researched listings (last checked 2026-11-12). Events are still labeled as samples. There are no photographs — picture frames are typographic placeholders. The credit line is 「写真未掲載（権利確認中）」 / “No photo (rights pending)”.

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
content/                  表示用の組み立て。本文の実データは research/
  site.ts                 ブランド、メール、Instagram、共通 UI
  navigation.ts           グローバルナビ 5 項目とフッター
  home.ts                 トップのリード / グリッド / Latest の並び
  sections.ts             5 セクションの導入文
  stories.ts              記事（STORIES）。research/stories.json を読む
  guides.ts               記事（GUIDE）。research/guides.json を読む
  bars.ts                 店舗。research/bars.json を読む
  cocktails.ts            カクテル。ベースの分類と research/cocktails.json
  events.ts               イベント。まだサンプル。これから / 終了
  services.ts             サービス 6 件
  pages.ts                About、Contact、Privacy、メタデータ
research/                 調査データと生成スクリプト
  bars.json               店舗の誌面（Bar）
  bars.data.json          都市、出典、営業時間の確度、URL
  cocktails.json          カクテルの誌面
  cocktails.data.json     レシピ、来歴、結びつく店
  stories.json            記事
  guides.json             案内
  src/build_all.sh        JSON と SOURCES.md を再生成する
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

店・カクテル・記事の本文は `research/` にある。表示文は次の形にする。

```ts
{ ja: "日本語", en: "English" }
```

- 日本語が既定。英語ページは同じデータから `/en` を組み立てる。
- グローバルナビは `content/navigation.ts` の 5 項目（EXPLORE BARS、COCKTAILS、STORIES、EVENTS、GUIDE）。SERVICES / ABOUT / CONTACT はフッターだけ。
- トップの並びは `content/home.ts` の `homeLayout`。`kind` と `slug` で、記事・案内・店舗・カクテル・イベントを指す。
- 記事の本文は `research/stories.json` と `research/guides.json`。`before`、`pull`（引き抜き）、`after`。出典と関連スラッグは、対になる `*.data.json`。
- 店舗は `research/bars.json`。写真枠、コンセプト、実用情報の順。実用情報の最後が `確認日`（英語は Date checked）。`web` と `instagram` はリンクになる。二次情報の営業時間には「二次情報・訪問前に要確認」、未確認には「要確認」が付く。
- 都市とエリアの絞り込みは `bars.data.json` の `cityId` / `areaId`。表示名が一つの id の中で分かれるときは、`content/bars.ts` の `AREA_FILTER_LABEL` に短いラベルを足す。
- カクテルは `research/cocktails.json` と `cocktails.data.json`。`base` は gin / whisky / rum / vodka / brandy / tequila / liqueur / shochu / wine / sherry / aperitif。`flavor` は aroma / finish / light / after。レシピは出典の標準で、詳細ページに材料・作り方・出典がある。
- イベントは `events.ts` の `status`: `upcoming` か `ended`。実データはまだなく、サンプルだとページ上に書いてある。
- サービスは `content/services.ts`。`comingSoon: true` で「近日公開」バッジが出る。
- 連絡先メールと、このサイト自身の Instagram URL は `content/site.ts`。いまはプレースホルダ。公開前のアカウント説明を消すときは `instagram.pending` を `false` にする。
- 赤は `app/globals.css` の `--baj-red`（公式の盾の赤 `#e40719`）。

### 店やカクテルを足す / 直す

1. `research/src/` の既存の店（`bars_*.py`）かカクテル（`ck_*.py`）を見本に、レコードを足す。スラッグは URL に使える一意の英数とハイフン。
2. カクテルから店へつなぐときは、カクテルの `bars` に店のスラッグを入れる。記事の `related` も同じスラッグを指せる。
3. リポジトリのルートで再生成する。

```bash
bash research/src/build_all.sh
```

4. トップに出すなら `content/home.ts` の `homeLayout` をそのスラッグへ向ける。
5. `npm run build` で、欠けたスラッグや未知のベース酒はここで失敗する。

JSON を直接編集してもビルドは読む。次に `build_all.sh` を走らせると、`src/` の内容で上書きされる。

写真は載せない。クレジットは「写真未掲載（権利確認中）」。営業時間が公式以外のときは、生成スクリプトが注意書きを時間の文へ足す。

ロゴは不透明な画像です。黒地のモノグラムは黒いヘッダーの上に、盾と白地のモノグラムとバッジは白いプレートの上に置いています。

## Routes / パス

| ページ | 日本語 | English |
| --- | --- | --- |
| トップ | `/` | `/en` |
| EXPLORE BARS | `/bars` | `/en/bars` |
| 店舗詳細 | `/bars/bar-high-five` | `/en/bars/bar-high-five` |
| COCKTAILS | `/cocktails` | `/en/cocktails` |
| カクテル詳細 | `/cocktails/dry-martini` | `/en/cocktails/dry-martini` |
| STORIES | `/stories` | `/en/stories` |
| 記事 | `/stories/asia-50-best-bars-2026-japan` | `/en/stories/asia-50-best-bars-2026-japan` |
| EVENTS | `/events` | `/en/events` |
| GUIDE | `/guide` | `/en/guide` |
| 案内の記事 | `/guide/bar-charges-guide` | `/en/guide/bar-charges-guide` |
| About | `/about` | `/en/about` |
| Services | `/services` | `/en/services` |
| Contact | `/contact` | `/en/contact` |
| Privacy / Editorial Policy | `/privacy` | `/en/privacy` |

店舗は 49 件、カクテルは 48 件。スラッグは各 JSON の `slug`。言語切替は、見ている詳細ページの相手言語へ移る。

ヘッダーの検索は、店名・エリア・人、カクテル、記事の見出しと本文を見る。サーバーへは送らない。店は都市とエリア、カクテルはベースと味わいで絞れる。どちらもページ内だけで完結する。

「夜の便り」の登録欄は、まだ送信しない試作です。アドレスは保存も送信もされません。Contact のフォームも同じで、`method="dialog"` のためスクリプトなしでもサーバーへ POST しません。メールリンクを開いたときだけ、利用者のメールソフトが起動する。

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
