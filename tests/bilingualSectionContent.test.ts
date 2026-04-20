import test from 'node:test';
import assert from 'node:assert/strict';

import { pickLocalizedText } from '../src/i18n/localization.ts';
import {
  AGENTIC_DRIVING_PERSONALIZATION_SECTION_TITLES,
  PERSONAL_COMPANIONS_SECTION_TITLES,
} from '../src/pages/H5DocContentSectionTitles.ts';

test('migrated slide section title metadata stays bilingual and raw-node compatible', () => {
  assert.equal(pickLocalizedText(PERSONAL_COMPANIONS_SECTION_TITLES.projectOverview, 'zh'), '项目叙述');
  assert.equal(pickLocalizedText(PERSONAL_COMPANIONS_SECTION_TITLES.projectOverview, 'en'), 'Project Narrative');

  assert.equal(
    pickLocalizedText(AGENTIC_DRIVING_PERSONALIZATION_SECTION_TITLES.slide01, 'en'),
    'In assisted driving, should the agent become a driving expert or a personalized driver?',
  );
});
