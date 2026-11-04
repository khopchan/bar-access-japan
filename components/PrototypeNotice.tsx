import { ui } from "@/content/site";
import { t, type Locale } from "@/lib/i18n";

export function PrototypeNotice({ locale }: { locale: Locale }) {
  return (
    <p className="notice">
      <strong>{t(ui.noticeLabel, locale)}</strong>
      {t(ui.noticeBody, locale)}
    </p>
  );
}
