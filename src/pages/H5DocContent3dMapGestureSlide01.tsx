import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function get3dMapGestureSlide01Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'JIDU HMI / 3D Map Gesture',
    slideNumber: 1,
  });
}
