import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function getPhoenixKeyPagesSlide01Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'Web Design Develop / Key Pages',
    slideNumber: 1,
  });
}
