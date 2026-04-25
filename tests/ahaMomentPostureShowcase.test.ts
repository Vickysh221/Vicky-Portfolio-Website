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
