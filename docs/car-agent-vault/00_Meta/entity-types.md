# Entity Types

## 1. Behavior

用户在具体场景中的动作、纠正、取消、接管、偏好暴露与重复微调。

例子：
- 提前两三个路口变道
- 自动变道时手动取消
- 在雨天主动降速
- 地库低速轻刹

核心问题：
- 这是显式还是隐式信号？
- 是稳定偏好，还是一次性反应？
- 能不能学？该不该学？

---

## 2. Scene

行为和判断发生的上下文。包括道路结构、天气、旅程阶段、车辆状态、舱内状态、是否高负荷、是否接近任务切换等。

例子：
- 地库 / 地下停车场
- 服务区前
- 弱图空间
- 高速匝道入口
- 充电驻车中

核心问题：
- 这是高歧义还是低歧义场景？
- 允许哪些 mode？
- 哪些能力在这里要降级？

---

## 3. Evidence

系统用来解释 scene 和 behavior 的证据，而不是原始传感堆积。

例子：
- 接近终点
- 检测到车位
- gaze 搜位
- 盲区有车
- DMS 注意力不足

核心问题：
- 这是弱证据还是强证据？
- 它和哪个 scene / behavior 关联？
- 它会触发什么 workflow？

---

## 4. Capability

系统可执行、可调节或可编排的能力。

例子：
- Following Distance
- Auto Lane Change
- Parking Slot Search
- Speed Offset
- Memory Parking
- Post-drive Review

核心问题：
- 它是否 learnable？
- 风险级别如何？
- 受哪些 policy 约束？

---

## 5. Memory
n
系统保留下来的不是原始数据，而是经过约束后的可作用知识。

例子：
- episode memory
- preference memory
- route memory
- scene-bound rule
- do-not-learn list

核心问题：
- 这条记忆从什么行为 / workflow 学来？
- 影响哪些 capability？
- 置信度多高？
- 是否可编辑 / 可删除 / 可过期？

---

## 6. Policy / Permission

约束系统自动化边界、学习边界和数据边界的规则层。

例子：
- Safety Envelope
- Confidence Gate
- Parked-only Media
- On-device First
- Cloud Sync Permission
- Memory Manager

核心问题：
- 这条规则是不是 immutable？
- 它约束的是 capability、memory，还是 HMI？
- 它在哪些 scene 下更严格？

---

## 7. HMI

把责任状态、解释、确认、警示、记忆候选与接管信息呈现给人的界面层。

例子：
- 驾驶责任条
- 轻量确认卡片
- takeover alert
- post-drive review card
- memory manager surface

核心问题：
- 这是谁看的？
- 在高负荷还是低负荷时出现？
- 是持续可见还是事件触发？
- 它解释的是 capability、memory，还是 policy？
