# Shared-Memory Aha Moment · Agent-Native UX Paradigm Spec

日期：2026-05-02
项目：`/agentic-design-development/aha-moment` × `/agentic-design-development/language-diary` × `Personal OS` 切片
状态：待评审

## 关联文档

- `docs/aha-moment-agent-aha-mode-design-paradigm.md` — 原范式文档；本 spec 在其上扩展并修订（差异见 Appendix D）。
- `docs/superpowers/specs/2026-04-20-language-diary-agent-native-ux-design.md` — 同项目叙事重组 spec。
- `public/language-diary-ux-showcase/agentic-canvas-v1.html` — 现有 UX showcase 8 spread 画布；本 spec 不再以其为正面参照，而是把它拆解还原为新范式材料（见 Appendix A）。
- `src/pages/SharedMemoryAhaCaseStudy.tsx` — 当前作品集页正文；其论点（"共享记忆驱动的 Aha"、"Personal OS 是选择机制"）作为本 spec 的论域底座。

## 文档目的

这份 spec **不是产品功能 spec，也不是 OS 通道集成手册**。它的对象是一个判断：

> 当 agent 在一个授权上下文中识别到一个 Aha 候选成立后，在前台**以何种姿态、通过什么 capability slot、在 Aha 生命周期的哪个阶段、由哪个内部席位主导出现**。

它为正在演进中的 agent native OS 能力（Apple Intelligence / Android Gemini Extensions / HarmonyOS Intents）定义一套**先于通道而存在**的 UX 设计范式。当前 OS 厂商提供的 surface 是这个范式可以参考和部分实现的 reference points，不是设计的目标。

## 范式骨架（一句话）

```
L1 七种姿态字典
    × L2 六个 capability slot（+ 两个 cross-cutting 能力）
    × L3 七阶段 Aha 生命周期
    × L4 二十五个 pattern primitives（行为契约层，不下沉到 UI）
    × Ritual Z 轴（morning / evening / night / next morning，仅调制 Co-creation / Agentic Action 的主动邀请窗口）
    = Agent-Native Aha Moment 前台化范式
```

---

# Section 1 / 设计立场与范围

## 1.1 设计立场

> **范式先于通道**：我们不是为现有 OS 通道找 agent 的合适位置，而是为正在演进中的 agent native 能力定义新的 UX 设计范式。Apple Intelligence / Gemini Extensions / Harmony Intents 提供的 surface 是这个范式可以参考和部分实现的 reference points，不是设计的目标。

四条具体含义：

1. **命名层**：L1 姿态、L2 capability slot 都使用范式级、未来导向的命名；不让 "Live Activity" 这种平台原语进入顶层组件名。
2. **抽象层级**：L1 / L2 / L3 全部 OS-agnostic；具体 OS 实例化只作为 reference table 附在每个 primitive 末尾。
3. **行为契约**：每个 L4 primitive 先定义"agent OS 应当如何（prescriptive）"，再补充"当前三大 OS 上如何接近这个契约（descriptive）"。
4. **接受 gap**：当某个契约在所有现存 OS 都无法完整落地时，依然写出来——作为对厂商能力演进的设计要求，而不是从范式里删除它。

## 1.2 设计对象

本 spec 的设计对象是一个判断：

> 当 agent 在一个授权上下文中识别到一个 Aha 候选成立后，在前台以何种姿态、通过什么 capability slot、在 Aha 生命周期的哪个阶段、由哪个内部席位主导出现。

## 1.3 范围

**主体**：Language Diary 是这套范式的实施 anchor（agent 的 "home"）。
**触手**：通过 OS 级 capability slot 延伸到任意第三方 App 上下文。

```
agent 默认场景假设：
  agent 出现在第三方 App 的上下文里（Safari 阅读 / Slack 写作 / 邮件回复 / 小红书浏览）

LD 内部场景作为差异说明：
  当 agent 回到 LD 自己的工作区，约束条件放松（共同注意力已建立）
```

## 1.4 不做什么

| 不做 | 原因 |
|---|---|
| UI 像素层（颜色 / 字号 / 动画曲线 / 布局） | 本 spec 明确不下沉到 UI |
| LD 产品功能 spec（diary 数据结构 / 订阅 / 设置） | 范围之外，本 spec 是范式 |
| 顶层组件直接绑定单一 OS 通道命名 | 与"范式先于通道"立场冲突 |
| agent 多席位内部协作架构 | 范式文档已有，且属于另一个 spec |
| 用户递交型参与场景的姿态选择 | 用户已显式递交，agent 接住即可，不需要选姿态 |
| 七种姿态之外的关系姿态前台化 | 夜间 / 清晨消费用七种姿态的高密度组合表达，无需新姿态 |

## 1.5 一句话定位

> 这是一份关于 agent 在用户没有显式召唤的情况下、何时出现、以什么身份出现、用什么通道出现、留下什么、改写什么、回带什么的 **agent native UX 范式 spec**。它不是产品 spec，也不是 OS 通道集成手册。

---

# Section 2 / L1 姿态字典（7 种 active postures）

每种姿态用同一份骨架描述，方便后续矩阵和 capability slot 引用。

| 字段 | 含义 |
|---|---|
| **介入材料** | agent 此姿态动用的对象：环境场 / 当前内容 / 长期记忆 / 任务结构 |
| **触发信号** | 什么现实信号让这个姿态成立（详细分类在 Section 7） |
| **Presence** | 用户感知的关系：Tool / Companion / Seat |
| **生成信息层** | G0–G5（来自原范式文档：G0 Silent Memory, G1 State Signal, G2 Reason Signal, G3 Generated Micro-Asset, G4 Generated Path, G5 Generated Session） |
| **行为契约** | 这一姿态的标志性外显动作 |
| **退出条件** | 什么时候这一姿态必须收回 |
| **写回策略** | 用户行为如何回写长期策略 |

## 环境组（不动内容）

### 01 · Trace 留痕

| | |
|---|---|
| 介入材料 | 当前内容（仅视觉标识层，不动语义） |
| 触发信号 | 上下文 × 共享记忆匹配，但 generative potential 偏弱 / 时机不适合展开 |
| Presence | Companion |
| 生成信息层 | G0 – G1 |
| 行为契约 | 在内容上做 minimal marker（轻量 highlight / underline / pin），声明"我看见了"。**不展开任何解释、不打断阅读流。** |
| 退出条件 | 用户离开 surface / 同一 trace 被升级到 Echo / 用户主动清扫 |
| 写回策略 | 保留 → trace 升权；清扫 → 同源 trace 降权；忽略 → 不写回长期记忆 |

### 02 · Ambient 呼吸

| | |
|---|---|
| 介入材料 | 系统场（不附着任何具体内容） |
| 触发信号 | 长时间未介入但持续话题匹配 / 用户连续阅读流且话题与长期目标对齐 |
| Presence | Companion |
| 生成信息层 | G1 |
| 行为契约 | 环境层微动（avatar 心跳、边缘色温、状态条呼吸），让 agent 被感知为"在场的系统场"，**但不指向任何具体内容**。 |
| 退出条件 | 用户主动 dismiss 系统场提示 / 进入更高强度姿态 / 上下文切换 |
| 写回策略 | 用户展开 → 该话题域 ambient 升权；连续忽略 → 全局 ambient 强度降级 |

## 当下组（动当前任务）

### 03 · Inline 镶嵌

| | |
|---|---|
| 介入材料 | 当前正文语义（动语义不动结构） |
| 触发信号 | 用户正在写 / 编辑 / 读，存在明确的"嵌入位"（段落空隙、句末停顿、引用块） |
| Presence | Seat — Expression Reviewer |
| 生成信息层 | G2 – G3 |
| 行为契约 | 在内容流中插入 agent 生成的语义片段（注释、补充、改写候选）。**当前任务流不被打断**——它就发生在内容里。 |
| 退出条件 | 用户接受 / 拒绝 / 内容焦点离开 |
| 写回策略 | 采用或改写 → 学习用户语气偏好；拒绝 → 同模式 inline 降权；强制隐藏 → 整类 inline 在该 surface 关闭 |

### 04 · Suggest 建议

| | |
|---|---|
| 介入材料 | 当前任务的可替代版本（动当前内容的形态） |
| 触发信号 | 用户卡顿信号——光标停留超阈值、删改反复、焦点游离、显式 "?" 符号 |
| Presence | Seat — Reviewer / Co-creator |
| 生成信息层 | G2 – G4 |
| 行为契约 | 基于卡点生成**分级建议**：一句替代 / 三个版本 / 完整段落。用户可在 lens 维度切换（更直接 / 更柔和 / 更简短）。**Morphing 作为此处的生成模式属性。** |
| 退出条件 | 用户选定一个版本 / dismiss / 卡顿信号消失 |
| 写回策略 | 选中粒度（一句 vs 三版 vs 段落）写入"卡点偏好"，未来类似卡点优先该粒度；选中 lens → lens 偏好累加 |

## 记忆组（动长期资产）

### 05 · Co-creation 共创

| | |
|---|---|
| 介入材料 | 用户长期沉淀的**个人专题**（作品集、面试、表达风格、研究主题） |
| 触发信号 | 当前片段与既有专题强对齐 + 该专题处于 active 写作窗口 / 用户在专题工作区内 |
| Presence | Seat — Co-creator + Authorship 监护 |
| 生成信息层 | G3 – G4 |
| 行为契约 | 以**邀请**姿态出现，**不直接给最终版本**。先提供 lens 选项（更产品化 / 更面试化 / 更诗性），再在选定 lens 下生成 2–3 个候选。最终观点必须由用户确认。**Morphing 在此处表现为 lens 切换。** |
| 退出条件 | 用户选 lens 并采纳 / "not my point" / dismiss |
| 写回策略 | lens 偏好长期累计；"not my point" → 专题边界更新；采纳 → 进入专题资产，但用户拥有最终署名 |

