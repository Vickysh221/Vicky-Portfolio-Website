import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function readShowcase() {
  return readFileSync(new URL('../public/language-diary-ux-showcase/index.html', import.meta.url), 'utf8');
}

test('V1.1 feed-card shows key language learning sentence', () => {
  const html = readShowcase();
  const block = html.match(/V1\.1 Ambient handoff nudge[\s\S]*?V1\.2/)![0];
  assert.match(block, /@英语写作笔记/);
  assert.match(block, /inevitable, not loud/);
});

test('V1.2 feed-card has source handle and article context line', () => {
  const html = readShowcase();
  const block = html.match(/V1\.2 Co-reading anchor[\s\S]*?V1\.3/)![0];
  assert.match(block, /@英语写作笔记/);
  assert.match(block, /在设计一门语言/);
});

test('V1.4 feed-card shows key sentence for target-language challenge', () => {
  const html = readShowcase();
  const block = html.match(/V1\.4 Target language challenge[\s\S]*?V1\.5/)![0];
  assert.match(block, /inevitable, not loud/);
});

test('Trace Frame A shows key sentence with inline amber highlight', () => {
  const html = readShowcase();
  const article = html.match(/<article class="posture-block" id="posture-trace">[\s\S]*?<\/article>/)![0];
  const frameA = article.match(/storyboard-frame-label">A · 捕捉[\s\S]*?storyboard-arrow/)![0];
  assert.match(frameA, /@英语写作笔记/);
  assert.match(frameA, /inevitable, not loud/);
  // inline highlight replaces marker dot
  assert.match(frameA, /<mark[^>]*>inevitable, not loud<\/mark>/);
  assert.equal(frameA.includes('aha-marker-dot'), false, 'marker dot removed in favour of inline highlight');
});

test('Ambient Frame A top feed-card shows language OS article', () => {
  const html = readShowcase();
  const article = html.match(/<article class="posture-block" id="posture-ambient">[\s\S]*?<\/article>/)![0];
  const frameA = article.match(/storyboard-frame-label">A · 旁观[\s\S]*?storyboard-arrow/)![0];
  assert.match(frameA, /language OS/);
});

test('Ambient Frame C feed-card shows same article content', () => {
  const html = readShowcase();
  const article = html.match(/<article class="posture-block" id="posture-ambient">[\s\S]*?<\/article>/)![0];
  const frameC = article.match(/storyboard-frame-label">C · 长按[\s\S]*?storyboard-frame-state/)![0];
  assert.match(frameC, /language OS/);
});

test('Echo Frame A feed-card shows proactive language learning article', () => {
  const html = readShowcase();
  const article = html.match(/<article class="posture-block" id="posture-echo">[\s\S]*?<\/article>/)![0];
  const frameA = article.match(/storyboard-frame-label">A · 白天静默保存[\s\S]*?storyboard-arrow/)![0];
  assert.match(frameA, /Proactive language/);
});

test('Echo Frame B top card shows vocabulary retention sentence', () => {
  const html = readShowcase();
  const article = html.match(/<article class="posture-block" id="posture-echo">[\s\S]*?<\/article>/)![0];
  const frameB = article.match(/storyboard-frame-label">B · 白天 ambient hint[\s\S]*?storyboard-arrow/)![0];
  assert.match(frameB, /Vocabulary retention/);
});

test('Echo Frame C feed-card shows interview prep question', () => {
  const html = readShowcase();
  const article = html.match(/<article class="posture-block" id="posture-echo">[\s\S]*?<\/article>/)![0];
  const frameC = article.match(/storyboard-frame-label">C · 晚上场景就位[\s\S]*?storyboard-arrow/)![0];
  assert.match(frameC, /Personal OS/);
});
