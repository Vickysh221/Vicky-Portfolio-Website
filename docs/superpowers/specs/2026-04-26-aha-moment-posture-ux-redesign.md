# Aha Moment 姿态化 UX 重构 · 设计文档

日期：2026-04-26
关联范式：`docs/aha-moment-agent-aha-mode-design-paradigm.md`
影响页面：`/agentic-design-development/aha-moment` 第二与第三页 React 页 + `/language-diary-ux-showcase/index.html` 内 legend(s00)与 section 02

## 背景与目标

当前 showcase 把 Aha Moment 的前台 UI 抽象成"六种 AGENT 前台形态"(Ambient nudge / Co-reading anchor / Reply suggestion / Target language challenge / Relation-topic invitation / Deferred return card)。这套词汇把 UI 组件当成主分类，与新范式文档冲突 —— 新范式认为：

> Agent Aha Mode 的主分类不是组件，而是介入姿态。

新范式提出七种介入姿态：Trace 留痕 / Ambient 呼吸 / Inline 镶嵌 / Morphing 变形 / Echo 回声 / Co-creation 共创 / Agentic Action 代理行动。每种姿态对应一个生成式信息层级（G0–G5）和一组用户控制。

**本次重构只覆盖 Aha Moment（mode-02 · 情境感知型介入）。** mode-01（用户递交型参与）不属于 Aha Moment，本次不动。

目标：

1. 用七种介入姿态替换 legend 中的"六种 AGENT 前台形态"。
2. 把 02 节重写为"七个姿态 × 各自 storyboard"的场景化说明，每帧严格按真 iPhone chrome 绘制。
3. 删除 03 · 场景佐证（七姿态 storyboard 已经把场景讲透）。
4. 同步 React 页 page-2 的 contentBlocks 文案，使姿态成为主分类、UI 组件成为载体。

## 不做的事

- 不改 mode-01 · 用户递交型参与（不属于 Aha Moment）。
- 不改 page-1 文案（场景一/场景二/v3.0 范式来路）。
- 不改 page-3 框架（HTML iframe 仍嵌入同一个 showcase）。
- 不引入新依赖（仍用现有 Vite + React + 内联 CSS 模式）。

## iPhone Chrome 规范（全节统一）

所有 phone 元素改为真 iPhone 14 Pro+ 规范，作为 showcase 内 CSS 组件抽象。

### 状态栏

```
┌────────────────────────────────────────────────┐
│  9:41              ▮▮▮▮▮            ●  ●●●  ▭ │
│                  (灵动岛)                       │
└────────────────────────────────────────────────┘
```

- 时间 `9:41` 左侧（SF Pro 字体或近似 system font，14px，加粗）
- **真灵动岛** 顶部正中：纯黑椭圆，idle 时 `~110×30px`，圆角 `999px`
- 信号 / wifi / 电池图标右侧（用 SVG 或 unicode 拟，颜色随屏幕背景）
- 状态栏不随内容滚动

### 灵动岛三态

按 iPhone 14 Pro 实机 `393pt` 屏宽 + 实机灵动岛 `126×37pt` 等比换算到 360px phone-screen：

| 态 | 尺寸 | 内容 | 触发 |
|---|---|---|---|
| idle | `116×28` | 全黑空心 | 无 Aha 活动 |
| compact | `~190×28` | 左端圆点 + 右端文案（`AHA`、`saved`、`1 from earlier`） | Trace 写入 / Ambient 提示 / Echo 触发 |
| expanded | 向下扩张 `~330×84` | 一行 reason + 关闭 x | 用户轻点 compact 态 |

实机比例约 32% 屏宽，本规范保留这个比例。

### Banner notification

