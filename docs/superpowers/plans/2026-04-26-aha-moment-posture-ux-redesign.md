# Aha Moment 七姿态 UX 重构 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `/language-diary-ux-showcase/index.html` 中 02 节"六种 AGENT 前台形态"重构为"七种 Aha Mode 介入姿态"，每姿态用 storyboard 讲清场景；引入统一视觉语言（amber token、三层卡结构、marker 三件套、可反驳原则）；iPhone chrome 全节升级为真灵动岛；删除 03 场景佐证；同步 React page-2 文案。

**Architecture:** 改动集中在两个文件：(1) `public/language-diary-ux-showcase/index.html` —— 在现有 `<style>` 块尾部追加 ~22 个新 CSS 类（Aha 视觉语言 + iPhone chrome + 姿态特定载体 + storyboard 元数据），替换 `#s00` legend、`#mode-context` 整段，删除 `#case-evidence`，升级所有现存 `.phone-statusbar` 结构。(2) `src/pages/SharedMemoryAhaCaseStudy.tsx` —— 改写 `sharedMemoryAhaPages[1]` 的 `mainCopy` 与 `contentBlocks`，微调 `[2]` 的 caption。结构性回归用 node test runner 文件内容断言锁定。

**Tech Stack:** 静态 HTML + 内联 `<style>`（无外部 CSS framework）/ React 19 + TypeScript（functional components, inline CSS）/ Vitest-style tests via `node:test` + 文件内容 regex 断言（参考 `tests/languageDiaryShowcaseModal.test.ts` 已有模式）/ `npm run build` (tsc + vite build)。

**Spec:** `docs/superpowers/specs/2026-04-26-aha-moment-posture-ux-redesign.md`

---

## File Structure

修改文件：
- `public/language-diary-ux-showcase/index.html` — showcase 主体（CSS 追加 + legend 替换 + section 02 重写 + section 03 删除）
- `src/pages/SharedMemoryAhaCaseStudy.tsx` — page-2 contentBlocks 改写 + page-3 caption 微调

新建测试文件：
- `tests/ahaMomentPostureShowcase.test.ts` — showcase HTML 结构性断言（七姿态 storyboard 存在、03 已删除、灵动岛升级、CSS token 出现）
- `tests/ahaMomentPostureCopy.test.ts` — React page 文案断言（7 卡姿态、mainCopy 关键词）

不动文件：
- `src/Portfolio.tsx`、路由、`SubPageCarousel.tsx`、其他案例研究页

---

## Task 1: 引入 Aha 视觉语言 CSS tokens 和基础组件

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`（在 `<style>` 块尾部 `</style>` 之前追加；找 `</style>` 的位置用 grep）

- [ ] **Step 1: 写测试**

新建 `tests/ahaMomentPostureShowcase.test.ts`：

```typescript
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
```

- [ ] **Step 2: 运行测试，确认失败**

Run: `node --import tsx --test tests/ahaMomentPostureShowcase.test.ts`
Expected: 2 tests fail（tokens 与 components 都还没加）

- [ ] **Step 3: 实施 — 在 `:root` token 块尾部加入 amber tokens**

找 `index.html` 中的 `--orchestrator-mark:  #1b1b1f;` 一行（约 line 41），在它之后、`}` 之前追加：

```css
      /* Aha Mode 视觉语言 token */
      --aha-amber: #c8854a;
      --aha-amber-soft: rgba(200, 133, 74, 0.16);
```

- [ ] **Step 4: 实施 — 在 `<style>` 末尾（`</style>` 之前）追加 Aha 基础组件**

```css
    /* ============ Aha Mode 视觉语言 ============ */

    .aha-card {
      border: 1px solid rgba(0,0,0,0.08);
      border-left: 2px solid var(--aha-amber);
      border-radius: 12px;
      background: #fff;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .aha-card--reverse {
      background: rgba(0,0,0,0.55);
      border-color: rgba(255,255,255,0.18);
      color: #fff;
    }
    .aha-card-header {
      font-size: 9px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--aha-amber);
      font-family: "Black Han Sans", sans-serif;
    }
    .aha-card--reverse .aha-card-header {
      color: rgba(255,255,255,0.92);
    }
    .aha-card-body {
      font-size: 12px;
      line-height: 1.5;
      color: var(--ink);
    }
    .aha-card--reverse .aha-card-body {
      color: #fff;
    }
    .aha-card-footer {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 2px;
    }

    .aha-marker-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: var(--aha-amber-soft);
      margin-left: 2px;
      vertical-align: middle;
    }

    .aha-island-dot {
      width: 5px;
      height: 5px;
      border-radius: 999px;
      background: var(--aha-amber);
      flex: 0 0 auto;
    }

    .aha-hint-glow {
      box-shadow: 0 0 0 2px var(--aha-amber-soft);
      border-radius: 999px;
    }

    .rebuttal-row {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .rebuttal-pill {
      height: 22px;
      padding: 0 8px;
      border-radius: 999px;
      border: 1px solid rgba(200, 133, 74, 0.4);
      color: var(--aha-amber);
      font-size: 9px;
      letter-spacing: 0.04em;
      display: inline-flex;
      align-items: center;
      background: transparent;
      font-family: "Black Han Sans", sans-serif;
    }
    .rebuttal-pill:hover {
      background: var(--aha-amber-soft);
    }
    .rebuttal-pill--reverse {
      color: rgba(255,255,255,0.92);
      border-color: rgba(255,255,255,0.32);
    }
```

- [ ] **Step 5: 运行测试，确认通过**

Run: `node --import tsx --test tests/ahaMomentPostureShowcase.test.ts`
Expected: 2 tests PASS

- [ ] **Step 6: 提交**

```bash
git add public/language-diary-ux-showcase/index.html tests/ahaMomentPostureShowcase.test.ts
git commit -m "feat(showcase): introduce aha visual language tokens and base components"
```

---

