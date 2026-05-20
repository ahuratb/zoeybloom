"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Lang, defaultLang, getDictionary, Dictionary } from "@/lib/i18n";

type LangContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Dictionary;
  setLang: (lang: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "zoeybloom.lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(defaultLang);

  // Hydrate from localStorage after mount (avoids SSR→client mismatch).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "ar" || saved === "en") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLangState(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Reflect into <html> + <body>
  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", dir);
    document.body.classList.toggle("lang-ar", lang === "ar");
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    // Notify ScrollTrigger to recalc after layout shift
    window.dispatchEvent(new Event("lang:change"));
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
  }, []);

  const toggle = useCallback(() => {
    setLangState((curr) => (curr === "en" ? "ar" : "en"));
  }, []);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      t: getDictionary(lang),
      setLang,
      toggle,
    }),
    [lang, setLang, toggle]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLangContext() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLangContext must be used inside <LangProvider>");
  return ctx;
}
