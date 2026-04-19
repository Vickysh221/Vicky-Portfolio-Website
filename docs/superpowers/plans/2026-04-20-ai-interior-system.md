# AI Interior System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `/agentic-design-development/ai-interior-system` case study under the Creation section, with a two-slide narrative flow covering product reframing, three-layer semantic mapping, and user tag matching.

**Architecture:** Reuse the existing narrative case-study rendering path rather than inventing a new page type. Create a focused case-study component for the interior project, wire it into the same routing/content registry system used by existing projects, and add only the minimal new media block primitives needed for the ordered image/video storytelling on slide 2.

**Tech Stack:** React 19, TypeScript, Vite, existing portfolio route registry and case-study rendering system

---

### Task 1: Lock the route metadata and home entry points

**Files:**
- Modify: `src/projectRegistry.ts`
- Modify: `src/constants/routeDepth.ts`
- Modify: `src/home/chapterSummaries.ts`
- Modify: `src/home/homeScenes.ts`
- Test: `tests/aiInteriorRouteConfig.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import test from 'node:test';
import assert from 'node:assert/strict';

import { PROJECTS } from '../src/projectRegistry.ts';
import { PAGE_META, SLIDE_COUNTS } from '../src/constants/routeDepth.ts';
import { CHAPTER_SUMMARIES } from '../src/home/chapterSummaries.ts';

test('ai interior system is registered under agentic-design-development with two slides', () => {
  const project = PROJECTS.find((entry) => entry.route === '/agentic-design-development');
  const subPage = project?.subPages.find((entry) => entry.route === '/agentic-design-development/ai-interior-system');

  assert.ok(subPage);
  assert.equal(SLIDE_COUNTS['/agentic-design-development/ai-interior-system'], 2);
  assert.equal(PAGE_META['/agentic-design-development/ai-interior-system']?.parent, '/agentic-design-development');
  assert.ok(CHAPTER_SUMMARIES['/agentic-design-development/ai-interior-system']);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/aiInteriorRouteConfig.test.ts`
Expected: FAIL because the new route and metadata do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
// src/projectRegistry.ts
import interiorPreview from './images/covers/cover-interior.png';

// inside the /agentic-design-development subPages array
{ route: '/agentic-design-development/ai-interior-system', label: 'AI 室内设计系统的问题重构与交互定义', numeral: 'VI', previewMedia: { src: interiorPreview, type: 'image' } },
```

```ts
// src/constants/routeDepth.ts
'/agentic-design-development/ai-interior-system': -16600,

'/agentic-design-development/ai-interior-system': 2,

'/agentic-design-development/ai-interior-system': {
  title: 'AI 室内设计系统的问题重构与交互定义',
  subtitle: 'Agentic Design & Development · Spatial Semantics',
  year: '2025',
  desc: '从 0 到 1 重构 AI 室内设计系统的问题定义，把空间理解成生活场景容器，并建立用户 / 空间 / 家具三层语义中间层。',
  parent: '/agentic-design-development',
  color: '#8b7db5',
},
```

```ts
// src/home/chapterSummaries.ts
'/agentic-design-development/ai-interior-system':
  '把 AI 室内设计从“生成一个房间”改写成“理解一种生活方式”——先建立用户、空间与家具之间的语义结构，再让生成能力进入产品。'
```

```ts
// src/home/homeScenes.ts
getSubPageOrThrow('/agentic-design-development', '/agentic-design-development/ai-interior-system'),
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/aiInteriorRouteConfig.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/aiInteriorRouteConfig.test.ts src/projectRegistry.ts src/constants/routeDepth.ts src/home/chapterSummaries.ts src/home/homeScenes.ts
git commit -m "feat: register ai interior system case study"
```

### Task 2: Add a dedicated case-study component and route it into the content layer

**Files:**
- Create: `src/pages/AiInteriorSystemCaseStudy.tsx`
- Modify: `src/pages/H5DocContent.tsx`
- Test: `tests/aiInteriorCaseStudyRouting.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import test from 'node:test';
import assert from 'node:assert/strict';

import { hasSectionContent } from '../src/pages/H5DocContent.tsx';

