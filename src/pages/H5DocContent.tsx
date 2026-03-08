import type { CSSProperties } from 'react';
import { getUnitySections } from './H5DocContentUnityCameraSlide01';
import { getUnityChapter2Sections } from './H5DocContentUnityCameraSlide02';
import { getUnityCameraSlide03Sections } from './H5DocContentUnityCameraSlide03';
import { getUnityCameraSlide04Sections } from './H5DocContentUnityCameraSlide04';
import { getUnityCameraSlide05Sections } from './H5DocContentUnityCameraSlide05';
import { get3dMapSlide1Sections } from './H5DocContent3dMapSlide01';
import { get3dMapSlide02Sections } from './H5DocContent3dMapSlide02';
import { get3dMapSlide03Sections } from './H5DocContent3dMapSlide03';
import { get3dMapSlide04Sections } from './H5DocContent3dMapSlide04';
import { get3dMapSlide05Sections } from './H5DocContent3dMapSlide05';
import { getAvpSlide1Sections } from './H5DocContentAvpSlide01';
import { getMinimapCameraSlide01Sections } from './H5DocContentMinimapCameraSlide01';
import { get3dMapGestureSlide01Sections } from './H5DocContent3dMapGestureSlide01';
import { getSimoAgentParksSlide01Sections } from './H5DocContentSimoAgentParksSlide01';
import { getPhoenixOverviewSlide01Sections } from './H5DocContentPhoenixOverviewSlide01';
import { getPhoenixComponentFrameworkSlide01Sections } from './H5DocContentPhoenixComponentFrameworkSlide01';
import { getPhoenixKeyPagesSlide01Sections } from './H5DocContentPhoenixKeyPagesSlide01';
import { getPhoenixSemanticSystemSlide01Sections } from './H5DocContentPhoenixSemanticSystemSlide01';
import { getPhoenixFuliPlusSlide01Sections } from './H5DocContentPhoenixFuliPlusSlide01';
import { getPhoenixFuliPlusSlide02Sections } from './H5DocContentPhoenixFuliPlusSlide02';
import { getPhoenixFuliPlusSlide03Sections } from './H5DocContentPhoenixFuliPlusSlide03';
import { getPersonalSimbiocitySlide01Sections } from './H5DocContentPersonalSimbiocitySlide01';
import { getPersonalFortniteDemoSlide01Sections } from './H5DocContentPersonalFortniteDemoSlide01';
import { getPersonalLanguageDiarySlide01Sections } from './H5DocContentPersonalLanguageDiarySlide01';
import { getPersonalLanguageDiarySlide02Sections } from './H5DocContentPersonalLanguageDiarySlide02';
import { getPersonalLanguageDiarySlide03Sections } from './H5DocContentPersonalLanguageDiarySlide03';
import { getPersonalLanguageDiarySlide04Sections } from './H5DocContentPersonalLanguageDiarySlide04';
import { getPersonalLanguageDiarySlide05Sections } from './H5DocContentPersonalLanguageDiarySlide05';
import type { SectionData } from './H5DocContentSlideFactory';

interface H5DocContentProps {
  route: string;
  accentColor: string;
  slideIndex?: number;
  isMobile?: boolean;
}

function sectionTitleStyle(): CSSProperties {
  return {
    fontSize: '17px',
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

const sectionMap: Record<string, (accentColor: string) => SectionData[]> = {
  '/jidu-hmi/unity3d-camera:0': getUnitySections,
  '/jidu-hmi/unity3d-camera:1': getUnityChapter2Sections,
  '/jidu-hmi/unity3d-camera:2': getUnityCameraSlide03Sections,
  '/jidu-hmi/unity3d-camera:3': getUnityCameraSlide04Sections,
  '/jidu-hmi/unity3d-camera:4': getUnityCameraSlide05Sections,

  '/jidu-hmi/3d-map:0': get3dMapSlide1Sections,
  '/jidu-hmi/3d-map:1': get3dMapSlide02Sections,
  '/jidu-hmi/3d-map:2': get3dMapSlide03Sections,
  '/jidu-hmi/3d-map:3': get3dMapSlide04Sections,
  '/jidu-hmi/3d-map:4': get3dMapSlide05Sections,

  '/jidu-hmi/avp:0': getAvpSlide1Sections,
  '/jidu-hmi/minimap-camera:0': getMinimapCameraSlide01Sections,
  '/jidu-hmi/3d-map-gesture:0': get3dMapGestureSlide01Sections,
  '/jidu-hmi/simo-agent-parks:0': getSimoAgentParksSlide01Sections,

  '/phoenix-ai/overview:0': getPhoenixOverviewSlide01Sections,
  '/phoenix-ai/component-framework:0': getPhoenixComponentFrameworkSlide01Sections,
  '/phoenix-ai/key-pages:0': getPhoenixKeyPagesSlide01Sections,
  '/phoenix-ai/semantic-system:0': getPhoenixSemanticSystemSlide01Sections,
  '/phoenix-ai/fuli-plus:0': getPhoenixFuliPlusSlide01Sections,
  '/phoenix-ai/fuli-plus:1': getPhoenixFuliPlusSlide02Sections,
  '/phoenix-ai/fuli-plus:2': getPhoenixFuliPlusSlide03Sections,

  '/personal/simbiocity:0': getPersonalSimbiocitySlide01Sections,
  '/personal/fortnite-demo:0': getPersonalFortniteDemoSlide01Sections,
  '/personal/language-diary:0': getPersonalLanguageDiarySlide01Sections,
  '/personal/language-diary:1': getPersonalLanguageDiarySlide02Sections,
  '/personal/language-diary:2': getPersonalLanguageDiarySlide03Sections,
  '/personal/language-diary:3': getPersonalLanguageDiarySlide04Sections,
  '/personal/language-diary:4': getPersonalLanguageDiarySlide05Sections,
};

export function hasSectionContent(route: string, slideIndex = 0): boolean {
  return `${route}:${slideIndex}` in sectionMap;
}

function H5Section({ section, accentColor }: { section: SectionData; accentColor: string }) {
  return (
    <section id={section.id} style={{ marginBottom: 26, scrollMarginTop: 12 }}>
      <h1 style={sectionTitleStyle()}>
        <span style={{ color: accentColor, fontSize: '10px', letterSpacing: '0.2em' }}>{section.numeral}</span>
        <span>{section.title}</span>
      </h1>
      {section.blocks.map((block, idx) => (
        <div key={`${section.id}-${idx}`}>{block}</div>
      ))}
    </section>
  );
}

export default function H5DocContent({ route, accentColor, slideIndex = 0, isMobile }: H5DocContentProps) {
  const getter = sectionMap[`${route}:${slideIndex}`];
  if (!getter) return null;

  const sections = getter(accentColor);
  return (
    <div
      style={{ padding: isMobile ? '0 4px 2px' : '0 17px 2px' }}
      className={isMobile ? 'h5-mobile-view' : undefined}
    >
      {sections.map((section) => (
        <H5Section key={section.id} section={section} accentColor={accentColor} />
      ))}
    </div>
  );
}
