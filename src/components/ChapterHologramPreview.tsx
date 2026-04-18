import { useEffect, useMemo, useRef, useState } from 'react';
import type { HoveredChapter } from '../hooks/useChapterHover';
import type { SubPagePreviewMedia } from '../projectRegistry';
import { computePointerPlacement } from './chapterPreviewPlacement';

interface ChapterHologramPreviewProps {
  chapter: HoveredChapter | null;
  previewMedia: SubPagePreviewMedia | null;
}

const CARD_WIDTH = 300;
const CARD_HEIGHT = 190;
const GAP_FROM_ANCHOR = 20;
const VIEWPORT_MARGIN = 16;

type Placement = {
  left: number;
  top: number;
  flippedX: boolean;
  flippedY: boolean;
};

function computePlacement(pointerX: number, pointerY: number): Placement {
  return computePointerPlacement({
    pointerX,
    pointerY,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    cardWidth: CARD_WIDTH,
    cardHeight: CARD_HEIGHT,
    gap: GAP_FROM_ANCHOR,
    margin: VIEWPORT_MARGIN,
  });
}

function hexWithAlpha(hex: string, alpha: number): string {
  const cleaned = hex.replace('#', '');
  const full = cleaned.length === 3
    ? cleaned.split('').map((c) => c + c).join('')
    : cleaned;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function ChapterHologramPreview({
  chapter,
  previewMedia,
}: ChapterHologramPreviewProps) {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState<Placement | null>(null);
  const lastRouteRef = useRef<string | null>(null);
  const [crossfadeKey, setCrossfadeKey] = useState(0);

  // Drive placement + visibility off the chapter snapshot.
  useEffect(() => {
    if (!chapter) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      lastRouteRef.current = null;
      return;
    }
    setPlacement(computePlacement(chapter.pointerX, chapter.pointerY));
    if (lastRouteRef.current !== chapter.route) {
      lastRouteRef.current = chapter.route;
      setCrossfadeKey((k) => k + 1);
    }
    // Next tick so the initial transform applies.
    const id = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(id);
  }, [chapter]);

  const accent = chapter?.projectColor ?? '#c8a96e';
  const glow = useMemo(() => hexWithAlpha(accent, 0.35), [accent]);
  const glowSoft = useMemo(() => hexWithAlpha(accent, 0.12), [accent]);

  if (!chapter || !placement) return null;

  const enterTransform = visible
    ? 'perspective(900px) rotateX(0deg) translateY(0) scale(1)'
    : 'perspective(900px) rotateX(12deg) translateY(8px) scale(0.94)';

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        left: placement.left,
        top: placement.top,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        zIndex: 60,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transform: enterTransform,
        transformOrigin: `${placement.flippedX ? '100%' : '0%'} ${placement.flippedY ? '100%' : '0%'}`,
        transition:
          'opacity 320ms cubic-bezier(0.16,1,0.3,1), transform 320ms cubic-bezier(0.16,1,0.3,1), left 220ms cubic-bezier(0.16,1,0.3,1), top 220ms cubic-bezier(0.16,1,0.3,1)',
        filter: `drop-shadow(0 18px 42px ${hexWithAlpha(accent, 0.22)})`,
      }}
    >
      {/* Hologram projector base — soft elliptical glow beneath the card */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: -16,
          width: CARD_WIDTH - 20,
          height: 26,
          transform: 'translateX(-50%)',
          background: `radial-gradient(ellipse at 50% 0%, ${glow} 0%, ${glowSoft} 35%, transparent 70%)`,
          filter: 'blur(2px)',
          opacity: 0.9,
        }}
      />

      {/* Card frame */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(8,6,4,0.78)',
          border: `1px solid ${hexWithAlpha(accent, 0.28)}`,
          boxShadow: `0 0 24px ${hexWithAlpha(accent, 0.18)}, inset 0 0 32px rgba(0,0,0,0.55)`,
          overflow: 'hidden',
          backdropFilter: 'blur(3px)',
        }}
      >
        {/* Top info bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 10px',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.55), transparent)',
            color: accent,
            fontFamily: "'SF Mono', 'JetBrains Mono', 'Menlo', monospace",
            fontSize: 8.5,
            letterSpacing: '0.18em',
            zIndex: 3,
            textTransform: 'uppercase',
          }}
        >
          <span>
            PREVIEW · {String(chapter.chapterIndex + 1).padStart(2, '0')}/
            {String(chapter.chapterTotal).padStart(2, '0')}
          </span>
          <span style={{ color: hexWithAlpha(accent, 0.65) }}>HOLO-FEED</span>
        </div>

        {/* Media layer — crossfaded by key so switching chapters re-mounts */}
        <div
          key={crossfadeKey}
          style={{
            position: 'absolute',
            inset: 0,
            animation: 'chapter-holo-scanin 520ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {previewMedia?.type === 'video' ? (
            <video
              src={previewMedia.src}
              poster={previewMedia.poster}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'saturate(0.9) contrast(1.05)',
              }}
            />
          ) : previewMedia ? (
            <img
              src={previewMedia.src}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'saturate(0.9) contrast(1.05)',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, ${hexWithAlpha(accent, 0.14)}, rgba(0,0,0,0.6))`,
              }}
            />
          )}
        </div>

        {/* Scanline sweep */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `linear-gradient(180deg, transparent 0%, ${hexWithAlpha(accent, 0.55)} 50%, transparent 100%)`,
            height: 3,
            opacity: 0.55,
            mixBlendMode: 'screen',
            animation: 'chapter-holo-scanline 3s linear infinite',
            filter: `blur(1px)`,
            zIndex: 4,
          }}
        />

        {/* Horizontal interlace overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)',
            mixBlendMode: 'overlay',
            zIndex: 5,
          }}
        />

        {/* Subtle chromatic aberration — static offset, not flicker */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            boxShadow:
              'inset 1px 0 0 rgba(0,180,255,0.08), inset -1px 0 0 rgba(255,80,80,0.08)',
            zIndex: 5,
          }}
        />

        {/* Bottom caption bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: '8px 10px 9px',
            background:
              'linear-gradient(0deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)',
            color: '#e8dcb8',
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: 10.5,
            lineHeight: 1.35,
            zIndex: 6,
            display: 'flex',
            alignItems: 'baseline',
            gap: 8,
          }}
        >
          <span
            style={{
              color: accent,
              fontStyle: 'italic',
              fontSize: 11,
              flexShrink: 0,
            }}
          >
            {chapter.numeral}
          </span>
          <span
            style={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              letterSpacing: '0.02em',
            }}
          >
            {chapter.label}
          </span>
        </div>

        {/* Breathing opacity overlay — very gentle */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: hexWithAlpha(accent, 0.05),
            mixBlendMode: 'screen',
            animation: 'chapter-holo-breath 3.4s ease-in-out infinite',
            zIndex: 7,
          }}
        />

        {/* Four corner brackets */}
        {([
          { top: 4, left: 4, borderTop: `1px solid ${accent}`, borderLeft: `1px solid ${accent}` },
          { top: 4, right: 4, borderTop: `1px solid ${accent}`, borderRight: `1px solid ${accent}` },
          { bottom: 4, left: 4, borderBottom: `1px solid ${accent}`, borderLeft: `1px solid ${accent}` },
          { bottom: 4, right: 4, borderBottom: `1px solid ${accent}`, borderRight: `1px solid ${accent}` },
        ] as const).map((style, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 8,
              height: 8,
              opacity: 0.85,
              zIndex: 8,
              ...style,
            }}
          />
        ))}
      </div>
    </div>
  );
}
