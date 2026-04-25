# Aha Moment React 文案重构计划

**日期**：2026-04-25  
**文件**：`src/pages/SharedMemoryAhaCaseStudy.tsx`  
**范围**：page 1 全量重写 + page 2 开头加过桥段；不动 H5 iframe 内容

---

## 叙事脊柱

**A（主）场景透镜**：以两个真实时刻开场，每个场景用三段推出"这件事不可能在 app 里发生"的结论  
**B（嵌入）**：一个对照块，压缩成"如果只是 app vs 这两个场景告诉我的"  
**C（尾注）**：v1.0 → v2.0 → v3.0 迁移轨迹，小字一段

---

## Page 1 完整改写内容

### pageTitle（保留）
```
ZH: 共享记忆驱动的语言学习 Aha 时刻
EN: Shared-Memory Aha Moments for Language Learning
```

### pageGoal（改写）
```
ZH: 我在设计的不是一个语言 app，而是一个能在你一天里穿过不同 app 出现的 agent。语言学习，只是它第一次被严肃验证的场景。
EN: I am not designing a language app. I am designing an agent that can appear across different apps throughout your day. Language learning is simply the first scenario where this has been seriously tested.
```

### mainCopy（改写）
```
ZH: 最尖锐的语言学习时刻往往不在语言 app 里——它在你读一篇文章时、在你给朋友写回复时、在你为一段话反复改词却说不准语气时。那些时刻里，一个应用内的"practice"根本来不及。真正有价值的 agent 必须在那里，用你的记忆接你。
EN: The sharpest language-learning moments rarely happen inside a language app — they happen when you are reading an article, drafting a reply to a friend, or stuck on a phrasing that does not quite carry the tone you meant. An in-app practice flow cannot reach those moments. An agent that matters has to be there, with your memory, ready to meet you.
```

### contentBlocks（全量替换）

#### Block 1 · shortParagraphs · 场景一
```
title:
  ZH: 场景一 · 阅读时撞上"你一直想说却说不出"的那句
  EN: Scene 1 · Reading and hitting the exact phrase you could never quite say

items[0]:
  ZH: 你在小红书刷到一条 caption。里面有一句："I want my work to feel inevitable, not loud." 你愣了两秒——这恰好是你在 portfolio 里这两周反复改的那一段一直在试着表达的意思。你之前写的所有句子都没到位。
  EN: You scroll past a caption on social media and something stops you: "I want my work to feel inevitable, not loud." For two seconds you just sit with it — this is exactly what you have been trying to say in your portfolio drafts for the past two weeks. None of your sentences landed right.

items[1]:
  ZH: 这一刻你真正需要的不是把这个句子加进生词本，不是看一段语法解释——而是有人注意到"这句对你有意义，因为它精准接住了你最近没说清的那个意思"，然后安静地把它留下，晚上还能和你的 portfolio 草稿一起召回。
  EN: What you actually need is not a vocabulary card or a grammar note. You need someone to notice that this sentence matters to you — because it precisely catches the meaning you could not get out — and to quietly hold onto it so it can come back alongside your draft tonight.

items[2]:
  ZH: 这件事不可能在一个 language app 里发生。你不在 language app 里——你在小红书。"这句为什么对你有意义"这个判断，依赖的是另一个 app 里你的写作痕迹。没有跨 app 的共享记忆，系统只能把它当一个好看的句子。
  EN: This cannot happen inside a language app. You are not in a language app; you are on social media. Knowing why that sentence matters to you depends on evidence from another app entirely — your writing. Without shared memory across apps, the system can only see it as a pretty sentence.
```

#### Block 2 · shortParagraphs · 场景二
```
title:
  ZH: 场景二 · 回复时在两种说法之间犹豫
  EN: Scene 2 · Drafting a reply and stuck between two phrasings

items[0]:
  ZH: 你在 Slack 给一个英文母语的同事写消息。你想表达"我对这个方案有保留，但不想显得在挑刺"。写到第二句卡住——一种说法太硬，另一种太绕，两个你都不满意。
  EN: You are writing a Slack message to an English-speaking colleague. You want to say that you have reservations about a proposal but you do not want to come across as picking a fight. You get stuck at the second sentence — one phrasing is too blunt, the other too convoluted, and neither feels right.

items[1]:
  ZH: 你真正需要的不是翻译插件，也不是语法正确的三个候选——三个可能都对，但都不像"你"。你需要 agent 知道你和这个同事的关系调子、知道你在英语里一直想练的那个气质，给出的版本是"哪一个更像你想成为的那个表达者"，而不只是"哪一个语法没问题"。
  EN: A translation plugin is not what you need, nor are three grammatically correct options — any one of them might be perfectly correct but none of them sounds like you. You need the agent to know the tone of your relationship with this person, to know the quality of expression you have been working toward in English, and to offer a version that is closer to the writer you are trying to become rather than the one with the fewest errors.

items[2]:
  ZH: 这同样不可能在一个 language app 里发生。关系调子的判断在聊天记录里，语气偏好的积累在过去的写作痕迹里。没有跨 app 的连续人格，agent 的建议只能落到语法对错这种平庸层。
  EN: This also cannot happen inside a language app. Relationship tone lives in your chat history. Stylistic preference accumulates across your writing. Without a continuous persona across apps, the agent's suggestions can only reach the level of correctness, not character.
```

