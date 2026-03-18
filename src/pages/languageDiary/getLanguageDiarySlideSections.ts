import type { SectionData } from '../H5DocContentSlideFactory';
import { createLanguageDiarySections } from './languageDiarySlideFactory';
import { languageDiarySlides } from './generated/languageDiarySlides.generated';
import { getManualLanguageDiaryIntroSlides } from './manualIntroSlides';

export function getLanguageDiarySlideSections(slideIndex: number, accentColor: string, sourceSlideIndex = slideIndex): SectionData[] {
  const manualSlides = getManualLanguageDiaryIntroSlides(accentColor);
  if (sourceSlideIndex < manualSlides.length) {
    return [manualSlides[sourceSlideIndex]];
  }

  const generatedSlide = languageDiarySlides[sourceSlideIndex - manualSlides.length];
  if (!generatedSlide) return [];
  return createLanguageDiarySections(accentColor, generatedSlide, {
    displayNumeral: String(slideIndex + 1).padStart(2, '0'),
  });
}
