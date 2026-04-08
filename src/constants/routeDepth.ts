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
  "/academic-gamification": -17000,
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
  '/web-design-develop/fuli-plus': 6,

  '/agentic-design-development/language-diary': 5,
  '/agentic-design-development/simo-agent-system': 1,
  '/agentic-design-development/fuli-plus': 6,

  '/academic-gamification/simbiocity': 1,
  '/academic-gamification/fortnite-demo': 1,
};

export function getSlideCount(route: string): number {
  return SLIDE_COUNTS[route] ?? 1;
}

export interface PageMeta {
  title: string;
  subtitle: string;
  year: string;
  desc: string;
  parent: string | null;
  color: string;
  subPages?: { route: string; label: string; numeral: string; disabled?: boolean }[];
}

export const PAGE_META: Record<string, PageMeta> = {
  "/jidu-hmi": {
    title: "座舱 HMI 设计",
    subtitle: "JIDU Automotive · ADAS HMI Design",
    year: "2022–2024",
    desc: "Designed the 3D virtual camera architecture, gesture system, and autonomous driving UX states for JIDU's in-car HMI. Prototyped directly in Unity3D.",
    parent: null,
    color: "#c8a96e",
    subPages: [
      { route: "/jidu-hmi/unity3d-camera", label: "3D地图一镜到底系统", numeral: "I" },
      { route: "/jidu-hmi/3d-map", label: "2/3D地图融合策略概念", numeral: "II" },
      { route: "/jidu-hmi/avp", label: "AVP自动泊车体设计和原型开发", numeral: "III" },
      { route: "/jidu-hmi/dashboard-layout", label: "驾驶区布局和驾驶状态原型设计", numeral: "IV" },
      { route: "/jidu-hmi/minimap-camera", label: "SLAM小地图策略", numeral: "V" },
      { route: "/jidu-hmi/3d-map-gesture", label: "3D地图手势系统", numeral: "VI" },
      { route: "/jidu-hmi/3d-map-driving-component-states", label: "3D地图和驾驶组件状态设计", numeral: "VII" },
    ],
  },
  "/jidu-hmi/unity3d-camera": {
    title: "3D地图一镜到底系统",
    subtitle: "JIDU HMI · Camera Architecture",
    year: "2022–2024",
    desc: "Multi-state virtual camera rig for 3D navigation maps — lens interruption logic, spatial continuity across driving modes, and dynamic FOV transitions.",
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/3d-map": {
    title: "2/3D地图融合策略概念",
    subtitle: "JIDU HMI · Map Design",
    year: "2022–2024",
    desc: "Fusing perception data, map data, and navigation info into a unified spatial interface — element hierarchy, display rules, and transition strategies.",
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/avp": {
    title: "AVP自动泊车体设计和原型开发",
    subtitle: "JIDU HMI · Low-Speed ADAS",
    year: "2022–2024",
    desc: "Gamified interaction for user-marked parking spots: path learning, auto-routing, spot selection, and automated parking via screen-space controls.",
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/dashboard-layout": {
    title: "驾驶区布局和驾驶状态原型设计",
    subtitle: "JIDU HMI · Dashboard Layout",
    year: "2022–2024",
    desc: "面向辅助驾驶场景的仪表信息布局与 3D 地图屏幕位置方案设计，结合方向盘形态与驾驶视线偏好，验证驾驶区信息呈现的最优区域。",
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/minimap-camera": {
    title: "SLAM小地图策略",
    subtitle: "JIDU HMI · Map UI",
    year: "2022–2024",
    desc: "Screen-space and world-space mapping rules for HMI elements within the 3D scene — composition, layout logic, and element positioning.",
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/3d-map-gesture": {
    title: "3D地图手势系统",
    subtitle: "JIDU HMI · Interaction Design",
    year: "2022–2024",
    desc: "Custom 3D gesture system translating touch input (tap, swipe, pinch, rotate) into scene interactions — pan, zoom, rotate, and custom lens extension.",
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/3d-map-driving-component-states": {
    title: "3D地图和驾驶组件状态设计",
    subtitle: "JIDU HMI · Component State Design",
    year: "2022–2024",
    desc: "State design documentation for 3D map components and driving-related UI elements, covering display logic, transitions, and interaction coordination across multiple scenarios.",
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/web-design-develop": {
    title: "AI coding 网页设计和开发",
    subtitle: "Web Design Develop",
    year: "2025",
    desc: "Architected a generative 3D interior design pipeline — upload, analyze, edit, render. Async task polling, rollback mechanisms, multi-tenant asset isolation.",
    parent: null,
    color: "#7a9e8e",
    subPages: [
      { route: "/web-design-develop/key-pages", label: "关键页面", numeral: "I" },
      { route: "/web-design-develop/component-framework", label: "组件框架", numeral: "II" },
    ],
  },
  "/web-design-develop/overview": {
    title: "Platform Overview",
    subtitle: "Web Design Develop · Architecture",
    year: "2025",
    desc: "SaaS architecture supporting multi-tenant asset isolation and reuse. Full 3D floor plan generation pipeline from upload to rendered output.",
    parent: "/web-design-develop",
    color: "#7a9e8e",
  },
  "/web-design-develop/component-framework": {
    title: "组件框架",
    subtitle: "Web Design Develop · Design System",
    year: "2025",
    desc: "Three.js + Vue3 + TypeScript component architecture for 3D rendering — shared with engineering team to unify the product's design and development language.",
    parent: "/web-design-develop",
    color: "#7a9e8e",
  },
  "/web-design-develop/key-pages": {
    title: "关键页面",
    subtitle: "Web Design Develop · Core Flows",
    year: "2025",
    desc: "2D/3D hybrid interaction flows — state-machine-driven generation steps that are controllable, interruptible, and revertible with full history.",
    parent: "/web-design-develop",
    color: "#7a9e8e",
  },
  "/web-design-develop/semantic-system": {
    title: "Semantic System",
    subtitle: "Web Design Develop · UI Language",
    year: "2025",
    desc: "Semantic token system and visual language for AI-generated content states — loading, success, error, and intervention feedback across the product.",
    parent: "/web-design-develop",
    color: "#7a9e8e",
  },
  "/web-design-develop/fuli-plus": {
    title: "面向地毯生成的AI协作设计系统",
    subtitle: "Agentic Design & Development · AI Agent",
    year: "2025",
    desc: "把用户模糊语言、参考图和反馈转译成可比较、可迭代 rug 设计方向的 AI 语义编译与 refinement 系统。",
    parent: "/agentic-design-development",
    color: "#8b7db5",
  },

  "/agentic-design-development": {
    title: "智能体设计与开发",
    subtitle: "AI Agent Product Design · Prototyping",
    year: "2024–2025",
    desc: "Selected explorations in agent product design, interactive prototyping, and AI-native experience building across concept, system design, and implementation.",
    parent: null,
    color: "#8b7db5",
    subPages: [
      { route: "/agentic-design-development/fuli-plus", label: "面向地毯生成的AI协作设计系统", numeral: "I" },
      { route: "/agentic-design-development/language-diary", label: "A Ritual of Expression - 语言学习陪伴多智能体系统", numeral: "II" },
      { route: "/agentic-design-development/simo-agent-system", label: "SIMO Agent System 概念设计", numeral: "III" },
    ],
  },
  "/agentic-design-development/language-diary": {
    title: "A Ritual of Expression - 语言学习陪伴多智能体系统",
    subtitle: "Agentic Design & Development · AI Agent",
    year: "2025",
    desc: "Low-friction AI companion for language acquisition through journaling. Multi-agent architecture: intent parsing, knowledge intervention, long-term memory.",
    parent: "/agentic-design-development",
    color: "#8b7db5",
  },
  "/agentic-design-development/simo-agent-system": {
    title: "SIMO Agent System 概念设计",
    subtitle: "JIDU 4.0 · Agent Platform Concept",
    year: "2024",
    desc: "Full-screen laboratory concept for a vehicle-embedded agent ecosystem. MBTI-personalized agent identities and a platform-level SIMO Agent System interaction paradigm.",
    parent: "/agentic-design-development",
    color: "#8b7db5",
  },
  "/agentic-design-development/fuli-plus": {
    title: "面向地毯生成的AI协作设计系统",
    subtitle: "Agentic Design & Development · AI Agent",
    year: "2025",
    desc: "把用户模糊语言、参考图和反馈转译成可比较、可迭代 rug 设计方向的 AI 语义编译与 refinement 系统。",
    parent: "/agentic-design-development",
    color: "#8b7db5",
  },

  "/academic-gamification": {
    title: "学术作品和个人项目 - 游戏化",
    subtitle: "Game Systems · Interactive Prototypes",
    year: "2024",
    desc: "Academic and exploratory works focused on game systems, simulated worlds, and spatial interaction prototypes developed through a gamification lens.",
    parent: null,
    color: "#6f8f92",
    subPages: [
      { route: "/academic-gamification/simbiocity", label: "Simbiocity", numeral: "I" },
      { route: "/academic-gamification/fortnite-demo", label: "Fortnite Demo", numeral: "II" },
    ],
  },
  "/academic-gamification/simbiocity": {
    title: "Simbiocity",
    subtitle: "Academic Works of Gamification · Urban Simulation",
    year: "2024",
    desc: "Procedural city generation with agent-based simulation — growing neighborhoods, evolving infrastructure, and emergent urban patterns.",
    parent: "/academic-gamification",
    color: "#6f8f92",
  },
  "/academic-gamification/fortnite-demo": {
    title: "Fortnite Demo",
    subtitle: "Academic Works of Gamification · Game Design",
    year: "2024",
    desc: "A custom Fortnite Creative experience demonstrating spatial design principles — pacing, sightlines, and encounter design in a battle royale context.",
    parent: "/academic-gamification",
    color: "#6f8f92",
  },
};
