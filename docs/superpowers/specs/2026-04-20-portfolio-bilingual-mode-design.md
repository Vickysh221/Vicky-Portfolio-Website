# Portfolio Bilingual Mode Design

## Goal

Add a site-wide bilingual mode to the portfolio with a fixed language switcher in the top-right corner. The entire project, including the home screen, project metadata, project detail pages, and slide content, must follow one shared language state. The default language is Chinese. User selection persists in `localStorage`. When English copy is not available yet, the UI falls back to Chinese instead of showing an empty or broken state.

## Scope

This design covers:

- A global `zh` / `en` language state shared across the app
- A persistent `中 / EN` toggle fixed to the top-right corner
- Translation support for global UI copy
- Translation support for route and project metadata
- Translation support for detail-page and slide content
- A phased migration path so untranslated English content can safely fall back to Chinese

This design does not cover:

- Auto-detecting browser language
- Adding more than two languages
- CMS-backed or remote translation management
- Rewriting unrelated visual systems

## Current Project Context

The app is a React + TypeScript + Vite portfolio with heavily custom page composition.

Current content is distributed across several layers:

- `src/App.tsx` orchestrates the home scene, route-based panels, subpage carousel, and top-level layout stacking.
- `src/Portfolio.tsx` renders home-level textual chrome and project directory UI.
- `src/projectRegistry.ts` stores project and subpage metadata for the home directory.
- `src/constants/routeDepth.ts` stores route metadata for project roots and detail pages.
- `src/pages/H5DocContent.tsx` maps route + slide index to per-slide content factories.
- Many `src/pages/H5DocContent*.tsx` files contain section builders and inline copy.
- `src/pages/AiInteriorSystemCaseStudy.tsx`, `src/pages/FuliPlusCaseStudy.tsx`, and companions-related pages contain long-form page content outside the basic route metadata layer.

There is no existing app-wide i18n layer. Some content is already in English, some is Chinese, and some mixes both. That means the first implementation must focus on structure and fallback behavior, not on immediate translation completeness.

## Requirements

### Functional Requirements

1. The app must expose a global language state with only two values: `zh` and `en`.
2. The first visit must default to Chinese.
3. After the user changes language, the choice must persist through `localStorage`.
4. The top-right switcher must always be visible on all major app states, including home and project detail pages.
5. Toggling language must update visible text across the app without a full page reload.
6. Home UI, route metadata, project labels, page headers, slide content, and long-form narrative sections must all read from the same language source.
7. In English mode, any missing English translation must fall back to Chinese.

### UX Requirements

1. The switcher must visually match the current gold-on-dark portfolio language.
2. The switcher must remain small and non-intrusive.
3. The active language must be visually obvious.
4. The switcher must remain clickable above the home overlay, page panels, and carousel containers.
5. The switcher must work on desktop and mobile.

### Delivery Requirements

1. The structure must support gradual migration of the portfolio content.
2. The first implementation must not require all slides to be translated before release.
3. The translation model must be maintainable enough for future copy additions.

## Recommended Approach

Use a lightweight local i18n architecture built for this codebase instead of a heavy external i18n library.

The core idea is:

- put one language provider at the app root
- expose a small translation API to components
- model translatable text as `{ zh, en? }`
- centralize common copy where practical
- allow page-local translation data where the content is already page-local
- always fall back from missing English to Chinese

This approach matches the project’s current structure. The content is hand-authored and route-driven, so a local typed translation layer is sufficient and avoids the weight and rework of a full `i18next`-style integration.

## Architecture

### 1. Global Language State

Introduce a small i18n module, likely under `src/i18n/`, with:

- `Language = 'zh' | 'en'`
- a storage key such as `portfolio.language`
- `LanguageProvider`
- `useLanguage()` or `useI18n()`
- helper utilities to resolve bilingual text with fallback

The provider responsibilities:

- initialize state to `zh`
- on mount, read persisted value from `localStorage` if valid
- expose current language and setter/toggle methods
- keep `localStorage` in sync after user changes

The helper responsibilities:

- resolve strings from `{ zh, en? }`
- return Chinese when `en` is absent
- support array/object composition without forcing every component to know the fallback rules

Recommended base type:

```ts
export type Language = 'zh' | 'en';

export interface LocalizedText {
  zh: string;
  en?: string;
}
```

Recommended resolver shape:

```ts
pickText(text: LocalizedText, language: Language): string
```

Behavior:

- `zh` returns `text.zh`
- `en` returns `text.en ?? text.zh`

### 2. Fixed Top-Right Switcher

Create a dedicated component such as `src/components/LanguageToggle.tsx` and mount it in `App.tsx` at the top layout level.

Placement rules:

- fixed to the viewport top-right
- above home overlays and page panels
- pointer events enabled regardless of scene container state
- safe spacing from the viewport edge on desktop and mobile

Interaction rules:

- visible at all times
- displays `中 / EN`
- clicking `中` sets `zh`
- clicking `EN` sets `en`
- active option gets brighter text and stronger border/background treatment

Visual rules:

- retain the current dark translucent panel style
- use current gold palette tokens
- keep visual weight lower than the primary content chrome

Collision handling:

- on home, it must coexist with the existing `ABOUT` area
- on detail pages, it must sit outside scroll/content frames so it does not shift with slide content
- if current top-right spacing is too tight, move `ABOUT` slightly inward or downward rather than hiding the language switcher

### 3. Translation Data Model

Use three translation layers, because the codebase already separates concerns in roughly that way.

#### Layer A: Global UI Copy

Covers reusable interface strings, for example:

