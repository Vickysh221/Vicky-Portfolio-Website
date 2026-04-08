import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import ChapterArrowButton from '../components/ChapterArrowButton';
import { getAdjacentChapterSlideTarget } from '../constants/chapterNavigation';
import { PAGE_META } from '../constants/routeDepth';
import H5DocContent, { hasSectionContent } from './H5DocContent';
import { useIsMobile } from '../hooks/useIsMobile';
import { useFullscreenHint } from '../hooks/useFullscreenHint';

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

const expandedViewportPadding = 'clamp(24px, 4vw, 56px)';
const expandedContentFrameStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  margin: '0 auto',
};
const readingColumnStyle: React.CSSProperties = {
  width: 'min(860px, 100%)',
  margin: '0 auto',
};

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

function ExpandButton({
  onClick,
  accentColor,
  showHint,
}: {
  onClick: () => void;
  accentColor: string;
  showHint?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        title="Expand fullscreen"
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '3px',
          border: `1px solid ${hov ? accentColor : 'rgba(200,169,110,0.2)'}`,
          background: hov ? `${accentColor}18` : 'transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
          flexShrink: 0,
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M1 3.5V1H3.5M6.5 1H9V3.5M9 6.5V9H6.5M3.5 9H1V6.5"
            stroke={hov ? accentColor : 'rgba(200,169,110,0.5)'}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {showHint && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '156px',
            padding: '8px 10px',
            borderRadius: '6px',
            border: `1px solid ${accentColor}55`,
            background: 'rgba(8,6,4,0.94)',
            color: '#d8ccb7',
            fontSize: '11px',
            lineHeight: 1.5,
            letterSpacing: '0.04em',
            boxShadow: '0 10px 30px rgba(0,0,0,0.28)',
            backdropFilter: 'blur(6px)',
            zIndex: 20,
          }}
        >
          点击这里可进入全屏查看
        </div>
      )}
    </div>
  );
}

