import PageTemplate from './PageTemplate';
import { PROJECTS } from '../projectRegistry';

interface ProjectCardProps {
  index: number;
  isActive: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function ProjectCard({ index, isActive, onClose, onOpen }: ProjectCardProps) {
  const p = PROJECTS[index];
  const isDisabled = !!p.disabled;

  if (!isActive) {
    return (
      <div
        onClick={() => {
          if (isDisabled) return;
          onOpen();
        }}
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
          opacity: isDisabled ? 0.5 : 1,
          filter: isDisabled ? 'grayscale(0.45)' : 'none',
          cursor: isDisabled ? 'default' : 'pointer',
        }}
      >
        <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
          <PageTemplate route={p.route} />
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
