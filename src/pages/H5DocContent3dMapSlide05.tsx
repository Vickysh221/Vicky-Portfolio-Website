import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function get3dMapSlide05Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'JIDU HMI / 3D Map',
    slideNumber: 5,
  });
}