function CollapseButton({ onClick, accentColor }: { onClick: () => void; accentColor: string }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title="Exit fullscreen"
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '4px',
        border: `1px solid ${hov ? accentColor : 'rgba(200,169,110,0.25)'}`,
        background: hov ? `${accentColor}18` : 'rgba(8,6,4,0.7)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        flexShrink: 0,
        backdropFilter: 'blur(4px)',
      }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M3.5 1V3.5H1M9 3.5H6.5V1M6.5 9V6.5H9M1 6.5H3.5V9"
          stroke={hov ? accentColor : 'rgba(200,169,110,0.6)'}
          strokeWidth="1"
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
  onExpand,
  onExpandWithHint,
  isExpanded,
  isMobile,
  showExpandHint,
}: {
  route: string;
  slideIndex: number;
  totalSlides: number;
  accentColor: string;
  isActive: boolean;
  onBack: () => void;
  onExpand?: () => void;
  onExpandWithHint?: () => void;
  isExpanded?: boolean;
  isMobile?: boolean;
  showExpandHint?: boolean;
}) {
  const meta = PAGE_META[route];
  const rootScrollRef = useRef<HTMLDivElement>(null);
  if (!meta) return null;

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  const slideLabel = `${romanNumerals[slideIndex] ?? slideIndex + 1} · ${romanNumerals[totalSlides - 1] ?? totalSlides}`;
  const isReadingMode = !!isExpanded && !isMobile;
  const shouldScrollTitleBlock = !!isExpanded;

  useEffect(() => {
    if (!isReadingMode) return;
    rootScrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [isReadingMode, slideIndex]);

  const titleBlock = (
    <div
      style={{
        ...(isReadingMode ? readingColumnStyle : null),
        padding: isReadingMode ? '0 0 28px' : isMobile ? '16px 20px 14px' : '24px 28px 20px',
        flexShrink: 0,
      }}
    >
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
            fontSize: isReadingMode ? 'clamp(28px, 3vw, 42px)' : isMobile ? '18px' : '22px',
            fontStyle: 'italic',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
          }}
        >
          {meta.title}
        </div>
      </div>
      <div
        style={{
          color: '#6a5a40',
          fontSize: isReadingMode ? '11px' : '10px',
          letterSpacing: '0.12em',
          paddingLeft: '17px',
        }}
      >
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

      <p
        style={{
          color: '#a09070',
          fontSize: isReadingMode ? '16px' : isMobile ? '13px' : '12px',
          lineHeight: isReadingMode ? 1.95 : 1.8,
          paddingLeft: '17px',
          maxWidth: isReadingMode ? '48em' : undefined,
        }}
      >
        {meta.desc}
      </p>
    </div>
  );

  return (
    <div
      ref={rootScrollRef}
      className={isReadingMode ? 'portfolio-scroll' : undefined}
      style={{
        width: '100%',
        height: '100%',
        background: isReadingMode ? 'transparent' : 'rgba(8,6,4,0.96)',
        border: isReadingMode ? 'none' : `1px solid rgba(200,169,110,${isActive ? '0.28' : '0.14'})`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "Georgia, 'Times New Roman', serif",
        overflow: isReadingMode ? 'auto' : 'hidden',
        transition: 'border-color 0.4s',
      }}
    >
      {/* Corner decorations */}
      {!isReadingMode && cornerStyles.map((cs, i) => (
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
          padding: isMobile ? '16px 20px 12px' : '22px 28px 16px',
          borderBottom: '1px solid rgba(200,169,110,0.08)',
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={isReadingMode ? readingColumnStyle : { width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
              <BackButton onClick={onBack} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
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
            {/* Expand button: PC only, not in expanded state */}
            {!isMobile && !isExpanded && onExpand && (
              <ExpandButton
                onClick={onExpandWithHint ?? onExpand}
                accentColor={accentColor}
                showHint={showExpandHint}
              />
            )}
          </div>
        </div>
      </div>

      {!shouldScrollTitleBlock && titleBlock}

      {/* Content area */}
      <div
        style={{
          flex: 1,
          padding: isReadingMode ? '0 0 56px' : isMobile ? '0 20px 20px' : '0 28px 24px',
          overflow: isReadingMode ? 'visible' : 'auto',
          ...(isReadingMode ? readingColumnStyle : null),
        }}
        className={isReadingMode ? 'panel-scroll portfolio-scroll h5-reading-view' : 'panel-scroll portfolio-scroll'}
      >
        {shouldScrollTitleBlock && titleBlock}
        {hasSectionContent(route, slideIndex) ? (
          <H5DocContent
            route={route}
            accentColor={accentColor}
            slideIndex={slideIndex}
            isMobile={isMobile}
            enableNarrativeMotion={isReadingMode && isActive}
            shouldPlayMedia={isActive && !isExpanded}
          />
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
  const location = useLocation();
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isVisible: showFullscreenHint, dismissForever } = useFullscreenHint(!isMobile && !isExpanded);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const meta = PAGE_META[route];
  const prevTarget = getAdjacentChapterSlideTarget(route, activeIndex, 'prev');
  const nextTarget = getAdjacentChapterSlideTarget(route, activeIndex, 'next');

  const goToTarget = (target: { route: string; slideIndex: number } | null) => {
    if (!target) return;
    if (target.route === route) {
      setActiveIndex(target.slideIndex);
      return;
    }
    navigate(target.route, { state: { initialSlideIndex: target.slideIndex } });
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const initialSlideIndex =
      typeof location.state === 'object' && location.state && 'initialSlideIndex' in location.state
        ? location.state.initialSlideIndex
        : 0;

    const nextIndex =
      typeof initialSlideIndex === 'number' && Number.isFinite(initialSlideIndex)
        ? Math.min(Math.max(initialSlideIndex, 0), count - 1)
        : 0;

    setActiveIndex(nextIndex);
  }, [count, location.state, route]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToTarget(getAdjacentChapterSlideTarget(route, activeIndex, 'prev'));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToTarget(getAdjacentChapterSlideTarget(route, activeIndex, 'next'));
      } else if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [activeIndex, isExpanded, navigate, route]);

  const handleBack = () => {
    if (meta?.parent) {
      navigate(meta.parent);
    } else {
      navigate('/');
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 50) return;
    if (delta < 0) {
      goToTarget(getAdjacentChapterSlideTarget(route, activeIndex, 'next'));
    } else {
      goToTarget(getAdjacentChapterSlideTarget(route, activeIndex, 'prev'));
    }
  };

  // Shared navigation controls (arrows + dots) — used in both modes
  const navControls = (
    <>
      <ChapterArrowButton
        direction="left"
        onClick={() => goToTarget(prevTarget)}
        visible={!!prevTarget}
        accentColor={accentColor}
      />
      <ChapterArrowButton
        direction="right"
        onClick={() => goToTarget(nextTarget)}
        visible={!!nextTarget}
        accentColor={accentColor}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          pointerEvents: 'auto',
          zIndex: 10,
        }}
      >
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width: isMobile ? '8px' : '6px',
              height: isMobile ? '8px' : '6px',
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
    </>
  );

  // ── Mobile mode: fullscreen single slide, no 3D ──
  if (isMobile) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'auto',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <SlideContent
          route={route}
          slideIndex={activeIndex}
          totalSlides={count}
          accentColor={accentColor}
          isActive={true}
          onBack={handleBack}
          isMobile={true}
          showExpandHint={false}
        />
        {navControls}
      </div>
    );
  }

  // ── PC Expanded fullscreen overlay (portal) ──
  const expandedOverlay = isExpanded
    ? createPortal(
        <div
          className="slide-expanded-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(8,6,4,0.97)',
            backdropFilter: 'blur(12px)',
            pointerEvents: 'auto',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              padding: expandedViewportPadding,
              boxSizing: 'border-box',
            }}
          >
            <div style={expandedContentFrameStyle}>
              <SlideContent
                route={route}
                slideIndex={activeIndex}
                totalSlides={count}
                accentColor={accentColor}
                isActive={true}
                onBack={handleBack}
                isExpanded={true}
                showExpandHint={false}
              />
            </div>
          </div>
          {/* Collapse button — top right of overlay */}
          <div
            style={{
              position: 'absolute',
              top: expandedViewportPadding,
              right: expandedViewportPadding,
              zIndex: 10,
              pointerEvents: 'auto',
            }}
          >
            <CollapseButton onClick={() => setIsExpanded(false)} accentColor={accentColor} />
          </div>
          {/* Navigation in expanded mode */}
          <ChapterArrowButton
            direction="left"
            onClick={() => goToTarget(prevTarget)}
            visible={!!prevTarget}
            accentColor={accentColor}
          />
          <ChapterArrowButton
            direction="right"
            onClick={() => goToTarget(nextTarget)}
            visible={!!nextTarget}
            accentColor={accentColor}
          />
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
        </div>,
        document.body,
      )
    : null;

  // ── PC 3D Carousel (default) ──
  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      {expandedOverlay}

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
          const absOffset = Math.abs(offset);
          const tx = offset * 840;
          const tz = -Math.abs(offset) * 300;
          const ry = -offset * 25;
          const op = mounted ? Math.max(0.15, 1 - Math.abs(offset) * 0.35) : 0;
          const isActive = i === activeIndex;
          const scale = isActive ? 1.16 : absOffset === 1 ? 0.78 : 0.64;
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
                transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
                opacity: op,
                transition: mounted
                  ? 'transform 0.65s cubic-bezier(0.16,1,0.3,1), opacity 0.65s cubic-bezier(0.16,1,0.3,1)'
                  : 'none',
                cursor: isActive ? 'default' : 'pointer',
                pointerEvents: 'auto',
                animation:
                  mounted && isActive && i === 0
                    ? 'carouselPanelEnter 0.7s cubic-bezier(0.16,1,0.3,1) forwards'
                    : undefined,
              }}
            >
              <SlideContent
                route={route}
                slideIndex={i}
                totalSlides={count}
                accentColor={accentColor}
                isActive={isActive}
                onBack={handleBack}
                onExpand={isActive ? () => setIsExpanded(true) : undefined}
                onExpandWithHint={
                  isActive
                    ? () => {
                        dismissForever();
                        setIsExpanded(true);
                      }
                    : undefined
                }
                showExpandHint={isActive ? showFullscreenHint : false}
              />
            </div>
          );
        })}
      </div>

      {/* Nav arrows */}
      <ChapterArrowButton
        direction="left"
        onClick={() => goToTarget(prevTarget)}
        visible={!!prevTarget}
        accentColor={accentColor}
      />
      <ChapterArrowButton
        direction="right"
        onClick={() => goToTarget(nextTarget)}
        visible={!!nextTarget}
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
