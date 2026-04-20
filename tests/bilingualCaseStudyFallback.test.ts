import test from 'node:test';
import assert from 'node:assert/strict';

import { pickLocalizedText } from '../src/i18n/localization.ts';
import {
  BILINGUAL_CASE_STUDY_FALLBACK_SAMPLE,
  BILINGUAL_CASE_STUDY_SAMPLE,
  BILINGUAL_PHOENIX_SAMPLE,
} from '../src/i18n/bilingualCaseStudyFallback.ts';

test('case-study copy resolves in both languages and falls back to zh when en is missing', () => {
  assert.equal(pickLocalizedText(BILINGUAL_CASE_STUDY_SAMPLE.pageTitle, 'zh'), 'AI 室内设计系统：从房间生成到生活场景理解');
  assert.equal(
    pickLocalizedText(BILINGUAL_CASE_STUDY_SAMPLE.pageTitle, 'en'),
    'AI Interior Design System: from room generation to lived-scene understanding',
  );

  assert.equal(pickLocalizedText(BILINGUAL_CASE_STUDY_SAMPLE.pageGoal, 'en'), 'Reframe the problem as a living-space system rather than a room generator.');
  assert.equal(
    pickLocalizedText(BILINGUAL_CASE_STUDY_SAMPLE.mainCopy, 'en'),
    'The project turns spatial understanding into a structured product concept instead of a pure image generator.',
  );

  assert.equal(
    pickLocalizedText(BILINGUAL_CASE_STUDY_FALLBACK_SAMPLE.pageGoal, 'en'),
    pickLocalizedText(BILINGUAL_CASE_STUDY_FALLBACK_SAMPLE.pageGoal, 'zh'),
  );
});

test('migrated phoenix slide copy resolves bilingual section text', () => {
  assert.equal(
    pickLocalizedText(BILINGUAL_PHOENIX_SAMPLE.componentFramework.sectionTitle, 'en'),
    'Component Framework',
  );
  assert.equal(
    pickLocalizedText(BILINGUAL_PHOENIX_SAMPLE.componentFramework.leadingCopy, 'zh'),
    '本文件是 Phoenix 项目的组件状态系统规范。',
  );
  assert.equal(
    pickLocalizedText(BILINGUAL_PHOENIX_SAMPLE.semanticSystem.slide02.bodyCopy, 'en'),
    'These differences must ultimately map back to rug design language, or "organic flow / calm structure / tactile richness" are just attractive labels. The useful explanation is to show which parts of composition, motif, color restraint, material feel, and surface depth each direction pushes to the foreground.',
  );
});
