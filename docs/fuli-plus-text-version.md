# Fuli Plus 纯文字版

基于路由 `/agentic-design-development/fuli-plus` 的页面内容整理。本文将案例页与 H5 文档中的核心文案合并为一个连续阅读的纯文字版本，去除图片、视频与交互展示，只保留项目叙述、系统机制与方法说明。

## 项目概述

Fuli Plus 是一个面向织物、地毯、图案设计场景的 AI 协作设计系统。它关注的不是单次出图，而是如何把用户模糊的语言、参考图里的线索，以及一轮轮反馈中的微小判断，转成可比较、可推进、可收敛的设计方向。

它不是一个普通的图案生成工具，也不是一个找相似图的检索系统。它要解决的问题是：当用户的偏好是模糊的、形成中的、难以一次说清楚的时候，系统如何通过多轮探索、反馈解释与状态更新，逐步逼近真正想要的设计方向。

Fuli Plus 的一句话定义是：把用户模糊审美偏好持续转译为 design state，并通过多轮反馈逐步收敛设计方向的地毯与图案设计系统。

它不是什么：

- 不是固定参数面板调图工具
- 不是一次性 prompt 生图系统
- 不是以“最像原图”为目标的相似图检索器

## 行业背景与问题

在 Midjourney、Stable Diffusion、Firefly 等 AI 图像生成工具被广泛用于设计领域之后，织物、地毯、图案设计暴露出一个更本质的问题：用户输入通常是情绪化、模糊且零散的，例如“温馨”“治愈”“有点跳出来”，很难直接转译为稳定、可复用的设计语言。

在传统定制地毯流程里，用户真实输入往往是模糊的语义：

- “我想做个有植物风格的地毯”
- “整体高级一点，别太满”
- “这张感觉对了，但布局再看看”

工作流中的摩擦主要在于：

- 销售难以把用户的话转成可继续讨论的方向
- 设计师要在参考图、材料感和图案组织之间反复翻译
- 客户往往需要在多轮样图后才能逐渐接近预期
- 这个过程显著增加了设计时间成本

现有方式的局限：

- 直接转 Prompt，容易生成写实或插画化结果，不适合织物语言
- 结果风格漂移严重，难以形成可复用的设计路径
- 用户只能凭感觉反复试错，没有学习与收敛机制
- 系统无法有效利用“喜欢 / 不喜欢”反馈去判断问题究竟出在哪个设计维度

核心问题是：如何构建一个既支持探索、又支持逐步收敛的图案生成系统，让用户通过低负担反馈逼近理想风格，同时让系统判断当前主要问题来自哪个设计维度，并把结果沉淀为可复用的设计状态，而不只是一次性图片。

## 核心用户诉求

在地毯与图案设计场景中，用户往往无法一开始就把需求完整表达成精确参数。他们更常说的是“有点温暖”“不要太跳”“我喜欢这个感觉但不想照着来”。这类需求不是明确 specification，而是形成中的判断。

核心用户诉求包括：

- 我想先看不同方向，而不是一开始就被系统锁到一种局部答案
- 我不一定知道自己想要什么，但我能通过比较说出“这个方向更对 / 那个方向不对”
- 系统最好帮我发现可能性，而不只是重复我已经给出的原图
- 最终沉淀下来的应该是可复用的设计状态，而不只是单张图片

## 产品目标与非目标

核心目标：

- 将用户自然语言、选择与参考图映射为结构化的设计槽位状态
- 通过多维度并行探索的瀑布流，提供可比较的设计变体
- 通过喜欢 / 不喜欢反馈，判断当前设计主因
- 动态调整下一轮生成策略，逐步锁定风格方向
- 最终沉淀为稳定的参数组合与可复用的 Prompt / Style State

非目标：

- 不直接输出生产工艺文件
- 当前阶段不引入价格、打样成本等商业约束
- 不追求一次命中，而强调探索到收敛的过程质量

## 系统总体框架

项目被重构为两阶段系统。

