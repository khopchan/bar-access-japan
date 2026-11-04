import Link from "next/link";
import { services, servicesIntro } from "@/content/services";
import { ui } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";
import { PrototypeNotice } from "@/components/PrototypeNotice";
import { t, type Locale } from "@/lib/i18n";
import { hrefFor } from "@/lib/routes";

export function ServicesPage({ locale }: { locale: Locale }) {
  return (
    <article className="sheet">
      <PageHeader
        kicker={t(servicesIntro.kicker, locale)}
        title={t(servicesIntro.title, locale)}
        lede={t(servicesIntro.lede, locale)}
      />
      <PrototypeNotice locale={locale} />
      <ol className="service-list">
        {services.map((service, index) => (
          <li key={service.id} id={service.id} className="service">
            <span className="index">{String(index + 1).padStart(2, "0")}</span>
            <div className="service-copy">
              <div className="service-title">
                <h2>{t(service.title, locale)}</h2>
                {service.comingSoon ? <span className="badge">{t(ui.comingSoon, locale)}</span> : null}
              </div>
              <p>{t(service.body, locale)}</p>
            </div>
            <Link
              className="text-link"
              href={`${hrefFor(locale, "contact")}?topic=${service.id}`}
            >
              {t(ui.serviceCta, locale)}
              <span aria-hidden="true"> →</span>
            </Link>
          </li>
        ))}
      </ol>
    </article>
  );
}
