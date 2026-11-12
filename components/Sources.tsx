import { ui, verifiedLabel } from "@/content/site";
import { sourceLabel } from "@/lib/links";
import { t, type Locale } from "@/lib/i18n";

export function Sources({
  locale,
  urls,
  lastVerified,
}: {
  locale: Locale;
  urls: string[];
  lastVerified: string;
}) {
  if (urls.length === 0) return null;

  return (
    <section className="sources" data-reveal aria-labelledby="sources-heading">
      <h2 id="sources-heading">{t(ui.sourcesTitle, locale)}</h2>
      <p className="sources-meta">{verifiedLabel(lastVerified, locale)}</p>
      <ol>
        {urls.map((url) => (
          <li key={url}>
            <a href={url} title={url} target="_blank" rel="noopener noreferrer">
              {sourceLabel(url)}
              <span className="visually-hidden"> {t(ui.newTab, locale)}</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