第一阶段负责把模糊输入翻译成方向空间。它不急于给出答案，而是给出几条足够有差异、但仍在同一问题域内的起点。

第二阶段负责沿已选方向继续生长。它避免每一轮都从头开始，而是在已有方向上继续 refinement，让系统逐步稳定对用户偏好的理解。

总体流程可以概括为：

用户输入（语言 / 选择 / 参考图）  
→ 意图解析  
→ 初始槽位状态建立  
→ 变体调度器生成一轮多维度探索  
→ 用户轻量反馈  
→ 反馈聚合与主因判断  
→ 槽位状态更新  
→ 下一轮更聚焦的推荐

## 两种输入模式

### 上传图模式

上传图模式并不是 image similarity mode。原图更像一个 anchor state：系统不是帮用户找最像的图，而是围绕原图去构造“保留某一层、打开其他层”的可能性。

系统真正要问的是：

- 用户到底想保留的是 motif、arrangement、style，还是整体 mood
- 原图只是起点，不是答案
- 系统提供的是 anchored possibility exploration，而不是原图复制

### 语言模式

语言模式也不是 parameter guessing。用户通常一次只能说清一两个维度，所以第一轮更适合做 dimensional probing：分别沿 color、motif、arrangement、style、impression 去试探用户真正关心的层。

这样设计的原因是：

- 用户不擅长先给完整答案，但擅长在比较中发现偏好
- 系统要先帮用户看见不同方向，而不是过早收敛
- 语言输入的价值是建立初始 state，而不是一次性精确 specification

## 为什么 generic image generation 不够

生成地毯这件事，难点从来不只是“画面漂不漂亮”。很多图单看并不差，但一旦放到地毯这个媒介里，就会显得太像插画、太像装饰画，或者只是把参考图换了一种方式重说一遍。

一个专业地毯设计师真正会做的判断包括：

- 不先看画了什么，而先看这些意向最后有没有被整理成图案语言
- 判断这些意向能被转义成什么地毯设计语言，是靠骨架、密度还是关系成立
- 同时考虑边缘、纹理、疏密、浮雕感等图案与工艺结合后的效果
- 判断当前方向是否还有进一步探索空间，而不是只看第一眼是否好看

有些图第一眼很好看，但没有后劲；再做一轮就散。真正好的方向，往往是骨架已经立住、逻辑已经清楚，后面还能继续调密度、调节奏、调重心，而不用每次都重新来过。

## 槽位系统与 Design State

Fuli Plus 引入 slot / design state，不是为了更准确地找近邻，而是为了可控地制造差异，并让差异有可解释的维度结构。

当前 design state 的基础结构包括：

- first-order: color / motif / arrangement
- second-order: impression / style

其中，first-order 负责主要可见差异，second-order 是调制层。

系统将图案生成中的关键设计维度抽象为一组槽位。槽位既是系统判断与推荐决策的最小单位，也是 Prompt 生成与反馈收敛的变量来源。这样用户说的就不再只是模糊感受，而会被逐渐映射成可操作的设计状态。

对用户而言，槽位降低了表达负担；对系统而言，槽位提供了判断“问题出在哪个维度”的抓手；对后续复用而言，槽位让设计结果从单张图提升为可继承、可迁移的状态表示。

## 第一轮探索为什么不是“给答案”

用户给出的通常不是完整 brief，而是一组混合着情绪、场景、审美倾向和局部限制的模糊语义。系统的第一步不是把这些话直接翻成一句 prompt，而是先判断哪些信号已经足够明确，哪些仍然含混，然后围绕同一个输入展开三条可以比较的设计方向。

第一轮真正要解决的不是“生成”，而是“展开方向空间”。它至少包含三步：

- semantic intake：把“温暖、自然、别太甜、适合客厅”这类混合输入拆成 impression、arrangement、motif、color restraint、material expectation 等不同层的信号
- ambiguity detection：判断哪些维度已经相对明确，哪些维度仍然冲突或空白
- three-lane hypothesis：产出的不是三个 prompt 版本，而是三条共享同一输入来源、但强调点不同的设计假设

