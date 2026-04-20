import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  isLanguage,
  pickLocalizedText,
  resolveInitialLanguage,
} from '../src/i18n/localization.ts';

test('language helpers default to zh and fall back to zh when english is missing', () => {
  assert.equal(DEFAULT_LANGUAGE, 'zh');
  assert.equal(isLanguage('zh'), true);
  assert.equal(isLanguage('en'), true);
  assert.equal(isLanguage('jp'), false);
  assert.equal(pickLocalizedText({ zh: '中文', en: 'English' }, 'en'), 'English');
  assert.equal(pickLocalizedText({ zh: '仅中文' }, 'en'), '仅中文');
});

test('resolveInitialLanguage reads only valid persisted values', () => {
  const storage = new Map<string, string>();
  const mockStorage = {
    getItem(key: string) {
      return storage.get(key) ?? null;
    },
  } as Storage;

  assert.equal(resolveInitialLanguage(undefined), 'zh');
  assert.equal(resolveInitialLanguage(mockStorage), 'zh');

  storage.set(LANGUAGE_STORAGE_KEY, 'en');
  assert.equal(resolveInitialLanguage(mockStorage), 'en');

  storage.set(LANGUAGE_STORAGE_KEY, 'fr');
  assert.equal(resolveInitialLanguage(mockStorage), 'zh');
});
