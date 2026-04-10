---
id: BEH-IMP-001
type: behavior
name: 地库低速轻刹
signal_type: implicit
learnable: false
risk: medium
possible_intent:
  - 避险
  - 搜位
  - 准备泊车
scene_bias:
  - SCN-ROD-007
related_scenes:
  - SCN-ROD-007
related_evidence:
  - EVD-NAV-001
  - EVD-PER-002
  - EVD-DMS-004
influences_capabilities:
  - CAP-PRK-001
may_learn_into: []
constrained_by:
  - POL-CON-002
  - POL-SAF-001
surfaced_through:
  - HMI-CFM-003
---

# Summary

地库中的低速轻刹本身不是一个足够强的单独信号，它既可能是危险响应，也可能是搜位或泊车意图的一部分。

# Why it matters

这是一个典型的高歧义行为，适合作为“先判断、再打扰”的 agent 思维示例。

# What the system should not over-interpret

系统不应把一次轻刹直接解释成“准备泊车”，更不应立刻切换到高侵入的泊车交互。
