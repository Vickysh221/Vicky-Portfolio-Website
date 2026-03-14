import type { SectionData } from './H5DocContentSlideFactory';
import { getLanguageDiarySlideSections } from './languageDiary/getLanguageDiarySlideSections';

export function getPersonalLanguageDiarySlide02Sections(accentColor: string): SectionData[] {
  return getLanguageDiarySlideSections(1, accentColor);
}
