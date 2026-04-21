import test from 'node:test';
import assert from 'node:assert/strict';

import {
  FALLBACK_BOT_SCENE_MAP,
  PORTFOLIO_HIDDEN_BOT_IDS,
  PORTFOLIO_VISIBLE_FALLBACK_BOT_SCENE_MAP,
} from '../src/musikNacht/data/botSceneMap.ts';

test('portfolio musik-nacht gallery hides the configured scene subset', () => {
  const visibleBotIds = new Set(PORTFOLIO_VISIBLE_FALLBACK_BOT_SCENE_MAP.map((entry) => entry.botId));
  const allBotIds = new Set(FALLBACK_BOT_SCENE_MAP.map((entry) => entry.botId));

  for (const hiddenBotId of PORTFOLIO_HIDDEN_BOT_IDS) {
    assert.equal(allBotIds.has(hiddenBotId), true, `Expected hidden bot ${hiddenBotId} to exist in the full scene map`);
    assert.equal(visibleBotIds.has(hiddenBotId), false, `Hidden bot ${hiddenBotId} should not be visible in the portfolio`);
  }
});

test('portfolio musik-nacht gallery starts from いつも雨', () => {
  assert.equal(PORTFOLIO_VISIBLE_FALLBACK_BOT_SCENE_MAP[0]?.botId, 'clawd-rain-waiter');
  assert.equal(PORTFOLIO_VISIBLE_FALLBACK_BOT_SCENE_MAP[0]?.songTitle, 'いつも雨');
});
