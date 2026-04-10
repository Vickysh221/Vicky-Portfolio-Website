---
type: benchmark_seed
sheet: 01_Benchmark_Seeds
family: "辅助驾驶"
cluster: "变道"
prototype_abstraction: "ALC / Auto Lane Change / 变道策略"
---

# ALC / Auto Lane Change / 变道策略

## 能力族
辅助驾驶 / 变道

## Prototype 抽象
ALC / Auto Lane Change / 变道策略

## Tesla 官方锚点
Auto Lane Change：Autosteer 激活时配合转向灯执行相邻车道变换。

## 小鹏 官方锚点
ALC：基于 LCC；65~120km/h；需要盲区辅助开启；由打灯触发。

## 理想 官方锚点
NOA 持续优化自主变道时机；手动取消后会延迟下一次自动发起。

## Prototype 启发
把‘谁发起变道’和‘系统如何博弈时机’拆分：用户发起 / 系统建议 / 系统执行 / 用户取消。

## 来源 URL（官方）
https://www.tesla.com/ownersmanual/models/en_qa/GUID-20F2262F-CDF6-408E-A752-2AD9B0CC2FD6.html | https://www.xiaopeng.com/instruction_book/785?type=page | https://www.lixiang.com/community/detail/article/1436914.html