### 06 · Echo 回声

| | |
|---|---|
| 介入材料 | 过去的 trace 资产（动跨时间记忆） |
| 触发信号 | 当前任务与过去 trace 的语义 / 目标匹配 + 当前是 trace 的"回访窗口"（夜间复盘、清晨开机、面试前夜、deadline 临近） |
| Presence | Companion + Seat — Goal Alignment |
| 生成信息层 | G2 – G4 |
| 行为契约 | 把过去内容显式带回，**并声明"为什么现在带回它"**——只显示历史而不解释为什么相关，会被降级为 Trace。Echo 的标志是带原因的回访。 |
| 退出条件 | 用户 bring it in / not now / 强制断开此跨时间连接 |
| 写回策略 | bring in → 该跨时间桥接升权；not now → 推迟；强制断开 → 该 trace 不再被这条目标 Echo |

## 行动组（动任务结构）

### 07 · Agentic Action 代理行动

| | |
|---|---|
| 介入材料 | 任务结构本身（动任务图） |
| 触发信号 | 高置信 + 高相关 + 高时效 **同时成立** + 用户处于"主动准备状态"（面试前、作品集 session、deadline 临近） |
| Presence | Seat — Transformation + Goal Alignment + Reviewer |
| 生成信息层 | G4 – G5 |
| 行为契约 | 把 Aha 转成**可执行任务分叉口**：多个行动路径菜单（expression card / portfolio bullet / mock interview answer / diary reflection）。用户选定后启动 **micro-session**——3–5 分钟，结构化开始与结构化结束。 |
| 退出条件 | 用户选路径 / dismiss / session 完成 / 用户主动中断 session |
| 写回策略 | 被选路径升权；session 产物进入对应工作区；被拒路径降权；session 中断不计入负面信号（保护用户中断权） |

## 字典层的两个范式约束

横跨所有 7 种姿态的两条硬约束：

1. **Refutability axiom 可反驳公理**：每种姿态的 surface 都必须提供至少 4 种用户响应：accept / reject / change criteria / "not in this lens"。Accept-only 的 UX 不属于 agent native 范式。
2. **Writeback symmetry 写回对称性**：接受、拒绝、忽略**三种行为都必须写回长期策略**，且权重对称（拒绝不被静默吞掉，忽略不被默认当成接受）。这是 agent OS 与推荐系统的范式分界。

---

# Section 3 / L2 Capability Slot 抽象层

## 3.1 命名原则

L2 描述 **agent 在前台出现时占据的 surface 槽位类型**，不绑定任何 OS 平台原语。每个 slot 用 OS-agnostic 命名，并附三 OS reference 作为"当前能近似到什么程度"的参照。

每个 slot 字段：

| 字段 | 含义 |
|---|---|
| **主导姿态** | 哪些 L1 姿态默认占用这个 slot |
| **介入材料** | 此 slot 容纳的 agent 介入对象（与 L1 对齐） |
| **Prescriptive Contract** | agent OS 应当为这个 slot 提供什么能力（范式要求） |
| **OS Reference** | iOS / Android / HarmonyOS 当前最接近的实现 |
| **Current Gap** | 现有 OS 与 prescriptive contract 的差距 |

## 3.2 六个主 Capability Slot

### Slot 1 · **In-Content Marker**（内容标识槽）

| | |
|---|---|
| 主导姿态 | Trace |
| 介入材料 | 第三方 App 内任意 text / image / link 的视觉表层（不动语义） |
| Prescriptive | agent 应能在任意 App 内容上 overlay 一个**轻量、可消除、不阻挡选中**的 marker。Marker 必须是 typed（带语义类型，例如 "related to your portfolio" / "saved for tonight"），且 user-tap 可放大原因但不强制展开。 |
| iOS Ref | Apple Intelligence 暂无原生第三方 App overlay；最近替代是 Live Text 高亮 / Selection menu 注解。 |
| Android Ref | TextClassifier / Smart Selection / Magnifier overlay；Pixel Recall 在系统层有相邻能力。 |
| HarmonyOS Ref | 全场景文字识别 + Celia 语义注解；万能卡片可被 docked，但跨 App overlay 仍受限。 |
| Gap | 三大 OS 都缺少"agent 持有的、跨 App、可叠加在第三方内容上的 typed marker layer"——这是范式要求 OS 厂商应当开放的能力。 |

### Slot 2 · **Ambient System Field**（环境系统场槽）

| | |
|---|---|
| 主导姿态 | Ambient |
| 介入材料 | 跨 App 系统场的视觉/感觉层（不附着具体内容） |
| Prescriptive | agent 应能持有一个**跨 App 持续在场的 ambient token**，用最低视觉重量表达"我在"——可以是状态颜色、avatar 心跳、StatusBar 一格、Lock Screen 余光。**默认不打断、不可点击优先、用户随时可静默**。 |
| iOS Ref | Dynamic Island idle 态 / Live Activity compact / Focus filter 状态。 |
| Android Ref | Now Bar / At a Glance / Pixel Always-on display agent area。 |
| HarmonyOS Ref | 实况窗（Live Window）/ Celia 状态环。 |
| Gap | 现有 ambient surface 都需要"具体事件"才能驻留（计时器、运动状态、通知）；范式要求 agent 应能仅以"在场"为理由持有 ambient token。 |

### Slot 3 · **In-Flow Insertion**（流内插入槽）

| | |
|---|---|
| 主导姿态 | Inline + Suggest |
| 介入材料 | 用户当前任务的内容流（输入框、文档段落、阅读流） |
| Prescriptive | agent 应能在第三方 App 的内容流中**就地插入**一段 typed 语义片段（注释 / 改写候选 / 分级建议），保持 task focus 不被打断。插入物必须暴露**形态切换** lens（Morphing 在此体现）和**粒度切换**（一句 / 段 / 完整）。 |
| iOS Ref | Writing Tools / Smart Reply / 系统键盘候选条。 |
| Android Ref | Magic Compose / Gboard Smart Compose / Circle to Search inline result。 |
| HarmonyOS Ref | 智慧建议 / 输入法 AI 写作 / 万能键盘。 |
| Gap | 现有 in-flow 多为"一次性建议"；范式要求 insertion 必须有 lens 切换 + 拒绝写回 + 用户偏好长期累计。Apple Writing Tools 距离最近但 lens 切换有限且不写回长期记忆。 |

### Slot 4 · **Companion Invitation**（共伴邀请槽）

| | |
|---|---|
| 主导姿态 | Co-creation |
| 介入材料 | 用户长期沉淀的"个人专题"（作品集、面试、表达风格） |
| Prescriptive | agent 应能调出一个**专题工作面**（不是 modal、不是 chat），呈现：(1) 当前片段与哪些专题对齐 / (2) 可选 lens / (3) 选定 lens 下的 2–3 个候选 / (4) 用户的 authorship 边界声明。**最终观点必须由用户敲定**。 |
| iOS Ref | Image Playground 的 style lens / Genmoji 候选 picker / Notes 智能整理。 |
| Android Ref | Gemini Deep Research / Magic Editor 的多版本生成。 |
| HarmonyOS Ref | Celia 创作工作台（演进中）。 |
| Gap | 现有 companion surface 都缺少"专题（user theme）作为 first-class 概念"——范式要求 agent OS 提供 user theme 注册表，让 agent 能在"我帮你 vs 我替你想"之间显式仲裁。 |

### Slot 5 · **Temporal Bridge**（时间桥接槽）

| | |
|---|---|
| 主导姿态 | Echo |
| 介入材料 | 过去 trace 资产 × 当前任务的语义/目标对齐 |
| Prescriptive | agent 应能在当前任务上覆盖一张**"过去回来"surface**，必须同时携带：(1) 过去内容的原 context 缩影 / (2) 显式说明"为什么现在带回它"的理由（不只是"看过的"）/ (3) bring-in / not-now / 强制断开此跨时间连接 三种响应。 |
| iOS Ref | Photos Memories / Spotlight 智能建议 / Reminders 上下文唤醒。 |
| Android Ref | Pixel Recall / Now Playing card 的"过去同曲"。 |
| HarmonyOS Ref | 时刻 / 服务卡片的智能复现。 |
| Gap | 现有 temporal surface 几乎都是"显示历史"，缺 reasoning trace——范式硬要求 Echo 必须 explain why now，且支持"don't connect these again"的语义级写回。 |

### Slot 6 · **Action Fork & Micro-Session**（行动分叉与微会话槽）

| | |
|---|---|
| 主导姿态 | Agentic Action |
| 介入材料 | 任务结构（一个语义片段的 N 个 typed action 路径） |
| Prescriptive | agent 应能从一个 Aha 片段生成**多个 typed action 菜单**（expression card / portfolio bullet / mock answer / diary reflection）。用户选定后启动 **ephemeral workspace**——3–5 分钟、屏蔽其他打断、结构化开始（recall context）→ 结构化结束（save & writeback）。**Session 中断不计入负面信号**。 |
| iOS Ref | Shortcuts Suggested Actions / App Intents donations / Action Button 长按菜单。 |
| Android Ref | App Actions / Quick Settings agent tile / Focus session。 |
| HarmonyOS Ref | 原子化服务卡片 / Focus 模式。 |
| Gap | 现有 fork surface 多是"打开某个 App"；范式要求 fork 是 typed transformation menu（每条目说明产物去向、所需时长、可中断点）；micro-session 作为系统级 ephemeral workspace 仍是空白。 |

## 3.3 两个横切能力（Cross-cutting Capabilities）

不是独立 slot，而是**任何 slot 都必须接入的系统服务**。这两个是 agent native OS 与传统 OS 的范式分界线。

### Cross-cutting A · **Asset Pin Lattice**（typed pin 网格）

