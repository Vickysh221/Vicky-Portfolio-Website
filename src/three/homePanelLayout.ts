import * as THREE from 'three';

export interface HomePanelTransform {
  position: THREE.Vector3;
  rotationY: number;
  scale: number;
}

type HomePanelTuple = [HomePanelTransform, HomePanelTransform, HomePanelTransform];

export interface CameraPose {
  position: THREE.Vector3;
  rotation: THREE.Euler;
}

export interface HomeScenePreset {
  panels: HomePanelTuple;
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

const HOME_PANEL_SPECS = [
  { position: [0, 40, 350] as const, rotationY: 0, scale: 0.44 },
  { position: [640, 24, 95] as const, rotationY: -0.15, scale: 0.36 },
  { position: [-640, 24, 95] as const, rotationY: 0.15, scale: 0.36 },
] as const;

const HOME_BASE_CAMERA_POSE: CameraPose = {
  position: new THREE.Vector3(0, 0, 0),
  rotation: new THREE.Euler(0, 0, 0),
};

function createHomePanelTransform(spec: (typeof HOME_PANEL_SPECS)[number]): HomePanelTransform {
  return {
    position: new THREE.Vector3(...spec.position),
    rotationY: spec.rotationY,
    scale: spec.scale,
  };
}

function createHomeScenePreset(overrides?: {
  camera?: CameraPose;
  duration?: number;
  ease?: string;
}): HomeScenePreset {
  return {
    panels: HOME_PANEL_SPECS.map(createHomePanelTransform) as HomePanelTuple,
    camera: overrides?.camera ?? HOME_BASE_CAMERA_POSE,
    duration: overrides?.duration ?? 0.75,
    ease: overrides?.ease ?? 'power3.inOut',
  };
}

function cloneHomeScenePreset(preset: HomeScenePreset): HomeScenePreset {
  return {
    panels: preset.panels.map(panel => ({
      position: panel.position.clone(),
      rotationY: panel.rotationY,
      scale: panel.scale,
    })) as HomePanelTuple,
    camera: {
      position: preset.camera.position.clone(),
      rotation: preset.camera.rotation.clone(),
    },
    duration: preset.duration,
    ease: preset.ease,
  };
}

const HOME_PRESET_FACTORIES: Record<HomeSceneStateKey, () => HomeScenePreset> = {
  'home-idle': () => createHomeScenePreset(),
  'home-return-from-route': () =>
    createHomeScenePreset({
      duration: 0.95,
    }),
  'home-docked-0': () => createHomeScenePreset(),
  'home-docked-1': () => createHomeScenePreset(),
  'home-docked-2': () => createHomeScenePreset(),
};

export function getHomeScenePreset(state: HomeSceneStateKey): HomeScenePreset {
  return cloneHomeScenePreset(HOME_PRESET_FACTORIES[state]());
}
