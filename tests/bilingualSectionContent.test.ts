import test from 'node:test';
import assert from 'node:assert/strict';

import { pickLocalizedText } from '../src/i18n/localization.ts';
import { resolveSectionTitle } from '../src/i18n/sectionBuilders.ts';
import {
  getAgenticDrivingPersonalizationSectionDefinition,
  getPersonalCompanionsOverviewSectionDefinition,
  getPersonalCompanionsSlideSectionDefinition,
} from '../src/pages/H5DocContentSectionTitles.ts';

function localize(language: 'zh' | 'en') {
  return (value: { zh: string; en?: string }) => pickLocalizedText(value, language);
}

test('companions section-definition selector exposes the localized title path used by the factory', () => {
  const overview = getPersonalCompanionsOverviewSectionDefinition();
  assert.equal(overview.id, 'companions-project-overview');
  assert.equal(resolveSectionTitle(overview.title, localize('zh')), '项目叙述');
  assert.equal(resolveSectionTitle(overview.title, localize('en')), 'Project Narrative');

  const slide = getPersonalCompanionsSlideSectionDefinition(4);
  assert.equal(slide.id, 'companions-slide-5');
  assert.equal(resolveSectionTitle(slide.title, localize('en')), 'Never I');

  const fallback = getPersonalCompanionsSlideSectionDefinition(999);
  assert.equal(fallback.id, 'companions-slide-2');
  assert.equal(resolveSectionTitle(fallback.title, localize('en')), 'Christmas Eve');
});

test('agentic driving section-definition selector exposes the localized title path used by migrated factories', () => {
  const slide01 = getAgenticDrivingPersonalizationSectionDefinition(1);
  assert.equal(slide01.id, 'agentic-driving-question');
  assert.equal(
    resolveSectionTitle(slide01.title, localize('en')),
    'In assisted driving, should the agent become a driving expert or a personalized driver?',
  );

  const slide07 = getAgenticDrivingPersonalizationSectionDefinition(7);
  assert.equal(slide07.id, 'agentic-driving-judgment');
  assert.equal(
    resolveSectionTitle(slide07.title, localize('zh')),
    '我的判断：agent 不是车主分身，也不是纯粹驾驶专家',
  );
});
