---
id: SCN-ROD-007
type: scene
name: 地库 / 地下停车场
road_type: weak_map
complexity: high
ambiguity:
  - 用户轻刹是危险还是找位
  - 该显示路线视角还是泊车相关视角
allowed_modes:
  - manual
  - parking_assist
  - memory_parking
related_behaviors:
  - BEH-IMP-001
related_evidence:
  - EVD-NAV-001
  - EVD-PER-002
  - EVD-DMS-004
available_capabilities:
  - CAP-PRK-001
stricter_policies:
  - POL-CON-002
  - POL-SAF-001
relevant_hmi:
  - HMI-CFM-003
---

# Summary

地库 / 地下停车场是弱图、高歧义、低速但高认知负荷的 scene。

# Why this scene is difficult

这里很多行为都带有多重意图，单一信号很容易被误判。

# What should degrade here

系统应降低对单一行为的自动解释冲动，优先进入证据融合与轻量确认。
