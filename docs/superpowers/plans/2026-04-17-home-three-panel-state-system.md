# Home Three Panel State System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a configurable home-scene state system so the three homepage panels and camera always return to the correct positions after dock, route transitions, and inactivity.

**Architecture:** Extract homepage panel and camera presets into a dedicated layout module, then route all dock/undock/home-return behavior through a single `SceneManager` state API instead of ad-hoc transforms. Layer mouse or gesture-driven movement as a temporary interaction offset on top of the active base preset, with a 3-second idle restore that only resets the offset rather than overwriting the base state.

**Tech Stack:** React 19, TypeScript, React Router 7, Three.js, CSS3DRenderer, GSAP, Vite

---

### Task 1: Extract Configurable Home Layout Presets

**Files:**
- Create: `src/three/homePanelLayout.ts`
- Modify: `src/three/SceneManager.ts`
- Test: `npm run build`

- [ ] **Step 1: Write the failing type integration**

Define the new preset model in `src/three/homePanelLayout.ts` and update `SceneManager.ts` imports to consume it, but do not yet replace the old inline `HOME_CARD_LAYOUT`.

```ts
// src/three/homePanelLayout.ts
import * as THREE from 'three';

export interface HomePanelTransform {
  position: THREE.Vector3;
  rotationY: number;
  scale: number;
}

export interface CameraPose {
  position: THREE.Vector3;
  rotation: THREE.Euler;
}

export interface HomeScenePreset {
  panels: [HomePanelTransform, HomePanelTransform, HomePanelTransform];
  camera: CameraPose;
  duration: number;
  ease: string;
}

export type HomeSceneStateKey =
  | 'home-idle'
  | 'home-return-from-route'
  | 'home-docked-0'
  | 'home-docked-1'
  | 'home-docked-2';
```

- [ ] **Step 2: Run build to verify the project fails until the new module is fully wired**

Run: `npm run build`
Expected: FAIL with TypeScript import or unused/undefined reference errors until `SceneManager.ts` is updated to use the new preset source.

- [ ] **Step 3: Replace the hard-coded layout source with shared presets**

Move the current desktop home layout data out of `SceneManager.ts`, define it in `src/three/homePanelLayout.ts`, and export helpers that return immutable preset copies.

```ts
// src/three/homePanelLayout.ts
const HOME_IDLE_PRESET: HomeScenePreset = {
  panels: [
    { position: new THREE.Vector3(0, 40, 350), rotationY: 0, scale: 0.44 },
    { position: new THREE.Vector3(640, 24, 95), rotationY: -0.15, scale: 0.36 },
    { position: new THREE.Vector3(-640, 24, 95), rotationY: 0.15, scale: 0.36 },
  ],
  camera: {
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
  },
  duration: 0.75,
  ease: 'power3.inOut',
};

export function getHomeScenePreset(state: HomeSceneStateKey): HomeScenePreset {
  switch (state) {
    case 'home-return-from-route':
      return {
        ...HOME_IDLE_PRESET,
        duration: 0.95,
      };
    case 'home-docked-0':
    case 'home-docked-1':
    case 'home-docked-2':
    case 'home-idle':
    default:
      return HOME_IDLE_PRESET;
  }
}
```

- [ ] **Step 4: Update `SceneManager.ts` to read home base transforms from the preset module**

Refactor `_getOrbitPosition()` and `_getCardScale()` so they use the shared preset instead of the local constant.

```ts
// SceneManager.ts
import { getHomeScenePreset } from './homePanelLayout';

private _getHomeIdlePreset() {
  return getHomeScenePreset('home-idle');
}

private _getOrbitPosition(i: number, count: number): THREE.Vector3 {
  if (count === 3) {
    return this._getHomeIdlePreset().panels[i].position.clone();
  }
  return new THREE.Vector3((i - (count - 1) / 2) * 520, 0, 40);
}

private _getCardScale(i: number, count: number): number {
  if (count === 3) {
    return this._getHomeIdlePreset().panels[i].scale;
  }
  return 0.15;
}
```

- [ ] **Step 5: Run build to verify preset extraction passes**

Run: `npm run build`
Expected: PASS with no TypeScript errors and no missing import errors.

- [ ] **Step 6: Commit**

```bash
git add src/three/homePanelLayout.ts src/three/SceneManager.ts
git commit -m "refactor: extract home panel layout presets"
```

### Task 2: Add a Single Home Scene State API in SceneManager

**Files:**
- Modify: `src/three/SceneManager.ts`
- Test: `npm run build`

- [ ] **Step 1: Write the failing API surface**

Add `currentHomeSceneState` and a typed `setHomeSceneState()` method signature, but keep existing `dockCard()` and `undockCard()` calling direct GSAP transforms for the moment.

```ts
private _homeSceneState: HomeSceneStateKey = 'home-idle';

setHomeSceneState(state: HomeSceneStateKey, onComplete?: () => void) {
  this._homeSceneState = state;
}
```

