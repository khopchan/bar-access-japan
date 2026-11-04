import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactPage } from "@/components/ContactPage";
import { EditorialPage } from "@/components/EditorialPage";
import { HomePage } from "@/components/HomePage";
import { SectionPage } from "@/components/SectionPage";
import { ServicesPage } from "@/components/ServicesPage";
import { SiteFrame } from "@/components/SiteFrame";
import { getPageMeta } from "@/content/pages";
import type { Locale } from "@/lib/i18n";
import { hrefFor, isSectionId, parseSlug, staticParams, type PageId } from "@/lib/routes";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return staticParams();
}

type RouteParams = { slug?: string[] };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return { title: "Not found" };
  const meta = getPageMeta(parsed.page, parsed.locale);
  const canonical = hrefFor(parsed.locale, parsed.page);
  return {
    title: parsed.page === "home" ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        ja: hrefFor("ja", parsed.page),
        en: hrefFor("en", parsed.page),
        "x-default": hrefFor("ja", parsed.page),
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: "BAR ACCESS JAPAN",
      locale: parsed.locale === "ja" ? "ja_JP" : "en_US",
      alternateLocale: parsed.locale === "ja" ? ["en_US"] : ["ja_JP"],
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  return (
    <SiteFrame locale={parsed.locale} page={parsed.page}>
      <PageBody locale={parsed.locale} page={parsed.page} />
    </SiteFrame>
  );
}

function PageBody({ locale, page }: { locale: Locale; page: PageId }) {
  if (page === "home") return <HomePage locale={locale} />;
  if (isSectionId(page)) return <SectionPage locale={locale} page={page} />;
  if (page === "services") return <ServicesPage locale={locale} />;
  if (page === "contact") return <ContactPage locale={locale} />;
  if (page === "about") return <EditorialPage locale={locale} page="about" />;
  return <EditorialPage locale={locale} page="privacy" />;
}
