# Aha Moment Showcase 重构计划

**日期**：2026-04-25
**2026-04-26 修订目标**：把 `/agentic-design-development/aha-moment` 路由下的 UX showcase 从「按场景分组」改成「按两种 agent 参与模式分组」。Aha Moment 的共同前提是 agent 主动介入；区别不再沿用旧的注意力命名，而是：

1. **用户递交型参与**：用户主动把内容、草稿、问题或意图交给 agent。页面重点解释人如何把消息传达给 agent，以及 agent 如何接住这次递交。
2. **情境感知型介入**：用户没有显式递交，但 agent 在授权上下文里识别到 Aha 候选。页面重点解释系统如何根据 Aha 强度选择通知类型和出现层级：banner notification、灵动岛式 saved pill、inline 回复、edge bubble、卡片 / 弹窗、保存状态或晚点回访。

四个原场景（共同阅读 / 回复引导 / 关系目标 / 晚点回来）降级为最后的 **case evidence**，用于证明两种参与模式和六种前台形态如何落地。

**原始目标**：把 `/agentic-design-development/aha-moment` 路由下的 UX showcase 从「Language Diary V2.0 设计决策投票会」重构为「Aha Moment 前台 UX 证据」，同时保留 agentic canvas + 投票星标这套 visual frame（它本身就是"agent 选自己的 UX"的可视化语言）。

参考文档：`/Users/vickyshou/.openclaw/workspace/shared/projects/Multi-agent-lang/v3.0 Aha moment/aha-frontstage-ux-architecture.md`

---

## 语言约定（全文适用）

- phone case **外**的所有文案（rail、band、chip、vote 注解、masthead）：**统一中文**
- phone case **内**的所有 UI 文案：**英文**

---

## 总叙事重定调

Masthead 标题改写为：

> **Aha Moment 前台 UX · Agentic Canvas Session**
> 同一个 agent 在不同时机里，如何为自己挑选最合适的出现方式。
> 4 个 agent perspective（Expression / Relationship / Timing / Review）给出推荐，Orchestrator 决定**主前台形态 + 副前台形态**。

---

## 文件清单与责任

| 文件 | 改动性质 | 用途 |
|---|---|---|
| `public/language-diary-ux-showcase/index.html` | **重排正文 + 复用现有视觉骨架** | showcase 主体 |
| `public/language-diary-ux-showcase/agentic-canvas-v1.html`（新增） | 拷贝当前 index.html | 备份 / 可对照 |
| `public/language-diary-ux-showcase/legacy.html` | **不动** | 仅保留文件，前台访问入口隐藏 |
| `src/pages/SharedMemoryAhaCaseStudy.tsx` | **微调 page 2 的副本和 caption** | 与 showcase 词汇对齐 |
| `src/pages/sharedMemoryAhaCaseStudyMeta.ts` | **不动**（页数仍是 2） | — |

---

## Phase 0 · 备份 + 隐藏 legacy

1. 把当前 `public/language-diary-ux-showcase/index.html` 完整复制为 `agentic-canvas-v1.html`。
2. 在 `index.html` 里：
   - `<div class="layout-tabs">` 整块加 `hidden` 属性。
   - `<section id="layout-legacy">` 加 `hidden`。
   - `.masthead-note` 改为新的一句话引导。
   - legacy.html 仍可通过直接 URL 访问。

---

## Phase 1 · 视觉词汇（CSS tokens + 新 utility）

加在 `<style>` 块顶部 token 区：

```css
/* 4 agent perspectives */
--expression-agent:   #ff6c5f;   /* 暖珊瑚 */
--relationship-agent: #9b7dd4;   /* 沿用现有紫 */
--timing-agent:       #2f9bff;   /* 沿用现有蓝 */
--review-agent:       #c8a96e;   /* 沿用现有金 */
--orchestrator-mark:  #1b1b1f;
```

新增 dot 类：`.vd-expression / .vd-relationship / .vd-timing / .vd-review`
新增星级：`.is-orch-primary`（实心 ★）/ `.is-orch-secondary`（半透明 ★，副模式）
保留旧的 `.vd-ux / .vd-research / .vd-human / .pv-starred-ux / .pv-starred-research`（确保 v1 备份页可独立打开）。

