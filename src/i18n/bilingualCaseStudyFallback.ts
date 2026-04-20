import type { LocalizedText } from './types.ts';

export const AI_INTERIOR_SYSTEM_INTRO_COPY = {
  pageTitle: {
    zh: 'AI 室内设计系统：从房间生成到生活场景理解',
    en: 'AI Interior Design System: from room generation to lived-scene understanding',
  },
  pageGoal: {
    zh: '说明这是一次问题重构与产品概念定义，而不是单纯的效果图生成。',
    en: 'Reframe the problem as a living-space system rather than a room generator.',
  },
  mainCopy: {
    zh: '从 0 到 1 重构 AI 室内设计系统的问题定义，提出“空间不是房间，而是生活场景容器”的产品概念，改变系统理解用户需求的方式。',
    en: 'The project turns spatial understanding into a structured product concept instead of a pure image generator.',
  },
} satisfies {
  pageTitle: LocalizedText;
  pageGoal: LocalizedText;
  mainCopy: LocalizedText;
};

export const AI_INTERIOR_SYSTEM_FALLBACK_SAMPLE = {
  pageGoal: {
    zh: '说明这是一次问题重构与产品概念定义，而不是单纯的效果图生成。',
  },
} satisfies {
  pageGoal: LocalizedText;
};

export const FULI_PLUS_INTRO_COPY = {
  pageTitle: {
    zh: 'Fuli Plus 功能演示',
    en: 'Fuli Plus Product Demo',
  },
  pageGoal: {
    zh: '在项目开头直接展示核心交互结果，用自动播放但静音的视频建立第一印象。',
    en: 'Open with the core interaction result and build the first impression through an autoplay, muted video.',
  },
  mainCopy: {
    zh: '这一页只承担一个任务：让读者先看到系统实际交付出来的设计演示。页面会根据设备性能和视口宽度在 540p 与 720p 之间做单路选择，默认静音并自动播放，但这套行为只作用在当前页，不会改动其他页面媒体的音频策略。',
    en: 'This page has one job: show the design demo the system actually ships. It selects either 540p or 720p based on device capability and viewport width, autoplays muted by default, and keeps that media behavior scoped to this page only.',
  },
} satisfies {
  pageTitle: LocalizedText;
  pageGoal: LocalizedText;
  mainCopy: LocalizedText;
};

export const PHOENIX_COMPONENT_FRAMEWORK_COPY = {
  sectionTitle: {
    zh: '组件框架',
    en: 'Component Framework',
  },
  leadCopy: {
    zh: '本文件是 Phoenix 项目的组件状态系统规范。它同时服务 Figma 设计师、前端工程师和 AI Coding Agent（Codex），目标不是仅描述 UI，而是形成一套可推导、可生成、可实现的组件系统。',
    en: 'This document defines the Phoenix component-state system. It serves Figma designers, frontend engineers, and the AI Coding Agent (Codex). The goal is not to describe UI alone, but to establish a component system that can be inferred, generated, and implemented.',
  },
} satisfies {
  sectionTitle: LocalizedText;
  leadCopy: LocalizedText;
};

export const PHOENIX_SEMANTIC_SYSTEM_SLIDE01_COPY = {
  intro: {
    zh: '这组 appendix 不再解释“页面长什么样”，而是解释系统到底如何把一句模糊输入压成三条可比较的 rug 方向。关键点不是 prompt engineering，而是 semantic compilation：先分辨确定项与含混项，再把含混项展开成几个不同的成立方式。',
    en: 'These appendices do not explain what the page looks like. They explain how the system compresses one ambiguous input into three comparable rug directions. The point is not prompt engineering, but semantic compilation: separate the certain parts from the ambiguous ones, then expand the ambiguous parts into several viable forms.',
  },
  body: {
    zh: '用户最常给出的不是完整 brief，而是混合着 mood、偏好、限制和局部想象的句子。系统不能把这类输入直接压成一句 prompt，否则三张图往往只会变成“同一路径上的微调”。第一轮真正要解决的，是把方向空间先展开出来。',
    en: 'Users usually do not provide a full brief. They give sentences mixed with mood, preference, constraints, and partial imagination. The system cannot compress that input into a single prompt, or the three outputs will just become minor variations on the same path. The first round needs to expand the direction space first.',
  },
} satisfies {
  intro: LocalizedText;
  body: LocalizedText;
};

export const PHOENIX_SEMANTIC_SYSTEM_SLIDE02_BODY_COPY = {
  zh: '这些方向差异必须最终落回 rug 的设计语言，否则“organic flow / calm structure / tactile richness”就只是好听的标签。真正有效的解释，是说明每条方向分别把 composition、motif、color restraint、material feel、surface depth 里的哪些部分推到前台。',
  en: 'These differences must ultimately map back to rug design language, or "organic flow / calm structure / tactile richness" are just attractive labels. The useful explanation is to show which parts of composition, motif, color restraint, material feel, and surface depth each direction pushes to the foreground.',
} satisfies LocalizedText;

export const PHOENIX_SEMANTIC_SYSTEM_SLIDE03_BODY_COPY = {
  zh: '这一页的任务，是把 prompt 从“方法本体”降回“外部表达层”。如果前面两页已经讲清 semantic compilation chain 和 per-direction weighting，那么这里就能顺势说明：prompt 只是把已成立的 design state 序列化给模型，而不是替系统做判断。',
  en: 'The job of this page is to move prompt back down from the “core method” to the “external expression layer.” If the previous two pages have already explained semantic compilation and per-direction weighting, this page can then show that prompt simply serializes an established design state for the model; it does not make the judgment for the system.',
} satisfies LocalizedText;
