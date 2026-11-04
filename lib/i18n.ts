export const locales = ["ja", "en"] as const;

export type Locale = (typeof locales)[number];

export type L10n = {
  ja: string;
  en: string;
};

export function t(copy: L10n, locale: Locale): string {
  return copy[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ja" ? "en" : "ja";
}
