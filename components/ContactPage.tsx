import { contactCopy } from "@/content/pages";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { ContactForm, type ContactFormCopy } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { PrototypeNotice } from "@/components/PrototypeNotice";
import { t, type Locale } from "@/lib/i18n";

export function ContactPage({ locale }: { locale: Locale }) {
  const copy: ContactFormCopy = {
    emailAddress: site.contactEmail,
    name: t(contactCopy.name, locale),
    email: t(contactCopy.email, locale),
    topic: t(contactCopy.topic, locale),
    message: t(contactCopy.message, locale),
    submit: t(contactCopy.submit, locale),
    general: t(contactCopy.general, locale),
    successTitle: t(contactCopy.successTitle, locale),
    successBody: t(contactCopy.successBody, locale),
    mailto: t(contactCopy.mailto, locale),
    back: t(contactCopy.back, locale),
    subjectPrefix: t(contactCopy.subjectPrefix, locale),
    errors: {
      name: t(contactCopy.errors.name, locale),
      email: t(contactCopy.errors.email, locale),
      message: t(contactCopy.errors.message, locale),
    },
    topics: services.map((service) => ({ id: service.id, label: t(service.title, locale) })),
  };

  return (
    <article className="sheet">
      <div className="contact-grid">
        <div>
          <PageHeader
            kicker={t(contactCopy.kicker, locale)}
            title={t(contactCopy.title, locale)}
            lede={t(contactCopy.lede, locale)}
          />
          <PrototypeNotice locale={locale} />
          <p className="email-line">
            <span className="eyebrow">{t(contactCopy.emailCaption, locale)}</span>
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
        </div>
        <ContactForm copy={copy} />
      </div>
    </article>
  );
}
