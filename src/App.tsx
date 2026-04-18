import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeSceneOverlay from './components/HomeSceneOverlay';
import HomeVoidBackground from './components/HomeVoidBackground';
import { PAGE_META, getSlideCount } from './constants/routeDepth';
import { getHomeProjectPhaseIndex, getHomeSceneConfig, getHomeSection, getHomeSectionByProjectRoute, resolveHomeAction, type HomeActionType, type HomeSceneKey, type HomeSectionKey, type HomeStateKey } from './home/homeScenes';
import { useIsMobile } from './hooks/useIsMobile';
import { useRouteTransition } from './hooks/useRouteTransition';
import { buildHomeFocusState, isProjectRootRoute, type HomeFocusLocationState } from './navigation/homeFocus';
import PageTemplate from './pages/PageTemplate';
import SubPageCarousel from './pages/SubPageCarousel';
import { PROJECT_COLORS } from './projectRegistry';
import { SceneManager } from './three/SceneManager';

export default function App() {
  const webglRef = useRef<HTMLDivElement>(null);
  const css3dRef = useRef<HTMLDivElement>(null);
  const [homeSceneKey] = useState<HomeSceneKey>('aether-weave');
  const [homeStateKey, setHomeStateKey] = useState<HomeStateKey>('cover');
  const [selectedSectionKey, setSelectedSectionKey] = useState<HomeSectionKey | null>(() => getHomeSceneConfig('aether-weave').defaultSectionKey);
  const [hoveredChapterRoute, setHoveredChapterRoute] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const locationState = (typeof location.state === 'object' && location.state
    ? location.state as HomeFocusLocationState
    : null);
  const focusProjectRoute = typeof locationState?.focusProjectRoute === 'string'
    ? locationState.focusProjectRoute
    : null;
  const isHome = location.pathname === '/';
  const isProjectRootPath = isProjectRootRoute(location.pathname);
  const isSubPage = location.pathname !== '/' && !!PAGE_META[location.pathname] && !isProjectRootPath;

  const homeScene = getHomeSceneConfig(homeSceneKey);
  const focusedSection = focusProjectRoute ? getHomeSectionByProjectRoute(focusProjectRoute) : null;
  const selectedSection = focusedSection ?? (selectedSectionKey ? getHomeSection(selectedSectionKey) : null);
  const fallbackSection = getHomeSection(homeScene.defaultSectionKey);
  const activeSection = selectedSection ?? fallbackSection;
  const effectiveHomeStateKey: HomeStateKey = focusedSection ? 'index' : homeStateKey;
  const activeVisualState = homeScene.states[effectiveHomeStateKey].visual;
  const activePhaseIndex = getHomeProjectPhaseIndex(activeSection.phaseProjectRoute);

  useRouteTransition();

  useEffect(() => {
    if (!webglRef.current || !css3dRef.current) return;

    const sceneManager = SceneManager.instance;
    sceneManager.init(webglRef.current, css3dRef.current, PROJECT_COLORS);

    return () => {
      sceneManager.dispose();
    };
  }, []);

  useEffect(() => {
    if (!isProjectRootPath) return;
    navigate('/', {
      replace: true,
      state: buildHomeFocusState(location.pathname),
    });
  }, [isProjectRootPath, location.pathname, navigate]);

  useEffect(() => {
    if (location.pathname !== '/' || !focusProjectRoute) return;
    navigate('/', { replace: true, state: null });
  }, [focusProjectRoute, location.pathname, navigate]);

  useEffect(() => {
    if (location.pathname !== '/' || focusProjectRoute) return;
    SceneManager.instance.resetToHomeIdle();
  }, [focusProjectRoute, location.pathname]);

  const dispatchHomeAction = (action: HomeActionType) => {
    setHomeStateKey((current) => resolveHomeAction(homeSceneKey, current, action));
  };

  const handleBackgroundActivate = () => {
    if (!isHome) return;
    dispatchHomeAction('background-activate');
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {isHome && (
        <HomeVoidBackground
          phaseIndex={activePhaseIndex}
          onBackgroundActivate={handleBackgroundActivate}
          chromeVisible={false}
          visualState={activeVisualState}
        />
      )}

      <div
        className={`three-host${isHome && hoveredChapterRoute ? ' is-receded' : ''}`}
        style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }}
      >
        <div ref={webglRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div ref={css3dRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      </div>

      {isHome && (
        <HomeSceneOverlay
          stateKey={effectiveHomeStateKey}
          section={selectedSection}
          onAdvance={() => dispatchHomeAction('advance')}
          onSelectSection={(sectionKey) => {
            setSelectedSectionKey((current) => (current === sectionKey ? null : sectionKey));
            dispatchHomeAction('open-project');
          }}
          onOpenChapter={(route) => navigate(route)}
          onChapterHoverChange={setHoveredChapterRoute}
        />
      )}

      {isSubPage && (() => {
        const count = getSlideCount(location.pathname);
        const meta = PAGE_META[location.pathname];

        if (count > 1) {
          if (isMobile) {
            return (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 40,
                  pointerEvents: 'auto',
                }}
              >
                <SubPageCarousel
                  route={location.pathname}
                  accentColor={meta.color}
                  count={count}
                />
              </div>
            );
          }

          return (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 40,
                perspective: '1800px',
                perspectiveOrigin: '50% 50%',
                pointerEvents: 'none',
              }}
            >
              <SubPageCarousel
                route={location.pathname}
                accentColor={meta.color}
                count={count}
              />
            </div>
          );
        }

        if (isMobile) {
          return (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 40,
                pointerEvents: 'auto',
              }}
            >
              <PageTemplate route={location.pathname} isMobile />
            </div>
          );
        }

        return (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              perspective: '1000px',
              pointerEvents: 'auto',
            }}
          >
            <div
              className="panel-enter-3d"
              style={{
                width: '820px',
                height: '680px',
                maxWidth: '90vw',
                maxHeight: '88vh',
              }}
            >
              <PageTemplate route={location.pathname} />
            </div>
          </div>
        );
      })()}
    </div>
  );
}
