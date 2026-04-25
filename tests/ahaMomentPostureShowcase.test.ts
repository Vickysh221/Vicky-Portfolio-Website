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