新增 4 个布局 utility：

- `.scenario-spread` — 两列模式布局（替代 `.portfolio-spread`）
- `.mode-column` + `.mode-column--explicit` / `.mode-column--shared` — 模式 1 / 模式 2 分列
- `.next-step-band` — 横跨两列的「低成本下一步」窄条
- `.sediment-chip-row` + `.sediment-chip` — 末尾「沉淀成什么」chip 排

phone mock 内的视觉组件（halo-card / agent-floater / orchestrator-card / letter-card / save-banner / select-menu / quiet-room / woven-field 等）**全部复用骨架，只换文案**。

---

## Phase 2 · Masthead + nav 重构

2026-04-26 后新的 4-pill 导航：

```
00 · 图例
01 · 用户递交型参与
02 · 情境感知型介入
03 · 场景佐证
```

---

## Phase 3 · Section 00「图例」（纯图例，不放 phone mock）

三块内容：

1. **两种 agent 参与模式** — 左右两半，图释「用户递交型参与」与「情境感知型介入」。
2. **6 种前台形态** — 6 个 chip，每个一行定义：
   - Ambient nudge · Co-reading anchor · Reply suggestion
   - Target language challenge · Relation-topic invitation · Deferred return card
3. **Orchestrator 选择模型** — 极简流程图：4 perspective dots → orchestrator → 主★ + 副✩；旁标 6 维度（用户是否递交 / Aha 强度 / 任务连续性 / 语言负荷 / 关系深度 / 记忆命中置信度）。

底部 annotation：「下面先按两种参与模式列出 UX 证据；四个具体场景只作为最后的 case evidence。」

---

## Phase 4 · 两种参与模式 spread

### 01 · 用户递交型参与

- 先讲用户如何把消息传达给 agent：选中文本、点击入口、分享内容、请求回复、保存片段、召唤 orchestrator。
- 再列出六种 AGENT 前台形态在主动递交下的 UX 证据：
  - Ambient nudge / handoff floater
  - Co-reading anchor
  - Reply suggestion
  - Target language challenge
  - Relation-topic invitation
  - Deferred return card

### 02 · 情境感知型介入

- 先讲 Aha Moment 都是 agent 主动介入，但介入强度取决于 Aha 程度和上下文合法性。
- 再列出六种 Aha 类通知在情境感知下的 UX 证据：
  - AHA banner notification
  - AHA island save notification
  - AHA inline reply
  - AHA edge bubble notification
  - AHA inline challenge notification
  - AHA return card / modal preface

### 03 · 场景佐证

四个原场景不再做主分类，只做 evidence matrix：

- 共同阅读：用户递交时是共读锚点；情境感知时可从 banner、inline 回复或 edge bubble 升级到共读锚点。
- 回复引导：用户递交时直接给回复候选；情境感知时先判断语气和关系负荷。
- 关系 / 目标话题：用户递交时可直接连接目标；情境感知时更依赖记忆命中置信度。
- 晚点回来：当下 Aha 强度不足或场景不适合时先保存状态；复盘或强相关时再升级为完整 return。

---

### Phone mock 复用映射表

> 所有保留的 phone mock：复用骨架 + 重写文案（case 内改为英文）。

| 模式 | 变体编号 | 类型标注 | 复用源 | 新文案要点（case 内英文） |
|---|---|---|---|---|
| 用户递交型参与 | V1.1 | Ambient handoff nudge | `agent-floater` | User selects text → Mimo is ready to help |
| 用户递交型参与 | V1.2 | Co-reading anchor | s02-A / s02-B | User invites Mimo into co-reading |
| 用户递交型参与 | V1.3 | Reply suggestion | `orchestrator-card` | Three reply options shown inline |
| 用户递交型参与 | V1.4 | Target language challenge | s04-A3 `agent-banner` | "Want to try reading this line in your target language?" |
| 用户递交型参与 | V1.5 | Relation-topic invitation | s07 `letter-card` | Goal / relationship link after handoff |
| 用户递交型参与 | V1.6 | Deferred return card | s05 peek + s07 `letter-card` | User-saved fragment returns later |
| 情境感知型介入 | V2.1 | AHA banner notification | s04-A2 `os-banner` | "AHA · banner notification" |
| 情境感知型介入 | V2.2 | AHA island save notification | `tag--coral` saved pill | "AHA · saved for tonight" |
| 情境感知型介入 | V2.3 | AHA inline reply | `agent-banner` | Inline reply suggestion before sending |
| 情境感知型介入 | V2.4 | AHA edge bubble notification | s05 `peek-card--popover` | Edge bubble connects current text to active framing |
| 情境感知型介入 | V2.5 | AHA inline challenge notification | `screen-card` | Inline target-language challenge |
| 情境感知型介入 | V2.6 | AHA return card / modal preface | s06 `quiet-room` | Stronger return card when Aha evidence is high |