- **贴在状态栏正下方屏幕顶端**，圆角 `24px`，半透明 + `12px` 模糊
- 高度 `~64px`：左侧 `28×28` 圆角 app icon + 中间标题 + 副标题，右上 `now`
- 滑入时带阴影 `0 8 24 rgba(0,0,0,0.18)`
- 在本项目里几乎不用（banner 属于普通 OS 通知，Aha Mode 通常更精确）；只在示例对比时出现，不作为主要姿态载体。

### Inline suggestion bar

- 挂在键盘上方（如果当前 app 是 iMessage/Slack）或挂在用户当前编辑气泡的下方
- 半透明白色卡，圆角 `16px`，左缘 `2px` 强调色描边
- 不出现独立浮层；不挡输入区
- 行动 chip 用 `28px` 高 pill，间距 `6px`

### Edge bubble

- 右边缘 floating 圆球，`56×56px`，带柔光阴影
- 不挡正文，长按展开为 popover
- 默认收起为单个 dot（节制）

### Return card / sheet

- 从底向上 sheet，圆角 `28px` 顶部
- 顶部 `36×4` grabber
- 状态栏仍可见
- 内含一行 reason + 转化菜单 + rebuttal pill

### Micro-session 全屏

- 全屏 task screen，顶部步骤 indicator（`1/4 · recall context` 等）
- 底部 fixed 行动栏：`pause` / `change criteria` / `quieter next time`

### Phone 外壳

复用现有 `.phone` / `.phone-screen` 容器，只把 statusbar 与 home indicator 替换为新规范。新增 CSS 组件统一在下文「统一视觉语言」节末尾的「CSS 组件清单」给出。

## 统一视觉语言

Aha Moment 跨七姿态共用一套可识别的"agent 在前台"信号 —— 不依赖具体载体（banner / island / inline / sheet）。无论姿态最轻（Trace）还是最重（Agentic Action），用户都一眼认得这是 Aha 在出现。

### 1. Aha 主色

| Token | 值 | 用途 |
|---|---|---|
| `--aha-amber` | `#c8854a` 暖琥珀 | 灵动岛 compact 圆点 / 卡左缘 2px 描边 / marker dot / rebuttal pill border / Aha label 文字 |
| `--aha-amber-soft` | `rgba(200,133,74,0.16)` | ambient hint glow / 卡片背景轻染 / hover 态 |

与现有 `--coral`（普通 OS banner / tag 用）属同色温家族但区分使用。**主色不用于大面积填充**，避免变回"通知色"语义。

### 2. Aha 标签格式

所有姿态卡第一行（如果有文字）永远以这一签名开头：

```
AHA · <posture in lowercase>
```

样式：`11px` / `letter-spacing: 0.18em` / `color: var(--aha-amber)` / 反白背景下 `#fff opacity 0.92`。这是横跨七姿态的视觉签名。

### 3. 信息三层结构（强制）

每个 Aha 卡 —— inline suggestion / return sheet / action card / 灵动岛 expanded —— 都遵循：

```
┌──────────────────────────────┐
│ AHA · posture                │  Header（11px，amber，最克制）
│ <reason / generated body>    │  Body（13–15px，主文）
│ [chip] [chip] [chip]         │  Footer（rebuttable，永远存在）
└──────────────────────────────┘
```

**Footer 永远存在，但数量按信息层缩放**：

| 姿态信息层 | Footer chip 数量 | 必须包含 |
|---|---|---|
| G0–G1（Trace） | 2 chip | `keep` / `dismiss` |
| G1–G2（Ambient） | 2–3 chip | `save for later` / `show less like this` / `dismiss` |
| G2–G3（Inline） | 3–4 chip | `insert` 或主行动 + lens 调整 + `dismiss` |
| G3–G4（Morphing / Echo / Co-creation） | 4 chip | 主行动 + 来源/上下文 + lens / 强度 + 记忆控制 |
| G4–G5（Agentic Action） | 4–5 chip 完整反驳行 | 完整 rebuttable pill 行 |

轻姿态有轻反驳；重姿态完整反驳。这是文档"可反驳原则"和"信息层"的双重落地。

