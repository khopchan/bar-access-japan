import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { siteUrl } from "@/lib/site-url";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const serif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-serif",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: {
    default: "BAR ACCESS JAPAN",
    template: "%s — BAR ACCESS JAPAN",
  },
  description: "Access the real side of Japan's Bar Culture.",
  applicationName: "BAR ACCESS JAPAN",
  robots: { index: true, follow: true },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    siteName: "BAR ACCESS JAPAN",
    type: "website",
    images: [{ url: "/brand/og.jpg", width: 1200, height: 630, alt: "BAR ACCESS JAPAN" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${serif.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');document.documentElement.lang=location.pathname==='/en'||location.pathname.indexOf('/en/')===0?'en':'ja';",
          }}
        />
        {children}
        <AnalyticsConsent />
      </body>
    </html>
  );
}