为什么第一轮必须是方向而不是答案：

- 用户最擅长的是比较，而不是一开始就给出完整 specification
- 模糊语义里常同时混着 mood、结构倾向和材料期待，不能一次性压成单一路径
- 第一轮要建立的是可继续 refinement 的判断基础，而不是一次命中

## 瀑布流探索与假设生成

用户往往很难准确说出“问题在哪”，但非常擅长做相对判断：这个更好、那个不对、颜色不喜欢、节奏太乱。因此系统不要求用户先把设计语言说清楚，而是通过瀑布流并行生成多个可比变体，把判断负担从“描述”转为“选择”。

生成原则是：

- 固定已确认方向的槽位
- 在一到两个槽位上制造可感知差异
- 每张图都代表一个明确的设计假设

例如在同一轮中，某个变体只改变 Impression，另一个对 Impression 与 Color 做轻微联动，第三个只改变 Color。这样用户的反馈就不再只是“我就是不喜欢”，而是在系统内部变成了可判断的维度信号。

## 用户反馈闭环

系统核心不是“出图”，而是把用户的 like / dislike 转成 design state 的更新信号。

每张生成图只提供两种低负担反馈：喜欢或不喜欢。系统不强迫用户解释原因，因为用户的审美判断通常先于语言解释发生。

反馈闭环可以理解为：

user input / reference  
→ initial slot state  
→ one round of cards  
→ like / dislike  
→ evidence extraction  
→ reducer / state update  
→ next round

如果用户在同一轮瀑布流中，对某一槽位维度表现出一致反馈，系统就会判断这个槽位是当前的主要问题来源。Reducer 不是简单均值器，而是把 feedback、evidence、operator、next state 组织成可收敛的机制。

## 地毯语言到底是什么

这里的“地毯语言”不是普通视觉风格词，而是可以进入 rug 判断的表面、结构与工艺特征。例如：

- pile height contrast
- tuft density rhythm
- edge softness
- carved relief
- cluster spread
- surface sheen bias

语义词必须先被翻译成这些 rug-specific features，系统才有办法稳定地控制生成。

## 三条方向如何拉开差异

同一句输入下，三个方向不会平均地改所有变量。系统会给每条方向分配不同的主导维度。

Direction A｜organic flow  
重点放在 arrangement、movement path 与 breathing pocket。它更像让图案先通过流动路径成立，再决定 motif 如何附着进去。

Direction B｜calm structure  
重点放在 arrangement、style restraint 与 motif abstraction。它压低叙事性，让结构秩序和整体克制感更先被读到。

Direction C｜tactile richness  
重点放在 material feel、surface depth 与 local cluster texture。它不是单纯“更丰富”，而是把 rug 的表面关系推到前台。

三个方向共享同一个语义起点，但不会平均改所有维度。真正起作用的是：每条方向优先推动哪个维度，哪些维度保持支持层，哪些维度暂时被压低。这样出来的 3 个方向才会既相关，又足够有区分度。

## 从模糊语义到可执行提示的编译链

系统不是把中文直接翻译成英文 prompt，而是先做一条 semantic-to-rug compilation chain。

核心链路包括：

1. semantic intake
2. certainty vs ambiguity
3. three direction hypotheses
4. per-direction state weighting
5. rug-language translation
6. generation prompt assembly

其中，prompt 只负责把已经确定的方向组织成模型可执行的外部表达。真正的方法，发生在 prompt 之前。

Prompt 在这个系统里，不是创意来源，而是 design state 的外部序列化。

系统真正保留下来的不是一句 prompt，而是一组 design state：哪些维度已经被确认，哪些材质关系必须保留，哪些变量下一轮仍然开放。prompt 只是这些状态面向模型的一种外部表达。

## Case05：Fish and Lotus

这个案例的用户输入是：保留鱼和荷的意向，但不要太像传统花鸟图；整体更适合地毯，并带一点流动感和结构感。

