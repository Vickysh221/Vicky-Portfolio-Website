import test from 'node:test';
import assert from 'node:assert/strict';

import { getAiInteriorSystemPages } from '../src/pages/AiInteriorSystemCaseStudy.tsx';

test('slide 2 keeps the required user-tag media order', () => {
  const pages = getAiInteriorSystemPages();
  const secondPage = pages[1];

  assert.equal(secondPage.pageTitle, '用户标签匹配与语义采集机制');
  assert.deepEqual(
    secondPage.visualBlocks.map((block) => block.type),
    ['heroImage', 'videoFeature', 'videoFeature', 'heroImage', 'heroImage'],
  );
});