| | |
|---|---|
| 服务对象 | 桥接 Trace（写入）↔ Echo（读出）的 typed 资产存储 |
| Prescriptive | OS 应提供一个**用户可见、可治理、typed 的资产网格**——不是普通收藏夹，而是带 (1) 来源 context / (2) agent 当时判断理由 / (3) 关联专题 / (4) 回访窗口建议 / (5) 用户的 authorship 标记。资产可以被任何 slot 写入、被任何 slot 读出。 |
| OS Reference | iOS Notes / Reminders + tags、Android Recall、Harmony 收藏；都缺 typed metadata 与 agent reasoning trace。 |
| Gap | 这是范式对 OS 厂商的**最强能力请求**：把"agent 思考过的东西"提升为系统级一等公民数据，而不是 App 私有数据。 |

### Cross-cutting B · **Refutation Channel**（反驳通道）

| | |
|---|---|
| 服务对象 | 横切所有 slot 的统一用户响应入口 |
| Prescriptive | 任何 slot 上的 agent 出现都必须暴露至少 4 种响应：**accept / reject / change criteria / "not in this lens"**。"change criteria" 与 "not in this lens" 是范式与推荐系统的关键差异——它们要求 agent 对外披露可调整的判断 lens 与 criteria。 |
| OS Reference | iOS notification 长按 / Android notification actions / 通用"举报"按钮——都只支持 accept/reject 二元，不支持 lens/criteria 调整。 |
| Gap | 这是范式对 agent OS 的**第二强能力请求**：让用户在系统层面持有"调整 agent 判断 lens"的入口，而不是把这能力锁在每个 App 里。 |

## 3.4 Slot × 姿态对照（quick map）

```
Slot 1 In-Content Marker         ← Trace
Slot 2 Ambient System Field      ← Ambient
Slot 3 In-Flow Insertion         ← Inline, Suggest
Slot 4 Companion Invitation      ← Co-creation
Slot 5 Temporal Bridge           ← Echo
Slot 6 Action Fork & Micro-Sess. ← Agentic Action

Cross-cutting:
  Asset Pin Lattice              ← 桥接 Trace ↔ Echo（写入读出）
  Refutation Channel             ← 横切全部 slot
```

## 3.5 范式立场重申

L2 不是"在现有 OS 上拼装方案"，而是声明**这 6+2 个 capability slot 应当成为下一代 agent OS 的 first-class concept**。当前三大 OS 都只在某些 slot 上做了部分实现：

- iOS Apple Intelligence 在 Slot 3 (In-Flow) 推进最远；
- Android Gemini 在 Slot 4 (Companion Invitation) 推进最远；
- HarmonyOS 在 Slot 2 (Ambient System Field) 的颗粒度最细；
- 没有任何 OS 在 Asset Pin Lattice 和 Refutation Channel 上有真正的 first-class 设计——这是范式要求填补的空白。

---

# Section 4 / L3 Aha 生命周期

## 4.1 七阶段定义

每个阶段是 agent OS 内部对一个 Aha 候选的处理工序。**阶段之间不是固定 pipeline**——存在三条主路径（4.2）。

每阶段字段：

| 字段 | 含义 |
|---|---|
| **意图** | 这个阶段在系统里做什么决定 |
| **输入** | 进入此阶段时携带的状态 |
| **判断** | 此阶段的核心判断（由哪些席位主导） |
| **输出** | 离开此阶段时携带什么状态 |
| **可见姿态** | 此阶段哪些 L1 姿态可能在前台出现 |

### Stage 1 · **Capture** 捕捉

| | |
|---|---|
| 意图 | 把现实信号识别为 Aha 候选（candidate），尚未承诺保存 |
| 输入 | 触发信号（详见 Section 7 trigger taxonomy）+ 当前授权上下文 |
| 判断 | Privacy Seat：信号来源是否在授权范围 / 是否允许进入 candidate 池 |
| 输出 | typed candidate object（含来源 context、原始片段、初判类型）**或** 直接 drop |
| 可见姿态 | 无前台姿态——Capture 是系统内部判断，对用户完全不可见 |

### Stage 2 · **Hold** 暂存

| | |
|---|---|
| 意图 | 决定是否把 candidate 写入 Asset Pin Lattice（Cross-cutting A）成为 typed pin |
| 输入 | candidate object |
| 判断 | Companion Seat：值得陪用户留住吗 / Timing Seat：现在适合让用户看见这次保存吗 |
| 输出 | (a) typed pin（写入 Asset Pin Lattice）+ 可选的 surface 通知 / (b) 静默 drop |
| 可见姿态 | **Trace** 可在此阶段轻量前台化（dotted underline / saved pill）；其它姿态不出场 |

### Stage 3 · **Connect** 连接

| | |
|---|---|
| 意图 | 把 candidate 或已 hold 的 pin 连接到长期记忆：目标、专题、关系网络、过去 trace |
| 输入 | candidate / pin + 长期记忆查询结果 |
| 判断 | Goal Alignment Seat：与近期目标对齐度 / Expression Reviewer Seat：表达资产化潜力 |
| 输出 | candidate 携带 connection graph（连到哪些目标 / 专题 / 过去 trace）+ generative potential 评分 |
| 可见姿态 | **Ambient** 在此阶段可点亮（系统场反映"我连上了某些事"，但不指向具体内容） |

### Stage 4 · **Generate** 生成

| | |
|---|---|
| 意图 | 围绕 candidate 生成可能的资产形态或行动路径（不一定前台化） |
| 输入 | connected candidate + 用户表达风格画像 |
| 判断 | Transformation Seat：可生成哪些资产类型 / 用户当前 ritual 阶段允许多大生成深度 |
| 输出 | typed candidates pool：{ inline 改写、suggest 候选、co-creation lens 选项、action fork 菜单、micro-session 蓝图 } |
| 可见姿态 | 无前台姿态——Generate 仍是内部工序；前台化在下一阶段决定。**例外**：Co-creation / Echo / Agentic Action 可在此阶段早期暴露中间产物征求方向 |

### Stage 5 · **Surface** 前台化

| | |
|---|---|
| 意图 | 选择用什么姿态、占用哪个 capability slot、以什么强度让 agent 进入前台 |
| 输入 | typed candidates pool + 当前打断成本 + 当前 capability slot 可用性 |
| 判断 | Timing Seat（核心）+ Privacy Seat（最终复核） |
| 输出 | 选定 (姿态 × slot)，把对应 primitive 推送到 surface |
| 可见姿态 | **Trace / Ambient / Inline / Suggest / Co-creation / Echo / Agentic Action**——七种姿态全部在此阶段被仲裁选择 |

### Stage 6 · **Transform** 转化

| | |
|---|---|
| 意图 | 在用户响应（accept / reject / change criteria / not-in-this-lens）后，把 candidate 实际转成资产或行动 |
| 输入 | 用户响应 + 选定的 surface primitive |
| 判断 | Authorship 监护：用户是否敲定了最终版本 / Reviewer：是否需要再生成一轮 |
| 输出 | 最终 asset 进入工作区 / 启动 micro-session / candidate 被丢弃 / candidate 回流到 Hold（推迟） |
| 可见姿态 | **Inline / Suggest / Co-creation / Agentic Action 在此延展**（如 micro-session 是 Agentic Action 在 Transform 阶段的展开） |

### Stage 7 · **Learn** 写回

| | |
|---|---|
| 意图 | 把这一次完整旅程的信号写回长期触发策略 |
| 输入 | 整条 candidate 旅程记录（哪些阶段经过、用户在哪些点的响应） |
| 判断 | 三类信号对称写回：accept / reject / ignore + 用户调整过的 lens / criteria |
| 输出 | 更新：trigger 权重、姿态偏好、slot 使用频率、专题边界、跨时间桥接置信度 |
| 可见姿态 | 无前台姿态——但 Trace 可以以"learn 完成"的方式留下一个极轻 marker（"我记住了这次的偏好"），可选 |

## 4.2 三条主路径

不是所有 candidate 都走完七阶段。spec 必须明示三条合法路径：

### Path A · **Forward**（一次性 Aha）

```
Capture → Hold → Connect → Generate → Surface → Transform → Learn
```

适用：当下高时效、用户在场、可立刻处理的 Aha。**Inline / Suggest / Agentic Action** 多走此路径。

### Path B · **Hold → Sleep → Echo**（跨时间 Aha）

```
Capture → Hold → [SLEEP 队列] → (时机到达) → Connect' → Generate' → Surface (Echo) → Transform → Learn
                                  ↑
                         触发条件：ritual 阶段切换 / 目标进入 active 窗口 / 跨时间桥接信号
```

适用：白天捕获但当时不该打断，晚间 / 清晨 / deadline 前重新激活。**Echo 姿态唯此路径**。这条路径的存在解释了画布 spread 6 / 7 / 8（夜间 ritual）为什么不需要新姿态——它们就是这条路径的**时间出口**。

### Path C · **Capture → Hold → Trace-only short-circuit**（轻量 Aha）

```
Capture → Hold → Surface(Trace) → Learn
                    ↑
            Connect / Generate 被 skip：
            generative potential 太弱、用户授权太薄、或时机完全不允许展开
```

适用：仅"我看见了"价值的 Aha。**Trace 是唯一在此路径登场的姿态**，且不必经过 Connect / Generate。这条路径让 Trace 在 spec 里有清晰的合法独立性，不被其它姿态吞并。

## 4.3 状态机示意

