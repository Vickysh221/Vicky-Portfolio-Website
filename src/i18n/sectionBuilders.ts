import type { ReactNode } from 'react';
import type { LocalizedText } from './types.ts';

export type RenderableSectionTitle = string | LocalizedText;

export interface SectionShape<Title extends RenderableSectionTitle> {
  id: string;
  numeral: string;
  title: Title;
  blocks: ReactNode[];
}

export type LocalizedSectionData = SectionShape<LocalizedText>;
export type LocalizedSectionDefinition = Omit<LocalizedSectionData, 'blocks'>;

export function createLocalizedTitle(zh: string, en: string): LocalizedText {
  return { zh, en };
}

export function createMirroredTitle(title: string): LocalizedText {
  return createLocalizedTitle(title, title);
}

export function resolveSectionTitle(title: RenderableSectionTitle, text: (value: LocalizedText) => string): string {
  return typeof title === 'string' ? title : text(title);
}
