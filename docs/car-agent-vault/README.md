# Car Agent Vault

## 核心句

**当车开始像同伴一样观察人时，HMI 就不再只是驾驶界面，而同时变成安全界面、权限界面和学习界面。**

这个 vault 的目的不是罗列功能，而是把车上的能力、人的行为、道路 / 旅程场景、系统证据、可学习记忆、策略 / 权限与 HMI，组织成一套可以持续扩写的关系网络。

---

## 目标

先把车载 Agent 的系统拆成七类实体：

1. **Behavior** — 用户做了什么
2. **Scene** — 事情发生在什么道路 / 天气 / 旅程阶段 / 舱内状态里
3. **Evidence** — 系统凭什么判断
4. **Capability** — 系统能做什么
5. **Memory** — 系统究竟记住什么
6. **Policy / Permission** — 什么能自动做、什么该问、什么不能学、什么不能越界
7. **HMI** — 哪种信息该如何被看见、何时看见、由谁看见

重点不是把这些实体孤立存档，而是把它们之间的关系落清楚。

---

## 目录结构

```text
car-agent-vault/
  00_Meta/
    entity-types.md
    relationship-model.md
    id-convention.md
    ingestion-rules.md
  10_Behaviors/
  20_Scenes/
  30_Evidence/
  40_Capabilities/
  50_Memories/
  60_Policies/
  70_HMI/
  80_Workflows/
  90_References/
  templates/
    behavior.template.md
    scene.template.md
    evidence.template.md
    capability.template.md
    memory.template.md
    policy.template.md
    hmi.template.md
    workflow.template.md
```

---

## 关系模型一句话

这套 vault 的基础关系是：

**Behavior 发生在 Scene 中，被 Evidence 捕捉和解释，调用或影响 Capability，沉淀为 Memory，受 Policy / Permission 约束，并最终通过 HMI 被呈现、解释或收回。**

---

## 推荐先做的 3 个 workflow

1. 地库 / 弱图空间的停车意图证据融合
2. 自动变道被取消后的偏好学习
3. 行后记忆管理与确认

---

## 使用原则

- 不把原始传感数据直接当成知识节点
- 不把偏好学习等同于允许系统自动越权
- 不把记忆理解成“数据越多越好”
- 每个实体都必须带着关系进入 vault
- 高风险 + 低置信场景优先落 Policy，而不是先补 HMI 文案

---

## 从哪里开始

先读：
- `00_Meta/entity-types.md`
- `00_Meta/relationship-model.md`
- `00_Meta/id-convention.md`
- `00_Meta/ingestion-rules.md`

然后从一个 workflow 开始扩写，不要先试图铺满所有目录。
