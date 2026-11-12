# BAR ACCESS JAPAN — real content dataset (2026-11-12)

Every entry: last verified **2026-11-12 (JST)**, bilingual (ja/en), original wording (no copied prose), **no photos** (credit = 「写真未掲載（権利確認中）」 / "No photo (rights pending)").

The site reads this folder. `content/bars.ts`, `content/cocktails.ts`, `content/stories.ts`, and `content/guides.ts` import the JSON. Homepage slots are chosen separately in `content/home.ts`.

To add or change an entry, edit `src/` and regenerate:

```bash
bash research/src/build_all.sh
npm run build
```

`cocktails.json` `base` uses the site taxonomy: gin, whisky, rum, vodka, brandy, tequila, liqueur, shochu, wine, sherry, aperitif. `cocktails.data.json` `baseSpirit` keeps the finer id (`bitter-aperitif` maps to `aperitif`). Sherry is its own base, not wine.

## Files
| File | Shape | Count |
|---|---|---|
| `bars.json` | `Bar[]` (content/types.ts, strict) | 49 |
| `bars.data.json` | rich records (city/area ids, address, hours + status, accolades w/ year+source, url, ig, sources, notes) | 49 |
| `cocktails.json` | `Cocktail[]` (strict: `base` ∈ spiritBases, `flavor` ∈ flavors) | 48 |
| `cocktails.data.json` | rich: precise base spirit, spec (ja/en), specSource, method, glass, garnish, history, Japan context, linked bar slugs, sources | 48 |
| `stories.json` / `stories.data.json` | `Article[]` + sources/related slugs | 5 |
| `guides.json` / `guides.data.json` | `Article[]` + sources/related slugs | 2 |
| `SOURCES.md` | per-entry source URLs | — |
| `src/` | generator (`./src/build_all.sh` regenerates all JSON + SOURCES.md) | — |
| `_notes.md` | raw research notes | — |

## Coverage
Bars by city: Tokyo 29, Kyoto 6, Osaka 4, Fukuoka 2, Yokohama, Nara, Kobe, Kumamoto, Sapporo, Nagoya, Kanazawa, Sakata (1 each). All are believed operating as of 2026-11-12; no closed bars included.

Hours status (bars.data.json `hoursStatus`): official 24 · secondary 19 · 要確認 6 (BenFiddich, Little Smith, Jeremiah, L'Escamoteur, Yakoboku, Bar Spoon). In `bars.json`, 要確認 hours display 「要確認（訪問前に店舗へ確認を）」 and secondary hours carry 「（二次情報・訪問前に要確認）」.

## Schema mapping (for the implementer)
**Bar** — `kicker` = `EXPLORE BARS / <area>`, `byline` = `<city>・<area>`. `facts` uses ids, in order (optional ones omitted when unknown): `area`, `address`, `station`?, `style`, `people`?, `signature`?, `accolades`?, `hours`, `seats`, `price`, `web`?, `instagram`?, `checked`. BarView renders `facts` as a `<dl>`. `web` and `instagram` values are raw URLs and render as links. Tones cycle lacquer→ash→dusk→bone→wine→ink. City and area filters use `cityId` / `areaId`. Three area ids share a short filter label in `content/bars.ts` (`shibuya`, `kitashinchi`, `kawaramachi`) because the display names differ inside the id.

**Cocktail**: `base` is the site taxonomy listed above. Detail pages are `/cocktails/[slug]` (and `/en/cocktails/[slug]`). Slugs are unique and URL-safe. `barSlugs` in the rich file are the bar cross-links.

**Article**: stories/guides follow `{slug,tone,kicker,title,dek,byline,credit,before[],pull,after[]}`; byline = 「BAR ACCESS JAPAN 編集部」.

The site already loads this JSON: bar and cocktail pages show sources and the verification date, hours keep the caution wording above, and `barSlugs` / `related` become cross-links. Events in `content/events.ts` are still labeled samples. See the repository README for how to add a bar or a cocktail.

## Gaps / unverified (please review before launch)
- **Relocations handled:** Ginza Tender → Sanraku Bldg 9F, Ginza 6-5-16 (the50 address outdated; bar-tender.jp is an unrelated Beppu bar). Mori Bar: used **Mori Bar Gran** (Ginza 6-12-12); the 本店 is at Ginza 7-5-4. Kern moved 2023-12-15 (inside 家坂亭). nokishita711 Tabelog listing renewed (same address).
- **Name kanji unconfirmed → katakana in ja:** Kawakubo (Punch Room), Ito (Bar Tram), Suzuki (Bellwood), Gen Yamamoto, Horigami (Zoetrope), Fukuyama (Martha), Sekine Tomoiki (nokishita711). Romaji only: Shinya Koba (Yakoboku), Ryu Fujii (Craftroom). Bar Barns owner left blank.
- **Secondary-only accolades:** Trench #74 (thejapanpro) and The SG Club #88 (barhoppers.guide) in The World's 50 Best Bars 2026 (51–100), so verify on the50.com, High Five ranking history and ¥1,000 seat charge, Star Bar opening date + Sidecar signature.
- **Missing street numbers:** New York Bar (Park Hyatt), Old Imperial Bar (Imperial Hotel), Sea Guardian II (Hotel New Grand).
- **Official sites that returned HTTP 500/SSL errors from the box today** (likely bot-blocking; kept as cited): genyamamoto.jp, tokyoconfidential.com, spirits-sharing.com (Mixology). bar-navi.suntory.co.jp, Four Seasons, Yelp and suntory.co.jp/wnb returned 403 to curl (bot-block).
- **Cocktail specs:** IBA where available; Difford's for Bamboo, Million Dollar, Japanese Cocktail, Yokohama, Rob Roy (Tom Collins uses IBA John Collins + Old Tom note). Gimlet, Japanese Slipper and Salty Dog intentionally list ingredients without amounts (sources differ). Bamboo's two vermouths were simplified to "vermouth 20 ml".
- **Excluded:** Kamikaze (unsourced origin). Bars whose the50 discovery page could not be found were still included on other sources.
- Sone (Kobe) is a live-jazz venue; consider a "music" tag.
