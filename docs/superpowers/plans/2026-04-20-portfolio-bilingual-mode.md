# Portfolio Bilingual Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a site-wide bilingual mode with a fixed top-right `中 / EN` switcher, default Chinese language, `localStorage` persistence, and Chinese fallback whenever English content is not yet available.

**Architecture:** Introduce a lightweight local i18n layer at the app root, migrate shared UI and route metadata to typed bilingual values, then incrementally move slide and case-study content onto the same translation primitives. Keep fallback logic centralized so incomplete English coverage never breaks rendering.

**Tech Stack:** React 19, TypeScript, Vite, React Router, Node test runner

---

### Task 1: Add the bilingual state model and persistence layer

**Files:**
- Create: `src/i18n/types.ts`
- Create: `src/i18n/localization.ts`
- Create: `src/i18n/LanguageProvider.tsx`
- Modify: `src/main.tsx`
- Test: `tests/languageProvider.test.tsx`

- [ ] **Step 1: Write the failing test**

```ts
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  isLanguage,
  pickLocalizedText,
  resolveInitialLanguage,
} from '../src/i18n/localization.ts';

test('language helpers default to zh and fall back to zh when english is missing', () => {
  assert.equal(DEFAULT_LANGUAGE, 'zh');
  assert.equal(isLanguage('zh'), true);
  assert.equal(isLanguage('en'), true);
  assert.equal(isLanguage('jp'), false);
  assert.equal(pickLocalizedText({ zh: '中文', en: 'English' }, 'en'), 'English');
  assert.equal(pickLocalizedText({ zh: '仅中文' }, 'en'), '仅中文');
});

test('resolveInitialLanguage reads only valid persisted values', () => {
  const storage = new Map<string, string>();
  const mockStorage = {
    getItem(key: string) {
      return storage.get(key) ?? null;
    },
  } as Storage;

  assert.equal(resolveInitialLanguage(undefined), 'zh');
  assert.equal(resolveInitialLanguage(mockStorage), 'zh');

  storage.set(LANGUAGE_STORAGE_KEY, 'en');
  assert.equal(resolveInitialLanguage(mockStorage), 'en');

  storage.set(LANGUAGE_STORAGE_KEY, 'fr');
  assert.equal(resolveInitialLanguage(mockStorage), 'zh');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/languageProvider.test.tsx`
Expected: FAIL because the i18n module does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
// src/i18n/types.ts
export type Language = 'zh' | 'en';

export interface LocalizedText {
  zh: string;
  en?: string;
}
```

```ts
// src/i18n/localization.ts
import type { Language, LocalizedText } from './types.ts';

export const DEFAULT_LANGUAGE: Language = 'zh';
export const LANGUAGE_STORAGE_KEY = 'portfolio.language';

export function isLanguage(value: string): value is Language {
  return value === 'zh' || value === 'en';
}

export function resolveInitialLanguage(storage: Pick<Storage, 'getItem'> | undefined): Language {
  const persisted = storage?.getItem(LANGUAGE_STORAGE_KEY);
  return persisted && isLanguage(persisted) ? persisted : DEFAULT_LANGUAGE;
}

export function pickLocalizedText(text: LocalizedText, language: Language): string {
  return language === 'en' ? text.en ?? text.zh : text.zh;
}
```

```tsx
// src/i18n/LanguageProvider.tsx
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, pickLocalizedText, resolveInitialLanguage } from './localization.ts';
import type { Language, LocalizedText } from './types.ts';

