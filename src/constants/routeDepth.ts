export const ROUTE_DEPTH: Record<string, number> = {
  "/": 0,
  "/jidu-hmi": -1000,
  "/jidu-hmi/unity3d-camera": -2000,
  "/jidu-hmi/3d-map": -3000,
  "/jidu-hmi/avp": -4000,
  "/jidu-hmi/minimap-camera": -5000,
  "/jidu-hmi/3d-map-gesture": -6000,
  "/jidu-hmi/simo-agent-parks": -7000,
  "/phoenix-ai": -8000,
  "/phoenix-ai/overview": -9000,
  "/phoenix-ai/component-framework": -10000,
  "/phoenix-ai/key-pages": -11000,
  "/phoenix-ai/semantic-system": -12000,
  "/phoenix-ai/fuli-plus": -13000,
  "/personal": -14000,
  "/personal/simbiocity": -15000,
  "/personal/fortnite-demo": -16000,
  "/personal/language-diary": -17000,
};

export const SLIDE_COUNTS: Record<string, number> = {
  '/jidu-hmi/unity3d-camera': 5,
  '/jidu-hmi/3d-map': 4,
  '/jidu-hmi/avp': 1,
  '/jidu-hmi/minimap-camera': 1,
  '/jidu-hmi/3d-map-gesture': 1,
  '/jidu-hmi/simo-agent-parks': 1,

  '/phoenix-ai/overview': 1,
  '/phoenix-ai/component-framework': 1,
  '/phoenix-ai/key-pages': 1,
  '/phoenix-ai/semantic-system': 1,
  '/phoenix-ai/fuli-plus': 3,

  '/personal/simbiocity': 1,
  '/personal/fortnite-demo': 1,
  '/personal/language-diary': 5,
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
  subPages?: { route: string; label: string; numeral: string }[];
}