### 4. Agent 语音规则

- **小写句首**（`Try: ...` / `bring it in` / `not now`），不大写、不命令式
- **以"我看到/我留住了"为底层默认动作**（`I held this because...`），不以"你应该"开头
- **永远给可拒绝出口**（`don't connect again` / `quieter next time`）
- 中文同步：动词只用"想"、"试"、"留"，不用"必须"、"建议"、"请"

### 5. 通用 marker 三件套（轻语言）

| Marker | 视觉 | CSS 类 | 用在 |
|---|---|---|---|
| **Trace marker** | 句末 / 词尾 `6×6` 圆，`var(--aha-amber-soft)` 填充 | `.aha-marker-dot` | Trace A 帧、Echo A 帧 |
| **Island compact dot** | 灵动岛左端 `5×5` 实心圆，`var(--aha-amber)` | `.aha-island-dot` | Ambient A 帧、Echo C 帧 |
| **Ambient hint glow** | 元素四周 `box-shadow: 0 0 0 2px var(--aha-amber-soft)` | `.aha-hint-glow` | Echo B 帧、Ambient B 帧 |

三件套都属于"agent 在场但不打断"的轻语言，跨姿态可复用。

### 6. Rebuttable pill 视觉

- 高 `28px` / 圆角 `999px` / `1px` border `var(--aha-amber)` 透明度 0.4
- 文字 `var(--aha-amber)`，不填充背景；hover 态填 `var(--aha-amber-soft)`
- 三类 chip 颜色一致，靠**文案前缀**区分：
  - `lens · use different`（lens 调整）
  - `quieter · next time`（强度调整）
  - `memory · don't save this source`（记忆 / 连接控制）

### 7. 帧间状态过渡（静态 storyboard 元数据）

storyboard 不是 phone 自身 —— 帧间元数据要统一：

- 帧间小箭头 `→` + 帧标签：`捕捉` / `介入` / `写回` / `回访` / `转化`
- phone 下方 11px 灰字状态描述：`灵动岛 idle → compact · agent 进入 ambient 姿态`
- 这些不是 phone 内 UI，是 storyboard 的"读图说明"

### 8. 不破坏宿主 app 视觉（关键约束）

**Aha 元素只是叠加层（overlay），不是替换层。** Slack / iMessage / 小红书 / portfolio 的原生视觉保持不变；Aha 只在三处出现：

1. **状态栏**（灵动岛三态）
2. **浮层**（inline suggestion / return sheet / edge bubble）
3. **极轻 marker**（marker dot / hint glow）

例外：**Agentic Action 的 micro-session 全屏帧本就是脱离宿主的 task screen**，不受此约束 —— 但仍应使用 Aha 主色与三层结构，保持视觉签名连续。

这传达"agent 在多个 app 间穿过、没占领任何一个"的范式核心。

### 9. CSS 组件清单（合并整理）

在现有 `<style>` 块尾部追加：

```
/* iPhone chrome */
.dynamic-island
.dynamic-island--compact
.dynamic-island--expanded

/* Aha 视觉语言 */
.aha-marker-dot
.aha-island-dot
.aha-hint-glow
.aha-card                /* 含 left-border accent + 主色 token */
.aha-card-header         /* "AHA · posture" 签名 */
.aha-card-body
.aha-card-footer
.rebuttal-row
.rebuttal-pill           /* 三类靠文案前缀区分 */

/* 姿态特定载体 */
.os-banner-top           /* 贴顶 banner（罕用） */
.inline-suggestion       /* 键盘 / 输入气泡上方 */
.suggestion-chip
.return-sheet
.return-sheet-grabber
.micro-session-frame
.micro-session-step

/* storyboard 元数据 */
.posture-storyboard
.storyboard-arrow
.storyboard-frame-label
.posture-meta
```

## Legend(s00) 改动

