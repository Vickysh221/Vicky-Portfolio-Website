import type { SectionData } from './H5DocContentSlideFactory';
import { getLanguageDiarySlideSections } from './languageDiary/getLanguageDiarySlideSections';

export function getPersonalLanguageDiarySlide05Sections(accentColor: string): SectionData[] {
  return getLanguageDiarySlideSections(4, accentColor);
}
