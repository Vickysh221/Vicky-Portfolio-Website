# Language Diary：Agent-native UX 重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**目标：** 将 `/agentic-design-development/language-diary` 重构为一个面向专业评审者的 agent-native UX 作品集案例，同时保留现有开场、Mira 用户旅程与 ritual 结构。

**实现思路：** 继续把第 1-2 页放在 `manualIntroSlides.tsx` 中作为人工编写的主叙事层，并原地改写其文案结构。将当前第 3-5 页从 generated-doc 驱动的技术阅读层，改为 `languageDiarySlideFactory.tsx` 中人工编写的正文页；原始生成数据只作为可选参考，不再直接决定主叙事结构。同步更新 route metadata，使首页摘要与子页描述与新版 framing 一致。

**技术栈：** React、TypeScript、Vite、现有 H5 section factory 模式、现有 h5 样式工具

---

## 文件地图

- 修改：`src/pages/languageDiary/manualIntroSlides.tsx`
  - 重写第 1 页与第 2 页文案，使其符合面向评审的作品集语言。
  - 保留 Mira 现有图片、视频与 ritual 顺序。
- 修改：`src/pages/languageDiary/languageDiarySlideFactory.tsx`
  - 用人工编写的 agent-native UX 页面替换第 3-5 页当前的 generated-doc 主叙事。
  - 保持现有 `SectionData` 输出结构与 slide switch 机制。
- 修改：`src/constants/routeDepth.ts`
  - 更新 `/agentic-design-development/language-diary` 的 route 描述。
- 可选检查：`src/home/chapterSummaries.ts`
  - 检查单句摘要是否仍与新版 framing 对齐，仅在明显失配时修改。
- 验证：`npm run build`

### 任务 1：重写第 1-2 页主叙事语言

**文件：**
- 修改：`src/pages/languageDiary/manualIntroSlides.tsx`
- 测试：`npm run build`

- [ ] **步骤 1：将第 1 页改写为面向评审的项目 framing**

修改 `renderMotivationSlide()` 中的开场 block，让第一页读起来像案例开场，而不是个人随笔。保留 lived experience 的温度，但组织方式要围绕项目 framing、问题定义与设计角色。

文案方向应接近：

```tsx
<div key="motivation-intro">
  <div style={kickerStyle(accentColor)}>项目定位</div>
  <h2 style={subtitleStyle(accentColor)}>A Ritual of Expression</h2>
  <p style={paragraphStyle()}>
    大多数语言学习产品仍以词汇、练习、复习与纠错构成主要体验链路。AI 往往提升了这条链路的流畅度，但设计对象并没有根本变化。
  </p>
  <p style={paragraphStyle()}>
    Language Diary 从另一条路径切入。它将语言学习理解为由表达、记忆、情绪与日常片段共同构成的关系系统，并让 agent 以有限行动权的方式参与其中。
  </p>
</div>
```

同时，把后面的“我为什么想做这个项目 / AI Shift”段落重写为作品集语言，覆盖以下内容：

- 为什么这个问题在 agent 时代重要
- 从 task system 到 relationship system 的转向
- 你的设计角色：ritual structure、semantic mediation、memory legitimacy、intervention boundaries

- [ ] **步骤 2：运行构建，先验证 JSX 与文案改动无语法问题**

运行：`npm run build`

预期：构建成功；若失败，只应暴露本次引入的语法或类型问题。

- [ ] **步骤 3：重写第 2 页，使 Mira 旅程同时呈现前台体验与后台行为**

修改 `renderJourneyPlaceholderSlide()`，保留现有媒体素材和 stage 顺序，但重新组织叙事结构：

- 先用一段总述把 ritual 定义为关系结构
- 再用专业作品集语言分别说明 morning / daytime / night
- 更明确地区分：
  - Mira 的经历、表达与感受
  - 系统识别、存储、延后、未来回带的内容

文案方向应接近：

```tsx
<p style={paragraphStyle()}>
  Mira 的一天展示了产品如何在不同时间状态下运作。Morning、daytime 与 night 分别对应不同的关系状态，也对应不同的系统可见性、记忆活动与介入阈值。
</p>
```

