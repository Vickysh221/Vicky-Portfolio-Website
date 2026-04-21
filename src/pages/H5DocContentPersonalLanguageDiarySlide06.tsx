import type { SectionData } from './H5DocContentSlideFactory';
import { getPersonalLanguageDiarySlide05Sections } from './H5DocContentPersonalLanguageDiarySlide05';

export function getPersonalLanguageDiarySlide06Sections(accentColor: string): SectionData[] {
  return getPersonalLanguageDiarySlide05Sections(accentColor).map((section) => ({
    ...section,
    numeral: '06',
  }));
}
