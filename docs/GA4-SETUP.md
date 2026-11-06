# BAJ / Google Analytics 4 (review only)

## IDs and routing
- GA4 web measurement ID: `G-3M8K76R6F3`.
- Google Tag Manager container `GTM-W3XK6WKV` was also visible in the Google UI, but **is deliberately not installed**. Do not install both independently or you may double-count.
- The GA4 tag is loaded directly with `gtag.js` using `next/script` only after the visitor explicitly opts in.
- To override the public GA4 measurement ID at build time, set `NEXT_PUBLIC_GA_MEASUREMENT_ID`. The built-in fallback is `G-3M8K76R6F3`, so no deployment secret is required.
- JP and EN routes share one GA4 stream.
- The root layout is persistent across client navigations. GA4 enhanced measurement handles page views, rather than manually firing a second `page_view`.

## User consent
- First visit: opt-in / decline banner in JP or EN.
- Choice is stored in the browser in `localStorage` using key `baj-ga4-consent-v1`.
- Before consent: do not load Google Analytics scripts.
- After explicit consent: load GA4 script, with analytics enabled and advertising parameters denied.
- After decline: do not load GA4.
- Reopen via footer: 'アクセス解析の設定' / 'Analytics settings'.
- Withdrawal reloads the page after saving rejection, to stop GA requests.

## In Google Analytics
1. Open Admin > Data streams > BAJ Official Website.
2. Ensure Enhanced measurement is ON.
3. Under Page views advanced settings, turn ON **Page changes based on browser history events**. The site does not manually send page views.
4. After an approved deployment, visit the website, choose 'Allow analytics', then use GA4 Realtime and DebugView / Tag Assistant to confirm one `page_view` per page navigation.
5. Reject analytics in a fresh private browser session and confirm that no Google Analytics script is requested.
6. Verify JP and EN routes and mobile consent interface.
7. Do not treat lead conversion as configured yet. The current contact form does not submit to a backend. Later implement a confirmed submission before adding `generate_lead`.

## Cloudflare migration
- Preserve this same GA4 property and measurement ID. Do **not** create a second property merely because hosting changes.
- Carry over the consent component and policy. The NEXT_PUBLIC variable can be set at build time on the new hosting system.
- Update the website URL in GA4 stream details when the public domain changes; test realtime traffic again.
- Review consent requirements and policy text before publishing to international visitors.

## Approval and QA
- This branch is a proposal; no production merge or deployment is authorized until the BAJ owner approves.
- Perform `npm ci && npm run build` in a network-capable CI/build environment. The connector edit itself does not verify a successful Next.js build.
