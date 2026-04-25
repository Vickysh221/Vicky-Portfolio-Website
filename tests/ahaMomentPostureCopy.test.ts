import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
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

test('page-2 mainCopy frames the wireframe as primary evidence', () => {
  const src = read('src/pages/SharedMemoryAhaCaseStudy.tsx');
  assert.match(src, /Agent Aha Mode/);
  assert.match(src, /wireframe 自己说话/);
  assert.match(src, /reading frame/);
  assert.match(src, /不需要在正文里再复述一遍/);
});

test('page-2 leads with the standalone wireframe html embed', () => {
  const src = read('src/pages/SharedMemoryAhaCaseStudy.tsx');
  assert.match(src, /leadContentBlocks/);
  assert.match(src, /language-diary-wireframes-standalone\.html/);
  assert.ok(
    src.indexOf('leadContentBlocks') < src.indexOf('contentBlocks: ['),
    'standalone HTML embed should be declared before the regular body content blocks',
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
  assert.match(src, /三种读图方式/);
  assert.match(src, /从低介入到高介入/);
  assert.match(src, /从保存状态到生成动作/);
  assert.match(src, /从系统判断到用户反驳/);
  assert.match(src, /这页文字只做辅助/);
  assert.match(src, /不在文字里重讲每一种姿态/);
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
