# Agent Aha Mode 设计范式

日期：2026-04-26  
关联页面：`/agentic-design-development/aha-moment`  
上游文档：`docs/aha-moment-ux-information-form-selection.md`

## 文档目的

这份文档只提炼和本项目 Aha UX 直接相关的内容，用来定义 **Agent Aha Mode** 的设计范式。

它不讨论完整 Personal OS，不展开 Inspiration Mode 的全部可能，也不把 Aha 还原成普通通知等级系统。它聚焦一个问题：

> 当 agent 在用户没有显式召唤的情况下识别到一个高价值片段时，它如何判断自己是否出现、以什么关系身份出现、生成什么信息、把用户带向什么下一步？

## 核心定义

Agent Aha Mode 是一种由 agent 主动进入前台的工作模式。它不是 notification mode，也不是聊天模式，而是：

> agent 在授权上下文中识别 Aha candidate，并把它连接到用户目标、记忆、表达任务和可行动机会之后，选择一种合适介入姿态的模式。

在本项目里，Aha Moment 不是“发现了一个语点”，而是一个语义片段被 agent 判断为：

- 值得被保存；
- 值得被解释；
- 值得被转化成表达资产；
- 值得在未来某个时刻回访；
- 或值得现在进入共创 / 行动。

## 与普通通知的区别

普通 OS 通知报告事件：

```text
某个 App 发生了事
-> 系统通知用户
-> 用户点开或忽略
```

Agent Aha Mode 生成意义：

```text
当前上下文
× 用户长期目标
× 共享记忆
× 当前任务
× 可生成资产
-> agent 选择介入姿态
-> 用户得到一个可处理的 Aha
```

所以，本项目里的 Aha UX 不应该只问“用 banner 还是 card”。更重要的问题是：

```text
agent 此刻是陪伴者、审阅者、共创者，还是行动路由者？
```

## Aha Temporal Arc

Aha 不一定在被发现的当下前台化。它可以经历一条时间弧：

```text
Capture 捕捉候选
-> Hold 留痕 / 暂存
-> Connect 连接目标和记忆
-> Generate 生成表达或路径
-> Surface 选择前台姿态
-> Transform 转化为行动或资产
-> Learn 写回触发策略
```

关键判断：

> Aha 的能力不是“现在提醒你”，而是知道什么东西现在该沉默、什么东西未来该回来、什么东西值得被生成成新的表达或行动路径。

## Agent Presence

Agent Aha Mode 不需要强拟人化，但需要关系化。Agent 不是被设计成一个像人的角色，而是被设计成用户长期系统里的一个可见席位。

本项目采用三种 presence：

| Presence | 用户感知 | Aha UX 中的作用 |
|---|---|---|
| Tool Presence | 我调用它 | 用户主动递交内容时，agent 接住请求并执行 |
| Companion Presence | 它陪我经过一段时间 | agent 留痕、回声、复盘、适时回访 |
| Seat Presence | 它参与流程并提出判断 | agent 以某个 lens 审阅、挑战、生成或路由 |

Aha Moment 主要发生在 **Companion Presence** 和 **Seat Presence** 之间：

- 静默保存一个片段：Companion。
- 晚上把片段带回来：Companion。
- 判断这句话适合面试表达：Seat。
- 挑战一个观点太抽象：Reviewer Seat。
- 帮用户改成三个版本：Co-creator Seat。

## 内部席位

一段上下文进入 Aha 系统后，不应该由一个万能 agent 直接判断。更适合被拆成多席位审议。

| Seat | 判断问题 | 输出 |
|---|---|---|
| Companion Seat | 这个片段是否值得先陪用户留住？ | hold / trace / later return |
| Expression Reviewer Seat | 它是否能沉淀成一个表达结构？ | expression card / inline wording |
| Goal Alignment Seat | 它是否连接用户近期目标？ | goal link / priority boost |
| Timing Seat | 现在是否适合出现？ | silent / light / inline / return |
| Privacy Seat | 是否允许暂存或写入长期记忆？ | permission gate / user confirmation |
| Transformation Seat | 它能变成什么资产或行动？ | reply / challenge / card / session |

用户不需要看到所有内部席位，但 agent 的外显理由应该能被压缩成：

```text
为什么我现在带回它：
- 它关联你的 Agent OS 面试；
- 它能变成一句高价值表达；
- 现在你正处在整理材料的窗口。
```

## 选择公式

Agent Aha Mode 的 surface 判断可以用这个公式：

```text
Aha Surface =
Value
× Relevance
× Confidence
× Timeliness
× Actionability
× Personal Fit
× Generative Potential
- Interruption Cost
- Permission Risk
- Relationship Risk
```

本项目最重要的新增变量是：

