import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function getMinimapCameraSlide01Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'JIDU HMI / Minimap Camera',
    slideNumber: 1,
  });
}
