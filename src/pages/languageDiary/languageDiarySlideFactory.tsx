import type { ReactNode } from 'react';
import type { SectionData } from '../H5DocContentSlideFactory';
import {
  paragraphStyle,
  h2Style,
  mediaBlockStyle,
  subtitleStyle,
  codeBlockStyle,
  ListItem,
  smallMetaStyle,
  gridListStyle,
  pathLabelStyle,
  kickerStyle,
  documentCardStyle,
  captionStyle,
  infoTagStyle,
  blockLabelStyle,
  metaRailStyle,
  dividerStyle,
} from '../h5Styles';
import type { SyncedDocumentRow, SyncedSlideData } from './generated/languageDiarySlides.generated';

function hasDebugPanel(doc: SyncedDocumentRow, mode: 'thesis' | 'agent' | 'system' | 'memory' | 'governance'): boolean {
  return (mode === 'agent' && !!doc.promptSnippet) || !!doc.technicalPath?.length;
}

function getDocGridClassName(docs: SyncedDocumentRow[], mode: 'thesis' | 'agent' | 'system' | 'memory' | 'governance'): string {
  const hasDebugSurface = docs.some((doc) => hasDebugPanel(doc, mode));
  return hasDebugSurface ? 'doc-grid doc-grid--with-debug' : 'doc-grid';
}

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

function renderExcerpts(excerpts: string[]): ReactNode {
  if (!excerpts.length) return null;
  return (
    <div style={gridListStyle(8)}>
      {excerpts.map((excerpt, index) => (
        <p key={`${index}-${excerpt.slice(0, 24)}`} style={paragraphStyle()}>
          {excerpt}
        </p>
      ))}
    </div>
  );
}

function renderTechnicalPath(accentColor: string, items: string[] | null): ReactNode {
  if (!items?.length) return null;
  return (
    <>
      <div style={infoTagStyle(accentColor, 'tech')}>Technical Path</div>
      <div style={blockLabelStyle()}>Implementation Flow</div>
      <ul style={gridListStyle(6)}>
        {items.map((item) => (
          <ListItem key={item} accent={accentColor}>
            {item}
          </ListItem>
        ))}
      </ul>
    </>
  );
}

function renderPrompt(doc: SyncedDocumentRow, accentColor: string): ReactNode {
  if (!doc.promptSnippet) return null;
  return (
    <>
      <div style={{ marginTop: 12 }}>
        <div style={infoTagStyle(accentColor, 'prompt')}>Prompt Skeleton</div>
      </div>
      <div style={blockLabelStyle()}>Behavior Contract Excerpt</div>
      <pre style={codeBlockStyle()}>{doc.promptSnippet}</pre>
    </>
  );
}

function renderDoc(doc: SyncedDocumentRow, accentColor: string, mode: 'thesis' | 'agent' | 'system' | 'memory' | 'governance'): ReactNode {
  const showDebugPanel = hasDebugPanel(doc, mode);
  const mainContent = (
    <>
      <p style={{ ...paragraphStyle(), marginBottom: 10 }}>{doc.summary}</p>
      {renderExcerpts(doc.excerpts)}
      <div style={{ ...smallMetaStyle(), marginTop: 10 }}>
        {mode === 'agent'
          ? 'Behavior / Product Contract'
          : mode === 'memory'
            ? 'Memory / Regulation Role'
            : mode === 'governance'
              ? 'Governance / Evaluation Focus'
              : 'Key Product / System Points'}
      </div>
      <ul style={gridListStyle(6)}>
        {doc.bullets.map((bullet) => (
          <ListItem key={`${doc.path}-${bullet}`} accent={accentColor}>
            {bullet}
          </ListItem>
        ))}
      </ul>
    </>
  );

  const debugContent = showDebugPanel ? (
    <div className="doc-card-debug">
      {mode === 'agent' ? renderPrompt(doc, accentColor) : null}
      {doc.technicalPath ? <div style={{ marginTop: mode === 'agent' && doc.promptSnippet ? 12 : 0 }}>{renderTechnicalPath(accentColor, doc.technicalPath)}</div> : null}
    </div>
  ) : null;

  return (
    <div key={`${doc.path}-${doc.label}`} style={documentCardStyle()}>
      <div style={smallMetaStyle()}>{doc.label}</div>
      <div style={metaRailStyle()}>
        <div style={infoTagStyle(accentColor, 'source')}>Source Path</div>
        {mode === 'agent' && doc.promptSnippet ? <div style={infoTagStyle(accentColor, 'prompt')}>Prompt Skeleton</div> : null}
        {doc.technicalPath ? <div style={infoTagStyle(accentColor, 'tech')}>Technical Path</div> : null}
      </div>
      <div style={pathLabelStyle()}>{doc.path}</div>
      <div style={dividerStyle()} />
      {showDebugPanel ? (
        <div className="doc-card-layout">
          <div className="doc-card-main">{mainContent}</div>
          {debugContent}
        </div>
      ) : (
        mainContent
      )}
    </div>
  );
}

