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

const HIDDEN_PANEL_SPECS = [
  { position: [0, 10, -260] as const, rotationY: 0, scale: 0.02 },
  { position: [980, -8, -120] as const, rotationY: -0.22, scale: 0.04 },
  { position: [-980, -8, -120] as const, rotationY: 0.22, scale: 0.04 },
] as const;

const HOME_BASE_CAMERA_POSE: CameraPose = {
  position: new THREE.Vector3(0, 0, 0),
  rotation: new THREE.Euler(0, 0, 0),
};

const HOME_RETURN_CAMERA_POSE: CameraPose = {
  position: new THREE.Vector3(0, 20, 140),
  rotation: new THREE.Euler(-0.018, 0, 0),
};

const HOME_DOCKED_CAMERA_POSES: Record<0 | 1 | 2, CameraPose> = {
  0: {
    position: new THREE.Vector3(0, 12, -120),
    rotation: new THREE.Euler(0.008, 0, 0),
  },
  1: {
    position: new THREE.Vector3(120, 10, -90),
    rotation: new THREE.Euler(0.006, -0.05, 0),
  },
  2: {
    position: new THREE.Vector3(-120, 10, -90),
    rotation: new THREE.Euler(0.006, 0.05, 0),
  },
};

function createHomePanelTransform(spec: (typeof HOME_PANEL_SPECS)[number]): HomePanelTransform {
  return {
    position: new THREE.Vector3(...spec.position),
    rotationY: spec.rotationY,
    scale: spec.scale,
  };
}

function createHiddenHomePanelTransform(spec: (typeof HIDDEN_PANEL_SPECS)[number]): HomePanelTransform {
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
  panels?: HomePanelTuple;
}): HomeScenePreset {
  return {
    panels: overrides?.panels ?? (HOME_PANEL_SPECS.map(createHomePanelTransform) as HomePanelTuple),
    camera: overrides?.camera ?? HOME_BASE_CAMERA_POSE,
    duration: overrides?.duration ?? 0.75,
    ease: overrides?.ease ?? 'power3.inOut',
  };
}

function createDockedPanels(activeIndex: 0 | 1 | 2): HomePanelTuple {
  return HOME_PANEL_SPECS.map((spec, index) => (
    index === activeIndex ? createHomePanelTransform(spec) : createHiddenHomePanelTransform(HIDDEN_PANEL_SPECS[index])
  )) as HomePanelTuple;
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
      camera: HOME_RETURN_CAMERA_POSE,
      duration: 1.05,
      ease: 'power4.out',
    }),
  'home-docked-0': () => createHomeScenePreset({
    panels: createDockedPanels(0),
    camera: HOME_DOCKED_CAMERA_POSES[0],
    duration: 0.55,
    ease: 'power3.inOut',
  }),
  'home-docked-1': () => createHomeScenePreset({
    panels: createDockedPanels(1),
    camera: HOME_DOCKED_CAMERA_POSES[1],
    duration: 0.5,
    ease: 'power3.inOut',
  }),
  'home-docked-2': () => createHomeScenePreset({
    panels: createDockedPanels(2),
    camera: HOME_DOCKED_CAMERA_POSES[2],
    duration: 0.5,
    ease: 'power3.inOut',
  }),
};

export function getHomeScenePreset(state: HomeSceneStateKey): HomeScenePreset {
  return cloneHomeScenePreset(HOME_PRESET_FACTORIES[state]());
}
