import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function getPhoenixSemanticSystemSlide01Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'Phoenix AI / Semantic System',
    slideNumber: 1,
  });
}