保留 "两种 AGENT 参与模式" 那一栏（mode-01 / mode-02 区别说明）不变。

替换 "六种 AGENT 前台形态" 那一栏为 **"七种 Aha Mode 介入姿态"**（在标题旁标注 `适用 mode-02`）。

七张姿态卡，每张内容统一为：

```
┌───────────────────────────┐
│ 姿态名 · 中文              │ G_–G_ 信息层
├───────────────────────────┤
│ 一行意图                   │
│ 触发条件 · 用户控制         │
└───────────────────────────┘
```

七卡内容：

| 姿态 | G | 一行意图 | 触发 | 用户控制 |
|---|---|---|---|---|
| Trace 留痕 | G0–G1 | 不打断，只留下未来可回访痕迹 | 有价值但不急 | keep / dismiss / don't save this source |
| Ambient 呼吸 | G1–G2 | 界面轻微变化，表达"我看到了" | 用户连续阅读浏览 | tap to expand / save for later / show less like this |
| Inline 镶嵌 | G2–G3 | 嵌入当前任务，顺手推进一步 | 用户写、回、改、卡住 | insert / softer / more direct / dismiss |
| Morphing 变形 | G3–G4 | 同一片段转成当前任务需要的材料 | 同片段在不同任务里 | choose direction / more portfolio-like / more conversational |
| Echo 回声 | G2–G4 | 未来更合适时把旧内容带回来 | 复盘、面试、晚间回访 | bring it in / not now / show original / don't connect again |
| Co-creation 共创 | G3–G4 | 邀请用户一起塑形 | 表达、作品集、面试准备 | choose lens / edit candidate / show why / not my point |
| Agentic Action 代理行动 | G4–G5 | 把 Aha 转成任务分叉口 | 高置信、高相关、高可行动 | choose path / change lens / stop session / don't memorize |

底部 legend-note 改写：

> 02 节按七姿态展开，每个姿态用一个 storyboard（2–5 帧）讲清楚 agent 怎么发现、怎么出现、用户怎么处理、怎么写回到下一个状态。所有 phone 帧严格按真 iPhone chrome（灵动岛 / banner 贴顶 / inline 适应输入流）绘制。

## Section 02 重写

section title：`02 · 情境感知型介入 / Agent Aha Mode`

副标题：

> Aha Moment 都是 agent 主动介入的时刻 —— 包括用户停顿、卡住、正在表达时。这一节按七种介入姿态展开，每种姿态用文档里的 use case 当骨架，画一个 2–5 帧的 storyboard：agent 如何发现、如何出现、用户如何处理、如何写回。

每个 storyboard 区块统一结构：

```
┌─ 姿态名 · 中文 · 信息层 G_–G_ ───────────────────┐
│ 一行意图 + 触发条件                              │
│                                                  │
│  [Phone A] → [Phone B] → [Phone C] → ...        │
│   带帧间小箭头与帧标签（捕捉 / 介入 / 写回 等）  │
│                                                  │
│  写回结果：……                                    │
│  可反驳控件：challenge / show evidence / 不是这个意思 / 以后少这样 │
└──────────────────────────────────────────────────┘
```

七个 storyboard 详述如下：

### ① Trace 留痕 · G0–G1

来源 Use Case 1：小红书读到 `I want my work to feel inevitable, not loud.`

**3 帧**：

- **A · 捕捉（14:08）**：小红书 feed，看到那句话。灵动岛 idle。句子末尾应用 `.aha-marker-dot` —— 6×6 amber-soft 圆点。无任何系统级提示。
- **B · 复盘（22:14）**：晚间复盘视图，折叠卡 `kept from afternoon reading · 1 fragment held`。展开看到原句 + 三 chip：`keep` / `dismiss` / `don't save this source`。
- **C · 写回（22:14）**：用户点 keep。系统轻提示：`expression seeds +1 · future similar fragments more likely to surface tonight`。

