import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function getPhoenixComponentFrameworkSlide01Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'Phoenix AI / Component Framework',
    slideNumber: 1,
  });
}
