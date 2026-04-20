import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { pickLocalizedText } from '../src/i18n/localization.ts';
import {
  AGENTIC_DRIVING_PERSONALIZATION_SECTION_DEFINITIONS,
  PERSONAL_COMPANIONS_SECTION_DEFINITIONS,
} from '../src/pages/H5DocContentSectionTitles.ts';

const testsDir = path.dirname(fileURLToPath(import.meta.url));

function readSource(relativePath: string): string {
  return readFileSync(path.resolve(testsDir, '..', relativePath), 'utf8');
}

test('migrated section definitions stay bilingual and raw-node compatible', () => {
  assert.equal(pickLocalizedText(PERSONAL_COMPANIONS_SECTION_DEFINITIONS.projectOverview.title, 'zh'), '项目叙述');
  assert.equal(pickLocalizedText(PERSONAL_COMPANIONS_SECTION_DEFINITIONS.projectOverview.title, 'en'), 'Project Narrative');

  assert.equal(
    pickLocalizedText(AGENTIC_DRIVING_PERSONALIZATION_SECTION_DEFINITIONS.slide01.title, 'en'),
    'In assisted driving, should the agent become a driving expert or a personalized driver?',
  );
});

test('migrated factories and H5 section rendering stay wired to shared localized definitions', () => {
  const companionsSource = readSource('src/pages/H5DocContentPersonalCompanions.tsx');
  assert.match(companionsSource, /PERSONAL_COMPANIONS_SECTION_DEFINITIONS/);
  assert.match(companionsSource, /const sectionDefinition = PERSONAL_COMPANIONS_SECTION_DEFINITIONS\.slides\[companionIndex\]/);
  assert.match(companionsSource, /\.\.\.sectionDefinition,/);
  assert.doesNotMatch(companionsSource, /type CompanionSlide = \{\s*title:/s);

  const drivingSource = readSource('src/pages/H5DocContentAgenticDrivingPersonalization.tsx');
  assert.match(drivingSource, /\.\.\.AGENTIC_DRIVING_PERSONALIZATION_SECTION_DEFINITIONS\.slide01,/);

  const contentSource = readSource('src/pages/H5DocContent.tsx');
  assert.match(contentSource, /resolveSectionTitle\(section\.title,\s*text\)/);
});
