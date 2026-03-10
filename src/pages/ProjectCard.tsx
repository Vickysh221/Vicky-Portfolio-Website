import { useNavigate } from 'react-router-dom';

const projectData = [
  {
    id: '01',
    title: 'JIDU HMI 辅助驾驶体验设计',
    subtitle: 'JIDU Automotive · ADAS HMI Design',
    year: '2022–2024',
    tags: ['Unity3D', 'HMI', '3D Map', 'ADAS'],
    desc: '3D virtual camera architecture, gesture system, and autonomous driving UX states for JIDU\'s in-car HMI. Prototyped directly in Unity3D.',
    color: '#c8a96e',
    subPages: [
      { route: '/jidu-hmi/unity3d-camera', label: 'Unity3D Camera System', numeral: 'I' },
      { route: '/jidu-hmi/3d-map', label: '3D Map Strategy', numeral: 'II' },
      { route: '/jidu-hmi/avp', label: 'AVP Auto-Park', numeral: 'III' },
      { route: '/jidu-hmi/minimap-camera', label: 'Minimap Camera', numeral: 'IV' },
      { route: '/jidu-hmi/3d-map-gesture', label: '3D Map Gestures', numeral: 'V' },
    ],
  },
  {
    id: '02',
    title: 'Phoenix AI Platform',
    subtitle: 'Phoenix AI · SaaS',
    year: '2025',
    tags: ['AI Pipeline', 'SaaS', 'Three.js', 'Vue3'],
    desc: 'Generative 3D interior design pipeline — upload, analyze, edit, render. Async task polling, rollback, multi-tenant asset isolation, and Fuli+ carpet agent.',
    color: '#7a9e8e',
    subPages: [
      { route: '/phoenix-ai/overview', label: 'Platform Overview', numeral: 'I' },
      { route: '/phoenix-ai/component-framework', label: 'Component Framework', numeral: 'II' },
      { route: '/phoenix-ai/key-pages', label: 'Key Pages', numeral: 'III' },
      { route: '/phoenix-ai/semantic-system', label: 'Semantic System', numeral: 'IV' },
      { route: '/phoenix-ai/fuli-plus', label: 'Fuli+ Agent', numeral: 'V' },
    ],
  },
  {
    id: '03',
    title: 'AGENTIC DESIGN & DEVELOPMENT',
    subtitle: 'AI Agent Product Design · Prototyping',
    year: '2024–2025',
    tags: ['Multi-Agent', 'Agent UX', 'Prototype'],
    desc: 'Selected explorations in agent product design, interactive prototyping, and AI-native experience building across concept, system design, and implementation.',
    color: '#8b7db5',
    subPages: [
      { route: '/agentic-design-development/language-diary', label: 'Language Diary Agent', numeral: 'I' },
      { route: '/agentic-design-development/simo-agent-system', label: 'SIMO Agent System 概念设计', numeral: 'II' },
    ],
  },
  {
    id: '04',
    title: 'ACADEMIC WORKS OF GAMIFICATION',
    subtitle: 'Game Systems · Interactive Prototypes',
    year: '2024',
    tags: ['Gamification', 'Urban Simulation', 'Level Design'],
    desc: 'Academic and exploratory works focused on game systems, simulated worlds, and spatial interaction prototypes developed through a gamification lens.',
    color: '#6f8f92',
    subPages: [
      { route: '/academic-gamification/simbiocity', label: 'Simbiocity', numeral: 'I' },
      { route: '/academic-gamification/fortnite-demo', label: 'Fortnite Demo', numeral: 'II' },
    ],
  },
];

interface ProjectCardProps {
  index: number;
  isActive: boolean;
  onClose: () => void;
}

