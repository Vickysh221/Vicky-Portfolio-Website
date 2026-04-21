import test from 'node:test';
import assert from 'node:assert/strict';

import {
  resolveLocalAudioFallbackSource,
  shouldUseLocalAudioFallback,
} from '../src/musikNacht/localAudioFallback.ts';

test('maps the bundled portfolio audio assets for local fallback songs', () => {
  assert.equal(
    resolveLocalAudioFallbackSource({ originalId: 1364351242 }),
    '/audio/haru-o-matte-never-young-beach.m4a',
  );
  assert.equal(
    resolveLocalAudioFallbackSource({ originalId: 1364351247 }),
    '/audio/itsumo-ame-never-young-beach.m4a',
  );
  assert.equal(resolveLocalAudioFallbackSource({ originalId: 1435628297 }), null);
});

test('only uses the bundled audio fallback when bridge playback fails for a mapped song', () => {
  assert.equal(
    shouldUseLocalAudioFallback(
      { originalId: 1364351242 },
      { responseOk: false, message: '请先登录实名账号，执行 ncm-cli login 完成登录' },
    ),
    true,
  );
  assert.equal(
    shouldUseLocalAudioFallback(
      { originalId: 1364351247 },
      { responseOk: false, message: '请先登录实名账号，执行 ncm-cli login 完成登录' },
    ),
    true,
  );
  assert.equal(
    shouldUseLocalAudioFallback(
      { originalId: 1364351247 },
      { responseOk: false, message: '未连上本地 bridge' },
    ),
    true,
  );
  assert.equal(
    shouldUseLocalAudioFallback(
      { originalId: 1364351247 },
      { responseOk: true, message: '播放成功' },
    ),
    false,
  );
  assert.equal(
    shouldUseLocalAudioFallback(
      { originalId: 1435628297 },
      { responseOk: false, message: '请先登录实名账号，执行 ncm-cli login 完成登录' },
    ),
    false,
  );
});
