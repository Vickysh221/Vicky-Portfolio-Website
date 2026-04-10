---
id: HMI-CFM-003
type: hmi
name: 轻量确认卡片
surface_type: confirm
triggered_by:
  - WF-PRK-004
visible_to: driver
load_condition: low
persistence: event_based
responsibility_state: driver-retained / system-suggesting
related_capabilities:
  - CAP-PRK-001
related_memories: []
related_policies:
  - POL-SAF-001
  - POL-CON-002
---

# Summary

在证据融合后，以低打扰方式确认系统对用户意图的解释。

# What this surface must communicate

不是“系统已经知道你要做什么”，而是“系统基于当前证据形成了一个可确认的方向”。

# What it must not interrupt

它不应在高负荷或高显著安全交互时与接管 / 警报竞争。