**写回结果**：用户保留 → 提升该表达类型的 future recall 权重；忽略 → 降低类似轻量阅读片段的主动回访频率。

**可反驳**：`don't save this source`（来源排除）/ `quieter`（降低同类频率）。

### ② Ambient 呼吸 · G1–G2

来源 Use Case 2：用户读 Agent OS 文章，与近期 Personal OS 思考相关。

**3 帧**：

- **A · 旁观**：长文阅读视图。**灵动岛进入 compact 态**（轻微变宽，左端橙圆点，右端 `AHA`）。阅读流不中断。
- **B · 轻点展开**：灵动岛 expanded 态向下扩张成胶囊卡片，一行 reason：`related to your Personal OS framing`，右上角 dismiss x。
- **C · 长按**：edge bubble 从右边缘弹出 popover：`save for later` / `show less like this` / `open context`。

**写回结果**：展开 → 系统记录该主题连接有用；连续忽略 → 降低 Ambient 强度。

**可反驳**：`show less like this` / `change criteria`。

### ③ Inline 镶嵌 · G2–G3

来源 Use Case 3：Slack 写英文回复，卡在第二句。

**3 帧**：

- **A · 卡住**：Slack 输入态，气泡草稿停在 `I'd want to push back on this...`，光标闪烁。灵动岛 idle。
- **B · 介入**：键盘上方滑入 inline suggestion bar：
  ```
  Try: Fair point. I'd want to explore one thing first.
  [insert] [softer] [more direct] [dismiss]
  ```
- **C · 写回**：用户点 insert，草稿替换。底部小 chip：`saved tone preference: gently direct · 7 similar over the past month`。

**写回结果**：采用 → 学习用户偏好语气方向；dismiss → 不写入长期记忆。

**可反驳**：`softer` / `more direct` / `not my voice`（lens 调整）。

### ④ Morphing 变形 · G3–G4

来源 Use Case 4：同一片段 `Agents shouldn't be locked inside one app.` 出现在不同任务里。

**3 帧 + 底部说明**：

- **A · 在写英文（iMessage）**：inline 卡 `a sentence you might want to use → "Agents shouldn't be locked inside one app."` chip：`insert` / `more conversational`。
- **B · 在做作品集（portfolio 编辑器）**：同片段卡变成 project framing：`"Agents that don't live inside one app — a Personal OS thesis."` chip：`use as section title` / `more product-like` / `more poetic`。
- **C · 在准备面试（interview prep 工作区）**：同片段卡变成 interview answer 段落预览（70 词），chip：`save to mock answers` / `shorten` / `add evidence`。
- **底部 sediment**：`same fragment · three workspaces · three transformations · user controls direction`

**写回结果**：转化路径成为 future routing policy 的输入；转化资产进入对应工作区，不只是通知历史。

**可反驳**：`not this lens` / `change criteria`。

### ⑤ Echo 回声 · G2–G4 ★ Hero

来源 Use Case 5：白天读到 proactive systems 内容 → 晚上面试准备。

**5 帧**（这是 02 节的核心 demo）：

- **A · 白天静默保存（14:30）**：proactive systems 文章页。灵动岛极短 compact 闪一下（`AHA · saved` 0.8s 后回 idle）。content 区无任何 banner/卡。
- **B · 白天 ambient hint（14:30+ε）**：阅读继续，灵动岛回到 idle 但应用 `.aha-hint-glow` —— 这是统一视觉语言里的 ambient hint glow token（不是为这一帧即兴写的 box-shadow）。让读者看到 agent 把状态留在 island 上、不打扰内容流。
- **C · 晚上场景就位（21:48）**：用户打开 Agent OS interview prep 工作区。灵动岛 compact 显示 `1 from earlier ↓`。
- **D · return card**：用户轻点灵动岛 → 从底向上 sheet 滑出：
  ```
  下午你看到的那句话现在有用了
  · It can support your answer about OS-native Agent.
  [bring it in] [not now] [show original context] [don't connect these again]
  ```
