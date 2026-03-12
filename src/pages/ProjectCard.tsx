import PageTemplate from './PageTemplate';

const projectData = [
  {
    id: '01',
    route: '/jidu-hmi',
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
      { route: '/jidu-hmi/3d-map-driving-component-states', label: '3D地图和驾驶组件状态设计', numeral: 'VI' },
    ],
  },
  {
    id: '02',
    route: '/web-design-develop',
    title: '网页设计和开发',
    subtitle: 'Web Design Develop',
    year: '2025',
    tags: ['AI Pipeline', 'SaaS', 'Three.js', 'Vue3'],
    desc: 'Generative 3D interior design pipeline — upload, analyze, edit, render. Async task polling, rollback, multi-tenant asset isolation, and Fuli+ carpet agent.',
    color: '#7a9e8e',
    subPages: [
      { route: '/web-design-develop/overview', label: 'Platform Overview', numeral: 'I' },
      { route: '/web-design-develop/component-framework', label: 'Component Framework', numeral: 'II' },
      { route: '/web-design-develop/key-pages', label: 'Key Pages', numeral: 'III' },
      { route: '/web-design-develop/semantic-system', label: 'Semantic System', numeral: 'IV' },
      { route: '/web-design-develop/fuli-plus', label: 'Fuli+ Agent', numeral: 'V' },
    ],
  },
  {
    id: '03',
    route: '/agentic-design-development',
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
    route: '/academic-gamification',
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
  return <PageTemplate route={p.route} onBackOverride={onClose} onNavigateAway={onClose} />;
}
