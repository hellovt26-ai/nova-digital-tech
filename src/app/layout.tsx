import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "NOVA DIGITAL TECH — Web, App Development & Automation",
  description:
    "We build premium websites, mobile apps, booking systems, branding, and AI automation tools for small businesses, startups, and entrepreneurs.",
  keywords:
    "web development, app development, booking system, branding, AI automation, digital agency, small business website, NOVA Digital Tech",
  authors: [{ name: "NOVA DIGITAL TECH" }],
  creator: "NOVA DIGITAL TECH",
  metadataBase: new URL("https://hellovt26-ai.github.io"),
  openGraph: {
    title: "NOVA DIGITAL TECH — Digital Solutions That Help Your Business Grow",
    description:
      "Premium websites, mobile apps, booking systems, and automation built to make your business look professional and attract customers.",
    url: "https://hellovt26-ai.github.io/nova-digital-tech/",
    siteName: "NOVA DIGITAL TECH",
    images: [
      {
        url: "/nova-digital-tech/og-image.svg",
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
    images: ["/nova-digital-tech/og-image.svg"],
  },
  icons: {
    icon: [
      { url: "/nova-digital-tech/favicon.ico", sizes: "32x32" },
      { url: "/nova-digital-tech/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/nova-digital-tech/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/nova-digital-tech/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/nova-digital-tech/site.webmanifest",
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
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-R73YNG7X22" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-R73YNG7X22');
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" hrefLang="en" href="/" />
        <link rel="alternate" hrefLang="fr" href="/" />
        <link rel="alternate" hrefLang="ht" href="/" />
        <link rel="alternate" hrefLang="x-default" href="/" />
      </head>
      <body className="antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
