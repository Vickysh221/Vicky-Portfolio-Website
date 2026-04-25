# Aha Moment Showcase 重构计划

**日期**：2026-04-25
**目标**：把 `/agentic-design-development/aha-moment` 路由下的 UX showcase 从「Language Diary V2.0 设计决策投票会」重构为「Aha Moment 前台 UX 证据」，同时保留 agentic canvas + 投票星标这套 visual frame（它本身就是"agent 选自己的 UX"的可视化语言）。

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
| `public/language-diary-ux-showcase/index.html` | **全量重写正文 + 局部新增 CSS** | showcase 主体 |
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

新的 5-pill 导航：

```
00 · 读图例
01 · 共同阅读
02 · 回复引导
03 · 关系 / 目标话题
04 · 晚点回来
```

---

## Phase 3 · Section 00「读图例」（新建，纯图例，不放 phone mock）

三块内容：

1. **两种注意力模式** — 左右两半，图释 Explicit / Shared 的边界条件。
2. **6 种前台形态** — 6 个 chip，每个一行定义：
   - Ambient nudge · Co-reading anchor · Reply suggestion
   - Target language challenge · Relation-topic invitation · Deferred return card
3. **Orchestrator 选择模型** — 极简流程图：4 perspective dots → orchestrator → 主★ + 副✩；旁标 6 维度（注意力拥有权 / 任务连续性 / 语言负荷 / 关系深度 / 行动紧迫度 / 记忆命中置信度）。

底部 annotation：「下面 4 个场景都用这套词汇。每个 spread 的星标不再表示『谁觉得 UI 好看』，而是 orchestrator 在当前条件下挑选的主/副前台形态。」

---

## Phase 4 · 4 个场景 spread

### 每个 spread 的固定 5 层结构

```
[Rail]      场景标题 + 触发前提（中文）+ 模式 1 / 模式 2 差异说明
[Stage]     左列 Mode 1（Explicit Attention）   |   右列 Mode 2（Shared Attention）
            每列 2–3 个 phone 变体（case 内英文）
            每个 phone 上挂 vote-cluster（4 perspective dots）
            最佳变体挂 orchestrator 主 ★ / 副 ✩
[Band]      用户被怎么带入下一步（中文，1–2 个 CTA chip）
[Chips]     最后沉淀成什么（中文，4 颗 sediment chip）
[Note]      Vote interpretation：orchestrator 为什么这么选，落到 6 维度（中文）
```

---

### Phone mock 复用映射表

> 所有保留的 phone mock：复用骨架 + 重写文案（case 内改为英文）。

| 场景 | 列 | 变体编号 | 复用源 | 新文案要点（case 内英文） |
|---|---|---|---|---|
| **01 共同阅读** | Mode 1 | V1.1 共读锚点 | s02-A 划词触发 `select-menu` + s02-B `agent-floater` | User selects text → Mimo enters co-reading, anchors on that line |
| | Mode 1 | V1.2 Target language challenge | s04-A3 `agent-banner` + `agent micro-message` | "Want to try reading this line in your target language?" |
| | Mode 2 | V2.1 Ambient nudge | s04-A2 `os-banner` | Minimal edge hint: "something here worth noticing" — no expansion |
| | Mode 2 | V2.2 Deferred return card | s04-B2 `screen-card · save for later` | "Holding this for tonight." |
| | Mode 2 | V2.3 Co-reading anchor（轻版） | s04-A1 `halo-card` | "I noticed this line — worth a second look when you have a moment." |
| **02 回复引导** | Mode 1 | V1.1 Reply candidates | s02-C `orchestrator-card` 骨架去掉派单语义 | Three reply options shown inline |
| | Mode 1 | V1.2 Tone switch | s05 `peek / popover` | "More natural / more polite / sounds like you" |
| | Mode 2 | V2.1 TL challenge nudge | s04-A3 `agent-banner` | "You could try saying this one in X first." |
| | Mode 2 | V2.2 Co-reading first | s04-A1 `halo-card` | "Read the tone of this line together before deciding how to reply." |
| **03 关系 / 目标** | Mode 1 | V1.1 Relation-topic invitation | s07 `letter-card`（缩小版） | "This connects to your Agent OS interview prep — want to say a line?" |
| | Mode 1 | V1.2 Co-reading on relation | s04-A1 `halo-card` | Anchor + side-label: "same thread as what you mentioned before" |
| | Mode 2 | V2.1 Edge bubble | s05 peek 变体 | Edge bubble: "← related to the framing you've been working on" |
| | Mode 2 | V2.2 Deferred relation card | s04-B2 + s07 letter chip | "Tonight: turn this into the interview line you've been looking for." |
| **04 晚点回来** | Mode 1 | V1.1 Saved-and-returned | s05 peek + s07 `letter-card` | "You saved this earlier — ready to try a version?" |
| | Mode 1 | V1.2 Compare-then-now | s08 `knowledge-chip / event-group` | Left: original line · Right: your version now |
| | Mode 2 | V2.1 Legitimacy preface + return | s06 `quiet-room` + return card | "I held this because it felt relevant. Want to bring it back?" |
| | Mode 2 | V2.2 Relation re-link | s08 `woven-field / constellation` | Connecting saved fragment to today's new thread |

