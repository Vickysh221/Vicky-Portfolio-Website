import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function getUnityCameraSlide03Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'JIDU HMI / Unity3D Camera',
    slideNumber: 3,
  });
}
