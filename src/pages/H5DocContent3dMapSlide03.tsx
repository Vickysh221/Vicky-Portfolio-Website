import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function get3dMapSlide03Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'JIDU HMI / 3D Map',
    slideNumber: 3,
  });
}
