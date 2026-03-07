import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGE_META } from '../constants/routeDepth';
import H5DocContent from './H5DocContent';

interface Props {
  route: string;
  accentColor: string;
  count: number;
}

const cornerStyles: React.CSSProperties[] = [
  { top: '-1px', left: '-1px', borderTop: '8px solid #c8a96e', borderLeft: '8px solid #c8a96e' },
  { top: '-1px', right: '-1px', borderTop: '8px solid #c8a96e', borderRight: '8px solid #c8a96e' },
  { bottom: '-1px', left: '-1px', borderBottom: '8px solid #c8a96e', borderLeft: '8px solid #c8a96e' },
  { bottom: '-1px', right: '-1px', borderBottom: '8px solid #c8a96e', borderRight: '8px solid #c8a96e' },
];

function BackButton({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px 0',
        color: hov ? '#c8a96e' : 'rgba(200,169,110,0.45)',
        fontSize: '9px',
        letterSpacing: '0.2em',
        transition: 'color 0.25s',
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 11 11"
        fill="none"
        style={{
          transform: hov ? 'translateX(-2px)' : 'translateX(0)',
          transition: 'transform 0.25s',
        }}
      >
        <path
          d="M9.5 5.5H1.5M5 2.5L1.5 5.5L5 8.5"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      BACK
    </button>
  );
}

