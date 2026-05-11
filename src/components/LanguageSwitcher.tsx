"use client";

import { useI18n, LOCALE_LABELS, type Locale } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const locales: Locale[] = ["en", "fr", "ht"];

export default function LanguageSwitcher({ mobile }: { mobile?: boolean }) {
  const { locale, setLocale } = useI18n();

  if (mobile) {
    return (
      <div className="flex items-center gap-1 px-2 py-2">
        <Globe className="w-4 h-4 text-gray-500 mr-1.5" />
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => setLocale(loc)}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
              locale === loc
                ? "text-black bg-gradient-to-r from-nova-cyan to-nova-blue shadow-md shadow-nova-cyan/20"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {LOCALE_LABELS[loc].toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-lg glass">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => setLocale(loc)}
          className="relative px-3 py-1.5 text-[11px] font-medium tracking-wide rounded-md transition-colors"
        >
          {locale === loc && (
            <motion.div
              layoutId="lang-indicator"
              className="absolute inset-0 rounded-md bg-gradient-to-r from-nova-cyan to-nova-blue"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span
            className={`relative z-10 ${
              locale === loc ? "text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            {LOCALE_LABELS[loc].toUpperCase()}
          </span>
        </button>
      ))}
    </div>
  );
}
