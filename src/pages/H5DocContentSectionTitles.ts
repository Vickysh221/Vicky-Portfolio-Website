import { createLocalizedTitle, type LocalizedSectionDefinition } from '../i18n/sectionBuilders.ts';

export const PERSONAL_COMPANIONS_SECTION_DEFINITIONS = {
  projectOverview: {
    id: 'companions-project-overview',
    numeral: '01',
    title: createLocalizedTitle('项目叙述', 'Project Narrative'),
  },
  slides: [
    {
      key: 'sceneGallery',
      id: 'companions-slide-2',
      numeral: '02',
      title: createLocalizedTitle('Live Scene Gallery', 'Live Scene Gallery'),
    },
  ],
} as const satisfies {
  projectOverview: LocalizedSectionDefinition;
  slides: readonly (LocalizedSectionDefinition & { key: string })[];
};

export function getPersonalCompanionsOverviewSectionDefinition() {
  return PERSONAL_COMPANIONS_SECTION_DEFINITIONS.projectOverview;
}

export function getPersonalCompanionsSlideSectionDefinition(slideIndex: number) {
  return PERSONAL_COMPANIONS_SECTION_DEFINITIONS.slides[slideIndex - 1]
    ?? PERSONAL_COMPANIONS_SECTION_DEFINITIONS.slides[0];
}

export const AGENTIC_DRIVING_PERSONALIZATION_SECTION_DEFINITIONS = {
  slide01: {
    id: 'agentic-driving-question',
    numeral: '01',
    title: createLocalizedTitle(
      'Agent 在辅助驾驶中：驾驶专家，还是个性化驾驶员？',
      'In assisted driving, should the agent become a driving expert or a personalized driver?',
    ),
  },
  slide02: {
    id: 'agentic-driving-industry-definition',
    numeral: '02',
    title: createLocalizedTitle(
      '真实世界里的 Agent，正在被不同厂商定义成不同的东西',
      'In the real world, the agent is being defined as different things by different companies',
    ),
  },
  slide03: {
    id: 'agentic-driving-command-critique',
    numeral: '03',
    title: createLocalizedTitle(
      '如果系统只是把模糊话语映射成动作，它和旧规则系统有什么本质区别？',
      'If the system only maps vague language into actions, how is it fundamentally different from the old rule-based system?',
    ),
  },
  slide04: {
    id: 'agentic-driving-behavior-understanding',
    numeral: '04',
    title: createLocalizedTitle(
      '真正的分水岭，不是听懂一句话，而是看懂用户在具体情境里如何驾驶',
      'The real dividing line is not understanding one sentence, but understanding how the user drives in a specific context',
    ),
  },
  slide05: {
    id: 'agentic-driving-ux-case-example',
    numeral: '05',
    title: createLocalizedTitle(
      '交互与 UX 模式：在歧义里做判断，并把判断过程变成可被人信任的协作',
      'Interaction and UX patterns: make judgments in ambiguity, and turn that judgment process into collaboration people can trust',
    ),
  },
  slide06: {
    id: 'agentic-driving-literature',
    numeral: '06',
    title: createLocalizedTitle(
      '文献给出的提醒：个性化驾驶真正难的，是行为数据如何被获取和组织',
      'What the literature reminds us: the real difficulty in personalized driving is how behavioral data is collected and organized',
    ),
  },
  slide07: {
    id: 'agentic-driving-judgment',
    numeral: '07',
    title: createLocalizedTitle(
      '我的判断：agent 不是车主分身，也不是纯粹驾驶专家',
      'My judgment: the agent is neither a proxy for the owner nor a pure driving expert',
    ),
  },
} as const satisfies Record<string, LocalizedSectionDefinition>;

export function getAgenticDrivingPersonalizationSectionDefinition(slideNumber: number) {
  const key = `slide${String(slideNumber).padStart(2, '0')}` as keyof typeof AGENTIC_DRIVING_PERSONALIZATION_SECTION_DEFINITIONS;
  return AGENTIC_DRIVING_PERSONALIZATION_SECTION_DEFINITIONS[key]
    ?? AGENTIC_DRIVING_PERSONALIZATION_SECTION_DEFINITIONS.slide01;
}

export const PERSONAL_LANGUAGE_DIARY_SLIDE04_SECTION_DEFINITIONS = {
  memoryArchitecture: {
    id: 'language-diary-memory-architecture',
    numeral: '04',
    title: createLocalizedTitle(
      '把一次表达变成长期资产 · Memory Architecture',
      'Turn a single expression into a long-term asset · Memory Architecture',
    ),
  },
} as const satisfies Record<string, LocalizedSectionDefinition>;

export const MAP_3D_SLIDE02_SECTION_DEFINITIONS = {
  problemDefinition: {
    id: 'problem-definition',
    numeral: '01',
    title: createLocalizedTitle('问题定义', 'Problem Definition'),
  },
  decisionBasis: {
    id: 'decision-basis',
    numeral: '02',
    title: createLocalizedTitle('核心判定依据', 'Core Decision Basis'),
  },
  scope: {
    id: 'scope',
    numeral: '03',
    title: createLocalizedTitle('适用范围', 'Scope'),
  },
  openRoadRules: {
    id: 'open-road-rules',
    numeral: '04',
    title: createLocalizedTitle('开放道路场景下的 SR 显示规则', 'SR Display Rules in Open-Road Scenarios'),
  },
  closedRoadRules: {
    id: 'closed-road-rules',
    numeral: '05',
    title: createLocalizedTitle('封闭 / 弱图空间下的显示关系', 'Display Priority in Closed or Weak-Map Spaces'),
  },
} as const satisfies Record<string, LocalizedSectionDefinition>;

export const MUSIC_PODCAST_SECTION_DEFINITIONS = {
  origin: {
    id: 'music-podcast-origin',
    numeral: '01',
    title: createLocalizedTitle('起因 · 我想要的是血缘，不是相似', 'Origin · I wanted bloodlines, not similarity'),
  },
  demos: {
    id: 'music-podcast-demos',
    numeral: '02',
    title: createLocalizedTitle('两期播客 · 贝斯手的故事与双主角', "Two Episodes · The Bassist's Story & Dual Protagonists"),
  },
  shuffle: {
    id: 'music-podcast-shuffle',
    numeral: '03',
    title: createLocalizedTitle('Music Shuffle · 曲目全览', 'Music Shuffle · Full Playlist'),
  },
} as const satisfies Record<string, LocalizedSectionDefinition>;
