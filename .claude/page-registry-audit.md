# 项目页面注册状态总览

> 持续维护文档。每次新增/修改页面后更新。
> 最后更新：2026-05-14（web-design-develop/fuli-plus 遗留路由清除）

---

## 图例

| 符号 | 含义 |
|------|------|
| ✅ 已注册 | SLIDE_COUNTS 正确，内容已注册，页面可正常访问 |
| ⚠ 待修复 | 内容存在但 SLIDE_COUNTS 不足，页面不可达 |
| 🚫 孤立文件 | 文件存在但未导入/注册，不参与渲染 |
| 🔧 特殊机制 | 不走 sectionMap，使用专属组件或 inlineChildRoute |

---

## PROJECT 02 · `/agentic-design-development`

### I · `/agentic-design-development/music-podcast` — 基于关联的私人音乐播客平台

| 页 | SLIDE | 状态 | 内容摘要 |
|----|-------|------|---------|
| 1 | :0 | ✅ 已注册 | 起因 + 两期播客 Demo（贝斯手/双主角）+ Music Shuffle |
| 2 | :1 | ✅ 已注册 | 播放器 V1.0 设计图 + v0.2 关联探索过程交互 iframe |

---

### II · `/agentic-design-development/language-diary` — A Ritual of Expression

| 页 | SLIDE | 状态 | 内容摘要 |
|----|-------|------|---------|
| 1 | :0 | ✅ 已注册 | 项目起源 · 低摩擦语言陪伴系统 |
| 2 | :1 | ✅ 已注册 | 多智能体架构设计 |
| 3 | :2 | ✅ 已注册 | 记忆层与知识干预 |
| 4 | :3 | ✅ 已注册 | 长期记忆与表达资产 |
| 5 | :4 | ✅ 已注册 | 系统完整流程 + 原型演示 |
| — | — | 🚫 孤立文件 | `Slide06.tsx`：内容与 Slide05 重叠，未注册（SLIDE_COUNTS=5） |
| — | — | 🚫 孤立文件 | `Slide07.tsx`：同上，未注册 |
| — | — | 🚫 孤立文件 | `Slide03Showcase.tsx` / `Slide04Shifted.tsx` / `Slide05Shifted.tsx`：变体版本，未注册 |

---

### III · `/agentic-design-development/aha-moment` — 共享记忆驱动的 Aha 时刻

| 页 | SLIDE | 状态 | 内容摘要 |
|----|-------|------|---------|
| 1 | :0 | ✅ 🔧 SharedMemoryAhaCaseStudy | Aha 时刻触发机制设计 |
| 2 | :1 | ✅ 🔧 SharedMemoryAhaCaseStudy | 共享记忆架构 |
| 3 | :2 | ✅ 🔧 SharedMemoryAhaCaseStudy | 系统交互原型 |

---

### IV · `/agentic-design-development/driving-authority-contracts` — 当车开始像同伴一样观察人时

**⚠ SLIDE_COUNTS 缺失**（getSlideCount 回退为 1，实际走 inlineChildRoute 子路径机制）

| 子路径 | 状态 | 内容摘要 |
|--------|------|---------|
| `/main:0` | 🔧 inlineChildRoute 机制 | HMI 从驾驶界面变为安全/权限/学习界面；驾驶自动化合约、打断逻辑（风险/置信度/可逆性/时间压力）、记忆治理 |
| `/ux-case-example:0` | 🔧 inlineChildRoute 机制 | 信任如何分配的设计问题；能力-行为-场景-证据-记忆-策略本体；停车意图检测 UX 案例 |

> 暂不修复，保持现状。需确认 inlineChildRoute 机制是否正常工作。

---

### V · `/agentic-design-development/agentic-driving` — 驾驶专家，还是个性化驾驶员？

**⚠ SLIDE_COUNTS 缺失**（内容存在 7 页，sectionMap 已注册 :0–:6，但缺 SLIDE_COUNTS 条目）

| 页 | SLIDE | 状态 | 内容摘要 |
|----|-------|------|---------|
| 1 | :0 | ⚠ 待修复 | Agent 辅助驾驶：驾驶专家还是个性化驾驶员？ |
| 2 | :1 | ⚠ 待修复 | 各厂商对 Agent 的不同定义 |
| 3 | :2 | ⚠ 待修复 | 模糊语言映射为动作 vs. 规则系统的本质区别 |
| 4 | :3 | ⚠ 待修复 | 真正的分水岭：理解用户在具体情境下的驾驶方式 |
| 5 | :4 | ⚠ 待修复 | 交互与 UX 模式：在模糊中做判断，建立可信协作 |
| 6 | :5 | ⚠ 待修复 | 文献回顾：个性化驾驶中行为数据的采集与组织 |
| 7 | :6 | ⚠ 待修复 | 判断：Agent 既非车主代理也非纯驾驶专家 |

> 待加入：`'/agentic-design-development/agentic-driving': 7`

---

### VI · `/agentic-design-development/simo-agent-system` — SIMO Agent System 概念设计

| 页 | SLIDE | 状态 | 内容摘要 |
|----|-------|------|---------|
| 1 | :0 | ✅ 已注册 | 平台概览 + 多智能体生态协作界面 + 平台角色与能力组织 + 沉浸式系统表达 |
| 2 | :1 | ✅ 已注册（刚修复）| Agent 应用管理 + Agent 使用/创作 + Agentverse 平台集成 + 智能创作工作流 |

---

### VII · `/agentic-design-development/fuli-plus` — Fuli+ Agent

