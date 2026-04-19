import test from 'node:test';
import assert from 'node:assert/strict';

import { getHomeSceneConfig, resolveHomeAction } from '../src/home/homeScenes.ts';

test('home scene defaults directly to index', () => {
  const scene = getHomeSceneConfig('aether-weave');

  assert.equal(scene.defaultState, 'index');
});

test('index state no longer transitions back to cover', () => {
  assert.equal(resolveHomeAction('aether-weave', 'index', 'back'), 'index');
});
