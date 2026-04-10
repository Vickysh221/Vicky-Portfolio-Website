---
id: WF-PRK-004
type: workflow
name: 地库 / 弱图空间的停车意图证据融合窗口
entry_scene:
  - SCN-ROD-007
entry_behaviors:
  - BEH-IMP-001
required_evidence:
  - EVD-NAV-001
  - EVD-PER-002
  - EVD-DMS-004
invoked_capabilities:
  - CAP-PRK-001
resulting_hmi:
  - HMI-CFM-003
possible_memories: []
governing_policies:
  - POL-CON-002
  - POL-SAF-001
---

# Summary

在地库弱图空间里，系统不要因为一次轻刹就立刻弹出泊车模块，而应先进入一个短时证据融合窗口。

# Flow

- Scene：`SCN-ROD-007` 地库 / 地下停车场
- Behavior：`BEH-IMP-001` 地库低速轻刹
- Evidence：
  - `EVD-NAV-001` 接近终点 / 停车场 POI
  - `EVD-PER-002` 弱图空间 / 检测到车位相关线索
  - `EVD-DMS-004` 搜位 gaze / 头部寻找行为
- Capability：`CAP-PRK-001` Parking Slot Search
- HMI：`HMI-CFM-003` 轻量确认卡片

# Failure / fallback

如果证据不足，保持低打扰，不自动进入泊车导向；如果风险上升，则优先回到安全层提示，而不是继续 companion 式探索。
