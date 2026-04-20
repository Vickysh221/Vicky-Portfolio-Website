import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  pickLocalizedText,
  resolveInitialLanguage,
} from './localization.ts';
import type { Language, LocalizedText } from './types.ts';

interface LanguageContextValue {
  language: Language;
  setLanguage: (next: Language) => void;
  toggleLanguage: () => void;
  text: (value: LocalizedText) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() =>
    typeof window === 'undefined' ? DEFAULT_LANGUAGE : resolveInitialLanguage(window.localStorage),
  );

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === 'zh' ? 'en' : 'zh')),
      text: (localized) => pickLocalizedText(localized, language),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useI18n must be used within LanguageProvider');
  return context;
}