- [ ] **Step 2: Run build to verify the interim state API compiles but is behaviorally incomplete**

Run: `npm run build`
Expected: PASS. This is a compilation checkpoint before the real behavior swap.

- [ ] **Step 3: Implement preset-driven state application**

Add private helpers that tween all three CSS3D cards and the camera to the active preset, and use `setHomeSceneState()` as the only entry point for home transforms.

```ts
private _applyHomeScenePreset(state: HomeSceneStateKey, onComplete?: () => void) {
  const preset = getHomeScenePreset(state);

  preset.panels.forEach((panel, i) => {
    const card = this._orbitCards[i];
    if (!card) return;
    gsap.to(card.css3dObj.position, {
      x: panel.position.x,
      y: panel.position.y,
      z: panel.position.z,
      duration: preset.duration,
      ease: preset.ease,
    });
    gsap.to(card.css3dObj.rotation, {
      y: panel.rotationY,
      duration: preset.duration,
      ease: preset.ease,
    });
    gsap.to(card.css3dObj.scale, {
      x: panel.scale,
      y: panel.scale,
      z: panel.scale,
      duration: preset.duration,
      ease: preset.ease,
      onComplete: i === 0 ? onComplete : undefined,
    });
  });
}

setHomeSceneState(state: HomeSceneStateKey, onComplete?: () => void) {
  this._homeSceneState = state;
  this._applyHomeScenePreset(state, onComplete);
}
```

- [ ] **Step 4: Route dock and undock flows through the new API**

Refactor `dockCard()` and `undockCard()` so they stop writing bespoke final positions for the home layout. `dockCard()` may still animate the active card to the detail position, but home restoration must use `setHomeSceneState('home-idle')` or `setHomeSceneState('home-return-from-route')`.

```ts
dockCard(index: number) {
  this._activeCardIndex = index;
  this._homeSceneState = `home-docked-${index}` as HomeSceneStateKey;
  // keep dedicated dock animation for focused card
}

undockCard() {
  const prev = this._activeCardIndex;
  this._activeCardIndex = null;
  if (prev !== null) {
    this.setHomeSceneState('home-idle');
  }
}
```

- [ ] **Step 5: Run build to verify the state API replaces direct home restoration logic cleanly**

Run: `npm run build`
Expected: PASS with no duplicate symbol or unreachable-logic errors.

- [ ] **Step 6: Commit**

```bash
git add src/three/SceneManager.ts
git commit -m "refactor: centralize home scene state transitions"
```

### Task 3: Separate Interaction Offset from Base Home State

**Files:**
- Modify: `src/three/SceneManager.ts`
- Test: `npm run build`

- [ ] **Step 1: Write the failing state fields for interaction tracking**

Add dedicated fields for a temporary interaction offset and idle restore timer without yet wiring them into `_animateLoop()`.

```ts
private _interactionOffset = new THREE.Vector3();
private _interactionRotationOffset = new THREE.Euler(0, 0, 0);
private _idleRestoreTimer: ReturnType<typeof setTimeout> | null = null;
private _lastInteractionAt = 0;
```

- [ ] **Step 2: Run build to verify the new state holders compile**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Apply mouse or gesture movement as offset only**

Change `_handleMouseMove()` and `_animateLoop()` so they compute and ease temporary offsets relative to the base camera pose, rather than writing directly against the camera as the source of truth.

```ts
private _refreshInteractionTimeout() {
  this._lastInteractionAt = Date.now();
  if (this._idleRestoreTimer) clearTimeout(this._idleRestoreTimer);
  this._idleRestoreTimer = setTimeout(() => {
    gsap.to(this._interactionOffset, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, 3000);
}

private _handleMouseMove = (e: MouseEvent) => {
  if (this._currentRoute !== '/' || this._activeCardIndex !== null) return;
  this._mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;
  this._mouseNormY = -((e.clientY / window.innerHeight) * 2 - 1);
  this._refreshInteractionTimeout();
};
```

- [ ] **Step 4: Update the render loop to combine base state plus offset**

In `_animateLoop()`, compute the target camera pose from the active home preset and then add the interaction offset when home interaction is allowed.

```ts
const applyParallax = this._activeCardIndex === null && this._currentRoute === '/';
const targetOffsetX = applyParallax ? this._mouseNormX * 85 : 0;
const targetOffsetY = applyParallax ? this._mouseNormY * 40 : 0;

this._interactionOffset.x += (targetOffsetX - this._interactionOffset.x) * 0.04;
this._interactionOffset.y += (targetOffsetY - this._interactionOffset.y) * 0.04;

this.camera.position.x = this._baseCameraPose.position.x + this._interactionOffset.x;
this.camera.position.y = this._baseCameraPose.position.y + this._interactionOffset.y;
```

- [ ] **Step 5: Run build to verify interaction layering compiles**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/three/SceneManager.ts
git commit -m "feat: add home interaction offset with idle restore"
```

### Task 4: Unify Home Return Routing in App

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/hooks/useRouteTransition.ts`
- Test: `npm run build`

