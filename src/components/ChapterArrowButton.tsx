import { useState } from 'react';

interface Props {
  direction: 'left' | 'right';
  onClick: () => void;
  visible: boolean;
  accentColor: string;
}

export default function ChapterArrowButton({ direction, onClick, visible, accentColor }: Props) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'absolute',
        top: '50%',
        [direction]: '24px',
        transform: 'translateY(-50%)',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: `1px solid ${hov ? accentColor : 'rgba(200,169,110,0.35)'}`,
        background: hov ? `${accentColor}18` : 'rgba(8,6,4,0.7)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
        zIndex: 10,
        backdropFilter: 'blur(4px)',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 11 11" fill="none">
        <path
          d={direction === 'left' ? 'M9.5 5.5H1.5M5 2.5L1.5 5.5L5 8.5' : 'M1.5 5.5H9.5M6 2.5L9.5 5.5L6 8.5'}
          stroke={hov ? accentColor : 'rgba(200,169,110,0.7)'}
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
