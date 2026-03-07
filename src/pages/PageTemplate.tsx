import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGE_META } from '../constants/routeDepth';
import H5DocContent from './H5DocContent';

const cornerStyles: React.CSSProperties[] = [
  { top: '-1px', left: '-1px', borderTop: '8px solid #c8a96e', borderLeft: '8px solid #c8a96e' },
  { top: '-1px', right: '-1px', borderTop: '8px solid #c8a96e', borderRight: '8px solid #c8a96e' },
  { bottom: '-1px', left: '-1px', borderBottom: '8px solid #c8a96e', borderLeft: '8px solid #c8a96e' },
  { bottom: '-1px', right: '-1px', borderBottom: '8px solid #c8a96e', borderRight: '8px solid #c8a96e' },
];

interface Props {
  route: string;
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

function SubPageLink({
  route,
  label,
  numeral,
  color,
}: {
  route: string;
  label: string;
  numeral: string;
  color: string;
}) {
  const [hov, setHov] = useState(false);
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(route)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 14px',
        background: hov ? `${color}12` : 'rgba(255,255,255,0.015)',
        border: `1px solid ${hov ? `${color}55` : 'rgba(200,169,110,0.12)'}`,
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <span
        style={{
          color: hov ? color : 'rgba(200,169,110,0.35)',
          fontSize: '9px',
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
          color: hov ? '#f0e8d8' : '#8a7a60',
          fontSize: '12px',
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
          opacity: hov ? 1 : 0,
          transform: hov ? 'translateX(0)' : 'translateX(-4px)',
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

export default function PageTemplate({ route }: Props) {
  const navigate = useNavigate();
  const meta = PAGE_META[route];

  if (!meta) return null;

  const isLevel1 = meta.parent === null;
  const accentColor = meta.color;
  const isBTypeSubPage = route.split('/').filter(Boolean).length >= 2;

  const handleBack = () => {
    if (meta.parent) {
      navigate(meta.parent);
    } else {
      navigate('/');
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'rgba(8,6,4,0.96)',
        border: `1px solid rgba(200,169,110,0.28)`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "Georgia, 'Times New Roman', serif",
        overflow: 'hidden',
      }}
    >
      {/* Corner decorations */}
      {cornerStyles.map((cs, i) => (
        <div
          key={i}
          style={{ position: 'absolute', width: 10, height: 10, opacity: 0.65, ...cs }}
        />
      ))}

      {/* ── Header ── */}
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
        <BackButton onClick={handleBack} />
        <div
          style={{
            color: 'rgba(200,169,110,0.28)',
            fontSize: '9px',
            letterSpacing: '0.25em',
            alignSelf: 'center',
          }}
        >
          {isLevel1 ? 'PROJECT' : 'CHAPTER'}
        </div>
      </div>

      {/* ── Title block ── */}
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

        <p
          style={{
            color: '#a09070',
            fontSize: '12px',
            lineHeight: 1.8,
            paddingLeft: '17px',
          }}
        >
          {meta.desc}
        </p>
      </div>

      {/* ── Sub-pages (level-1) or placeholder (level-2) ── */}
      <div
        style={{
          flex: 1,
          padding: '0 28px 24px',
          overflow: 'auto',
        }}
        className="panel-scroll"
      >
        {isLevel1 && meta.subPages && meta.subPages.length > 0 ? (
          <>
            <div
              style={{
                color: accentColor,
                fontSize: '9px',
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
                />
              ))}
            </div>
          </>
        ) : isBTypeSubPage ? (
          <H5DocContent route={route} accentColor={accentColor} />
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
                fontSize: '9px',
                letterSpacing: '0.3em',
                marginBottom: '10px',
              }}
            >
              CONTENT
            </div>
            <div style={{ color: '#4a3a28', fontSize: '12px', lineHeight: 1.7 }}>
              Case study coming soon.
              <br />
              <span style={{ fontSize: '10px', opacity: 0.6 }}>
                Contact me for a detailed walkthrough.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
