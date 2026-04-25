import type { CSSProperties } from 'react';
import type { SectionData } from './H5DocContentSlideFactory';
import {
  blockLabelStyle,
  noteCardStyle,
} from './h5Styles';

function embedFrameStyle(): CSSProperties {
  return {
    width: '100%',
    minHeight: 720,
    height: 'min(82vh, 960px)',
    borderRadius: 14,
    overflow: 'hidden',
    border: '1px solid rgba(200,169,110,0.12)',
    background: '#000',
  };
}

function ShowcaseEmbedPanel({ accentColor }: { accentColor: string }) {
  const src = '/language-diary-ux-showcase/agentic-canvas-v1.html';

  return (
    <div style={{ ...noteCardStyle(), marginTop: 16, padding: 12, background: 'rgba(0,0,0,0.28)' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          marginBottom: 10,
        }}
      >
        <div style={{ ...blockLabelStyle(), color: accentColor, margin: 0 }}>Embedded UX Showcase · v1 Archive</div>
      </div>
      <div style={embedFrameStyle()}>
        <iframe
          src={src}
          title="language-diary-ux-showcase"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
            background: '#000',
          }}
        />
      </div>
    </div>
  );
}

export function getPersonalLanguageDiarySlide03ShowcaseSections(accentColor: string): SectionData[] {
  return [
    {
      id: 'language-diary-ux-showcase',
      numeral: '03',
      title: 'UX Showcase · Language Diary Agentic Canvas v1',
      blocks: [<ShowcaseEmbedPanel accentColor={accentColor} />],
    },
  ];
}