```
       ┌──────────┐
   ▶▶▶│ Capture  │ ── drop ────────────────────────────►  ✗
       └────┬─────┘
            ▼
       ┌──────────┐ ── short-circuit (Path C) ──► Surface(Trace) ─► Learn
   ▶▶▶│   Hold   │
       └────┬─────┘
            ▼
   ┌────────┴────────┐
   │ Sleep Queue?    │── yes ──► [SLEEP] ── 时机到 ──► Connect'
   └────────┬────────┘
            no
            ▼
       ┌──────────┐
       │ Connect  │
       └────┬─────┘
            ▼
       ┌──────────┐
       │ Generate │
       └────┬─────┘
            ▼
       ┌──────────┐
       │ Surface  │ ── Timing Seat 否决 ──► back to Hold (推迟)
       └────┬─────┘
            ▼ user response
       ┌──────────┐
       │Transform │ ── retry generate ──► Generate
       └────┬─────┘
            ▼
       ┌──────────┐
       │  Learn   │
       └──────────┘
```

## 4.4 哪个姿态在哪个阶段"可见"

| 姿态 | Capture | Hold | Connect | Generate | Surface | Transform | Learn |
|---|---|---|---|---|---|---|---|
| Trace | – | ● | – | – | ● | – | ●(可选) |
| Ambient | – | – | ● | – | ● | – | – |
| Inline | – | – | – | – | ● | ● | ● |
| Suggest | – | – | – | – | ● | ● | ● |
| Co-creation | – | – | – | ● | ● | ● | ● |
| Echo | – | (写入) | ● | ● | ● | ● | ● |
| Agentic Action | – | – | – | ● | ● | ● | ● |

## 4.5 三个范式硬约束（横切 L3）

1. **Stage 5 (Surface) 必须可被否决**：任何 candidate 走到 Surface，Timing Seat 都有最终否决权，候选回流到 Hold。**没有"必出"的姿态**。
2. **Stage 7 (Learn) 必须对称写回**：accept / reject / ignore 三类信号权重对称。
3. **Path B 的 SLEEP 队列必须可治理**：用户应能查看"被压在我身后的 Aha 候选"，并可批量清理或调整 sleep 触发条件。这是范式对 Asset Pin Lattice 的最硬要求。

---

# Section 5 / 中央矩阵（Hero Figure）

## 5.1 矩阵图

```
                 │ Capture │  Hold  │ Connect │ Generate│ Surface │Transform│  Learn  │
─────────────────┼─────────┼────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
Trace            │    ·    │  ◐ P1  │    ·    │    ·    │  ● P2   │    ·    │  ◐ P3   │
Ambient          │    ·    │    ·   │  ◐ P4   │    ·    │  ● P5   │    ·    │    ·    │
Inline           │    ·    │    ·   │    ·    │    ·    │  ● P6   │  ● P7   │  ◐ P8   │
Suggest          │    ·    │    ·   │    ·    │    ·    │  ● P9   │  ● P10  │  ◐ P11  │
Co-creation      │    ·    │    ·   │    ·    │  ◐ P12  │  ● P13  │  ● P14  │  ◐ P15  │
Echo             │    ·    │  ↓ P16 │  ● P17  │  ● P18  │  ● P19  │  ● P20  │  ◐ P21  │
Agentic Action   │    ·    │    ·   │    ·    │  ◐ P22  │  ● P23  │  ● P24  │  ◐ P25  │
```

**图例**：

| 符号 | 含义 |
|---|---|
| ● | primary primitive — 此姿态此阶段的主要前台化形态 |
| ◐ | secondary primitive — 辅助 / 低强度可见 / 部分场景可见 |
| ↓ | 写入而非可见（Echo P16：candidate 在 Hold 阶段被写入 Sleep Queue 等待回访） |
| · | empty — 此姿态此阶段无前台 primitive |

## 5.2 矩阵的四种读法

**读法 1 — 沿行读**：一种姿态在 Aha 系统中的完整生命流。
> 例：沿 Echo 行读——候选在 Hold 时被写入 Sleep Queue（P16），时机到达后从 Connect 阶段被显式 explain why now（P17），Generate 时合成回访材料（P18），Surface 时呈现 Return Card with Reasoning（P19），Transform 时让用户选 bring-in / not-now（P20），Learn 时更新跨时间桥接置信度（P21）。

**读法 2 — 沿列读**：一个生命周期阶段哪些姿态会在此前台化。
> 例：沿 Surface 列读——七姿态全部聚集于此，这是 Timing Seat 仲裁的核心阶段。沿 Generate 列读——只有 Co-creation / Echo / Agentic Action 三种"重生成"姿态会在此暴露中间产物。

**读法 3 — cell 读**：每个 ● / ◐ cell 对应一个 L4 pattern primitive（Section 6 完整契约）。

**读法 4 — Ritual z 轴叠加**：同一 cell 在不同 ritual 阶段强度不同。详见 Section 9。

## 5.3 矩阵的范式断言

矩阵图本身是一个范式断言：

1. **Capture 列必须全空**：任何 agent OS 都不能让用户感知 capture 这一步。Capture 一旦可见，用户会过载。
2. **Surface 列必须全亮**：七种姿态都汇聚到 Surface 仲裁——这是 agent OS 的"前台一致性"约束，没有姿态可以绕过 Surface 仲裁直接出现。
3. **Echo 是唯一在 Connect 列亮的姿态**：因为只有 Echo 必须 explain why now，它的"理由暴露"必须从 Connect 阶段就开始构造。
4. **Hold 列只有 Trace 和 Echo 写入**：Trace 是用户可见的轻量保存（P1），Echo 是不可见的 Sleep Queue 写入（P16）；这两个机制共同完成 Asset Pin Lattice 的"输入端"。
5. **Generate 列的三个 ◐**：Co-creation / Echo / Agentic Action 在 Generate 阶段就开始与用户交换方向（"想用哪个 lens？"、"先看这条还是那条？"），区别于 Inline / Suggest 的"系统自己生成完再展示"。

---

# Section 6 / L4 Pattern Primitives

每个 primitive 用紧凑契约描述。字段：

- **占用 slot**：来自 Section 3
- **input contract**：进入此 primitive 时需要的状态
- **output contract**：此 primitive 留下的产物
- **refutation surface**：暴露的 4-mode 反驳（accept / reject / change criteria / not-in-this-lens）的具体含义
- **writeback rule**：用户响应如何写回长期策略
- **OS reference**：当前最近实现 + gap

为避免 25 个 primitives 平铺累赘，按 7 姿态分组。同姿态内主 primitive 完整展开，辅 primitives 紧凑列出。

## 6.1 Trace 姿态（P1 / P2 / P3）

### P2 · **In-Content Halo**（Trace × Surface · primary）

| | |
|---|---|
| 占用 slot | Slot 1 In-Content Marker |
| input | typed candidate（已通过 Hold 判定值得用户看见） + 来源 surface 的可标记锚点 |
| output | overlay 的 minimal marker（dotted underline / soft halo / pin glyph）+ 可被 tap 放大原因的 popover |
| refutation | accept = keep marker / reject = clear here / change criteria = "不要在这种来源 trace" / not-in-this-lens = "这不属于我现在的关注" |
| writeback | accept → 该来源 + 该专题的 trace 升权；reject → 当次降权；change criteria → 来源类型 trace 全局降权；not-in-this-lens → 该专题 lens 边界更新 |
| OS Reference | iOS Live Text / Android TextClassifier / Harmony 文字识别 — 都缺 typed metadata 与跨 App overlay |

### P1 · **Saved-Pin Marker**（Trace × Hold · secondary）

候选在 Hold 阶段写入 Asset Pin Lattice 时的极轻提示（saved pill / 一闪即逝的 toast）。input：刚 hold 完成的 typed pin。output：单次提示 + 不进入用户当前注意力流。writeback：用户点击展开 → P2 升级；用户忽略 → 保持 hold，无负面写回。

### P3 · **Recognition Receipt**（Trace × Learn · secondary）

可选的极轻 marker，在 Learn 阶段告诉用户"我记住了你的偏好调整"。仅在用户做了 change criteria / not-in-this-lens 这种结构性调整后出现一次。意义：让 writeback 对用户可见，不变成黑箱。

## 6.2 Ambient 姿态（P4 / P5）

### P5 · **Ambient Presence Field**（Ambient × Surface · primary）

| | |
|---|---|
| 占用 slot | Slot 2 Ambient System Field |
| input | 长时间未介入 + 持续话题对齐信号 |
| output | 跨 App 系统场的低视觉重量在场表达（status 颜色微变 / avatar 心跳 / 边缘呼吸光） |
| refutation | accept = 展开为 Inline / Suggest / Echo（向上升级）/ reject = 静默此次 ambient / change criteria = "这种话题不要 ambient 在场" / not-in-this-lens = 切换到不同的关注 lens |
| writeback | 展开 → 该话题 ambient 升权；静默 → 全局 ambient 频率降级；change criteria → 该话题域永久关闭 ambient；ambient 静默不计入"用户拒绝过 agent" |
| OS Reference | iOS Dynamic Island idle / Android Now Bar / Harmony 实况窗 — 都需要"具体事件"才能驻留，缺"仅以在场为理由"的 ambient |

### P4 · **Ambient Connection Glow**（Ambient × Connect · secondary）

在 Connect 阶段，系统场颜色温度做一次极慢的微变化（数秒淡入），不指向具体内容，只表达"我连上了某些事"。是 P5 的前奏，多数情况下用户感知不到，但跨设备 / 跨时间累积会让 agent 在场感更稳定。

## 6.3 Inline 姿态（P6 / P7 / P8）

### P6 · **In-Flow Inset**（Inline × Surface · primary）

| | |
|---|---|
| 占用 slot | Slot 3 In-Flow Insertion |
| input | 用户当前任务的明确嵌入位（段落空隙 / 句末停顿 / 引用块）+ 已通过 Generate 的 typed inline 候选 |
| output | 在内容流中就地插入的 typed 语义片段（注释 / 改写候选 / 补充） |
| refutation | accept = 接受插入 / reject = 关闭此次 inset / change criteria = "在这种段落不要 inline" / not-in-this-lens = "改写方向不对，换 lens" |
| writeback | accept / 改写采用 → 学习用户语气偏好；reject → 同模式 inline 降权；change criteria → 该 surface 类型关闭 inline；not-in-this-lens → 触发 Suggest 的 lens 切换 |
| OS Reference | Apple Writing Tools / Magic Compose / Smart Reply — 都缺 lens 切换 + 拒绝写回 |

