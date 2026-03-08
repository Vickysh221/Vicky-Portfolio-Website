import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function getPhoenixKeyPagesSlide01Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'Phoenix AI / Key Pages',
    slideNumber: 1,
  });
}
