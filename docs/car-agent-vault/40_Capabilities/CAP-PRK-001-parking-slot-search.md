---
id: CAP-PRK-001
type: capability
domain: parking
subdomain: slot_search
name: Parking Slot Search
triggers:
  - WF-PRK-004
learnable: false
risk: medium
related_scenes:
  - SCN-ROD-007
related_behaviors:
  - BEH-IMP-001
related_evidence:
  - EVD-NAV-001
  - EVD-PER-002
  - EVD-DMS-004
affected_by_memories: []
policies:
  - POL-CON-002
  - POL-SAF-001
hmi_surfaces:
  - HMI-CFM-003
---

# Summary

在地库 / 弱图空间中，根据证据融合结果进入的停车相关能力。

# What this capability can do

在低速、低风险前提下，协助系统进入更接近泊车任务的搜索状态。

# What it must never do automatically

在证据不足或风险升高时，不应直接把用户拖入泊车流程。
