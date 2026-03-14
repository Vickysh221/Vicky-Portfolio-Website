import type { ReactNode } from 'react';
import type { SectionData } from '../H5DocContentSlideFactory';
import {
  paragraphStyle,
  h2Style,
  mediaBlockStyle,
  subtitleStyle,
  ListItem,
  smallMetaStyle,
  noteCardStyle,
  gridListStyle,
  pathLabelStyle,
  kickerStyle,
} from '../h5Styles';
import type { SyncedDocumentRow, SyncedSlideData } from './generated/languageDiarySlides.generated';

function renderHighlights(accentColor: string, highlights: SyncedSlideData['highlights']): ReactNode {
  return (
    <>
      <h2 style={h2Style(accentColor)}>Key Signals</h2>
      <div style={mediaBlockStyle()}>
        <ul style={gridListStyle(10)}>
          {highlights.map((item) => (
            <ListItem key={item.label} accent={accentColor}>
              <strong style={{ color: '#d8ccb6' }}>{item.label}:</strong> {item.text}
            </ListItem>
          ))}
        </ul>
      </div>
    </>
  );
}

function renderDoc(doc: SyncedDocumentRow, accentColor: string): ReactNode {
  return (
    <div key={`${doc.path}-${doc.label}`} style={noteCardStyle()}>
      <div style={smallMetaStyle()}>{doc.label}</div>
      <div style={pathLabelStyle()}>{doc.path}</div>
      <p style={{ ...paragraphStyle(), marginBottom: 8 }}>{doc.summary}</p>
      <ul style={gridListStyle(6)}>
        {doc.bullets.map((bullet) => (
          <ListItem key={`${doc.path}-${bullet}`} accent={accentColor}>
            {bullet}
          </ListItem>
        ))}
      </ul>
    </div>
  );
}

function renderSection(accentColor: string, heading: string, docs: SyncedDocumentRow[]): ReactNode {
  return (
    <>
      <h2 style={subtitleStyle(accentColor)}>{heading}</h2>
      <div style={gridListStyle(12)}>{docs.map((doc) => renderDoc(doc, accentColor))}</div>
    </>
  );
}

export function createLanguageDiarySections(accentColor: string, slide: SyncedSlideData): SectionData[] {
  const blocks: ReactNode[] = [
    <div key="intro-block">
      <div style={kickerStyle(accentColor)}>{slide.kicker}</div>
      <p style={paragraphStyle()}>{slide.intro}</p>
    </div>,
    renderHighlights(accentColor, slide.highlights),
  ];

  slide.sections.forEach((section) => {
    blocks.push(renderSection(accentColor, section.heading, section.docs));
  });

  return [
    {
      id: `language-diary-slide-${slide.numeral}`,
      numeral: slide.numeral,
      title: slide.title,
      blocks,
    },
  ];
}
