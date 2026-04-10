---
name: project-case-story-compiler
description: Turn raw project materials, docs, notes, case logs, and system structure into portfolio-ready project narratives, audience-facing case studies, method appendices, and section-based HTML/slide-style story structures. Use when the task is to translate a complex project into a portfolio story, split audience-facing narrative from method detail, design page-by-page case-study flow, or generate Codex-ready instructions for HTML portfolio pages. Prefer this when the user says things like “整理作品集叙述”, “做 case study”, “按 slide 语言分页”, “生成 html 作品集结构”, “把项目材料压成 portfolio narrative”, or “拆成正文版和方法附录版”.
---

# Project Case Story Compiler

Use this skill when the project needs to be **re-structured for presentation**, not merely rewritten.

The job is to turn:
- raw project files
- notes / PRDs / case logs
- technical system descriptions
- iteration history
- user corrections about tone and audience

into:
- portfolio narrative
- short project summary
- interview version
- audience-facing case-study pages
- method appendix
- section-based HTML / slide-style briefs
- Codex-ready page instructions

## Core operating rule

Do not beautify before identifying the real story.

Always do these three things first:
1. identify what the project actually proves
2. separate presentation layers
3. compile the material into a readable case-study structure

This skill is especially useful when a project risks being presented as:
- a README
- a technical dump
- a progress log
- a feature list
- a prompt experiment

instead of a coherent portfolio case.

## What this skill must protect against

### 1. README drift
Do not let audience-facing output read like repo documentation.
Avoid file-path-heavy, schema-heavy, implementation-heavy writing in the正文 narrative.

### 2. presentation-layer mixing
Do not mix these into one blob:
- portfolio正文
- 方法附录
- interview talk track
- HTML page instructions

Split them deliberately.

### 3. method inflation
Do not let labels pretend to be logic.
Terms like “semantic system”, “reasoning layer”, or “design compiler” only matter if the output explains what is actually being judged, transformed, or controlled.

### 4. parameter obsession
For audience-facing pages, do not foreground internal fields, slot names, file paths, or system knobs unless they are essential to the reader’s understanding.

### 5. fake product-launch tone
Do not write portfolio pages like keynote slides.
Keep the result readable, editorial, and evidence-bearing.

## First decision: what layer is the user asking for?

Before writing, identify which output layer is needed.

### Layer A — Audience-facing portfolio narrative
Use when the user wants:
- 作品集叙述
- case study 正文
- 项目背景 / 问题 / 方案 / 价值
- 中文或英文 portfolio text

Focus on:
- real problem
- workflow bottleneck
- reframing
- system contribution
- readable story

### Layer B — Method appendix
Use when the user wants:
- deeper explanation
- system logic
- bucket / slot / compiler explanation
- internal method framing
- interview deep dive
- “这页要讲方法，不要讲 roadmap”

Focus on:
- semantic compilation logic
- controlled variation logic
- how direction differences are constructed
- how domain language translation works
- what prompt does versus does not do

### Layer C — Page-by-page case-study structure
Use when the user wants:
- 按页拆
- slide 语言分页
- HTML case-study sections
- hero / context / framework / outcome pages

Focus on:
- page role
- narrative progression
- visual anchor per page
- takeaway per page

### Layer D — Codex handoff for HTML generation
Use when the user wants:
- 给 codex 的指令
- HTML structure prompt
- section spec
- motion / interaction constraints

Focus on:
- direct commands
- page structure objects
- content blocks
- visual blocks
- styling and motion constraints

## Default workflow

### Step 1 — Read only enough source material
Establish:
- what the project actually is
- what problem it solves
- what was built
- what the user most wants emphasized

For larger repos, start with:
- README / main narrative docs
- principal system docs
- case structure docs
- only then pull deeper files as needed

### Step 2 — Identify the real story
Extract these before drafting:
- real-world context
- workflow bottleneck
- the user’s or operator’s actual pain
- what generic tools fail at
- the reframing that changed the project
- what the built system now enables

### Step 3 — Separate layers
Decide what belongs in:
- portfolio正文
- method appendix
- short summary
- page brief
- Codex handoff

Do not dump everything into one artifact.

### Step 4 — Choose tone by layer
For audience-facing writing:
- more scene
- more process
- more observed friction
- less taxonomy upfront
- less internal naming

For method appendix:
- more explicit structure
- more logic explanation
- still readable
- allowed to name internals only when tied to function

### Step 5 — Output in the right form
Typical outputs:
- full narrative
- short narrative
- interview version
- portfolio bullets
- page-by-page brief
- HTML section instructions
- appendix structure

## Appendix design rule

When the case contains strong audience narrative **and** dense internal method detail, always split them.

The appendix exists to explain:
- what the system is really judging
- how vague input becomes comparable directions
- how domain language translation happens
- why prompt is not the whole method

It does **not** exist to dump field names.

## Recommended narrative patterns

### Pattern 1 — Scene → break → reframing → system → value
Use for strong portfolio正文.

### Pattern 2 — Hero → context → failure → reframing → workflow → outcome
Use for section-based HTML case study.

### Pattern 3 — 正文 + appendix split
Use when the raw material is too technical for one readable artifact.

## Special pattern: semantic compilation appendix

Use this pattern when the project is being misunderstood as “just prompt generation”.

Recommended three-page logic:

### Page 1 — Semantic-to-domain compilation chain
Show the chain clearly, for example:
`user vague input → semantic intake → ambiguity / certainty split → 3 direction hypotheses → per-direction weighting → domain-language translation → prompt assembly → generated variants`

Goal: prove that prompt is downstream of judgment.

### Page 2 — Direction difference logic
Explain how each direction differs in **what it foregrounds**, not just in wording.
For design cases, differences should fall back to design logic such as composition, motif behavior, color restraint, material feel, density, surface depth, etc.

Goal: prove that the system is constructing comparable hypotheses, not random alternatives.

### Page 3 — Prompt as serialization layer
Explain that prompt is only the final external form of an already-structured design state.
Use this page to distinguish:
- method logic
- domain-language translation
- model instruction layer

Goal: prevent the entire project from being flattened into “prompt engineering”.

## Page design logic for HTML / slide-style case studies

Each page should have:
- one clear role
- one core idea
- one visual anchor
- one takeaway

Do not build pages like meeting slides.
Build them like readable portfolio sections.

Common page roles:
- hero
- context
- what existing tools get wrong
- reframing
- system overview
- reference interpretation
- AI workflow value
- method appendix
- closing contribution

## Motion / interaction rule

Prefer narrative motion over display motion.

Use:
- soft section reveal
- staggered content appearance
- subtle workflow-step highlighting
- light card hover feedback

Avoid:
- flashy transitions
- big parallax
- heavy scaling or bouncing
- motion that distracts from reading

## Final checks before delivery

Ask:
- If a portfolio reader only skims this, do they still understand the project?
- Did I foreground the real problem, or implementation detail?
- Did I separate readable narrative from method explanation?
- Did each page get one job only?
- Did any label outrun the evidence behind it?

## Default deliverables this skill can produce

1. Full portfolio narrative
2. Short case-study version
3. Interview version
4. Page-by-page brief
5. Codex-ready HTML instruction set
6. Method appendix

## Optional references

If the skill grows later, add references for:
- narrative patterns
- page structures
- anti-patterns
- HTML handoff patterns
- appendix patterns for design / AI workflow cases

For now, keep the skill lean, workflow-first, and resistant to technical-dump drift.