test('ai interior system route exposes section content for both slides', () => {
  assert.equal(hasSectionContent('/agentic-design-development/ai-interior-system', 0), true);
  assert.equal(hasSectionContent('/agentic-design-development/ai-interior-system', 1), true);
  assert.equal(hasSectionContent('/agentic-design-development/ai-interior-system', 2), false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/aiInteriorCaseStudyRouting.test.ts`
Expected: FAIL because the route is not recognized by the content layer yet.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/pages/H5DocContent.tsx
import AiInteriorSystemCaseStudy, { hasAiInteriorSystemCaseStudy } from './AiInteriorSystemCaseStudy';

export function hasSectionContent(route: string, slideIndex = 0): boolean {
  if (hasAiInteriorSystemCaseStudy(route, slideIndex)) return true;
  // existing checks...
}

export default function H5DocContent(...) {
  if (hasAiInteriorSystemCaseStudy(route, slideIndex)) {
    return (
      <AiInteriorSystemCaseStudy
        route={route}
        accentColor={accentColor}
        slideIndex={slideIndex}
        isMobile={isMobile}
        enableMotion={enableNarrativeMotion}
      />
    );
  }
  // existing branches...
}
```

```tsx
// src/pages/AiInteriorSystemCaseStudy.tsx
export const AI_INTERIOR_SYSTEM_PAGE_COUNT = 2;

export function hasAiInteriorSystemCaseStudy(route: string, slideIndex = 0): boolean {
  return route === '/agentic-design-development/ai-interior-system' && slideIndex >= 0 && slideIndex < AI_INTERIOR_SYSTEM_PAGE_COUNT;
}

export default function AiInteriorSystemCaseStudy() {
  return null;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/aiInteriorCaseStudyRouting.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/aiInteriorCaseStudyRouting.test.ts src/pages/H5DocContent.tsx src/pages/AiInteriorSystemCaseStudy.tsx
git commit -m "feat: route ai interior system through case study renderer"
```

### Task 3: Build slide 1 with intro video and three-layer semantic mapping story

**Files:**
- Modify: `src/pages/AiInteriorSystemCaseStudy.tsx`
- Test: `tests/aiInteriorSlideMedia.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import test from 'node:test';
import assert from 'node:assert/strict';

import { getAiInteriorSystemPages } from '../src/pages/AiInteriorSystemCaseStudy.tsx';

test('slide 1 begins with the intro video and includes the mapping images', () => {
  const pages = getAiInteriorSystemPages();
  const firstPage = pages[0];

  assert.equal(firstPage.pageTitle, 'AI 室内设计系统：从房间生成到生活场景理解');
  assert.equal(firstPage.visualBlocks[0]?.type, 'videoFeature');
  assert.equal(firstPage.visualBlocks[1]?.type, 'heroImage');
  assert.equal(firstPage.visualBlocks[2]?.type, 'heroImage');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/aiInteriorSlideMedia.test.ts`
Expected: FAIL because the case-study page data and video block type do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```tsx
// inside src/pages/AiInteriorSystemCaseStudy.tsx
import interiorIntroVideo from '../images/interior/video02.mp4';
import interiorPicture4 from '../images/interior/Picture4.png';
import interiorPicture5 from '../images/interior/Picture5.png';

type VisualBlock =
  | { type: 'videoFeature'; title?: string; src: string; caption?: string }
  | { type: 'heroImage'; title?: string; src: string; caption: string };

export function getAiInteriorSystemPages() {
  return [
    {
      pageTitle: 'AI 室内设计系统：从房间生成到生活场景理解',
      pageGoal: '说明这是一次问题重构与产品概念定义，而不是单纯的效果图生成。',
      mainCopy: '从 0 到 1 重构 AI 室内设计系统的问题定义，提出“空间不是房间，而是生活场景容器”的产品概念，改变系统理解用户需求的方式。',
      contentBlocks: [
        {
          type: 'shortParagraphs',
          title: '项目说明',
          items: [
            '设计基于家庭成员、生活习惯、审美偏好、功能刚需与智能化倾向的卡牌式交互机制，以低认知负担采集高质量语义信号。',
            '建立 用户 / 空间 / 家具 的三层映射逻辑，将用户画像、空间语义与家具特征组织为统一中间层，解决底层生成能力缺少上层设计语言的问题。',
            '串联需求采集、画像生成、空间推荐、家具组合生成、商品绑定、全景预览与估价的完整链路，把 AI 3D 生成与智能排布能力包装成可理解、可推演、可商业化的设计体验。',
          ],
        },
      ],
      visualBlocks: [
        { type: 'videoFeature', title: 'Project demo', src: interiorIntroVideo, caption: '产品功能演示' },
        { type: 'heroImage', title: 'user-space-furniture mapping', src: interiorPicture4, caption: '用户、空间与家具不是孤立字段，而是同一套设计语义结构的三个入口。' },
        { type: 'heroImage', title: 'semantic middle layer', src: interiorPicture5, caption: '统一中间层把用户画像、空间语义与家具特征组织在一起，让上层设计语言能够稳定进入生成链路。' },
      ],
    },
  ];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/aiInteriorSlideMedia.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/aiInteriorSlideMedia.test.ts src/pages/AiInteriorSystemCaseStudy.tsx
git commit -m "feat: add ai interior system intro slide"
```

### Task 4: Build slide 2 with ordered tag-matching media and narrative explanation

**Files:**
- Modify: `src/pages/AiInteriorSystemCaseStudy.tsx`
- Test: `tests/aiInteriorSlide02Sequence.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import test from 'node:test';
import assert from 'node:assert/strict';

import { getAiInteriorSystemPages } from '../src/pages/AiInteriorSystemCaseStudy.tsx';

test('slide 2 keeps the required user-tag media order', () => {
  const pages = getAiInteriorSystemPages();
  const secondPage = pages[1];

  assert.equal(secondPage.pageTitle, '用户标签匹配与语义采集机制');
  assert.deepEqual(
    secondPage.visualBlocks.map((block) => block.type),
    ['heroImage', 'videoFeature', 'videoFeature', 'heroImage', 'heroImage'],
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/aiInteriorSlide02Sequence.test.ts`
Expected: FAIL because slide 2 does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```tsx
// inside src/pages/AiInteriorSystemCaseStudy.tsx
import interiorPicture1 from '../images/interior/Picture1.png';
import interiorPicture2 from '../images/interior/Picture2.png';
import interiorPicture3 from '../images/interior/Picture3.png';
import interiorVideo1 from '../images/interior/video01.mp4';
import interiorVideo2 from '../images/interior/video02.mp4';

// append the second page in getAiInteriorSystemPages()
{
  pageTitle: '用户标签匹配与语义采集机制',
  pageGoal: '展示低负担卡牌交互如何把家庭结构、生活习惯与审美偏好变成高质量语义输入。',
  mainCopy: '这一页不把用户理解为一组表单字段，而是把用户标签匹配做成一种渐进式的生活方式辨认过程：家庭成员、日常习惯、审美偏好、功能刚需与智能化倾向被组织成可快速判断、可逐步收束的卡牌式交互。',
  contentBlocks: [
    {
      type: 'comparisonCards',
      title: '从标签采集到设计推演',
      items: [
        { title: 'low-burden intake', body: '用卡牌式选择降低输入门槛，让用户愿意给出更真实、更连续的生活信号。' },
        { title: 'profile synthesis', body: '系统把分散标签重新组织成可作用于空间推荐和家具组合的用户画像。' },
        { title: 'product-chain continuity', body: '标签不是停在 intake 页，而是继续进入空间推荐、商品绑定、全景预览与估价链路。' },
      ],
    },
  ],
  visualBlocks: [
    { type: 'heroImage', title: 'tag matching 01', src: interiorPicture1, caption: '标签匹配先从生活方式的主轮廓开始，而不是直接逼用户定义风格。' },
    { type: 'videoFeature', title: 'tag matching 02', src: interiorVideo1, caption: '卡牌式交互把语义采集变成连续判断，而不是一次性填空。' },
    { type: 'videoFeature', title: 'tag matching 03', src: interiorVideo2, caption: '用户反馈会继续改变推荐链路，让系统理解不是静态快照。' },
    { type: 'heroImage', title: 'tag matching 04', src: interiorPicture2, caption: '空间推荐开始把用户画像与场景容器连接起来。' },
    { type: 'heroImage', title: 'tag matching 05', src: interiorPicture3, caption: '家具组合、商品绑定与全景预览把语义结构推进成商业化体验。' },
  ],
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/aiInteriorSlide02Sequence.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/aiInteriorSlide02Sequence.test.ts src/pages/AiInteriorSystemCaseStudy.tsx
git commit -m "feat: add ai interior system tag-matching slide"
```

### Task 5: Render mixed media blocks and verify the full project builds

**Files:**
- Modify: `src/pages/AiInteriorSystemCaseStudy.tsx`
- Test: `npm run build`

- [ ] **Step 1: Write the failing test**

```tsx
// Add a render branch that is intentionally absent first:
case 'videoFeature':
  throw new Error('unimplemented');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL due to the temporary unimplemented video feature render branch.

- [ ] **Step 3: Write minimal implementation**

```tsx
case 'videoFeature':
  return (
    <div style={{ ...blockPanel, padding: 12 }}>
      {block.title ? <div style={sectionLabelStyle(accentColor)}>{block.title}</div> : null}
      <video
        src={block.src}
        controls
        muted
        playsInline
        preload="metadata"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          borderRadius: 16,
          border: '1px solid rgba(200,169,110,0.12)',
          background: 'rgba(7,6,5,0.92)',
        }}
      />
      {block.caption ? <div style={{ color: '#8f7d61', fontSize: 13, marginTop: 10, lineHeight: 1.7 }}>{block.caption}</div> : null}
    </div>
  );
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/AiInteriorSystemCaseStudy.tsx
git commit -m "feat: render ai interior system mixed media case study"
```
