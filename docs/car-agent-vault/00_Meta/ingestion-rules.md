# Ingestion Rules

## 1. 先判定实体类型，再建 note

不要看到一句材料就立刻落为 note。
先问：
- 它是行为？场景？证据？能力？记忆？策略？HMI？workflow？
- 它的主要作用是什么？
- 它更像独立节点，还是某个节点的字段？

## 2. 原始数据不直接入 vault

例如：
- 原始 gaze 坐标
- 原始 CAN 信号
- 连续视频帧
- 原始 GPS 轨迹

这些不是 vault note。
它们只能先被解释成 evidence / pattern，才进入 vault。

## 3. 偏好不等于立刻可学

任何 behavior 进入 Memory 前，都要先问：
- 它是否重复出现？
- 是否局部 scene-bound？
- 是否存在安全风险？
- 是否需要事后 review？

## 4. 高风险动作先落 Policy

对于：
- 速度放开
- 变道时机改变
- 高速跟车距压缩
- 低置信自动泊车导向

先写 Policy 和约束条件，再写 Capability 的学习逻辑。

## 5. 每个 note 必须可回到 workflow

如果一个实体无法进入任何 workflow，它大概率还只是概念标签，而不是可设计节点。

## 6. 每条记忆必须带治理字段

所有 Memory note 最少包含：
- learned_from
- scope
- confidence
- editable
- deletable
- expiry / decay（如果适用）
- affected_capabilities

## 7. HMI note 不能只写界面样子

HMI note 必须回答：
- 由谁触发
- 给谁看
- 在什么负荷下出现
- 是持续可见还是事件触发
- 它改变了什么 responsibility state

## 8. 先做 workflow，再扩实体

推荐顺序：
1. 选一个高价值 workflow
2. 找出其中的 Behavior / Scene / Evidence / Capability / Policy / HMI
3. 再沉淀为 Memory

不要先铺满 100 个孤立 note。
