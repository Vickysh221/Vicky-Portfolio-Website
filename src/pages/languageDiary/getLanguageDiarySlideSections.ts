import type { SectionData } from '../H5DocContentSlideFactory';
import { createLanguageDiarySections } from './languageDiarySlideFactory';
import { languageDiarySlides } from './generated/languageDiarySlides.generated';

export function getLanguageDiarySlideSections(slideIndex: number, accentColor: string): SectionData[] {
  const slide = languageDiarySlides[slideIndex];
  if (!slide) return [];
  return createLanguageDiarySections(accentColor, slide);
}
