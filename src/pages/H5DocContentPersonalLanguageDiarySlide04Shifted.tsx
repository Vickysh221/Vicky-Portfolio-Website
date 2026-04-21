import type { SectionData } from './H5DocContentSlideFactory';
import { getPersonalLanguageDiarySlide03Sections } from './H5DocContentPersonalLanguageDiarySlide03';

export function getPersonalLanguageDiarySlide04ShiftedSections(accentColor: string): SectionData[] {
  return getPersonalLanguageDiarySlide03Sections(accentColor).map((section) => ({
    ...section,
    numeral: '04',
  }));
}
