import PageTemplate from './PageTemplate';
import { PROJECTS } from '../projectRegistry';

interface ProjectCardProps {
  index: number;
  isActive: boolean;
  onClose: () => void;
}

export default function ProjectCard({ index, isActive, onClose }: ProjectCardProps) {
  const p = PROJECTS[index];
  const isDisabled = !!p.disabled;

  if (!isActive) {
    // Preview mode — shown at 0.25× scale → appears ~205×170px in 3D space
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '40px',
          fontFamily: "'Georgia', 'Times New Roman', serif",
          color: isDisabled ? '#8a7a60' : '#f0e8d8',
          background: 'rgba(14,12,9,0.85)',
          border: `1px solid ${isDisabled ? 'rgba(138,122,96,0.22)' : `${p.color}55`}`,
          boxSizing: 'border-box',
          pointerEvents: 'none',
          opacity: isDisabled ? 0.5 : 1,
          filter: isDisabled ? 'grayscale(0.45)' : 'none',
        }}
      >
        <div style={{ color: isDisabled ? '#7b6a52' : p.color, fontSize: '13px', letterSpacing: '0.25em', marginBottom: '12px' }}>
          {p.id}
        </div>
        <div style={{ fontSize: '38px', fontStyle: 'italic', lineHeight: 1.1, marginBottom: '12px' }}>
          {p.title}
        </div>
        <div style={{ color: '#a09070', fontSize: '14px', marginBottom: '20px' }}>
          {p.subtitle} · {p.year}
        </div>
        <div style={{ width: '36px', height: '1px', background: isDisabled ? '#7b6a52' : p.color, opacity: 0.45, marginBottom: '20px' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {p.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '4px 10px',
                border: `1px solid ${isDisabled ? 'rgba(123,106,82,0.25)' : `${p.color}40`}`,
                color: isDisabled ? '#7b6a52' : p.color,
                fontSize: '12px',
                letterSpacing: '0.05em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (isDisabled) {
    return null;
  }

  // Detail mode — full 820×680px panel
  return <PageTemplate route={p.route} onBackOverride={onClose} onNavigateAway={onClose} />;
}