每个阶段保留原有资产，但段落重点要改为：

- morning：温和进入与记忆唤醒
- daytime：陪伴、表达承接、低负担的语义识别
- night：整理、语言资产形成、带有反思性的回带

- [ ] **步骤 4：再次运行构建，确认第 2 页改写通过**

运行：`npm run build`

预期：构建通过。

- [ ] **步骤 5：提交**

```bash
git add src/pages/languageDiary/manualIntroSlides.tsx
git commit -m "feat: rewrite language diary opening narrative"
```

### 任务 2：将第 3-5 页替换为人工编写的 Agent-native UX 主叙事

**文件：**
- 修改：`src/pages/languageDiary/languageDiarySlideFactory.tsx`
- 测试：`npm run build`

- [ ] **步骤 1：为第 3-5 页新增人工编写的 section builder**

在 `languageDiarySlideFactory.tsx` 中新增专门的 render helper，用它们替代第 3-5 页当前通过 `renderGenericSection()` 输出的 generated technical cards。

可新增类似 helper：

```tsx
function renderAgentNativeUxSlide(accentColor: string): ReactNode[] {
  return [
    <div key="intro">
      <div style={kickerStyle(accentColor)}>设计立场</div>
      <p style={paragraphStyle()}>
        在 agent-rich 的环境里，UX 的核心问题落在关系边界、注意力控制、记忆合法性与介入时机。
      </p>
    </div>,
  ];
}

function renderSemanticMiddleLayerSlide(accentColor: string): ReactNode[] {
  return [
    <div key="semantic-layer">
      <div style={kickerStyle(accentColor)}>语义中间层</div>
      <p style={paragraphStyle()}>
        semantic layer 为系统提供了一套稳定的设计语言，用来判断何时回应、保留什么，以及哪些时刻值得未来再次回到前台。
      </p>
    </div>,
  ];
}

function renderGovernanceSlide(accentColor: string): ReactNode[] {
  return [
    <div key="governance">
      <div style={kickerStyle(accentColor)}>治理逻辑</div>
      <p style={paragraphStyle()}>
        distributed agency 在这里首先是一套治理结构：陪伴、表达升级、知识蒸馏、记忆形成与编排分别承担不同责任。
      </p>
    </div>,
  ];
}
```

这些 helper 必须继续使用现有 h5 style 工具，并输出人工编写的正文 block，而不是同步文档卡片。

- [ ] **步骤 2：把 slide numeral 03 / 04 / 05 映射到新的人工 renderers**

修改 `getSlideBlocks()`，让 language-diary 的第 3-5 页走新的 authored renderer：

```tsx
function getSlideBlocks(accentColor: string, slide: SyncedSlideData): ReactNode[] {
  switch (slide.numeral) {
    case '01':
      return renderSlide01(accentColor, slide);
    case '02':
      return renderSlide02(accentColor, slide);
    case '03':
      return renderAgentNativeUxSlide(accentColor);
    case '04':
      return renderSemanticMiddleLayerSlide(accentColor);
    case '05':
      return renderGovernanceSlide(accentColor);
    default:
      return renderSlide02(accentColor, slide);
  }
}
```

除非人工正文明确需要覆盖，否则继续使用 `slide.title` 作为 section title。

- [ ] **步骤 3：补齐第 3 页人工正文**

在 `renderAgentNativeUxSlide()` 中加入：

- 一段 framing paragraph
- 一组 4 项 judgment list：
  - agency boundary
  - attention arbitration
  - memory legitimacy
  - intervention timing
- 一段收束段，说明这项工作对应的是怎样的交互设计立场

代码结构可参考：

```tsx
<ul style={gridListStyle(8)}>
  <ListItem accent={accentColor}>Agency boundary defines how far the system can infer, suggest, and act.</ListItem>
  <ListItem accent={accentColor}>Attention arbitration determines what belongs in the foreground and what should remain backstage.</ListItem>
  <ListItem accent={accentColor}>Memory legitimacy governs what deserves retention and future return.</ListItem>
  <ListItem accent={accentColor}>Intervention timing shapes when support should appear and when restraint carries more value.</ListItem>
</ul>
```

- [ ] **步骤 4：补齐第 4 页人工正文**

