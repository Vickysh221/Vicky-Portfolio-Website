import test from 'node:test';
import assert from 'node:assert/strict';

import { pickLocalizedText } from '../src/i18n/localization.ts';
import { getPersonalCompanionsSlideSections } from '../src/pages/H5DocContentPersonalCompanions.tsx';
import { getAgenticDrivingPersonalizationSlide01Sections } from '../src/pages/H5DocContentAgenticDrivingPersonalization.tsx';

test('section builders expose bilingual titles for migrated slides', () => {
  const companionSections = getPersonalCompanionsSlideSections(0, false);
  assert.equal(pickLocalizedText(companionSections[0].title, 'zh'), '项目叙述');
  assert.equal(pickLocalizedText(companionSections[0].title, 'en'), 'Project Narrative');

  const drivingSections = getAgenticDrivingPersonalizationSlide01Sections('#8b7db5');
  assert.equal(
    pickLocalizedText(drivingSections[0].title, 'en'),
    'In assisted driving, should the agent become a driving expert or a personalized driver?',
  );
});
