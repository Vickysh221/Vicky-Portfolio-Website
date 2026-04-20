import test from 'node:test';
import assert from 'node:assert/strict';

import { getLiveChromeCopy } from '../src/i18n/liveUiCopy.ts';

test('live chrome copy resolves in both languages', () => {
  const zh = getLiveChromeCopy('zh');
  const en = getLiveChromeCopy('en');

  assert.equal(zh.back, '返回');
  assert.equal(en.back, 'Back');
  assert.equal(zh.expandFullscreen, '展开全屏');
  assert.equal(en.expandFullscreen, 'Expand fullscreen');
  assert.equal(zh.exitFullscreen, '退出全屏');
  assert.equal(en.exitFullscreen, 'Exit fullscreen');
  assert.equal(zh.fullscreenHint, '点击这里可进入全屏查看');
  assert.equal(en.fullscreenHint, 'Open fullscreen for a larger reading view');
});