在 `renderSemanticMiddleLayerSlide()` 中加入：

- 一段关于 lived moments 与 raw messages 的说明
- 一组 semantic object grid，至少包括：
  - `EventAnchor`
  - `ExpressionAttempt`
  - `MeaningGap`
  - `AffectiveTone`
  - `MemoryCandidate`
  - `InterventionOpportunity`
- 一段收束段，强调 action judgment、timing 与 restraint

代码结构可参考：

```tsx
<ul style={gridListStyle(8)}>
  <ListItem accent={accentColor}><strong>EventAnchor</strong>: a concrete lived moment that can organize later recall.</ListItem>
  <ListItem accent={accentColor}><strong>ExpressionAttempt</strong>: the user’s intended meaning in its unfinished form.</ListItem>
  <ListItem accent={accentColor}><strong>MeaningGap</strong>: the distance between intention and current language ability.</ListItem>
</ul>
```

- [ ] **步骤 5：补齐第 5 页人工正文**

在 `renderGovernanceSlide()` 中加入：

- 一段关于 distributed responsibility 的段落
- 一组治理问题列表，至少覆盖：
  - 什么应进入记忆
  - 什么只应短时保留
  - 什么值得介入
  - 什么应保持沉默
- 一段收束段，将系统再次定义为 relationship infrastructure

代码结构可参考：

```tsx
<ul style={gridListStyle(8)}>
  <ListItem accent={accentColor}>Companionship maintains conversational continuity without seizing interpretive control.</ListItem>
  <ListItem accent={accentColor}>Expression upgrade turns fragile phrasing into reusable language assets.</ListItem>
  <ListItem accent={accentColor}>Knowledge distillation extracts reusable insight only when the user’s context can support it.</ListItem>
  <ListItem accent={accentColor}>Orchestration manages visibility, timing, and restraint across the system.</ListItem>
</ul>
```

- [ ] **步骤 6：运行构建，验证新的 slide renderers**

运行：`npm run build`

预期：构建通过，`language-diary` 仍是 5 页结构。

- [ ] **步骤 7：提交**

```bash
git add src/pages/languageDiary/languageDiarySlideFactory.tsx
git commit -m "feat: reframe language diary as agent-native ux case study"
```

### 任务 3：同步 route metadata 并完成最终对齐

**文件：**
- 修改：`src/constants/routeDepth.ts`
- 可选修改：`src/home/chapterSummaries.ts`
- 测试：`npm run build`

- [ ] **步骤 1：更新 route description**

把 `/agentic-design-development/language-diary` 当前的 `desc` 改成符合新版 framing 的描述。

文案方向：

```ts
desc: "一个围绕表达、记忆与日常 ritual 组织的语言陪伴系统，用 agent-native UX 方式重新定义语言学习中的关系、介入与记忆边界。",
```

- [ ] **步骤 2：检查首页 chapter summary，只在必要时修改**

查看 `src/home/chapterSummaries.ts`。如果现有单句摘要仍成立，则不改；如果显得过于轻或偏比喻，可替换为：

```ts
'/agentic-design-development/language-diary':
  '把语言学习放回日常表达、记忆与关系之中，借由多智能体的分工与边界设计，建立一套更接近 agent-native UX 的语言陪伴系统。',
```

- [ ] **步骤 3：运行最终验证构建**

运行：`npm run build`

预期：

- `sync:language-diary` 可能提示 source docs 缺失，但会保留现有 generated file
- TypeScript 构建通过
- Vite 构建通过

- [ ] **步骤 4：提交**

```bash
git add src/constants/routeDepth.ts src/home/chapterSummaries.ts
git commit -m "chore: align language diary metadata with new case study framing"
```

## 自检

Spec 覆盖检查：

- 保留并重写第 1-2 页：任务 1
- 用 agent-native UX 重写第 3-5 页：任务 2
- 将技术 inventory 从主叙事中降级：任务 2
- route 级 framing 对齐：任务 3

占位检查：

- 本计划中无 `TODO`、`TBD` 或“类似上文”类占位。

类型一致性：

- 计划保持现有 `SectionData` 输出约定与 route/slide 接线方式不变。