> 说明：Scenario 01 的 Mode 2 比其他场景多一个变体（V2.3），以展示「共读锚点」在 Shared Attention 下的轻量形式，和 Mode 1 的主动共读形成对照。其余场景维持 2+2=4 个变体。

---

### Vote interpretation 格式（每 spread 固定格式）

> Expression 推 V_, Relationship 推 V_, Timing 推 V_, Review 推 V_.
> Orchestrator 在 [注意力拥有权 / 任务连续性 / 语言负荷...] 上判断 → 主★ = V_, 副✩ = V_.

每个 spread 落到 6 维度里至少 2 个。

---

## Phase 5 · 老 section 处置

| 老 section | 处置 |
|---|---|
| s01 白天捕获主聊天 agent | 删除 DOM |
| s02 用户主动触发 | phone mock 拆出 → Scenario 01 / 02 Mode 1 复用 |
| s03 OS Share | 删除 DOM |
| s04 Aha Moment | 拆解：Row A → Scenario 01 Mode 1，Row B 的 4 个 next-step 拆到各场景 next-step-band |
| s05 Candidate Peek | 进 Scenario 02 / 04 |
| s06 Day → Night | 仅 quiet-room 进 Scenario 04 V2.1，其余删除 |
| s07 Night Narrative | letter-card 进 Scenario 03 / 04 sediment 区 |
| s08 Knowledge Constellation | 进 Scenario 04 V2.2 + 各场景 sediment chip |

孤儿 CSS 类（`.portfolio-spread--day` 等场景色调）保留，确保 v1 备份页可独立打开。

---

## Phase 6 · React 层（`SharedMemoryAhaCaseStudy.tsx` page 2）

1. 「可复用的前台形态」6 张卡的命名与 Section 00 chip **逐字对齐**（中英都对齐）。
2. `showcaseEmbed` block 的 `caption` 改写为：
   > 下方 showcase 是这一案例的前台 UX 证据。每个场景按 5 层结构展开：场景 → 模式 1/2 → agent 选中的交互形态 → 用户怎么被带入下一步 → 最后沉淀成什么。投票方从 UX / Research / Human 改为 Expression / Relationship / Timing / Review，由 Orchestrator 决定主与副。
3. 不新增页，不改 `SHARED_MEMORY_AHA_CASE_STUDY_PAGE_COUNT`。

---

## Phase 7 · 验收 checklist

- [ ] 5 pill 导航可点 + 锚点跳转正确
- [ ] Section 00：2 种模式 + 6 种形态 chip + orchestrator 流程图均清晰
- [ ] 4 个 scenario spread 都齐 5 层（场景 / 模式分列 / 形态 / next-step / sediment / vote 注解）
- [ ] Scenario 01 Mode 2 有 3 个变体（V2.1 / V2.2 / V2.3），其余各 2 个
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
