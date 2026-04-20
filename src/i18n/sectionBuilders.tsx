import type { ReactNode } from 'react';
import type { LocalizedText } from './types.ts';

export interface LocalizedSectionData {
  id: string;
  numeral: string;
  title: LocalizedText;
  blocks: ReactNode[];
}

export function createLocalizedTitle(zh: string, en: string): LocalizedText {
  return { zh, en };
}

export function createMirroredTitle(title: string): LocalizedText {
  return createLocalizedTitle(title, title);
}
