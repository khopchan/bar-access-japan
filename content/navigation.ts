import type { L10n } from "@/lib/i18n";
import type { PageId, SectionId } from "@/lib/routes";

/** グローバルナビは5項目で固定。ラベルは日英ともこの英文を使う。 */
export const mainNav: { id: SectionId; label: string }[] = [
  { id: "bars", label: "EXPLORE BARS" },
  { id: "cocktails", label: "COCKTAILS" },
  { id: "stories", label: "STORIES" },
  { id: "events", label: "EVENTS" },
  { id: "guide", label: "GUIDE" },
];

export const footerNav: { id: Extract<PageId, "about" | "services" | "contact" | "privacy">; label: L10n }[] = [
  { id: "about", label: { ja: "ABOUT", en: "ABOUT" } },
  { id: "services", label: { ja: "SERVICES", en: "SERVICES" } },
  { id: "contact", label: { ja: "CONTACT", en: "CONTACT" } },
  {
    id: "privacy",
    label: { ja: "プライバシー / 編集方針", en: "Privacy / Editorial Policy" },
  },
];
