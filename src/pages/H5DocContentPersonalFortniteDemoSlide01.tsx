import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function getPersonalFortniteDemoSlide01Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'Personal / Fortnite Demo',
    slideNumber: 1,
  });
}
