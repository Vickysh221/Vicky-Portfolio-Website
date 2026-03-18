import type { SectionData } from './H5DocContentSlideFactory';
import { getLanguageDiarySlideSections } from './languageDiary/getLanguageDiarySlideSections';

export function getPersonalLanguageDiarySlide06Sections(accentColor: string): SectionData[] {
  return getLanguageDiarySlideSections(5, accentColor);
}
