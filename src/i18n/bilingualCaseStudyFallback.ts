import type { LocalizedText } from './types.ts';

export const BILINGUAL_CASE_STUDY_SAMPLE: {
  pageTitle: LocalizedText;
  pageGoal: LocalizedText;
  mainCopy: LocalizedText;
} = {
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
};

export const BILINGUAL_CASE_STUDY_FALLBACK_SAMPLE: {
  pageGoal: LocalizedText;
} = {
  pageGoal: {
    zh: '说明这是一次问题重构与产品概念定义，而不是单纯的效果图生成。',
  },
};

export const BILINGUAL_PHOENIX_SAMPLE = {
  componentFramework: {
    sectionTitle: {
      zh: '组件框架',
      en: 'Component Framework',
    },
    leadingCopy: {
      zh: '本文件是 Phoenix 项目的组件状态系统规范。',
      en: 'This document is the Phoenix component-state system specification.',
    },
  },
  semanticSystem: {
    slide02: {
      bodyCopy: {
        zh: '这些方向差异必须最终落回 rug 的设计语言，否则“organic flow / calm structure / tactile richness”就只是好听的标签。真正有效的解释，是说明每条方向分别把 composition、motif、color restraint、material feel、surface depth 里的哪些部分推到前台。',
        en: 'These differences must ultimately map back to rug design language, or "organic flow / calm structure / tactile richness" are just attractive labels. The useful explanation is to show which parts of composition, motif, color restraint, material feel, and surface depth each direction pushes to the foreground.',
      },
    },
  },
} as const;
