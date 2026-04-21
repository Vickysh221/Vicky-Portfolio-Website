import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('personal os case study is wired into the H5 content renderer', () => {
  const renderer = read('src/pages/H5DocContent.tsx');
  const caseStudy = read('src/pages/PersonalOSCaseStudy.tsx');
  const meta = read('src/pages/personalOsCaseStudyMeta.ts');

  assert.match(renderer, /import\s+PersonalOSCaseStudy\s+from\s+'\.\/PersonalOSCaseStudy';/);
  assert.match(renderer, /import\s+\{\s*hasPersonalOsCaseStudy\s*\}\s+from\s+'\.\/personalOsCaseStudyMeta\.ts';/);
  assert.match(renderer, /if \(hasPersonalOsCaseStudy\(route, slideIndex\)\) return true;/);
  assert.match(renderer, /<PersonalOSCaseStudy[\s\S]*route=\{route\}[\s\S]*slideIndex=\{slideIndex\}/);

  assert.match(caseStudy, /const\s+\{\s*text\s*\}\s*=\s*useI18n\(\);/);
  assert.match(caseStudy, /if \(!hasPersonalOsCaseStudy\(route, slideIndex\)\) return null;/);
  assert.match(meta, /PERSONAL_OS_CASE_STUDY_ROUTE = '\/agentic-design-development\/personal-os'/);
  assert.match(meta, /slideIndex >= 0 && slideIndex < PERSONAL_OS_CASE_STUDY_PAGE_COUNT/);
});
