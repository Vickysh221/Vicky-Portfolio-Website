import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function getPhoenixFuliPlusSlide01Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'Phoenix AI / Fuli Plus',
    slideNumber: 1,
  });
}
