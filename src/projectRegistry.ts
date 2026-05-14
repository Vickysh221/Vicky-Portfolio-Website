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
const jiduAttentionOntologyPreview = new URL('./images/covers/thumbs/cover-jidu-attention-ontology.png', import.meta.url).href;
const jiduResponsibilityLanguagePreview = new URL('./images/covers/thumbs/cover-jidu-responsibility-language.png', import.meta.url).href;
const avpPreview = new URL('./images/covers/thumbs/cover-avp.jpg', import.meta.url).href;
const slamPreview = new URL('./images/covers/thumbs/cover-slam.jpg', import.meta.url).href;
const gesturePreview = new URL('./images/covers/thumbs/cover-gesture.jpg', import.meta.url).href;
const interiorPreview = new URL('./images/covers/thumbs/cover-interior.jpg', import.meta.url).href;

export interface SubPagePreviewMedia {
  src?: string;
  type: 'image' | 'video' | 'terminal';
  poster?: string;
  terminalText?: string;
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
        route: '/agentic-design-development/aha-moment',
        label: {
          zh: '共享记忆驱动的语言学习 Aha 时刻',
          en: 'Shared-Memory Aha Moments for Language Learning',
        },
        numeral: 'II',
        previewMedia: { src: diaryAgentPreview, type: 'image' },
      },
      {
        route: '/agentic-design-development/fuli-plus',
        label: { zh: '面向地毯生成的AI协作设计系统', en: 'AI Collaborative Design System for Rug Generation' },
        numeral: 'III',
        previewMedia: { src: fuliPreview, type: 'image' },
      },
      {
        route: '/agentic-design-development/driving-authority-contracts',
        label: { zh: '当车开始像同伴一样观察人时', en: 'When the Car Starts Observing Like a Companion' },
        numeral: 'IV',
        previewMedia: { src: driverInfoPreview, type: 'image' },
      },
      {
        route: '/agentic-design-development/agentic-driving',
        label: { zh: '驾驶专家，还是个性化驾驶员？', en: 'Driving Expert, or Personalized Driver?' },
        numeral: 'V',
        previewMedia: { src: jiduAgentPreview, type: 'image' },
      },
      {
        route: '/agentic-design-development/simo-agent-system',
        label: { zh: 'SIMO Agent System 概念设计', en: 'SIMO Agent System Concept Design' },
        numeral: 'VI',
        previewMedia: { src: phoenixPreview, type: 'image' },
      },
      {
        route: '/agentic-design-development/ai-interior-system',
        label: {
          zh: 'AI 室内设计系统的问题重构与交互定义',
          en: 'Problem Reframing and Interaction Definition for an AI Interior Design System',
        },
        numeral: 'VII',
        previewMedia: { src: interiorPreview, type: 'image' },
      },
      {
        route: '/agentic-design-development/personal-os',
        label: { zh: 'personal OS 的探索进行时', en: 'Personal OS: An Ongoing Exploration' },
        numeral: 'VIII',
        previewMedia: { type: 'terminal', terminalText: 'personalOS' },
      },
      {
        route: '/agentic-design-development/music-podcast',
        label: { zh: '基于关联的私人音乐播客平台', en: 'A Private Music Podcast Platform Built on Associations' },
        numeral: 'IX',
        previewMedia: { type: 'image', src: '/music-podcast/musicPOD.png' },
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
        label: {
          zh: '共驾地图：让车始终以连续视角观察世界',
          en: 'Co-Driving Map: Linking Scenarios Through a Single Continuous View',
        },
        numeral: 'I',
        previewMedia: { src: unityCameraPreview, type: 'image' },
      },
      {
        route: '/jidu-hmi/3d-map',
        label: {
          zh: '机器世界模型：把环境理解推到前台',
          en: 'Machine World Model: Bringing Environmental Understanding to the Frontstage',
        },
        numeral: 'II',
        previewMedia: { src: map3d2dPreview, type: 'video', poster: map3d2dPreviewPoster },
      },
      {
        route: '/jidu-hmi/3d-map-driving-component-states',
        label: {
          zh: '注意力本体：用线、块、点翻译机器认知',
          en: 'Attention Ontology: Translating Machine Cognition Into Lines, Blocks, and Points',
        },
        numeral: 'III',
        previewMedia: { src: jiduAttentionOntologyPreview, type: 'image' },
      },
      {
        route: '/jidu-hmi/dashboard-layout',
        label: {
          zh: '责任语言：说明谁主导、何时接管',
          en: 'Responsibility Language: Showing Who Leads and When to Take Over',
        },
        numeral: 'IV',
        previewMedia: { src: jiduResponsibilityLanguagePreview, type: 'image' },
      },
      {
        route: '/jidu-hmi/avp',
        label: {
          zh: 'AVP 协作模型：在机器执行中保留人的判断',
          en: 'AVP Collaboration Model: Keeping Human Judgment Inside Machine Execution',
        },
        numeral: 'V',
        previewMedia: { src: avpPreview, type: 'image' },
      },
      {
        route: '/jidu-hmi/3d-map-gesture',
        label: {
          zh: '共享视角：让人进入机器的观察方式',
          en: "Shared Perspective: Letting the Human Enter the Machine's View",
        },
        numeral: 'VI',
        previewMedia: { src: gesturePreview, type: 'image' },
      },
      {
        route: '/jidu-hmi/minimap-camera',
        label: {
          zh: '空间证据：用 SLAM 小地图确认局部环境',
          en: 'Spatial Evidence: Confirming Local Context Through the SLAM Minimap',
        },
        numeral: 'VII',
        previewMedia: { src: slamPreview, type: 'image' },
      },
    ],
  },
];

export const PROJECT_ROUTES = PROJECTS.map((project) => project.route);
export const PROJECT_COLORS = PROJECTS.map((project) => project.color);
