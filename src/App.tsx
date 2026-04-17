import { useEffect, useRef, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeVoidBackground from './components/HomeVoidBackground';
import { SceneManager } from './three/SceneManager';
import { useRouteTransition } from './hooks/useRouteTransition';
import { PAGE_META, getSlideCount } from './constants/routeDepth';
import { useIsMobile } from './hooks/useIsMobile';
import { buildHomeFocusState, getProjectIndexForRoute, isProjectRootRoute, type HomeFocusLocationState } from './navigation/homeFocus';
import Portfolio from './Portfolio';
import ProjectCard from './pages/ProjectCard';
import PageTemplate from './pages/PageTemplate';
import SubPageCarousel from './pages/SubPageCarousel';
import { PROJECT_COLORS, PROJECT_ROUTES } from './projectRegistry';

export default function App() {
  const webglRef = useRef<HTMLDivElement>(null);
  const css3dRef = useRef<HTMLDivElement>(null);
  const orbitCardInners = useRef<HTMLDivElement[]>([]);
  const activeCardRef = useRef<number | null>(null);
  const suppressCardOpenUntilRef = useRef(0);
  const [initialized, setInitialized] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

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
  // Show PageTemplate overlay for any non-home route with known meta
  const isSubPage = location.pathname !== '/' && !!PAGE_META[location.pathname] && !isProjectRootPath;

  function handleProjectClick(i: number) {
    setActiveCard(i);
    SceneManager.instance.dockCard(i);
  }

  const handleBackgroundActivate = () => {
    if (!isHome || activeCard !== null) return;
    const sceneManager = SceneManager.instance;
    if (sceneManager.currentHomeSceneState === 'home-intro') {
      sceneManager.setHomeSceneState('home-idle');
    }
  };

  // Drive camera on route changes (sub-page navigation)
  useRouteTransition();

  useEffect(() => {
    activeCardRef.current = activeCard;
  }, [activeCard]);

  useEffect(() => {
    if (!webglRef.current || !css3dRef.current) return;

    const sm = SceneManager.instance;
    sm.init(webglRef.current, css3dRef.current, PROJECT_COLORS);

    const inners = sm.createOrbitCards(PROJECT_ROUTES.length);
    orbitCardInners.current = inners;
    inners.forEach((inner, i) => {
      const outer = inner.parentElement as HTMLDivElement | null;
      if (!outer) return;
      outer.style.pointerEvents = 'auto';
      outer.style.cursor = 'pointer';
      outer.onclick = () => {
        if (Date.now() < suppressCardOpenUntilRef.current) return;
        if (activeCardRef.current !== null) return;
        handleProjectClick(i);
      };
    });

    setInitialized(true);

    return () => {
      sm.dispose();
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
    if (!initialized || location.pathname !== '/' || !focusProjectRoute) return;

    const projectIndex = getProjectIndexForRoute(focusProjectRoute);
    if (projectIndex === null) {
      navigate('/', { replace: true, state: null });
      return;
    }

    setActiveCard(projectIndex);
    SceneManager.instance.dockCard(projectIndex);
    navigate('/', { replace: true, state: null });
  }, [focusProjectRoute, initialized, location.pathname, navigate]);

  useEffect(() => {
    if (!initialized || location.pathname !== '/' || activeCard !== null || focusProjectRoute) return;
    SceneManager.instance.resetToHomeIdle();
  }, [activeCard, focusProjectRoute, initialized, location.pathname]);

  const handleCloseCard = () => {
    suppressCardOpenUntilRef.current = Date.now() + 250;
    activeCardRef.current = null;
    setActiveCard(null);
    SceneManager.instance.undockCard();
  };

  const handleBackToHomeFromCard = () => {
    suppressCardOpenUntilRef.current = Date.now() + 250;
    activeCardRef.current = null;
    flushSync(() => {
      setActiveCard(null);
    });
    SceneManager.instance.resetToHomeIdle();
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
      {isHome && <HomeVoidBackground onBackgroundActivate={handleBackgroundActivate} />}

      {/* WebGL canvas layer */}
      <div ref={webglRef} style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }} />

      {/* CSS3D layer — z:30 when card docked so it renders above Portfolio z:20 */}
      <div
        ref={css3dRef}
        style={{ position: 'absolute', inset: 0, zIndex: activeCard !== null ? 30 : 6, pointerEvents: 'none' }}
      />

      {/* Home UI — fades when a card is docked or on sub-routes */}
      <Portfolio
        activeCard={activeCard}
        onProjectClick={handleProjectClick}
        onCloseCard={handleCloseCard}
        showProjectDirectory={false}
      />

      {/* Sub-page DOM overlay — shown for all non-home routes (chapter pages) */}
      {isSubPage && (() => {
        const count = getSlideCount(location.pathname);
        const meta = PAGE_META[location.pathname];
        if (count > 1) {
          // Mobile: no perspective wrapper, SubPageCarousel renders flat fullscreen
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
          // Desktop: 3D perspective carousel
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
        // Single-slide page
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

      {isMobile && activeCard !== null && location.pathname === '/' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 50,
            pointerEvents: 'auto',
          }}
        >
          <PageTemplate
            route={PROJECT_ROUTES[activeCard]}
            isMobile
            onBackOverride={handleBackToHomeFromCard}
            onNavigateAway={handleCloseCard}
          />
        </div>
      )}

      {/* React portals → CSS3D orbit card inner divs */}
      {initialized &&
        PROJECT_ROUTES.map((_, i) => {
          const el = orbitCardInners.current[i];
          if (!el) return null;
          return createPortal(
            <ProjectCard
              index={i}
              isActive={activeCard === i}
              onClose={handleBackToHomeFromCard}
              onOpen={() => handleProjectClick(i)}
            />,
            el,
            `orbit-${i}`,
          );
        })}
    </div>
  );
}
