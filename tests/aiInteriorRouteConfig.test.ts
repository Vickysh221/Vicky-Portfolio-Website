import test from 'node:test';
import assert from 'node:assert/strict';

import { PROJECTS } from '../src/projectRegistry.ts';
import { PAGE_META, SLIDE_COUNTS } from '../src/constants/routeDepth.ts';
import { CHAPTER_SUMMARIES } from '../src/home/chapterSummaries.ts';

test('ai interior system is registered under agentic-design-development with two slides', () => {
  const project = PROJECTS.find((entry) => entry.route === '/agentic-design-development');
  const subPage = project?.subPages.find((entry) => entry.route === '/agentic-design-development/ai-interior-system');

  assert.ok(subPage);
  assert.equal(SLIDE_COUNTS['/agentic-design-development/ai-interior-system'], 2);
  assert.equal(PAGE_META['/agentic-design-development/ai-interior-system']?.parent, '/agentic-design-development');
  assert.ok(CHAPTER_SUMMARIES['/agentic-design-development/ai-interior-system']);
});