- [ ] **Step 1: Write the failing coordination contract**

Introduce an explicit home return trigger from `App.tsx` so returning to `/` can request a home restoration state instead of relying on whatever transform `SceneManager` happens to hold.

```ts
// App.tsx
useEffect(() => {
  if (location.pathname === '/' && activeCard === null) {
    SceneManager.instance.setHomeSceneState('home-return-from-route');
  }
}, [location.pathname, activeCard]);
```

- [ ] **Step 2: Run build to verify the new API usage fails until the imported methods and route transition order are updated**

Run: `npm run build`
Expected: FAIL if `SceneManager.instance.setHomeSceneState` or route timing still conflict with `flyTo()`.

- [ ] **Step 3: Update route transition sequencing**

Ensure `useRouteTransition()` handles route camera movement without overwriting home return restoration. If needed, keep `flyTo('/')` focused on camera depth and let `setHomeSceneState('home-return-from-route')` control home panel restoration.

```ts
// useRouteTransition.ts
useEffect(() => {
  SceneManager.instance.flyTo(location.pathname, () => {
    if (location.pathname === '/') {
      SceneManager.instance.setHomeSceneState('home-return-from-route');
    }
  });
}, [location.pathname]);
```

- [ ] **Step 4: Simplify `handleCloseCard()` to use the shared home restoration flow**

Keep the React state change in `App.tsx`, but make sure closing an active card no longer performs an implicit layout reset outside the scene state API.

```ts
const handleCloseCard = () => {
  setActiveCard(null);
  SceneManager.instance.undockCard();
  SceneManager.instance.setHomeSceneState('home-idle');
};
```

- [ ] **Step 5: Run build to verify home return coordination passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/hooks/useRouteTransition.ts
git commit -m "feat: coordinate home return state on route changes"
```

### Task 5: Add Debug Export Hooks for Preset Tuning

**Files:**
- Modify: `src/three/SceneManager.ts`
- Create: `src/three/homePanelDebug.ts`
- Test: `npm run build`

- [ ] **Step 1: Write the failing debug utility surface**

Create a debug module that formats the current camera and card transforms as preset-ready output, but do not yet call it.

```ts
// src/three/homePanelDebug.ts
export function formatHomeSceneSnapshot(input: {
  state: string;
  camera: { x: number; y: number; z: number; rx: number; ry: number; rz: number };
  panels: Array<{ x: number; y: number; z: number; rotationY: number; scale: number }>;
}) {
  return JSON.stringify(input, null, 2);
}
```

- [ ] **Step 2: Run build to verify the new debug helper compiles**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Expose a development-only snapshot logger from SceneManager**

Add a method such as `logHomeSceneSnapshot()` that prints the current three-panel and camera values in a copy-pasteable format only in development.

```ts
logHomeSceneSnapshot(label = this._homeSceneState) {
  if (!import.meta.env.DEV) return;
  console.log(formatHomeSceneSnapshot({
    state: label,
    camera: {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z,
      rx: this.camera.rotation.x,
      ry: this.camera.rotation.y,
      rz: this.camera.rotation.z,
    },
    panels: this._orbitCards.slice(0, 3).map(({ css3dObj }) => ({
      x: css3dObj.position.x,
      y: css3dObj.position.y,
      z: css3dObj.position.z,
      rotationY: css3dObj.rotation.y,
      scale: css3dObj.scale.x,
    })),
  }));
}
```

- [ ] **Step 4: Run build to verify development-only debug code remains production-safe**

Run: `npm run build`
Expected: PASS with no `import.meta` or dead-code-elimination issues.

- [ ] **Step 5: Commit**

```bash
git add src/three/homePanelDebug.ts src/three/SceneManager.ts
git commit -m "feat: add home scene snapshot debug tooling"
```

### Task 6: Verify the Required Interaction Paths

**Files:**
- Modify: `src/App.tsx` (only if cleanup needed after verification)
- Modify: `src/three/SceneManager.ts` (only if cleanup needed after verification)
- Test: `npm run build`

- [ ] **Step 1: Run the full build after all tasks**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 2: Manually verify desktop home interaction**

Run the local app and confirm all of the following:

```text
1. On `/`, move the mouse and stop. Camera offset should ease back after about 3 seconds.
2. Click left, center, and right project panels separately, then return to `/`. All three panels should restore to the configured home preset.
3. Enter a nested route from a project panel, then navigate all the way back home. Panels and camera should restore through `home-return-from-route` and settle into `home-idle`.
4. While a card is docked or a sub-page is open, mouse movement should not keep perturbing the home camera.
```

- [ ] **Step 3: Re-run build after any verification fixes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/hooks/useRouteTransition.ts src/three/SceneManager.ts src/three/homePanelLayout.ts src/three/homePanelDebug.ts
git commit -m "feat: stabilize home panel return states"
```
