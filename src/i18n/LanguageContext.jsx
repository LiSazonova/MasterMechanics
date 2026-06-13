import { useState, useEffect, useCallback } from "react";
import { translations, DEFAULT_LANG } from "./translations";
import { LanguageContext } from "./context";
import { updateDocumentMeta } from "./updateDocumentMeta";

const STORAGE_KEY = "mm-lang";

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);
  const t = translations[lang];

  const setLang = useCallback((code) => {
    if (!translations[code]) return;
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    updateDocumentMeta(lang, t.meta);
  }, [lang, t]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
