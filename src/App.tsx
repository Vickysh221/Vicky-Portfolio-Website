import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { SceneManager } from './three/SceneManager';
import { useRouteTransition } from './hooks/useRouteTransition';
import { PAGE_META, getSlideCount } from './constants/routeDepth';
import Portfolio from './Portfolio';
import ProjectCard from './pages/ProjectCard';
import PageTemplate from './pages/PageTemplate';
import SubPageCarousel from './pages/SubPageCarousel';

const PROJECT_COLORS = ['#c8a96e', '#7a9e8e', '#8b7db5'];

export default function App() {
  const webglRef = useRef<HTMLDivElement>(null);
  const css3dRef = useRef<HTMLDivElement>(null);
  const orbitCardInners = useRef<HTMLDivElement[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const location = useLocation();
  // Show PageTemplate overlay for any non-home route with known meta
  const isSubPage = location.pathname !== '/' && !!PAGE_META[location.pathname];

  // Drive camera on route changes (sub-page navigation)
  useRouteTransition();

  useEffect(() => {
    if (!webglRef.current || !css3dRef.current) return;

    const sm = SceneManager.instance;
    sm.init(webglRef.current, css3dRef.current, PROJECT_COLORS);

    const inners = sm.createOrbitCards(3);
    orbitCardInners.current = inners;

    setInitialized(true);

    return () => {
      sm.dispose();
    };
  }, []);

  const handleProjectClick = (i: number) => {
    setActiveCard(i);
    SceneManager.instance.dockCard(i);
  };

  const handleCloseCard = () => {
    setActiveCard(null);
    SceneManager.instance.undockCard();
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#0e0c09',
      }}
    >
      {/* WebGL canvas layer */}
      <div ref={webglRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* CSS3D layer — z:30 when card docked so it renders above Portfolio z:20 */}
      <div
        ref={css3dRef}
        style={{ position: 'absolute', inset: 0, zIndex: activeCard !== null ? 30 : 1 }}
      />

      {/* Home UI — fades when a card is docked or on sub-routes */}
      <Portfolio
        activeCard={activeCard}
        onProjectClick={handleProjectClick}
        onCloseCard={handleCloseCard}
      />

      {/* Sub-page DOM overlay — shown for all non-home routes (chapter pages) */}
      {isSubPage && (() => {
        const count = getSlideCount(location.pathname);
        const meta = PAGE_META[location.pathname];
        if (count > 1) {
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

      {/* React portals → CSS3D orbit card inner divs */}
      {initialized &&
        [0, 1, 2].map((i) => {
          const el = orbitCardInners.current[i];
          if (!el) return null;
          return createPortal(
            <ProjectCard index={i} isActive={activeCard === i} onClose={handleCloseCard} />,
            el,
            `orbit-${i}`,
          );
        })}
    </div>
  );
}
