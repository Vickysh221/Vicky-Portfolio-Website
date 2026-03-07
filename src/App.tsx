import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SceneManager } from './three/SceneManager';
import { useRouteTransition } from './hooks/useRouteTransition';
import Portfolio from './Portfolio';
import ProjectCard from './pages/ProjectCard';

const PROJECT_COLORS = ['#c8a96e', '#7a9e8e', '#8b7db5'];

export default function App() {
  const webglRef = useRef<HTMLDivElement>(null);
  const css3dRef = useRef<HTMLDivElement>(null);
  const orbitCardInners = useRef<HTMLDivElement[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

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

      {/* CSS3D layer — orbit cards live here */}
      <div ref={css3dRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

      {/* Home UI — fades when a card is docked */}
      <Portfolio
        activeCard={activeCard}
        onProjectClick={handleProjectClick}
        onCloseCard={handleCloseCard}
      />

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
