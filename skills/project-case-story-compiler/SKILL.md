---
name: project-case-story-compiler
description: Turn raw project materials, docs, notes, case logs, and system structure into portfolio-ready project narratives, audience-facing case studies, method appendices, and section-based HTML/slide-style story structures. Use when the task is to translate a complex project into a portfolio story, split audience-facing narrative from method detail, design page-by-page case-study flow, or generate Codex-ready instructions for HTML portfolio pages. Prefer this when the user says things like “整理作品集叙述”, “做 case study”, “按 slide 语言分页”, “生成 html 作品集结构”, “把项目材料压成 portfolio narrative”, or “拆成正文版和方法附录版”.
---

# Project Case Story Compiler

Use this skill when the user does **not** just want writing, but wants a project to be **re-structured for presentation**.

This skill is for turning:
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

## Core idea

The job is not “write a nicer description.”
The job is:

## identify the real project story,
## separate presentation layers,
## and compile the project into a readable case-study structure.

This skill is especially useful when the raw project is complex and risks being presented as:
- a README
- a technical dump
- a progress log
- a feature list
- a prompt experiment

instead of a coherent portfolio case.

---

## What this skill must protect against

### 1. README drift
Do not let the output read like repo documentation.
Avoid path-heavy, file-heavy, implementation-heavy writing in the audience-facing narrative.

### 2. presentation-layer mixing
Do not mix these into one blob:
- portfolio正文
- 方法附录
- interview talk track
- HTML page instructions

Separate them deliberately.

### 3. definition-heavy tone
Do not overuse stiff “不是……而是……” or abstract declarations.
Prefer scene, observation, judgment, and progression.
Let the solution feel like it grows out of the problem.

### 4. parameter obsession
For audience-facing pages, do not foreground internal fields, slot names, file paths, or system knobs unless they are truly necessary.

### 5. fake product-launch tone
Do not write portfolio pages like keynote slides.
The result should feel readable, editorial, and portfolio-like.

---

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
- project reframing
- workflow value
- system contribution
- readable story

### Layer B — Method appendix
Use when the user wants:
- deeper explanation
- system logic
- bucket / slot / compiler explanation
- internal method framing
- interview deep dive

Focus on:
- internal layers
- semantic compilation logic
- variation control logic
- data / ref system / assets

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
- what the reader should take away

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

---

## Default workflow

### Step 1 — Read raw materials
Pull only enough source material to understand:
- what the project actually is
- what problem it solves
- what was built
- what the user most wants emphasized

When the repo is large, first read:
- the main narrative or README/index docs
- the main system docs
- the main case structure docs
- only then pull deeper files as needed

### Step 2 — Identify the real story
Extract these before drafting:
- real-world context
- workflow bottleneck
- the user’s or operator’s actual pain
- what generic tools fail at
- the reframing / judgment that changed the project
- what the built system now enables

### Step 3 — Separate layers
Decide what belongs in:
- portfolio正文
- method appendix
- short summary
- page brief
- Codex handoff

Do not dump everything into one artifact.

### Step 4 — Choose tone
For audience-facing writing:
- more scene
- more process
- more “I noticed / this is where it broke / so I changed...”
- less taxonomy upfront
- less hard-definition writing

For method appendix:
- more explicit structure
- still readable
- but allowed to name internals

### Step 5 — Output in the right form
Typical outputs:
- full narrative
- short narrative
- interview version
- portfolio bullets
- 7/9-page case-study brief
- HTML section instructions
- appendix structure

---

## Narrative patterns

### Pattern 1 — Scene → break → reframing → system → value
Use this for strong portfolio正文.

1. real user / workflow scene
2. where the process breaks
3. what you realized the problem actually was
4. how you restructured the system
5. what value that created

### Pattern 2 — Hero → context → failure → reframing → workflow → outcome
Use this for section-based HTML case study.

### Pattern 3 — audience正文 + appendix split
Use when the raw material is too technical.

- 正文 keeps the story readable
- appendix protects the deeper system explanation

---

## Page design logic for HTML / slide-style case studies

When generating page-by-page structure, each page should have:
- one clear role
- one core idea
- one visual anchor
- one takeaway

Do not build pages like meeting slides.
Build them like readable portfolio sections.

Good page roles include:
- hero
- context
- what existing tools get wrong
- reframing
- system overview
- reference interpretation
- AI workflow value
- current outcomes
- closing contribution

---

## Motion / interaction rule

When the user asks for motion, prefer **narrative motion** over display motion.

Use:
- soft section reveal
- staggered content appearance
- light workflow-step highlighting
- subtle card hover feedback

Avoid:
- flashy transitions
- big parallax
- heavy scaling or bouncing
- motion that distracts from reading

---

## What to ask yourself before finalizing

- If a portfolio reader only skims this, do they still understand the project?
- Did I foreground the real problem, or did I foreground implementation detail?
- Does the AI value read as workflow value, not just output speed?
- Did I separate narrative from appendix?
- Does each page / section have a clear job?

---

## Default deliverables this skill can produce

### 1. Full portfolio narrative
Contains:
- background
- problem
- reframing
- system solution
- AI value
- current outcomes
- contribution

### 2. Short case-study version
Contains:
- 1 paragraph project summary
- 3–5 bullets

### 3. Interview version
Contains:
- 2–3 minute spoken explanation

### 4. Page-by-page brief
Contains for each page:
- title
- role
- key content
- visual anchor
- takeaway

### 5. Codex-ready HTML instruction set
Contains:
- page commands
- content blocks
- visual blocks
- style and motion constraints

### 6. Method appendix
Contains:
- system logic
- semantic compilation layer
- variation layer
- supporting assets / data / refs

---

## When to explicitly split outputs

If the project contains both:
- a strong audience-facing story
and
- dense internal method detail

always split into:
1. portfolio正文版
2. 方法附录版

Do not try to make one document serve both equally.

---

## References to create when this skill grows

If this skill is expanded later, add references for:
- narrative patterns
- page structures
- anti-patterns
- codex HTML handoff patterns

For now, keep the SKILL concise and workflow-first.
