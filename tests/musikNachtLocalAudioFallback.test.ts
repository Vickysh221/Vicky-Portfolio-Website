import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getLocalAudioFallbackSong,
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
  assert.equal(
    resolveLocalAudioFallbackSource({ originalId: 1435628297 }),
    '/audio/la-lune-limperatrice.m4a',
  );
  assert.equal(
    resolveLocalAudioFallbackSource({ originalId: 1808923954 }),
    '/audio/submarine-limperatrice.m4a',
  );
  assert.equal(
    resolveLocalAudioFallbackSource({ originalId: 5069277 }),
    '/audio/jungle-heartbeat-suduaya.m4a',
  );
  assert.equal(resolveLocalAudioFallbackSource({ originalId: 1481929839 }), null);
});

test('provides local song metadata for fallback-only scenes', () => {
  assert.equal(getLocalAudioFallbackSong(1808923954)?.name, 'Submarine');
  assert.equal(getLocalAudioFallbackSong(5069277)?.name, 'Jungle HeartBeat');
  assert.equal(getLocalAudioFallbackSong(1808923954)?.duration, 284940);
  assert.equal(getLocalAudioFallbackSong(5069277)?.duration, 285380);
  assert.equal(getLocalAudioFallbackSong(1481929839), null);
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
    true,
  );
  assert.equal(
    shouldUseLocalAudioFallback(
      { originalId: 1808923954 },
      { responseOk: false, message: '请先登录实名账号，执行 ncm-cli login 完成登录' },
    ),
    true,
  );
  assert.equal(
    shouldUseLocalAudioFallback(
      { originalId: 5069277 },
      { responseOk: false, message: '未连上本地 bridge' },
    ),
    true,
  );
  assert.equal(
    shouldUseLocalAudioFallback(
      { originalId: 1481929839 },
      { responseOk: false, message: '请先登录实名账号，执行 ncm-cli login 完成登录' },
    ),
    false,
  );
});
