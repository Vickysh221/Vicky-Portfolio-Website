import test from 'node:test';
import assert from 'node:assert/strict';

import { chooseFuliPlusIntroVideoResolution } from '../src/pages/fuliPlusIntroVideo.ts';

test('chooses 540p on narrow viewports', () => {
  const resolution = chooseFuliPlusIntroVideoResolution({
    viewportWidth: 390,
    deviceMemoryGb: 8,
    hardwareConcurrency: 8,
  });

  assert.equal(resolution, '540p');
});

test('chooses 540p when save-data is enabled', () => {
  const resolution = chooseFuliPlusIntroVideoResolution({
    viewportWidth: 1440,
    deviceMemoryGb: 8,
    hardwareConcurrency: 8,
    saveData: true,
  });

  assert.equal(resolution, '540p');
});

test('chooses 540p on lower-performance devices', () => {
  const resolution = chooseFuliPlusIntroVideoResolution({
    viewportWidth: 1280,
    deviceMemoryGb: 4,
    hardwareConcurrency: 4,
  });

  assert.equal(resolution, '540p');
});

test('chooses 720p when viewport and device capacity allow it', () => {
  const resolution = chooseFuliPlusIntroVideoResolution({
    viewportWidth: 1440,
    deviceMemoryGb: 8,
    hardwareConcurrency: 8,
  });

  assert.equal(resolution, '720p');
});
