---
type: benchmark_seed
sheet: 01_Benchmark_Seeds
family: "辅助驾驶"
cluster: "纵向控制"
prototype_abstraction: "ACC / TACC / 跟停起步 / 跟车距"
---

# ACC / TACC / 跟停起步 / 跟车距

## 能力族
辅助驾驶 / 纵向控制

## Prototype 抽象
ACC / TACC / 跟停起步 / 跟车距

## Tesla 官方锚点
Traffic-Aware Cruise Control：可调跟车距离；可按当前限速或当前车速激活；支持 speed offset。

## 小鹏 官方锚点
ACC：前车存在时可 0 速激活；设定速度 30~120km/h；跟车距离按时间间隔选择。

## 理想 官方锚点
ACC：0~130km/h；跟车、跟停、起步。

## Prototype 启发
把“速度 / 跟车距 / 起步逻辑”拆成独立策略参数，可作为显式偏好 + 隐式学习入口。

## 来源 URL（官方）
https://www.tesla.com/ownersmanual/model3/en_us/GUID-DA920829-F1FA-44F9-8754-6D914C524A79.html | https://www.xiaopeng.com/instruction_book/21069?type=page | https://www.lixiang.com/autoinfo/user-manual-app/l9maxhelp2023-app/topic-2022-4C8E6682-011.html
