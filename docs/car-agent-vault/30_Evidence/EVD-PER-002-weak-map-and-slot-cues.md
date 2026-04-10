---
id: EVD-PER-002
type: evidence
name: 弱图空间 / 车位相关线索
source: perception
strength: medium
related_scenes:
  - SCN-ROD-007
related_behaviors:
  - BEH-IMP-001
feeds_workflows:
  - WF-PRK-004
can_trigger_hmi:
  - HMI-CFM-003
used_by_capabilities:
  - CAP-PRK-001
confidence_notes: 需要结合用户行为与导航上下文，避免把普通低速环境误判为停车意图。
---

# Summary

包括车位线、墙体距离、空位可能性等空间线索。

# Interpretation boundary

这是环境证据，不是意图证据。

# Failure mode

如果只因为检测到车位线就切泊车交互，会造成误触发。