系统没有把它理解成传统花鸟 motif，而是更偏向路径化植物单元、流动节奏和有机组织关系。它把这个输入理解成一组可重新组织的母体关系：

- 鱼的流动
- 荷叶的展开
- 两者之间的疏密和方向

更适合进入地毯语言的，并不是对象本身，而是这些关系。

系统在这个案例中做出的初步 bucket 判断包括：

- Primary Bucket: leaf-chain unit grammar
- Secondary Bucket: density-gradient textile field
- Supporting Bucket: soft-node network

### 第一轮方向展开

同样的输入下，系统没有生成三张轻微不同的图，而是明确展开了三种不同的组织方法：

Warm Cluster Drift  
更偏聚簇的组织方式，把鱼与荷的意向压进较温和的团簇节奏里。

Vertical Organic Lattice  
更强调纵向路径和有机骨架，主体由结构节奏而不是题材描画来成立。

Leaf-and-Current Field  
更偏场域与流动，鱼与荷退到背景，留下更连续的叶片与水流关系。

第一轮的意义不是直接命中最终结果，而是把同一个主题展开成几个真正可比较的方向。到这一步，系统帮助用户看见方向空间：哪些版本更依赖题材，哪些更依赖结构，哪些更适合作为后续 refinement 的起点。

### 用户选择后的系统收束

当用户选中 Vertical Organic Lattice 之后，系统确认的不是“第二张图更好看”，而是一种更适合继续推进的成立方式。

这次选择让系统确认了几件事：

- 主体更适合通过结构节奏来建立，而不是通过具体形象来建立
- 纵向路径和有机骨架开始成为更稳定的组织主线
- 这一方向更容易继续 refinement，因为之后可调整的是密度、开合、重心和表面节奏，而不必重新定义主题

到这一步，鱼与荷依然存在，但它们更多作为结构来源，而不是直接被描绘的对象。系统因此可以把“用户喜欢第二张图”重新理解成“用户认可这条结构主线值得继续长下去”。

进入下一轮后，变化重点不再是“鱼和荷要不要继续出现”，而是围绕已经确认的结构语言，继续调整密度、开合、重心和表面节奏。

## Semantic Cue 与品牌加强层

品牌图像在 second-stage 中不是单纯做风格迁移，而是作为品牌边界内的 semantic reinforcement。

这些品牌历史图像如果只被拿来做表面相似匹配，系统借到的通常只是“像不像”，而不是对 rug 真正有用的判断层。更合理的做法是把它们 reverse-read 成 semantic cues，理解它们在主体形成、组织逻辑、密度节奏、边缘处理和表面语言上的整体取向。

semantic cue module 在 second-stage 中的作用：

- 根据用户描述与当前选中的意向，确定这一轮已经被认可的方向
- 去品牌匹配库里找那些 slot parameter vectors 整体取向接近、DNA 同向的案例
- 匹配目标不是视觉相似，而是 semantic structure 是否同向
- 这些 cues 作为 prompt 组装前的一层 reinforcement，帮助下一轮 variation 更稳定地收束

因此，它服务的不是风格迁移，而是 brand-bounded design control。

## 资产图角色的变化

如果 early rounds 只是 per-variant nearest retrieval，系统最终只会给出一组局部相近的图。用户看到的是一组微小扰动，而不是几种真正不同的方向。

新的方向是：early rounds 应该做 dimensional probing / anchored possibility exploration。系统先决定这一轮要 probing 哪些维度，再构造多个 keep / vary hypotheses，让每张卡都代表一个有张力的方向假设。

关键变化是：

- 资产图不再只是 nearest ref
- 资产图要成为 hypothesis carrier
- 用户点 like / dislike，不只是在评价图片，更是在评价一条方向假设

## Slot-state 映射层

如果 semantic bucket 只停在“这张图像像什么、气质接近什么”的命名层，它仍然很难真正进入生成系统。系统需要的不是一个好听的标签，而是一组能继续作用于结构、密度、边缘和表面关系的状态。slot-state 正是在解释与生成之间，把图像证据压成可工作的中间层。