### P7 · **Inset Adjustment Loop**（Inline × Transform）

用户接受 inset 后的就地微调环：在不离开当前任务流的前提下，提供"more direct / softer / shorter"等 lens 切换。每次切换不重置上下文，是同一片段的不同表达。Morphing 在此体现。

### P8 · **Voice Calibration Writeback**（Inline × Learn）

用户接受 / 改写的累计模式被写入"用户表达声音画像"——记录的是相对偏好（用户偏向更直接 / 更柔和 / 更短）而不是绝对模板。这是 Inline 在 Learn 阶段的产物。

## 6.4 Suggest 姿态（P9 / P10 / P11）

### P9 · **Stuckness Resolution Card**（Suggest × Surface · primary）

| | |
|---|---|
| 占用 slot | Slot 3 In-Flow Insertion（与 Inline 共享，但形态不同） |
| input | 卡顿信号已成立（光标停留 / 删改反复 / 焦点游离 / 显式 "?"）+ 已通过 Generate 的分级候选 |
| output | 三个粒度的 suggest 同时呈现：一句替代 / 三个版本 / 完整段落。用户可在粒度之间切换，也可在 lens 之间切换（直接 / 柔和 / 简短） |
| refutation | accept = 选定一个版本 / reject = 关闭 suggest / change criteria = "这种卡点不要主动 suggest" / not-in-this-lens = "都不是我想说的，给我一个新方向" |
| writeback | 选中粒度 → "卡点偏好"更新（未来类似卡点优先该粒度）；选中 lens → lens 偏好累加；reject → 此次卡点不计入"成功 surface"；not-in-this-lens → 触发新一轮 Generate 但 lens 域扩展 |
| OS Reference | Gemini Magic Compose / iOS Writing Tools 改写 — 都缺粒度切换 + lens 切换的双轴 |

### P10 · **Granularity Switch**（Suggest × Transform）

用户在 P9 内的粒度切换是一个独立 primitive：从"一句"切到"三版"再到"完整段落"，每次切换 agent 用同一锚点重新生成（不是简单展开）。Morphing 在 Suggest 中的具体体现就是 P10。

### P11 · **Stuckness Pattern Memory**（Suggest × Learn）

把"用户在哪种语境下卡了多久 / 选了什么粒度 / 最终采用了哪个 lens"作为长期 stuckness 模式写回。这是 Suggest 与 Inline 写回的关键差异——Suggest 的 writeback 包含"卡点的语境形状"。

## 6.5 Co-creation 姿态（P12 / P13 / P14 / P15）

### P13 · **Companion Invitation Sheet**（Co-creation × Surface · primary）

| | |
|---|---|
| 占用 slot | Slot 4 Companion Invitation |
| input | 当前片段已与某个 user theme（专题）强对齐 + 该专题处于 active 写作窗口 |
| output | 一个**专题工作面**（不是 modal、不是 chat），呈现：(1) 当前片段对齐到的专题名称 + 对齐理由 / (2) 可选 lens 列表（更产品化 / 更面试化 / 更诗性…）/ (3) 选定 lens 后的 2–3 个候选 / (4) authorship 边界声明（"agent 在帮你形成表达，但观点是你的"） |
| refutation | accept = 选 lens + 采纳一个候选 / reject = 关闭 invitation / change criteria = "这个专题不要主动邀请我" / not-in-this-lens = "lens 不对，再给我一组" / **"not my point"** = 该片段不属于这个专题（专题边界更新） |
| writeback | accept → lens 偏好长期累计 + 候选进入专题资产但保留用户 authorship；"not my point" → 专题边界更新 + 该片段不再被这条专题 Echo；change criteria → 该专题主动邀请频率全局调整 |
| OS Reference | Image Playground style picker / Gemini Deep Research — 都缺 user theme 作为 first-class 概念 |

### P12 · **Theme-Lens Generation**（Co-creation × Generate · secondary）

在 Generate 阶段就向用户暴露 lens 选项的中间产物（"我可以从这三个 lens 来——你想先看哪个？"）。这是范式与"系统自己决定 → 直接展示"的关键差异：让用户在 Generate 阶段就介入 direction，而不是 Surface 阶段才接受。

### P14 · **Authorship Confirmation**（Co-creation × Transform）

用户选定候选后的强制 authorship 确认环：候选进入专题资产前，agent 显式问"这个版本是你愿意署名的表达吗？"。三种响应：confirm / edit further / reject。这是 Co-creation 与 Inline / Suggest 的关键边界——Co-creation 的产物会进入用户长期专题，必须有 explicit authorship 仪式。

### P15 · **Theme Boundary Update**（Co-creation × Learn）

Co-creation 的 writeback 不只更新偏好，还更新 user theme 自己的边界（哪些片段属于此专题 / 哪些不属于）。这是 user theme 作为 first-class 概念的运行时维护。

## 6.6 Echo 姿态（P16 / P17 / P18 / P19 / P20 / P21）

Echo 是矩阵中最饱满的一行——它是唯一跨越 Hold / Connect / Generate / Surface / Transform / Learn 的姿态。

### P19 · **Return Card with Reasoning**（Echo × Surface · primary）

| | |
|---|---|
| 占用 slot | Slot 5 Temporal Bridge |
| input | (1) 一个或多个过去 trace pin（来自 Asset Pin Lattice）/ (2) 当前任务的语义/目标对齐 / (3) 当前是 trace 的回访窗口（ritual 阶段切换 / 目标 active / deadline 临近） |
| output | 一张 Return Card，必须同时携带：(a) 过去内容的原 context 缩影（不是只显示文字，要显示当时的 surface 类型 / 地点 / 时间 / 情境）/ (b) **显式说明"为什么现在带回它"的理由**（连到当前任务的具体 hook）/ (c) 三种响应入口 |
| refutation | accept = bring it in（带入当前任务工作区）/ reject = not now（推迟到下一回访窗口）/ change criteria = "这种跨时间桥接不要做" / not-in-this-lens = "现在的 lens 不对，但桥接本身有意义" / **"don't connect these again"** = 永久断开此 trace 与此目标的桥接 |
| writeback | bring in → 该跨时间桥接路径升权；not now → 推迟（不算拒绝）；don't connect → 该 trace 与该目标永久断开；change criteria → 触发新一轮 Connect |
| OS Reference | Photos Memories / Pixel Recall / Spotlight 智能建议 — 都缺 reasoning trace（"为什么现在"），多数仅显示历史 |

### P16 · **Sleep-Queue Pinning**（Echo × Hold · 写入态）

Echo 在 Hold 阶段的"写入"形态：当 Capture 后判断"现在不该 surface 但未来可能有意义"，candidate 被写入 Sleep Queue 而不是直接 hold-and-surface。Sleep Queue 不是黑箱——它是 Asset Pin Lattice 的一种 typed pin，用户可见、可治理。

### P17 · **Cross-Time Bridge**（Echo × Connect）

时机到达时（Section 7 trigger）的桥接判断：哪个过去 pin 与现在的任务在语义/目标上对齐？Echo 在 Connect 阶段必须显式构造"why now"的理由 — 这是 Echo 与"显示历史"的根本差异。如果构造不出 why now，候选回流到 Sleep Queue。

### P18 · **Resurfacing Material Synthesis**（Echo × Generate）

把过去 trace 的原始片段重新合成为可被当前任务使用的形态：原文引用 / 摘要 / 与当前任务对齐的改写。Echo 的 Generate 不是凭空生成，而是基于过去内容做形态迁移。

### P20 · **Bring-In or Disconnect**（Echo × Transform）

用户响应后的处理。bring-in：候选进入当前工作区 + 触发对应姿态（如带入面试准备 → 升级为 Agentic Action）；disconnect：永久断开此跨时间连接，未来不再桥接。

### P21 · **Bridge Confidence Update**（Echo × Learn）

跨时间桥接路径的置信度更新。bring-in → 升权；not-now → 推迟（不影响置信度）；disconnect → 该路径永久关闭（不只是降权）。这是 Echo writeback 的特殊性 — 它更新的是**桥接路径**，不是单一 trace。

## 6.7 Agentic Action 姿态（P22 / P23 / P24 / P25）

### P23 · **Action Fork Surface**（Agentic Action × Surface · primary）

| | |
|---|---|
| 占用 slot | Slot 6 Action Fork & Micro-Session |
| input | 高置信 + 高相关 + 高时效 三条件同时成立 + 用户处于"主动准备状态"（面试前 / 作品集 session / deadline 临近）|
| output | 一个 typed action fork 菜单，每个 typed action 必须声明：(a) 产物类型（expression card / portfolio bullet / mock answer / diary reflection）/ (b) 产物去向（写入哪个工作区 / 哪个专题）/ (c) 所需时长估计 / (d) 可中断点 |
| refutation | accept = 选定 typed action（进入 P24 micro-session）/ reject = 关闭 fork / change criteria = "不要把 action 推给我" / not-in-this-lens = "fork 方向不对，换一组" |
| writeback | accept → 被选 typed action 升权；reject → 此次 fork 路径降权；change criteria → 全局 fork 频率降级；not-in-this-lens → 触发新一轮 Generate 但扩展 typed action 域 |
| OS Reference | Shortcuts Suggested Actions / App Actions / Action Button — 都缺 typed transformation menu（产物类型 / 去向 / 时长 / 可中断点） |

### P22 · **Action Fork Menu**（Agentic Action × Generate · secondary）

在 Generate 阶段构造 fork 菜单本身的过程。每个 typed action 都不是凭空，而是基于（candidate × user theme × ritual 阶段）的组合。在被 Surface 之前，菜单内部已经按 Goal Alignment Seat 排序。

