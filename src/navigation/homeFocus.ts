import { PROJECT_ROUTES } from '../projectRegistry';

export interface HomeFocusLocationState {
  focusProjectRoute?: string;
}

export function isProjectRootRoute(route: string): boolean {
  return PROJECT_ROUTES.includes(route);
}

export function getProjectIndexForRoute(route: string): number | null {
  const index = PROJECT_ROUTES.indexOf(route);
  return index >= 0 ? index : null;
}

export function buildHomeFocusState(route: string): HomeFocusLocationState {
  return { focusProjectRoute: route };
}
