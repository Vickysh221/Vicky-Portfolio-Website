import { useState } from 'react';

interface AgentToggleProps {
  enabled: boolean;
  onToggle: (next: boolean) => void;
  count?: number;
}

/**
 * Small inline pill used to hide/show the agent gutter. Sits near the page
 * header; non-critical control, so keep it quiet.
 */
export default function AgentToggle({ enabled, onToggle, count }: AgentToggleProps) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={() => onToggle(!enabled)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title={enabled ? '隐藏 agent 评论' : '显示 agent 评论'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 9px',
        border: `1px solid ${enabled ? 'rgba(139,125,181,0.45)' : 'rgba(200,169,110,0.18)'}`,
        background: enabled
          ? 'rgba(139,125,181,0.10)'
          : hov
          ? 'rgba(200,169,110,0.06)'
          : 'transparent',
        borderRadius: 3,
        color: enabled ? '#b8a9de' : '#8a7a60',
        fontSize: '10px',
        letterSpacing: '0.14em',
        cursor: 'pointer',
        transition: 'all 180ms cubic-bezier(0.16,1,0.3,1)',
        fontFamily: "Georgia, 'Times New Roman', serif",
        pointerEvents: 'auto',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: enabled ? '#b8a9de' : 'rgba(200,169,110,0.4)',
          transition: 'background 180ms',
        }}
      />
      <span>AGENTS</span>
      {typeof count === 'number' && count > 0 && (
        <span style={{ color: enabled ? '#b8a9de' : '#5e5039', opacity: 0.8 }}>
          · {count}
        </span>
      )}
    </button>
  );
}
