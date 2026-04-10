---
id: POL-CON-002
type: policy
name: Confidence Gate
rule: 低置信度 + 高风险动作不得自动执行。
immutable: true
constrained_entities:
  - WF-PRK-004
  - CAP-PRK-001
  - MEM-PRF-002
related_scenes:
  - SCN-ROD-007
related_hmi:
  - HMI-CFM-003
related_workflows:
  - WF-PRK-004
priority: hard
---

# Summary

把证据不足但又有动作诱惑的场景挡在自动执行之前。

# Why this policy exists

agent 可以探索，但不能在低置信高风险时替用户做主。

# What it overrides

它优先于偏好学习和服务编排欲望。
