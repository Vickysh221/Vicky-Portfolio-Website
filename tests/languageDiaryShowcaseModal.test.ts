import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('aha page 3 no longer auto expands into the hidden html showcase', () => {
  const subPageCarousel = read('src/pages/SubPageCarousel.tsx');

  assert.doesNotMatch(subPageCarousel, /shouldAutoExpandShowcase/);
  assert.doesNotMatch(subPageCarousel, /isShowcaseSlide/);
  assert.doesNotMatch(subPageCarousel, /isExpandedShowcasePage/);
  assert.doesNotMatch(subPageCarousel, /language-diary-ux-showcase\/posture-modes\.html/);
  assert.doesNotMatch(subPageCarousel, /language-diary-ux-showcase\/index\.html/);
  assert.match(subPageCarousel, /hasSectionContent\(route,\s*slideIndex\)\s*\?\s*\(/);
  assert.match(subPageCarousel, /<H5DocContent[\s\S]*slideIndex=\{slideIndex\}/);
});

test('aha page 3 keeps the normal page meta copy around its static image', () => {
  const subPageCarousel = read('src/pages/SubPageCarousel.tsx');

  assert.match(subPageCarousel, /const\s+shouldShowTitleBlock\s*=\s*true;/);
  assert.match(subPageCarousel, /\{shouldShowTitleBlock && !shouldScrollTitleBlock && titleBlock\}/);
  assert.match(subPageCarousel, /\{shouldShowTitleBlock && shouldScrollTitleBlock && titleBlock\}/);
});
