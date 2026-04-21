import { PROJECTS, type ProjectEntry } from '../projectRegistry.ts';
import type { LocalizedText } from '../i18n/types.ts';

export type HomeSceneKey = 'aether-weave';
export type HomeStateKey = 'cover' | 'index';
export type HomeActionType = 'background-activate' | 'advance' | 'back' | 'open-project';
export type HomeSectionKey = 'relations' | 'creation' | 'trust';
const PROJECT_PHASE_INDEX: Record<string, number> = {
  '/agentic-design-development': 1,
  '/academic-gamification': 5,
  '/jidu-hmi': 4,
};

export interface HomeSectionChapter {
  route: string;
  label: LocalizedText;
  numeral: string;
}

export interface HomeIndexSection {
  key: HomeSectionKey;
  title: LocalizedText;
  subtitle: LocalizedText;
  descriptionTitle: LocalizedText;
  body: LocalizedText;
  phaseProjectRoute: string;
  chapters: HomeSectionChapter[];
}

export interface HomeBackgroundVisualPatch {
  cameraZOffset: number;
  noiseMultiplier: number;
  starOpacity: number;
  rotationScale: number;
}

export interface HomeStateConfig {
  key: HomeStateKey;
  visual: HomeBackgroundVisualPatch;
  actions?: Partial<Record<HomeActionType, HomeStateKey>>;
}

export interface HomeSceneConfig {
  key: HomeSceneKey;
  defaultState: HomeStateKey;
  defaultSectionKey: HomeSectionKey;
  states: Record<HomeStateKey, HomeStateConfig>;
}

function getProjectOrThrow(route: string): ProjectEntry {
  const project = PROJECTS.find((entry) => entry.route === route);
  if (!project) {
    throw new Error(`Missing project for route: ${route}`);
  }
  return project;
}

function getSubPageOrThrow(projectRoute: string, subPageRoute: string): HomeSectionChapter {
  const subPage = getProjectOrThrow(projectRoute).subPages.find((entry) => entry.route === subPageRoute);
  if (!subPage) {
    throw new Error(`Missing subpage for route: ${subPageRoute}`);
  }
  return {
    route: subPage.route,
    label: subPage.label,
    numeral: subPage.numeral,
  };
}