interface LanguageContextValue {
  language: Language;
  setLanguage: (next: Language) => void;
  toggleLanguage: () => void;
  text: (value: LocalizedText) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() =>
    typeof window === 'undefined' ? DEFAULT_LANGUAGE : resolveInitialLanguage(window.localStorage),
  );

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    toggleLanguage: () => setLanguage((current) => (current === 'zh' ? 'en' : 'zh')),
    text: (localized) => pickLocalizedText(localized, language),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useI18n must be used within LanguageProvider');
  return context;
}
```

```tsx
// src/main.tsx
import { LanguageProvider } from './i18n/LanguageProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </HashRouter>,
);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/languageProvider.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/languageProvider.test.tsx src/i18n/types.ts src/i18n/localization.ts src/i18n/LanguageProvider.tsx src/main.tsx
git commit -m "feat: add portfolio language provider"
```

### Task 2: Add the fixed top-right language switcher and wire global UI copy

**Files:**
- Create: `src/i18n/uiCopy.ts`
- Create: `src/components/LanguageToggle.tsx`
- Modify: `src/App.tsx`
- Modify: `src/Portfolio.tsx`
- Modify: `src/index.css`
- Test: `tests/languageToggleCopy.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import test from 'node:test';
import assert from 'node:assert/strict';

import { UI_COPY } from '../src/i18n/uiCopy.ts';
import { pickLocalizedText } from '../src/i18n/localization.ts';

