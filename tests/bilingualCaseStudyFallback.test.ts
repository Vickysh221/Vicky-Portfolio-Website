import test from 'node:test';
import assert from 'node:assert/strict';

import { normalizeLocalizedText, pickLocalizedText } from '../src/i18n/localization.ts';
import {
  AI_INTERIOR_SYSTEM_FALLBACK_SAMPLE,
  AI_INTERIOR_SYSTEM_INTRO_COPY,
  FULI_PLUS_INTRO_COPY,
  PHOENIX_COMPONENT_FRAMEWORK_COPY,
  PHOENIX_SEMANTIC_SYSTEM_SLIDE02_BODY_COPY,
} from '../src/i18n/bilingualCaseStudyFallback.ts';

test('case-study copy resolves in both languages and falls back to zh when en is missing', () => {
  assert.equal(
    pickLocalizedText(AI_INTERIOR_SYSTEM_INTRO_COPY.pageTitle, 'zh'),
    'AI 室内设计系统：从房间生成到生活场景理解',
  );
  assert.equal(
    pickLocalizedText(AI_INTERIOR_SYSTEM_INTRO_COPY.pageTitle, 'en'),
    'AI Interior Design System: from room generation to lived-scene understanding',
  );
  assert.equal(
    pickLocalizedText(FULI_PLUS_INTRO_COPY.pageGoal, 'en'),
    'Open with the core interaction result and build the first impression through an autoplay, muted video.',
  );
  assert.equal(
    pickLocalizedText(FULI_PLUS_INTRO_COPY.mainCopy, 'zh'),
    '这一页只承担一个任务：让读者先看到系统实际交付出来的设计演示。页面会根据设备性能和视口宽度在 540p 与 720p 之间做单路选择，默认静音并自动播放，但这套行为只作用在当前页，不会改动其他页面媒体的音频策略。',
  );
  assert.equal(
    pickLocalizedText(AI_INTERIOR_SYSTEM_FALLBACK_SAMPLE.pageGoal, 'en'),
    pickLocalizedText(AI_INTERIOR_SYSTEM_FALLBACK_SAMPLE.pageGoal, 'zh'),
  );
  assert.equal(
    pickLocalizedText(normalizeLocalizedText('仅中文的块级文案'), 'en'),
    '仅中文的块级文案',
  );
});

test('migrated phoenix section/body copy resolves through bilingual data', () => {
  assert.equal(
    pickLocalizedText(PHOENIX_COMPONENT_FRAMEWORK_COPY.sectionTitle, 'en'),
    'Component Framework',
  );
  assert.equal(
    pickLocalizedText(PHOENIX_COMPONENT_FRAMEWORK_COPY.leadCopy, 'zh'),
    '本文件是 Phoenix 项目的组件状态系统规范。它同时服务 Figma 设计师、前端工程师和 AI Coding Agent（Codex），目标不是仅描述 UI，而是形成一套可推导、可生成、可实现的组件系统。',
  );
  assert.equal(
    pickLocalizedText(PHOENIX_SEMANTIC_SYSTEM_SLIDE02_BODY_COPY, 'en'),
    'These differences must ultimately map back to rug design language, or "organic flow / calm structure / tactile richness" are just attractive labels. The useful explanation is to show which parts of composition, motif, color restraint, material feel, and surface depth each direction pushes to the foreground.',
  );
});
