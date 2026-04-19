# Language Diary：Agent-native UX 叙事重组 Spec

日期：2026-04-20  
项目：`/agentic-design-development/language-diary`  
状态：方向已确认，待进入实现

## 目标

重组 `A Ritual of Expression - 语言学习陪伴多智能体系统` 的案例叙事，使其以 `AI agent native UX` 的作品集论证方式成立，并符合专业交互设计师面向评审者的表达标准。

新版叙事需要保留：

- 当前第一页作为项目开场
- 当前第二页及 Mira 相关的用户旅程内容
- morning / daytime / night 的 ritual 结构

新版叙事需要弱化：

- API / runtime 说明
- 按 agent 罗列 prompt 的方式
- 主叙事中过于技术化的 hand-off 描述

这些内容可以保留在 appendix、生成文档或 agent gutter 中，但不再主导案例正文。

## 核心论点

这个项目真正回应的问题，是当 agent 逐渐进入日常之后，UX 设计面对的对象如何发生变化：

- 语言学习从任务系统转向关系系统
- 设计对象从人和工具的单点交互，转向持续生成中的关系网络
- UX 的关键判断转移到主动性边界、注意力仲裁、语义中间层与记忆合法性

整个案例需要始终把 `Language Diary` 表达为一套关于表达、记忆与回带的 `relationship infrastructure`。

## 叙事原则

重组后的案例应遵循以下原则：

1. 以问题重构和设计 stakes 开场。
2. 把用户体验与设计判断放在前景。
3. 将多 agent 结构表达为责任分配机制。
4. 将 semantic middle layer 表达为具有产品后果的 UX 设计动作。
5. 将记忆表达为被治理、被筛选的结构，而非默认存储。
6. 保留 lived experience 的温度，尤其保留 Mira 的叙事质感。
7. 语言风格需适合专业设计评审：准确、克制、可评估。
8. 减少 `不是……而是……` 这类对冲式句法，优先使用直接的设计判断、后果说明和取舍表达。

## 建议的五页结构

### 第 1 页

标题：  
`A Ritual of Expression`

副标题：  
`把语言学习从任务系统重构成关系基础设施`

目标：

- 先确立项目如何重新定义语言学习 UX
- 交代传统 task-first 产品的局限
- 明确项目围绕表达、意义、记忆与未来回带建立新的产品结构

内容要求：

- 保留当前第一页的开场力度
- 明确指出大多数语言学习产品仍以任务链组织体验
- 引出设计对象从 `tool interaction` 转向 `relationship network`
- 落在项目是一套围绕表达、意义、记忆和回带组织起来的关系基础设施

视觉建议：

- 不以 UI 截图为主
- 用一张关系场图或关系网络图展示：
  - person
  - language
  - memory
  - emotion
  - lived moments
  - agents

### 第 2 页

标题：  
`Mira’s Ritual Journey`

副标题：  
`Morning、Daytime 与 Night 构成三种不同的关系状态`

目标：

- 保留 Mira 的叙事主线
- 展示系统如何在一天中参与表达、记忆和回带
- 让 ritual 结构呈现为关系编排，而非功能排列

内容要求：

- 保留 Mira 作为 narrative anchor
- 保留 morning / daytime / night 的结构
- 明确分出两层：
  - Mira 正在经历、表达和感受什么
  - 系统在后台识别、存储、延后或回带什么

关键 framing：

- morning 负责温和地重新进入
- daytime 负责承接表达与陪伴
- night 负责把表达整理成可复用的语言资产

视觉建议：

- 保留现有 Mira 总览图与三段视频
- 通过版式把每个 ritual stage 拆成：
  - 前台体验
  - 后台系统行为

### 第 3 页

标题：  
`What Agent-native UX Is Actually Designing`

副标题：  
`从任务路径转向关系边界`

目标：

- 替换当前偏 system architecture 的主叙事页
- 直接陈述这个项目的设计立场

内容要求：

- 说明 agent-rich UX 的关键不在任务路径，而在关系边界、注意力控制与行为合法性
- 明确提出四个设计判断：
  - agency boundary
  - attention arbitration
  - memory legitimacy
  - intervention timing
- 将这些判断与 string-figure-player 式的设计方法联系起来

视觉建议：

- 使用对照式版面：
  - traditional AI learning UX
  - agent-native relationship UX