test('shared UI copy resolves in both languages with zh fallback', () => {
  assert.equal(pickLocalizedText(UI_COPY.about, 'zh'), 'ABOUT');
  assert.equal(pickLocalizedText(UI_COPY.about, 'en'), 'ABOUT');
  assert.equal(pickLocalizedText(UI_COPY.selectedWorks, 'zh'), '精选作品');
  assert.equal(pickLocalizedText(UI_COPY.selectedWorks, 'en'), 'Selected Works');
  assert.equal(pickLocalizedText(UI_COPY.comingSoon, 'en'), 'Coming Soon');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/languageToggleCopy.test.ts`
Expected: FAIL because the shared UI copy module does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
// src/i18n/uiCopy.ts
export const UI_COPY = {
  about: { zh: 'ABOUT', en: 'ABOUT' },
  selectedWorks: { zh: '精选作品', en: 'Selected Works' },
  back: { zh: '返回', en: 'Back' },
  expandFullscreen: { zh: '展开全屏', en: 'Expand fullscreen' },
  exitFullscreen: { zh: '退出全屏', en: 'Exit fullscreen' },
  comingSoon: { zh: '敬请期待', en: 'Coming Soon' },
  fullscreenHint: { zh: '点击这里可进入全屏查看', en: 'Open fullscreen for a larger reading view' },
} as const;
```

```tsx
// src/components/LanguageToggle.tsx
import { useI18n } from '../i18n/LanguageProvider.tsx';

export default function LanguageToggle() {
  const { language, setLanguage } = useI18n();

  return (
    <div className="language-toggle-shell">
      <button className={language === 'zh' ? 'is-active' : ''} onClick={() => setLanguage('zh')}>中</button>
      <span>/</span>
      <button className={language === 'en' ? 'is-active' : ''} onClick={() => setLanguage('en')}>EN</button>
    </div>
  );
}
```

```tsx
// src/App.tsx
import LanguageToggle from './components/LanguageToggle';

return (
  <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
    <LanguageToggle />
    {/* existing layout */}
  </div>
);
```

```tsx
// src/Portfolio.tsx
import { useI18n } from './i18n/LanguageProvider.tsx';
import { UI_COPY } from './i18n/uiCopy.ts';

const { text } = useI18n();

<button>{text(UI_COPY.about)}</button>
<div>{text(UI_COPY.selectedWorks)}</div>
<span>{p.disabled ? text(UI_COPY.comingSoon) : p.year}</span>
```

```css
/* src/index.css */
.language-toggle-shell {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 120;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid rgba(200, 169, 110, 0.24);
  background: rgba(8, 6, 4, 0.74);
  color: rgba(200, 169, 110, 0.72);
  backdrop-filter: blur(8px);
}

.language-toggle-shell button.is-active {
  color: #f0e8d8;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/languageToggleCopy.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/languageToggleCopy.test.ts src/i18n/uiCopy.ts src/components/LanguageToggle.tsx src/App.tsx src/Portfolio.tsx src/index.css
git commit -m "feat: add global language toggle and ui copy"
```

### Task 3: Migrate project and route metadata to bilingual values

**Files:**
- Modify: `src/projectRegistry.ts`
- Modify: `src/constants/routeDepth.ts`
- Modify: `src/home/homeScenes.ts`
- Modify: `src/pages/PageTemplate.tsx`
- Modify: `src/pages/SubPageCarousel.tsx`
- Modify: `src/constants/chapterNavigation.ts`
- Test: `tests/bilingualRouteMetadata.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import test from 'node:test';
import assert from 'node:assert/strict';

import { PROJECTS } from '../src/projectRegistry.ts';
import { PAGE_META } from '../src/constants/routeDepth.ts';
import { pickLocalizedText } from '../src/i18n/localization.ts';

test('project and route metadata expose bilingual values', () => {
  const jiduProject = PROJECTS.find((project) => project.route === '/jidu-hmi');
  assert.ok(jiduProject);
  assert.equal(pickLocalizedText(jiduProject!.title, 'zh'), '座舱 HMI 设计');
  assert.equal(pickLocalizedText(jiduProject!.title, 'en'), 'Cockpit HMI Design');

  const pageMeta = PAGE_META['/agentic-design-development/language-diary'];
  assert.equal(pickLocalizedText(pageMeta.title, 'zh'), 'A Ritual of Expression - 语言学习陪伴多智能体系统');
  assert.equal(pickLocalizedText(pageMeta.subtitle, 'en'), 'Agentic Design & Development · AI Agent');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/bilingualRouteMetadata.test.ts`
Expected: FAIL because route and project metadata are still plain strings.

- [ ] **Step 3: Write minimal implementation**

```ts
// src/projectRegistry.ts
import type { LocalizedText } from './i18n/types.ts';

export interface SubPage {
  route: string;
  label: LocalizedText;
  numeral: string;
  disabled?: boolean;
  previewMedia?: SubPagePreviewMedia;
}

export interface ProjectEntry {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  year: string;
  tags: LocalizedText[];
  desc: LocalizedText;
  color: string;
  route: string;
  subPages: SubPage[];
  disabled?: boolean;
}

title: { zh: '座舱 HMI 设计', en: 'Cockpit HMI Design' },
subtitle: { zh: 'JIDU Automotive · ADAS HMI Design', en: 'JIDU Automotive · ADAS HMI Design' },
desc: { zh: '...', en: '...' },
```

```ts
// src/constants/routeDepth.ts
import type { LocalizedText } from '../i18n/types.ts';

export interface PageMeta {
  title: LocalizedText;
  subtitle: LocalizedText;
  year: string;
  desc: LocalizedText;
  parent: string | null;
  color: string;
  subPages?: { route: string; label: LocalizedText; numeral: string; disabled?: boolean }[];
  inlineChildRoute?: string;
}
```

```tsx
// src/pages/PageTemplate.tsx
import { useI18n } from '../i18n/LanguageProvider.tsx';

const { text } = useI18n();
const meta = PAGE_META[route];

{text(meta.title)}
{text(meta.subtitle)}
{text(meta.desc)}
```

```tsx
// src/pages/SubPageCarousel.tsx
const { text } = useI18n();
{text(meta.title)}
{text(meta.subtitle)}
{meta.subPages?.map((subPage) => text(subPage.label))}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/bilingualRouteMetadata.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/bilingualRouteMetadata.test.ts src/projectRegistry.ts src/constants/routeDepth.ts src/home/homeScenes.ts src/pages/PageTemplate.tsx src/pages/SubPageCarousel.tsx src/constants/chapterNavigation.ts
git commit -m "feat: localize route and project metadata"
```

### Task 4: Migrate slide-section factories to bilingual section titles and shared content helpers

**Files:**
- Create: `src/i18n/sectionBuilders.tsx`
- Modify: `src/pages/H5DocContent.tsx`
- Modify: `src/pages/H5DocContentPersonalCompanions.tsx`
- Modify: `src/pages/H5DocContentAgenticDrivingPersonalization.tsx`
- Modify: `src/pages/H5DocContentPersonalLanguageDiarySlide04.tsx`
- Modify: `src/pages/H5DocContent3dMapSlide02.tsx`
- Test: `tests/bilingualSectionContent.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import test from 'node:test';
import assert from 'node:assert/strict';

import { pickLocalizedText } from '../src/i18n/localization.ts';
import { getPersonalCompanionsSlideSections } from '../src/pages/H5DocContentPersonalCompanions.tsx';
import { getAgenticDrivingPersonalizationSlide01Sections } from '../src/pages/H5DocContentAgenticDrivingPersonalization.tsx';

test('section builders expose bilingual titles for migrated slides', () => {
  const companionSections = getPersonalCompanionsSlideSections(0, false);
  assert.equal(pickLocalizedText(companionSections[0].title, 'zh'), '项目叙述');
  assert.equal(pickLocalizedText(companionSections[0].title, 'en'), 'Project Narrative');

  const drivingSections = getAgenticDrivingPersonalizationSlide01Sections('#8b7db5');
  assert.equal(
    pickLocalizedText(drivingSections[0].title, 'en'),
    'In assisted driving, should the agent become a driving expert or a personalized driver?'
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/bilingualSectionContent.test.ts`
Expected: FAIL because section titles are still plain strings.

- [ ] **Step 3: Write minimal implementation**

```ts
// src/i18n/sectionBuilders.tsx
import type { ReactNode } from 'react';
import type { LocalizedText } from './types.ts';

export interface LocalizedSectionData {
  id: string;
  numeral: string;
  title: LocalizedText;
  blocks: ReactNode[];
}
```

```tsx
// src/pages/H5DocContent.tsx
import { useI18n } from '../i18n/LanguageProvider.tsx';

function H5Section({ section, accentColor }: { section: LocalizedSectionData; accentColor: string }) {
  const { text } = useI18n();
  return (
    <section id={section.id}>
      <h1>
        <span>{section.numeral}</span>
        <span>{text(section.title)}</span>
      </h1>
      {section.blocks.map((block, idx) => <div key={`${section.id}-${idx}`}>{block}</div>)}
    </section>
  );
}
```

```tsx
// migrated slide example
return [{
  id: 'companions-overview',
  numeral: 'I',
  title: { zh: '项目叙述', en: 'Project Narrative' },
  blocks: [/* existing JSX */],
}];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/bilingualSectionContent.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/bilingualSectionContent.test.ts src/i18n/sectionBuilders.tsx src/pages/H5DocContent.tsx src/pages/H5DocContentPersonalCompanions.tsx src/pages/H5DocContentAgenticDrivingPersonalization.tsx src/pages/H5DocContentPersonalLanguageDiarySlide04.tsx src/pages/H5DocContent3dMapSlide02.tsx
git commit -m "feat: localize migrated slide section headings"
```

### Task 5: Migrate long-form case-study components and slide-copy batches with zh fallback

**Files:**
- Modify: `src/pages/FuliPlusCaseStudy.tsx`
- Modify: `src/pages/AiInteriorSystemCaseStudy.tsx`
- Modify: `src/pages/H5DocContentPhoenixComponentFrameworkSlide01.tsx`
- Modify: `src/pages/H5DocContentPhoenixSemanticSystemSlide01.tsx`
- Modify: `src/pages/H5DocContentPhoenixSemanticSystemSlide02.tsx`
- Modify: `src/pages/H5DocContentPhoenixSemanticSystemSlide03.tsx`
- Test: `tests/bilingualCaseStudyFallback.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import test from 'node:test';
import assert from 'node:assert/strict';

import { pickLocalizedText } from '../src/i18n/localization.ts';
import { getAiInteriorSystemPages } from '../src/pages/AiInteriorSystemCaseStudy.tsx';
import { getFuliPlusCaseStudySlides } from '../src/pages/FuliPlusCaseStudy.tsx';

test('case-study data supports english copy and zh fallback', () => {
  const interiorPages = getAiInteriorSystemPages();
  assert.equal(
    pickLocalizedText(interiorPages[0].pageTitle, 'en'),
    'AI Interior System: from room generation to understanding lived scenes'
  );

  const fuliSlides = getFuliPlusCaseStudySlides();
  assert.equal(
    pickLocalizedText(fuliSlides[0].sections[0].title, 'en'),
    pickLocalizedText(fuliSlides[0].sections[0].title, 'zh'),
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/bilingualCaseStudyFallback.test.ts`
Expected: FAIL because the case-study content model still uses plain strings.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/pages/AiInteriorSystemCaseStudy.tsx
import type { LocalizedText } from '../i18n/types.ts';

interface AiInteriorPage {
  pageTitle: LocalizedText;
  pageSummary?: LocalizedText;
}

pageTitle: {
  zh: 'AI 室内设计系统：从房间生成到生活场景理解',
  en: 'AI Interior System: from room generation to understanding lived scenes',
},
```

```tsx
// src/pages/FuliPlusCaseStudy.tsx
interface FuliSection {
  title: LocalizedText;
}

title: {
  zh: '用户真实输入往往是模糊的语义',
  en: 'Real user input usually begins as ambiguous semantics',
},

title: {
  zh: '第一轮真正要解决的不是“生成”，而是“展开方向空间”',
},
```

```tsx
// render sites
const { text } = useI18n();
<h2>{text(section.title)}</h2>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/bilingualCaseStudyFallback.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/bilingualCaseStudyFallback.test.ts src/pages/FuliPlusCaseStudy.tsx src/pages/AiInteriorSystemCaseStudy.tsx src/pages/H5DocContentPhoenixComponentFrameworkSlide01.tsx src/pages/H5DocContentPhoenixSemanticSystemSlide01.tsx src/pages/H5DocContentPhoenixSemanticSystemSlide02.tsx src/pages/H5DocContentPhoenixSemanticSystemSlide03.tsx
git commit -m "feat: localize case study content batches"
```

### Task 6: Verify app-wide behavior, build stability, and migration safety

**Files:**
- Modify: `docs/superpowers/specs/2026-04-20-portfolio-bilingual-mode-design.md`
- Modify: `docs/superpowers/plans/2026-04-20-portfolio-bilingual-mode.md`

- [ ] **Step 1: Run focused test suite**

```bash
node --test tests/languageProvider.test.tsx tests/languageToggleCopy.test.ts tests/bilingualRouteMetadata.test.ts tests/bilingualSectionContent.test.ts tests/bilingualCaseStudyFallback.test.ts
```

Expected: PASS

- [ ] **Step 2: Run existing regression tests that touch routing and content**

```bash
node --test tests/homeEntryState.test.ts tests/aiInteriorCaseStudyRouting.test.ts tests/aiInteriorRouteConfig.test.ts tests/aiInteriorSlideMedia.test.ts tests/chapterPreviewPlacement.test.ts
```

Expected: PASS

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: PASS with Vite production bundle emitted and no TypeScript errors.

- [ ] **Step 4: Perform manual verification**

```text
1. Open the home route and confirm the fixed `中 / EN` switcher stays at the top-right.
2. Toggle to English and refresh; confirm the selected language persists.
3. Visit at least one project root and one multi-slide detail route; confirm titles/subtitles update.
4. Visit one migrated slide and one untranslated slide in English mode; confirm untranslated copy falls back to Chinese.
5. Check desktop and mobile layouts for switcher overlap with ABOUT, title bars, and expanded reading mode.
```

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/specs/2026-04-20-portfolio-bilingual-mode-design.md docs/superpowers/plans/2026-04-20-portfolio-bilingual-mode.md
git commit -m "docs: record bilingual mode verification"
```