| 页 | SLIDE | 状态 | 内容摘要 |
|----|-------|------|---------|
| 1 | :0 | ✅ 🔧 FuliPlusCaseStudy | 自适应产品 Demo + 系统地图 |
| 2 | :1 | ✅ 🔧 FuliPlusCaseStudy | 持续反馈驱动的地毯花样生成系统 |
| 3 | :2 | ✅ 已修复 | AI 工作流自动化提效与转化 |
| 4 | :3 | ✅ 已修复 | 专业地毯设计师会怎么做？ |
| 5 | :4 | ✅ 已修复 | 一个输入如何扩展为三条可比较方向 |
| 6 | :5 | ✅ 已修复 | 用户选择方向二时，系统开始稳定理解 |
| 7 | :6 | ✅ 已修复 | 走向 Agentic 项目 |
| 8 | :7 | ✅ 已修复 | 任务分解 · Round 1 方向探索（语义编译链） |
| 9 | :8 | ✅ 已修复 | 任务分解 · Round n>1 方向收敛（方向权重与地毯语言） |
| 10 | :9 | ✅ 已修复 | 附录 A：品牌图像 → 可复用语义增强层 |
| 11 | :10 | ✅ 已修复 | 附录 B：三个方向如何映射到地毯语言 |
| 12 | :11 | ✅ 已修复 | 附录 C：Slot-State 映射层 |

---

### VIII · `/agentic-design-development/personal-os` — personal OS 的探索进行时

| 页 | SLIDE | 状态 | 内容摘要 |
|----|-------|------|---------|
| 1 | :0 | ✅ 🔧 PersonalOSCaseStudy | Personal OS 核心哲学：right aspects of memory × right aspects of agents |
| 2 | :1 | ✅ 🔧 PersonalOSCaseStudy | 产品本体论分析（product-ontological-analysis skill） |
| 3 | :2 | ✅ 🔧 PersonalOSCaseStudy | 零到一人机 UX 导体（zero-to-one-human-machine-ux-conductor skill） |

---

### IX · `/agentic-design-development/ai-interior-system` — AI 室内设计系统

| 页 | SLIDE | 状态 | 内容摘要 |
|----|-------|------|---------|
| 1 | :0 | ✅ 🔧 AiInteriorSystemCaseStudy | 问题重构：从"生成房间"到"理解生活方式" |
| 2 | :1 | ✅ 🔧 AiInteriorSystemCaseStudy | 语义结构设计：用户-空间-家具三者关系 |

---

## PROJECT 01 · `/jidu-hmi`

| 路由 | SLIDE_COUNTS | 状态 |
|------|:---:|------|
| `/jidu-hmi/unity3d-camera` | 4 | ✅ 全部注册 |
| `/jidu-hmi/3d-map` | 4 | ✅ 全部注册 |
| `/jidu-hmi/avp` | 1 | ✅ 全部注册 |
| `/jidu-hmi/dashboard-layout` | 1 | ✅ 全部注册 |
| `/jidu-hmi/minimap-camera` | 1 | ✅ 全部注册 |
| `/jidu-hmi/3d-map-gesture` | 1 | ✅ 全部注册 |
| `/jidu-hmi/3d-map-driving-component-states` | 3 | ✅ 已注册（:0–:2）|

**孤立文件：**
- 🚫 `H5DocContent3dMapDrivingComponentStatesSlide04.tsx` — placeholder，未注册
- 🚫 `H5DocContent3dMapDrivingComponentStatesSlide05.tsx` — placeholder，未注册

---

## PROJECT `/web-design-develop`（⚠ 未在 projectRegistry 注册，导航不可见）

| 路由 | SLIDE_COUNTS | 状态 | 备注 |
|------|:---:|------|------|
| `/web-design-develop/overview` | 1 | ✅ 内容存在 | 未在 projectRegistry，首页不可见 |
| `/web-design-develop/component-framework` | 1 | ✅ 内容存在 | 同上 |
| `/web-design-develop/key-pages` | 2 | ⚠ slide:0 无内容 | slide:1 是 Demo iframe（isPhoenixKeyPagesDemoSlide） |
| `/web-design-develop/semantic-system` | **1** → 应为 **3** | ⚠ slide:1–2 不可达 | 三页内容均已注册但 SLIDE_COUNTS 未修复 |
| `/web-design-develop/fuli-plus` | — | ~~已清除~~ | 遗留路由，2026-05-14 完全移除（ROUTE_DEPTH / SLIDE_COUNTS / PAGE_META / sectionMap / FuliPlusCaseStudy 分支均已删除） |

---

## PROJECT 03 · `/academic-gamification`

| 路由 | SLIDE_COUNTS | 状态 | 内容摘要 |
|------|:---:|------|---------|
| `/academic-gamification/companions` | 2 | ✅ 🔧 自定义 handler | 伙伴音乐世界互动体验 |
| `/academic-gamification/simbiocity` | 1 | ✅ 已注册 | 程序化城市生成 + 智能体模拟 |
| `/academic-gamification/fortnite-demo` | 1 | ✅ 已注册 | Fortnite 游戏化原型演示 |

---

## 待办清单

- [ ] `/agentic-design-development/agentic-driving`：补加 SLIDE_COUNTS 7
- [ ] `/web-design-develop/semantic-system`：SLIDE_COUNTS 1 → 3
- [ ] `/web-design-develop/key-pages`：确认 slide:0 是否需要内容，或 SLIDE_COUNTS 改为 1
- [ ] `/web-design-develop/driving-authority-contracts`：确认 inlineChildRoute 机制是否正常
- [ ] Language Diary Slide06/07：确认是否接入还是删除
- [ ] DrivingComponentStates Slide04/05：确认是否接入还是删除
- [ ] `/web-design-develop` 整体：确认是否重新加入 projectRegistry 导航
