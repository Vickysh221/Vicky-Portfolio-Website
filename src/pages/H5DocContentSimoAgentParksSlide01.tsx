import { createPlaceholderSections, type SectionData } from './H5DocContentSlideFactory';

export function getSimoAgentParksSlide01Sections(accentColor: string): SectionData[] {
  return createPlaceholderSections(accentColor, {
    routeLabel: 'JIDU HMI / SIMO Agent Parks',
    slideNumber: 1,
  });
}
