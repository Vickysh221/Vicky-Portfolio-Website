import test from 'node:test';
import assert from 'node:assert/strict';

import { PROJECTS } from '../src/projectRegistry.ts';
import { PAGE_META, SLIDE_COUNTS } from '../src/constants/routeDepth.ts';
import { CHAPTER_SUMMARIES } from '../src/home/chapterSummaries.ts';
import { HOME_INDEX_SECTIONS } from '../src/home/homeScenes.ts';

test('personal os case study is registered under agentic-design-development and listed in relations', () => {
  const route = '/agentic-design-development/personal-os';
  const project = PROJECTS.find((entry) => entry.route === '/agentic-design-development');
  const subPage = project?.subPages.find((entry) => entry.route === route);
  const relationsRoutes = HOME_INDEX_SECTIONS.relations.chapters.map((chapter) => chapter.route);

  assert.ok(subPage);
  assert.equal(SLIDE_COUNTS[route], 3);
  assert.equal(PAGE_META[route]?.parent, '/agentic-design-development');
  assert.ok(CHAPTER_SUMMARIES[route]);
  assert.equal(relationsRoutes.includes(route), true);
});
