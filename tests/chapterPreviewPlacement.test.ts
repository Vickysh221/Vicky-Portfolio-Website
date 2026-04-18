import test from 'node:test';
import assert from 'node:assert/strict';

import { computePointerPlacement } from '../src/components/chapterPreviewPlacement.ts';

test('places preview to the lower-right of the pointer when there is room', () => {
  const placement = computePointerPlacement({
    pointerX: 200,
    pointerY: 120,
    viewportWidth: 1280,
    viewportHeight: 800,
    cardWidth: 300,
    cardHeight: 190,
    gap: 20,
    margin: 16,
  });

  assert.equal(placement.left, 220);
  assert.equal(placement.top, 140);
  assert.equal(placement.flippedX, false);
  assert.equal(placement.flippedY, false);
});

test('flips preview to the upper-left near the viewport edge', () => {
  const placement = computePointerPlacement({
    pointerX: 1180,
    pointerY: 760,
    viewportWidth: 1280,
    viewportHeight: 800,
    cardWidth: 300,
    cardHeight: 190,
    gap: 20,
    margin: 16,
  });

  assert.equal(placement.left, 860);
  assert.equal(placement.top, 550);
  assert.equal(placement.flippedX, true);
  assert.equal(placement.flippedY, true);
});