> 说明：情境感知型介入必须标注具体 Aha 通知类型，用来展示同一个 Aha candidate 如何从 banner、灵动岛、inline 回复、edge bubble 升级到更强 return card / modal；它不等同于低打扰。

---

### Vote interpretation 格式（每 spread 固定格式）

> Expression 推 V_, Relationship 推 V_, Timing 推 V_, Review 推 V_.
> Orchestrator 在 [注意力拥有权 / 任务连续性 / 语言负荷...] 上判断 → 主★ = V_, 副✩ = V_.

每个 spread 落到 6 维度里至少 2 个。

---

## Phase 5 · 老 section 处置

| 老 section | 处置 |
|---|---|
| s01-s08 旧场景主线 | 保留为隐藏素材，不再参与主滚动叙事 |
| s02 / s04 / s05 / s07 等 phone mock | 拆出骨架和文案，复用到「用户递交型参与」与「情境感知型介入」两个 spread |
| 四个原场景 | 降级为「场景佐证」里的 evidence summary，用来说明同一组前台形态如何被不同参与关系调用 |

孤儿 CSS 类（`.portfolio-spread--day` 等场景色调）保留；当前实现只调整 DOM 和文案，不改现有 UI 样式规则。

---

## Phase 6 · React 层（`SharedMemoryAhaCaseStudy.tsx` page 2）

1. 「可复用的前台形态」6 张卡的命名与 Section 00 chip **逐字对齐**（中英都对齐）。
2. `showcaseEmbed` block 的 `caption` 改写为：
   > 下方 showcase 是这一案例的前台 UX 证据。它先区分用户递交型参与与情境感知型介入，再展示同一组前台形态如何在两种参与关系下被不同地调用。
3. 不新增页，不改 `SHARED_MEMORY_AHA_CASE_STUDY_PAGE_COUNT`。

---

## Phase 7 · 验收 checklist

- [ ] 4 pill 导航可点 + 锚点跳转正确
- [ ] Section 00：2 种模式 + 6 种形态 chip + orchestrator 流程图均清晰
- [ ] 两个模式 spread 都列出 6 种 AGENT 前台形态的 UX 证据
- [ ] 情境感知型介入明确标注不同 Aha 通知类型：banner notification、灵动岛式 saved pill、inline 回复、edge bubble、inline challenge、return card / 弹窗
- [ ] 每个 spread 的 vote 注解都点名至少 2 个 6 维度坐标
- [ ] 主★ 唯一，副✩ 0 或 1 个
- [ ] Section 00 的 6 chip 命名 = React page 2 的 6 cards 命名 = scenario spread 内的形态名
- [ ] phone case 外全中文，phone case 内全英文
- [ ] legacy tab 不可见；`/language-diary-ux-showcase/legacy.html` URL 仍可直接打开
- [ ] `/agentic-design-development/aha-moment` 两页都能渲染，iframe 滚动正常
- [ ] `npm run build` 通过

---

## Phase 8 · 提交切片

| 序号 | 内容 |
|---|---|
| A | 备份 v1 + 隐藏 layout-tabs / legacy panel + masthead 文案 |
| B | CSS tokens + utility（vd-* / 模式列 / next-step-band / sediment-chip）|
| C | 5-pill nav 替换 + Section 00「读图例」 |
| D | Scenario 01 共同阅读（含 5 个变体）|
| E | Scenario 02 回复引导 |
| F | Scenario 03 关系 / 目标话题 |
| G | Scenario 04 晚点回来 |
| H | 删旧 s01-s08 DOM + 清理孤儿 CSS |
| I | React page 2 词汇对齐 + caption 改写 |
