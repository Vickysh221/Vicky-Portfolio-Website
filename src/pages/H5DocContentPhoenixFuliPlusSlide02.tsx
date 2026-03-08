import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function getPhoenixFuliPlusSlide02Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'Phoenix AI / Fuli Plus',
    slideNumber: 2,
  });
}
