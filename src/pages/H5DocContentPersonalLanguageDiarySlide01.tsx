import type { SectionData } from './H5DocContentSlideFactory';
import { getLanguageDiarySlideSections } from './languageDiary/getLanguageDiarySlideSections';

export function getPersonalLanguageDiarySlide01Sections(accentColor: string): SectionData[] {
  return getLanguageDiarySlideSections(0, accentColor);
}
