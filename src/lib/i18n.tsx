"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import en from "@/locales/en/common.json";
import fr from "@/locales/fr/common.json";
import ht from "@/locales/ht/common.json";

export type Locale = "en" | "fr" | "ht";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  fr: "French",
  ht: "Creole",
};

const translations: Record<Locale, typeof en> = { en, fr, ht };

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? `${K}.${NestedKeyOf<T[K]>}`
        : K;
    }[keyof T & string]
  : never;

type TranslationKey = NestedKeyOf<typeof en>;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
  transitioning: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "nova-lang";

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return current;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [transitioning, setTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && translations[saved]) {
      setLocaleState(saved);
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    if (!translations[newLocale]) return;
    setTransitioning(true);
    setTimeout(() => {
      setLocaleState(newLocale);
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale === "ht" ? "ht" : newLocale;
      setTimeout(() => setTransitioning(false), 50);
    }, 200);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const val = getNestedValue(
        translations[locale] as unknown as Record<string, unknown>,
        key
      );
      return typeof val === "string" ? val : key;
    },
    [locale]
  );

  const tArray = useCallback(
    (key: string): string[] => {
      const val = getNestedValue(
        translations[locale] as unknown as Record<string, unknown>,
        key
      );
      return Array.isArray(val) ? val : [];
    },
    [locale]
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tArray, transitioning }}>
      <div
        className={`transition-all duration-300 ${
          transitioning ? "opacity-0 blur-sm scale-[0.998]" : "opacity-100 blur-0 scale-100"
        }`}
      >
        {children}
      </div>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
