import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import ChapterArrowButton from '../components/ChapterArrowButton';
import { getAdjacentChapterSlideTarget } from '../constants/chapterNavigation';
import { PAGE_META } from '../constants/routeDepth';
import H5DocContent from './H5DocContent';
import { useFullscreenHint } from '../hooks/useFullscreenHint';

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

interface Props {
  route: string;
  isMobile?: boolean;
  onBackOverride?: () => void;
  onNavigateAway?: () => void;
}

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
        fontSize: '11px',
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

function SubPageLink({
  route,
  label,
  numeral,
  color,
  disabled,
  onNavigateAway,
}: {
  route: string;
  label: string;
  numeral: string;
  color: string;
  disabled?: boolean;
  onNavigateAway?: () => void;
}) {
  const [hov, setHov] = useState(false);
  const navigate = useNavigate();
  const isInteractive = !disabled;
  return (
    <button
      onClick={() => {
        if (!isInteractive) return;
        navigate(route);
        onNavigateAway?.();
      }}
      onMouseEnter={() => {
        if (!isInteractive) return;
        setHov(true);
      }}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 14px',
        background: isInteractive && hov ? `${color}12` : 'rgba(255,255,255,0.015)',
        border: `1px solid ${isInteractive && hov ? `${color}55` : 'rgba(200,169,110,0.12)'}`,
        cursor: isInteractive ? 'pointer' : 'default',
        width: '100%',
        textAlign: 'left',
        transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
        fontFamily: "Georgia, 'Times New Roman', serif",
        opacity: isInteractive ? 1 : 0.45,
      }}
    >
      <span
        style={{
          color: isInteractive && hov ? color : isInteractive ? 'rgba(200,169,110,0.35)' : '#5f5340',
          fontSize: '11px',
          fontStyle: 'italic',
          width: '22px',
          textAlign: 'right',
          flexShrink: 0,
          transition: 'color 0.25s',
        }}
      >
        {numeral}
      </span>
      <span
        style={{
          color: isInteractive && hov ? '#f0e8d8' : isInteractive ? '#8a7a60' : '#6f624f',
          fontSize: '14px',
          letterSpacing: '0.04em',
          transition: 'color 0.25s',
        }}
      >
        {label}
      </span>
      <svg
        width="10"
        height="10"
        viewBox="0 0 11 11"
        fill="none"
        style={{
          marginLeft: 'auto',
          opacity: isInteractive && hov ? 1 : 0,
          transform: isInteractive && hov ? 'translateX(0)' : 'translateX(-4px)',
          transition: 'all 0.25s',
          flexShrink: 0,
        }}
      >
        <path
          d="M1.5 5.5H9.5M6 2.5L9.5 5.5L6 8.5"
          stroke={color}
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function PanelContent({
  route,
  accentColor,
  isExpanded,
  isMobile,
  onExpand,
  onCollapse,
  onBack,
  onNavigateAway,
}: {
  route: string;
  accentColor: string;
  isExpanded: boolean;
  isMobile?: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  onBack: () => void;
  onNavigateAway?: () => void;
}) {
  const meta = PAGE_META[route];
  const rootScrollRef = useRef<HTMLDivElement>(null);
  if (!meta) return null;
  const { isVisible: showFullscreenHint, dismissForever } = useFullscreenHint(!isMobile && !isExpanded);

  const isLevel1 = meta.parent === null;
  const isBTypeSubPage = route.split('/').filter(Boolean).length >= 2;
  const isReadingMode = isExpanded && !isMobile;
  const shouldScrollTitleBlock = isExpanded && isBTypeSubPage;

  useEffect(() => {
    if (!isReadingMode) return;
    rootScrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [isReadingMode, route]);

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
            fontSize: isReadingMode ? 'clamp(30px, 3vw, 44px)' : isMobile ? '20px' : '24px',
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
          fontSize: isReadingMode ? '11px' : '12px',
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
          fontSize: isReadingMode ? '16px' : isMobile ? '15px' : '16px',
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
        border: isReadingMode ? 'none' : `1px solid rgba(200,169,110,0.28)`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "Georgia, 'Times New Roman', serif",
        overflow: isReadingMode ? 'auto' : 'hidden',
      }}
    >
      {/* Corner decorations */}
      {!isReadingMode && cornerStyles.map((cs, i) => (
        <div
          key={i}
          style={{ position: 'absolute', width: 10, height: 10, opacity: 0.65, ...cs }}
        />
      ))}

      {/* ── Header ── */}
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
              <div
                style={{
                  color: 'rgba(200,169,110,0.28)',
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                }}
              >
                {isLevel1 ? 'PROJECT' : 'CHAPTER'}
              </div>
            </div>
            {/* Expand / collapse buttons */}
            {!isMobile && isExpanded && <CollapseButton onClick={onCollapse} accentColor={accentColor} />}
            {!isMobile && !isExpanded && (
              <ExpandButton
                onClick={() => {
                  dismissForever();
                  onExpand();
                }}
                accentColor={accentColor}
                showHint={showFullscreenHint}
              />
            )}
          </div>
        </div>
      </div>

      {!shouldScrollTitleBlock && titleBlock}

      {/* ── Sub-pages (level-1) or placeholder (level-2) ── */}
      <div
        style={{
          flex: 1,
          padding: isReadingMode ? '0 0 56px' : isMobile ? '0 20px 20px' : '0 28px 24px',
          overflow: isReadingMode ? 'visible' : 'auto',
          ...(isReadingMode ? readingColumnStyle : null),
        }}
        className="panel-scroll portfolio-scroll"
      >
        {shouldScrollTitleBlock && titleBlock}
        {isLevel1 && meta.subPages && meta.subPages.length > 0 ? (
          <>
            <div
              style={{
                color: accentColor,
                fontSize: '11px',
                letterSpacing: '0.3em',
                marginBottom: '12px',
              }}
            >
              CHAPTERS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {meta.subPages.map((sp) => (
                <SubPageLink
                  key={sp.route}
                  route={sp.route}
                  label={sp.label}
                  numeral={sp.numeral}
                  color={accentColor}
                  disabled={sp.disabled}
                  onNavigateAway={onNavigateAway}
                />
              ))}
            </div>
          </>
        ) : isBTypeSubPage ? (
          <H5DocContent
            route={route}
            accentColor={accentColor}
            isMobile={isMobile}
            enableNarrativeMotion={isReadingMode}
          />
        ) : (
          <div
            style={{
              border: '1px dashed rgba(200,169,110,0.15)',
              padding: '28px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                color: 'rgba(200,169,110,0.25)',
                fontSize: '11px',
                letterSpacing: '0.3em',
                marginBottom: '10px',
              }}
            >
              CONTENT
            </div>
            <div style={{ color: '#4a3a28', fontSize: '16px', lineHeight: 1.7 }}>
              Case study coming soon.
              <br />
              <span style={{ fontSize: '12px', opacity: 0.6 }}>
                Contact me for a detailed walkthrough.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PageTemplate({ route, isMobile, onBackOverride, onNavigateAway }: Props) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const meta = PAGE_META[route];
  if (!meta) return null;

  const accentColor = meta.color;
  const prevTarget = getAdjacentChapterSlideTarget(route, 0, 'prev');
  const nextTarget = getAdjacentChapterSlideTarget(route, 0, 'next');

  const handleBack = () => {
    if (onBackOverride) {
      onBackOverride();
      return;
    }
    if (meta.parent) {
      navigate(meta.parent);
    } else {
      navigate('/');
    }
  };

  const handleSlideNavigation = (target: { route: string; slideIndex: number } | null) => {
    if (!target) return;
    navigate(target.route, { state: { initialSlideIndex: target.slideIndex } });
  };

  const chapterNavOverlay = meta.parent !== null
    ? createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: isExpanded ? 10000 : 45,
          }}
        >
          <ChapterArrowButton
            direction="left"
            onClick={prevTarget ? () => handleSlideNavigation(prevTarget) : () => {}}
            visible={!!prevTarget}
            accentColor={accentColor}
          />
          <ChapterArrowButton
            direction="right"
            onClick={nextTarget ? () => handleSlideNavigation(nextTarget) : () => {}}
            visible={!!nextTarget}
            accentColor={accentColor}
          />
        </div>,
        document.body,
      )
    : null;

  const panelContent = (
    <PanelContent
      route={route}
      accentColor={accentColor}
      isExpanded={isExpanded}
      isMobile={isMobile}
      onExpand={() => setIsExpanded(true)}
      onCollapse={() => setIsExpanded(false)}
      onBack={handleBack}
      onNavigateAway={onNavigateAway}
    />
  );

  // Fullscreen expanded portal
  if (isExpanded) {
    return createPortal(
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
          <div style={expandedContentFrameStyle}>{panelContent}</div>
        </div>
        {chapterNavOverlay}
      </div>,
      document.body,
    );
  }

  return (
    <>
      {panelContent}
      {chapterNavOverlay}
    </>
  );
}
