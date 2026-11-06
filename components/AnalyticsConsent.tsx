"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { hrefFor } from "@/lib/routes";

// A GA4 measurement ID is public, not an API credential.
// Override with NEXT_PUBLIC_GA_MEASUREMENT_ID when moving hosting providers.
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-3M8K76R6F3";
const STORAGE_KEY = "baj-ga4-consent-v1";
const OPEN_SETTINGS_EVENT = "baj:open-analytics-preferences";

type Decision = "accepted" | "rejected" | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Basic consent mode: no Google Analytics script before a visitor opts in. */
export function AnalyticsConsent({ locale }: { locale: Locale }) {
  const [ready, setReady] = useState(false);
  const [decision, setDecision] = useState<Decision>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "accepted" || saved === "rejected") {
        setDecision(saved);
      }
    } catch {
      // Browsers blocking storage can still give session-only consent.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    const open = () => setSettingsOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  function saveDecision(next: Exclude<Decision, null>) {
    const wasAccepted = decision === "accepted";
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // A choice still applies to the current page when storage is blocked.
    }
    setDecision(next);
    setSettingsOpen(false);
    // Removing the tag by reloading ensures no more analytics requests after withdrawal.
    if (wasAccepted && next === "rejected") window.location.reload();
  }

  return (
    <>
      {ready && decision === "accepted" ? (
        <Script
          id="baj-ga4"
          src={"https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(MEASUREMENT_ID)}
          strategy="afterInteractive"
          onReady={() => {
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || ((...args: unknown[]) => {
              window.dataLayer?.push(args);
            });
            // Analytics only. Advertising consent stays denied.
            window.gtag("consent", "default", {
              analytics_storage: "granted",
              ad_storage: "denied",
              ad_user_data: "denied",
              ad_personalization: "denied",
            });
            window.gtag("js", new Date());
            // GA4 Enhanced Measurement tracks initial and SPA history page views.
            // Do not send page_view manually or load GTM simultaneously.
            window.gtag("config", MEASUREMENT_ID);
          }}
        />
      ) : null}

      {ready && (decision === null || settingsOpen) ? (
        <section className="analytics-consent" role="dialog" aria-modal="false" aria-labelledby="baj-analytics-consent-title">
          <div className="analytics-consent-inner">
            <div className="analytics-consent-text">
              <p className="eyebrow">ANALYTICS / PRIVACY</p>
              <h2 id="baj-analytics-consent-title">
                {locale === "ja" ? "アクセス解析について" : "Analytics preferences"}
              </h2>
              <p>
                {locale === "ja"
                  ? "サイト改善のため、同意いただいた場合のみGoogle Analyticsで閲覧ページやアクセス元を計測します。広告向けの同意は求めません。"
                  : "With your permission, we use Google Analytics to understand page visits and traffic sources. Advertising tracking is not enabled."}
              </p>
              <Link href={hrefFor(locale, "privacy")}>
                {locale === "ja" ? "プライバシー・編集方針" : "Privacy & editorial policy"}
              </Link>
            </div>
            <div className="analytics-consent-actions">
              <button type="button" className="analytics-consent-accept" onClick={() => saveDecision("accepted")}>
                {locale === "ja" ? "解析に同意する" : "Allow analytics"}
              </button>
              <button type="button" className="analytics-consent-reject" onClick={() => saveDecision("rejected")}>
                {locale === "ja" ? "同意しない" : "Decline"}
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

export function AnalyticsPreferencesButton({ locale }: { locale: Locale }) {
  return (
    <button
      type="button"
      className="analytics-preferences-button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
    >
      {locale === "ja" ? "アクセス解析の設定" : "Analytics settings"}
    </button>
  );
}
