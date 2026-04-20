import test from 'node:test';
import assert from 'node:assert/strict';

import { PROJECTS } from '../src/projectRegistry.ts';
import { PAGE_META } from '../src/constants/routeDepth.ts';
import { pickLocalizedText } from '../src/i18n/localization.ts';
import { createHoveredChapterSnapshot } from '../src/hooks/useChapterHover.ts';

test('project and route metadata expose bilingual values', () => {
  const jiduProject = PROJECTS.find((project) => project.route === '/jidu-hmi');
  assert.ok(jiduProject);
  assert.equal(pickLocalizedText(jiduProject!.title, 'zh'), '座舱 HMI 设计');
  assert.equal(pickLocalizedText(jiduProject!.title, 'en'), 'Cockpit HMI Design');

  const pageMeta = PAGE_META['/agentic-design-development/language-diary'];
  assert.equal(pickLocalizedText(pageMeta.title, 'zh'), 'A Ritual of Expression - 语言学习陪伴多智能体系统');
  assert.equal(pickLocalizedText(pageMeta.subtitle, 'en'), 'Agentic Design & Development · AI Agent');
});

test('hovered chapter snapshots preserve localized metadata for live language switches', () => {
  const project = PROJECTS.find((entry) => entry.route === '/agentic-design-development');
  const chapter = project?.subPages.find((entry) => entry.route === '/agentic-design-development/language-diary');

  assert.ok(project);
  assert.ok(chapter);

  const snapshot = createHoveredChapterSnapshot({
    route: chapter.route,
    numeral: chapter.numeral,
    label: chapter.label,
    projectColor: project.color,
    projectTitle: project.title,
    chapterIndex: 0,
    chapterTotal: project.subPages.length,
    pointerX: 120,
    pointerY: 240,
  });

  assert.equal(pickLocalizedText(snapshot.label, 'zh'), 'A Ritual of Expression - 语言学习陪伴多智能体系统');
  assert.equal(pickLocalizedText(snapshot.label, 'en'), 'A Ritual of Expression - Multi-Agent System for Language Learning Companionship');
  assert.equal(pickLocalizedText(snapshot.projectTitle, 'en'), 'My String Figure Player - Being with AI');
});

test('project registry and route metadata stay aligned for overlapping metadata', () => {
  for (const project of PROJECTS) {
    const pageMeta = PAGE_META[project.route];
    assert.ok(pageMeta, `Missing page metadata for project route ${project.route}`);
    assert.deepEqual(pageMeta.title, project.title, `Project title drift for ${project.route}`);
    assert.deepEqual(pageMeta.subtitle, project.subtitle, `Project subtitle drift for ${project.route}`);
    assert.deepEqual(pageMeta.desc, project.desc, `Project description drift for ${project.route}`);
    assert.equal(pageMeta.year, project.year, `Project year drift for ${project.route}`);
    assert.equal(pageMeta.color, project.color, `Project color drift for ${project.route}`);

    const rootSubPagesByRoute = new Map((pageMeta.subPages ?? []).map((subPage) => [subPage.route, subPage]));
    for (const subPage of project.subPages) {
      const rootSubPage = rootSubPagesByRoute.get(subPage.route);
      assert.ok(rootSubPage, `Missing root subpage metadata for ${subPage.route}`);
      assert.deepEqual(rootSubPage.label, subPage.label, `Subpage label drift for ${subPage.route}`);
      assert.ok(PAGE_META[subPage.route], `Missing child page metadata for ${subPage.route}`);
    }
  }
});
