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

test('personal os doctrine page renders a terminal highlight after the first paragraph', () => {
  const caseStudy = read('src/pages/PersonalOSCaseStudy.tsx');

  // The schema has an opt-in terminalHighlight slot…
  assert.match(caseStudy, /terminalHighlight\?: TerminalHighlightContent;/);
  // …and the doctrine page (slide 0) opts in with the canonical phrase.
  assert.match(
    caseStudy,
    /terminalHighlight: \{[\s\S]*?body: t\(\s*'right aspects of memory × right aspects of agents'/,
  );

  // A dedicated TerminalHighlight component renders the highlight chrome.
  assert.match(caseStudy, /function TerminalHighlight\(\{/);
  assert.match(caseStudy, /data-personal-os-terminal/);

  // IntroReveal splits mainCopy at the first \n\n and inserts the highlight between
  // the doctrine paragraph and the rest of the body copy.
  assert.match(caseStudy, /splitIndex = fullCopy\.indexOf\('\\n\\n'\)/);
  assert.match(caseStudy, /<TerminalHighlight\s+highlight=\{page\.terminalHighlight\}/);
});

test('personal os doctrine page explains the shared workspace memory architecture', () => {
  const caseStudy = read('src/pages/PersonalOSCaseStudy.tsx');

  assert.match(caseStudy, /workspaceMemorySection\?: WorkspaceMemorySection;/);
  assert.match(caseStudy, /Memory OS 想法与 shared 知识库架构/);
  assert.match(caseStudy, /新的父层，定义什么能成为记忆、原则、身份锚点/);
  assert.match(caseStudy, /Memory OS 宪章：定义 L0-L4、promotion rule、读写权限/);
  assert.match(caseStudy, /L0 原始痕迹[\s\S]*L4 身份锚点候选[\s\S]*Views: portfolio \/ resume \/ interview/);
  assert.match(caseStudy, /function MemoryArchitectureHighlight\(\{/);
  assert.match(caseStudy, /data-personal-os-memory-architecture/);
});
