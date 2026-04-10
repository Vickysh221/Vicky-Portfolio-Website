---
id: POL-SAF-001
type: policy
name: Safety Envelope
rule: 高风险动作必须在安全包络内执行；超出安全包络时，系统应退回更保守逻辑或请求接管。
immutable: true
constrained_entities:
  - CAP-PRK-001
  - CAP-LAT-003
  - CAP-LON-002
  - MEM-PRF-002
related_scenes:
  - SCN-ROD-007
related_hmi:
  - HMI-CFM-003
  - HMI-ALT-001
related_workflows:
  - WF-PRK-004
priority: hard
---

# Summary

这是所有学习、自动执行与服务编排之上的硬约束。

# Why this policy exists

系统不能因为 agent 化而越过安全边界。

# What it overrides

它可以覆盖偏好学习结果，也可以压制 companion 式交互。
