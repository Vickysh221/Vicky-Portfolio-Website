# ID Convention

## Prefixes

- `BEH-` Behavior
- `SCN-` Scene
- `EVD-` Evidence
- `CAP-` Capability
- `MEM-` Memory
- `POL-` Policy
- `HMI-` HMI surface
- `WF-` Workflow
- `REF-` Reference

## Suggested sub-prefixes

### Behavior
- `BEH-IMP-` implicit behavior
- `BEH-EXP-` explicit behavior
- `BEH-COR-` corrective behavior
- `BEH-SPD-` speed-related behavior
- `BEH-ROU-` route / lane behavior

### Scene
- `SCN-ROD-` road scene
- `SCN-WEA-` weather scene
- `SCN-TRJ-` journey phase
- `SCN-CAB-` cabin state

### Evidence
- `EVD-NAV-` navigation evidence
- `EVD-PER-` perception evidence
- `EVD-DMS-` driver-monitoring evidence
- `EVD-VEH-` vehicle-state evidence

### Capability
- `CAP-LON-` longitudinal
- `CAP-LAT-` lateral
- `CAP-ROU-` route planning
- `CAP-PRK-` parking
- `CAP-HMI-` HMI/system service

### Memory
- `MEM-EPI-` episode memory
- `MEM-PRF-` preference memory
- `MEM-ROU-` route memory
- `MEM-RUL-` scene-bound rule
- `MEM-DNL-` do-not-learn list

### Policy
- `POL-SAF-` safety policy
- `POL-CON-` confidence policy
- `POL-DAT-` data / permission policy
- `POL-HMI-` HMI policy

### HMI
- `HMI-STA-` status surface
- `HMI-CFM-` confirmation surface
- `HMI-ALT-` alert surface
- `HMI-REV-` review surface
- `HMI-MEM-` memory manager surface

### Workflow
- `WF-PRK-` parking-related workflow
- `WF-LCH-` lane-change workflow
- `WF-REV-` review workflow
- `WF-MEM-` memory governance workflow

## Example

- `BEH-COR-004` 用户取消自动变道
- `SCN-ROD-007` 地库 / 地下停车场
- `EVD-DMS-004` 搜位 gaze
- `CAP-PRK-001` Parking Slot Search
- `MEM-PRF-002` Lane Change Timing Preference
- `POL-CON-002` Confidence Gate
- `HMI-CFM-003` 轻量确认卡片
- `WF-PRK-004` 证据融合窗口
