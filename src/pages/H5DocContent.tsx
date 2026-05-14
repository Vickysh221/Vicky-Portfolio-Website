import type { CSSProperties } from 'react';
import { getUnitySections } from './H5DocContentUnityCameraSlide01';
import { getUnityChapter2Sections } from './H5DocContentUnityCameraSlide02';
import { getUnityCameraSlide03Sections } from './H5DocContentUnityCameraSlide03';
import { getUnityCameraSlide04Sections } from './H5DocContentUnityCameraSlide04';
import { get3dMapSlide1Sections } from './H5DocContent3dMapSlide01';
import { get3dMapSlide02Sections } from './H5DocContent3dMapSlide02';
import { get3dMapSlide03Sections } from './H5DocContent3dMapSlide03';
import { get3dMapSlide04Sections } from './H5DocContent3dMapSlide04';
import { getAvpSlide1Sections } from './H5DocContentAvpSlide01';
import { getDashboardLayoutSlide01Sections } from './H5DocContentDashboardLayoutSlide01';
import { getMinimapCameraSlide01Sections } from './H5DocContentMinimapCameraSlide01';
import { get3dMapGestureSlide01Sections } from './H5DocContent3dMapGestureSlide01';
import { getSimoAgentParksSlide00Sections } from './H5DocContentSimoAgentParksSlide00';
import { getSimoAgentParksSlide01Sections } from './H5DocContentSimoAgentParksSlide01';
import { get3dMapDrivingComponentStatesSlide01Sections } from './H5DocContent3dMapDrivingComponentStatesSlide01';
import { get3dMapDrivingComponentStatesSlide02Sections } from './H5DocContent3dMapDrivingComponentStatesSlide02';
import { get3dMapDrivingComponentStatesSlide03Sections } from './H5DocContent3dMapDrivingComponentStatesSlide03';
import { getPhoenixOverviewSlide01Sections } from './H5DocContentPhoenixOverviewSlide01';
import { getPhoenixComponentFrameworkSlide01Sections } from './H5DocContentPhoenixComponentFrameworkSlide01';
import { getPhoenixKeyPagesSlide01Sections } from './H5DocContentPhoenixKeyPagesSlide01';
import { getPhoenixSemanticSystemSlide01Sections } from './H5DocContentPhoenixSemanticSystemSlide01';
import { getPhoenixSemanticSystemSlide02Sections } from './H5DocContentPhoenixSemanticSystemSlide02';
import { getPhoenixSemanticSystemSlide03Sections } from './H5DocContentPhoenixSemanticSystemSlide03';
import { getPhoenixFuliPlusSlide01Sections } from './H5DocContentPhoenixFuliPlusSlide01';
import { getPhoenixFuliPlusSlide02Sections } from './H5DocContentPhoenixFuliPlusSlide02';
import { getPhoenixFuliPlusSlide03Sections } from './H5DocContentPhoenixFuliPlusSlide03';
import { getPhoenixFuliPlusSlide04Sections } from './H5DocContentPhoenixFuliPlusSlide04';
import { getPhoenixFuliPlusSlide05Sections } from './H5DocContentPhoenixFuliPlusSlide05';
import { getPhoenixFuliPlusSlide06Sections } from './H5DocContentPhoenixFuliPlusSlide06';
import { getPhoenixFuliPlusSlide07Sections } from './H5DocContentPhoenixFuliPlusSlide07';
import { getPersonalSimbiocitySlide01Sections } from './H5DocContentPersonalSimbiocitySlide01';
import { getPersonalFortniteDemoSlide01Sections } from './H5DocContentPersonalFortniteDemoSlide01';
import { getPersonalCompanionsSlideSections } from './H5DocContentPersonalCompanions';
import { getMusicPodcastSlide01Sections } from './H5DocContentMusicPodcastSlide01';
import { getMusicPodcastSlide02Sections } from './H5DocContentMusicPodcastSlide02';
import { getPersonalLanguageDiarySlide01Sections } from './H5DocContentPersonalLanguageDiarySlide01';
import { getPersonalLanguageDiarySlide02Sections } from './H5DocContentPersonalLanguageDiarySlide02';
import { getPersonalLanguageDiarySlide03Sections } from './H5DocContentPersonalLanguageDiarySlide03';
import { getPersonalLanguageDiarySlide04Sections } from './H5DocContentPersonalLanguageDiarySlide04';
import { getPersonalLanguageDiarySlide05Sections } from './H5DocContentPersonalLanguageDiarySlide05';
import {
  getAgenticDrivingPersonalizationSlide01Sections,
  getAgenticDrivingPersonalizationSlide02Sections,
  getAgenticDrivingPersonalizationSlide03Sections,
  getAgenticDrivingPersonalizationSlide04Sections,
  getAgenticDrivingPersonalizationSlide05Sections,
  getAgenticDrivingPersonalizationSlide06Sections,
  getAgenticDrivingPersonalizationSlide07Sections,
} from './H5DocContentAgenticDrivingPersonalization';
import {
  getDrivingAuthorityContractsMainSections,
  getDrivingAuthorityContractsUxSubpageSections,
} from './H5DocContentDrivingAuthorityContracts';
import { resolveSectionTitle, type RenderableSectionTitle, type SectionShape } from '../i18n/sectionBuilders.ts';
import { useI18n } from '../i18n/LanguageProvider.tsx';
import AiInteriorSystemCaseStudy, { hasAiInteriorSystemCaseStudy } from './AiInteriorSystemCaseStudy';
import PhoenixKeyPagesDemoSlide, { isPhoenixKeyPagesDemoSlide, PHOENIX_DEMO_IFRAME_URL } from './H5DocContentPhoenixKeyPagesDemoSlide';
import FuliPlusCaseStudy, { hasFuliPlusCaseStudy } from './FuliPlusCaseStudy';
import PersonalOSCaseStudy from './PersonalOSCaseStudy';
import { hasPersonalOsCaseStudy } from './personalOsCaseStudyMeta.ts';
import SharedMemoryAhaCaseStudy from './SharedMemoryAhaCaseStudy';
import { hasSharedMemoryAhaCaseStudy } from './sharedMemoryAhaCaseStudyMeta.ts';

