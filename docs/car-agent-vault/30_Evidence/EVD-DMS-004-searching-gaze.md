---
id: EVD-DMS-004
type: evidence
name: 搜位 gaze / 头部寻找行为
source: dms
strength: weak
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
confidence_notes: 属于弱证据；只适合参与融合，不适合单独触发任何自动动作。
---

# Summary

驾驶员头部 / 注视在地库中呈现寻找车位的行为模式。

# Interpretation boundary

DMS 证据适合作为弱信号减少打扰，不适合作为独立决策依据。

# Failure mode

把 gaze 过度解释为明确意图，既会误判，也会增加隐私越界风险。