export const HOME_INDEX_SECTIONS: Record<HomeSectionKey, HomeIndexSection> = {
  relations: {
    key: 'relations',
    title: { zh: '关系', en: 'Relations' },
    subtitle: { zh: 'Agentic Thinking as a Mean', en: 'Agentic Thinking as a Means' },
    descriptionTitle: { zh: '在持续生成之中设计关系', en: 'Designing Relations Within Ongoing Becoming' },
    body: {
      zh: '在 agent 逐渐进入日常之后，设计所面对的对象，已经不再只是人与工具之间的单一交互，而是一组持续生成中的关系网络。人、语言、记忆、情绪、生活片段，以及作为新行动实体出现的 agents，共同参与着一种“成为彼此”的过程。这里的 UX 不再只是为任务搭建路径，而是去辨认那些过去未被照亮、却始终在场的关联：人如何通过技术重新组织自我，关系如何因新的主体加入而获得新的密度，意义又如何在多方参与中被重新编织。“string figure player” 在这里并不是一个比喻性的身份，而是一种工作方法：在不断交错的线索之间，设计关系被感知、被维持、被激活的方式。作品因此成为关系的切片，也是对 ontology 如何进入设计的一次持续实验。',
      en: 'As agents enter everyday life, design is no longer dealing with a single interaction between a person and a tool, but with a continuously generated network of relations. People, language, memory, emotion, fragments of life, and agents as new actors all participate in a process of becoming with one another. UX here is not just about building task paths, but about recognizing relations that were always present yet rarely illuminated: how people reorganize themselves through technology, how relationships gain new density when new subjects join them, and how meaning is rewoven through multi-party participation. "String figure player" is therefore not merely a metaphorical identity, but a working method: designing how relations are perceived, maintained, and activated amid constantly crossing threads. Each work becomes a slice of relation, and an ongoing experiment in how ontology enters design.',
    },
    phaseProjectRoute: '/agentic-design-development',
    chapters: [
      { ...getSubPageOrThrow('/agentic-design-development', '/agentic-design-development/language-diary'), numeral: 'I' },
      { ...getSubPageOrThrow('/agentic-design-development', '/agentic-design-development/personal-os'), numeral: 'II' },
      { ...getSubPageOrThrow('/academic-gamification', '/academic-gamification/companions'), numeral: 'III' },
    ],
  },
  creation: {
    key: 'creation',
    title: { zh: '创造', en: 'Creation' },
    subtitle: { zh: 'Agentic Design as to the End', en: 'Agentic Design Toward Emergence' },
    descriptionTitle: { zh: '通过创造性系统让世界逐渐成形', en: 'Letting Worlds Take Shape Through Creative Systems' },
    body: {
      zh: '如果说 agent 让什么发生了变化，那或许并不是“创造”本身，而是创造被触发、被延展、被共享的方式。那些原本散落于生活中的模糊感受、未完成的念头、难以表达的偏好，开始在新的系统条件下被召集、被组织，并形成一种 ongoing worlding。创造不再只是少数人的能力证明，而逐渐成为一种可以被参与、被进入、被反复开启的经验。在这样的条件下，设计所处理的，不只是如何让人完成创作，而是如何为创造本身提供一种可居住的范式：让灵感得以停留，让反馈能够转化，让不确定性不被过早压平，让生成过程本身成为体验的一部分。这里的作品既是结果，也是创造发生时留下的结构痕迹。',
      en: 'If agents have changed anything, it may not be creation itself, but the way creation is triggered, extended, and shared. Vague feelings, unfinished thoughts, and hard-to-express preferences once scattered across everyday life can now be gathered, organized, and turned into an ongoing worlding under new system conditions. Creation is no longer only proof of a few people’s abilities, but increasingly an experience that others can enter, participate in, and reopen repeatedly. In that condition, design is not only about helping someone finish a work, but about providing a habitable paradigm for creation itself: letting inspiration linger, letting feedback transform, resisting premature flattening of uncertainty, and making the generative process itself part of the experience. The works here are both outcomes and structural traces left behind as creation happens.',
    },
    phaseProjectRoute: '/academic-gamification',
    chapters: [
      getSubPageOrThrow('/agentic-design-development', '/agentic-design-development/fuli-plus'),
      getSubPageOrThrow('/agentic-design-development', '/agentic-design-development/simo-agent-system'),
      getSubPageOrThrow('/agentic-design-development', '/agentic-design-development/ai-interior-system'),
    ],
  },
  trust: {
    key: 'trust',
    title: { zh: '信任', en: 'Trust' },
    subtitle: { zh: 'Autonomous HMI Design', en: 'Autonomous HMI Design' },
    descriptionTitle: { zh: '编排注意力、不确定性与预期', en: 'Orchestrating Attention, Uncertainty, and Expectation' },
    body: {
      zh: '在更早的人机协作场景里，信任已经不是一个抽象命题，而是一种必须被精密编排的设计现实。以座舱 HMI 为代表的系统中，机器并非稳定、透明、全知的存在；它总是在多事件、多信号源、不同置信度与真实技术边界之间做出判断。设计需要处理的，因此不是“如何展示功能”，而是如何在复杂环境中编排注意力，如何表现机器认知的有限性，如何让用户在持续互动中逐渐形成对系统行为的预期。信任并不来自一次性说明，而来自反复而克制的交互秩序：何时前置、何时退后，何时强调机器所见，何时暴露其不确定性，何时将判断权重新交还给人。对我而言，这一阶段的 HMI 实践，是对上一代人机协作模式的一次方法性探索，也为今天的 agent 设计留下了重要的问题意识：设计如何让复杂系统在真实世界中变得可理解、可预期、可持续协作。',
      en: 'In earlier human-machine collaboration contexts, trust was no longer an abstract topic but a design reality that had to be orchestrated precisely. In cockpit HMI systems, the machine is never stable, transparent, or all-knowing; it makes judgments across multiple events, signal sources, confidence levels, and technical limits. The design problem therefore is not simply how to show functionality, but how to orchestrate attention in complexity, how to express the limits of machine cognition, and how to help users form expectations about system behavior through ongoing interaction. Trust does not come from one-off explanation, but from a repeated and restrained interaction order: when to foreground, when to step back, when to emphasize what the machine sees, when to expose its uncertainty, and when to return judgment to the human. For me, this stage of HMI practice was a methodological exploration of a previous generation of human-machine collaboration, and it left behind an important set of questions for today’s agent design: how design can make complex systems understandable, predictable, and sustainably collaborative in the real world.',
    },
    phaseProjectRoute: '/jidu-hmi',
    chapters: getProjectOrThrow('/jidu-hmi').subPages.map((subPage) => ({
      route: subPage.route,
      label: subPage.label,
      numeral: subPage.numeral,
    })),
  },
};

export const HOME_SCENES: Record<HomeSceneKey, HomeSceneConfig> = {
  'aether-weave': {
    key: 'aether-weave',
    defaultState: 'index',
    defaultSectionKey: 'relations',
    states: {
      cover: {
        key: 'cover',
        visual: {
          cameraZOffset: 0,
          noiseMultiplier: 1,
          starOpacity: 0.12,
          rotationScale: 1,
        },
        actions: {
          'background-activate': 'index',
          advance: 'index',
        },
      },
      index: {
        key: 'index',
        visual: {
          cameraZOffset: -1.4,
          noiseMultiplier: 1.08,
          starOpacity: 0.16,
          rotationScale: 0.78,
        },
        actions: {
          'open-project': 'index',
          'background-activate': 'index',
        },
      },
    },
  },
};

export function getHomeSceneConfig(sceneKey: HomeSceneKey): HomeSceneConfig {
  return HOME_SCENES[sceneKey];
}

export function getHomeSection(sectionKey: HomeSectionKey): HomeIndexSection {
  return HOME_INDEX_SECTIONS[sectionKey];
}

export function getHomeSectionByProjectRoute(route: string): HomeIndexSection {
  return Object.values(HOME_INDEX_SECTIONS).find((section) => section.phaseProjectRoute === route) ?? HOME_INDEX_SECTIONS.relations;
}

export function getProjectByRoute(route: string): ProjectEntry | null {
  return PROJECTS.find((project) => project.route === route) ?? null;
}

export function resolveHomeAction(
  sceneKey: HomeSceneKey,
  stateKey: HomeStateKey,
  action: HomeActionType,
): HomeStateKey {
  const scene = getHomeSceneConfig(sceneKey);
  return scene.states[stateKey].actions?.[action] ?? stateKey;
}

export function getHomeProjectPhaseIndex(route: string): number {
  return PROJECT_PHASE_INDEX[route] ?? 1;
}
