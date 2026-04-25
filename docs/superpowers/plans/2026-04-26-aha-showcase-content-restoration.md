# Aha Showcase Content Restoration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace wf-line placeholder bars in the focused/key storyboard frames with real language-learning sentence use cases adapted from `docs/aha-moment-agent-aha-mode-design-paradigm.md`, while keeping surrounding/background cards as wf-line placeholders.

**Architecture:** Edit one HTML file only (`public/language-diary-ux-showcase/index.html`). Decision rule: if a card is the ONE card being Aha'd or actively read in the frame, it gets real text. If a card is at reduced opacity or is a second card in a multi-card feed serving as background scroll context, it stays wf-lines. New test file verifies real content strings appear in the right posture sections.

**Tech Stack:** Plain HTML/CSS edits, Node test runner (`node --experimental-strip-types --test`)

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `public/language-diary-ux-showcase/index.html` | Modify | 9 targeted content restorations (listed below) |
| `tests/ahaMomentPostureContent.test.ts` | Create | Regression tests verifying real content is present |

### The 9 restoration targets

| # | Location | Old content | New content |
|---|---|---|---|
| 1 | V1.1 feed-card (line ~1906) | wf-avatar + 2 wf-lines | `@英语写作笔记` + key sentence |
| 2 | V1.2 feed-card (line ~1930) | wf-avatar + wf-line + wf-line before selection | source handle + preceding article line |
| 3 | V1.4 feed-card (line ~1990) | 2 wf-lines | key sentence + source handle |
| 4 | Trace Frame A feed-card (line ~2087) | wf-avatar + 2 wf-lines + marker dot | source handle + preceding line + key sentence + marker dot |
| 5 | Ambient Frame A **top** feed-card (line ~2162) | source wf-line + 3 body wf-lines | language OS article |
| 6 | Ambient Frame C feed-card (line ~2212) | 2 body wf-lines | same language OS article (still reading) |
| 7 | Echo Frame A feed-card (line ~2423) | source wf-line + 3 body wf-lines | proactive language learning article |
| 8 | Echo Frame B **top** feed-card (line ~2446, opacity 0.85) | 3 body wf-lines | continuation article sentence |
| 9 | Echo Frame C feed-card (line ~2474) | 3 body wf-lines | interview prep question |

### Cards that STAY as wf-lines

- Ambient Frame A bottom card (`opacity:0.55`) — scroll-past background
- Ambient Frame B card (`opacity:0.45`) — truly behind expanded island
- Echo Frame B bottom card (`opacity:0.5`) — background scroll content
- Echo Frame D card (`opacity:0.38`) — behind return-sheet

---

## Task 1: Write the failing test

**Files:**
- Create: `tests/ahaMomentPostureContent.test.ts`

- [ ] **Step 1: Write the failing test file**