### P24 · **Micro-Session Workspace**（Agentic Action × Transform · primary）

| | |
|---|---|
| 占用 slot | Slot 6 Action Fork & Micro-Session |
| input | 用户已在 P23 选定一个 typed action |
| output | 一个 ephemeral workspace（不是 modal、不是新 App），结构化时长 3–5 分钟。结构化骨架：(1) Recall context（30 秒） → (2) Generate one answer（90 秒） → (3) Refine with one lens（90 秒） → (4) Save with structure（30 秒）|
| refutation | session 内每一步都暴露：continue / pause / save partial / abort（abort 不计入负面 writeback）|
| writeback | session 完成 → 产物进入对应工作区 + 该 typed action 路径升权；session 中断 → 部分产物保存为 typed pin（进入 Asset Pin Lattice）+ 不计入负面 writeback；session 完成后用户标记"再来一次" → 该 path 短期内升权 |
| OS Reference | iOS Focus 模式 + 临时全屏 sheet / Android Focus session / Harmony 卡片堆栈 — 都缺**结构化时长 + 结构化骨架**的 ephemeral workspace |

### P25 · **Path Routing Update**（Agentic Action × Learn）

被选 typed action 路径升权 / 被拒路径降权 / abort 中性。这是 Agentic Action 的 writeback。和 Echo 的 P21 类似，更新的是**路径**而不是单点偏好。

## 6.8 25 个 Primitives 索引

| ID | 姿态 | 阶段 | 名称 | 占用 slot |
|---|---|---|---|---|
| P1 | Trace | Hold | Saved-Pin Marker | Slot 1 |
| P2 | Trace | Surface | In-Content Halo | Slot 1 |
| P3 | Trace | Learn | Recognition Receipt | Slot 1 |
| P4 | Ambient | Connect | Ambient Connection Glow | Slot 2 |
| P5 | Ambient | Surface | Ambient Presence Field | Slot 2 |
| P6 | Inline | Surface | In-Flow Inset | Slot 3 |
| P7 | Inline | Transform | Inset Adjustment Loop | Slot 3 |
| P8 | Inline | Learn | Voice Calibration Writeback | – |
| P9 | Suggest | Surface | Stuckness Resolution Card | Slot 3 |
| P10 | Suggest | Transform | Granularity Switch | Slot 3 |
| P11 | Suggest | Learn | Stuckness Pattern Memory | – |
| P12 | Co-creation | Generate | Theme-Lens Generation | Slot 4 |
| P13 | Co-creation | Surface | Companion Invitation Sheet | Slot 4 |
| P14 | Co-creation | Transform | Authorship Confirmation | Slot 4 |
| P15 | Co-creation | Learn | Theme Boundary Update | – |
| P16 | Echo | Hold | Sleep-Queue Pinning | Asset Pin Lattice |
| P17 | Echo | Connect | Cross-Time Bridge | – |
| P18 | Echo | Generate | Resurfacing Material Synthesis | – |
| P19 | Echo | Surface | Return Card with Reasoning | Slot 5 |
| P20 | Echo | Transform | Bring-In or Disconnect | Slot 5 |
| P21 | Echo | Learn | Bridge Confidence Update | – |
| P22 | Agentic Action | Generate | Action Fork Menu | Slot 6 |
| P23 | Agentic Action | Surface | Action Fork Surface | Slot 6 |
| P24 | Agentic Action | Transform | Micro-Session Workspace | Slot 6 |
| P25 | Agentic Action | Learn | Path Routing Update | – |

---

# Section 7 / Trigger Taxonomy

回答："什么样的现实信号让 Capture 阶段成立？"——即 Aha 候选的入口。

## 7.1 五类 trigger 信号

| 类别 | 信号源 | 典型 trigger | 倾向触发的姿态 |
|---|---|---|---|
| **Content Signals** 内容信号 | 当前 surface 上的语义、句法、结构 | 关键词匹配长期专题 / 句式与表达目标对齐 / 引用结构 / 长 paragraph 中的"高密度句" | Trace, Inline, Co-creation |
| **Behavior Signals** 行为信号 | 用户与当前 surface 的交互节奏 | 阅读停顿超阈值 / 选中文本 / 删改反复 / 焦点游离 / 显式 "?" / 切换 App 重新回到同段 | Trace（停顿）, Suggest（卡顿）, Inline（嵌入位）, Ambient（持续阅读流）|
| **Context Signals** 上下文信号 | 当前 App / 设备 / 系统状态 | 当前在写作 App / 当前在阅读 App / 设备处于 Focus mode / 同主题跨 App 持续 / 共同注意力建立 | 决定 capability slot 可用性 |
| **Temporal Signals** 时间信号 | 时间窗口；ritual 阶段切换仅对 Co-creation / Agentic Action 生效 | deadline 距离 / 上次访问后的间隔 / 定向回访窗口 / 跨时间 trace 桥接成熟度（Echo）；ritual 阶段切换（Morning / Evening / Night / Next Morning）作为 Co-creation / Agentic Action 主动邀请窗口的开关 trigger | Echo（由非 ritual 时间信号驱动）, Co-creation（ritual 切换 + 专题 active 窗口）, Agentic Action（ritual 切换 + deadline 临近）|
| **Memory Signals** 记忆信号 | 长期记忆查询与匹配 | 共享记忆查询命中 / user theme active 度 / 跨时间 trace 桥接候选成立 / 关系网络匹配 | Echo, Co-creation, 决定 generative potential |

## 7.2 Trigger 组合规则

姿态触发不是单一 trigger 决定，而是多 trigger 的**组合判定**。

```
Trace        ← Content × Memory（弱）
Ambient      ← Behavior（持续阅读）× Context（同主题跨 App）× Temporal（长时无介入）
Inline       ← Content（嵌入位）× Behavior（停顿/编辑）× Context（写作 App）
Suggest      ← Behavior（卡顿信号强）× Memory（已有相关偏好）
Co-creation  ← Content × Memory（user theme 强对齐）× Temporal（专题 active 窗口）
Echo         ← Memory（trace 桥接候选）× Temporal（回访窗口）× Context（当前任务对齐）
Agentic Action← Memory（高对齐）× Temporal（deadline 临近）× Behavior（主动准备状态）
            × **三高同时成立**：高置信 + 高相关 + 高时效
```

## 7.3 Trigger 的范式约束

1. **Capture 阶段不应仅靠单一 trigger 触发**：单一 trigger 容易把"任意阅读"变成"任意打扰"。范式要求至少两类 trigger 共同成立。
2. **Privacy Seat 在 Capture 后立即介入**：哪怕组合 trigger 成立，也必须由 Privacy Seat 复核来源是否在授权范围。授权范围本身应该可被用户在 Refutation Channel 调整。
3. **Trigger 不是 score**：范式拒绝把 trigger 折叠为单一数值分数。每类 trigger 都保留为 typed signal，进入后续阶段时由不同席位读取不同信号——Goal Alignment Seat 看 Memory + Temporal，Expression Reviewer Seat 看 Content + Behavior。

---

# Section 8 / Writeback & Refutation 契约

详细化 Cross-cutting B（Refutation Channel）和七姿态字典中的 writeback 规则。

## 8.1 Refutation 4-mode + 2-special

任何前台 primitive 都必须暴露至少 4 种响应：

| 响应 | 含义 | 写回方向 |
|---|---|---|
| **accept** | 接受 agent 这次的 surface（采纳产物 / 进入下一步）| 此次姿态 + 此次 trigger 组合 + 此次 lens 的偏好升权 |
| **reject** | 拒绝此次 surface（不进入下一步）| 此次姿态 + 此次 trigger 组合**单次**降权（不全局）|
| **change criteria** | 拒绝的不是产物，而是判断标准本身（"这种来源不要 trace" / "这种话题不要 ambient"）| 该 trigger 类别在此 surface / 此话题域全局调整 |
| **not-in-this-lens** | 接受介入意图，但拒绝当前 lens（"换一种角度生成"）| 不算拒绝，触发新一轮 Generate，但 lens 域扩展 |

外加两个**特殊响应**（不是必须，但范式建议每个高强度姿态暴露）：

| 响应 | 适用姿态 | 含义 | 写回方向 |
|---|---|---|---|
| **remind me later** | Trace, Echo, Co-creation, Agentic Action | 强制把当前 candidate 推回 Sleep Queue 等下一回访窗口 | 不写回偏好，只更新 Sleep Queue 时间标 |
| **don't connect these again** | Echo（专属）| 永久断开此跨时间桥接路径 | 该 trace × 该目标的 bridge 路径置零（不是降权）|

## 8.2 Writeback 对称性规则

```
accept   ─┐
reject   ─┼─►  symmetric weight (每类信号都进入长期偏好，权重对称)
ignore   ─┘    (ignore = 用户没响应 → 默认进入 ignore writeback，不被静默吞掉)

change criteria  ─►  structural update (调整 trigger 域 / lens 域 / 专题边界)
not-in-this-lens ─►  retry with extended lens domain (不是负面信号)
remind me later  ─►  sleep queue update (中性)
don't connect    ─►  permanent bridge null (路径级永久关闭)
```

**对称性 axiom**：accept 不被默认放大，reject 不被静默吞掉，ignore 不被默认当成 accept。这三类信号在长期模型里权重平等。

## 8.3 Lens / Criteria 调整的行为契约

`change criteria` 与 `not-in-this-lens` 是范式与推荐系统的根本分界，因此它们的契约必须在 spec 里固化：

