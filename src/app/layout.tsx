import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "NOVA DIGITAL TECH — Web, App Development & Automation",
  description:
    "We build premium websites, mobile apps, booking systems, branding, and AI automation tools for small businesses, startups, and entrepreneurs.",
  keywords:
    "web development, app development, booking system, branding, AI automation, digital agency, small business website",
  openGraph: {
    title: "NOVA DIGITAL TECH — Digital Solutions That Help Your Business Grow",
    description:
      "Premium websites, mobile apps, booking systems, and automation built to make your business look professional and attract customers.",
    type: "website",
  },
  alternates: {
    languages: {
      en: "/",
      fr: "/",
      ht: "/",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
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