function renderGenericSection(accentColor: string, heading: string, docs: SyncedDocumentRow[], mode: 'thesis' | 'agent' | 'system' | 'memory' | 'governance'): ReactNode {
  return (
    <>
      <h2 style={subtitleStyle(accentColor)}>{heading}</h2>
      <p style={captionStyle()}>
        This section is synced from product PRD source documents and rendered as a product-technical reading layer rather than a lightweight marketing summary.
      </p>
      <div className={getDocGridClassName(docs, mode)}>{docs.map((doc) => renderDoc(doc, accentColor, mode))}</div>
    </>
  );
}

function renderSlide01(accentColor: string, slide: SyncedSlideData): ReactNode[] {
  const docs = slide.sections.flatMap((section) => section.docs);
  return [
    <div key="intro-block">
      <div style={kickerStyle(accentColor)}>{slide.kicker}</div>
      <p style={paragraphStyle()}>{slide.intro}</p>
    </div>,
    renderHighlights(accentColor, slide.highlights),
    <>
      <h2 style={subtitleStyle(accentColor)}>Product Thesis</h2>
      <div className={getDocGridClassName(docs, 'thesis')}>{docs.map((doc) => renderDoc(doc, accentColor, 'thesis'))}</div>
    </>,
  ];
}

function renderSlide02(accentColor: string, slide: SyncedSlideData): ReactNode[] {
  const blocks: ReactNode[] = [
    <div key="intro-block">
      <div style={kickerStyle(accentColor)}>{slide.kicker}</div>
      <p style={paragraphStyle()}>{slide.intro}</p>
    </div>,
    renderHighlights(accentColor, slide.highlights),
  ];
  slide.sections.forEach((section) => blocks.push(renderGenericSection(accentColor, section.heading, section.docs, 'system')));
  return blocks;
}

function renderSlide03(accentColor: string, slide: SyncedSlideData): ReactNode[] {
  const blocks: ReactNode[] = [
    <div key="intro-block">
      <div style={kickerStyle(accentColor)}>{slide.kicker}</div>
      <p style={paragraphStyle()}>{slide.intro}</p>
    </div>,
    renderHighlights(accentColor, slide.highlights),
  ];
  slide.sections.forEach((section) => blocks.push(renderGenericSection(accentColor, section.heading, section.docs, 'agent')));
  return blocks;
}

function renderSlide04(accentColor: string, slide: SyncedSlideData): ReactNode[] {
  const blocks: ReactNode[] = [
    <div key="intro-block">
      <div style={kickerStyle(accentColor)}>{slide.kicker}</div>
      <p style={paragraphStyle()}>{slide.intro}</p>
    </div>,
    renderHighlights(accentColor, slide.highlights),
  ];
  slide.sections.forEach((section) => blocks.push(renderGenericSection(accentColor, section.heading, section.docs, 'memory')));
  return blocks;
}

function renderSlide05(accentColor: string, slide: SyncedSlideData): ReactNode[] {
  const blocks: ReactNode[] = [
    <div key="intro-block">
      <div style={kickerStyle(accentColor)}>{slide.kicker}</div>
      <p style={paragraphStyle()}>{slide.intro}</p>
    </div>,
    renderHighlights(accentColor, slide.highlights),
  ];
  slide.sections.forEach((section) => blocks.push(renderGenericSection(accentColor, section.heading, section.docs, 'governance')));
  return blocks;
}

function getSlideBlocks(accentColor: string, slide: SyncedSlideData): ReactNode[] {
  switch (slide.numeral) {
    case '01':
      return renderSlide01(accentColor, slide);
    case '02':
      return renderSlide02(accentColor, slide);
    case '03':
      return renderSlide03(accentColor, slide);
    case '04':
      return renderSlide04(accentColor, slide);
    case '05':
      return renderSlide05(accentColor, slide);
    default:
      return renderSlide02(accentColor, slide);
  }
}

export function createLanguageDiarySections(
  accentColor: string,
  slide: SyncedSlideData,
  options?: { displayNumeral?: string },
): SectionData[] {
  const numeral = options?.displayNumeral ?? slide.numeral;
  return [
    {
      id: `language-diary-slide-${numeral}`,
      numeral,
      title: slide.title,
      blocks: getSlideBlocks(accentColor, slide),
    },
  ];
}
