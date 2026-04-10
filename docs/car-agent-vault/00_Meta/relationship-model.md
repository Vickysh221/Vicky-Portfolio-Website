# Relationship Model

## 核心关系链

```text
Behavior
  happens-in -> Scene
  interpreted-by -> Evidence
  influences -> Capability
  may-learn-into -> Memory
  constrained-by -> Policy
  surfaced-through -> HMI
```

但真正使用时，不是每条链都要线性走完。
更常见的是以下几类关系图。

---

## 1. 行为 → 记忆 → 能力

适用于偏好学习。

例如：
- 用户取消自动变道
- 进入负反馈 episode memory
- 逐步形成变道时机偏好
- 最后影响路线级提前选道或 Auto Lane Change 的触发时机

关系表达：
- `Behavior -> Memory`
- `Memory -> Capability`
- `Capability -> Policy`

---

## 2. 场景 + 证据 → Workflow → HMI / Capability

适用于歧义消解。

例如：
- 地库弱图空间
- 接近终点 + 搜位 gaze + 轻刹
- 进入证据融合窗口 workflow
- 输出轻量确认卡片，或触发停车搜索能力

关系表达：
- `Scene -> Evidence`
- `Behavior -> Evidence`
- `Evidence -> Workflow`
- `Workflow -> HMI`
- `Workflow -> Capability`

---

## 3. Policy 横向约束所有层

Policy 不只是连 Capability，也会直接约束：
- 哪种 memory 不得被学习
- 哪种 HMI 不得在高风险场景出现
- 哪种 evidence 组合不足以触发自动动作

关系表达：
- `Policy -> Capability`
- `Policy -> Memory`
- `Policy -> HMI`
- `Policy -> Workflow`

---

## 4. HMI 不是终点，而是责任表面

HMI 节点不只是显示结果。
它承担：
- responsibility state 可见化
- 确认 / 驳回
- 接管 / 退场
- 学习回放
- 记忆治理

所以 HMI 可以反向影响：
- `HMI -> Behavior`（用户确认 / 修改 / 拒绝）
- `HMI -> Memory`（删除 / 永不学习 / 编辑范围）

---

## 5. 最小关系要求

每个实体 note 至少要有 2 条关系：

- Behavior：至少连 Scene / Evidence 中的一类
- Scene：至少连 Capability / Policy 中的一类
- Evidence：至少连 Scene / Behavior / Workflow 中的两类之一
- Capability：至少连 Policy + HMI 或 Memory
- Memory：至少连 learned_from + affects
- Policy：至少连 constrained_entities
- HMI：至少连 trigger + responsibility_state

如果一个 note 没有关系，它就不是 vault 中有效的知识节点。
