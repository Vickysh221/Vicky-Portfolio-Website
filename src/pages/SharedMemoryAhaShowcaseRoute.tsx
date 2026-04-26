import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

import LanguageToggle from '../components/LanguageToggle';
import { useI18n } from '../i18n/LanguageProvider.tsx';
import { SHARED_MEMORY_AHA_CASE_STUDY_ROUTE } from './sharedMemoryAhaCaseStudyMeta.ts';

const pageStyle: CSSProperties = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  background: '#050403',
  color: '#f4ecde',
  fontFamily: "Georgia, 'Times New Roman', serif",
};

const headerStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 5,
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  padding: '18px 24px',
  borderBottom: '1px solid rgba(200,169,110,0.14)',
  background: 'linear-gradient(180deg, rgba(5,4,3,0.94), rgba(5,4,3,0.72))',
  backdropFilter: 'blur(14px)',
};

const backButtonStyle: CSSProperties = {
  border: '1px solid rgba(200,169,110,0.28)',
  background: 'rgba(255,255,255,0.04)',
  color: '#c8a96e',
  height: 34,
  padding: '0 14px',
  cursor: 'pointer',
  fontSize: 12,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
};

const eyebrowStyle: CSSProperties = {
  color: 'rgba(200,169,110,0.62)',
  fontSize: 11,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
};

const titleStyle: CSSProperties = {
  color: '#f4ecde',
  fontSize: 'clamp(18px, 2vw, 26px)',
  lineHeight: 1.1,
};

const frameStyle: CSSProperties = {
  position: 'absolute',
  inset: '72px 0 0',
  width: '100%',
  height: 'calc(100vh - 72px)',
  border: 'none',
  display: 'block',
  background: '#000',
};

export default function SharedMemoryAhaShowcaseRoute() {
  const navigate = useNavigate();
  const { text } = useI18n();

  return (
    <main style={pageStyle}>
      <LanguageToggle />
      <header style={headerStyle}>
        <button
          type="button"
          style={backButtonStyle}
          onClick={() => navigate(SHARED_MEMORY_AHA_CASE_STUDY_ROUTE)}
        >
          {text({ zh: '返回', en: 'Back' })}
        </button>
        <div style={{ minWidth: 0 }}>
          <div style={eyebrowStyle}>Aha Moment UX Showcase</div>
          <div style={titleStyle}>{text({ zh: 'Aha Mode Use Case HTML', en: 'Aha Mode Use Case HTML' })}</div>
        </div>
      </header>
      <iframe
        src="/language-diary-ux-showcase-cases.html"
        title="Aha Moment UX Showcase"
        style={frameStyle}
      />
    </main>
  );
}
