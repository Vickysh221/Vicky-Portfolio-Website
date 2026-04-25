import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('aha showcase keeps an agentic canvas v1 backup and hides the legacy tabs in the live entry', () => {
  const showcaseIndex = read('public/language-diary-ux-showcase/index.html');

  assert.equal(
    existsSync(new URL('../public/language-diary-ux-showcase/agentic-canvas-v1.html', import.meta.url)),
    true,
    'agentic-canvas-v1 backup page should exist',
  );
  assert.match(showcaseIndex, /<div class="layout-tabs"[^>]*hidden/, 'layout tabs should be hidden');
  assert.match(showcaseIndex, /<section id="layout-legacy"[^>]*hidden/, 'legacy panel should be hidden');
  assert.match(showcaseIndex, /Aha Moment 前台 UX · Agentic Canvas Session/);
  assert.match(showcaseIndex, /同一个 agent 在不同时机里，如何为自己挑选最合适的出现方式。/);
  assert.match(showcaseIndex, /4 个 agent perspective（Expression \/ Relationship \/ Timing \/ Review）给出推荐/);
});

test('aha showcase adds a legend spread and five-pill navigation for the four scenarios', () => {
  const showcaseIndex = read('public/language-diary-ux-showcase/index.html');

  assert.match(showcaseIndex, />00 · 读图例</);
  assert.match(showcaseIndex, />01 · 共同阅读</);
  assert.match(showcaseIndex, />02 · 回复引导</);
  assert.match(showcaseIndex, />03 · 关系 \/ 目标话题</);
  assert.match(showcaseIndex, />04 · 晚点回来</);
  assert.match(showcaseIndex, /两种注意力模式/);
  assert.match(showcaseIndex, /6 种前台形态/);
  assert.match(showcaseIndex, /Orchestrator 选择模型/);
  assert.match(showcaseIndex, /Ambient nudge/);
  assert.match(showcaseIndex, /Co-reading anchor/);
  assert.match(showcaseIndex, /Reply suggestion/);
  assert.match(showcaseIndex, /Target language challenge/);
  assert.match(showcaseIndex, /Relation-topic invitation/);
  assert.match(showcaseIndex, /Deferred return card/);
});

test('aha showcase reframes voting around four agent perspectives and orchestrator stars', () => {
  const showcaseIndex = read('public/language-diary-ux-showcase/index.html');

  assert.match(showcaseIndex, /--expression-agent:\s*#ff6c5f;/);
  assert.match(showcaseIndex, /--relationship-agent:\s*#9b7dd4;/);
  assert.match(showcaseIndex, /--timing-agent:\s*#2f9bff;/);
  assert.match(showcaseIndex, /--review-agent:\s*#c8a96e;/);
  assert.match(showcaseIndex, /\.vd-expression/);
  assert.match(showcaseIndex, /\.vd-relationship/);
  assert.match(showcaseIndex, /\.vd-timing/);
  assert.match(showcaseIndex, /\.vd-review/);
  assert.match(showcaseIndex, /\.is-orch-primary/);
  assert.match(showcaseIndex, /\.is-orch-secondary/);
  assert.match(showcaseIndex, /Expression 推 V\d\.\d/);
  assert.match(showcaseIndex, /Relationship 推 V\d\.\d/);
  assert.match(showcaseIndex, /Timing 推 V\d\.\d/);
  assert.match(showcaseIndex, /Review 推 V\d\.\d/);
  assert.match(showcaseIndex, /主★/);
  assert.match(showcaseIndex, /副✩/);
});

test('shared memory aha case study page 2 aligns its frontstage forms and caption with the showcase', () => {
  const caseStudy = read('src/pages/SharedMemoryAhaCaseStudy.tsx');

  assert.match(caseStudy, /Relation-topic invitation/);
  assert.match(caseStudy, /Deferred return card/);
  assert.match(caseStudy, /每个场景按 5 层结构展开：场景 → 模式 1\/2 → agent 选中的交互形态 → 用户怎么被带入下一步 → 最后沉淀成什么。/);
  assert.match(caseStudy, /投票方从 UX \/ Research \/ Human 改为 Expression \/ Relationship \/ Timing \/ Review/);
  assert.match(caseStudy, /由 Orchestrator 决定主与副/);
});

test('language diary slide keeps the v1 canvas while the aha case study uses the reframed live entry', () => {
  const caseStudy = read('src/pages/SharedMemoryAhaCaseStudy.tsx');
  const languageDiaryShowcase = read('src/pages/H5DocContentPersonalLanguageDiarySlide03Showcase.tsx');

  assert.match(caseStudy, /src:\s*'\/language-diary-ux-showcase\/index\.html'/);
  assert.match(languageDiaryShowcase, /const src = '\/language-diary-ux-showcase\/agentic-canvas-v1\.html';/);
});
