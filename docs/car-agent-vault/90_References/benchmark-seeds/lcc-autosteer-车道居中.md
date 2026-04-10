---
type: benchmark_seed
sheet: 01_Benchmark_Seeds
family: "辅助驾驶"
cluster: "横向控制"
prototype_abstraction: "LCC / Autosteer / 车道居中"
---

# LCC / Autosteer / 车道居中

## 能力族
辅助驾驶 / 横向控制

## Prototype 抽象
LCC / Autosteer / 车道居中

## Tesla 官方锚点
Autosteer：在设速/设距基础上保持车辆处于当前车道。

## 小鹏 官方锚点
LCC：含低速 TJA + 高速 ICA，辅助转向并维持居中。

## 理想 官方锚点
LCC：0~130km/h；可识别红绿灯并在车道中通行。

## Prototype 启发
把“横向保持”与“信号灯响应”“路口通过”拆开建模，避免把 LCC 当成单一动作。

## 来源 URL（官方）
https://www.tesla.com/ownersmanual/model3/en_us/GUID-20F2262F-CDF6-408E-A752-2AD9B0CC2FD6.html | https://www.xiaopeng.com/instruction_book/759/ | https://www.lixiang.com/autoinfo/user-manual-app/l8prohelp2023-app/topic-2022-EFA9B416-007.html
