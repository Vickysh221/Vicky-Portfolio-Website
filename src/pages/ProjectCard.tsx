import PageTemplate from './PageTemplate';

interface ProjectCardData {
  id: string;
  route: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  desc: string;
  color: string;
  subPages: { route: string; label: string; numeral: string }[];
  disabled?: boolean;
}

const projectData: ProjectCardData[] = [
  {
    id: '01',
    route: '/jidu-hmi',
    title: '座舱 HMI 设计',
    subtitle: 'JIDU Automotive · ADAS HMI Design',
    year: '2022–2024',
    tags: ['Unity3D', 'HMI', '3D Map', 'ADAS'],
    desc: '3D virtual camera architecture, gesture system, and autonomous driving UX states for JIDU\'s in-car HMI. Prototyped directly in Unity3D.',
    color: '#c8a96e',
    subPages: [
      { route: '/jidu-hmi/unity3d-camera', label: '3D地图一镜到底系统', numeral: 'I' },
      { route: '/jidu-hmi/3d-map', label: '2/3D地图融合策略概念', numeral: 'II' },
      { route: '/jidu-hmi/avp', label: 'AVP自动泊车体设计和原型开发', numeral: 'III' },
      { route: '/jidu-hmi/dashboard-layout', label: '驾驶区布局和驾驶状态原型设计', numeral: 'IV' },
      { route: '/jidu-hmi/minimap-camera', label: 'SLAM小地图策略', numeral: 'V' },
      { route: '/jidu-hmi/3d-map-gesture', label: '3D地图手势系统', numeral: 'VI' },
      { route: '/jidu-hmi/3d-map-driving-component-states', label: '3D地图和驾驶组件状态设计', numeral: 'VII' },
    ],
  },
  {
    id: '02',
    route: '/agentic-design-development',
    title: 'My String Figure Player - Being with AI',
    subtitle: 'AI Agent Product Design · Prototyping',
    year: '2024–2025',
    tags: ['Multi-Agent', 'Agent UX', 'Prototype'],
    desc: 'Selected explorations in agent product design, interactive prototyping, and AI-native experience building across concept, system design, and implementation.',
    color: '#8b7db5',
    subPages: [
      { route: '/agentic-design-development/fuli-plus', label: '面向地毯生成的AI协作设计系统', numeral: 'I' },
      { route: '/agentic-design-development/language-diary', label: 'A Ritual of Expression - 语言学习陪伴多智能体系统', numeral: 'II' },
      { route: '/agentic-design-development/simo-agent-system', label: 'SIMO Agent System 概念设计', numeral: 'III' },
      { route: '/agentic-design-development/agentic-driving', label: '驾驶专家，还是个性化驾驶员？', numeral: 'IV' },
      { route: '/web-design-develop', label: 'AI coding 网页设计和开发', numeral: 'V' },
    ],
  },
  {
    id: '03',
    route: '/academic-gamification',
    title: 'Have a cup of tea with AI',
    subtitle: '进入伙伴们的音乐世界吧',
    year: '2024',
    tags: ['Game Systems', 'Simulation', 'Spatial Design', 'Prototype'],
    desc: 'Academic and exploratory works focused on game systems, simulated worlds, and spatial interaction prototypes developed through a gamification lens.',
    color: '#6f8f92',
    subPages: [
      { route: '/academic-gamification/companions', label: '进入伙伴们的音乐世界吧', numeral: 'I' },
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
  const isDisabled = !!p.disabled;

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
          color: isDisabled ? '#8a7a60' : '#f0e8d8',
          background: 'rgba(14,12,9,0.85)',
          border: `1px solid ${isDisabled ? 'rgba(138,122,96,0.22)' : `${p.color}55`}`,
          boxSizing: 'border-box',
          pointerEvents: 'none',
          opacity: isDisabled ? 0.5 : 1,
          filter: isDisabled ? 'grayscale(0.45)' : 'none',
        }}
      >
        <div style={{ color: isDisabled ? '#7b6a52' : p.color, fontSize: '13px', letterSpacing: '0.25em', marginBottom: '12px' }}>
          {p.id}
        </div>
        <div style={{ fontSize: '38px', fontStyle: 'italic', lineHeight: 1.1, marginBottom: '12px' }}>
          {p.title}
        </div>
        <div style={{ color: '#a09070', fontSize: '14px', marginBottom: '20px' }}>
          {p.subtitle} · {p.year}
        </div>
        <div style={{ width: '36px', height: '1px', background: isDisabled ? '#7b6a52' : p.color, opacity: 0.45, marginBottom: '20px' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {p.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '4px 10px',
                border: `1px solid ${isDisabled ? 'rgba(123,106,82,0.25)' : `${p.color}40`}`,
                color: isDisabled ? '#7b6a52' : p.color,
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

  if (isDisabled) {
    return null;
  }

  // Detail mode — full 820×680px panel
  return <PageTemplate route={p.route} onBackOverride={onClose} onNavigateAway={onClose} />;
}
