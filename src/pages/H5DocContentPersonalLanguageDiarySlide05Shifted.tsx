import type { LocalizedSectionData } from '../i18n/sectionBuilders.ts';
import { getPersonalLanguageDiarySlide04Sections } from './H5DocContentPersonalLanguageDiarySlide04';

export function getPersonalLanguageDiarySlide05ShiftedSections(accentColor: string): LocalizedSectionData[] {
  return getPersonalLanguageDiarySlide04Sections(accentColor).map((section) => ({
    ...section,
    numeral: '05',
  }));
}
