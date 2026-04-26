import test from 'node:test';
import assert from 'node:assert/strict';

import { getHomeSceneConfig, getHomeSection, resolveHomeAction } from '../src/home/homeScenes.ts';

test('home scene defaults directly to index', () => {
  const scene = getHomeSceneConfig('aether-weave');

  assert.equal(scene.defaultState, 'index');
});

test('index state no longer transitions back to cover', () => {
  assert.equal(resolveHomeAction('aether-weave', 'index', 'back'), 'index');
});

test('relations section presents the current four-project narrative order', () => {
  const relations = getHomeSection('relations');

  assert.deepEqual(
    relations.chapters.map((chapter) => `${chapter.numeral}:${chapter.route}`),
    [
      'I:/agentic-design-development/personal-os',
      'II:/agentic-design-development/aha-moment',
      'III:/agentic-design-development/language-diary',
      'IV:/academic-gamification/companions',
    ],
  );
});
