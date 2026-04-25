import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('language diary showcase auto expand uses a centered modal frame', () => {
  const subPageCarousel = read('src/pages/SubPageCarousel.tsx');

  assert.match(subPageCarousel, /const\s+showcaseExpandedModalViewportStyle:\s+React\.CSSProperties\s*=\s*\{/);
  assert.match(subPageCarousel, /showcaseExpandedModalViewportStyle[\s\S]*alignItems:\s*'center'/);
  assert.match(subPageCarousel, /showcaseExpandedModalViewportStyle[\s\S]*justifyContent:\s*'center'/);
  assert.match(subPageCarousel, /const\s+showcaseExpandedModalFrameStyle:\s+React\.CSSProperties\s*=\s*\{/);
  assert.match(subPageCarousel, /showcaseExpandedModalFrameStyle[\s\S]*width:\s*'min\(/);
  assert.match(subPageCarousel, /showcaseExpandedModalFrameStyle[\s\S]*height:\s*'min\(/);
  assert.match(subPageCarousel, /className=\{isExpandedShowcaseOverlay \? 'showcase-expanded-modal-frame' : undefined\}/);
  assert.match(subPageCarousel, /height:\s*isExpandedShowcasePage \? '100%' : 'calc\(100vh - 120px\)'/);
  assert.match(subPageCarousel, /flex:\s*isExpandedShowcasePage \? 1 : undefined/);
  assert.match(subPageCarousel, /shouldAutoExpandShowcase[\s\S]*slideIndex === 2/);
});

test('language diary showcase hides page meta copy so the canvas is not obstructed', () => {
  const subPageCarousel = read('src/pages/SubPageCarousel.tsx');

  assert.match(subPageCarousel, /const\s+shouldShowTitleBlock\s*=\s*!isShowcaseSlide\(route,\s*slideIndex\);/);
  assert.match(subPageCarousel, /\{shouldShowTitleBlock && !shouldScrollTitleBlock && titleBlock\}/);
  assert.match(subPageCarousel, /\{shouldShowTitleBlock && shouldScrollTitleBlock && titleBlock\}/);
});
