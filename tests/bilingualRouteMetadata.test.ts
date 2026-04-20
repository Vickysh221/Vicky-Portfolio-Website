import test from 'node:test';
import assert from 'node:assert/strict';

import { PROJECTS } from '../src/projectRegistry.ts';
import { PAGE_META } from '../src/constants/routeDepth.ts';
import { pickLocalizedText } from '../src/i18n/localization.ts';

test('project and route metadata expose bilingual values', () => {
  const jiduProject = PROJECTS.find((project) => project.route === '/jidu-hmi');
  assert.ok(jiduProject);
  assert.equal(pickLocalizedText(jiduProject!.title, 'zh'), '座舱 HMI 设计');
  assert.equal(pickLocalizedText(jiduProject!.title, 'en'), 'Cockpit HMI Design');

  const pageMeta = PAGE_META['/agentic-design-development/language-diary'];
  assert.equal(pickLocalizedText(pageMeta.title, 'zh'), 'A Ritual of Expression - 语言学习陪伴多智能体系统');
  assert.equal(pickLocalizedText(pageMeta.subtitle, 'en'), 'Agentic Design & Development · AI Agent');
});