- **E · 转化菜单**：点 bring it in → 三选一：`Interview sentence` / `Portfolio framing` / `Expression card`，每张卡有 preview + `pick` / `not my point`。

**写回结果**：接受 → 进入面试准备工作区；拒绝 → 降低跨时间回访置信度；`don't connect these again` → 该连接排除。

**可反驳**：`don't connect these again`（连接排除）/ `not the right time`（timing 写回）。

### ⑥ Co-creation 共创 · G3–G4

来源 Use Case 6：作品集文案，某 Aha 可成为 framing 但未定型。

**3 帧**：

- **A · 邀请**：portfolio 编辑器，agent 卡：`This could become a portfolio sentence. Want to shape it together?` 三个 lens chip：`更产品化` / `更面试化` / `更诗性`。
- **B · 选 lens**：用户点 `更产品化`。卡展开为 3 个候选版本（每条 60–80 词 preview），每条带 `edit` / `pick`。底部：`show why this lens` / `not my point`。
- **C · 写回**：用户编辑后确认 → `saved as portfolio v3 draft · lens preference learned: product-leaning · won't enter long-term memory until you mark it final`。

**写回结果**：仅用户确认后的版本进入作品集素材或长期记忆；lens 偏好软学习，不强写入。

**可反驳**：`not my point` / `change criteria` / `show evidence`。

### ⑦ Agentic Action 代理行动 · G4–G5

来源 Use Case 7：面试前一晚或作品集 session。

**3 帧**：

- **A · 路径菜单**：全屏 action card：
  ```
  I can turn this into:
  1. expression card
  2. portfolio bullet
  3. mock interview answer
  4. diary reflection
  ```
- **B · micro-session 中**：用户选 `mock interview answer` → 进入 3–5 min session 全屏。顶部步骤 indicator：`2/4 · refine tone`（前一步已 ✓，后两步 queued）。中部为当前 step 内容 + 输入区。底部 fixed：`pause` / `change criteria` / `quieter next time`。
- **C · session 结束**：资产落入面试准备工作区。底部一排 rebuttable pill：`change criteria` / `use different lens` / `show evidence` / `quieter next time` / `don't memorize`。

**写回结果**：生成资产进入工作区；选择路径更新 future routing policy；被拒绝路径降低推荐权重。

**可反驳**：完整 rebuttable pill 行（这是 G4–G5 高介入度的必备视觉）。

## 可反驳原则视觉一致性

每个 storyboard 末帧都带一组 rebuttable chip 行，**chip 数量按信息层缩放**（详见「统一视觉语言」第 3 节 Footer 规则表）：

- 轻姿态（G0–G2）：2–3 chip，最少含 `keep` / `dismiss`
- 中姿态（G2–G4）：3–4 chip，含主行动 + lens 或来源控制
- 重姿态（G4–G5）：4–5 chip 完整反驳行

三类 chip 用文案前缀区分，颜色一致：

- **lens 调整**：`lens · use different` / `lens · not my point`
- **强度调整**：`quieter · next time` / `show less like this` / `not the right time`
- **记忆 / 连接控制**：`memory · don't save this source` / `don't connect again`

这是 Aha Mode 与普通推荐系统的区分线 —— UI 必须把"反驳"做成一等公民，不只是隐藏在长按菜单里的 secondary action。轻姿态有轻反驳，重姿态完整反驳，但**没有任何末帧只能 accept 而不能反驳**。

## React 页 page-2 文案同步

文件：`src/pages/SharedMemoryAhaCaseStudy.tsx`，`sharedMemoryAhaPages[1]`（slideIndex=1）。

### mainCopy 重写

将现有 `'下一页讨论的是：当 Aha 已经被发现，agent 怎么为自己挑一个合适的通知类型和出现方式？...'` 段落改写。新版要点：