```typescript
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function readShowcase() {
  return readFileSync(new URL('../public/language-diary-ux-showcase/index.html', import.meta.url), 'utf8');
}

test('V1.1 feed-card shows key language learning sentence', () => {
  const html = readShowcase();
  const block = html.match(/V1\.1 Ambient handoff nudge[\s\S]*?V1\.2/)![0];
  assert.match(block, /@英语写作笔记/);
  assert.match(block, /inevitable, not loud/);
});

test('V1.2 feed-card has source handle and article context line', () => {
  const html = readShowcase();
  const block = html.match(/V1\.2 Co-reading anchor[\s\S]*?V1\.3/)![0];
  assert.match(block, /@英语写作笔记/);
  assert.match(block, /在设计一门语言/);
});

test('V1.4 feed-card shows key sentence for target-language challenge', () => {
  const html = readShowcase();
  const block = html.match(/V1\.4 Target language challenge[\s\S]*?V1\.5/)![0];
  assert.match(block, /inevitable, not loud/);
});

test('Trace Frame A shows source handle and key sentence with marker dot', () => {
  const html = readShowcase();
  const article = html.match(/<article class="posture-block" id="posture-trace">[\s\S]*?<\/article>/)![0];
  const frameA = article.match(/storyboard-frame-label">A · 捕捉[\s\S]*?storyboard-arrow/)![0];
  assert.match(frameA, /@英语写作笔记/);
  assert.match(frameA, /inevitable, not loud/);
  assert.match(frameA, /aha-marker-dot/);
});

test('Ambient Frame A top feed-card shows language OS article', () => {
  const html = readShowcase();
  const article = html.match(/<article class="posture-block" id="posture-ambient">[\s\S]*?<\/article>/)![0];
  const frameA = article.match(/storyboard-frame-label">A · 旁观[\s\S]*?storyboard-arrow/)![0];
  assert.match(frameA, /language OS/);
});

test('Ambient Frame C feed-card shows same article content', () => {
  const html = readShowcase();
  const article = html.match(/<article class="posture-block" id="posture-ambient">[\s\S]*?<\/article>/)![0];
  const frameC = article.match(/storyboard-frame-label">C · 长按[\s\S]*?storyboard-frame-state/)![0];
  assert.match(frameC, /language OS/);
});

test('Echo Frame A feed-card shows proactive language learning article', () => {
  const html = readShowcase();
  const article = html.match(/<article class="posture-block" id="posture-echo">[\s\S]*?<\/article>/)![0];
  const frameA = article.match(/storyboard-frame-label">A · 白天静默保存[\s\S]*?storyboard-arrow/)![0];
  assert.match(frameA, /Proactive language/);
});

test('Echo Frame B top card shows vocabulary retention sentence', () => {
  const html = readShowcase();
  const article = html.match(/<article class="posture-block" id="posture-echo">[\s\S]*?<\/article>/)![0];
  const frameB = article.match(/storyboard-frame-label">B · 白天 ambient hint[\s\S]*?storyboard-arrow/)![0];
  assert.match(frameB, /Vocabulary retention/);
});

test('Echo Frame C feed-card shows interview prep question', () => {
  const html = readShowcase();
  const article = html.match(/<article class="posture-block" id="posture-echo">[\s\S]*?<\/article>/)![0];
  const frameC = article.match(/storyboard-frame-label">C · 晚上场景就位[\s\S]*?storyboard-arrow/)![0];
  assert.match(frameC, /Personal OS/);
});
```

- [ ] **Step 2: Run test to verify all tests fail**

Run: `node --experimental-strip-types --test tests/ahaMomentPostureContent.test.ts`

Expected: All 9 tests FAIL (real content strings not yet in the HTML)

- [ ] **Step 3: Commit failing test**

```bash
git add tests/ahaMomentPostureContent.test.ts
git commit -m "test(content): add failing tests for real content in storyboard frames"
```

---

## Task 2: Restore Mode-01 handoff section feed-cards (V1.1 and V1.4)

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`

These two variants share the same key sentence (`"I want my work to feel inevitable, not loud."`) since both show a Xiaohongshu-style language learning post being read.

- [ ] **Step 1: Replace V1.1 feed-card content**

Find this exact block inside the `V1.1 Ambient handoff nudge` phone variant:
```html
                          <div class="feed-card">
                            <div class="wf-row"><div class="wf-avatar"></div><div class="wf-line wf-line--45 wf-line--sm"></div></div>
                            <div class="wf-col"><div class="wf-line wf-line--full"></div><div class="wf-line wf-line--75 wf-line--sm"></div></div>
                          </div>
```

Replace with:
```html
                          <div class="feed-card">
                            <div class="wf-row">
                              <div class="wf-avatar"></div>
                              <span style="font-size:9px;color:#c0c0c6;letter-spacing:0.03em;">@英语写作笔记</span>
                            </div>
                            <div style="font-size:11px;line-height:1.6;color:var(--ink);margin-top:4px;">I want my work to feel inevitable, not loud.</div>
                          </div>
```

- [ ] **Step 2: Replace V1.4 feed-card content**

Find this exact block inside the `V1.4 Target language challenge` phone variant:
```html
                          <div class="feed-card">
                            <div class="wf-col"><div class="wf-line wf-line--full"></div><div class="wf-line wf-line--75 wf-line--sm"></div></div>
                          </div>
```

Replace with:
```html
                          <div class="feed-card">
                            <div style="font-size:11px;line-height:1.6;color:var(--ink);">I want my work to feel inevitable, not loud.</div>
                            <div style="font-size:9px;color:#c0c0c6;margin-top:2px;">@英语写作笔记</div>
                          </div>
