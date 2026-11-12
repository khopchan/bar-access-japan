import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { BarsPage } from "@/components/BarsPage";
import { BarView } from "@/components/BarView";
import { CategoryLanding } from "@/components/CategoryLanding";
import { CocktailsPage } from "@/components/CocktailsPage";
import { CocktailView } from "@/components/CocktailView";
import { ContactPage } from "@/components/ContactPage";
import { EditorialPage } from "@/components/EditorialPage";
import { EventsPage } from "@/components/EventsPage";
import { HomePage } from "@/components/HomePage";
import { ServicesPage } from "@/components/ServicesPage";
import { SiteFrame } from "@/components/SiteFrame";
import { sections } from "@/content/sections";
import { getPageMeta } from "@/content/pages";
import { barBySlug, cocktailBySlug, guideBySlug, guideCards, storyBySlug, storyCards } from "@/lib/catalog";
import { brandAssets } from "@/lib/brand";
import { t, type Locale } from "@/lib/i18n";
import { alternateHrefs, hrefFor, isSectionId, parseSlug, staticParams, type PageId, type ParsedRoute } from "@/lib/routes";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return staticParams();
}

type RouteParams = { slug?: string[] };

const ogImage = {
  url: brandAssets.og.src,
  width: brandAssets.og.width,
  height: brandAssets.og.height,
  alt: "BAR ACCESS JAPAN",
};

function describe(parsed: ParsedRoute): { title: string; description: string; type: "website" | "article" } {
  if (parsed.kind === "story" || parsed.kind === "guide") {
    const article = parsed.kind === "story" ? storyBySlug(parsed.slug) : guideBySlug(parsed.slug);
    if (!article) return { title: "Not found", description: "", type: "article" };
    return {
      title: t(article.title, parsed.locale),
      description: t(article.dek, parsed.locale),
      type: "article",
    };
  }
  if (parsed.kind === "bar") {
    const bar = barBySlug(parsed.slug);
    if (!bar) return { title: "Not found", description: "", type: "website" };
    return { title: t(bar.title, parsed.locale), description: t(bar.dek, parsed.locale), type: "website" };
  }
  if (parsed.kind === "cocktail") {
    const cocktail = cocktailBySlug(parsed.slug);
    if (!cocktail) return { title: "Not found", description: "", type: "website" };
    return { title: t(cocktail.title, parsed.locale), description: t(cocktail.dek, parsed.locale), type: "website" };
  }
  const meta = getPageMeta(parsed.page, parsed.locale);
  return { title: meta.title, description: meta.description, type: "website" };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return { title: "Not found" };
  const meta = describe(parsed);
  const alternates = alternateHrefs(parsed);
  const canonical = parsed.locale === "en" ? alternates.en : alternates.ja;
  const home = parsed.kind === "page" && parsed.page === "home";
  return {
    title: home ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        ja: alternates.ja,
        en: alternates.en,
        "x-default": alternates.ja,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: "BAR ACCESS JAPAN",
      locale: parsed.locale === "ja" ? "ja_JP" : "en_US",
      alternateLocale: parsed.locale === "ja" ? ["en_US"] : ["ja_JP"],
      type: meta.type,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  return (
    <SiteFrame route={parsed}>
      <PageBody route={parsed} />
    </SiteFrame>
  );
}

function PageBody({ route }: { route: ParsedRoute }) {
  const locale: Locale = route.locale;
  if (route.kind === "story") {
    const article = storyBySlug(route.slug);
    if (!article) notFound();
    return <ArticleView locale={locale} article={article} kind="story" />;
  }
  if (route.kind === "guide") {
    const article = guideBySlug(route.slug);
    if (!article) notFound();
    return <ArticleView locale={locale} article={article} kind="guide" />;
  }
  if (route.kind === "bar") {
    const bar = barBySlug(route.slug);
    if (!bar) notFound();
    return <BarView locale={locale} bar={bar} />;
  }
  if (route.kind === "cocktail") {
    const cocktail = cocktailBySlug(route.slug);
    if (!cocktail) notFound();
    return <CocktailView locale={locale} cocktail={cocktail} />;
  }
  return <StaticPage locale={locale} page={route.page} />;
}

function StaticPage({ locale, page }: { locale: Locale; page: PageId }) {
  if (page === "home") return <HomePage locale={locale} />;
  if (page === "bars") return <BarsPage locale={locale} />;
  if (page === "stories") {
    const cards = storyCards(locale);
    return (
      <CategoryLanding
        locale={locale}
        kicker={t(sections.stories.kicker, locale)}
        title={t(sections.stories.title, locale)}
        lede={t(sections.stories.lede, locale)}
        featured={cards[0] ?? null}
        rest={cards.slice(1)}
      />
    );
  }
  if (page === "guide") {
    const cards = guideCards(locale);
    return (
      <CategoryLanding
        locale={locale}
        kicker={t(sections.guide.kicker, locale)}
        title={t(sections.guide.title, locale)}
        lede={t(sections.guide.lede, locale)}
        featured={cards[0] ?? null}
        rest={cards.slice(1)}
      />
    );
  }
  if (page === "cocktails") return <CocktailsPage locale={locale} />;
  if (page === "events") return <EventsPage locale={locale} />;
  if (page === "services") return <ServicesPage locale={locale} />;
  if (page === "contact") return <ContactPage locale={locale} />;
  if (page === "about") return <EditorialPage locale={locale} page="about" />;
  if (isSectionId(page)) return null;
  return <EditorialPage locale={locale} page="privacy" />;
}