## Task 2: 引入真灵动岛三态 CSS

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`（追加到 `<style>` 末尾）

- [ ] **Step 1: 追加测试到 `tests/ahaMomentPostureShowcase.test.ts`**

```typescript
test('showcase declares dynamic island three states', () => {
  const html = readShowcase();
  assert.match(html, /\.dynamic-island\s*\{/);
  assert.match(html, /\.dynamic-island--compact\s*\{/);
  assert.match(html, /\.dynamic-island--expanded\s*\{/);
  // idle 尺寸接近 116x28
  assert.match(html, /\.dynamic-island\s*\{[\s\S]*?width:\s*116px[\s\S]*?height:\s*28px/);
});
```

- [ ] **Step 2: 运行测试，确认失败**

Run: `node --import tsx --test tests/ahaMomentPostureShowcase.test.ts`
Expected: new test fails

- [ ] **Step 3: 实施 — 追加灵动岛 CSS**

```css
    /* ============ iPhone Dynamic Island ============ */

    .dynamic-island {
      width: 116px;
      height: 28px;
      border-radius: 999px;
      background: #0a0a0d;
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: width 0.2s ease;
    }
    .dynamic-island--compact {
      width: 190px;
      padding: 0 12px;
      gap: 8px;
      justify-content: space-between;
    }
    .dynamic-island--compact .island-text {
      color: rgba(255,255,255,0.92);
      font-family: "Black Han Sans", sans-serif;
      font-size: 9px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
    .dynamic-island--expanded {
      width: 100%;
      max-width: 330px;
      height: 84px;
      border-radius: 28px;
      flex-direction: column;
      align-items: stretch;
      padding: 12px 16px;
      gap: 4px;
    }
    .dynamic-island--expanded .island-reason {
      color: rgba(255,255,255,0.92);
      font-size: 11px;
      line-height: 1.45;
    }
    .dynamic-island--expanded .island-actions {
      display: flex;
      gap: 6px;
      margin-top: 4px;
    }
```

- [ ] **Step 4: 运行测试，确认通过**

Run: `node --import tsx --test tests/ahaMomentPostureShowcase.test.ts`
Expected: PASS

- [ ] **Step 5: 提交**

```bash
git add -p public/language-diary-ux-showcase/index.html tests/ahaMomentPostureShowcase.test.ts
git commit -m "feat(showcase): add dynamic island three states (idle/compact/expanded)"
```

---

## Task 3: 引入姿态特定载体 CSS（banner-top / inline-suggestion / return-sheet / micro-session）

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`

- [ ] **Step 1: 追加测试**

```typescript
test('showcase declares posture-specific carriers', () => {
  const html = readShowcase();
  assert.match(html, /\.os-banner-top\s*\{/);
  assert.match(html, /\.inline-suggestion\s*\{/);
  assert.match(html, /\.return-sheet\s*\{/);
  assert.match(html, /\.return-sheet-grabber\s*\{/);
  assert.match(html, /\.micro-session-frame\s*\{/);
  assert.match(html, /\.micro-session-step\s*\{/);
});
```

- [ ] **Step 2: 运行测试，确认失败**

- [ ] **Step 3: 追加 CSS**

```css
    /* ============ 姿态特定载体 ============ */

    .os-banner-top {
      margin: 0 8px;
      padding: 8px 12px;
      border-radius: 14px;
      background: rgba(255,255,255,0.94);
      backdrop-filter: blur(12px);
      box-shadow: 0 6px 18px rgba(0,0,0,0.14);
      display: flex;
      gap: 10px;
      align-items: flex-start;
      font-size: 11px;
    }
    .os-banner-top-icon {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      background: var(--aha-amber);
      flex: 0 0 auto;
    }
    .os-banner-top-time {
      color: var(--ink-muted);
      font-size: 9px;
      letter-spacing: 0.06em;
    }

    .inline-suggestion {
      margin: 6px 8px 0;
      padding: 8px 10px;
      border-radius: 14px;
      background: rgba(255,255,255,0.96);
      border: 1px solid rgba(0,0,0,0.06);
      border-left: 2px solid var(--aha-amber);
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .inline-suggestion-chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .return-sheet {
      margin-top: auto;
      background: #fff;
      border-radius: 24px 24px 0 0;
      padding: 12px 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      box-shadow: 0 -8px 24px rgba(0,0,0,0.18);
    }
    .return-sheet-grabber {
      width: 36px;
      height: 4px;
      border-radius: 999px;
      background: rgba(0,0,0,0.18);
      align-self: center;
      margin-bottom: 4px;
    }
    .return-sheet--reverse {
      background: #1f1d2a;
      color: #fff;
    }

    .micro-session-frame {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 12px 14px;
      gap: 10px;
      background: linear-gradient(180deg, rgba(200,133,74,0.10), rgba(200,133,74,0.02));
    }
    .micro-session-step-row {
      display: flex;
      gap: 4px;
    }
    .micro-session-step {
      flex: 1;
      height: 4px;
      border-radius: 999px;
      background: rgba(0,0,0,0.10);
    }
    .micro-session-step--done { background: var(--aha-amber); }
    .micro-session-step--active { background: var(--aha-amber); opacity: 0.55; }
    .micro-session-step-label {
      font-size: 10px;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      color: var(--aha-amber);
      font-family: "Black Han Sans", sans-serif;
    }
    .micro-session-content {
      flex: 1;
      font-size: 12px;
      line-height: 1.5;
      color: var(--ink);
    }
```

- [ ] **Step 4: 运行测试，确认通过**

Run: `node --import tsx --test tests/ahaMomentPostureShowcase.test.ts`

- [ ] **Step 5: 提交**

```bash
git commit -am "feat(showcase): add posture-specific carriers (banner-top/inline/sheet/session)"
```

---

## Task 4: 引入 storyboard 元数据 CSS

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`

- [ ] **Step 1: 追加测试**

```typescript
test('showcase declares storyboard meta classes', () => {
  const html = readShowcase();
  assert.match(html, /\.posture-storyboard\s*\{/);
  assert.match(html, /\.storyboard-arrow\s*\{/);
  assert.match(html, /\.storyboard-frame-label\s*\{/);
  assert.match(html, /\.posture-meta\s*\{/);
  assert.match(html, /\.posture-block\s*\{/);
});
```

- [ ] **Step 2: 运行测试，确认失败**

- [ ] **Step 3: 追加 CSS**

```css
    /* ============ Storyboard 元数据 ============ */

    .posture-block {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
      border: var(--border);
      border-radius: 16px;
      background: var(--paper);
      box-shadow: var(--shadow-md);
    }

    .posture-block-head {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .posture-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
      font-size: 10px;
      letter-spacing: 0.06em;
      color: var(--ink-muted);
      font-family: "Black Han Sans", sans-serif;
    }
    .posture-meta strong {
      color: var(--aha-amber);
      font-size: 11px;
    }

    .posture-storyboard {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 14px;
      align-items: flex-start;
    }

    .storyboard-frame {
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 0 0 200px;
    }

    .storyboard-frame-label {
      font-size: 9px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--ink-muted);
      font-family: "Black Han Sans", sans-serif;
    }

    .storyboard-arrow {
      align-self: center;
      font-size: 16px;
      color: var(--ink-soft);
      padding: 0 4px;
    }

    .storyboard-frame-state {
      font-size: 10px;
      color: var(--ink-muted);
      line-height: 1.4;
    }

    .posture-block-writeback {
      font-size: 11px;
      line-height: 1.5;
      color: var(--ink-muted);
      padding-top: 6px;
      border-top: 1px dashed rgba(22,22,26,0.12);
    }

    .posture-block-rebuttal {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .posture-block-rebuttal-label {
      font-size: 9px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--aha-amber);
      font-family: "Black Han Sans", sans-serif;
    }
```

- [ ] **Step 4: 测试通过 + 提交**

```bash
node --import tsx --test tests/ahaMomentPostureShowcase.test.ts
git commit -am "feat(showcase): add storyboard meta classes"
```

---

## Task 5: 升级所有现存 `.phone-statusbar` 结构（含 idle 灵动岛）

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`（所有出现 `.phone-statusbar` 的地方）

**Background:** 当前所有 `.phone-statusbar` 内是 `<span>9:41</span><span>●●●</span>`。要升级为含 idle 灵动岛的三段结构，但不改变 mode-01 phone 的叙事内容（它们的灵动岛保持 idle）。

- [ ] **Step 1: 追加测试**

```typescript
test('phone statusbar uses three-segment structure with island', () => {
  const html = readShowcase();
  // 不应再保留旧 ●●● 形式
  assert.equal(html.includes('<span>●●●</span>'), false, 'old statusbar dots should be replaced');
  // 新结构必须有 status-time / dynamic-island / status-icons
  assert.match(html, /class="status-time">9:41/);
  assert.match(html, /class="status-icons"/);
});
```

- [ ] **Step 2: 运行测试，确认失败**

- [ ] **Step 3: 升级 statusbar CSS**

修改 line 367 附近的 `.phone-statusbar`：

```css
    .phone-statusbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 14px 4px;
      flex: 0 0 auto;
      gap: 8px;
    }
    .phone-statusbar .status-time {
      font-family: "Black Han Sans", sans-serif;
      font-size: 11px;
      color: var(--ink);
      flex: 0 0 auto;
      min-width: 36px;
    }
    .phone-statusbar .status-icons {
      display: flex;
      gap: 4px;
      flex: 0 0 auto;
      min-width: 36px;
      justify-content: flex-end;
      color: var(--ink);
      font-size: 10px;
      letter-spacing: 0.06em;
    }
    .phone-screen--night .phone-statusbar .status-time,
    .phone-screen--deep .phone-statusbar .status-time,
    .phone-screen--night .phone-statusbar .status-icons,
    .phone-screen--deep .phone-statusbar .status-icons {
      color: #fff;
    }
```

- [ ] **Step 4: 用脚本批量替换 statusbar 内容**

执行(使用 sed 替换需要小心；改成手动 Edit replace_all)：

把所有形如 `<div class="phone-statusbar"><span>HH:MM</span><span>●●●</span></div>` 改成新结构。出现时间值有 `9:41` / `12:08` / `3:22` / `8:15` / `10:05` / `4:12` / `22:14` 等多种。

最稳妥：分别 replace_all 每一种。先列出所有变体（grep）：

```bash
grep -oE '<div class="phone-statusbar"[^>]*>.*?</div>' public/language-diary-ux-showcase/index.html | sort -u
```

预计形式：
- `<div class="phone-statusbar"><span>9:41</span><span>●●●</span></div>`
- `<div class="phone-statusbar"><span>12:08</span><span>●●●</span></div>`
- `<div class="phone-statusbar"><span>3:22</span><span>●●●</span></div>`
- `<div class="phone-statusbar"><span>8:15</span><span>●●●</span></div>`
- `<div class="phone-statusbar"><span>10:05</span><span>●●●</span></div>`
- `<div class="phone-statusbar"><span>4:12</span><span>●●●</span></div>`
- `<div class="phone-statusbar" style="color:#fff;"><span style="color:#fff;">10:05</span><span style="color:#fff;">●●●</span></div>`

对每种用 Edit replace_all 替换为：

```html
<div class="phone-statusbar"><span class="status-time">12:08</span><div class="dynamic-island"></div><span class="status-icons">●●●</span></div>
```

(把时间值替换成对应实际值；深底色 phone 的 `style="color:#fff;"` 保留在外层 div 上即可，子节点会继承)

对深底色版本：

```html
<div class="phone-statusbar" style="color:#fff;"><span class="status-time">10:05</span><div class="dynamic-island"></div><span class="status-icons">●●●</span></div>
```

- [ ] **Step 5: 运行测试，确认通过**

Run: `node --import tsx --test tests/ahaMomentPostureShowcase.test.ts`

- [ ] **Step 6: 提交**

```bash
git commit -am "refactor(showcase): upgrade all phone statusbars to three-segment layout with idle island"
```

---

## Task 6: 替换 `#s00` legend 为七姿态卡片

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`（替换 line 1404–1462 范围内的 legend 内容）

- [ ] **Step 1: 追加测试**

```typescript
test('legend uses seven postures instead of six forms', () => {
  const html = readShowcase();
  // 旧词不应再出现在 legend 中
  assert.equal(html.includes('六种AGENT前台形态'), false);
  // 新词必须出现
  assert.match(html, /七种 Aha Mode 介入姿态/);
  // 七种姿态英文名都要出现
  assert.match(html, /\bTrace\b/);
  assert.match(html, /\bAmbient\b/);
  assert.match(html, /\bInline\b/);
  assert.match(html, /\bMorphing\b/);
  assert.match(html, /\bEcho\b/);
  assert.match(html, /\bCo-creation\b/);
  assert.match(html, /\bAgentic Action\b/);
});
```

- [ ] **Step 2: 运行测试，确认失败**

- [ ] **Step 3: 替换 legend HTML**

定位现有 `<h2 class="legend-title">六种AGENT前台形态</h2>` 所在的整个 `<div class="legend-panel">…</div>` 块（约 line 1420–1448）。把整段替换为：

```html
            <div class="legend-panel">
              <h2 class="legend-title">七种 Aha Mode 介入姿态 <span style="font-size:11px;letter-spacing:0.18em;color:var(--ink-muted);font-family:'Black Han Sans',sans-serif;">适用 mode-02</span></h2>
              <div class="legend-card-stage">
                <article class="legend-agent-card">
                  <div class="legend-agent-card-title">Trace 留痕 <span style="font-size:10px;letter-spacing:0.06em;color:var(--aha-amber);">G0–G1</span></div>
                  <p class="legend-agent-card-copy">不打断，只留下未来可回访痕迹。触发：有价值但不急。控制：keep / dismiss / don't save this source。</p>
                </article>
                <article class="legend-agent-card">
                  <div class="legend-agent-card-title">Ambient 呼吸 <span style="font-size:10px;letter-spacing:0.06em;color:var(--aha-amber);">G1–G2</span></div>
                  <p class="legend-agent-card-copy">界面轻微变化，表达"我看到了"。触发：用户连续阅读浏览。控制：tap to expand / save for later / show less like this。</p>
                </article>
                <article class="legend-agent-card">
                  <div class="legend-agent-card-title">Inline 镶嵌 <span style="font-size:10px;letter-spacing:0.06em;color:var(--aha-amber);">G2–G3</span></div>
                  <p class="legend-agent-card-copy">嵌入当前任务，顺手推进一步。触发：用户写、回、改、卡住。控制：insert / softer / more direct / dismiss。</p>
                </article>
                <article class="legend-agent-card">
                  <div class="legend-agent-card-title">Morphing 变形 <span style="font-size:10px;letter-spacing:0.06em;color:var(--aha-amber);">G3–G4</span></div>
                  <p class="legend-agent-card-copy">同一片段转成当前任务需要的材料。触发：同片段在不同任务里。控制：choose direction / more portfolio-like。</p>
                </article>
                <article class="legend-agent-card">
                  <div class="legend-agent-card-title">Echo 回声 <span style="font-size:10px;letter-spacing:0.06em;color:var(--aha-amber);">G2–G4</span></div>
                  <p class="legend-agent-card-copy">未来更合适时把旧内容带回来。触发：复盘、面试、晚间回访。控制：bring it in / not now / don't connect again。</p>
                </article>
                <article class="legend-agent-card">
                  <div class="legend-agent-card-title">Co-creation 共创 <span style="font-size:10px;letter-spacing:0.06em;color:var(--aha-amber);">G3–G4</span></div>
                  <p class="legend-agent-card-copy">邀请用户一起塑形。触发：表达、作品集、面试准备。控制：choose lens / edit candidate / not my point。</p>
                </article>
                <article class="legend-agent-card">
                  <div class="legend-agent-card-title">Agentic Action 代理行动 <span style="font-size:10px;letter-spacing:0.06em;color:var(--aha-amber);">G4–G5</span></div>
                  <p class="legend-agent-card-copy">把 Aha 转成任务分叉口。触发：高置信、高相关、高可行动。控制：choose path / change lens / stop session / don't memorize。</p>
                </article>
              </div>
            </div>
```

同时把现有 legend-note 段（约 line 1450–1460）替换为：

```html
            <div class="legend-note">
              <p>02 节按七姿态展开，每个姿态用一个 storyboard（2–5 帧）讲清 agent 怎么发现、怎么出现、用户怎么处理、写回到下一个状态。所有 phone 帧严格按真 iPhone chrome（灵动岛 / banner 贴顶 / inline 适应输入流）绘制。</p>
            </div>
```

- [ ] **Step 4: 运行测试，确认通过**

- [ ] **Step 5: 提交**

```bash
git commit -am "refactor(showcase): replace six-forms legend with seven-postures legend"
```

---

## Task 7: 重写 `#mode-context` 节框架（标题、副标题、容器，先不放姿态内容）

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`（替换 line ~1653–1825 整个 `#mode-context` section）

**Background:** 现有 mode-context 内是六个 phone-variant（V2.1–V2.6）。本任务先把整个 section 内容清空重建为 7 个空 `posture-block` 容器（仅 head），下个任务起填充 storyboard。

- [ ] **Step 1: 追加测试**

```typescript
test('mode-context section has seven posture blocks', () => {
  const html = readShowcase();
  // 旧的 V2.1–V2.6 标题应该不再出现
  assert.equal(html.includes('V2.1 AHA banner notification'), false);
  assert.equal(html.includes('V2.6 AHA return card'), false);
  // 新的 7 个 posture block id
  for (const id of ['posture-trace','posture-ambient','posture-inline','posture-morphing','posture-echo','posture-cocreation','posture-agentic']) {
    assert.match(html, new RegExp(`id="${id}"`), `missing ${id}`);
  }
});

test('mode-context title says Agent Aha Mode', () => {
  const html = readShowcase();
  assert.match(html, /02 · 情境感知型介入 \/ Agent Aha Mode/);
});
```

- [ ] **Step 2: 运行测试，确认失败**

- [ ] **Step 3: 替换 mode-context section**

定位 `<!-- ═══ MODE 02 · 情境感知型介入 ═══ -->`（约 line 1653），把整个 section（到 line 1825 `</section>` 闭合）替换为下面这个**框架版**（七个空块，下面任务逐一填充）：

```html
          <!-- ═══ MODE 02 · 情境感知型介入 / Agent Aha Mode ═══ -->
          <section class="scenario-spread portfolio-spread--surface" id="mode-context">
            <div class="scenario-rail">
              <h2 class="scenario-title">02 · 情境感知型介入 / Agent Aha Mode</h2>
              <p class="scenario-subtitle">Aha Moment 都是 agent 主动介入的时刻 —— 包括用户停顿、卡住、正在表达时。这一节按七种介入姿态展开，每种用一个 storyboard 把场景从捕捉到写回演完。Phone 帧严格按真 iPhone chrome（灵动岛 / banner 贴顶 / inline 挂键盘或气泡）绘制。</p>
            </div>

            <div style="display:flex; flex-direction:column; gap:18px;">

              <article class="posture-block" id="posture-trace">
                <div class="posture-block-head">
                  <div class="posture-meta"><strong>① Trace 留痕</strong><span>·</span><span>G0–G1</span><span>·</span><span>有价值但不急，先不打断</span></div>
                </div>
                <!-- TASK 8 fills storyboard -->
              </article>

              <article class="posture-block" id="posture-ambient">
                <div class="posture-block-head">
                  <div class="posture-meta"><strong>② Ambient 呼吸</strong><span>·</span><span>G1–G2</span><span>·</span><span>用户连续阅读，让 agent 被看见但不打断</span></div>
                </div>
                <!-- TASK 9 fills storyboard -->
              </article>

              <article class="posture-block" id="posture-inline">
                <div class="posture-block-head">
                  <div class="posture-meta"><strong>③ Inline 镶嵌</strong><span>·</span><span>G2–G3</span><span>·</span><span>用户写、回、改、卡住，顺手推进一步</span></div>
                </div>
                <!-- TASK 10 fills storyboard -->
              </article>

              <article class="posture-block" id="posture-morphing">
                <div class="posture-block-head">
                  <div class="posture-meta"><strong>④ Morphing 变形</strong><span>·</span><span>G3–G4</span><span>·</span><span>同一片段转成当前任务需要的材料</span></div>
                </div>
                <!-- TASK 11 fills storyboard -->
              </article>

              <article class="posture-block" id="posture-echo">
                <div class="posture-block-head">
                  <div class="posture-meta"><strong>⑤ Echo 回声 ★</strong><span>·</span><span>G2–G4</span><span>·</span><span>未来更合适时把旧内容带回来</span></div>
                </div>
                <!-- TASK 12 fills storyboard (5 frames hero) -->
              </article>

              <article class="posture-block" id="posture-cocreation">
                <div class="posture-block-head">
                  <div class="posture-meta"><strong>⑥ Co-creation 共创</strong><span>·</span><span>G3–G4</span><span>·</span><span>邀请用户一起塑形</span></div>
                </div>
                <!-- TASK 13 fills storyboard -->
              </article>

              <article class="posture-block" id="posture-agentic">
                <div class="posture-block-head">
                  <div class="posture-meta"><strong>⑦ Agentic Action 代理行动</strong><span>·</span><span>G4–G5</span><span>·</span><span>高置信高相关，转成任务分叉口</span></div>
                </div>
                <!-- TASK 14 fills storyboard -->
              </article>

            </div>

            <div class="vote-note">
              Agent Aha Mode 不是让 agent 更频繁地提醒用户，而是让 agent 在合适的关系席位上，把现实片段捕捉、连接、生成、回访，并转化为用户可控制的表达或行动。
            </div>
          </section>
```

- [ ] **Step 4: 测试通过 + 提交**

```bash
node --import tsx --test tests/ahaMomentPostureShowcase.test.ts
git commit -am "refactor(showcase): rebuild mode-context shell with seven posture-block scaffolds"
```

---

## Task 8: 填充 ① Trace 留痕 storyboard（3 帧）

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`（在 `id="posture-trace"` 块的 `<!-- TASK 8 fills storyboard -->` 处插入）

**Storyboard：**
- A · 捕捉（14:08）小红书 feed，句末带 `.aha-marker-dot`
- B · 复盘（22:14）晚间复盘卡 `kept from afternoon reading · 1 fragment held`
- C · 写回（22:14）保留后系统轻提示

- [ ] **Step 1: 追加测试**

```typescript
test('trace storyboard has three frames with marker dot', () => {
  const html = readShowcase();
  const traceBlock = html.match(/<article class="posture-block" id="posture-trace">[\s\S]*?<\/article>/);
  assert.ok(traceBlock, 'trace block found');
  const block = traceBlock[0];
  assert.match(block, /class="storyboard-frame-label">捕捉/);
  assert.match(block, /class="storyboard-frame-label">复盘/);
  assert.match(block, /class="storyboard-frame-label">写回/);
  assert.match(block, /class="aha-marker-dot"/);
  assert.match(block, /kept from afternoon reading/);
  assert.match(block, /class="rebuttal-pill">keep</);
  assert.match(block, /class="rebuttal-pill">dismiss</);
});
```

- [ ] **Step 2: 运行测试，确认失败**

- [ ] **Step 3: 在 `#posture-trace` 内 `<!-- TASK 8 fills storyboard -->` 之后追加：**

```html
                <div class="posture-storyboard">
                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">A · 捕捉</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--day-alt">
                        <div class="phone-statusbar"><span class="status-time">14:08</span><div class="dynamic-island"></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div class="feed-card">
                            <div class="feed-head"><div class="avatar"></div><div style="font-size:10px;color:var(--ink-muted);">Xiaohongshu</div></div>
                            <div>I want my work to feel inevitable, not loud.<span class="aha-marker-dot"></span></div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">灵动岛 idle · 无系统级提示 · 句末极轻 marker</div>
                  </div>

                  <div class="storyboard-arrow">→</div>

                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">B · 复盘</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--deep">
                        <div class="phone-statusbar" style="color:#fff;"><span class="status-time">22:14</span><div class="dynamic-island"></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div class="aha-card aha-card--reverse">
                            <div class="aha-card-header">AHA · trace</div>
                            <div class="aha-card-body">kept from afternoon reading · 1 fragment held</div>
                            <div class="aha-card-body" style="opacity:0.7;font-size:11px;">"I want my work to feel inevitable, not loud."</div>
                            <div class="aha-card-footer rebuttal-row">
                              <span class="rebuttal-pill rebuttal-pill--reverse">keep</span>
                              <span class="rebuttal-pill rebuttal-pill--reverse">dismiss</span>
                              <span class="rebuttal-pill rebuttal-pill--reverse">memory · don't save this source</span>
                            </div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">晚间复盘 · 折叠卡展开 · 三 chip 选择</div>
                  </div>

                  <div class="storyboard-arrow">→</div>

                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">C · 写回</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--deep">
                        <div class="phone-statusbar" style="color:#fff;"><span class="status-time">22:14</span><div class="dynamic-island"></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div class="aha-card aha-card--reverse">
                            <div class="aha-card-header">AHA · trace</div>
                            <div class="aha-card-body" style="font-size:11px;opacity:0.85;">expression seeds +1 · future similar fragments more likely to surface tonight</div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">写回完成 · 系统轻提示 · 不覆盖宿主内容</div>
                  </div>
                </div>

                <div class="posture-block-writeback">
                  <strong>写回结果：</strong>用户保留 → 提升该表达类型的 future recall 权重；忽略 → 降低类似轻量阅读片段的主动回访频率。
                </div>
```

- [ ] **Step 4: 测试通过 + 提交**

```bash
node --import tsx --test tests/ahaMomentPostureShowcase.test.ts
git commit -am "feat(showcase): add Trace posture storyboard (3 frames)"
```

---

## Task 9: 填充 ② Ambient 呼吸 storyboard（3 帧）

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`（在 `id="posture-ambient"` 块内）

**Storyboard：**
- A · 旁观：长文阅读 + 灵动岛 compact 态
- B · 轻点：灵动岛 expanded 态显示 reason
- C · 长按：edge bubble 弹出选项

- [ ] **Step 1: 追加测试**

```typescript
test('ambient storyboard uses dynamic island compact and expanded', () => {
  const html = readShowcase();
  const block = html.match(/<article class="posture-block" id="posture-ambient">[\s\S]*?<\/article>/)![0];
  assert.match(block, /dynamic-island--compact/);
  assert.match(block, /dynamic-island--expanded/);
  assert.match(block, /related to your Personal OS framing/);
  assert.match(block, /class="aha-island-dot"/);
});
```

- [ ] **Step 2: 运行测试，确认失败**

- [ ] **Step 3: 在 `#posture-ambient` 内追加：**

```html
                <div class="posture-storyboard">
                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">A · 旁观</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--surface">
                        <div class="phone-statusbar"><span class="status-time">15:24</span><div class="dynamic-island dynamic-island--compact"><span class="aha-island-dot"></span><span class="island-text">AHA</span></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div class="feed-card">
                            <div style="font-size:10px;color:var(--ink-muted);margin-bottom:6px;">Long read · Personal OS</div>
                            <div>Proactive systems don't wait for instruction — they anticipate based on shared memory.</div>
                          </div>
                          <div class="feed-card" style="opacity:0.7;">
                            <div>The next era of agents won't live inside one app.</div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">灵动岛 compact · 阅读流不中断 · 左端 amber 圆点</div>
                  </div>

                  <div class="storyboard-arrow">→</div>

                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">B · 轻点</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--surface">
                        <div class="phone-statusbar" style="position:relative;"><span class="status-time">15:24</span><div class="dynamic-island dynamic-island--expanded" style="position:absolute;left:50%;top:6px;transform:translateX(-50%);width:300px;"><span class="island-reason"><span class="aha-card-header" style="color:rgba(255,255,255,0.92);">AHA · ambient</span><br>related to your Personal OS framing</span><div class="island-actions"><span class="rebuttal-pill rebuttal-pill--reverse">save for later</span><span class="rebuttal-pill rebuttal-pill--reverse">dismiss</span></div></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body" style="padding-top:90px;">
                          <div class="feed-card" style="opacity:0.6;">
                            <div>Proactive systems don't wait for instruction — they anticipate based on shared memory.</div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">灵动岛 expanded · 一行 reason · 两 chip 控制</div>
                  </div>

                  <div class="storyboard-arrow">→</div>

                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">C · 长按</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--surface">
                        <div class="phone-statusbar"><span class="status-time">15:25</span><div class="dynamic-island dynamic-island--compact"><span class="aha-island-dot"></span><span class="island-text">AHA</span></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body" style="position:relative;">
                          <div class="feed-card">
                            <div>Proactive systems don't wait for instruction.</div>
                          </div>
                          <div class="aha-card" style="position:absolute;right:8px;top:60px;width:160px;">
                            <div class="aha-card-header">AHA · ambient</div>
                            <div class="aha-card-body" style="font-size:10px;">related to your Personal OS framing</div>
                            <div class="aha-card-footer rebuttal-row">
                              <span class="rebuttal-pill">save for later</span>
                              <span class="rebuttal-pill">show less like this</span>
                              <span class="rebuttal-pill">memory · open context</span>
                            </div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">长按弹 edge bubble · 三 chip 控制 · 右上吸附</div>
                  </div>
                </div>

                <div class="posture-block-writeback">
                  <strong>写回结果：</strong>展开 → 系统记录该主题连接有用；连续忽略 → 降低 Ambient 强度。
                </div>
```

- [ ] **Step 4: 测试通过 + 提交**

```bash
node --import tsx --test tests/ahaMomentPostureShowcase.test.ts
git commit -am "feat(showcase): add Ambient posture storyboard (3 frames)"
```

---

## Task 10: 填充 ③ Inline 镶嵌 storyboard（3 帧）

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`（`id="posture-inline"`）

- [ ] **Step 1: 追加测试**

```typescript
test('inline storyboard suggestion bar sits above keyboard area', () => {
  const html = readShowcase();
  const block = html.match(/<article class="posture-block" id="posture-inline">[\s\S]*?<\/article>/)![0];
  assert.match(block, /class="inline-suggestion"/);
  assert.match(block, /Fair point\. I'd want to explore one thing first/);
  assert.match(block, /softer/);
  assert.match(block, /more direct/);
});
```

- [ ] **Step 2: 运行测试，确认失败**

- [ ] **Step 3: 在 `#posture-inline` 内追加：**

```html
                <div class="posture-storyboard">
                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">A · 卡住</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--surface">
                        <div class="phone-statusbar"><span class="status-time">15:42</span><div class="dynamic-island"></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div style="font-size:10px;color:var(--ink-muted);margin-bottom:4px;">Slack · #design-review</div>
                          <div class="bubble bubble--user" style="text-align:right;">I'd want to push back on this...<span style="opacity:0.4;">|</span></div>
                          <div style="flex:1;"></div>
                          <div style="height:80px;background:rgba(0,0,0,0.04);border-top:1px solid rgba(0,0,0,0.06);border-radius:0;font-size:10px;color:var(--ink-soft);text-align:center;padding-top:30px;">keyboard</div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">灵动岛 idle · 草稿停 · agent 检测到停顿</div>
                  </div>

                  <div class="storyboard-arrow">→</div>

                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">B · 介入</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--surface">
                        <div class="phone-statusbar"><span class="status-time">15:42</span><div class="dynamic-island"></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div class="bubble bubble--user" style="text-align:right;">I'd want to push back on this...</div>
                          <div style="flex:1;"></div>
                          <div class="inline-suggestion">
                            <div class="aha-card-header">AHA · inline</div>
                            <div class="aha-card-body" style="font-size:11px;">Try: <em>Fair point. I'd want to explore one thing first.</em></div>
                            <div class="inline-suggestion-chip-row">
                              <span class="rebuttal-pill" style="border-color:var(--aha-amber);background:var(--aha-amber);color:#fff;">insert</span>
                              <span class="rebuttal-pill">lens · softer</span>
                              <span class="rebuttal-pill">lens · more direct</span>
                              <span class="rebuttal-pill">dismiss</span>
                            </div>
                          </div>
                          <div style="height:80px;background:rgba(0,0,0,0.04);font-size:10px;color:var(--ink-soft);text-align:center;padding-top:30px;">keyboard</div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">suggestion bar 挂键盘上方 · 不挡输入流</div>
                  </div>

                  <div class="storyboard-arrow">→</div>

                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">C · 写回</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--surface">
                        <div class="phone-statusbar"><span class="status-time">15:43</span><div class="dynamic-island dynamic-island--compact"><span class="aha-island-dot"></span><span class="island-text">saved</span></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div class="bubble bubble--user" style="text-align:right;">Fair point. I'd want to explore one thing first.</div>
                          <div class="aha-card" style="font-size:10px;">
                            <div class="aha-card-header">AHA · learned</div>
                            <div class="aha-card-body">tone preference: gently direct · 7 similar over the past month</div>
                            <div class="aha-card-footer rebuttal-row">
                              <span class="rebuttal-pill">lens · not my voice</span>
                              <span class="rebuttal-pill">memory · don't memorize</span>
                            </div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">采纳 · 系统软学习语气偏好 · 灵动岛 saved 提示</div>
                  </div>
                </div>

                <div class="posture-block-writeback">
                  <strong>写回结果：</strong>采用 → 学习用户偏好语气方向；dismiss → 不写入长期记忆。
                </div>
```

- [ ] **Step 4: 测试通过 + 提交**

```bash
node --import tsx --test tests/ahaMomentPostureShowcase.test.ts
git commit -am "feat(showcase): add Inline posture storyboard (3 frames)"
```

---

## Task 11: 填充 ④ Morphing 变形 storyboard（3 帧 · 同片段三任务）

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`（`id="posture-morphing"`）

- [ ] **Step 1: 追加测试**

```typescript
test('morphing storyboard shows same fragment in three workspaces', () => {
  const html = readShowcase();
  const block = html.match(/<article class="posture-block" id="posture-morphing">[\s\S]*?<\/article>/)![0];
  assert.match(block, /Agents shouldn't be locked inside one app/);
  assert.match(block, /storyboard-frame-label">A · 在写英文/);
  assert.match(block, /storyboard-frame-label">B · 在做作品集/);
  assert.match(block, /storyboard-frame-label">C · 在准备面试/);
  assert.match(block, /same fragment · three workspaces/);
});
```

- [ ] **Step 2: 失败 → 实施**

```html
                <div class="posture-storyboard">
                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">A · 在写英文</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--surface">
                        <div class="phone-statusbar"><span class="status-time">10:18</span><div class="dynamic-island"></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div style="font-size:10px;color:var(--ink-muted);">iMessage · Aoife</div>
                          <div class="bubble bubble--user" style="text-align:right;font-size:11px;">about agents living everywhere</div>
                          <div class="inline-suggestion">
                            <div class="aha-card-header">AHA · morphing → sentence</div>
                            <div class="aha-card-body" style="font-size:11px;">Try: <em>"Agents shouldn't be locked inside one app."</em></div>
                            <div class="inline-suggestion-chip-row">
                              <span class="rebuttal-pill" style="background:var(--aha-amber);color:#fff;">insert</span>
                              <span class="rebuttal-pill">lens · more conversational</span>
                              <span class="rebuttal-pill">dismiss</span>
                            </div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">同片段 · 表达替换形态</div>
                  </div>

                  <div class="storyboard-arrow">→</div>

                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">B · 在做作品集</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--day">
                        <div class="phone-statusbar"><span class="status-time">14:02</span><div class="dynamic-island"></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div style="font-size:10px;color:var(--ink-muted);">Portfolio · Section 02</div>
                          <div class="aha-card">
                            <div class="aha-card-header">AHA · morphing → framing</div>
                            <div class="aha-card-body" style="font-size:11px;">"Agents that don't live inside one app — a Personal OS thesis."</div>
                            <div class="aha-card-footer rebuttal-row">
                              <span class="rebuttal-pill" style="background:var(--aha-amber);color:#fff;">use as section title</span>
                              <span class="rebuttal-pill">lens · more product-like</span>
                              <span class="rebuttal-pill">lens · more poetic</span>
                              <span class="rebuttal-pill">not my point</span>
                            </div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">同片段 · project framing 形态</div>
                  </div>

                  <div class="storyboard-arrow">→</div>

                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">C · 在准备面试</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--coral">
                        <div class="phone-statusbar"><span class="status-time">21:20</span><div class="dynamic-island"></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div style="font-size:10px;color:var(--ink-muted);">Interview Prep · Agent OS</div>
                          <div class="aha-card">
                            <div class="aha-card-header">AHA · morphing → answer</div>
                            <div class="aha-card-body" style="font-size:10.5px;line-height:1.5;">"I'd describe Agent OS as the layer that lets agents persist across apps — not as another assistant locked inside one of them..."</div>
                            <div class="aha-card-footer rebuttal-row">
                              <span class="rebuttal-pill" style="background:var(--aha-amber);color:#fff;">save to mock answers</span>
                              <span class="rebuttal-pill">shorten</span>
                              <span class="rebuttal-pill">add evidence</span>
                              <span class="rebuttal-pill">memory · don't memorize</span>
                            </div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">同片段 · interview answer 形态</div>
                  </div>
                </div>

                <div class="sediment-chip-row">
                  <div class="sediment-chip">same fragment · three workspaces · three transformations · user controls direction</div>
                </div>

                <div class="posture-block-writeback">
                  <strong>写回结果：</strong>转化路径成为 future routing policy 的输入；转化资产进入对应工作区。
                </div>
```

- [ ] **Step 3: 测试通过 + 提交**

```bash
node --import tsx --test tests/ahaMomentPostureShowcase.test.ts
git commit -am "feat(showcase): add Morphing posture storyboard (3 frames)"
```

---

## Task 12: 填充 ⑤ Echo 回声 storyboard（5 帧 · hero）

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`（`id="posture-echo"`）

**Storyboard：**
- A · 白天静默保存（14:30）：灵动岛极短 compact 闪一下
- B · 白天 ambient hint（14:30+ε）：灵动岛回到 idle 但带 `.aha-hint-glow`
- C · 晚上场景就位（21:48）：用户打开面试 prep，灵动岛 compact `1 from earlier ↓`
- D · return card：sheet 滑出，带 grabber + reason + 4 chip
- E · 转化菜单：三选一 transformation cards

- [ ] **Step 1: 追加测试**

```typescript
test('echo storyboard has five frames including hint glow and return sheet', () => {
  const html = readShowcase();
  const block = html.match(/<article class="posture-block" id="posture-echo">[\s\S]*?<\/article>/)![0];
  assert.match(block, /storyboard-frame-label">A · 白天静默保存/);
  assert.match(block, /storyboard-frame-label">B · 白天 ambient hint/);
  assert.match(block, /storyboard-frame-label">C · 晚上场景就位/);
  assert.match(block, /storyboard-frame-label">D · return card/);
  assert.match(block, /storyboard-frame-label">E · 转化菜单/);
  assert.match(block, /class="aha-hint-glow"/);
  assert.match(block, /class="return-sheet/);
  assert.match(block, /class="return-sheet-grabber"/);
  assert.match(block, /1 from earlier/);
  assert.match(block, /bring it in/);
  assert.match(block, /don't connect these again/);
});
```

- [ ] **Step 2: 失败 → 实施**

在 `#posture-echo` 内追加（5 帧 + 4 个箭头）：

```html
                <div class="posture-storyboard">
                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">A · 白天静默保存</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--day-alt">
                        <div class="phone-statusbar"><span class="status-time">14:30</span><div class="dynamic-island dynamic-island--compact"><span class="aha-island-dot"></span><span class="island-text">saved</span></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div class="feed-card">
                            <div style="font-size:10px;color:var(--ink-muted);">Long read · proactive systems</div>
                            <div>The future agent doesn't wait for instruction — it anticipates based on what you've already left it.</div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">灵动岛 compact 闪 0.8s · 内容区零干扰</div>
                  </div>

                  <div class="storyboard-arrow">→</div>

                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">B · 白天 ambient hint</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--day-alt">
                        <div class="phone-statusbar"><span class="status-time">14:30</span><div class="dynamic-island aha-hint-glow"></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div class="feed-card" style="opacity:0.85;">
                            <div>The future agent doesn't wait for instruction — it anticipates based on what you've already left it.</div>
                          </div>
                          <div class="feed-card" style="opacity:0.6;">
                            <div>Proactive doesn't mean noisy. It means present without asking permission to think.</div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">灵动岛 idle + hint glow · 阅读继续 · 状态留在 island 上</div>
                  </div>

                  <div class="storyboard-arrow">→</div>

                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">C · 晚上场景就位</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--coral">
                        <div class="phone-statusbar"><span class="status-time">21:48</span><div class="dynamic-island dynamic-island--compact"><span class="aha-island-dot"></span><span class="island-text">1 from earlier ↓</span></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div style="font-size:10px;color:var(--ink-muted);">Interview Prep · Agent OS</div>
                          <div class="feed-card">
                            <div>How would you describe what an Agent OS does that an in-app assistant cannot?</div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">面试 prep 工作区 · 灵动岛 compact 提示有保存可用</div>
                  </div>

                  <div class="storyboard-arrow">→</div>

                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">D · return card</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--coral">
                        <div class="phone-statusbar"><span class="status-time">21:48</span><div class="dynamic-island"></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body" style="position:relative;">
                          <div class="feed-card" style="opacity:0.5;">
                            <div>How would you describe what an Agent OS does...</div>
                          </div>
                          <div style="flex:1;"></div>
                          <div class="return-sheet">
                            <div class="return-sheet-grabber"></div>
                            <div class="aha-card-header">AHA · echo</div>
                            <div class="aha-card-body" style="font-size:11px;line-height:1.5;">下午你看到的那句话现在有用了 · It can support your answer about OS-native Agent.</div>
                            <div class="aha-card-footer rebuttal-row">
                              <span class="rebuttal-pill" style="background:var(--aha-amber);color:#fff;">bring it in</span>
                              <span class="rebuttal-pill">not now</span>
                              <span class="rebuttal-pill">show original context</span>
                              <span class="rebuttal-pill">memory · don't connect these again</span>
                            </div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">sheet 滑出 · 带 grabber · 4 chip 完整反驳</div>
                  </div>

                  <div class="storyboard-arrow">→</div>

                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">E · 转化菜单</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--coral">
                        <div class="phone-statusbar"><span class="status-time">21:49</span><div class="dynamic-island"></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div class="aha-card-header" style="margin-top:8px;">AHA · echo → choose form</div>
                          <div class="aha-card" style="margin-top:6px;">
                            <div class="aha-card-body" style="font-size:11px;">→ Interview sentence</div>
                            <div class="aha-card-footer rebuttal-row"><span class="rebuttal-pill" style="background:var(--aha-amber);color:#fff;">pick</span><span class="rebuttal-pill">not my point</span></div>
                          </div>
                          <div class="aha-card">
                            <div class="aha-card-body" style="font-size:11px;">→ Portfolio framing</div>
                            <div class="aha-card-footer rebuttal-row"><span class="rebuttal-pill">pick</span><span class="rebuttal-pill">not my point</span></div>
                          </div>
                          <div class="aha-card">
                            <div class="aha-card-body" style="font-size:11px;">→ Expression card</div>
                            <div class="aha-card-footer rebuttal-row"><span class="rebuttal-pill">pick</span><span class="rebuttal-pill">not my point</span></div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">三选一 · 每条带 pick / not my point</div>
                  </div>
                </div>

                <div class="posture-block-writeback">
                  <strong>写回结果：</strong>接受 → 进入面试准备工作区；拒绝 → 降低跨时间回访置信度；<code>don't connect these again</code> → 该连接排除。
                </div>
```

- [ ] **Step 3: 测试通过 + 提交**

```bash
node --import tsx --test tests/ahaMomentPostureShowcase.test.ts
git commit -am "feat(showcase): add Echo posture storyboard (5 frames hero)"
```

---

## Task 13: 填充 ⑥ Co-creation 共创 storyboard（3 帧）

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`（`id="posture-cocreation"`）

- [ ] **Step 1: 追加测试**

```typescript
test('cocreation storyboard offers three lens chips and three candidates', () => {
  const html = readShowcase();
  const block = html.match(/<article class="posture-block" id="posture-cocreation">[\s\S]*?<\/article>/)![0];
  assert.match(block, /Want to shape it together/);
  assert.match(block, /更产品化/);
  assert.match(block, /更面试化/);
  assert.match(block, /更诗性/);
  assert.match(block, /lens preference learned: product-leaning/);
});
```

- [ ] **Step 2: 失败 → 实施**

```html
                <div class="posture-storyboard">
                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">A · 邀请</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--day">
                        <div class="phone-statusbar"><span class="status-time">14:14</span><div class="dynamic-island"></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div style="font-size:10px;color:var(--ink-muted);">Portfolio · draft v3</div>
                          <div class="feed-card" style="font-size:11px;">"Agents that don't live inside one app — a Personal OS thesis."</div>
                          <div class="aha-card">
                            <div class="aha-card-header">AHA · co-creation</div>
                            <div class="aha-card-body" style="font-size:11px;">This could become a portfolio sentence. Want to shape it together?</div>
                            <div class="aha-card-footer rebuttal-row">
                              <span class="rebuttal-pill">lens · 更产品化</span>
                              <span class="rebuttal-pill">lens · 更面试化</span>
                              <span class="rebuttal-pill">lens · 更诗性</span>
                              <span class="rebuttal-pill">not my point</span>
                            </div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">三 lens chip · 用户主体性保留</div>
                  </div>

                  <div class="storyboard-arrow">→</div>

                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">B · 选 lens</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--day">
                        <div class="phone-statusbar"><span class="status-time">14:15</span><div class="dynamic-island"></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div class="aha-card-header">AHA · co-creation → 更产品化</div>
                          <div class="aha-card" style="font-size:10.5px;">
                            <div class="aha-card-body">"An OS layer for agents — so they live where you live, not inside one app."</div>
                            <div class="aha-card-footer rebuttal-row"><span class="rebuttal-pill" style="background:var(--aha-amber);color:#fff;">edit</span><span class="rebuttal-pill">pick</span></div>
                          </div>
                          <div class="aha-card" style="font-size:10.5px;">
                            <div class="aha-card-body">"Agents shouldn't be features. They should be a substrate."</div>
                            <div class="aha-card-footer rebuttal-row"><span class="rebuttal-pill">edit</span><span class="rebuttal-pill">pick</span></div>
                          </div>
                          <div class="aha-card" style="font-size:10.5px;">
                            <div class="aha-card-body">"Designing agents that persist where work actually happens."</div>
                            <div class="aha-card-footer rebuttal-row"><span class="rebuttal-pill">edit</span><span class="rebuttal-pill">pick</span></div>
                          </div>
                          <div class="rebuttal-row" style="margin-top:4px;">
                            <span class="rebuttal-pill">show why this lens</span>
                            <span class="rebuttal-pill">not my point</span>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">3 个候选版本 · 每条 edit / pick · 底部 rebuttal</div>
                  </div>

                  <div class="storyboard-arrow">→</div>

                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">C · 写回</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--day">
                        <div class="phone-statusbar"><span class="status-time">14:18</span><div class="dynamic-island dynamic-island--compact"><span class="aha-island-dot"></span><span class="island-text">draft saved</span></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div class="aha-card">
                            <div class="aha-card-header">AHA · co-creation → saved</div>
                            <div class="aha-card-body" style="font-size:11px;">saved as portfolio v3 draft · lens preference learned: product-leaning</div>
                            <div class="aha-card-body" style="font-size:10px;color:var(--ink-soft);">won't enter long-term memory until you mark it final</div>
                            <div class="aha-card-footer rebuttal-row">
                              <span class="rebuttal-pill">lens · use different</span>
                              <span class="rebuttal-pill">memory · don't memorize</span>
                              <span class="rebuttal-pill">show evidence</span>
                            </div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">用户编辑后确认 · lens 软学习 · 不强写记忆</div>
                  </div>
                </div>

                <div class="posture-block-writeback">
                  <strong>写回结果：</strong>仅用户确认后的版本进入作品集素材或长期记忆；lens 偏好软学习，不强写入。
                </div>
```

- [ ] **Step 3: 测试通过 + 提交**

```bash
node --import tsx --test tests/ahaMomentPostureShowcase.test.ts
git commit -am "feat(showcase): add Co-creation posture storyboard (3 frames)"
```

---

## Task 14: 填充 ⑦ Agentic Action 代理行动 storyboard（3 帧 · 全屏 micro-session）

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`（`id="posture-agentic"`）

- [ ] **Step 1: 追加测试**

```typescript
test('agentic action storyboard uses micro-session frame and full rebuttal row', () => {
  const html = readShowcase();
  const block = html.match(/<article class="posture-block" id="posture-agentic">[\s\S]*?<\/article>/)![0];
  assert.match(block, /class="micro-session-frame"/);
  assert.match(block, /class="micro-session-step/);
  assert.match(block, /mock interview answer/);
  assert.match(block, /change criteria/);
  assert.match(block, /quieter next time/);
});
```

- [ ] **Step 2: 失败 → 实施**

```html
                <div class="posture-storyboard">
                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">A · 路径菜单</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--surface">
                        <div class="phone-statusbar"><span class="status-time">21:30</span><div class="dynamic-island"></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div class="aha-card-header">AHA · agentic action</div>
                          <div class="aha-card-body" style="font-size:11px;margin-top:4px;">I can turn this into:</div>
                          <div class="aha-card"><div class="aha-card-body" style="font-size:11px;">1 · expression card</div><div class="aha-card-footer rebuttal-row"><span class="rebuttal-pill">pick</span></div></div>
                          <div class="aha-card"><div class="aha-card-body" style="font-size:11px;">2 · portfolio bullet</div><div class="aha-card-footer rebuttal-row"><span class="rebuttal-pill">pick</span></div></div>
                          <div class="aha-card" style="border-left-width:3px;"><div class="aha-card-body" style="font-size:11px;">3 · mock interview answer</div><div class="aha-card-footer rebuttal-row"><span class="rebuttal-pill" style="background:var(--aha-amber);color:#fff;">pick</span></div></div>
                          <div class="aha-card"><div class="aha-card-body" style="font-size:11px;">4 · diary reflection</div><div class="aha-card-footer rebuttal-row"><span class="rebuttal-pill">pick</span></div></div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">四路径全屏 action card · 每路径 pick</div>
                  </div>

                  <div class="storyboard-arrow">→</div>

                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">B · micro-session 中</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--surface">
                        <div class="phone-statusbar"><span class="status-time">21:32</span><div class="dynamic-island dynamic-island--compact"><span class="aha-island-dot"></span><span class="island-text">2/4 · refine</span></div><span class="status-icons">●●●</span></div>
                        <div class="micro-session-frame">
                          <div class="micro-session-step-row">
                            <div class="micro-session-step micro-session-step--done"></div>
                            <div class="micro-session-step micro-session-step--active"></div>
                            <div class="micro-session-step"></div>
                            <div class="micro-session-step"></div>
                          </div>
                          <div class="micro-session-step-label">2 / 4 · refine tone</div>
                          <div class="micro-session-content">"I'd describe Agent OS as the layer that lets agents persist across apps — so they can carry shared memory, not just one-off prompts."</div>
                          <div class="rebuttal-row">
                            <span class="rebuttal-pill">pause</span>
                            <span class="rebuttal-pill">lens · use different</span>
                            <span class="rebuttal-pill">quieter · next time</span>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">全屏 task screen · 4 步 indicator · 底部反驳</div>
                  </div>

                  <div class="storyboard-arrow">→</div>

                  <div class="storyboard-frame">
                    <div class="storyboard-frame-label">C · session 结束</div>
                    <div class="phone">
                      <div class="phone-screen phone-screen--surface">
                        <div class="phone-statusbar"><span class="status-time">21:36</span><div class="dynamic-island dynamic-island--compact"><span class="aha-island-dot"></span><span class="island-text">saved</span></div><span class="status-icons">●●●</span></div>
                        <div class="screen-body">
                          <div class="aha-card-header">AHA · agentic action → saved</div>
                          <div class="aha-card" style="font-size:11px;">
                            <div class="aha-card-body">mock answer saved to interview prep · v1 · 70 words</div>
                            <div class="aha-card-footer rebuttal-row">
                              <span class="rebuttal-pill">lens · use different</span>
                              <span class="rebuttal-pill">change criteria</span>
                              <span class="rebuttal-pill">show evidence</span>
                              <span class="rebuttal-pill">quieter next time</span>
                              <span class="rebuttal-pill">memory · don't memorize</span>
                            </div>
                          </div>
                        </div>
                        <div class="phone-home"></div>
                      </div>
                    </div>
                    <div class="storyboard-frame-state">资产入工作区 · 完整 5 chip 反驳行(G4–G5 标配)</div>
                  </div>
                </div>

                <div class="posture-block-writeback">
                  <strong>写回结果：</strong>生成资产进入工作区；选择路径更新 future routing policy；被拒绝路径降低推荐权重。
                </div>
```

- [ ] **Step 3: 测试通过 + 提交**

```bash
node --import tsx --test tests/ahaMomentPostureShowcase.test.ts
git commit -am "feat(showcase): add Agentic Action posture storyboard (3 frames + micro-session)"
```

---

## Task 15: 删除 03 · 场景佐证 + nav 链接

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`

- [ ] **Step 1: 追加测试**

```typescript
test('case-evidence section is removed', () => {
  const html = readShowcase();
  assert.equal(html.includes('id="case-evidence"'), false);
  assert.equal(html.includes('03 · 场景佐证'), false);
  // section-pill 中也不应有 03 链接
  assert.equal(html.includes('href="#case-evidence"'), false);
});
```

- [ ] **Step 2: 运行测试，确认失败**

- [ ] **Step 3: 删除整个 `#case-evidence` section**

定位 `<!-- ═══ CASE EVIDENCE · 场景佐证 ═══ -->` 这一注释（约 line 1827），把整段（含 `<section class="scenario-spread portfolio-spread--night" id="case-evidence">` 至对应 `</section>`）删除（约到 line 1856）。

- [ ] **Step 4: 删除 nav 中的 03 链接**

定位 `<a class="section-pill" href="#case-evidence">03 · 场景佐证</a>`（line 1399），删除整行。

- [ ] **Step 5: 测试通过 + 提交**

```bash
node --import tsx --test tests/ahaMomentPostureShowcase.test.ts
git commit -am "refactor(showcase): remove case-evidence section and its nav link"
```

---

## Task 16: 同步 React `SharedMemoryAhaCaseStudy.tsx` page-2 文案

**Files:**
- Modify: `src/pages/SharedMemoryAhaCaseStudy.tsx`（替换 `sharedMemoryAhaPages[1]`）

- [ ] **Step 1: 写测试**

新建 `tests/ahaMomentPostureCopy.test.ts`：

```typescript
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function readPage() {
  return readFileSync(new URL('../src/pages/SharedMemoryAhaCaseStudy.tsx', import.meta.url), 'utf8');
}

test('page-2 contentBlocks contains seven postures card group', () => {
  const src = readPage();
  // 旧标题应不再出现
  assert.equal(src.includes("'可复用的前台形态'"), false);
  // 新标题
  assert.match(src, /Agent Aha Mode 七种介入姿态/);
  // 七姿态英文名都出现
  for (const name of ['Trace', 'Ambient', 'Inline', 'Morphing', 'Echo', 'Co-creation', 'Agentic Action']) {
    assert.match(src, new RegExp(name), `missing posture name ${name}`);
  }
});

test('page-2 mainCopy reframes components as carriers, postures as primary', () => {
  const src = readPage();
  // 必须出现新范式句
  assert.match(src, /姿态是主分类，UI 组件只是载体|姿态是主分类，组件只是载体/);
  // 必须引用文档第 580 行的范式句
  assert.match(src, /Agent Aha Mode 不是让 agent 更频繁/);
});
```

- [ ] **Step 2: 运行测试，确认失败**

Run: `node --import tsx --test tests/ahaMomentPostureCopy.test.ts`

- [ ] **Step 3: 替换 `sharedMemoryAhaPages[1]`**

定位 `src/pages/SharedMemoryAhaCaseStudy.tsx` 中第二个 page object（约 line 132–230），整个对象替换为：

```typescript
  {
    pageTitle: t('Aha Moment 的前台交互架构', 'Aha Moment Frontstage Interaction Architecture'),
    pageGoal: t(
      '把原本埋在 Language Diary 里的 UX showcase 单独抽出来，重读为 Agent Aha Mode 下的七种介入姿态。',
      'Pull the UX showcase out of Language Diary and reread it as seven intervention postures under Agent Aha Mode.',
    ),
    mainCopy: t(
      '上一页的两个时刻 —— 刷到一句精准的英文、卡在一条 Slack 回复 —— 是两种不同的发生方式。但同一个 agent 在这两种时刻里需要的是同一种判断能力：在合适的关系席位上选一种合适的介入姿态。\n\n这一页讨论的不再是"用 banner 还是 card"。姿态是主分类，UI 组件只是载体。一个 Aha 候选最终是 Trace、Ambient、Inline、Morphing、Echo、Co-creation 还是 Agentic Action，不取决于它要用哪种通知，而取决于：它是否值得现在前台化、它能不能转成有用的资产、用户当前的任务流是不是适合介入。\n\nAgent Aha Mode 不是让 agent 更频繁地提醒用户，而是让 agent 在合适的关系席位上，把现实片段捕捉、连接、生成、回访，并转化为用户可控制的表达或行动。下一页的 showcase 用七个 storyboard 把这件事画完。',
      'The two moments from the previous page — stumbling on a precise English caption and getting stuck on a Slack reply — represent two different kinds of occurrence. But the same agent needs the same judgment in both: choose the right intervention posture from the right relational seat.\n\nThis page is no longer about banner vs. card. Postures are the primary classification; UI components are merely carriers. Whether an Aha candidate becomes Trace, Ambient, Inline, Morphing, Echo, Co-creation, or Agentic Action depends not on which notification to use, but on whether it deserves to surface now, whether it can transform into useful assets, and whether the user\'s current flow allows intervention.\n\nAgent Aha Mode is not about reminding the user more often. It is about letting the agent, from the right relational seat, capture, connect, generate, return, and transform fragments of reality into expressions or actions the user controls. The next page\'s showcase draws this out across seven storyboards.',
    ),
    contentBlocks: [
      {
        type: 'comparisonCards',
        title: t('两种 agent 参与模式', 'Two agent participation modes'),
        items: [
          {
            title: t('用户递交型参与', 'User-handoff participation'),
            body: t(
              '用户主动把消息传给 agent：选中文本、点击入口、分享内容、请求回复、保存片段或召唤 orchestrator。这一模式不属于 Aha Moment —— 用户已经把上下文交过来了，agent 不需要证明自己为什么在场。',
              'The user actively gives something to the agent: selected text, an entry click, shared content, a reply request, a saved fragment, or an orchestrator summons. This mode is not Aha Moment — the user has already handed off context; the agent does not need to justify its presence.',
            ),
          },
          {
            title: t('情境感知型介入 / Agent Aha Mode', 'Context-aware intervention / Agent Aha Mode'),
            body: t(
              'agent 没有收到显式递交，但已经在授权上下文中识别 Aha 候选。系统按 generative potential、relevance、timing、interruption cost 等指标，挑一种合适的介入姿态。本案例研究的所有姿态故事都发生在这一模式里。',
              'The agent has not received an explicit handoff, but has identified an Aha candidate inside an authorized context. The system selects an intervention posture by weighing generative potential, relevance, timing, and interruption cost. All posture stories in this case study live in this mode.',
            ),
          },
        ],
      },
      {
        type: 'comparisonCards',
        title: t('Agent Aha Mode 七种介入姿态', 'Agent Aha Mode · seven intervention postures'),
        items: [
          {
            title: t('Trace 留痕 · G0–G1', 'Trace · G0–G1'),
            body: t(
              '不打断，只留下未来可回访痕迹。触发：有价值但不急。控制：keep / dismiss / don\'t save this source。',
              'Do not interrupt; leave a trace that can be returned to. Trigger: valuable but not urgent. Controls: keep / dismiss / don\'t save this source.',
            ),
          },
          {
            title: t('Ambient 呼吸 · G1–G2', 'Ambient · G1–G2'),
            body: t(
              '界面轻微变化，表达"我看到了"。触发：连续阅读浏览。控制：tap to expand / save for later / show less like this。',
              'Subtle interface shift signaling "I noticed." Trigger: continuous reading. Controls: tap to expand / save for later / show less like this.',
            ),
          },
          {
            title: t('Inline 镶嵌 · G2–G3', 'Inline · G2–G3'),
            body: t(
              '嵌入当前任务，顺手推进一步。触发：用户写、回、改、卡住。控制：insert / softer / more direct / dismiss。',
              'Embedded in the current task, nudging it forward. Trigger: writing, replying, editing, stuck. Controls: insert / softer / more direct / dismiss.',
            ),
          },
          {
            title: t('Morphing 变形 · G3–G4', 'Morphing · G3–G4'),
            body: t(
              '同一片段转成当前任务需要的材料。触发：同片段在不同任务里。控制：choose direction / more product-like / more conversational。',
              'Same fragment morphs into what the current task needs. Trigger: one fragment across different tasks. Controls: choose direction / more product-like / more conversational.',
            ),
          },
          {
            title: t('Echo 回声 · G2–G4', 'Echo · G2–G4'),
            body: t(
              '未来更合适时把旧内容带回来。触发：复盘、面试、晚间回访。控制：bring it in / not now / don\'t connect again。',
              'Bring back earlier content when the moment is right. Trigger: review, interview prep, evening recall. Controls: bring it in / not now / don\'t connect again.',
            ),
          },
          {
            title: t('Co-creation 共创 · G3–G4', 'Co-creation · G3–G4'),
            body: t(
              '邀请用户一起塑形。触发：表达、作品集、面试准备。控制：choose lens / edit candidate / not my point。',
              'Invite the user to shape it together. Trigger: expression work, portfolio, interview prep. Controls: choose lens / edit candidate / not my point.',
            ),
          },
          {
            title: t('Agentic Action 代理行动 · G4–G5', 'Agentic Action · G4–G5'),
            body: t(
              '把 Aha 转成任务分叉口。触发：高置信、高相关、高可行动。控制：choose path / change lens / stop session / don\'t memorize。',
              'Turn Aha into a task fork. Trigger: high confidence, relevance, actionability. Controls: choose path / change lens / stop session / don\'t memorize.',
            ),
          },
        ],
      },
      {
        type: 'shortParagraphs',
        title: t('姿态选择原则', 'Posture selection principles'),
        items: [
          t(
            '不把 Aha 简化成通知等级；通知组件只是底座。先判断 generative potential，再决定是否前台化。',
            'Do not reduce Aha to a notification severity; notification components are only a substrate. First assess generative potential, then decide whether to surface.',
          ),
          t(
            '只有价值、没有行动时，优先 Trace 或 Ambient；能推进当前任务时，优先 Inline 或 Morphing；与未来场景更相关时，优先 Echo，而不是当下提醒。',
            'When there is value but no action, prefer Trace or Ambient. When the current task can be advanced, prefer Inline or Morphing. When future context is more relevant, prefer Echo over an immediate reminder.',
          ),
          t(
            '需要用户主体性时使用 Co-creation；高置信、高相关、高可行动时才进入 Agentic Action。任何 Seat 身份出现都必须声明 lens、criteria 和理由，并永远给可反驳的出口。',
            'Use Co-creation when the user\'s authorship matters. Enter Agentic Action only when confidence, relevance, and actionability are all high. Any Seat presence must declare its lens, criteria, and reasoning, and always offer rebuttal exits.',
          ),
        ],
      },
    ],
  },
```

- [ ] **Step 4: 测试通过**

Run: `node --import tsx --test tests/ahaMomentPostureCopy.test.ts`

- [ ] **Step 5: 提交**

```bash
git add src/pages/SharedMemoryAhaCaseStudy.tsx tests/ahaMomentPostureCopy.test.ts
git commit -m "refactor(case-study): rewrite page-2 to seven postures with carriers reframed as substrates"
```

---

## Task 17: 微调 page-3 caption 文案

**Files:**
- Modify: `src/pages/SharedMemoryAhaCaseStudy.tsx`（`sharedMemoryAhaPages[2]` 的 showcaseEmbed caption）

- [ ] **Step 1: 追加测试**

```typescript
test('page-3 caption mentions seven postures storyboards', () => {
  const src = readPage();
  assert.match(src, /七种介入姿态|seven intervention postures/i);
  assert.match(src, /storyboard/i);
});
```

- [ ] **Step 2: 失败 → 实施**

定位 `sharedMemoryAhaPages[2]` 的 `showcaseEmbed` 的 `caption: t(...)`，把两段 zh / en 替换为：

```typescript
        caption: t(
          '下方 showcase 是这一案例的前台 UX 证据。它在 mode-02 · Agent Aha Mode 下展开七种介入姿态，每种用一个 storyboard 把场景从捕捉到写回演完。Phone 帧严格按真 iPhone chrome（灵动岛 / banner 贴顶 / inline 挂键盘或气泡）绘制。',
          'The showcase below is the frontstage UX evidence for this case. Under mode-02 · Agent Aha Mode, it unfolds seven intervention postures, each told as a storyboard from capture through writeback. Phone frames follow real iPhone chrome strictly (Dynamic Island / top-edge banner / keyboard- and bubble-anchored inline suggestions).',
        ),
```

- [ ] **Step 3: 测试通过 + 提交**

```bash
node --import tsx --test tests/ahaMomentPostureCopy.test.ts
git commit -am "refactor(case-study): update page-3 caption to reference seven postures storyboards"
```

---

## Task 18: 完整测试 + 构建验证 + 视觉自查

**Files:** 无新增

- [ ] **Step 1: 跑全部测试**

```bash
node --import tsx --test tests/
```

Expected: 全部 PASS（不只是新加的，包括既有 18 个测试也不该回归）

- [ ] **Step 2: 跑构建**

```bash
npm run build
```

Expected: tsc -b 通过 + vite build 通过 + 无新警告

- [ ] **Step 3: 启动 dev 视觉自查**

```bash
npm run dev
```

打开浏览器访问 `/#/agentic-design-development/aha-moment`（或对应路由），导航到第 3 页（HTML UX Showcase），iframe 内自查清单：

- [ ] s00 legend 显示"七种 Aha Mode 介入姿态"且有 7 张姿态卡，每张含 G 层
- [ ] 02 节标题为 `02 · 情境感知型介入 / Agent Aha Mode`
- [ ] 7 个 posture-block 顺序：Trace → Ambient → Inline → Morphing → Echo → Co-creation → Agentic Action
- [ ] Echo 块有 5 帧（其他姿态各 3 帧）
- [ ] 所有 phone 状态栏顶部正中可见**真灵动岛**（黑色椭圆）
- [ ] Trace A 帧句末有 `.aha-marker-dot`
- [ ] Ambient A 帧灵动岛 compact 态可见 amber 圆点 + `AHA` 文字
- [ ] Ambient B 帧灵动岛 expanded 态向下扩张为胶囊卡
- [ ] Inline B 帧 suggestion bar 挂在键盘区域上方（不在 feed 中间）
- [ ] Echo B 帧灵动岛 idle 但带 amber 软光（hint glow）
- [ ] Echo D 帧 return sheet 从底向上滑出 + 有 grabber + 4 chip 反驳行
- [ ] Agentic B 帧是全屏 micro-session（4 步 indicator）
- [ ] 每个 storyboard 末帧 footer 至少 2 chip
- [ ] 03 · 场景佐证 已不存在（nav 中也无链接）

- [ ] **Step 4: 浏览器宽度自适应验证**

调整 iframe 容器宽度到 360px / 768px / 1280px，确认 storyboard 横向 phone 排布在窄屏下能换行(`flex-wrap: wrap`)，不溢出。

- [ ] **Step 5: 跑回归测试，确认现有 mode-01 phone 视觉无破**

```bash
npm run dev
```

视觉对比 mode-01（用户递交型参与）的 6 个 phone：状态栏现在多了 idle 灵动岛（黑椭圆居中），其他文案与排布应保持原貌。

- [ ] **Step 6: 提交（如果有视觉微调）**

```bash
git status
# 若有调整：
# git commit -am "polish(showcase): visual adjustments after seven-postures redesign"
```

- [ ] **Step 7: 最终提交标记**

```bash
git log --oneline -20
```

确认本次重构的所有 commit 顺序合理。

---

## Self-Review Notes

**Spec coverage check（已完成）：**
- ✓ iPhone Chrome 规范 → Task 2 + 5
- ✓ 统一视觉语言（amber tokens / 三层卡 / marker 三件套 / rebuttal pill / 帧间元数据）→ Task 1 + 4
- ✓ 姿态特定载体（banner-top / inline-suggestion / return-sheet / micro-session）→ Task 3
- ✓ Legend s00 替换 → Task 6
- ✓ Section 02 重写（7 storyboards）→ Tasks 7–14
- ✓ Section 03 删除 → Task 15
- ✓ React page-2 文案改写 → Task 16
- ✓ Page-3 caption 微调 → Task 17
- ✓ 验收标准（chrome / 视觉语言 / 结构 / 构建）→ Task 18

**Type / 命名一致性（已完成）：**
- CSS 类名跨任务一致：`.aha-card` / `.aha-card-header` / `.aha-card-body` / `.aha-card-footer` / `.aha-marker-dot` / `.aha-island-dot` / `.aha-hint-glow` / `.dynamic-island{,--compact,--expanded}` / `.inline-suggestion` / `.return-sheet{,-grabber}` / `.micro-session-frame{,-step}` / `.posture-block` / `.posture-storyboard` / `.storyboard-frame{,-label,-state}` / `.storyboard-arrow` / `.posture-meta` / `.rebuttal-row` / `.rebuttal-pill{,--reverse}`
- Posture block id：`posture-trace` / `posture-ambient` / `posture-inline` / `posture-morphing` / `posture-echo` / `posture-cocreation` / `posture-agentic`（七者全部出现在 Task 7 + 测试 + 后续 8–14）
- 测试文件路径：`tests/ahaMomentPostureShowcase.test.ts`（HTML 结构）+ `tests/ahaMomentPostureCopy.test.ts`（React 文案）
- Token：`--aha-amber: #c8854a` + `--aha-amber-soft: rgba(200, 133, 74, 0.16)` 全程一致

**潜在风险与缓解：**
- statusbar 升级（Task 5）影响 mode-01 phones：限定为容器结构改动，不动文案；Task 18 Step 5 显式视觉回归。
- Echo storyboard 5 帧在 360px 内可能横向溢出：靠 `flex-wrap: wrap` 自动换行（已在 Task 4 `.posture-storyboard` 设置）。
- 灵动岛 expanded 态在 Ambient B 帧用 absolute 定位覆盖在 statusbar 下方：确保 `.screen-body` 加 `padding-top` 避让，已在 Task 9 帧 B 处理（`padding-top:90px`）。

---

## Plan complete

实施计划已生成，存于 `docs/superpowers/plans/2026-04-26-aha-moment-posture-ux-redesign.md`。

两种执行方式：

**1. Subagent-Driven（推荐）** — 每个 Task 派一个全新 subagent 执行，主线程 review 后再起下一个；快速迭代、隔离干扰。

**2. Inline Execution** — 当前 session 内顺序执行，按任务批量做、关键点 checkpoint review。

哪一种？