interface H5DocContentProps {
  route: string;
  accentColor: string;
  slideIndex?: number;
  isMobile?: boolean;
  enableNarrativeMotion?: boolean;
  shouldPlayMedia?: boolean;
}

function sectionTitleStyle(): CSSProperties {
  return {
    fontSize: '18px',
    color: '#efe4d0',
    letterSpacing: '0.02em',
    borderBottom: '1px solid rgba(200,169,110,0.16)',
    paddingBottom: '8px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };
}

type RenderableSectionData = SectionShape<RenderableSectionTitle>;

const sectionMap: Record<string, (accentColor: string) => RenderableSectionData[]> = {
  '/jidu-hmi/unity3d-camera:0': getUnitySections,
  '/jidu-hmi/unity3d-camera:1': getUnityChapter2Sections,
  '/jidu-hmi/unity3d-camera:2': getUnityCameraSlide03Sections,
  '/jidu-hmi/unity3d-camera:3': getUnityCameraSlide04Sections,

  '/jidu-hmi/3d-map:0': get3dMapSlide1Sections,
  '/jidu-hmi/3d-map:1': get3dMapSlide02Sections,
  '/jidu-hmi/3d-map:2': get3dMapSlide03Sections,
  '/jidu-hmi/3d-map:3': get3dMapSlide04Sections,

  '/jidu-hmi/avp:0': getAvpSlide1Sections,
  '/jidu-hmi/dashboard-layout:0': getDashboardLayoutSlide01Sections,
  '/jidu-hmi/minimap-camera:0': getMinimapCameraSlide01Sections,
  '/jidu-hmi/3d-map-gesture:0': get3dMapGestureSlide01Sections,
  '/jidu-hmi/3d-map-driving-component-states:0': get3dMapDrivingComponentStatesSlide01Sections,
  '/jidu-hmi/3d-map-driving-component-states:1': get3dMapDrivingComponentStatesSlide02Sections,
  '/jidu-hmi/3d-map-driving-component-states:2': get3dMapDrivingComponentStatesSlide03Sections,
  '/agentic-design-development/simo-agent-system:0': getSimoAgentParksSlide00Sections,
  '/agentic-design-development/simo-agent-system:1': getSimoAgentParksSlide01Sections,

  '/web-design-develop/overview:0': getPhoenixOverviewSlide01Sections,
  '/web-design-develop/component-framework:0': getPhoenixComponentFrameworkSlide01Sections,
  '/web-design-develop/key-pages:1': getPhoenixKeyPagesSlide01Sections,
  '/web-design-develop/semantic-system:0': getPhoenixSemanticSystemSlide01Sections,
  '/web-design-develop/semantic-system:1': getPhoenixSemanticSystemSlide02Sections,
  '/web-design-develop/semantic-system:2': getPhoenixSemanticSystemSlide03Sections,
  '/web-design-develop/fuli-plus:0': getPhoenixFuliPlusSlide01Sections,
  '/web-design-develop/fuli-plus:1': getPhoenixFuliPlusSlide02Sections,
  '/web-design-develop/fuli-plus:2': getPhoenixFuliPlusSlide03Sections,
  '/web-design-develop/fuli-plus:3': getPhoenixFuliPlusSlide04Sections,
  '/web-design-develop/fuli-plus:4': getPhoenixFuliPlusSlide05Sections,
  '/web-design-develop/fuli-plus:5': getPhoenixFuliPlusSlide06Sections,
  '/web-design-develop/fuli-plus:6': getPhoenixFuliPlusSlide07Sections,

  '/agentic-design-development/fuli-plus:0': getPhoenixFuliPlusSlide01Sections,
  '/agentic-design-development/fuli-plus:1': getPhoenixFuliPlusSlide02Sections,
  '/agentic-design-development/fuli-plus:2': getPhoenixFuliPlusSlide03Sections,
  '/agentic-design-development/fuli-plus:3': getPhoenixFuliPlusSlide04Sections,
  '/agentic-design-development/fuli-plus:4': getPhoenixFuliPlusSlide05Sections,
  '/agentic-design-development/fuli-plus:5': getPhoenixFuliPlusSlide06Sections,
  '/agentic-design-development/fuli-plus:6': getPhoenixFuliPlusSlide07Sections,
  '/agentic-design-development/fuli-plus:9': getPhoenixFuliPlusSlide07Sections,

  '/academic-gamification/simbiocity:0': getPersonalSimbiocitySlide01Sections,
  '/academic-gamification/fortnite-demo:0': getPersonalFortniteDemoSlide01Sections,
  '/agentic-design-development/music-podcast:0': getMusicPodcastSlide01Sections,
  '/agentic-design-development/music-podcast:1': getMusicPodcastSlide02Sections,
  '/agentic-design-development/language-diary:0': getPersonalLanguageDiarySlide01Sections,
  '/agentic-design-development/language-diary:1': getPersonalLanguageDiarySlide02Sections,
  '/agentic-design-development/language-diary:2': getPersonalLanguageDiarySlide03Sections,
  '/agentic-design-development/language-diary:3': getPersonalLanguageDiarySlide04Sections,
  '/agentic-design-development/language-diary:4': getPersonalLanguageDiarySlide05Sections,
  '/agentic-design-development/agentic-driving:0': getAgenticDrivingPersonalizationSlide01Sections,
  '/agentic-design-development/agentic-driving:1': getAgenticDrivingPersonalizationSlide02Sections,
  '/agentic-design-development/agentic-driving:2': getAgenticDrivingPersonalizationSlide03Sections,
  '/agentic-design-development/agentic-driving:3': getAgenticDrivingPersonalizationSlide04Sections,
  '/agentic-design-development/agentic-driving:4': getAgenticDrivingPersonalizationSlide05Sections,
  '/agentic-design-development/agentic-driving:5': getAgenticDrivingPersonalizationSlide06Sections,
  '/agentic-design-development/agentic-driving:6': getAgenticDrivingPersonalizationSlide07Sections,
  '/agentic-design-development/driving-authority-contracts/main:0': getDrivingAuthorityContractsMainSections,
  '/agentic-design-development/driving-authority-contracts/ux-case-example:0': getDrivingAuthorityContractsUxSubpageSections,
};

export function hasSectionContent(route: string, slideIndex = 0): boolean {
  if (isPhoenixKeyPagesDemoSlide(route, slideIndex)) return true;
  if (hasPersonalOsCaseStudy(route, slideIndex)) return true;
  if (hasSharedMemoryAhaCaseStudy(route, slideIndex)) return true;
  if (hasAiInteriorSystemCaseStudy(route, slideIndex)) return true;
  if (hasFuliPlusCaseStudy(route, slideIndex)) return true;
  if (route === '/academic-gamification/companions' && slideIndex >= 0 && slideIndex < 2) return true;
  return `${route}:${slideIndex}` in sectionMap;
}

export function isAutoExpandSlide(route: string, slideIndex: number): boolean {
  return isPhoenixKeyPagesDemoSlide(route, slideIndex);
}

export function getAutoExpandIframeUrl(route: string, slideIndex: number): string | null {
  if (isPhoenixKeyPagesDemoSlide(route, slideIndex)) return PHOENIX_DEMO_IFRAME_URL;
  return null;
}

function H5Section({ section, accentColor }: { section: RenderableSectionData; accentColor: string }) {
  const { text } = useI18n();
  const title = resolveSectionTitle(section.title, text);

  return (
    <section id={section.id} style={{ marginBottom: 26, scrollMarginTop: 12 }}>
      <h1 style={sectionTitleStyle()}>
        <span style={{ color: accentColor, fontSize: '12px', letterSpacing: '0.2em' }}>{section.numeral}</span>
        <span>{title}</span>
      </h1>
      {section.blocks.map((block, idx) => (
        <div key={`${section.id}-${idx}`}>{block}</div>
      ))}
    </section>
  );
}

export default function H5DocContent({
  route,
  accentColor,
  slideIndex = 0,
  isMobile,
  enableNarrativeMotion,
  shouldPlayMedia,
}: H5DocContentProps) {
  if (isPhoenixKeyPagesDemoSlide(route, slideIndex)) {
    return <PhoenixKeyPagesDemoSlide accentColor={accentColor} />;
  }

  if (hasPersonalOsCaseStudy(route, slideIndex)) {
    return (
      <PersonalOSCaseStudy
        route={route}
        accentColor={accentColor}
        slideIndex={slideIndex}
        isMobile={isMobile}
        enableMotion={enableNarrativeMotion}
      />
    );
  }

  if (hasSharedMemoryAhaCaseStudy(route, slideIndex)) {
    return (
      <SharedMemoryAhaCaseStudy
        route={route}
        accentColor={accentColor}
        slideIndex={slideIndex}
        isMobile={isMobile}
        enableMotion={enableNarrativeMotion}
      />
    );
  }

  if (hasAiInteriorSystemCaseStudy(route, slideIndex)) {
    return (
      <AiInteriorSystemCaseStudy
        route={route}
        accentColor={accentColor}
        slideIndex={slideIndex}
        isMobile={isMobile}
        enableMotion={enableNarrativeMotion}
      />
    );
  }

  if (hasFuliPlusCaseStudy(route, slideIndex)) {
    return (
      <FuliPlusCaseStudy
        route={route}
        accentColor={accentColor}
        slideIndex={slideIndex}
        isMobile={isMobile}
        enableMotion={enableNarrativeMotion}
      />
    );
  }

  if (route === '/academic-gamification/companions') {
    const sections = getPersonalCompanionsSlideSections(slideIndex, shouldPlayMedia ?? false);
    return (
      <div style={{ padding: isMobile ? '0 4px 2px' : '0 17px 2px' }} className={isMobile ? 'h5-mobile-view' : undefined}>
        {sections.map((section) => (
          <H5Section key={section.id} section={section} accentColor={accentColor} />
        ))}
      </div>
    );
  }

  const getter = sectionMap[`${route}:${slideIndex}`];
  if (!getter) return null;

  const sections = getter(accentColor);
  return (
    <div style={{ padding: isMobile ? '0 4px 2px' : '0 17px 2px' }} className={isMobile ? 'h5-mobile-view' : undefined}>
      {sections.map((section) => (
        <H5Section key={section.id} section={section} accentColor={accentColor} />
      ))}
    </div>
  );
}