- **Personal Fit**：这个 Aha 是否适合用户当前目标、节奏、表达风格和主动性偏好。
- **Generative Potential**：这个 Aha 是否能生成有用资产，例如一句表达、回复候选、表达卡、作品集 framing、面试回答或晚间复盘入口。

如果没有 generative potential，它更像普通提醒。  
如果有 generative potential，它才进入真正的 Agent Aha Mode。

## 介入姿态

Agent Aha Mode 的主分类不是组件，而是介入姿态。

| 姿态 | 含义 | 适合情况 | 对应 showcase 证据 |
|---|---|---|---|
| Trace 留痕 | 不打断，只留下未来可回访痕迹 | 有价值但不急、当前不适合处理 | `AHA island save notification` |
| Ambient 呼吸 | 界面轻微变化，表达“我看到了” | 用户连续阅读 / 浏览，不适合语言打断 | `AHA banner notification` / edge hint |
| Inline 镶嵌 | 嵌入当前任务，顺手推进一步 | 用户正在写、回复、编辑、卡住 | `AHA inline reply` / `inline challenge` |
| Morphing 变形 | Aha 变成当前任务需要的材料 | 同一片段可转成表达、注释、卡片、回答 | target-language challenge / reply candidate |
| Echo 回声 | 未来更合适时把旧内容带回来 | 复盘、面试、作品集整理、夜间回访 | `AHA return card / modal preface` |
| Co-creation 共创 | 邀请用户一起塑形 | 表达、作品集、面试准备、概念探索 | 生成多个方向供用户选择 |
| Agentic Action 代理行动 | 把 Aha 转成任务分叉口 | 高置信、高相关、高可行动 | expression card / portfolio bullet / mock answer |

## Use Cases：按介入姿态重写

### Use Case 1：Trace 留痕

**场景**：用户在小红书或文章里刷到一句英文：`I want my work to feel inevitable, not loud.` 用户没有停顿，也没有选中文本。

**Aha candidate**：这句话和用户最近反复在整理的作品集表达风格有关，可能适合晚点变成一张 expression card。

**内部席位判断**：

- Companion Seat：值得先留住，但不要打断阅读。
- Expression Reviewer Seat：这句话有可复用表达结构。
- Timing Seat：当前不适合前台展开。
- Privacy Seat：只保留候选，不写入长期记忆。

**前台姿态**：Trace。

**生成信息层**：G0-G1。

**UX 表现**：

- 文本旁出现极轻 marker，或完全静默。
- 晚间复盘里出现来源提示：`kept from afternoon reading`。
- 不显示完整解释，不要求用户马上处理。

**用户控制**：

- 晚点看到时可以 `keep` / `dismiss` / `don't save this source`。

**写回结果**：

- 如果用户保留，系统提升该表达类型的 future recall 权重。
- 如果用户忽略，系统降低类似轻量阅读片段的主动回访频率。

**成功标准**：用户不觉得被打断，但在复盘时能理解“这个片段为什么被留住”。

### Use Case 2：Ambient 呼吸

**场景**：用户正在浏览一篇关于 Agent OS 的文章，读到一句与自己近期思考高度相关的话，但仍在连续阅读。

**Aha candidate**：当前段落和用户的 Personal OS / cross-app agent 论点有关。

**内部席位判断**：

- Goal Alignment Seat：与近期目标相关。
- Timing Seat：阅读流还在继续，不适合插入完整卡片。
- Companion Seat：可以让用户感受到 agent 看见了这个连接。

**前台姿态**：Ambient。

**生成信息层**：G1-G2。

**UX 表现**：

- 边缘出现 `AHA` 小状态，或 agent avatar 轻微变化。
- 可显示一句非常短的提示：`related to your Personal OS framing`。
- 不遮挡正文，不要求用户回应。

**用户控制**：

- 用户可以忽略。
- 轻点后展开为 edge bubble。
- 长按可选择 `save for later` 或 `show less like this`。

**写回结果**：

- 如果用户展开，系统记录该主题连接有用。
- 如果用户连续忽略，系统降低 Ambient 出现强度。

**成功标准**：用户知道 agent 在旁边捕捉意义，但阅读节奏没有被破坏。

### Use Case 3：Inline 镶嵌

**场景**：用户正在 Slack 或邮件里写英文回复，光标停在一句话上反复修改。

**Aha candidate**：用户不是缺知识，而是卡在语气和表达策略上。

**内部席位判断**：

- Expression Reviewer Seat：当前句子可以变得更自然。
- Timing Seat：用户已经停顿，存在介入窗口。
- Transformation Seat：可以生成一个可直接采用的 reply candidate。

**前台姿态**：Inline。

**生成信息层**：G2-G3。

**UX 表现**：

- 在当前输入区下方出现一条 inline reply。
- 文案不说“我发现了一个 Aha”，而是直接给可用表达：