代表性的 slot-state schema 包括：

- subjectFormationMode：主体形成方式
- motifAbstractionMode：母题抽象方式
- arrangementLogic：编排逻辑
- densityLogic：密度逻辑
- colorRolePackage：色彩角色包
- edgeBehavior：边缘行为
- surfaceDepthMode：表面深度模式
- pileHierarchy：绒高层级

这套 schema 不是为了字段越多越好，而是保留最能决定 rug 方向是否成立的核心状态。

### 代表性 bucket 映射

botanical apparition field  
主体不是被硬轮廓圈出，而是在层叠与显影中慢慢浮现出来。适合把植物感压进 rug 语言里，而不是直接生成一幅植物插画。

eroded lattice  
稳定网格仍然存在，但被局部侵蚀和扰动，因此秩序不会显得太硬。适合做可讨论的版面起点。

tonal texture field  
主体靠色阶、表面颗粒和轻微层差成立，而不是靠明确轮廓。它能把图像里的气氛保留下来，又不至于脱离 rug 更擅长处理的表面关系。

density-gradient textile field  
画面的节奏来自疏密变化，主体像被织出来，而不是被贴上去。这类映射很适合导向更有织物感的方向。

figure-fragment grammar  
主体以片段和残片的关系被读到，完整形象被故意拆开，只留下可继续组织的语法。它给系统留下足够大的二次生成空间，便于第一轮找方向，第二轮再控制收敛。

### 它如何进入整体 workflow

在第一阶段，slot-state 让多个方向拥有同一组核心语义，因此它们不会彼此跑成无关的答案。

共享约束通常是：

- 主体形成方式
- 边缘行为
- 表面深度模式

可被拉开的状态通常是：

- 编排逻辑
- 密度逻辑
- 色彩角色包
- 局部绒高关系

进入第二阶段后，slot-state 帮系统识别哪些 DNA 已经被选中，哪些字段仍然可以被温和推进。

locked DNA 通常包括：

- 主体成立方式
- 母题抽象方式
- 关键边缘行为

variable fields 通常包括：

- 密度分布
- 局部配色
- 表面深浅
- 局部编排节奏

## Towards an Agentic Project

当前项目已经从“参数 demo + 最近邻展示”推进到“带有 design state、反馈闭环、真实资产匹配和 early-round probing 实验的机制原型”。这一步最重要的变化不是系统终于“更像一个 agent”了，而是 rug-specific semantic layer 已经逐渐成形：用户输入、参考图、品牌 cue 和多轮反馈，第一次可以被压到同一组可比较、可收束的中间状态里。

也正因为这层结构开始稳定，agent 的下一步才第一次变得可被精确定义。它不再只是一个会话壳，也不只是负责理解泛化意图，而是要开始承担更清楚的 orchestration 工作：

- 判断当前反馈落在哪个对象层级
- 区分 lane switch 与 same-lane refinement
- 识别哪些槽位已经收束成 locked DNA
- 决定这一轮应继续 exploration 还是进入 second-stage control
- 在用户偏好与品牌 DNA 之间组织更稳定的 semantic reinforcement

因此，下一阶段不是继续抽象讨论 agent，而是把它具体设计成一个服务于 semantic control 的 design orchestration system。

## 总结

Fuli Plus 的核心价值，不是把一句模糊描述翻成一张图，而是把“形成中的审美偏好”持续建模成 design state，让探索、选择、反馈与 refinement 成为一条可连续工作的路径。

在这个系统里：

- 第一轮负责展开方向空间，而不是制造错觉式答案
- 用户反馈不是点选结果，而是在帮助系统识别设计维度
- prompt 不是方法本体，而只是最终的外部表达
- 真正可复用的资产不是单张图片，而是一组能被持续更新和调用的 design state
- agent 的下一步价值，在于组织这些中间状态，使多轮设计收束成为稳定、可解释、可操作的过程