```

- [ ] **Step 3: Verify the target test passes and no regressions**

Run: `node --experimental-strip-types --test tests/ahaMomentPostureContent.test.ts 2>&1 | grep -E "V1\.1|V1\.4"`

Expected: tests for V1.1 and V1.4 now PASS

---

## Task 3: Restore V1.2 feed-card context lines

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`

The V1.2 "Co-reading anchor" card already shows the selection handle (`inevitable, not loud`) but the surrounding lines are wf-placeholders. Replace the source line and the preceding article sentence.

- [ ] **Step 1: Replace V1.2 feed-card content**

Find this exact block inside the `V1.2 Co-reading anchor` phone variant:
```html
                          <div class="feed-card">
                            <div class="wf-row"><div class="wf-avatar"></div><div class="wf-line wf-line--45 wf-line--sm"></div></div>
                            <div class="wf-col">
                              <div class="wf-line wf-line--60"></div>
                              <div style="display:flex;align-items:center;gap:5px;"><div class="wf-line wf-line--30" style="flex-shrink:0;"></div><span class="word-select" style="flex-shrink:0;font-size:11px;"><span class="sel-dot sel-dot--start"></span>inevitable, not loud<span class="sel-dot sel-dot--end"></span></span></div>
                            </div>
                          </div>
```

Replace with:
```html
                          <div class="feed-card">
                            <div class="wf-row">
                              <div class="wf-avatar"></div>
                              <span style="font-size:9px;color:#c0c0c6;letter-spacing:0.03em;">@英语写作笔记</span>
                            </div>
                            <div class="wf-col">
                              <div style="font-size:10.5px;color:var(--ink-soft);">在设计一门语言，你想让它有重量，又不想让它变成噪音。</div>
                              <div style="display:flex;align-items:center;gap:5px;">
                                <span style="font-size:10.5px;color:var(--ink);flex-shrink:0;">feel</span>
                                <span class="word-select" style="flex-shrink:0;font-size:11px;"><span class="sel-dot sel-dot--start"></span>inevitable, not loud<span class="sel-dot sel-dot--end"></span></span>
                              </div>
                            </div>
                          </div>
```

- [ ] **Step 2: Verify V1.2 test passes**

Run: `node --experimental-strip-types --test tests/ahaMomentPostureContent.test.ts 2>&1 | grep "V1\.2"`

Expected: V1.2 test PASS

---

## Task 4: Restore Trace Frame A feed-card

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`

Trace Frame A shows a Xiaohongshu post being passively read. The marker dot appears at the end of the key sentence. This is the moment before any agent intervention — the user doesn't know the sentence is being captured.

- [ ] **Step 1: Replace Trace Frame A feed-card**

Find this exact block inside the `posture-trace` article, Frame A ("A · 捕捉"):
```html
                          <div class="feed-card">
                            <div class="wf-row"><div class="wf-avatar"></div><div class="wf-line wf-line--40 wf-line--sm"></div></div>
                            <div class="wf-col">
                              <div class="wf-line wf-line--full"></div>
                              <div style="display:flex;align-items:center;gap:4px;"><div class="wf-line wf-line--75" style="flex:1;"></div><span class="aha-marker-dot" style="flex-shrink:0;"></span></div>
                            </div>
                          </div>
```

Replace with:
```html
                          <div class="feed-card">
                            <div class="wf-row">
                              <div class="wf-avatar"></div>
                              <span style="font-size:9px;color:#c0c0c6;letter-spacing:0.03em;">@英语写作笔记</span>
                            </div>
                            <div style="font-size:10.5px;line-height:1.5;color:var(--ink-soft);margin-top:3px;">在设计一门语言，你想让它有重量，又不想让它变成噪音。</div>
                            <div style="display:flex;align-items:center;gap:4px;margin-top:2px;">
                              <span style="font-size:11px;line-height:1.5;color:var(--ink);flex:1;">I want my work to feel inevitable, not loud.</span>
                              <span class="aha-marker-dot" style="flex-shrink:0;"></span>
                            </div>
                          </div>
```

- [ ] **Step 2: Verify Trace Frame A test passes**

Run: `node --experimental-strip-types --test tests/ahaMomentPostureContent.test.ts 2>&1 | grep "Trace"`

Expected: Trace test PASS

---

## Task 5: Restore Ambient Frame A and C feed-cards

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`