- 把 banner / 灵动岛 / inline / edge bubble / return card / 弹窗 这些"组件名"降级为载体。
- 把"姿态选择"提升为主分类。
- 引用文档第 580 行：`Agent Aha Mode 不是让 agent 更频繁提醒，而是在合适关系席位上，把片段捕捉、连接、生成、回访，并转化为用户可控制的表达或行动。`

### contentBlocks 改动

| 原 block | 改动 |
|---|---|
| comparisonCards "两种 agent 参与模式"（保留） | 不变，作为读图前的关系背景 |
| comparisonCards "可复用的前台形态"（6 卡） | **替换为 "Agent Aha Mode 七种介入姿态"（7 卡）**：每卡含姿态名（中英）+ G 信息层 + 一行触发条件 + 一行用户控制。仅适用 mode-02。 |
| shortParagraphs "前台原则"（3 段） | 重写为 "姿态选择原则"（3–4 段），引文档"设计规则"前 4 条。 |

### page-3 文案微调

文件：同上 `sharedMemoryAhaPages[2]`，showcaseEmbed 的 caption 文案换成：

> 下方 showcase 是这一案例的前台 UX 证据。它在 mode-02 · Agent Aha Mode 下展开七种介入姿态，每种用一个 storyboard 把场景从捕捉到写回演完。Phone 帧严格按真 iPhone chrome 绘制。

## Showcase HTML 改动清单

文件：`public/language-diary-ux-showcase/index.html`

### 删除

- `section#case-evidence`（03 · 场景佐证）整段
- `section-pill` 导航栏中的 `03 · 场景佐证` 链接

### 改写

- `section#s00` 的 "六种 AGENT 前台形态" 子面板（替换为 7 卡 + 标题改名 + 注脚 mode-02 适用）
- `section#mode-context` 整段（rail 标题、副标题、各 phone 区域全部重写为七姿态 storyboard）

### 新增 CSS 组件

详见上文「统一视觉语言」第 9 节「CSS 组件清单」。组件分四组：iPhone chrome / Aha 视觉语言 / 姿态特定载体 / storyboard 元数据。共 ~22 个新类，全部追加到现有 `<style>` 块尾部。

### 现有组件复用

`.phone`、`.phone-screen`、`.feed-card`、`.bubble`、`.tag-row`、`.peek-card`、`.scenario-rail`、`.scenario-title`、`.next-step-band`、`.sediment-chip-row`、`.vote-note` 全部保留，文案与构图按七姿态调整。

`.phone-statusbar` 内部结构升级：原先 `<span>9:41</span><span>●●●</span>` 改为：

```html
<div class="phone-statusbar">
  <span class="status-time">9:41</span>
  <div class="dynamic-island ..."></div>
  <span class="status-icons">
    <svg>signal</svg> <svg>wifi</svg> <svg>battery</svg>
  </span>
</div>
```

`.phone-home` 保留作为 home indicator。

## 帧数与 phone 总数预算

| 姿态 | 帧 |
|---|---|
| Trace | 3 |
| Ambient | 3 |
| Inline | 3 |
| Morphing | 3 |
| Echo ★ | 5 |
| Co-creation | 3 |
| Agentic Action | 3 |
| **合计** | **23 帧 phone** |

每帧画面密度低于现有 mode-01 单帧（因为重点是状态变化，不是堆控件），整 02 节实际视觉负担与现版相当。

## 验收标准

**iPhone chrome**：
- 节内 23 个 phone 帧的状态栏全部含真灵动岛（idle / compact / expanded 至少出现两态）。
- 灵动岛尺寸符合规范：idle `116×28` / compact `~190×28` / expanded `~330×84`。
- Trace、Ambient、Echo 至少有一帧用 compact 或 expanded 灵动岛传达状态（不是用 banner 替代）。
- Inline 帧的 suggestion bar **挂键盘或挂输入气泡下方**，不是飘在 feed 中间。
- Echo 的 return card 是真 sheet（带 grabber、从底滑入），不是普通 banner。
- Agentic Action 的 micro-session 是全屏 frame（带步骤 indicator），不是卡片。