function ArrowButton({
  direction,
  onClick,
  visible,
  accentColor,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  visible: boolean;
  accentColor: string;
}) {
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

function SlideContent({
  route,
  slideIndex,
  totalSlides,
  accentColor,
  isActive,
  onBack,
}: {
  route: string;
  slideIndex: number;
  totalSlides: number;
  accentColor: string;
  isActive: boolean;
  onBack: () => void;
}) {
  const meta = PAGE_META[route];
  if (!meta) return null;

  // Roman numerals for slide indicator
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  const slideLabel = `${romanNumerals[slideIndex] ?? slideIndex + 1} · ${romanNumerals[totalSlides - 1] ?? totalSlides}`;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'rgba(8,6,4,0.96)',
        border: `1px solid rgba(200,169,110,${isActive ? '0.28' : '0.14'})`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "Georgia, 'Times New Roman', serif",
        overflow: 'hidden',
        transition: 'border-color 0.4s',
      }}
    >
      {/* Corner decorations */}
      {cornerStyles.map((cs, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 10,
            height: 10,
            opacity: isActive ? 0.65 : 0.25,
            transition: 'opacity 0.4s',
            ...cs,
          }}
        />
      ))}

      {/* Header */}
      <div
        style={{
          padding: '22px 28px 16px',
          borderBottom: '1px solid rgba(200,169,110,0.08)',
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <BackButton onClick={onBack} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <div
            style={{
              color: 'rgba(200,169,110,0.28)',
              fontSize: '9px',
              letterSpacing: '0.25em',
            }}
          >
            CHAPTER
          </div>
          <div
            style={{
              color: accentColor,
              fontSize: '9px',
              letterSpacing: '0.2em',
              opacity: 0.7,
              fontStyle: 'italic',
            }}
          >
            {slideLabel}
          </div>
        </div>
      </div>

      {/* Title block */}
      <div style={{ padding: '24px 28px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: accentColor,
              flexShrink: 0,
              opacity: 0.8,
            }}
          />
          <div
            style={{
              color: '#f0e8d8',
              fontSize: '22px',
              fontStyle: 'italic',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            {meta.title}
          </div>
        </div>
        <div style={{ color: '#6a5a40', fontSize: '10px', letterSpacing: '0.12em', paddingLeft: '17px' }}>
          {meta.subtitle} · {meta.year}
        </div>

        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(200,169,110,0.1)',
            margin: '16px 0',
          }}
        />

        <p style={{ color: '#a09070', fontSize: '12px', lineHeight: 1.8, paddingLeft: '17px' }}>
          {meta.desc}
        </p>
      </div>

      {/* Content area */}
      <div
        style={{ flex: 1, padding: '0 28px 24px', overflow: 'auto' }}
        className="panel-scroll"
      >
        {slideIndex === 0 ? (
          <H5DocContent route={route} accentColor={accentColor} />
        ) : (
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            {/* Decorative top line */}
            <div
              style={{
                width: '60px',
                height: '1px',
                background: `linear-gradient(to right, transparent, ${accentColor}60, transparent)`,
              }}
            />
            <div
              style={{
                color: accentColor,
                fontSize: '9px',
                letterSpacing: '0.35em',
                opacity: 0.5,
              }}
            >
              SECTION {slideIndex + 1}
            </div>
            <div
              style={{
                border: `1px dashed rgba(200,169,110,0.12)`,
                padding: '32px 40px',
                textAlign: 'center',
                maxWidth: '340px',
              }}
            >
              <div
                style={{
                  color: 'rgba(200,169,110,0.2)',
                  fontSize: '9px',
                  letterSpacing: '0.3em',
                  marginBottom: '12px',
                }}
              >
                CONTENT
              </div>
              <div style={{ color: '#4a3a28', fontSize: '12px', lineHeight: 1.7 }}>
                Case study content coming soon.
                <br />
                <span style={{ fontSize: '10px', opacity: 0.6 }}>
                  Contact me for a detailed walkthrough.
                </span>
              </div>
            </div>
            {/* Decorative bottom line */}
            <div
              style={{
                width: '60px',
                height: '1px',
                background: `linear-gradient(to right, transparent, ${accentColor}60, transparent)`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function SubPageCarousel({ route, accentColor, count }: Props) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const meta = PAGE_META[route];

  useEffect(() => {
    // Trigger entry animation after one tick
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(count - 1, i + 1));
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [count]);

  const handleBack = () => {
    if (meta?.parent) {
      navigate(meta.parent);
    } else {
      navigate('/');
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      {/* 3D track */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
        }}
      >
        {Array.from({ length: count }, (_, i) => {
          const offset = i - activeIndex;
          const tx = offset * 860;
          const tz = -Math.abs(offset) * 300;
          const ry = -offset * 25;
          const op = mounted ? Math.max(0.15, 1 - Math.abs(offset) * 0.35) : 0;
          const isActive = i === activeIndex;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          return (
            <div
              key={i}
              onClick={isActive ? undefined : () => setActiveIndex(i)}
              style={{
                position: 'absolute',
                left: 'calc(50% - 410px)',
                top: 'calc(50% - 340px)',
                width: '820px',
                height: '680px',
                transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg)`,
                opacity: op,
                transition: mounted ? 'transform 0.65s cubic-bezier(0.16,1,0.3,1), opacity 0.65s cubic-bezier(0.16,1,0.3,1)' : 'none',
                cursor: isActive ? 'default' : 'pointer',
                pointerEvents: 'auto',
                // Entry animation for active panel
                animation: mounted && isActive && i === 0 ? 'carouselPanelEnter 0.7s cubic-bezier(0.16,1,0.3,1) forwards' : undefined,
              }}
            >
              <SlideContent
                route={route}
                slideIndex={i}
                totalSlides={count}
                accentColor={accentColor}
                isActive={isActive}
                onBack={handleBack}
              />
            </div>
          );
        })}
      </div>

      {/* Nav arrows */}
      <ArrowButton
        direction="left"
        onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
        visible={activeIndex > 0}
        accentColor={accentColor}
      />
      <ArrowButton
        direction="right"
        onClick={() => setActiveIndex((i) => Math.min(count - 1, i + 1))}
        visible={activeIndex < count - 1}
        accentColor={accentColor}
      />

      {/* Dot indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          pointerEvents: 'auto',
        }}
      >
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              background: i === activeIndex ? accentColor : 'rgba(200,169,110,0.2)',
              transition: 'background 0.3s, transform 0.3s',
              transform: i === activeIndex ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
