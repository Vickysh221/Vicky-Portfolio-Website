import { PROJECTS, type ProjectEntry } from '../projectRegistry';

export type HomeSceneKey = 'aether-weave';
export type HomeStateKey = 'cover' | 'index';
export type HomeActionType = 'background-activate' | 'advance' | 'back' | 'open-project';
const PROJECT_PHASE_INDEX: Record<string, number> = {
  '/agentic-design-development': 1,
  '/academic-gamification': 5,
  '/jidu-hmi': 4,
};

export interface HomeBackgroundVisualPatch {
  cameraZOffset: number;
  noiseMultiplier: number;
  starOpacity: number;
  rotationScale: number;
}

export interface HomeStateConfig {
  key: HomeStateKey;
  visual: HomeBackgroundVisualPatch;
  actions?: Partial<Record<HomeActionType, HomeStateKey>>;
}

export interface HomeSceneConfig {
  key: HomeSceneKey;
  defaultState: HomeStateKey;
  defaultProjectRoute: string;
  states: Record<HomeStateKey, HomeStateConfig>;
}

export const HOME_SCENES: Record<HomeSceneKey, HomeSceneConfig> = {
  'aether-weave': {
    key: 'aether-weave',
    defaultState: 'cover',
    defaultProjectRoute: '/agentic-design-development',
    states: {
      cover: {
        key: 'cover',
        visual: {
          cameraZOffset: 0,
          noiseMultiplier: 1,
          starOpacity: 0.12,
          rotationScale: 1,
        },
        actions: {
          'background-activate': 'index',
          advance: 'index',
        },
      },
      index: {
        key: 'index',
        visual: {
          cameraZOffset: -1.4,
          noiseMultiplier: 1.08,
          starOpacity: 0.16,
          rotationScale: 0.78,
        },
        actions: {
          back: 'cover',
          'open-project': 'index',
          'background-activate': 'index',
        },
      },
    },
  },
};

export function getHomeSceneConfig(sceneKey: HomeSceneKey): HomeSceneConfig {
  return HOME_SCENES[sceneKey];
}

export function getProjectByRoute(route: string): ProjectEntry | null {
  return PROJECTS.find((project) => project.route === route) ?? null;
}

export function resolveHomeAction(
  sceneKey: HomeSceneKey,
  stateKey: HomeStateKey,
  action: HomeActionType,
): HomeStateKey {
  const scene = getHomeSceneConfig(sceneKey);
  return scene.states[stateKey].actions?.[action] ?? stateKey;
}

export function getHomeProjectPhaseIndex(route: string): number {
  return PROJECT_PHASE_INDEX[route] ?? 1;
}
