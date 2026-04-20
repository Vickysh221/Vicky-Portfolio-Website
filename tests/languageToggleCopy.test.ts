import test from 'node:test';
import assert from 'node:assert/strict';

import { UI_COPY } from '../src/i18n/uiCopy.ts';
import { pickLocalizedText } from '../src/i18n/localization.ts';

test('shared UI copy resolves in both languages with zh fallback', () => {
  assert.equal(pickLocalizedText(UI_COPY.about, 'zh'), 'ABOUT');
  assert.equal(pickLocalizedText(UI_COPY.about, 'en'), 'ABOUT');
  assert.equal(pickLocalizedText(UI_COPY.selectedWorks, 'zh'), '精选作品');
  assert.equal(pickLocalizedText(UI_COPY.selectedWorks, 'en'), 'Selected Works');
  assert.equal(pickLocalizedText(UI_COPY.comingSoon, 'en'), 'Coming Soon');
});
