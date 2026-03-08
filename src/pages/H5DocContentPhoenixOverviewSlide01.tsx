import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function getPhoenixOverviewSlide01Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'Phoenix AI / Overview',
    slideNumber: 1,
  });
}
