import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function getPersonalLanguageDiarySlide02Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'Personal / Language Diary',
    slideNumber: 2,
  });
}
