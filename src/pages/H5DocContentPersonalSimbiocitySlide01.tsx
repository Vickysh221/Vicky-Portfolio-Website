import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function getPersonalSimbiocitySlide01Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'Academic Works of Gamification / Simbiocity',
    slideNumber: 1,
  });
}