- `ABOUT`
- `SELECTED WORKS`
- `PORTFOLIO · 2025`
- home-level labels
- shared button copy
- status labels

Recommended storage:

- `src/i18n/messages.ts`
- or `src/i18n/uiCopy.ts`

This layer should be small and centralized.

#### Layer B: Route and Project Metadata

Covers structured data already stored in registries:

- `src/projectRegistry.ts`
- `src/constants/routeDepth.ts`

Fields to migrate:

- `title`
- `subtitle`
- `desc`
- `label`
- any top-level metadata currently rendered directly in navigation or headers

Recommended pattern:

- replace plain strings with `LocalizedText`
- update consumers to resolve via helper functions before rendering

This change makes home navigation, page headers, subpage labels, and route-level descriptions bilingual without duplicating route structure.

#### Layer C: Page and Slide Content

Covers long-form slide/page content currently defined close to the pages.

This includes:

- `H5DocContent*.tsx` section builders
- long-form case-study components
- route-specific content factories

Recommended pattern:

- keep translation data close to the page when that is where the content already lives
- migrate visible copy from raw strings to `LocalizedText`
- for long structured sections, define small bilingual data objects or helper constants instead of wrapping every JSX node inline

Example direction:

```ts
const heading = { zh: '3D地图一镜到底系统', en: 'One-Shot 3D Map Camera System' };
```

Then render:

```tsx
<h2>{pickText(heading, language)}</h2>
```

For section factories that produce many text fragments, it is acceptable to create a route-local `copy` object and resolve from it. The key requirement is consistency and fallback, not forced centralization.

## Migration Strategy

The implementation must support incomplete translation coverage.

### Phase 1: Infrastructure

- Add global provider
- Add language toggle
- Add `LocalizedText` types and fallback helpers
- Convert top-level UI and metadata consumers to read bilingual values

Result:

- the app can switch languages globally
- metadata-aware areas respond immediately
- untranslated content still renders in Chinese

### Phase 2: High-Visibility Content

Translate and wire:

- home screen labels
- project directory text
- project/subpage labels
- route/page header metadata

Result:

- most navigation-facing UI becomes meaningfully bilingual

### Phase 3: Detail Page and Slide Migration

Move through content groups in batches:

- agentic design chapter pages
- JIDU HMI pages
- academic/gamification pages
- long-form case-study pages

Within each batch:

- convert raw strings to `LocalizedText`
- add English where available
- rely on Chinese fallback where not yet translated

### Phase 4: Translation Completion and Cleanup

- fill remaining English gaps
- remove duplicated ad hoc string constants
- optionally add simple reporting for missing English copy if needed later

## Error Handling and Edge Cases

### Invalid Persisted Value

If `localStorage` contains an unsupported value, ignore it and use `zh`.

### Missing English Translation

If the current language is `en` and `en` is missing, render Chinese. This is expected behavior, not an error.

### Mixed-Content Pages During Migration

Some pages will initially show a mix of translated English and Chinese fallback while migration is in progress. This is acceptable for the rollout phase and preferable to blocking the feature.

### Non-String Content

Some slide builders may embed rich JSX, formatted blocks, or lists. Those should be migrated by extracting visible text into bilingual constants where practical instead of creating a generic runtime tree walker. Keep the solution explicit and maintainable.

## Testing Strategy

### Unit Tests

Add tests for:

- default language initialization
- loading persisted language from `localStorage`
- ignoring invalid persisted values
- toggling language updates state and storage
- English fallback to Chinese when `en` is missing

### Integration / Render Tests

Add or extend tests for:

- top-right toggle renders on home and detail routes
- project metadata switches when language changes
- route metadata headers switch when language changes
- slide content can consume bilingual text without regression in existing route rendering

### Manual Verification

Verify:

- initial load defaults to Chinese
- switching to English persists after refresh
- switcher remains visible over home and detail layouts
- mobile layout still keeps the switcher accessible
- untranslated English areas correctly show Chinese fallback

## File Impact

Likely new files:

- `src/i18n/types.ts`
- `src/i18n/LanguageProvider.tsx`
- `src/i18n/useI18n.ts`
- `src/i18n/messages.ts` or equivalent
- `src/components/LanguageToggle.tsx`

Likely modified files:

- `src/main.tsx` or app entry to wrap provider
- `src/App.tsx`
- `src/Portfolio.tsx`
- `src/projectRegistry.ts`
- `src/constants/routeDepth.ts`
- `src/pages/H5DocContent.tsx`
- selected `src/pages/H5DocContent*.tsx`
- case-study page components that contain authored text
- relevant tests under `tests/`

## Tradeoffs

### Why Not a Full External i18n Library

The project is not a generic product dashboard with lots of repeated UI chrome. It is a custom, content-heavy portfolio with highly bespoke slide files. A local typed translation layer is simpler, easier to reason about, and lower risk for the current scope.

### Why Not Keep All Translations in One Giant File

A single central file would become hard to maintain because slide content is already split across many specialized page files. Metadata and shared UI should be centralized; page-local authored content should stay near the page.

### Why Chinese Fallback Instead of Missing-State Markers

The portfolio should remain readable at all times. Chinese fallback preserves usability while English copy is being added incrementally.

## Success Criteria

The design is successful when:

- one fixed `中 / EN` toggle is visible across the app
- language choice persists across refreshes
- home and detail pages read from the same language state
- route metadata and high-level UI switch correctly
- untranslated English content safely falls back to Chinese
- the codebase has a clear path for gradually converting slide content without destabilizing the site
