import test from 'node:test';
import assert from 'node:assert/strict';

import { getAiInteriorSystemPages } from '../src/pages/AiInteriorSystemCaseStudy.tsx';

test('slide 1 begins with the intro video and includes the mapping images', () => {
  const pages = getAiInteriorSystemPages();
  const firstPage = pages[0];

  assert.equal(firstPage.pageTitle, 'AI 室内设计系统：从房间生成到生活场景理解');
  assert.equal(firstPage.visualBlocks[0]?.type, 'videoFeature');
  assert.equal(firstPage.visualBlocks[0]?.autoPlay, true);
  assert.equal(firstPage.visualBlocks[0]?.loop, true);
  assert.equal(firstPage.visualBlocks[1]?.type, 'heroImage');
  assert.equal(firstPage.visualBlocks[2]?.type, 'heroImage');
});

test('slide 2 videos do not force autoplay', () => {
  const pages = getAiInteriorSystemPages();
  const secondPage = pages[1];

  assert.equal(secondPage.visualBlocks[1]?.type, 'videoFeature');
  assert.equal(secondPage.visualBlocks[1]?.autoPlay, undefined);
  assert.equal(secondPage.visualBlocks[1]?.loop, undefined);
  assert.equal(secondPage.visualBlocks[2]?.type, 'videoFeature');
  assert.equal(secondPage.visualBlocks[2]?.autoPlay, undefined);
  assert.equal(secondPage.visualBlocks[2]?.loop, undefined);
});
