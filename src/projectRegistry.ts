import type { LocalizedText } from './i18n/types.ts';

// ── Chapter preview placeholders (static images sourced from existing assets).
// Replace each entry with a dedicated cover later; the shape is stable.
const diaryAgentPreview = new URL('./images/covers/thumbs/cover-lang.jpg', import.meta.url).href;
const fuliPreview = new URL('./images/covers/thumbs/cover-fuli.jpg', import.meta.url).href;
const driverInfoPreview = new URL('./images/covers/thumbs/cover-driver-info.jpg', import.meta.url).href;
const jiduAgentPreview = new URL('./images/covers/thumbs/cover-jidu-agent.jpg', import.meta.url).href;
const phoenixPreview = new URL('./images/covers/thumbs/cover-simo.jpg', import.meta.url).href;
const companionsPreviewVideo = new URL('./images/covers/previews/companions-dancing-preview.mp4', import.meta.url).href;
const companionsPreviewPoster = new URL('./images/covers/previews/companions-dancing-poster.jpg', import.meta.url).href;
const unityCameraPreview = new URL('./images/covers/thumbs/cover-cam.jpg', import.meta.url).href;
const map3d2dPreview = new URL('./images/covers/previews/2d3d-preview.mp4', import.meta.url).href;
const map3d2dPreviewPoster = new URL('./images/covers/previews/2d3d-poster.jpg', import.meta.url).href;
const avpPreview = new URL('./images/covers/thumbs/cover-avp.jpg', import.meta.url).href;
const dashboardPreview = new URL('./images/covers/thumbs/cover-drv.jpg', import.meta.url).href;
const slamPreview = new URL('./images/covers/thumbs/cover-slam.jpg', import.meta.url).href;
const gesturePreview = new URL('./images/covers/thumbs/cover-gesture.jpg', import.meta.url).href;
const activeSafetyPreview = new URL('./images/covers/thumbs/cover-components.jpg', import.meta.url).href;
const interiorPreview = new URL('./images/covers/thumbs/cover-interior.jpg', import.meta.url).href;

export interface SubPagePreviewMedia {
  src: string;
  type: 'image' | 'video';
  poster?: string;
}

export interface SubPage {
  route: string;
  label: LocalizedText;
  numeral: string;
  disabled?: boolean;
  previewMedia?: SubPagePreviewMedia;
}

export interface ProjectEntry {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  year: string;
  tags: LocalizedText[];
  desc: LocalizedText;
  color: string;
  route: string;
  subPages: SubPage[];
  disabled?: boolean;
}

