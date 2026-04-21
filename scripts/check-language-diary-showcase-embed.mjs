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
const showcaseIndex = read('public/language-diary-ux-showcase/index.html');
const showcaseLegacy = read('public/language-diary-ux-showcase/legacy.html');

assertIncludes(routeDepth, "'/agentic-design-development/language-diary': 6", 'SLIDE_COUNTS');
assertIncludes(h5DocContent, "'/agentic-design-development/language-diary:5'", 'language-diary section map');
assertIncludes(slide03Showcase, '/language-diary-ux-showcase/index.html', 'language-diary slide 03 embed');
assertIncludes(showcaseIndex, 'href="/language-diary-ux-showcase/styles/index.css"', 'showcase index stylesheet path');
assertIncludes(showcaseIndex, 'src="/language-diary-ux-showcase/legacy.html"', 'showcase index legacy iframe path');
assertIncludes(showcaseLegacy, 'href="/language-diary-ux-showcase/styles/index.css"', 'showcase legacy stylesheet path');

console.log('language-diary showcase embed checks passed');