- 可对照的维度包括：
  - correction first / accompaniment first
  - total retention / selective memory
  - maximal transparency / responsibility-matched visibility
  - singular interpretation / distributed interpretation

### 第 4 页

标题：  
`Semantic Middle Layer`

副标题：  
`从 lived moment 到合法的 system action`

目标：

- 将语义中间层确立为全案最重要的方法页
- 说明项目的核心价值来自 UX 级别的语义组织能力

内容要求：

- 解释为什么原始对话不能直接压成 message、card 或 memory row
- 解释缺少中间层会损失什么判断力
- 引入核心语义对象：
  - `EventAnchor`
  - `ExpressionAttempt`
  - `MeaningGap`
  - `AffectiveTone`
  - `MemoryCandidate`
  - `InterventionOpportunity`
- 收束在：这一层支持系统做出关于动作、时机与克制的判断

视觉建议：

- 采用三层结构图：
  - lived moment
  - semantic objects
  - system actions
- 包含类似映射：
  - expression attempt -> gentle follow
  - meaning gap -> light rewrite / delayed teaching
  - memory candidate -> save for future resurfacing

### 第 5 页

标题：  
`Distributed Agency, Memory Legitimacy, and Intervention Governance`

副标题：  
`一套关于介入、记忆与责任的治理模型`

目标：

- 将多 agent 结构重述为治理模型和责任分配机制
- 以设计判断和治理逻辑收束全文

内容要求：

- 说明不应由单一 agent 独占解释权
- 以 UX 语言说明各类责任分工：
  - companionship
  - expression upgrade
  - knowledge distillation
  - night consolidation
  - orchestration
- 明确治理问题：
  - 什么应进入记忆
  - 什么只应短时保留
  - 什么值得介入
  - 什么应保持沉默
- 最后再次确立项目是一套带有分布式责任的 relationship infrastructure

视觉建议：

- 使用 intervention matrix，坐标可为：
  - clarity / confidence
  - interruption cost / intimacy
- 区域可包括：
  - stay in background
  - acknowledge only
  - gentle rewrite
  - explicit teaching
  - save as candidate
  - resurface later
- 可辅以一张轻量的 agent responsibility map

## 内容降级策略

以下内容应从主叙事中降级：

- Express runtime 说明
- API surface 摘要
- 按 agent 展开的 prompt snippet
- 细粒度 technical hand-off
- 底层 boot / repository 结构

这些内容可以留在：

- appendix 页面
- 生成文档层
- side gutter commentary
- 可选技术深入区域

## 内容提升策略

以下内容应提升为正文主线：

- 项目的问题重构
- ritual 作为关系结构
- Mira 的 lived-experience 旅程
- semantic middle layer
- memory legitimacy
- intervention gradient
- visibility 与 responsibility 的对齐关系
- 多 agent 系统作为 distributed interpretation

## 文风要求

新版案例需要呈现出专业交互设计师面向作品集评审的语言质感。

期望的语言特征：

- 冷静但有判断
- 概念清晰
-  rooted in lived experience
- 明确指出 UX 判断及其后果
- 能被有经验的设计评审者快速理解
- 结构紧凑，不过度铺陈

避免：

- 模块清单式表达
- implementation-first 的叙述方式
- 为了立论而反复使用对冲式句法

优先使用：

- 直接的设计意图表达
- 清晰的 consequence / trade-off 说明
- 对产品行为边界的明确描述
- 面向评审者的理由陈述：为什么这个判断重要

## 实现说明

本 spec 当前不涉及代码修改。

后续实现预计包括：

- 重写案例正文页的 visible content structure
- 保留并重构当前前两页
- 将现有第 3-5 页从 generated technical reading layer 改为 authored narrative
- 决定哪些原有技术内容迁移到 appendix 或 side commentary

## 范围检查

这个任务的范围适合一次聚焦在单个 case study 的内容与版式重构。

它不需要：

- 修改路由结构
- 修改项目注册结构
- 修改整个作品集的信息架构

## 复审说明

本 spec 明确以 UX framing 为优先级高于系统说明。
如果实现过程中发现现有 generated slide 内容无法完整映射，应优先保留这里定义的叙事优先级，并将多余技术细节降级处理，而不是反向让主叙事再次变成系统说明书。
