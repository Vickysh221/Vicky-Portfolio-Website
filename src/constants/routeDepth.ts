import type { LocalizedText } from '../i18n/types.ts';

export const ROUTE_DEPTH: Record<string, number> = {
  "/": 0,
  "/jidu-hmi": -1000,
  "/jidu-hmi/unity3d-camera": -2000,
  "/jidu-hmi/3d-map": -3000,
  "/jidu-hmi/avp": -4000,
  "/jidu-hmi/dashboard-layout": -5000,
  "/jidu-hmi/minimap-camera": -6000,
  "/jidu-hmi/3d-map-gesture": -7000,
  "/jidu-hmi/3d-map-driving-component-states": -8000,
  "/web-design-develop": -8000,
  "/web-design-develop/overview": -9000,
  "/web-design-develop/component-framework": -10000,
  "/web-design-develop/key-pages": -11000,
  "/web-design-develop/semantic-system": -12000,
  "/web-design-develop/fuli-plus": -13000,
  "/agentic-design-development": -14000,
  "/agentic-design-development/language-diary": -15000,
  "/agentic-design-development/simo-agent-system": -16000,
  "/agentic-design-development/fuli-plus": -16500,
  "/agentic-design-development/ai-interior-system": -16600,
  "/agentic-design-development/agentic-driving": -16750,
  "/agentic-design-development/driving-authority-contracts": -16800,
  "/agentic-design-development/driving-authority-contracts/main": -16850,
  "/agentic-design-development/driving-authority-contracts/ux-case-example": -16900,
  "/academic-gamification": -17000,
  "/academic-gamification/companions": -17500,
  "/academic-gamification/simbiocity": -18000,
  "/academic-gamification/fortnite-demo": -19000,
};

export const SLIDE_COUNTS: Record<string, number> = {
  '/jidu-hmi/unity3d-camera': 4,
  '/jidu-hmi/3d-map': 4,
  '/jidu-hmi/avp': 1,
  '/jidu-hmi/dashboard-layout': 1,
  '/jidu-hmi/minimap-camera': 1,
  '/jidu-hmi/3d-map-gesture': 1,
  '/jidu-hmi/3d-map-driving-component-states': 3,

  '/web-design-develop/overview': 1,
  '/web-design-develop/component-framework': 1,
  '/web-design-develop/key-pages': 1,
  '/web-design-develop/semantic-system': 1,
  '/web-design-develop/fuli-plus': 11,

  '/agentic-design-development/language-diary': 5,
  '/agentic-design-development/simo-agent-system': 2,
  '/agentic-design-development/fuli-plus': 12,
  '/agentic-design-development/ai-interior-system': 2,
  '/agentic-design-development/agentic-driving': 7,
  '/agentic-design-development/driving-authority-contracts/main': 1,
  '/agentic-design-development/driving-authority-contracts/ux-case-example': 1,
  '/academic-gamification/companions': 8,

  '/academic-gamification/simbiocity': 1,
  '/academic-gamification/fortnite-demo': 1,
};

export function getSlideCount(route: string): number {
  return SLIDE_COUNTS[route] ?? 1;
}

export interface PageMeta {
  title: LocalizedText;
  subtitle: LocalizedText;
  year: string;
  desc: LocalizedText;
  parent: string | null;
  color: string;
  subPages?: { route: string; label: LocalizedText; numeral: string; disabled?: boolean }[];
  inlineChildRoute?: string;
}

