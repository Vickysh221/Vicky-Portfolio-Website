# AI Interior System Design

**Route placement**

- Place the new project under `/agentic-design-development` as a new sub-project.
- Recommended route: `/agentic-design-development/ai-interior-system`
- The new project should appear in the `creation` section on the home scene, alongside the existing creation-oriented case studies.

**Narrative goal**

This project should present a from-zero-to-one reframing of the AI interior design problem. The case study should not read like a rendering tool demo. It should explain how the system redefines space as a container for life scenarios rather than a static room, and how product thinking, interaction design, and semantic structure come before downstream generation.

**Page structure**

The project should launch with a two-slide case-study structure.

Slide 01:
- Open with `src/images/interior/video02.mp4` as the primary media block.
- Follow with project explanation focused on the problem reframing:
  - rebuilding the problem definition of AI interior design from zero to one
  - proposing the product concept that space is a life-scenario container rather than a room
  - changing how the system understands user needs
- Use `src/images/interior/Picture4.png` and `src/images/interior/Picture5.png` to explain the three-layer mapping logic:
  - user
  - space
  - furniture
- This section must frame the three-layer mapping as a unified semantic middle layer that connects user profile, spatial semantics, and furniture features, solving the gap between lower-level generation ability and upper-level design language.

Slide 02:
- Focus on user tag matching and semantic intake.
- Use the following media in order:
  - `src/images/interior/Picture1.png`
  - `src/images/interior/video01.mp4`
  - `src/images/interior/video02.mp4`
  - `src/images/interior/Picture2.png`
  - `src/images/interior/Picture3.png`
- This page should explain the card-based interaction mechanism for capturing household composition, living habits, aesthetic preference, functional constraints, and smart-home inclination with low cognitive burden and high semantic quality.

**Language and layout**

- Follow the narrative case-study tone already used in `FuliPlusCaseStudy.tsx`.
- Organize the copy with the logic implied by the project-case-story-compiler direction:
  - redefine the problem
  - define the concept
  - explain the interaction mechanism
  - show the semantic structure
  - connect it to the end-to-end product chain
- Avoid presenting the project as a flat feature list.
- Keep the layout visual-first, but every media block should serve a clear narrative step.

**Core concepts that must appear**

- Space is not a room; it is a container for life scenarios.
- The card interaction mechanism captures high-quality semantic signals with low user burden.
- The system builds a three-layer mapping across user, space, and furniture.
- The project connects demand intake, profile generation, space recommendation, furniture combination, product binding, panorama preview, and pricing into one understandable design experience.
- The work completed at project initiation should be framed as problem reconstruction, concept definition, interaction design, and semantic structure design for later prototyping and productization.

**Implementation direction**

- Prefer extending the existing case-study rendering system rather than building a separate page architecture.
- Reuse the existing case-study patterns for mixed media blocks, page titles, intro copy, and narrative sections.
- Add only the minimal new rendering primitives needed for ordered image/video storytelling if the existing visual block types are insufficient.
