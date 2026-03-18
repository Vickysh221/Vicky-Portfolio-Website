import type { SectionData } from '../H5DocContentSlideFactory';
import { createLanguageDiarySections } from './languageDiarySlideFactory';
import { languageDiarySlides } from './generated/languageDiarySlides.generated';
import { getManualLanguageDiaryIntroSlides } from './manualIntroSlides';

export function getLanguageDiarySlideSections(slideIndex: number, accentColor: string): SectionData[] {
  const manualSlides = getManualLanguageDiaryIntroSlides(accentColor);
  if (slideIndex < manualSlides.length) {
    return [manualSlides[slideIndex]];
  }

  const generatedSlide = languageDiarySlides[slideIndex - manualSlides.length];
  if (!generatedSlide) return [];
  return createLanguageDiarySections(accentColor, generatedSlide, {
    displayNumeral: String(slideIndex + 1).padStart(2, '0'),
  });
}
