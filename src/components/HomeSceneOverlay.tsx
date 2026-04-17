import { PROJECTS, type ProjectEntry } from '../projectRegistry';
import type { HomeSceneKey, HomeStateKey } from '../home/homeScenes';

interface HomeSceneOverlayProps {
  sceneKey: HomeSceneKey;
  stateKey: HomeStateKey;
  project: ProjectEntry;
  onAdvance: () => void;
  onSelectProject: (route: string) => void;
  onOpenChapter: (route: string) => void;
}

export default function HomeSceneOverlay({
  sceneKey,
  stateKey,
  project,
  onAdvance,
  onSelectProject,
  onOpenChapter,
}: HomeSceneOverlayProps) {
  const isCover = stateKey === 'cover';

  return (
    <div
      className="absolute inset-0 z-20"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        pointerEvents: 'none',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 42%, rgba(5,3,1,0.78) 100%)',
        }}
      />

      <div
        className="absolute top-8 left-8 z-30"
        style={{
          opacity: 1,
          transition: 'opacity 360ms cubic-bezier(0.16,1,0.3,1), transform 360ms cubic-bezier(0.16,1,0.3,1)',
          transform: isCover ? 'translateY(0)' : 'translateY(-2px)',
        }}
      >
        <div style={{ color: '#c8a96e', fontSize: '10px', letterSpacing: '0.25em', marginBottom: '6px' }}>
          PORTFOLIO · 2025
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
          <div style={{ color: '#f0e8d8', fontSize: '28px', lineHeight: 1.1, fontStyle: 'italic' }}>
            寿心悦
          </div>
          <div style={{ color: 'rgba(157,142,102,0.52)', fontSize: '12px', letterSpacing: '0.42em' }}>
            MONOLITH
          </div>
        </div>
        <div style={{ color: '#a09070', fontSize: '11px', letterSpacing: '0.12em', marginTop: '4px' }}>
          Xinyue Shou
        </div>
        <div style={{ width: '32px', height: '1px', background: '#c8a96e', margin: '10px 0', opacity: 0.6 }} />
        <div style={{ color: '#6d624f', fontSize: '9px', letterSpacing: '0.24em' }}>
          {sceneKey.replace('-', ' ').toUpperCase()}
        </div>
      </div>

      {isCover ? (
        <div
          className="absolute inset-0 z-20"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '56px',
          }}
        >
          <button
            onClick={onAdvance}
            style={{
              pointerEvents: 'auto',
              border: 'none',
              background: 'none',
              color: 'rgba(255,255,255,0.24)',
              fontSize: '10px',
              letterSpacing: '0.65em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            click the core to enter the index
          </button>
        </div>
      ) : (
        <div
          className="absolute inset-0 z-20"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '96px 40px 40px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '880px',
              pointerEvents: 'auto',
            }}
          >
            {PROJECTS.map((entry) => {
              const isActive = entry.route === project.route;
              return (
                <div key={entry.route} style={{ marginBottom: isActive ? '18px' : '14px' }}>
                  <button
                    onClick={() => onSelectProject(entry.route)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: isActive ? '#f0e8d8' : '#5e5039',
                      fontSize: isActive ? '18px' : '14px',
                      fontStyle: isActive ? 'italic' : 'normal',
                      letterSpacing: isActive ? '0' : '0.04em',
                      lineHeight: 1.35,
                      opacity: entry.disabled ? 0.32 : 1,
                    }}
                  >
                    <div
                      style={{
                        color: isActive ? entry.color : '#403421',
                        fontSize: '8px',
                        letterSpacing: '0.24em',
                        marginBottom: '6px',
                      }}
                    >
                      {entry.id}
                    </div>
                    {entry.title}
                  </button>

                  {isActive && (
                    <div
                      className="mini-panel-enter"
                      style={{
                        marginTop: '12px',
                        marginLeft: '10px',
                        maxWidth: '520px',
                        border: '1px solid rgba(200,169,110,0.1)',
                        background: 'rgba(10,8,6,0.52)',
                        backdropFilter: 'blur(3px)',
                        boxShadow: '0 18px 44px rgba(0,0,0,0.14)',
                        padding: '12px 14px 14px',
                      }}
                    >
                      <div style={{ color: '#6f5b92', fontSize: '9px', letterSpacing: '0.24em', marginBottom: '6px' }}>
                        CHAPTERS
                      </div>
                      <div style={{ border: '1px solid rgba(200,169,110,0.08)' }}>
                        {entry.subPages.map((subPage) => (
                          <button
                            key={subPage.route}
                            onClick={() => {
                              if (!subPage.disabled) {
                                onOpenChapter(subPage.route);
                              }
                            }}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              border: 'none',
                              borderBottom: '1px solid rgba(200,169,110,0.05)',
                              background: 'rgba(0,0,0,0.03)',
                              color: subPage.disabled ? '#4e412d' : '#7f6a49',
                              padding: '9px 12px',
                              textAlign: 'left',
                              cursor: subPage.disabled ? 'default' : 'pointer',
                            }}
                          >
                            <span
                              style={{
                                width: '16px',
                                color: '#4f422f',
                                fontSize: '9px',
                                fontStyle: 'italic',
                                flexShrink: 0,
                              }}
                            >
                              {subPage.numeral}
                            </span>
                            <span style={{ fontSize: '10px', lineHeight: 1.4 }}>{subPage.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