#### Block 3 · comparisonCards · 对照（B）
```
title:
  ZH: 如果只是一个 language app，vs. 这两个场景说明的
  EN: If this were just a language app, vs. what these two scenes reveal

items[0]:
  title:
    ZH: 如果只是一个 language app
    EN: If this were just a language app
  body:
    ZH: 用户主动打开才学习 · 一套学习记忆 · 单个 app 边界内 · 弹出提示 = 服务
    EN: Learning only when the user opens it · One set of learning memory · Bounded within a single app · Pop-up = service

items[1]:
  title:
    ZH: 这两个场景告诉我的
    EN: What these two scenes reveal
  body:
    ZH: 有价值的时刻不在 app 里 · 两类共生记忆（你是谁 + 你在练什么）· 跨 app 同一个 agent + 同一份理解 · 克制本身是设计
    EN: The valuable moments happen outside any app · Two coexisting memory types (who you are + what you are practicing) · Same agent across apps with the same understanding · Restraint is the design
```

#### Block 4 · shortParagraphs · 设计对象的结论（B 收口）
```
title:
  ZH: 这是这个项目真正的设计对象
  EN: This is what this project is actually designing

items[0]:
  ZH: 所以这不是"更聪明的语言 app"。当我开始严肃对待这些时刻里 agent 应该交付什么价值，我发现我实际在设计一个跨 app 的、有连续记忆的、有边界感的 agent。语言学习只是它第一次被验证的场景——因为语言学习是少数几个"必须发生在生活流里"的能力。
  EN: So this is not a smarter language app. When I began seriously asking what value an agent should deliver in those moments, I found I was designing a cross-app agent with continuous memory and a genuine sense of what it should and should not do. Language learning is simply the first scenario where this was put to the test — because language learning is one of the few capabilities that must happen inside the flow of life.
```

#### Block 5 · shortParagraphs · 尾注（C）
```
title:
  ZH: 这一版叙事的来路
  EN: How this framing came to be

items[0]:
  ZH: v1.0 以为在做 ritual companion。v2.0 意识到核心是 memory orchestration。v3.0 才看清：我设计的对象不是语言 app，而是一个 agent——memory orchestration 是它的内脏，Aha Moment 是它最锋利的前台接口。这一页是 v3.0 的开场。
  EN: v1.0 framing: a ritual companion. v2.0 reframe: the core is memory orchestration. v3.0 clarity: what I am designing is not a language app but an agent — memory orchestration is its internal logic, and Aha Moment is its sharpest frontstage expression. This page is where v3.0 begins.
```

---

### 删除的旧 blocks

以下三个 block 完全移除，不在外层 React 文案中出现（它们的内容已由 H5 showcase 承载）：
- `系统核心`（3 卡：shared memory substrate / memory orchestration layer / agentic interface layer）
- `从观察到显化的状态链`（4 卡：observe / aha candidate / gate review / aha moment）
- `为什么这比 "multi-agent" 更准确`（2 段）

---

## Page 2 改写内容

### pageTitle（保留）
```
ZH: Aha Moment 的前台交互架构
EN: Aha Moment Frontstage Interaction Architecture
```

### pageGoal（保留）
不动

### mainCopy（在现有内容前加过桥段）

新过桥段插到 mainCopy 最前面，原有内容接在 `\n\n` 后保留：

```
ZH 过桥段：
上一页的两个时刻——刷到一句精准的英文、卡在一条 Slack 回复——是两种不同的发生方式：一种是你自己撞见的，一种是你正在表达时卡住的。同一个 agent，在这两种时刻里不该用同一种姿态出现。

这一页讨论的是：当 Aha 已经被发现，agent 怎么为自己挑一个合适的出现方式？它可以是一个轻提示、一个共读锚点、一个回复候选、一次 target language 挑战、一张晚点回来的卡片——选哪一种，取决于这一刻用户的注意力在不在你这儿、TA 当前在做什么、TA 和你之间的关系深到哪一层。

（原有 mainCopy 继续接在此处）

EN 过桥段：
The two moments from the previous page — stumbling on a precise English caption and getting stuck on a Slack reply — represent two different kinds of occurrence: one you walked into, one you were blocked inside. The same agent should not appear the same way in both.

This page addresses exactly that: once an Aha has been found, how does the agent choose the right way to surface it? It could be an ambient nudge, a co-reading anchor, a reply suggestion, a target language challenge, or a deferred return card — the choice depends on whether the user's attention is available, what they are currently doing, and how deep the relationship has gone.

（原有 EN mainCopy 继续接在此处）
```

### contentBlocks（page 2 保留不动）

两种注意力模式 / 可复用的前台形态 / 前台原则 / HTML UX Showcase 四块全部保留。

---

## 实施说明

- `ContentBlock` 类型不需要新增，全部使用现有 `shortParagraphs` + `comparisonCards` + `showcaseEmbed`
- `SHARED_MEMORY_AHA_CASE_STUDY_PAGE_COUNT` 保持为 2，不变
- `sharedMemoryAhaCaseStudyMeta.ts` 不动
- 改完后运行 `npx tsc --noEmit` 验证