1. **可见性**：用户每次行使 change criteria / not-in-this-lens 后，Refutation Channel 必须显示**当前调整生效后的判断 lens 摘要**（"agent 现在不会在 X 类来源 trace 这种内容"）——让 lens 调整对用户可见。
2. **可回滚**：每次 lens 调整都生成一条可回滚记录（"3 天前你关闭了 X 话题的 ambient — 撤销？"）。
3. **可治理**：用户应能在 Asset Pin Lattice 的治理面板里查看所有累积的 lens 调整，批量管理。
4. **不被推断**：agent **不应该**通过其它行为信号自己"推断"用户想 change criteria；这种调整必须是用户显式声明的。

## 8.4 Authorship 监护规则

Co-creation（P14）和 Agentic Action（P24 micro-session）涉及产物进入用户长期专题的情形，必须遵守 authorship 监护：

| 规则 | 含义 |
|---|---|
| **Explicit confirmation** | 产物进入专题资产前必须有 explicit confirm 仪式（不是隐式 "你不动它就进入了"）|
| **Editable before commit** | confirm 前用户可继续编辑，每次编辑不重置上下文 |
| **Authorship token** | 资产进入专题后携带 authorship token（"由你确认 + agent 协作生成"），与"agent 自动生成"的 typed pin 区分 |
| **Reversible commit** | confirm 后 24 小时内可一键撤回，撤回后资产降级为 typed pin（不删除）|

---

# Section 9 / Ritual Z-Axis（Co-creation / Agentic Action 的主动邀请窗口）

## 9.1 Ritual 的作用域（重要范式约束）

**Ritual 不是 agent 的全局节奏调制器**，而是 **Co-creation / Agentic Action 两类重姿态主动邀请用户进入反思窗口的时机划分**。它的隐喻是：

> 夜间不是 agent 的静音模式；夜间是 agent 在主战场（LD 内部）从客人转为主人的时刻——但 agent 在外部 App 客厅（小红书 / Notion / 邮件 / 阅读器…）里的活仍在做。

因此本节明确两件事：

1. ritual 阶段**只调制** Co-creation / Agentic Action 的主动邀请时机；
2. Trace / Ambient / Inline / Suggest / Echo 五种姿态**不被 ritual 抑制**——只要它们在第三方 App 上下文中各自的触发信号成立（Content / Behavior / Context / Memory），它们仍然激活。

## 9.2 Ritual 四阶段（Co-creation / Agentic Action 适用）

| Ritual | 时间窗口 | LD 主战场状态 | Co-creation / Agentic Action 主动邀请行为 |
|---|---|---|---|
| **Morning** | 用户开机 / 起床后 1 小时 | LD 接续昨夜产物 | Co-creation 中等：把昨夜 micro-session 产物作为可继续推进的协作邀请重新带回；Agentic Action 中等：仅在用户验证昨夜判断后启动 |
| **Evening** | 工作流尾段 | LD 进入收束模式 | Co-creation 中等：拉取 Hold queue，邀请"今天攒了什么"型反思；Agentic Action 低 |
| **Night** | 反思 / 写作 / 复盘 session | LD 成为主场，agent 转为主人 | Co-creation 高密度：长期 trace × user theme 的共创邀请高频出场；Agentic Action 高密度：micro-session 成为夜间主形态 |
| **Next Morning** | 次晨开机 | LD 接续夜间产物 | Co-creation / Agentic Action 中等：夜间 micro-session 的产物作为可继续推进的协作邀请回到次晨（验证用户是否仍认同夜间的判断）|

> **Daytime 不是 ritual 阶段**——它只是"非 ritual 时段"的别名。在这段时间 Co-creation / Agentic Action 的主动邀请保持低强度（仍可被用户显式触发，但 agent 不主动开窗）；其他五姿态在 Daytime 与在 Night 一样，按各自的触发信号工作。

## 9.3 Ritual × 姿态调制表

```
                Morning  Evening  Night    Next Morning
──────────────────────────────────────────────────────
Co-creation       ◐        ◐        ●         ◐
Agentic Action    ◐        ◐        ●         ◐

——— 以下姿态不被 ritual 调制 ———
Trace             由 Content × Memory 触发，与 ritual 阶段解耦
Ambient           由 Behavior × Context × Temporal（非 ritual）触发，与 ritual 阶段解耦
Inline            由 Content × Behavior × Context 触发，与 ritual 阶段解耦
Suggest           由 Behavior × Memory 触发，与 ritual 阶段解耦
Echo              由 Memory × Temporal × Context 触发，与 ritual 阶段解耦
```

**符号**：● 高密度主动邀请 / ◐ 中等 / 空 = 不主动邀请（用户仍可显式触发）

**关键观察**：

1. **Ritual 表只有两行**——Co-creation 与 Agentic Action 是范式中需要"开窗口邀请用户进入反思状态"的两类重姿态，因此对 ritual 敏感。
2. **其他五姿态与 ritual 解耦**——它们工作在第三方 App 客厅里，Night 不会让它们噤声；Morning 也不会让它们提前激活。它们只听各自的触发信号。
3. **Echo 不在 ritual 表里不等于 Echo 在夜间不出场**——Echo 在夜间高频出场是因为 Memory × Temporal 信号的自然密度高，不是因为 ritual 调制。Co-creation 在 Night 高密度则是 ritual 直接放权的结果。
4. **Daytime 被显式去除为 ritual 阶段**——这避免把"agent 工作时段"和"agent 主动开邀请窗口的时段"混为一谈。

## 9.4 Ritual 解释画布 6/7/8 的范式还原

原画布 spread 6（Day → Night 过渡）/ 7（夜间叙事）/ 8（知识梳理）在新范式下的解释：

| 原 spread | 新范式还原 |
|---|---|
| Spread 6 · Day → Night 过渡 | Sleep Queue 在 Evening 集中拉取 → Echo 路径（Path B）的批量启动时刻；不是独立姿态，是 Path B 的时间出口 |
| Spread 7 · 夜间叙事 | Night ritual × Co-creation（P13 Companion Invitation）× Echo（P19 Return Card）× Inline（P6 In-Flow Inset）的高密度组合：Co-creation 由 ritual 放权主动开窗口，Echo / Inline 在窗口内随触发信号配合形成连续叙事文本 |
| Spread 8 · 知识梳理 | Night ritual × Co-creation（P13 Companion Invitation）× Echo（P19）的组合：Co-creation 主动邀请用户进入结构化共创，长期 trace 资产被 Echo 自然带回，按用户专题做 lens 选择 |

**结论**：原画布的"夜间"内容**完全可以被 ritual 放权 Co-creation / Agentic Action 解释**，不需要新姿态族；其他姿态在夜间仍按各自信号工作，不被 ritual 接管。

## 9.5 Ritual 的范式约束

1. **Ritual 是 Co-creation / Agentic Action 的主动邀请 trigger**：从非 ritual 段切到 Night 时，Co-creation / Agentic Action 的主动邀请被放权；其他姿态的 trigger 评估**与该切换无关**。Sleep Queue 的 Evening 批量评估只对 Echo 路径（Path B）生效，是 Echo 自身 Memory × Temporal trigger 的具体场景，不是 ritual 直接调制 Echo。
2. **Ritual 必须不抑制 ritual-agnostic 姿态在第三方 App 上下文中的正常激活**：Night 期间用户在小红书 / 邮件 / 阅读器中的内容若触发 Trace / Ambient / Inline / Suggest / Echo，agent 在客厅里的工作不能被主战场的状态关闭。Privacy Seat 与 Timing Seat 仍按各自规则工作，但 ritual 不是它们的 mute 信号。
3. **Ritual 应当用户可定义**：默认 ritual 边界来自时间，但用户应能自定义"我的夜间 = 我开始写日记的时刻"——不是死的时间表。该定义只影响 Co-creation / Agentic Action 的主动邀请窗口。
4. **Ritual 不应跨设备误判**：跨设备的 ritual 阶段判断应基于用户主设备的 focus / activity，避免在多设备登录时产生 ritual 紊乱——同样仅作用于 Co-creation / Agentic Action 的邀请窗口判定。

---

# Section 10 / 设计原则收束

整本 spec 浓缩为 10 条范式原则，作为后续设计决策的 referenceable rules：

1. **范式先于通道**：先定义"agent OS 应当如何"，再 map 到现有 OS 通道。命名永远 OS-agnostic。
2. **七种姿态是仲裁结果，不是固定通知形态**：通知组件不是范式起点；起点是"agent 此刻以什么身份出现"。
3. **Surface 必须可被否决**：任何 candidate 走到 Surface 都可被 Timing Seat 否决，没有"必出"的姿态。
4. **写回对称**：accept / reject / ignore 三类信号在长期模型里权重平等，无静默吞噬。
5. **可反驳必须暴露 lens 与 criteria**：仅 accept/reject 的二元响应不属于 agent native 范式；用户必须在系统层面持有 lens / criteria 的调整入口。
6. **Asset Pin Lattice 是 first-class**：agent 思考过的东西应当是系统级一等公民数据，可见、可治理、typed。
7. **Authorship 不可被替代**：进入用户长期专题的产物必须有 explicit authorship 仪式，agent 永远是协作者不是作者。
8. **Sleep Queue 必须可治理**：用户应能查看"被压在我身后的 Aha 候选"，并可批量清理或调整 sleep 触发条件。
9. **Trace-only 是合法独立路径**：不是所有 Aha 都需要被解释、被生成、被行动化；"我看见了"本身就是合法的范式终点。
10. **Ritual 仅调制 Co-creation / Agentic Action 的主动邀请窗口**：morning / evening / night / next morning 不是 agent 的全局节奏开关，更不是配色和插画；它只决定两类重姿态何时主动开口邀请用户进入反思共创。其他五姿态（Trace / Ambient / Inline / Suggest / Echo）在第三方 App 上下文中按各自的触发信号继续工作，ritual 不是它们的 mute 信号。

---

# Appendix A · 8 spread 重映射表

把现有 `agentic-canvas-v1.html` 的 8 个 spread 映射到新范式。**目的不是兼容，而是声明现有画布的哪些资产被范式吸收、哪些被还原拆解、哪些被范式排除**。

