---
id: MEM-PRF-002
type: memory
name: Lane Change Timing Preference
memory_kind: preference
learned_from:
  - BEH-ROU-001
  - BEH-COR-004
scope:
  - 高速
  - 城市快速路
affected_capabilities:
  - CAP-ROU-001
  - CAP-LAT-003
constrained_by:
  - POL-SAF-001
  - POL-CON-002
editable: true
deletable: true
confidence: 0.72
expiry: review_based
---

# Summary

系统从多次变道相关行为与纠正中形成的偏好记忆。

# Why this memory exists

它不是为了让系统“更像用户”，而是为了在安全包络内更准确地判断用户偏好的变道时机。

# Governance notes

必须支持事后 review、编辑、删除，并避免把偶发行为误学成稳定偏好。
