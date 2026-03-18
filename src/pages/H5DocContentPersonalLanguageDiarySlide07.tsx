import type { SectionData } from './H5DocContentSlideFactory';
import { getLanguageDiarySlideSections } from './languageDiary/getLanguageDiarySlideSections';

export function getPersonalLanguageDiarySlide07Sections(accentColor: string): SectionData[] {
  return getLanguageDiarySlideSections(6, accentColor);
}
