import { useState, useEffect, useCallback } from "react";
import { translations, DEFAULT_LANG } from "./translations";
import { LanguageContext } from "./context";
import { updateDocumentMeta } from "./updateDocumentMeta";

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG);
  const t = translations[lang];

  const setLang = useCallback((code) => {
    if (!translations[code]) return;
    setLangState(code);
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