export const PROJECTS: ProjectEntry[] = [
  {
    id: '02',
    title: { zh: 'My String Figure Player - Being with AI', en: 'My String Figure Player - Being with AI' },
    subtitle: { zh: 'AI Agent Product Design · Prototyping', en: 'AI Agent Product Design · Prototyping' },
    year: '2024–2025',
    tags: [
      { zh: 'Multi-Agent', en: 'Multi-Agent' },
      { zh: 'Agent UX', en: 'Agent UX' },
      { zh: 'Prototype', en: 'Prototype' },
      { zh: 'Creative Coding', en: 'Creative Coding' },
    ],
    desc: {
      zh: 'Selected explorations in agent product design, interactive prototyping, and AI-native experience building across concept, system design, and implementation.',
      en: 'Selected explorations in agent product design, interactive prototyping, and AI-native experience building across concept, system design, and implementation.',
    },
    color: '#8b7db5',
    route: '/agentic-design-development',
    subPages: [
      {
        route: '/agentic-design-development/language-diary',
        label: {
          zh: 'A Ritual of Expression - 语言学习陪伴多智能体系统',
          en: 'A Ritual of Expression - Multi-Agent System for Language Learning Companionship',
        },
        numeral: 'I',
        previewMedia: { src: diaryAgentPreview, type: 'image' },
      },
      {
        route: '/agentic-design-development/fuli-plus',
        label: { zh: '面向地毯生成的AI协作设计系统', en: 'AI Collaborative Design System for Rug Generation' },
        numeral: 'II',
        previewMedia: { src: fuliPreview, type: 'image' },
      },
      {
        route: '/agentic-design-development/driving-authority-contracts',
        label: { zh: '当车开始像同伴一样观察人时', en: 'When the Car Starts Observing Like a Companion' },
        numeral: 'III',
        previewMedia: { src: driverInfoPreview, type: 'image' },
      },
      {
        route: '/agentic-design-development/agentic-driving',
        label: { zh: '驾驶专家，还是个性化驾驶员？', en: 'Driving Expert, or Personalized Driver?' },
        numeral: 'IV',
        previewMedia: { src: jiduAgentPreview, type: 'image' },
      },
      {
        route: '/agentic-design-development/simo-agent-system',
        label: { zh: 'SIMO Agent System 概念设计', en: 'SIMO Agent System Concept Design' },
        numeral: 'V',
        previewMedia: { src: phoenixPreview, type: 'image' },
      },
      {
        route: '/agentic-design-development/ai-interior-system',
        label: {
          zh: 'AI 室内设计系统的问题重构与交互定义',
          en: 'Problem Reframing and Interaction Definition for an AI Interior Design System',
        },
        numeral: 'VI',
        previewMedia: { src: interiorPreview, type: 'image' },
      },
    ],
  },
  {
    id: '03',
    title: { zh: 'Have a cup of tea with AI', en: 'Have a Cup of Tea with AI' },
    subtitle: { zh: '进入伙伴们的音乐世界吧', en: "Step Into the Companions' Musical World" },
    year: '2024',
    tags: [
      { zh: 'Game Systems', en: 'Game Systems' },
      { zh: 'Simulation', en: 'Simulation' },
      { zh: 'Spatial Design', en: 'Spatial Design' },
      { zh: 'Prototype', en: 'Prototype' },
    ],
    desc: {
      zh: 'Academic and exploratory works focused on game systems, simulated worlds, and spatial interaction prototypes developed through a gamification lens.',
      en: 'Academic and exploratory works focused on game systems, simulated worlds, and spatial interaction prototypes developed through a gamification lens.',
    },
    color: '#6f8f92',
    route: '/academic-gamification',
    subPages: [
      {
        route: '/academic-gamification/companions',
        label: { zh: '进入伙伴们的音乐世界吧', en: "Step Into the Companions' Musical World" },
        numeral: 'I',
        previewMedia: { src: companionsPreviewVideo, type: 'video', poster: companionsPreviewPoster },
      },
    ],
  },
  {
    id: '01',
    title: { zh: '座舱 HMI 设计', en: 'Cockpit HMI Design' },
    subtitle: { zh: 'JIDU Automotive · ADAS HMI Design', en: 'JIDU Automotive · ADAS HMI Design' },
    year: '2022–2024',
    tags: [
      { zh: 'Unity3D', en: 'Unity3D' },
      { zh: 'HMI', en: 'HMI' },
      { zh: '3D Map', en: '3D Map' },
      { zh: 'Camera Rig', en: 'Camera Rig' },
      { zh: 'ADAS', en: 'ADAS' },
    ],
    desc: {
      zh: 'Designed the 3D virtual camera architecture, gesture system, and autonomous driving UX states for JIDU\'s in-car HMI. Prototyped directly in Unity3D.',
      en: 'Designed the 3D virtual camera architecture, gesture system, and autonomous driving UX states for JIDU\'s in-car HMI. Prototyped directly in Unity3D.',
    },
    color: '#c8a96e',
    route: '/jidu-hmi',
    subPages: [
      {
        route: '/jidu-hmi/unity3d-camera',
        label: { zh: '3D地图一镜到底系统', en: 'Continuous 3D Map Camera System' },
        numeral: 'I',
        previewMedia: { src: unityCameraPreview, type: 'image' },
      },
      {
        route: '/jidu-hmi/3d-map',
        label: { zh: '2/3D地图融合策略概念', en: '2D/3D Map Fusion Strategy Concept' },
        numeral: 'II',
        previewMedia: { src: map3d2dPreview, type: 'video', poster: map3d2dPreviewPoster },
      },
      {
        route: '/jidu-hmi/avp',
        label: { zh: 'AVP自动泊车体设计和原型开发', en: 'AVP Product Design and Prototype Development' },
        numeral: 'III',
        previewMedia: { src: avpPreview, type: 'image' },
      },
      {
        route: '/jidu-hmi/dashboard-layout',
        label: { zh: '驾驶区布局和驾驶状态原型设计', en: 'Driving-Zone Layout and Driving-State Prototype Design' },
        numeral: 'IV',
        previewMedia: { src: dashboardPreview, type: 'image' },
      },
      {
        route: '/jidu-hmi/minimap-camera',
        label: { zh: 'SLAM小地图策略', en: 'SLAM Minimap Strategy' },
        numeral: 'V',
        previewMedia: { src: slamPreview, type: 'image' },
      },
      {
        route: '/jidu-hmi/3d-map-gesture',
        label: { zh: '3D地图手势系统', en: '3D Map Gesture System' },
        numeral: 'VI',
        previewMedia: { src: gesturePreview, type: 'image' },
      },
      {
        route: '/jidu-hmi/3d-map-driving-component-states',
        label: { zh: '3D地图和驾驶组件状态设计', en: '3D Map and Driving Component State Design' },
        numeral: 'VII',
        previewMedia: { src: activeSafetyPreview, type: 'image' },
      },
    ],
  },
];

export const PROJECT_ROUTES = PROJECTS.map((project) => project.route);
export const PROJECT_COLORS = PROJECTS.map((project) => project.color);