| 原 spread | 原标签 | 新范式还原 | 处理 |
|---|---|---|---|
| 01 白天捕获 · 主聊天 Agent | daytime · chat capture | 用户递交型场景，**不在本 spec 范围内**（参见 Section 1.4） | 排除 |
| 02 用户主动触发 · 分享给 AGENT | daytime · selection-driven aha | 用户递交（选中后递交） | 排除 |
| 03 AGENT 主动识别可分享的观点 | os · user initiated save | Path C（Trace short-circuit）+ P2 In-Content Halo + P1 Saved-Pin Marker | 拆解吸收 |
| 04 Aha Moment | aha · featured spread | **拆解还原**到多个 cell：A1 inline halo card → P2；A2 OS banner push → P5 Ambient Presence Field（边界争议，应降权为 ◐）；A3 → P19 Echo Return Card；B1 open now → P23 Action Fork Surface；B2 → P5；B3 chat now → 用户递交（排除）；B4 dismiss → Refutation Channel 标准 reject | 拆解吸收 |
| 05 Candidate Peek | peek · low commitment | P19 Echo Return Card 的轻量变体 + P5 Ambient Presence Field | 拆解吸收 |
| 06 Day → Night 过渡 | transition · hard line | Sleep Queue 在 Evening 边界的批量评估 + Path B 时间出口 | 范式还原（参见 9.3） |
| 07 夜间叙事 | night · companion-authored artifact | Night × Echo（P19）× Inline（P6）的高密度组合 | 范式还原（参见 9.3） |
| 08 知识梳理 | night · structured knowledge | Night × Co-creation（P13）× Echo（P19）的组合 | 范式还原（参见 9.3） |

**重要差异**：
- 原画布把"用户递交"和"情境感知"放在同一画布内对照，本 spec 把用户递交完全排除（不是 Aha 范式范围）；
- 原画布的"Aha Moment"被还原成 5–6 个独立 primitive，不再是单一 surface 概念；
- 原画布的夜间内容不被范式排除，而是被声明为"Night ritual 放权 Co-creation / Agentic Action 主动开窗 + 其他姿态按各自触发信号配合"的组合产物——ritual 接管的是邀请时机，不是其他姿态的激活权。

# Appendix B · 三 OS Reference 汇总

每个 capability slot × 三 OS 当前最近实现的汇总。**这一表是参照，不是设计目标**。

| Slot | iOS Apple Intelligence | Android Gemini Extensions | HarmonyOS Intents |
|---|---|---|---|
| Slot 1 In-Content Marker | Live Text / Selection menu / Highlights | TextClassifier / Smart Selection / Magnifier | 全场景文字识别 / Celia 注解 |
| Slot 2 Ambient System Field | Dynamic Island idle / Live Activity compact / Focus filter | Now Bar / At a Glance / Always-on agent area | 实况窗 / Celia 状态环 |
| Slot 3 In-Flow Insertion | Writing Tools / Smart Reply / 键盘候选 | Magic Compose / Smart Compose / Circle to Search inline | 智慧建议 / 输入法 AI 写作 / 万能键盘 |
| Slot 4 Companion Invitation | Image Playground style picker / Genmoji / Notes 智能整理 | Gemini Deep Research / Magic Editor 多版本 | Celia 创作工作台（演进中）|
| Slot 5 Temporal Bridge | Photos Memories / Spotlight 智能建议 / Reminders 唤醒 | Pixel Recall / Now Playing 历史 | 时刻 / 服务卡片智能复现 |
| Slot 6 Action Fork & Micro-Session | Shortcuts Suggested / App Intents donations / Action Button 长按 | App Actions / Quick Settings tile / Focus session | 原子化服务卡片 / Focus 模式 |
| **Cross A** Asset Pin Lattice | Notes / Reminders + tags（缺 typed metadata）| Recall（缺 reasoning trace）| 收藏（缺 typed metadata）|
| **Cross B** Refutation Channel | Notification 长按（仅 accept/reject）| Notification actions（仅 accept/reject）| 通用举报按钮（仅 accept/reject）|

# Appendix C · 范式对 OS 厂商的能力请求清单

这份清单是 spec 的对外 prescriptive 输出——把"现有 OS 缺什么"明确化。

| # | 能力请求 | 对应 slot / cross-cutting | 优先级 |
|---|---|---|---|
| 1 | **跨 App typed marker layer** — agent 持有的、可叠加在第三方内容上的语义标识层 | Slot 1 | 高 |
| 2 | **仅以"在场"为理由的 ambient token** — 不需要具体事件即可驻留的环境场 | Slot 2 | 中 |
| 3 | **In-flow lens 切换 + 拒绝写回** — 现有 in-flow 是一次性建议 | Slot 3 | 高 |
| 4 | **User Theme 作为 first-class 概念** — 让 agent 在"帮 vs 替"之间显式仲裁 | Slot 4 + Asset Pin Lattice | 最高 |
| 5 | **Reasoning trace 必须随 temporal surface 出现** — 历史回访不能只显示历史 | Slot 5 | 高 |
| 6 | **Typed transformation menu** — fork 必须声明产物去向 / 时长 / 可中断点 | Slot 6 | 中 |
| 7 | **结构化 micro-session ephemeral workspace** — 系统级支持 3–5 分钟 session | Slot 6 | 中 |
| 8 | **Asset Pin Lattice as system-level data** — agent 思考过的东西不应是 App 私有 | Cross A | 最高 |
| 9 | **Refutation Channel with lens / criteria** — 用户在系统层面调整 agent 判断标准 | Cross B | 最高 |
| 10 | **Ritual 阶段作为系统 trigger** — ritual 边界仅作为 Co-creation / Agentic Action 主动邀请窗口的开关 trigger，不接管 ritual-agnostic 姿态在第三方 App 上下文中的激活；ritual 定义应由用户自定义并跨 OS 表达 | Slot 4 + Slot 6 | 中 |

# Appendix D · 与原范式文档差异

本 spec 在 `docs/aha-moment-agent-aha-mode-design-paradigm.md` 基础上的修订点：

| 维度 | 原范式 | 本 spec |
|---|---|---|
| 姿态数量与命名 | 7 种：Trace / Ambient / Inline / Morphing / Echo / Co-creation / Agentic Action | 7 种：Trace / Ambient / Inline / **Suggest** / Co-creation / Echo / Agentic Action（**删除 Morphing 作为独立姿态，作为 Suggest / Co-creation 的生成模式属性吸收**；**新增 Suggest 作为卡顿响应专属姿态**）|
| 姿态分组 | 无显式分组 | 四组：环境组（Trace/Ambient）· 当下组（Inline/Suggest）· 记忆组（Co-creation/Echo）· 行动组（Agentic Action）|
| Aha 生命周期 | 7 阶段（Capture → ... → Learn）线性叙述 | 沿用 7 阶段，**新增三条主路径**（Forward / Sleep-Echo / Trace-only short-circuit），明确 Trace 不必经过 Generate 是合法独立路径 |
| Capability slot | 无独立抽象层 | **新增 L2 capability slot 抽象层**（6 主 slot + 2 cross-cutting）|
| Asset Pin Lattice | 无显式概念 | **新增 cross-cutting A**：把 Trace ↔ Echo 之间的资产存储显式化为系统级 first-class 概念 |
| Refutation Channel | 提到"可反驳"但无显式 contract | **新增 cross-cutting B**：4-mode + 2-special 反驳契约 |
| Lens / criteria 调整 | 提及但无规则 | **新增完整契约**：可见性 / 可回滚 / 可治理 / 不被推断 四条规则 |
| Authorship 监护 | 隐含 | **新增 authorship 监护规则**：explicit confirmation / editable before commit / authorship token / reversible commit |
| 夜间 / 清晨内容 | 未明确归属 | **声明为 Night / Morning ritual 放权 Co-creation / Agentic Action 主动邀请 + 其他姿态按各自触发信号在客厅持续工作的组合产物**，不引入新姿态族 |
| Ritual 处理 | 不在范式内 | **新增 Ritual Z 轴**：4 阶段（Morning / Evening / Night / Next Morning）**仅调制 Co-creation / Agentic Action 主动邀请窗口**；其余 5 姿态与 ritual 解耦，由各自触发信号驱动 |
| OS 立场 | 未明确 | **范式先于通道**：明确 prescriptive 立场 + 现有 OS 作为 reference points + Appendix C 能力请求清单 |
| 7 种姿态服务对象 | Aha moment | **更窄聚焦**：明确仅服务 Aha moment 的前台化选择，不覆盖用户递交型参与 |

---

## 评审要点 / 给评审者

阅读这份 spec 时建议特别核对：

1. **Section 5 中央矩阵**是否能作为整份 spec 的 hero figure 站住——它是否充分压缩了 L1 + L3 的全部信息。
2. **Section 6 的 25 个 primitives** 是否每一个都有不可替代性——有任何两个 primitive 在 contract 上相似度过高的，应合并。
3. **Section 8 的 4-mode + 2-special refutation** 是否你愿意作为整份 spec 的"reusable interface"——它出现在每个 primitive 的 refutation surface 字段里。
4. **Appendix C 能力请求清单**是否你愿意作为本项目的对外范式输出——这份清单的语气决定了 spec 是"内部设计文档"还是"对 OS 厂商的设计提案"。
5. **Appendix D 差异表**是否准确反映了你心里"新范式 vs 原范式"的全部修订点。

复审后请告知：

- 通过 → 进入 writing-plans 阶段，把 spec 落到实现计划（重新拆解 SharedMemoryAhaCaseStudy 的页面结构 / 重新画 hero matrix figure / 决定哪些内容回写到 case study 正文）；
- 修订 → 标出具体 section 和修订方向，spec 重写后再次复审。
