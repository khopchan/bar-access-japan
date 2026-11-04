import Link from "next/link";

export type LanguageLink = {
  href: string;
  label: string;
  lang: string;
  current: boolean;
};

export function LangSwitch({ languages }: { languages: LanguageLink[] }) {
  return (
    <div className="lang-switch">
      {languages.map((language, index) => (
        <span key={language.lang} className="lang-item">
          {index > 0 ? (
            <span aria-hidden="true" className="lang-slash">
              /
            </span>
          ) : null}
          <Link
            href={language.href}
            hrefLang={language.lang}
            lang={language.lang}
            aria-current={language.current ? "page" : undefined}
          >
            {language.label}
          </Link>
        </span>
      ))}
    </div>
  );
}
