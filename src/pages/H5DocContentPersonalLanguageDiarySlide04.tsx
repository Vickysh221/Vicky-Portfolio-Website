import type { SectionData } from './H5DocContentSlideFactory';
import { getLanguageDiarySlideSections } from './languageDiary/getLanguageDiarySlideSections';

export function getPersonalLanguageDiarySlide04Sections(accentColor: string): SectionData[] {
  return getLanguageDiarySlideSections(3, accentColor);
}
