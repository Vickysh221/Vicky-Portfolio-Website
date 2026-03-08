import type { CSSProperties, ReactNode } from 'react';

export interface SectionData {
  id: string;
  numeral: string;
  title: string;
  blocks: ReactNode[];
}

function paragraphStyle(): CSSProperties {
  return {
    color: '#a99679',
    fontSize: '12px',
    lineHeight: 1.9,
    margin: '0 0 10px',
  };
}

function markerStyle(accentColor: string): CSSProperties {
  return {
    width: 3,
    height: 12,
    borderRadius: 2,
    background: accentColor,
    opacity: 0.9,
    display: 'inline-block',
  };
}

export function createPlaceholderSections(
  accentColor: string,
  options: { routeLabel: string; slideNumber: number; notes?: string[] },
): SectionData[] {
  const numeral = String(options.slideNumber).padStart(2, '0');
  const notes = options.notes ?? [
    'This slide is reserved for structured project documentation.',
    'Use this page to add key visuals, system decisions, and measurable outcomes.',
  ];

  return [
    {
      id: `slide-${numeral}`,
      numeral,
      title: `${options.routeLabel} · Slide ${numeral}`,
      blocks: [
        <>
          <p style={paragraphStyle()}>
            <span style={markerStyle(accentColor)} />
            <span style={{ marginLeft: 8 }}>Content scaffold for {options.routeLabel}.</span>
          </p>
          <ul style={{ margin: '8px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {notes.map((note) => (
              <li key={note} style={{ color: '#a99679', fontSize: '12px', lineHeight: 1.8, display: 'flex', gap: 8 }}>
                <span style={{ color: accentColor }}>—</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </>,
      ],
    },
  ];
}