```text
Try:
Fair point. I'd want to explore one thing first.
```

**用户控制**：

- `insert`
- `make softer`
- `more direct`
- `dismiss`

**写回结果**：

- 如果用户采用或改写，系统学习用户偏好的语气方向。
- 如果用户 dismiss，系统不把这次表达判断写入长期记忆。

**成功标准**：agent 不把用户拉出当前任务，却让当前表达顺利往前走一步。

### Use Case 4：Morphing 变形

**场景**：同一个片段 `Agent should not just live inside one app.` 出现在不同用户任务里。

**Aha candidate**：这句话不是单一知识点，而是可以根据场景转化成不同材料。

**内部席位判断**：

- Transformation Seat：判断可生成资产类型。
- Goal Alignment Seat：根据当前目标决定转化方向。
- Expression Reviewer Seat：确保生成物符合用户表达风格。

**前台姿态**：Morphing。

**生成信息层**：G3-G4。

**UX 表现**：

| 当前场景 | Aha 变形成 |
|---|---|
| 用户正在写英文 | 一句替代表达 |
| 用户正在做作品集 | 一个 project framing |
| 用户正在准备面试 | 一段 interview answer |
| 用户正在学语言 | 一张 expression card |
| 用户正在写研究笔记 | 一个 claim / evidence note |

**用户控制**：

- 用户选择生成方向。
- 可以要求 `more portfolio-like` / `more conversational` / `more concise`。

**写回结果**：

- 系统记录同一类 Aha 对用户最常见的转化路径。
- 转化后的资产进入对应工作区，而不是只进入通知历史。

**成功标准**：Aha 不停留在“被提醒”，而是变成当前任务真正需要的材料。

### Use Case 5：Echo 回声

**场景**：白天用户读到一句关于 proactive systems 的内容，系统静默保存。晚上用户打开 Agent OS 面试准备材料。

**Aha candidate**：白天片段现在与面试回答高度相关。

**内部席位判断**：

- Companion Seat：白天已经留痕。
- Goal Alignment Seat：当前任务和片段高度匹配。
- Timing Seat：现在是合适 return window。
- Transformation Seat：可以转成 interview answer。

**前台姿态**：Echo。

**生成信息层**：G2-G4。

**UX 表现**：

```text
下午你看到的那句话现在有用了。
它刚好可以支撑你关于 OS-native Agent 的回答。
```

可以接一个 return card：

```text
Turn this into:
[Interview sentence]
[Portfolio framing]
[Expression card]
```

**用户控制**：

- `bring it in`
- `not now`
- `show original context`
- `don't connect these again`

**写回结果**：

- 用户接受后，该片段进入面试准备工作区。
- 用户拒绝后，系统降低这类跨时间回访的置信度。

**成功标准**：用户感觉 agent 不是突然打断，而是在合适时机让过去的内容重新有用。

### Use Case 6：Co-creation 共创

**场景**：用户正在整理作品集文案，某个 Aha 可以成为项目 framing，但还没有定型。

**Aha candidate**：片段有潜力，但不应该由 agent 直接定稿，因为它涉及用户自己的设计立场。

**内部席位判断**：

- Co-creator Seat：适合共同塑形。
- Reviewer Seat：可以提出不同表达 lens。
- Privacy / Authorship Seat：最终观点必须由用户确认。

**前台姿态**：Co-creation。

**生成信息层**：G3-G4。

**UX 表现**：

```text
This could become a portfolio sentence.
Want to shape it together?

[更产品化]
[更面试化]
[更诗性]
```

用户选择方向后，agent 生成 2-3 个候选版本，而不是直接替用户决定。

**用户控制**：

- 选择 lens。
- 编辑候选。
- 要求 `show why`。
- 标记 `not my point`。

**写回结果**：

- 系统学习用户更偏好的表达 lens。
- 只有用户确认后的版本才进入作品集素材或长期记忆。

**成功标准**：用户仍然感觉观点属于自己，agent 只是帮助形成表达。

### Use Case 7：Agentic Action 代理行动

**场景**：用户进入主动准备状态，比如面试前一晚、作品集写作 session 或语言练习 session。

**Aha candidate**：某个片段高置信、高相关、高可行动，已经不只是“值得看”，而是可以被立即转化成任务。

**内部席位判断**：

- Goal Alignment Seat：强绑定当前目标。
- Transformation Seat：可以生成多个行动路径。
- Timing Seat：当前允许更强介入。
- Reviewer Seat：需要声明为什么建议这样做。

**前台姿态**：Agentic Action。

**生成信息层**：G4-G5。

**UX 表现**：

```text
I can turn this into:
1. an expression card
2. a portfolio bullet
3. a mock interview answer
4. a diary reflection
```

