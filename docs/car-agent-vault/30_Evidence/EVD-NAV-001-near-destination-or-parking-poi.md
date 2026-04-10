---
id: EVD-NAV-001
type: evidence
name: 接近终点 / 停车场 POI
source: nav
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
confidence_notes: 单独出现时不足以触发泊车导向，需要和空间及行为证据联合判断。
---

# Summary

导航层面的接近终点或停车场 POI，是停车意图的重要背景证据。

# Interpretation boundary

它只能增强某种解释，不足以单独证明用户要泊车。

# Failure mode

如果把这类导航证据直接等同于泊车意图，会导致过早打扰。