export const PAGE_META: Record<string, PageMeta> = {
  "/jidu-hmi": {
    title: { zh: '座舱 HMI 设计', en: 'Cockpit HMI Design' },
    subtitle: { zh: 'JIDU Automotive · ADAS HMI Design', en: 'JIDU Automotive · ADAS HMI Design' },
    year: "2022–2024",
    desc: {
      zh: "Designed the 3D virtual camera architecture, gesture system, and autonomous driving UX states for JIDU's in-car HMI. Prototyped directly in Unity3D.",
      en: "Designed the 3D virtual camera architecture, gesture system, and autonomous driving UX states for JIDU's in-car HMI. Prototyped directly in Unity3D.",
    },
    parent: null,
    color: "#c8a96e",
    subPages: [
      { route: "/jidu-hmi/unity3d-camera", label: { zh: '3D地图一镜到底系统', en: 'Continuous 3D Map Camera System' }, numeral: "I" },
      { route: "/jidu-hmi/3d-map", label: { zh: '2/3D地图融合策略概念', en: '2D/3D Map Fusion Strategy Concept' }, numeral: "II" },
      { route: "/jidu-hmi/avp", label: { zh: 'AVP自动泊车体设计和原型开发', en: 'AVP Product Design and Prototype Development' }, numeral: "III" },
      { route: "/jidu-hmi/dashboard-layout", label: { zh: '驾驶区布局和驾驶状态原型设计', en: 'Driving-Zone Layout and Driving-State Prototype Design' }, numeral: "IV" },
      { route: "/jidu-hmi/minimap-camera", label: { zh: 'SLAM小地图策略', en: 'SLAM Minimap Strategy' }, numeral: "V" },
      { route: "/jidu-hmi/3d-map-gesture", label: { zh: '3D地图手势系统', en: '3D Map Gesture System' }, numeral: "VI" },
      { route: "/jidu-hmi/3d-map-driving-component-states", label: { zh: '3D地图和驾驶组件状态设计', en: '3D Map and Driving Component State Design' }, numeral: "VII" },
    ],
  },
  "/jidu-hmi/unity3d-camera": {
    title: { zh: '3D地图一镜到底系统', en: 'Continuous 3D Map Camera System' },
    subtitle: { zh: 'JIDU HMI · Camera Architecture', en: 'JIDU HMI · Camera Architecture' },
    year: "2022–2024",
    desc: {
      zh: 'Multi-state virtual camera rig for 3D navigation maps — lens interruption logic, spatial continuity across driving modes, and dynamic FOV transitions.',
      en: 'Multi-state virtual camera rig for 3D navigation maps — lens interruption logic, spatial continuity across driving modes, and dynamic FOV transitions.',
    },
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/3d-map": {
    title: { zh: '2/3D地图融合策略概念', en: '2D/3D Map Fusion Strategy Concept' },
    subtitle: { zh: 'JIDU HMI · Map Design', en: 'JIDU HMI · Map Design' },
    year: "2022–2024",
    desc: {
      zh: 'Fusing perception data, map data, and navigation info into a unified spatial interface — element hierarchy, display rules, and transition strategies.',
      en: 'Fusing perception data, map data, and navigation info into a unified spatial interface — element hierarchy, display rules, and transition strategies.',
    },
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/avp": {
    title: { zh: 'AVP自动泊车体设计和原型开发', en: 'AVP Product Design and Prototype Development' },
    subtitle: { zh: 'JIDU HMI · Low-Speed ADAS', en: 'JIDU HMI · Low-Speed ADAS' },
    year: "2022–2024",
    desc: {
      zh: 'Gamified interaction for user-marked parking spots: path learning, auto-routing, spot selection, and automated parking via screen-space controls.',
      en: 'Gamified interaction for user-marked parking spots: path learning, auto-routing, spot selection, and automated parking via screen-space controls.',
    },
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/dashboard-layout": {
    title: { zh: '驾驶区布局和驾驶状态原型设计', en: 'Driving-Zone Layout and Driving-State Prototype Design' },
    subtitle: { zh: 'JIDU HMI · Dashboard Layout', en: 'JIDU HMI · Dashboard Layout' },
    year: "2022–2024",
    desc: {
      zh: '面向辅助驾驶场景的仪表信息布局与 3D 地图屏幕位置方案设计，结合方向盘形态与驾驶视线偏好，验证驾驶区信息呈现的最优区域。',
      en: 'Instrument information layout and 3D map screen placement for assisted-driving scenarios, validated against steering-wheel geometry and driver sightline preferences to find the best display region.',
    },
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/minimap-camera": {
    title: { zh: 'SLAM小地图策略', en: 'SLAM Minimap Strategy' },
    subtitle: { zh: 'JIDU HMI · Map UI', en: 'JIDU HMI · Map UI' },
    year: "2022–2024",
    desc: {
      zh: 'Screen-space and world-space mapping rules for HMI elements within the 3D scene — composition, layout logic, and element positioning.',
      en: 'Screen-space and world-space mapping rules for HMI elements within the 3D scene — composition, layout logic, and element positioning.',
    },
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/3d-map-gesture": {
    title: { zh: '3D地图手势系统', en: '3D Map Gesture System' },
    subtitle: { zh: 'JIDU HMI · Interaction Design', en: 'JIDU HMI · Interaction Design' },
    year: "2022–2024",
    desc: {
      zh: 'Custom 3D gesture system translating touch input (tap, swipe, pinch, rotate) into scene interactions — pan, zoom, rotate, and custom lens extension.',
      en: 'Custom 3D gesture system translating touch input (tap, swipe, pinch, rotate) into scene interactions — pan, zoom, rotate, and custom lens extension.',
    },
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/3d-map-driving-component-states": {
    title: { zh: '3D地图和驾驶组件状态设计', en: '3D Map and Driving Component State Design' },
    subtitle: { zh: 'JIDU HMI · Component State Design', en: 'JIDU HMI · Component State Design' },
    year: "2022–2024",
    desc: {
      zh: 'State design documentation for 3D map components and driving-related UI elements, covering display logic, transitions, and interaction coordination across multiple scenarios.',
      en: 'State design documentation for 3D map components and driving-related UI elements, covering display logic, transitions, and interaction coordination across multiple scenarios.',
    },
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/web-design-develop": {
    title: { zh: 'AI coding 网页设计和开发', en: 'AI Coding Web Design and Development' },
    subtitle: { zh: 'Web Design Develop', en: 'Web Design Develop' },
    year: "2025",
    desc: {
      zh: 'Architected a generative 3D interior design pipeline — upload, analyze, edit, render. Async task polling, rollback mechanisms, multi-tenant asset isolation.',
      en: 'Architected a generative 3D interior design pipeline — upload, analyze, edit, render. Async task polling, rollback mechanisms, multi-tenant asset isolation.',
    },
    parent: null,
    color: "#7a9e8e",
    subPages: [
      { route: "/web-design-develop/component-framework", label: { zh: '组件框架', en: 'Component Framework' }, numeral: "II" },
      { route: "/web-design-develop/key-pages", label: { zh: '关键页面', en: 'Key Pages' }, numeral: "III" },
    ],
  },
  "/web-design-develop/overview": {
    title: { zh: 'Platform Overview', en: 'Platform Overview' },
    subtitle: { zh: 'Web Design Develop · Architecture', en: 'Web Design Develop · Architecture' },
    year: "2025",
    desc: {
      zh: 'SaaS architecture supporting multi-tenant asset isolation and reuse. Full 3D floor plan generation pipeline from upload to rendered output.',
      en: 'SaaS architecture supporting multi-tenant asset isolation and reuse. Full 3D floor plan generation pipeline from upload to rendered output.',
    },
    parent: "/web-design-develop",
    color: "#7a9e8e",
  },
  "/web-design-develop/component-framework": {
    title: { zh: '组件框架', en: 'Component Framework' },
    subtitle: { zh: 'Web Design Develop · Design System', en: 'Web Design Develop · Design System' },
    year: "2025",
    desc: {
      zh: "Three.js + Vue3 + TypeScript component architecture for 3D rendering — shared with engineering team to unify the product's design and development language.",
      en: "Three.js + Vue3 + TypeScript component architecture for 3D rendering — shared with engineering team to unify the product's design and development language.",
    },
    parent: "/web-design-develop",
    color: "#7a9e8e",
  },
  "/web-design-develop/key-pages": {
    title: { zh: '关键页面', en: 'Key Pages' },
    subtitle: { zh: 'Web Design Develop · Core Flows', en: 'Web Design Develop · Core Flows' },
    year: "2025",
    desc: {
      zh: '2D/3D hybrid interaction flows — state-machine-driven generation steps that are controllable, interruptible, and revertible with full history.',
      en: '2D/3D hybrid interaction flows — state-machine-driven generation steps that are controllable, interruptible, and revertible with full history.',
    },
    parent: "/web-design-develop",
    color: "#7a9e8e",
  },
  "/web-design-develop/semantic-system": {
    title: { zh: 'Method Appendix', en: 'Method Appendix' },
    subtitle: { zh: 'Web Design Develop · Semantic Compilation Logic', en: 'Web Design Develop · Semantic Compilation Logic' },
    year: "2025",
    desc: {
      zh: 'Method appendix for the rug-generation system — how vague user input is compiled into three comparable design directions, translated into rug language, and only then serialized into prompts.',
      en: 'Method appendix for the rug-generation system — how vague user input is compiled into three comparable design directions, translated into rug language, and only then serialized into prompts.',
    },
    parent: "/web-design-develop",
    color: "#7a9e8e",
  },
  "/web-design-develop/fuli-plus": {
    title: { zh: '面向地毯生成的AI协作设计系统', en: 'AI Collaborative Design System for Rug Generation' },
    subtitle: { zh: 'Agentic Design & Development · AI Agent', en: 'Agentic Design & Development · AI Agent' },
    year: "2025",
    desc: {
      zh: '把用户模糊语言、参考图和反馈转译成可比较、可迭代 rug 设计方向的 AI 语义编译与 refinement 系统。',
      en: 'An AI semantic compilation and refinement system that translates vague user language, references, and feedback into comparable, iterable rug design directions.',
    },
    parent: "/web-design-develop",
    color: "#7a9e8e",
  },

  "/agentic-design-development": {
    title: { zh: 'My String Figure Player - Being with AI', en: 'My String Figure Player - Being with AI' },
    subtitle: { zh: 'AI Agent Product Design · Prototyping', en: 'AI Agent Product Design · Prototyping' },
    year: "2024–2025",
    desc: {
      zh: 'Selected explorations in agent product design, interactive prototyping, and AI-native experience building across concept, system design, and implementation.',
      en: 'Selected explorations in agent product design, interactive prototyping, and AI-native experience building across concept, system design, and implementation.',
    },
    parent: null,
    color: "#8b7db5",
    subPages: [
      { route: "/agentic-design-development/language-diary", label: { zh: 'A Ritual of Expression - 语言学习陪伴多智能体系统', en: 'A Ritual of Expression - Multi-Agent System for Language Learning Companionship' }, numeral: "I" },
      { route: "/agentic-design-development/fuli-plus", label: { zh: '面向地毯生成的AI协作设计系统', en: 'AI Collaborative Design System for Rug Generation' }, numeral: "II" },
      { route: "/agentic-design-development/driving-authority-contracts", label: { zh: '当车开始像同伴一样观察人时', en: 'When the Car Starts Observing Like a Companion' }, numeral: "III" },
      { route: "/agentic-design-development/agentic-driving", label: { zh: '驾驶专家，还是个性化驾驶员？', en: 'Driving Expert, or Personalized Driver?' }, numeral: "IV" },
      { route: "/agentic-design-development/simo-agent-system", label: { zh: 'SIMO Agent System 概念设计', en: 'SIMO Agent System Concept Design' }, numeral: "V" },
      { route: "/web-design-develop", label: { zh: 'AI coding 网页设计和开发', en: 'AI Coding Web Design and Development' }, numeral: "VI" },
      { route: "/agentic-design-development/ai-interior-system", label: { zh: 'AI 室内设计系统的问题重构与交互定义', en: 'Problem Reframing and Interaction Definition for an AI Interior Design System' }, numeral: "VII" },
    ],
  },
  "/agentic-design-development/ai-interior-system": {
    title: { zh: 'AI 室内设计系统的问题重构与交互定义', en: 'Problem Reframing and Interaction Definition for an AI Interior Design System' },
    subtitle: { zh: 'Agentic Design & Development · Spatial Semantics', en: 'Agentic Design & Development · Spatial Semantics' },
    year: "2025",
    desc: {
      zh: '从 0 到 1 重构 AI 室内设计系统的问题定义，把空间理解成生活场景容器，并建立用户 / 空间 / 家具三层语义中间层。',
      en: 'A from-scratch reframing of the AI interior design problem: treating space as a container for lived scenarios and defining a three-layer semantic intermediary for user, space, and furniture.',
    },
    parent: "/agentic-design-development",
    color: "#8b7db5",
  },
  "/agentic-design-development/language-diary": {
    title: { zh: 'A Ritual of Expression - 语言学习陪伴多智能体系统', en: 'A Ritual of Expression - Multi-Agent System for Language Learning Companionship' },
    subtitle: { zh: 'Agentic Design & Development · AI Agent', en: 'Agentic Design & Development · AI Agent' },
    year: "2025",
    desc: {
      zh: 'Low-friction AI companion for language acquisition through journaling. Multi-agent architecture: intent parsing, knowledge intervention, long-term memory.',
      en: 'Low-friction AI companion for language acquisition through journaling. Multi-agent architecture: intent parsing, knowledge intervention, long-term memory.',
    },
    parent: "/agentic-design-development",
    color: "#8b7db5",
  },
  "/agentic-design-development/simo-agent-system": {
    title: { zh: 'SIMO Agent System 概念设计', en: 'SIMO Agent System Concept Design' },
    subtitle: { zh: 'JIDU 4.0 · Agent Platform Concept', en: 'JIDU 4.0 · Agent Platform Concept' },
    year: "2024",
    desc: {
      zh: '一个面向车机场景的多智能体平台概念：把 agent 的身份、能力组织、应用生态与创建流程统一到沉浸式系统表达中。',
      en: 'A multi-agent platform concept for cabin scenarios, unifying agent identity, capability composition, app ecosystem, and creation flow within one immersive system expression.',
    },
    parent: "/agentic-design-development",
    color: "#8b7db5",
  },
  "/agentic-design-development/fuli-plus": {
    title: { zh: '面向地毯生成的AI协作设计系统', en: 'AI Collaborative Design System for Rug Generation' },
    subtitle: { zh: 'Agentic Design & Development · AI Agent', en: 'Agentic Design & Development · AI Agent' },
    year: "2025",
    desc: {
      zh: '把用户模糊语言、参考图和反馈转译成可比较、可迭代 rug 设计方向的 AI 语义编译与 refinement 系统。',
      en: 'An AI semantic compilation and refinement system that translates vague user language, references, and feedback into comparable, iterable rug design directions.',
    },
    parent: "/agentic-design-development",
    color: "#8b7db5",
  },
  "/agentic-design-development/agentic-driving": {
    title: { zh: 'Agent 在辅助驾驶中：驾驶专家，还是个性化驾驶员？', en: 'Agents in Assisted Driving: Driving Expert, or Personalized Driver?' },
    subtitle: { zh: 'Agent in Driving · Personalized Collaboration Under Safety Constraints', en: 'Agent in Driving · Personalized Collaboration Under Safety Constraints' },
    year: "2025",
    desc: {
      zh: '一个连接 ADAS / HMI 经验与 agent 思考的研究型章节：讨论驾驶 agent 的价值是否来自命令理解，还是来自安全边界内对具体用户驾驶行为的长期理解与校准。',
      en: "A research chapter connecting ADAS/HMI practice with agent thinking, asking whether a driving agent's value comes from command understanding or from long-term calibration to a specific user's driving behavior within safety constraints.",
    },
    parent: "/agentic-design-development",
    color: "#8b7db5",
  },
  "/agentic-design-development/driving-authority-contracts": {
    title: { zh: '当车开始像同伴一样观察人时', en: 'When the Car Starts Observing Like a Companion' },
    subtitle: { zh: 'Driving UX · Safety Interface, Permission Interface, Learning Interface', en: 'Driving UX · Safety Interface, Permission Interface, Learning Interface' },
    year: "2025",
    desc: {
      zh: '把车内 HMI 重新理解成一套分权机制：当车开始观察人，界面同时变成安全界面、权限界面与学习界面，需要重新设计注意力、解释权与决策权如何在系统与人之间分配。',
      en: 'A reframing of in-car HMI as a power-allocation mechanism: once the car starts observing the user, the interface becomes a safety interface, permission interface, and learning interface at once, requiring a redesign of how attention, explanation, and decision rights are distributed.',
    },
    parent: "/agentic-design-development",
    color: "#8b7db5",
    subPages: [
      { route: "/agentic-design-development/driving-authority-contracts/main", label: { zh: '分权机制与交互合同', en: 'Authority Allocation and Interaction Contracts' }, numeral: "I" },
      { route: "/agentic-design-development/driving-authority-contracts/ux-case-example", label: { zh: '安全、权限与学习界面', en: 'Safety, Permission, and Learning Interfaces' }, numeral: "II" },
    ],
  },
  "/agentic-design-development/driving-authority-contracts/main": {
    title: { zh: '当车开始像同伴一样观察人时', en: 'When the Car Starts Observing Like a Companion' },
    subtitle: { zh: 'Driving UX · Authority Allocation and Interaction Contracts', en: 'Driving UX · Authority Allocation and Interaction Contracts' },
    year: "2025",
    desc: {
      zh: '关于车内 agent 分权的主体思考：当驾驶 automation interface 与 companion interaction 被理解成同一套注意力仲裁器时，HMI 需要同时承担安全、权限与学习三种界面职责。',
      en: 'A core argument about authority allocation for in-car agents: when driving automation interfaces and companion interaction are understood as one shared attention arbiter, HMI must take on safety, permission, and learning responsibilities at the same time.',
    },
    parent: "/agentic-design-development/driving-authority-contracts",
    color: "#8b7db5",
  },
  "/agentic-design-development/driving-authority-contracts/ux-case-example": {
    title: { zh: '把车载 HMI 从驾驶界面，推进成安全界面、权限界面和学习界面', en: 'Advancing In-Car HMI from a Driving Interface to Safety, Permission, and Learning Interfaces' },
    subtitle: { zh: 'Driving UX · Trust Allocation, Memory Governance, Agent Collaboration', en: 'Driving UX · Trust Allocation, Memory Governance, Agent Collaboration' },
    year: "2025",
    desc: {
      zh: '以车载 Agent 为前提，重新定义 HMI 的三重职责：在高风险时承担安全界面，在自动判断时成为权限界面，在系统学习用户时变成学习界面，把判断过程本身设计成可被信任的协作。',
      en: 'With an in-car agent as the premise, this reframes HMI around three duties: a safety interface in high-risk moments, a permission interface during automated judgment, and a learning interface while the system adapts to the user, turning judgment itself into a trustworthy collaboration.',
    },
    parent: "/agentic-design-development/driving-authority-contracts",
    color: "#8b7db5",
  },

  "/academic-gamification": {
    title: { zh: 'Have a cup of tea with AI', en: 'Have a Cup of Tea with AI' },
    subtitle: { zh: '进入伙伴们的音乐世界吧', en: "Step Into the Companions' Musical World" },
    year: "2024",
    desc: {
      zh: 'Academic and exploratory works focused on game systems, simulated worlds, and spatial interaction prototypes developed through a gamification lens.',
      en: 'Academic and exploratory works focused on game systems, simulated worlds, and spatial interaction prototypes developed through a gamification lens.',
    },
    parent: null,
    color: "#6f8f92",
    inlineChildRoute: "/academic-gamification/companions",
    subPages: [
      { route: "/academic-gamification/companions", label: { zh: '进入伙伴们的音乐世界吧', en: "Step Into the Companions' Musical World" }, numeral: "I" },
    ],
  },
  "/academic-gamification/companions": {
    title: { zh: '进入伙伴们的音乐世界吧', en: "Step Into the Companions' Musical World" },
    subtitle: { zh: 'Have a cup of tea with AI', en: 'Have a Cup of Tea with AI' },
    year: "2024",
    desc: {
      zh: 'A sequence of companion-world video sketches collected under Have a cup of tea with AI, focusing on atmosphere, relation, and small emotional worlds.',
      en: 'A sequence of companion-world video sketches collected under Have a Cup of Tea with AI, focusing on atmosphere, relation, and small emotional worlds.',
    },
    parent: "/academic-gamification",
    color: "#6f8f92",
  },
  "/academic-gamification/simbiocity": {
    title: { zh: 'Simbiocity', en: 'Simbiocity' },
    subtitle: { zh: 'Academic Works of Gamification · Urban Simulation', en: 'Academic Works of Gamification · Urban Simulation' },
    year: "2024",
    desc: {
      zh: 'Procedural city generation with agent-based simulation — growing neighborhoods, evolving infrastructure, and emergent urban patterns.',
      en: 'Procedural city generation with agent-based simulation — growing neighborhoods, evolving infrastructure, and emergent urban patterns.',
    },
    parent: "/academic-gamification",
    color: "#6f8f92",
  },
  "/academic-gamification/fortnite-demo": {
    title: { zh: 'Fortnite Demo', en: 'Fortnite Demo' },
    subtitle: { zh: 'Academic Works of Gamification · Game Design', en: 'Academic Works of Gamification · Game Design' },
    year: "2024",
    desc: {
      zh: 'A custom Fortnite Creative experience demonstrating spatial design principles — pacing, sightlines, and encounter design in a battle royale context.',
      en: 'A custom Fortnite Creative experience demonstrating spatial design principles — pacing, sightlines, and encounter design in a battle royale context.',
    },
    parent: "/academic-gamification",
    color: "#6f8f92",
  },
};