如果用户选择 `mock interview answer`，系统进入一个 3-5 分钟 micro-session：

```text
1. Recall the original context
2. Generate one answer
3. Refine tone
4. Save reusable structure
```

**用户控制**：

- 选择行动路径。
- 要求换 lens。
- 停止 session。
- 不写入长期记忆。

**写回结果**：

- 生成资产进入对应工作区。
- 用户选择的路径更新 future routing policy。
- 被拒绝的路径降低推荐权重。

**成功标准**：Aha 从灵感变成可执行工作流，但用户仍保留最终控制权。

## 生成式信息层

信息形式不是“说多少”，而是“生成到什么程度”。

| 层级 | 信息形式 | 本项目例子 |
|---|---|---|
| G0 Silent Memory | 不显示，只保存候选 | 后台暂存一条 expression seed |
| G1 State Signal | 只表达状态 | `AHA · saved for tonight` |
| G2 Reason Signal | 解释为什么相关 | 这和你最近的 Agent OS framing 有关 |
| G3 Generated Micro-Asset | 生成一个小资产 | 一句英文替代表达 / 一条 inline reply |
| G4 Generated Path | 生成可选路径 | 转成表达卡 / 面试回答 / 作品集 bullet |
| G5 Generated Session | 生成微会话 | 3-5 分钟 Aha session：回看、改写、保存、写回 |

## 轻 / 中 / 重不是 UI 大小

轻、中、重仍然有用，但它们描述的是 **介入姿态 + 生成深度**，不是 banner / card / modal 的尺寸。

### 轻：Trace / Ambient

适合：

- 有价值但不急。
- 用户正在连续任务中。
- 系统还没有明确行动路径。
- 更适合晚点回访。

信息层：

- G0-G2

典型 UX：

- saved pill
- marker
- banner
- edge hint

### 中：Inline / Morphing

适合：

- 当前任务已经出现介入窗口。
- agent 能生成一小段可用内容。
- 用户不需要切换场景即可处理。

信息层：

- G2-G4

典型 UX：

- inline reply
- inline challenge
- context card
- 小型 co-creation 入口

### 重：Echo / Co-creation / Agentic Action

适合：

- Aha 高置信、高相关、高时效。
- 和近期目标、deadline、关系或反复问题强绑定。
- 不介入会明显损失价值。
- 系统能生成明确行动路径。

信息层：

- G4-G5

典型 UX：

- return card
- modal preface
- action card
- micro-session

## 和两种参与模式的关系

本项目仍保留两种 agent 参与模式，但 Agent Aha Mode 主要解释第二种：

| 模式 | 核心问题 | Aha UX 重点 |
|---|---|---|
| 用户递交型参与 | 用户如何把消息传给 agent？ | handoff、接住请求、即时生成 |
| 情境感知型介入 / Agent Aha Mode | agent 何时有资格主动出现？ | 捕捉、判断、留痕、生成、回访、行动 |

用户递交型参与里，agent 不需要证明自己为什么出现，因为用户已经递交了上下文。  
Agent Aha Mode 里，agent 必须证明：

- 为什么它看见了这个片段；
- 为什么这个片段和用户有关；
- 为什么现在出现或为什么先不出现；
- 它能生成什么；
- 用户如何接受、忽略、反驳或改写。

## 可反驳原则

当 agent 以审阅者、共同判断者或行动路由者身份出现时，它必须可反驳。

UI 不应该只有：

```text
Accept
```

还应该支持：

```text
Challenge
Show evidence
Change criteria
Use different lens
不是这个意思
不要记住
以后少这样提醒
```

这是 Agent Aha Mode 和普通推荐系统的关键区别：用户不是被动接收系统判断，而是在和一个有明确 lens 的智能席位协作。

## 设计规则

1. 不把 Aha 简化成通知等级；通知组件只是安全底座。
2. 先判断 generative potential，再决定是否前台化。
3. 只有价值、没有行动时，优先 Trace 或 Ambient。
4. 能推进当前任务时，优先 Inline 或 Morphing。
5. 与未来场景更相关时，优先 Echo，而不是当下提醒。
6. 需要用户主体性时，使用 Co-creation，而不是直接替用户决定。
7. 高置信、高相关、高可行动时，才进入 Agentic Action。
8. 如果 agent 以 Seat 身份出现，必须声明 lens、criteria 和理由。
9. 如果涉及长期记忆、关系判断或隐私边界，必须提供反驳和关闭入口。
10. 用户对保存、忽略、改写、延迟的行为要写回触发策略。

## 本项目一句话范式

> Agent Aha Mode 不是让 agent 更频繁地提醒用户，而是让 agent 在合适的关系席位上，把现实片段捕捉、连接、生成、回访，并转化为用户可控制的表达或行动。
