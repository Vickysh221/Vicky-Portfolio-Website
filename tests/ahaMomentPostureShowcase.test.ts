import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function readShowcase() {
  return readFileSync(new URL('../public/language-diary-ux-showcase/index.html', import.meta.url), 'utf8');
}

test('showcase declares aha visual language tokens', () => {
  const html = readShowcase();
  assert.match(html, /--aha-amber:\s*#c8854a/);
  assert.match(html, /--aha-amber-soft:\s*rgba\(200,\s*133,\s*74,\s*0\.16\)/);
});

test('showcase declares aha base components', () => {
  const html = readShowcase();
  assert.match(html, /\.aha-card\s*\{/);
  assert.match(html, /\.aha-card-header\s*\{/);
  assert.match(html, /\.aha-card-body\s*\{/);
  assert.match(html, /\.aha-card-footer\s*\{/);
  assert.match(html, /\.aha-marker-dot\s*\{/);
  assert.match(html, /\.aha-island-dot\s*\{/);
  assert.match(html, /\.aha-hint-glow\s*\{/);
});

test('showcase declares dynamic island three states', () => {
  const html = readShowcase();
  assert.match(html, /\.dynamic-island\s*\{/);
  assert.match(html, /\.dynamic-island--compact\s*\{/);
  assert.match(html, /\.dynamic-island--expanded\s*\{/);
  // idle 尺寸接近 116x28
  assert.match(html, /\.dynamic-island\s*\{[\s\S]*?width:\s*116px[\s\S]*?height:\s*28px/);
});

test('showcase declares posture-specific carriers', () => {
  const html = readShowcase();
  assert.match(html, /\.os-banner-top\s*\{/);
  assert.match(html, /\.inline-suggestion\s*\{/);
  assert.match(html, /\.return-sheet\s*\{/);
  assert.match(html, /\.return-sheet-grabber\s*\{/);
  assert.match(html, /\.micro-session-frame\s*\{/);
  assert.match(html, /\.micro-session-step\s*\{/);
});

test('showcase declares storyboard meta classes', () => {
  const html = readShowcase();
  assert.match(html, /\.posture-storyboard\s*\{/);
  assert.match(html, /\.storyboard-arrow\s*\{/);
  assert.match(html, /\.storyboard-frame-label\s*\{/);
  assert.match(html, /\.posture-meta\s*\{/);
  assert.match(html, /\.posture-block\s*\{/);
});

test('phone statusbar uses three-segment structure with island', () => {
  const html = readShowcase();
  // 不应再保留旧 ●●● 形式
  assert.equal(html.includes('<span>●●●</span>'), false, 'old statusbar dots should be replaced');
  // 新结构必须有 status-time / dynamic-island / status-icons
  assert.match(html, /class="status-time">9:41/);
  assert.match(html, /class="status-icons"/);
});

test('legend uses seven postures instead of six forms', () => {
  const html = readShowcase();
  // 旧词不应再出现在 legend 中
  assert.equal(html.includes('六种AGENT前台形态'), false);
  // 新词必须出现
  assert.match(html, /七种 Aha Mode 介入姿态/);
  // 七种姿态英文名都要出现
  assert.match(html, /\bTrace\b/);
  assert.match(html, /\bAmbient\b/);
  assert.match(html, /\bInline\b/);
  assert.match(html, /\bMorphing\b/);
  assert.match(html, /\bEcho\b/);
  assert.match(html, /\bCo-creation\b/);
  assert.match(html, /\bAgentic Action\b/);
});

test('mode-context section has seven posture blocks', () => {
  const html = readShowcase();
  // 旧的 V2.1–V2.6 标题应该不再出现
  assert.equal(html.includes('V2.1 AHA banner notification'), false);
  assert.equal(html.includes('V2.6 AHA return card'), false);
  // 新的 7 个 posture block id
  for (const id of ['posture-trace','posture-ambient','posture-inline','posture-morphing','posture-echo','posture-cocreation','posture-agentic']) {
    assert.match(html, new RegExp(`id="${id}"`), `missing ${id}`);
  }
});

test('mode-context title says Agent Aha Mode', () => {
  const html = readShowcase();
  assert.match(html, /02 · 情境感知型介入 \/ Agent Aha Mode/);
});

test('echo storyboard has five frames including hint glow and return sheet', () => {
  const html = readShowcase();
  const block = html.match(/<article class="posture-block" id="posture-echo">[\s\S]*?<\/article>/)![0];
  assert.match(block, /storyboard-frame-label">A · 白天静默保存/);
  assert.match(block, /storyboard-frame-label">B · 白天 ambient hint/);
  assert.match(block, /storyboard-frame-label">C · 晚上场景就位/);
  assert.match(block, /storyboard-frame-label">D · return card/);
  assert.match(block, /storyboard-frame-label">E · 转化菜单/);
  assert.match(block, /aha-hint-glow/);
  assert.match(block, /class="return-sheet/);
  assert.match(block, /class="return-sheet-grabber"/);
  assert.match(block, /1 from earlier/);
  assert.match(block, /bring it in/);
  assert.match(block, /don't connect these again/);
});

test('morphing storyboard shows same fragment in three workspaces', () => {
  const html = readShowcase();
  const block = html.match(/<article class="posture-block" id="posture-morphing">[\s\S]*?<\/article>/)![0];
  assert.match(block, /Agents shouldn't be locked inside one app/);
  assert.match(block, /storyboard-frame-label">A · 在写英文/);
  assert.match(block, /storyboard-frame-label">B · 在做作品集/);
  assert.match(block, /storyboard-frame-label">C · 在准备面试/);
  assert.match(block, /same fragment · three workspaces/);
});

test('inline storyboard suggestion bar sits above keyboard area', () => {
  const html = readShowcase();
  const block = html.match(/<article class="posture-block" id="posture-inline">[\s\S]*?<\/article>/)![0];
  assert.match(block, /class="inline-suggestion"/);
  assert.match(block, /Fair point\. I'd want to explore one thing first/);
  assert.match(block, /softer/);
  assert.match(block, /more direct/);
});

test('ambient storyboard uses dynamic island compact and expanded', () => {
  const html = readShowcase();
  const block = html.match(/<article class="posture-block" id="posture-ambient">[\s\S]*?<\/article>/)![0];
  assert.match(block, /dynamic-island--compact/);
  assert.match(block, /dynamic-island--expanded/);
  assert.match(block, /related to your Personal OS framing/);
  assert.match(block, /class="aha-island-dot"/);
});

test('case-evidence section and nav link are removed', () => {
  const html = readShowcase();
  assert.equal(html.includes('id="case-evidence"'), false, 'case-evidence section should be removed');
  assert.equal(html.includes('href="#case-evidence"'), false, 'nav link to case-evidence should be removed');
  assert.equal(html.includes('03 · 场景佐证'), false, '03 scenario heading should be removed');
});

test('co-creation storyboard invites user to shape lens together', () => {
  const html = readShowcase();
  const block = html.match(/<article class="posture-block" id="posture-cocreation">[\s\S]*?<\/article>/)![0];
  assert.match(block, /storyboard-frame-label">A · 邀请/);
  assert.match(block, /storyboard-frame-label">B · 选 lens/);
  assert.match(block, /storyboard-frame-label">C · 写回/);
  assert.match(block, /Want to shape it together/);
  assert.match(block, /更产品化/);
  assert.match(block, /更面试化/);
  assert.match(block, /更诗性/);
  assert.match(block, /lens preference learned/);
});

test('agentic storyboard branches into micro-session', () => {
  const html = readShowcase();
  const block = html.match(/<article class="posture-block" id="posture-agentic">[\s\S]*?<\/article>/)![0];
  assert.match(block, /storyboard-frame-label">A · 高置信触发/);
  assert.match(block, /storyboard-frame-label">B · 微会话/);
  assert.match(block, /storyboard-frame-label">C · 收尾/);
  assert.match(block, /class="micro-session-frame"/);
  assert.match(block, /class="micro-session-step"/);
  assert.match(block, /run a 3-step prep/);
});

test('trace storyboard has three frames with marker dot', () => {
  const html = readShowcase();
  const traceBlock = html.match(/<article class="posture-block" id="posture-trace">[\s\S]*?<\/article>/);
  assert.ok(traceBlock, 'trace block found');
  const block = traceBlock[0];
  assert.match(block, /class="storyboard-frame-label">A · 捕捉/);
  assert.match(block, /class="storyboard-frame-label">B · 复盘/);
  assert.match(block, /class="storyboard-frame-label">C · 写回/);
  assert.match(block, /class="aha-marker-dot"/);
  assert.match(block, /kept from afternoon reading/);
  assert.match(block, /class="rebuttal-pill[^"]*">keep</);
  assert.match(block, /class="rebuttal-pill[^"]*">dismiss</);
});
