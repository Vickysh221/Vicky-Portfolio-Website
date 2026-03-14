import type { SectionData } from './H5DocContentSlideFactory';
import { getLanguageDiarySlideSections } from './languageDiary/getLanguageDiarySlideSections';

export function getPersonalLanguageDiarySlide03Sections(accentColor: string): SectionData[] {
  return getLanguageDiarySlideSections(2, accentColor);
}
