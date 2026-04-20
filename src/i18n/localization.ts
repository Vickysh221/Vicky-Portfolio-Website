import type { Language, LocalizedText } from './types.ts';

export const DEFAULT_LANGUAGE: Language = 'zh';
export const LANGUAGE_STORAGE_KEY = 'portfolio.language';

export function isLanguage(value: string): value is Language {
  return value === 'zh' || value === 'en';
}

export function resolveInitialLanguage(storage: Pick<Storage, 'getItem'> | undefined): Language {
  const persisted = storage?.getItem(LANGUAGE_STORAGE_KEY);
  return persisted && isLanguage(persisted) ? persisted : DEFAULT_LANGUAGE;
}

export function pickLocalizedText(text: LocalizedText, language: Language): string {
  return language === 'en' ? text.en ?? text.zh : text.zh;
}
