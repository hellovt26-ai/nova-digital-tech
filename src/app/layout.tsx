import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NOVA DIGITAL TECH — Web, App Development & Automation",
  description:
    "We build premium websites, mobile apps, booking systems, branding, and AI automation tools for small businesses, startups, and entrepreneurs.",
  keywords:
    "web development, app development, booking system, branding, AI automation, digital agency, small business website, NOVA Digital Tech",
  authors: [{ name: "NOVA DIGITAL TECH" }],
  creator: "NOVA DIGITAL TECH",
  openGraph: {
    title: "NOVA DIGITAL TECH — Digital Solutions That Help Your Business Grow",
    description:
      "Premium websites, mobile apps, booking systems, and automation built to make your business look professional and attract customers.",
    siteName: "NOVA DIGITAL TECH",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "NOVA DIGITAL TECH — Premium Digital Solutions",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA DIGITAL TECH — Digital Solutions That Help Your Business Grow",
    description:
      "Premium websites, mobile apps, booking systems, and automation built to make your business look professional and attract customers.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    languages: {
      en: "/",
      fr: "/",
      ht: "/",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#14141d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://buy.stripe.com" />
        <link rel="dns-prefetch" href="https://buy.stripe.com" />
        <link rel="alternate" hrefLang="en" href="/" />
        <link rel="alternate" hrefLang="fr" href="/" />
        <link rel="alternate" hrefLang="ht" href="/" />
        <link rel="alternate" hrefLang="x-default" href="/" />
      </head>
      <body className="antialiased">
        <I18nProvider>{children}</I18nProvider>
        {/* Vercel Analytics — page views & visitor monitoring */}
        <Analytics />
        {/* Google Analytics — loaded after page is interactive */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R73YNG7X22"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R73YNG7X22');
          `}
        </Script>
        {/* TikTok Pixel — ad tracking & conversions */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

              ttq.load('D84J133C77UDS4G4KMQ0');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      </body>
    </html>
  );
}