export default function ProjectCard({ index, isActive, onClose }: ProjectCardProps) {
  const navigate = useNavigate();
  const p = projectData[index];

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
          color: '#f0e8d8',
          background: 'rgba(14,12,9,0.85)',
          border: `1px solid ${p.color}55`,
          boxSizing: 'border-box',
          pointerEvents: 'none',
        }}
      >
        <div style={{ color: p.color, fontSize: '13px', letterSpacing: '0.25em', marginBottom: '12px' }}>
          {p.id}
        </div>
        <div style={{ fontSize: '38px', fontStyle: 'italic', lineHeight: 1.1, marginBottom: '12px' }}>
          {p.title}
        </div>
        <div style={{ color: '#a09070', fontSize: '14px', marginBottom: '20px' }}>
          {p.subtitle} · {p.year}
        </div>
        <div style={{ width: '36px', height: '1px', background: p.color, opacity: 0.45, marginBottom: '20px' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {p.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '4px 10px',
                border: `1px solid ${p.color}40`,
                color: p.color,
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

  // Detail mode — full 820×680px panel
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Georgia', 'Times New Roman', serif",
        color: '#f0e8d8',
        background: 'rgba(8,6,4,0.96)',
        border: `1px solid ${p.color}40`,
        boxSizing: 'border-box',
        pointerEvents: 'auto',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '32px 36px 24px',
          borderBottom: '1px solid rgba(200,169,110,0.1)',
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <div style={{ color: p.color, fontSize: '10px', letterSpacing: '0.3em', marginBottom: '10px' }}>
            {p.id} — {p.subtitle}
          </div>
          <div style={{ fontSize: '28px', fontStyle: 'italic', lineHeight: 1.1 }}>
            {p.title}
          </div>
          <div style={{ color: '#6a5a40', fontSize: '11px', marginTop: '5px', letterSpacing: '0.08em' }}>
            {p.year}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'transparent',
            border: '1px solid rgba(200,169,110,0.22)',
            cursor: 'pointer',
            color: '#6a5a40',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.25s',
            flexShrink: 0,
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(200,169,110,0.6)';
            (e.currentTarget as HTMLButtonElement).style.color = '#c8a96e';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(200,169,110,0.22)';
            (e.currentTarget as HTMLButtonElement).style.color = '#6a5a40';
          }}
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '28px 36px', flex: 1, overflowY: 'auto' }}>
        <p style={{ color: '#a09070', fontSize: '13.5px', lineHeight: 1.75, marginBottom: '28px', margin: '0 0 28px' }}>
          {p.desc}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
          {p.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '4px 12px',
                border: `1px solid ${p.color}40`,
                color: p.color,
                fontSize: '10px',
                letterSpacing: '0.08em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(200,169,110,0.1)', marginBottom: '26px' }} />

        {/* Chapters */}
        <div style={{ color: p.color, fontSize: '9px', letterSpacing: '0.3em', marginBottom: '14px' }}>
          CHAPTERS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {p.subPages.map((sp) => (
            <button
              key={sp.route}
              onClick={() => {
                navigate(sp.route);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 14px',
                border: '1px solid rgba(200,169,110,0.12)',
                background: 'rgba(255,255,255,0.015)',
                color: '#8a7a60',
                fontSize: '14px',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
                textAlign: 'left',
                transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = `${p.color}12`;
                (e.currentTarget as HTMLButtonElement).style.borderColor = `${p.color}55`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.015)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(200,169,110,0.12)';
              }}
            >
              <span
                style={{
                  color: 'rgba(200,169,110,0.35)',
                  fontSize: '11px',
                  fontStyle: 'italic',
                  width: '22px',
                  textAlign: 'right',
                  flexShrink: 0,
                }}
              >
                {sp.numeral}
              </span>
              <span>{sp.label}</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 11 11"
                fill="none"
                style={{ marginLeft: 'auto', opacity: 0.72, flexShrink: 0 }}
              >
                <path
                  d="M1.5 5.5H9.5M6 2.5L9.5 5.5L6 8.5"
                  stroke={p.color}
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
