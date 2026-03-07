import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SceneManager } from '../three/SceneManager';

/**
 * Listens to route changes and drives the camera via SceneManager.flyTo().
 * Safe to call before SceneManager is initialized — pending routes are queued.
 */
export function useRouteTransition() {
  const location = useLocation();

  useEffect(() => {
    SceneManager.instance.flyTo(location.pathname);
  }, [location.pathname]);
}