Ambient scenario: user is reading an article about proactive language agents. The key article sentence connects to their Personal OS / language learning system framing. Frame A shows compact island + article being read. Frame C shows the same article still visible behind the edge bubble.

Article source: 少数派 · AI 与语言学习  
Key sentence: `"An agent that knows your vocabulary history isn't a dictionary — it's a language OS."`

- [ ] **Step 1: Replace Ambient Frame A top feed-card**

Find this exact block inside `posture-ambient`, Frame A ("A · 旁观"), the FIRST feed-card (no opacity style):
```html
                          <div class="feed-card">
                            <div class="wf-line wf-line--40 wf-line--sm"></div>
                            <div class="wf-col"><div class="wf-line wf-line--full"></div><div class="wf-line wf-line--90"></div><div class="wf-line wf-line--60 wf-line--sm"></div></div>
                          </div>
```

Replace with:
```html
                          <div class="feed-card">
                            <div style="font-size:9px;color:#c0c0c6;letter-spacing:0.03em;margin-bottom:3px;">少数派 · AI 与语言学习</div>
                            <div style="font-size:10.5px;line-height:1.6;color:var(--ink);">An agent that knows your vocabulary history isn't a dictionary — it's a language OS.</div>
                            <div style="font-size:9.5px;color:var(--ink-muted);margin-top:2px;">on building proactive learning systems</div>
                          </div>
```

The second feed-card in Frame A (with `style="opacity:0.55;"`) stays unchanged as wf-lines.

- [ ] **Step 2: Replace Ambient Frame C feed-card**

Find this exact block inside `posture-ambient`, Frame C ("C · 长按"), inside the `.screen-body` before the `aha-card`:
```html
                          <div class="feed-card">
                            <div class="wf-col">
                              <div class="wf-line wf-line--full"></div>
                              <div class="wf-line wf-line--60 wf-line--sm"></div>
                            </div>
                          </div>
```

Replace with:
```html
                          <div class="feed-card">
                            <div style="font-size:10.5px;line-height:1.6;color:var(--ink);">An agent that knows your vocabulary history isn't a dictionary — it's a language OS.</div>
                            <div style="font-size:9.5px;color:var(--ink-muted);margin-top:2px;">on building proactive learning systems</div>
                          </div>
```

- [ ] **Step 3: Verify Ambient tests pass**

Run: `node --experimental-strip-types --test tests/ahaMomentPostureContent.test.ts 2>&1 | grep "Ambient"`

Expected: Both Ambient tests PASS

---

## Task 6: Restore Echo Frames A, B, and C feed-cards

**Files:**
- Modify: `public/language-diary-ux-showcase/index.html`

Echo scenario:
- **Frame A** (14:30, daytime): User reads article about proactive language learning, island saves silently.
- **Frame B** (14:30, right after): Island has hint glow, user continues scrolling. Top card (opacity 0.85) shows next article they're reading. Bottom card (opacity 0.5) stays wf-lines.
- **Frame C** (21:48, evening): User opens Interview Prep workspace — a prep question is visible in the workspace feed.

Article for Frame A: `"Proactive language agents don't wait to be asked — they bring the right word back when you're ready to use it."`  
Article for Frame B top: `"Vocabulary retention isn't about review frequency — it's about encountering words when you need them most."`  
Interview question for Frame C: `"How would you describe the role of a Personal OS in language learning — as a user or as a designer?"`

- [ ] **Step 1: Replace Echo Frame A feed-card**

Find this exact block inside `posture-echo`, Frame A ("A · 白天静默保存"):
```html
                          <div class="feed-card">
                            <div class="wf-line wf-line--40 wf-line--sm"></div>
                            <div class="wf-col">
                              <div class="wf-line wf-line--full"></div>
                              <div class="wf-line wf-line--90"></div>
                              <div class="wf-line wf-line--75 wf-line--sm"></div>
                            </div>
                          </div>
```

Replace with:
```html
                          <div class="feed-card">
                            <div style="font-size:9px;color:#c0c0c6;letter-spacing:0.03em;margin-bottom:3px;">少数派 · AI 与语言学习</div>
                            <div style="font-size:10.5px;line-height:1.6;color:var(--ink);">Proactive language agents don't wait to be asked — they bring the right word back when you're ready to use it.</div>
                            <div style="font-size:9.5px;color:var(--ink-muted);margin-top:2px;">on timing in language acquisition</div>
                          </div>
```

