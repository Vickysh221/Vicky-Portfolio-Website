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
const sharedMemoryAhaCaseStudy = read('src/pages/SharedMemoryAhaCaseStudy.tsx');
const subPageCarousel = read('src/pages/SubPageCarousel.tsx');
const showcaseIndex = read('public/language-diary-ux-showcase/index.html');
const showcaseV1 = read('public/language-diary-ux-showcase/agentic-canvas-v1.html');
const showcaseLegacy = read('public/language-diary-ux-showcase/legacy.html');

assertIncludes(routeDepth, "'/agentic-design-development/language-diary': 5", 'SLIDE_COUNTS');
assertIncludes(h5DocContent, "'/agentic-design-development/language-diary:2'", 'language-diary showcase section map');
assertIncludes(slide03Showcase, '/language-diary-ux-showcase/agentic-canvas-v1.html', 'language-diary slide 03 archive embed');
assertIncludes(slide03Showcase, 'Embedded UX Showcase · v1 Archive', 'language-diary slide 03 archive label');
assertIncludes(sharedMemoryAhaCaseStudy, "src: '/language-diary-ux-showcase/index.html'", 'aha case study live showcase embed');
assertIncludes(subPageCarousel, "route === '/agentic-design-development/aha-moment' && slideIndex === 1", 'showcase auto-expand route guard');
assertIncludes(subPageCarousel, 'language-diary-ux-showcase-expanded-default', 'showcase expanded full-bleed iframe');
assertIncludes(subPageCarousel, "background: 'rgba(0,0,0,0.96)'", 'expanded overlay black background');
assert.ok(!slide03Showcase.includes('setExpanded(true)'), 'slide 03 should not keep its own local expand dialog');
assertIncludes(showcaseIndex, 'href="/language-diary-ux-showcase/styles/index.css"', 'showcase index stylesheet path');
assertIncludes(showcaseIndex, 'src="/language-diary-ux-showcase/legacy.html"', 'showcase index legacy iframe path');
assertIncludes(showcaseIndex, 'Aha Moment 前台 UX · Agentic Canvas Session', 'aha showcase masthead');
assertIncludes(showcaseIndex, '00 · 读图例', 'aha showcase legend pill');
assertIncludes(showcaseIndex, '--expression-agent: #ff6c5f;', 'aha showcase expression token');
assertIncludes(showcaseIndex, '.is-orch-primary', 'aha showcase primary orchestrator star');
assertIncludes(showcaseIndex, '.next-step-band', 'aha showcase next-step band utility');
assertIncludes(showcaseV1, 'UX SHOWCASE', 'v1 archive content');
assertIncludes(showcaseLegacy, 'href="/language-diary-ux-showcase/styles/index.css"', 'showcase legacy stylesheet path');

console.log('language-diary showcase embed checks passed');
