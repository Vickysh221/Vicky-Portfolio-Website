import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function getPersonalLanguageDiarySlide01Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'Personal / Language Diary',
    slideNumber: 1,
  });
}