**统一视觉语言**：
- `--aha-amber` / `--aha-amber-soft` 两个 token 在 7 姿态都实际出现（至少一处）。
- 每个 Aha 卡都遵循三层结构（header / body / footer），header 都是 `AHA · <posture>` 签名格式。
- 每个末帧都有 footer chip 行：G0–G1 至少 2 chip / G4–G5 完整 4–5 chip 反驳行；**没有只能 accept 不能反驳的末帧**。
- 通用 marker 三件套（`.aha-marker-dot` / `.aha-island-dot` / `.aha-hint-glow`）至少各出现一次。
- 宿主 app（小红书 / Slack / iMessage / portfolio）原生视觉无侵入，Aha 只在状态栏 / 浮层 / marker 三处出现（micro-session 全屏帧除外）。
- agent 文案符合语音规则：小写句首、不命令式、永远给可拒绝出口。

**结构**：
- 03 · 场景佐证 已完全移除（HTML 与 nav 都不留链接）。
- legend 七卡的姿态名、G 层、触发条件、用户控制四要素齐全。
- React page-2 的 contentBlocks 中 6 卡形态已替换为 7 卡姿态。

**构建**：
- `npm run build` 通过；showcase HTML 在 iframe 内可滚动、灵动岛 / sheet / inline 在 360px 内显示完整。

## 实施切分（建议给 writing-plans 的输入）

这是一份偏前端 UX 的重构，主要切片建议：

1. **CSS 组件层**：先在 showcase HTML `<style>` 块里建出 11 个新 CSS 组件（灵动岛三态、贴顶 banner、inline suggestion、return sheet、micro-session、rebuttal pill、storyboard 容器与箭头）。可独立验证视觉。
2. **status bar 升级**：把所有现存 `.phone-statusbar` 替换成新结构（含真灵动岛）。批量改动 mode-01 + 旧场景区域的状态栏（不动其他 UI），保持 mode-01 视觉一致。
3. **Legend 改造**：替换 s00 的"六种"卡组为"七种"卡组，rebuilt 成新的卡片样式。
4. **02 节 storyboard 重写**：分七个姿态各一个 commit / 子任务，每姿态画 storyboard、写回说明、rebuttal 行。
5. **删除 03**：移除 `#case-evidence` section 与 nav 链接。
6. **React page-2 文案**：改 mainCopy + comparisonCards（6→7）+ 前台原则段（→ 姿态选择原则）。
7. **page-3 caption 微调**。
8. **构建验证**：`npm run build` + 视觉自查 23 帧。

## 风险与缓解

- **风险 1：iPhone 灵动岛在 360px 宽 phone-screen 里看起来太大** → 等比缩放为 `90×24` idle / `~150×24` compact / `~280×64` expanded，并保证圆角 `999px` 视觉连续。
- **风险 2：sheet 与 micro-session 在 iframe 内被截断** → 帧本身高度足够，sheet 不做实际滚动，全部用静态展示态绘制；不做交互真实性，只画"姿态截图"。
- **风险 3：23 帧让 02 节太长** → 每姿态横向 phone 排列（不是纵向堆），加 `mode-stage` 内部水平滚动作为兜底。
- **风险 4：mode-01 的状态栏改造产生回归** → mode-01 不动文字内容，只把 statusbar 容器换成新版本，目视检查现有 mode-01 phone 排列没破。

## 一句话范式（贴在 02 节末尾）

> Agent Aha Mode 不是让 agent 更频繁地提醒用户，而是让 agent 在合适的关系席位上，把现实片段捕捉、连接、生成、回访，并转化为用户可控制的表达或行动。