export const PAGE_META: Record<string, PageMeta> = {
  "/jidu-hmi": {
    title: "JIDU HMI",
    subtitle: "JIDU Automotive · HMI Design",
    year: "2022–2024",
    desc: "Designed the 3D virtual camera architecture, gesture system, and autonomous driving UX states for JIDU's in-car HMI. Prototyped directly in Unity3D.",
    parent: null,
    color: "#c8a96e",
    subPages: [
      { route: "/jidu-hmi/unity3d-camera", label: "Unity3D Camera System", numeral: "I" },
      { route: "/jidu-hmi/3d-map", label: "3D Map Strategy", numeral: "II" },
      { route: "/jidu-hmi/avp", label: "AVP Auto-Park", numeral: "III" },
      { route: "/jidu-hmi/minimap-camera", label: "Minimap Camera", numeral: "IV" },
      { route: "/jidu-hmi/3d-map-gesture", label: "3D Map Gestures", numeral: "V" },
      { route: "/jidu-hmi/simo-agent-parks", label: "SIMO Agent Parks", numeral: "VI" },
    ],
  },
  "/jidu-hmi/unity3d-camera": {
    title: "Unity3D Camera System",
    subtitle: "JIDU HMI · Camera Architecture",
    year: "2022–2024",
    desc: "Multi-state virtual camera rig for 3D navigation maps — lens interruption logic, spatial continuity across driving modes, and dynamic FOV transitions.",
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/3d-map": {
    title: "3D Map Strategy",
    subtitle: "JIDU HMI · Map Design",
    year: "2022–2024",
    desc: "Fusing perception data, map data, and navigation info into a unified spatial interface — element hierarchy, display rules, and transition strategies.",
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/avp": {
    title: "AVP Auto-Park",
    subtitle: "JIDU HMI · Low-Speed ADAS",
    year: "2022–2024",
    desc: "Gamified interaction for user-marked parking spots: path learning, auto-routing, spot selection, and automated parking via screen-space controls.",
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/minimap-camera": {
    title: "Minimap Camera",
    subtitle: "JIDU HMI · Map UI",
    year: "2022–2024",
    desc: "Screen-space and world-space mapping rules for HMI elements within the 3D scene — composition, layout logic, and element positioning.",
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/3d-map-gesture": {
    title: "3D Map Gestures",
    subtitle: "JIDU HMI · Interaction Design",
    year: "2022–2024",
    desc: "Custom 3D gesture system translating touch input (tap, swipe, pinch, rotate) into scene interactions — pan, zoom, rotate, and custom lens extension.",
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },
  "/jidu-hmi/simo-agent-parks": {
    title: "SIMO Agent Parks",
    subtitle: "JIDU 4.0 · Agent Platform",
    year: "2024",
    desc: "Full-screen laboratory concept for a vehicle-embedded agent ecosystem. MBTI-personalized agent identities and an Agent Parks interaction paradigm.",
    parent: "/jidu-hmi",
    color: "#c8a96e",
  },

  "/phoenix-ai": {
    title: "Phoenix AI Platform",
    subtitle: "Phoenix AI · SaaS Platform",
    year: "2025",
    desc: "Architected a generative 3D interior design pipeline — upload, analyze, edit, render. Async task polling, rollback mechanisms, multi-tenant asset isolation.",
    parent: null,
    color: "#7a9e8e",
    subPages: [
      { route: "/phoenix-ai/overview", label: "Platform Overview", numeral: "I" },
      { route: "/phoenix-ai/component-framework", label: "Component Framework", numeral: "II" },
      { route: "/phoenix-ai/key-pages", label: "Key Pages", numeral: "III" },
      { route: "/phoenix-ai/semantic-system", label: "Semantic System", numeral: "IV" },
      { route: "/phoenix-ai/fuli-plus", label: "Fuli+ Agent", numeral: "V" },
    ],
  },
  "/phoenix-ai/overview": {
    title: "Platform Overview",
    subtitle: "Phoenix AI · Architecture",
    year: "2025",
    desc: "SaaS architecture supporting multi-tenant asset isolation and reuse. Full 3D floor plan generation pipeline from upload to rendered output.",
    parent: "/phoenix-ai",
    color: "#7a9e8e",
  },
  "/phoenix-ai/component-framework": {
    title: "Component Framework",
    subtitle: "Phoenix AI · Design System",
    year: "2025",
    desc: "Three.js + Vue3 + TypeScript component architecture for 3D rendering — shared with engineering team to unify the product's design and development language.",
    parent: "/phoenix-ai",
    color: "#7a9e8e",
  },
  "/phoenix-ai/key-pages": {
    title: "Key Pages",
    subtitle: "Phoenix AI · Core Flows",
    year: "2025",
    desc: "2D/3D hybrid interaction flows — state-machine-driven generation steps that are controllable, interruptible, and revertible with full history.",
    parent: "/phoenix-ai",
    color: "#7a9e8e",
  },
  "/phoenix-ai/semantic-system": {
    title: "Semantic System",
    subtitle: "Phoenix AI · UI Language",
    year: "2025",
    desc: "Semantic token system and visual language for AI-generated content states — loading, success, error, and intervention feedback across the product.",
    parent: "/phoenix-ai",
    color: "#7a9e8e",
  },
  "/phoenix-ai/fuli-plus": {
    title: "Fuli+ Agent",
    subtitle: "Phoenix AI · AI Agent",
    year: "2025",
    desc: "Conversational agent decomposing carpet design intent (style, color, pattern) into structured generation parameters via multi-turn slot-based NLU dialogue.",
    parent: "/phoenix-ai",
    color: "#7a9e8e",
  },

  "/personal": {
    title: "Personal Projects",
    subtitle: "Independent Work",
    year: "2024–2025",
    desc: "Side projects exploring AI agent architecture, procedural city generation, and game design — built for learning, curiosity, and fun.",
    parent: null,
    color: "#8b7db5",
    subPages: [
      { route: "/personal/simbiocity", label: "Simbiocity", numeral: "I" },
      { route: "/personal/fortnite-demo", label: "Fortnite Demo", numeral: "II" },
      { route: "/personal/language-diary", label: "Language Diary Agent", numeral: "III" },
    ],
  },
  "/personal/simbiocity": {
    title: "Simbiocity",
    subtitle: "Personal · Urban Simulation",
    year: "2024",
    desc: "Procedural city generation with agent-based simulation — growing neighborhoods, evolving infrastructure, and emergent urban patterns.",
    parent: "/personal",
    color: "#8b7db5",
  },
  "/personal/fortnite-demo": {
    title: "Fortnite Demo",
    subtitle: "Personal · Game Design",
    year: "2024",
    desc: "A custom Fortnite Creative experience demonstrating spatial design principles — pacing, sightlines, and encounter design in a battle royale context.",
    parent: "/personal",
    color: "#8b7db5",
  },
  "/personal/language-diary": {
    title: "Language Diary Agent",
    subtitle: "Personal · AI Agent",
    year: "2025",
    desc: "Low-friction AI companion for language acquisition through journaling. Multi-agent architecture: intent parsing, knowledge intervention, long-term memory.",
    parent: "/personal",
    color: "#8b7db5",
  },
};
