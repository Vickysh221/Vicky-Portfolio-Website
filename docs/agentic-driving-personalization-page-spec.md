# Agentic Driving Personalization Page Spec

## Purpose

This document converts the chapter draft into a **page-by-page implementation spec**.
It does **not** rewrite the argument into shorter portfolio copy.
It keeps the essay-like reasoning structure as intact as possible, and only defines:
- page boundaries
- what content belongs on each page
- where a visual anchor helps reading
- what not to compress or over-cardify

This chapter should still read like a structured argument, not a marketing page.

---

## Global Rule for This Chapter

### Keep
- long-form reasoning
- paragraph continuity
- argumentative progression
- literature as support, not as decoration
- tension between system capability and user-specific behavior

### Avoid
- over-compressing into slogans
- turning every page into bullet lists
- replacing reasoning with interface language too early
- making the chapter feel like automotive market research
- making the chapter feel like a feature spec

### Reading mode

This chapter should be implemented as a **reading-first chapter**.
Visuals should support orientation and emphasis, not dominate the page.

---

# Page 1

## Title
**Agent 在辅助驾驶中：驾驶专家，还是个性化驾驶员？**

## Page role
Open the question.
Establish the chapter's core tension through the hypothetical of a fully standardized driving world.

## What content belongs here
Use the opening argument only:
1. agent in driving is not just about understanding commands
2. the extreme hypothetical: a fully standardized driving world
3. in that world, agent value collapses
4. in reality, roads are not standardized, so agent value becomes meaningful

## Recommended content boundary
End the page around this turn:
- the shift from standardized world → real-world complexity
- do **not** bring vendor examples onto this page

## Structural rhythm
- Paragraph 1: what agent is usually assumed to do
- Paragraph 2: the standardized-world thought experiment
- Paragraph 3: why that world erases agent value
- Paragraph 4: return to real roads and reopen the problem

## Visual anchor
A split composition:
- left: standardized driving world
- right: real-world driving complexity

The visual should be quiet and conceptual.
Not too many labels.

## Optional callout line
> 如果驾驶世界是完全标准化的，agent 几乎不会带来额外价值。

## What not to do on this page
- no vendor table
- no literature citation yet
- no UX breakdown yet
- no page-level answer to the main question

## Takeaway
**agent 的价值，来自真实世界的不标准。**

---

# Page 2

## Title
**真实世界里的 Agent，正在被不同厂商定义成不同的东西**

## Page role
Move from abstract complexity to industry reality.
Show that the chapter's question is real not only because roads are complex, but because the industry itself has not converged on what in-car agents are for.

## What content belongs here
Use these layers:
1. current examples of systems parsing vague user needs into action
2. the sense that these systems already exceed simple voice-command interaction
3. the comparison point: different vendors are building toward different agent objects

Bring in the condensed vendor comparison block here.

## Recommended internal structure
### Top half
Continuous essay paragraphs:
- intelligent driving systems increasingly parse vague intentions
- examples from current products
- this suggests movement beyond explicit command systems

### Bottom half
A support panel / comparison matrix.
The panel should not dominate the page.
It exists to support this claim:

> 厂商们虽然都在谈 agent，但它们面向的“核心对象”并不一样。

## Suggested matrix columns
- 厂商 / 平台
- Agent 面向的核心对象
- 记忆 / 个性化（公开）
- 自动化等级语境
- 执行 / 融合重点
- 合规 / 监管线索

## Suggested representative rows
Do not overload.
Use 5–7 representative players only:
- 智己
- 千里科技
- 特斯拉
- Waymo
- Mobileye
- 蔚来 / 小鹏 / 华为乾崑（可合并为一组）
- 博世 / 大陆（可合并为供应链一组）

## Visual anchor
A clean comparison block placed below the main paragraphs.
The reading order should remain paragraph-first, matrix-second.

## Optional callout line
> 问题不只是技术够不够，而是行业还没有统一 agent 的对象。

## What not to do on this page
- do not turn the whole page into a market analysis sheet
- do not compare every possible OEM
- do not let matrix details overpower the argument

## Takeaway
**“驾驶 agent”还不是一个统一品类。**

---

# Page 3

## Title
**如果系统只是把模糊话语映射成动作，它和旧规则系统有什么本质区别？**

## Page role
Introduce critique.
This page is where the chapter stops observing and starts interrogating.

## What content belongs here
Use the argument about:
1. designers starting from idealized scenarios
2. layering exceptions on top of standard task execution
3. the possibility that “vague language understanding” is still only preset semantic mapping
4. the question: what structurally distinguishes this from older rule-based systems?

This page should hold your sharpest skeptical turn.

## Structural rhythm
- Paragraph 1: how current systems are often framed by designers
- Paragraph 2: the criticism of fixed-rule intent recognition
- Paragraph 3: the shift from “open the wiper” to “it is raining, drive steady”
- Paragraph 4: why that may still be a pre-embedded semantic route

## Visual anchor
A minimal transformation chain:
`explicit command → vague language → preset semantic parsing → preset action path`

The purpose is not to explain the whole system.
It is to expose the continuity between old and new paradigms.

## Optional callout line
> 把命令说得更像自然语言，不等于系统真的更理解人。

## What not to do on this page
- do not solve the problem too early
- do not bring in literature here yet
- do not over-design the visual; the argument should carry the page

## Takeaway
**自然语言入口，不等于 agent 的本质跃迁。**

---

# Page 4

## Title
**真正的分水岭，不是听懂一句话，而是看懂用户在具体情境里如何驾驶**