- [ ] **Step 2: Replace Echo Frame B top feed-card**

Find this exact block inside `posture-echo`, Frame B ("B · 白天 ambient hint"), the FIRST feed-card (with `style="opacity:0.85;"`):
```html
                          <div class="feed-card" style="opacity:0.85;">
                            <div class="wf-col">
                              <div class="wf-line wf-line--full"></div>
                              <div class="wf-line wf-line--90"></div>
                              <div class="wf-line wf-line--60 wf-line--sm"></div>
                            </div>
                          </div>
```

Replace with:
```html
                          <div class="feed-card" style="opacity:0.85;">
                            <div style="font-size:9px;color:#c0c0c6;letter-spacing:0.03em;margin-bottom:3px;">少数派 · AI 与语言学习</div>
                            <div style="font-size:10.5px;line-height:1.6;color:var(--ink);">Vocabulary retention isn't about review frequency — it's about encountering words when you need them most.</div>
                            <div style="font-size:9.5px;color:var(--ink-muted);margin-top:2px;">on timing in language acquisition</div>
                          </div>
```

The second feed-card in Frame B (with `style="opacity:0.5;"`) stays unchanged as wf-lines.

- [ ] **Step 3: Replace Echo Frame C feed-card**

Find this exact block inside `posture-echo`, Frame C ("C · 晚上场景就位"), after the `Interview Prep · Agent OS` source label:
```html
                          <div class="feed-card">
                            <div class="wf-col">
                              <div class="wf-line wf-line--full"></div>
                              <div class="wf-line wf-line--90"></div>
                              <div class="wf-line wf-line--60 wf-line--sm"></div>
                            </div>
                          </div>
```

Replace with:
```html
                          <div class="feed-card">
                            <div style="font-size:10.5px;line-height:1.6;color:var(--ink);">How would you describe the role of a Personal OS in language learning — as a user or as a designer?</div>
                            <div style="font-size:9px;color:#c0c0c6;margin-top:2px;">prep note · Agent OS framing</div>
                          </div>
```

- [ ] **Step 4: Verify Echo tests pass**

Run: `node --experimental-strip-types --test tests/ahaMomentPostureContent.test.ts 2>&1 | grep "Echo"`

Expected: All 3 Echo tests PASS

---

## Task 7: Full test suite verification

- [ ] **Step 1: Run the new content test suite**

Run: `node --experimental-strip-types --test tests/ahaMomentPostureContent.test.ts`

Expected: All 9 tests PASS

- [ ] **Step 2: Run the full showcase regression suite**

Run: `node --experimental-strip-types --test tests/ahaMomentPostureShowcase.test.ts`

Expected: All existing tests still PASS (no regressions)

- [ ] **Step 3: Run the copy suite**

Run: `node --experimental-strip-types --test tests/ahaMomentPostureCopy.test.ts`

Expected: All tests PASS

- [ ] **Step 4: Commit completed work**

```bash
git add public/language-diary-ux-showcase/index.html tests/ahaMomentPostureContent.test.ts
git commit -m "feat(showcase): restore real language-learning content in focused storyboard frames"
```

---

## Self-Review

**Spec coverage check:**
- ✅ V1.1 feed-card restored with key sentence
- ✅ V1.2 feed-card source and preceding article line restored
- ✅ V1.4 feed-card restored with key sentence
- ✅ Trace Frame A: Xiaohongshu post with author handle + preceding line + key sentence + marker dot
- ✅ Ambient Frames A and C: language OS article sentence (same article, still reading)
- ✅ Echo Frame A: proactive language article (afternoon reading)
- ✅ Echo Frame B top card: vocabulary retention continuation (still reading session)
- ✅ Echo Frame C: interview prep question (evening workspace)
- ✅ Background cards (Ambient A bottom, Ambient B, Echo B bottom, Echo D) intentionally left as wf-lines

**Placeholder scan:** No TBDs or TODOs — all replacement HTML is fully specified.

**Wf-line survival check:** Ambient Frame B (behind expanded island), Echo Frame D (behind return-sheet), all reduced-opacity second cards in multi-card feeds — none of these are touched by any task.
