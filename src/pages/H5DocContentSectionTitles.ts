import { createLocalizedTitle, createMirroredTitle } from '../i18n/sectionBuilders.ts';

export const PERSONAL_COMPANIONS_SECTION_TITLES = {
  projectOverview: createLocalizedTitle('项目叙述', 'Project Narrative'),
  slides: [
    createMirroredTitle('Christmas Eve'),
    createMirroredTitle('Green'),
    createMirroredTitle('Dancing'),
    createMirroredTitle('Never I'),
    createMirroredTitle('Never II'),
    createMirroredTitle('Night Car'),
    createMirroredTitle('Submarine'),
  ],
} as const;

export const AGENTIC_DRIVING_PERSONALIZATION_SECTION_TITLES = {
  slide01: createLocalizedTitle(
    'Agent 在辅助驾驶中：驾驶专家，还是个性化驾驶员？',
    'In assisted driving, should the agent become a driving expert or a personalized driver?',
  ),
  slide02: createLocalizedTitle(
    '真实世界里的 Agent，正在被不同厂商定义成不同的东西',
    'In the real world, the agent is being defined as different things by different companies',
  ),
  slide03: createLocalizedTitle(
    '如果系统只是把模糊话语映射成动作，它和旧规则系统有什么本质区别？',
    'If the system only maps vague language into actions, how is it fundamentally different from the old rule-based system?',
  ),
  slide04: createLocalizedTitle(
    '真正的分水岭，不是听懂一句话，而是看懂用户在具体情境里如何驾驶',
    'The real dividing line is not understanding one sentence, but understanding how the user drives in a specific context',
  ),
  slide05: createLocalizedTitle(
    '交互与 UX 模式：在歧义里做判断，并把判断过程变成可被人信任的协作',
    'Interaction and UX patterns: make judgments in ambiguity, and turn that judgment process into collaboration people can trust',
  ),
  slide06: createLocalizedTitle(
    '文献给出的提醒：个性化驾驶真正难的，是行为数据如何被获取和组织',
    'What the literature reminds us: the real difficulty in personalized driving is how behavioral data is collected and organized',
  ),
  slide07: createLocalizedTitle(
    '我的判断：agent 不是车主分身，也不是纯粹驾驶专家',
    'My judgment: the agent is neither a proxy for the owner nor a pure driving expert',
  ),
} as const;

export const PERSONAL_LANGUAGE_DIARY_SLIDE04_SECTION_TITLES = {
  memoryArchitecture: createLocalizedTitle(
    '把一次表达变成长期资产 · Memory Architecture',
    'Turn a single expression into a long-term asset · Memory Architecture',
  ),
} as const;

export const MAP_3D_SLIDE02_SECTION_TITLES = {
  problemDefinition: createLocalizedTitle('问题定义', 'Problem Definition'),
  decisionBasis: createLocalizedTitle('核心判定依据', 'Core Decision Basis'),
  scope: createLocalizedTitle('适用范围', 'Scope'),
  openRoadRules: createLocalizedTitle('开放道路场景下的 SR 显示规则', 'SR Display Rules in Open-Road Scenarios'),
  closedRoadRules: createLocalizedTitle('封闭 / 弱图空间下的显示关系', 'Display Priority in Closed or Weak-Map Spaces'),
} as const;