## Page role
Shift the chapter from language understanding to behavior understanding.
This is the chapter's most important conceptual move.

## What content belongs here
Use these parts of the text:
1. the car as a system with eyes / ears / hands / brain
2. parking-garage braking ambiguity
3. low-speed road slowing ambiguity
4. the need to combine navigation, environment, and driver habit

Then integrate the UX reasoning on:
- ambiguity resolution through short evidence-fusion windows
- habit learning through repeated interaction traces

## Recommended internal structure
### Section A — Why behavior interpretation matters
Use your original scenario examples.
Keep them as paragraphs.

### Section B — A more agentic system would wait for evidence
Introduce:
- outside-the-car evidence
- navigation evidence
- in-cabin evidence

### Section C — Preference is not only in settings
Introduce:
- explicit signals
- implicit signals
- event memory → preference abstraction → strategy parameterization

## Visual anchor
Two small support visuals are enough:
1. evidence fusion triad
   - outside
   - navigation
   - in-cabin
2. three-layer memory path
   - event memory
   - preference abstraction
   - strategy parameterization

## Optional callout lines
> 真正的 agent，不只是理解语言，而是通过证据与行为轨迹理解人。

> 个性化偏好不只存在于设置页，也存在于接管、纠正和反复微调里。

## What not to do on this page
- do not collapse the whole page into interaction bullets
- do not let the visuals fragment the reading flow
- do not turn it into a sensor feature list

## Takeaway
**行为理解，而不是话语理解，才是 agent 的真正分水岭。**

---

# Page 5

## Title
**文献给出的提醒：个性化驾驶真正难的，是行为数据如何被获取和组织**

## Page role
Introduce the review article as the chapter's strongest external support.
This page gives the chapter research backbone.

## What content belongs here
Use the integrated literature-review passage:
1. what the article argues about personalization in driving behavior
2. why unified driving models are insufficient
3. dataset / modeling / validation as the real structure
4. why behavioral data acquisition and organization matter first
5. why the absence of driver identity continuity leads to average-driver modeling

## Structural rhythm
- Paragraph 1: literature gives a clear framing
- Paragraph 2: why personalization is structurally necessary
- Paragraph 3: why behavior data is the real foundation
- Paragraph 4: what happens if this foundation is missing

## Visual anchor
A restrained structure diagram:
`Dataset → Modeling → Validation`

And, if needed, one secondary support line:
`driver identity + scenario context + repeated behavior`

## Optional callout line
> 没有把驾驶者身份、场景上下文和重复行为稳定连接起来，模型最终学到的往往只是一个平均化的人类驾驶模板。

## What not to do on this page
- do not make it look like a paper summary slide
- do not list too many datasets or author names
- do not detach the literature from your own argument

## Takeaway
**个性化驾驶的地基，不是更聪明的模型，而是更对的行为数据结构。**

---

# Page 6

## Title
**我的判断：agent 不是车主分身，也不是纯粹驾驶专家**

## Page role
Answer the chapter question.
Close the argument and extend it into trust, explanation, takeover, and memory governance.

## What content belongs here
Use these layers:
1. future direction: the car increasingly “watching the human” in order to collaborate
2. user preference vs safety boundary tension
3. why the system should not simply imitate the user
4. why the system should not remain only a generic driving expert
5. the conclusion: safety-bounded, continuously calibrated driving collaborator

Then bring in the UX conclusions:
- escalation and takeover as system capability
- explanation as predictability, not persuasion
- privacy / memory controls as trust infrastructure

## Recommended internal structure
### Section A — What the agent should not be
- not pure driving expert
- not user clone

### Section B — What it should become
- safety-bounded personalized collaborator
- calibrated through behavior, feedback, and context

### Section C — What this means for UX
- driver online as operating condition
- explanation as next-step predictability
- memory governance as trust contract

## Visual anchor
A triangle or balance framework:
- rules / safety
- user preference / behavior
- system capability / execution

Center label:
**personalized driving collaborator**

## Optional callout lines
> 个性化驾驶不应被理解为“让车更像用户”，而应被理解为“让系统在规则与安全边界内，更准确地判断如何替这个用户驾驶”。

> 解释在驾驶场景里最重要的用途不是说服用户，而是让用户能预测系统下一步。

> 个性化成立的前提，不只是记忆能力，而是记忆治理。

## What not to do on this page
- do not end with a generic optimistic future-of-AI tone
- do not reduce the conclusion to one slogan only
- do not leave out the governance dimension

## Takeaway
**未来的驾驶 agent，不是更会说话，而是更会在安全约束内理解人。**

---

## Suggested Implementation Order

If implementing gradually, build pages in this order:
1. Page 1
2. Page 3
3. Page 5
4. Page 6
5. Page 2
6. Page 4

Reason:
- 1 / 3 / 5 / 6 establish the chapter spine
- 2 and 4 deepen the chapter after the spine is stable

---

## Suggested Route Placement

Recommended route:
- `/agentic-design-development/agentic-driving`

Suggested Chinese label:
- `驾驶专家，还是个性化驾驶员？`

Suggested English subtitle:
- `Agent in Driving · Personalized Collaboration Under Safety Constraints`

---

## Final Note

This chapter should remain recognizably essay-like.
The implementation succeeds if the reader feels:
- they are following a serious line of reasoning
- each page advances one question
- the visuals clarify, but do not replace, the thought

If the chapter starts to feel like a product deck, a trend report, or an AI-assistant marketing page, it has gone off track.
