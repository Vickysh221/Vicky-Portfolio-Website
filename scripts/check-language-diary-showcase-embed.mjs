import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');

function read(relPath) {
  return fs.readFileSync(path.join(repoRoot, relPath), 'utf8');
}

function assertIncludes(source, needle, label) {
  assert.ok(source.includes(needle), `${label} is missing expected snippet: ${needle}`);
}

const routeDepth = read('src/constants/routeDepth.ts');
const h5DocContent = read('src/pages/H5DocContent.tsx');
const slide03Showcase = read('src/pages/H5DocContentPersonalLanguageDiarySlide03Showcase.tsx');
const subPageCarousel = read('src/pages/SubPageCarousel.tsx');
const showcaseIndex = read('public/language-diary-ux-showcase/index.html');
const showcaseLegacy = read('public/language-diary-ux-showcase/legacy.html');

assertIncludes(routeDepth, "'/agentic-design-development/language-diary': 6", 'SLIDE_COUNTS');
assertIncludes(h5DocContent, "'/agentic-design-development/language-diary:5'", 'language-diary section map');
assertIncludes(slide03Showcase, '/language-diary-ux-showcase/index.html', 'language-diary slide 03 embed');
assertIncludes(subPageCarousel, "route === '/agentic-design-development/language-diary' && slideIndex === 2", 'showcase auto-expand route guard');
assertIncludes(subPageCarousel, 'language-diary-ux-showcase-expanded-default', 'showcase expanded full-bleed iframe');
assertIncludes(subPageCarousel, "background: 'rgba(0,0,0,0.96)'", 'expanded overlay black background');
assert.ok(!slide03Showcase.includes('setExpanded(true)'), 'slide 03 should not keep its own local expand dialog');
assertIncludes(showcaseIndex, 'href="/language-diary-ux-showcase/styles/index.css"', 'showcase index stylesheet path');
assertIncludes(showcaseIndex, 'src="/language-diary-ux-showcase/legacy.html"', 'showcase index legacy iframe path');
assertIncludes(showcaseIndex, 'background: #000;', 'showcase page black background');
assertIncludes(showcaseIndex, 'color: var(--ink);', 'showcase content ink reset');
assertIncludes(showcaseIndex, '--phone-shell: #73717b;', 'showcase phone shell token');
assertIncludes(showcaseIndex, 'background: var(--phone-shell);', 'showcase gray phone shell');
assertIncludes(showcaseIndex, 'font-size: 56px;', 'showcase compact title size');
assertIncludes(showcaseLegacy, 'href="/language-diary-ux-showcase/styles/index.css"', 'showcase legacy stylesheet path');

console.log('language-diary showcase embed checks passed');
