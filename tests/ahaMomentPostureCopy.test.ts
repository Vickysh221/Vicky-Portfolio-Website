import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

function pageBlock(src: string, pageTitleZh: string) {
  const start = src.indexOf(`pageTitle: t('${pageTitleZh}'`);
  assert.notEqual(start, -1, `missing page block: ${pageTitleZh}`);
  const nextPage = src.indexOf('\n  {\n    pageTitle:', start + 1);
  return nextPage === -1 ? src.slice(start) : src.slice(start, nextPage);
}

function standaloneTemplateSource() {
  const html = read('public/language-diary-wireframes-standalone.html');
  const match = html.match(/<script type="__bundler\/template">([\s\S]*?)<\/script>/);
  assert.ok(match, 'standalone wireframe should include a bundler template script');
  return JSON.parse(match[1]) as string;
}

function standaloneAppSource() {
  const html = standaloneTemplateSource();
  const start = html.indexOf('function App()');
  const end = html.indexOf('ReactDOM.createRoot', start);
  assert.notEqual(start, -1, 'standalone wireframe should include function App');
  assert.notEqual(end, -1, 'standalone wireframe should include ReactDOM render after function App');
  return html.slice(start, end);
}

test('page-2 mainCopy frames the case canvas as primary evidence', () => {
  const src = read('src/pages/SharedMemoryAhaCaseStudy.tsx');
  const block = pageBlock(src, 'Aha Moment 的前台交互架构');
  assert.match(block, /case canvas/);
  assert.match(block, /用户递交、情境感知、回访与转化/);
  assert.match(block, /message is handed off/);
});

test('page-2 leads with the selected case canvas embed', () => {
  const src = read('src/pages/SharedMemoryAhaCaseStudy.tsx');
  const block = pageBlock(src, 'Aha Moment 的前台交互架构');
  assert.match(block, /leadContentBlocks/);
  assert.match(block, /language-diary-ux-showcase-cases\.html/);
  assert.doesNotMatch(block, /language-diary-wireframes-standalone\.html/);
  assert.ok(
    block.indexOf('leadContentBlocks') < block.indexOf('contentBlocks: ['),
    'case canvas embed should be declared before the regular body content blocks',
  );
});

test('standalone wireframe html bundler template is valid JSON', () => {
  assert.match(standaloneTemplateSource(), /function App\(\)/);
});

test('standalone wireframe html app renders only the Agent Aha Mode section', () => {
  const app = standaloneAppSource();
  assert.match(app, /DCSection id="aha"/);
  assert.match(app, /Tier 1 · Trace · Ambient · Inline/);
  assert.match(app, /Tier 2 · Morphing · Echo/);
  assert.match(app, /Tier 3 · Co-creation · Agentic Action/);

  for (const legacySection of [
    'Daytime capture marks',
    'Candidate peek',
    'Day → Night',
    'Night narrative',
    'Knowledge constellation',
  ]) {
    assert.equal(app.includes(legacySection), false, `function App should not render legacy section: ${legacySection}`);
  }
});

test('page-2 body provides auxiliary reading guidance instead of retelling the canvas', () => {
  const src = read('src/pages/SharedMemoryAhaCaseStudy.tsx');
  const block = pageBlock(src, 'Aha Moment 的前台交互架构');
  assert.match(block, /三种读图方式/);
  assert.match(block, /先分清用户递交和情境感知/);
  assert.match(block, /再看通知、inline 和保存状态/);
  assert.match(block, /最后看回访如何变成行动/);
  assert.match(block, /这页文字只做辅助/);
  assert.match(block, /不在文字里重讲每一种 case/);
});

test('page-2 surfaces the rebuttable principle', () => {
  const src = read('src/pages/SharedMemoryAhaCaseStudy.tsx');
  assert.match(src, /可反驳/);
  assert.match(src, /rebuttable/i);
});

test('page-2 drops the legacy six-frontstage-forms card list', () => {
  const src = read('src/pages/SharedMemoryAhaCaseStudy.tsx');
  // 旧的 6 张前台形态卡片标题应已被替换
  assert.equal(src.includes('可复用的前台形态'), false, 'old 可复用的前台形态 card list should be removed');
  assert.equal(src.includes('Reusable frontstage forms'), false, 'old Reusable frontstage forms card list should be removed');
  assert.equal(src.includes('Co-reading anchor'), false, 'old Co-reading anchor card should be removed');
  assert.equal(src.includes('Deferred return card'), false, 'old Deferred return card should be removed');
});

test('page-3 caption mentions seven postures storyboards', () => {
  const src = read('src/pages/SharedMemoryAhaCaseStudy.tsx');
  assert.match(src, /language-diary-ux-showcase-cases\.html/);
  assert.match(src, /精选 case canvas/);
  assert.match(src, /selected case canvas/i);
});

test('page-3 case canvas declares scalable artboards and three case groups', () => {
  const html = read('public/language-diary-ux-showcase-cases.html');
  assert.match(html, /data-case-canvas/);
  assert.match(html, /data-zoom-in/);
  assert.match(html, /data-zoom-out/);
  assert.match(html, /Case Group 1 · User Handoff/);
  assert.match(html, /Case Group 2 · Context-aware Aha/);
  assert.match(html, /Case Group 3 · Return \/ Transformation/);
  assert.match(html, /banner notification/);
  assert.match(html, /inline reply/);
  assert.match(html, /saved state/);
});

test('case canvas supports drag pan and gesture zoom', () => {
  const html = read('public/language-diary-ux-showcase-cases.html');
  assert.match(html, /data-pan-canvas/);
  assert.match(html, /touch-action:\s*none/);
  assert.match(html, /function updateZoomAt/);
  assert.match(html, /activePointers/);
  assert.match(html, /pinchStart/);
  assert.match(html, /pointerdown/);
  assert.match(html, /pointermove/);
  assert.match(html, /wheel/);
});
