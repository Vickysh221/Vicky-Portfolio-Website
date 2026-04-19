// ── Chapter preview placeholders (static images sourced from existing assets).
// Replace each entry with a dedicated cover later; the shape is stable.
const diaryAgentPreview = new URL('./images/covers/cover-lang.png', import.meta.url).href;
const fuliPreview = new URL('./images/covers/cover-fuli.png', import.meta.url).href;
const driverInfoPreview = new URL('./images/driver-info/slide01-img03.png', import.meta.url).href;
const jiduAgentPreview = new URL('./images/jiduagent/slide01-img01.png', import.meta.url).href;
const phoenixPreview = new URL('./images/covers/cover-simo.png', import.meta.url).href;
const companionsPreviewVideo = new URL('./images/companions/dancing.mp4', import.meta.url).href;
const unityCameraPreview = new URL('./images/covers/cover-cam.png', import.meta.url).href;
const map3d2dPreview = new URL('./images/covers/2d3d.mov', import.meta.url).href;
const map3d2dPreviewPoster = new URL('./images/3d-2dmap/slide03-img01.png', import.meta.url).href;
const avpPreview = new URL('./images/covers/cover-avp.png', import.meta.url).href;
const dashboardPreview = new URL('./images/covers/cover-drv.png', import.meta.url).href;
const slamPreview = new URL('./images/covers/cover-slam.png', import.meta.url).href;
const gesturePreview = new URL('./images/covers/cover-gesture.png', import.meta.url).href;
const activeSafetyPreview = new URL('./images/covers/cover-components.png', import.meta.url).href;
const interiorPreview = new URL('./images/covers/cover-interior.png', import.meta.url).href;

export interface SubPagePreviewMedia {
  src: string;
  type: 'image' | 'video';
  poster?: string;
}

export interface SubPage {
  route: string;
  label: string;
  numeral: string;
  disabled?: boolean;
  previewMedia?: SubPagePreviewMedia;
}

export interface ProjectEntry {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  desc: string;
  color: string;
  route: string;
  subPages: SubPage[];
  disabled?: boolean;
}

export const PROJECTS: ProjectEntry[] = [
  {
    id: '02',
    title: 'My String Figure Player - Being with AI',
    subtitle: 'AI Agent Product Design · Prototyping',
    year: '2024–2025',
    tags: ['Multi-Agent', 'Agent UX', 'Prototype', 'Creative Coding'],
    desc: 'Selected explorations in agent product design, interactive prototyping, and AI-native experience building across concept, system design, and implementation.',
    color: '#8b7db5',
    route: '/agentic-design-development',
    subPages: [
      { route: '/agentic-design-development/language-diary', label: 'A Ritual of Expression - 语言学习陪伴多智能体系统', numeral: 'I', previewMedia: { src: diaryAgentPreview, type: 'image' } },
      { route: '/agentic-design-development/fuli-plus', label: '面向地毯生成的AI协作设计系统', numeral: 'II', previewMedia: { src: fuliPreview, type: 'image' } },
      { route: '/agentic-design-development/driving-authority-contracts', label: '当车开始像同伴一样观察人时', numeral: 'III', previewMedia: { src: driverInfoPreview, type: 'image' } },
      { route: '/agentic-design-development/agentic-driving', label: '驾驶专家，还是个性化驾驶员？', numeral: 'IV', previewMedia: { src: jiduAgentPreview, type: 'image' } },
      { route: '/agentic-design-development/simo-agent-system', label: 'SIMO Agent System 概念设计', numeral: 'V', previewMedia: { src: phoenixPreview, type: 'image' } },
      { route: '/agentic-design-development/ai-interior-system', label: 'AI 室内设计系统的问题重构与交互定义', numeral: 'VI', previewMedia: { src: interiorPreview, type: 'image' } },
    ],
  },
  {
    id: '03',
    title: 'Have a cup of tea with AI',
    subtitle: '进入伙伴们的音乐世界吧',
    year: '2024',
    tags: ['Game Systems', 'Simulation', 'Spatial Design', 'Prototype'],
    desc: 'Academic and exploratory works focused on game systems, simulated worlds, and spatial interaction prototypes developed through a gamification lens.',
    color: '#6f8f92',
    route: '/academic-gamification',
    subPages: [
      { route: '/academic-gamification/companions', label: '进入伙伴们的音乐世界吧', numeral: 'I', previewMedia: { src: companionsPreviewVideo, type: 'video' } },
    ],
  },
  {
    id: '01',
    title: '座舱 HMI 设计',
    subtitle: 'JIDU Automotive · ADAS HMI Design',
    year: '2022–2024',
    tags: ['Unity3D', 'HMI', '3D Map', 'Camera Rig', 'ADAS'],
    desc: '3D virtual camera architecture, gesture system, and autonomous driving UX states for JIDU\'s in-car HMI. Prototyped directly in Unity3D.',
    color: '#c8a96e',
    route: '/jidu-hmi',
    subPages: [
      { route: '/jidu-hmi/unity3d-camera', label: '3D地图一镜到底系统', numeral: 'I', previewMedia: { src: unityCameraPreview, type: 'image' } },
      { route: '/jidu-hmi/3d-map', label: '2/3D地图融合策略概念', numeral: 'II', previewMedia: { src: map3d2dPreview, type: 'video', poster: map3d2dPreviewPoster } },
      { route: '/jidu-hmi/avp', label: 'AVP自动泊车体设计和原型开发', numeral: 'III', previewMedia: { src: avpPreview, type: 'image' } },
      { route: '/jidu-hmi/dashboard-layout', label: '驾驶区布局和驾驶状态原型设计', numeral: 'IV', previewMedia: { src: dashboardPreview, type: 'image' } },
      { route: '/jidu-hmi/minimap-camera', label: 'SLAM小地图策略', numeral: 'V', previewMedia: { src: slamPreview, type: 'image' } },
      { route: '/jidu-hmi/3d-map-gesture', label: '3D地图手势系统', numeral: 'VI', previewMedia: { src: gesturePreview, type: 'image' } },
      { route: '/jidu-hmi/3d-map-driving-component-states', label: '3D地图和驾驶组件状态设计', numeral: 'VII', previewMedia: { src: activeSafetyPreview, type: 'image' } },
    ],
  },
];

export const PROJECT_ROUTES = PROJECTS.map((project) => project.route);
export const PROJECT_COLORS = PROJECTS.map((project) => project.color);
