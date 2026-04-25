import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('page-2 mainCopy frames Agent Aha Mode as seven postures', () => {
  const src = read('src/pages/SharedMemoryAhaCaseStudy.tsx');
  assert.match(src, /Agent Aha Mode/);
  assert.match(src, /七种介入姿态/);
  assert.match(src, /seven postures/);
});

test('page-2 contentBlocks list seven posture cards', () => {
  const src = read('src/pages/SharedMemoryAhaCaseStudy.tsx');
  for (const name of ['Trace 留痕', 'Ambient 呼吸', 'Inline 镶嵌', 'Morphing 变形', 'Echo 回声', 'Co-creation 共创', 'Agentic Action 代理行动']) {
    assert.match(src, new RegExp(name), `missing posture card: ${name}`);
  }
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
  assert.match(src, /七种姿态/);
  assert.match(src, /seven postures/i);
});
