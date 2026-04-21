import { useState, type CSSProperties } from 'react';
import type { SectionData } from './H5DocContentSlideFactory';
import {
  blockLabelStyle,
  noteCardStyle,
} from './h5Styles';

function embedFrameStyle(): CSSProperties {
  return {
    width: '100%',
    minHeight: 620,
    height: 'min(76vh, 860px)',
    borderRadius: 14,
    overflow: 'hidden',
    border: '1px solid rgba(200,169,110,0.12)',
    background: '#f3efe9',
  };
}

function ShowcaseEmbedPanel({ accentColor }: { accentColor: string }) {
  const [expanded, setExpanded] = useState(false);
  const src = '/language-diary-ux-showcase/index.html';

  return (
    <>
      <div style={{ ...noteCardStyle(), marginTop: 16, padding: 12 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            marginBottom: 10,
          }}
        >
          <div style={{ ...blockLabelStyle(), color: accentColor, margin: 0 }}>Embedded UX Showcase</div>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            style={{
              borderRadius: 6,
              border: `1px solid ${accentColor}55`,
              background: 'rgba(255,255,255,0.03)',
              color: accentColor,
              cursor: 'pointer',
              padding: '6px 10px',
              fontSize: 12,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            expand
          </button>
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
              background: '#f3efe9',
            }}
          />
        </div>
      </div>
      {expanded ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="language diary ux showcase"
          onClick={() => setExpanded(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(4, 4, 6, 0.82)',
            backdropFilter: 'blur(8px)',
            padding: '28px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: 'min(1680px, 100%)',
              height: 'min(90vh, 1080px)',
              borderRadius: 18,
              overflow: 'hidden',
              border: `1px solid ${accentColor}35`,
              background: '#f3efe9',
              boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
              display: 'grid',
              gridTemplateRows: 'auto 1fr',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderBottom: '1px solid rgba(200,169,110,0.12)',
                background: 'rgba(14, 15, 18, 0.96)',
              }}
            >
              <div style={{ ...blockLabelStyle(), color: accentColor, margin: 0 }}>Language Diary UX Showcase</div>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                style={{
                  borderRadius: 6,
                  border: `1px solid ${accentColor}55`,
                  background: 'rgba(255,255,255,0.03)',
                  color: accentColor,
                  cursor: 'pointer',
                  padding: '6px 10px',
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                close
              </button>
            </div>
            <iframe
              src={src}
              title="language-diary-ux-showcase-expanded"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
                background: '#f3efe9',
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export function getPersonalLanguageDiarySlide03ShowcaseSections(accentColor: string): SectionData[] {
  return [
    {
      id: 'language-diary-ux-showcase',
      numeral: '03',
      title: 'UX Showcase · 从白天捕获到夜间知识梳理',
      blocks: [<ShowcaseEmbedPanel accentColor={accentColor} />],
    },
  ];
}
