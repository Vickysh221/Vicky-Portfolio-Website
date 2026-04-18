import { HOME_INDEX_SECTIONS, type HomeIndexSection, type HomeSectionKey, type HomeStateKey } from '../home/homeScenes';

interface HomeSceneOverlayProps {
  stateKey: HomeStateKey;
  section: HomeIndexSection | null;
  onAdvance: () => void;
  onSelectSection: (sectionKey: HomeSectionKey) => void;
  onOpenChapter: (route: string) => void;
}

const sectionList = Object.values(HOME_INDEX_SECTIONS);
const TYPE_SCALE = 1.6;
const scalePx = (value: number) => `${value * TYPE_SCALE}px`;

export default function HomeSceneOverlay({
  stateKey,
  section,
  onAdvance,
  onSelectSection,
  onOpenChapter,
}: HomeSceneOverlayProps) {
  const isCover = stateKey === 'cover';
  const orderedSections = section
    ? [section, ...sectionList.filter((entry) => entry.key !== section.key)]
    : sectionList;

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
              fontSize: scalePx(10),
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
            justifyContent: 'flex-start',
            padding: '72px 0 40px',
          }}
        >
          <div
            style={{
              width: '50%',
              display: 'flex',
              justifyContent: 'center',
              padding: '0 24px',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '680px',
                pointerEvents: 'auto',
              }}
            >
              <div
                style={{
                  opacity: 1,
                  transition: 'opacity 360ms cubic-bezier(0.16,1,0.3,1), transform 360ms cubic-bezier(0.16,1,0.3,1)',
                  transform: 'translateY(-2px)',
                  marginBottom: '34px',
                }}
              >
                <div style={{ color: '#c8a96e', fontSize: scalePx(10), letterSpacing: '0.25em', marginBottom: '8px' }}>
                  PORTFOLIO
                </div>
                <div style={{ color: '#a09070', fontSize: scalePx(11), letterSpacing: '0.12em', marginTop: '4px' }}>
                  Xinyue Shou
                </div>
                <div style={{ width: '32px', height: '1px', background: '#c8a96e', margin: '10px 0', opacity: 0.6 }} />
              </div>

              {orderedSections.map((entry) => {
                const isActive = entry.key === section?.key;
                return (
                  <div key={entry.key} style={{ marginBottom: isActive ? '24px' : '16px' }}>
                    <button
                      onClick={() => onSelectSection(entry.key)}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: isActive ? '#f0e8d8' : '#5e5039',
                        padding: 0,
                      }}
                    >
                      <div
                        style={{
                          color: isActive ? '#c8a96e' : '#403421',
                          fontSize: scalePx(10),
                          letterSpacing: '0.26em',
                          marginBottom: '6px',
                        }}
                      >
                        {entry.title}
                      </div>
                      <div
                        style={{
                          fontSize: isActive ? scalePx(20) : scalePx(15),
                          fontStyle: isActive ? 'italic' : 'normal',
                          letterSpacing: isActive ? '0' : '0.03em',
                          lineHeight: 1.35,
                        }}
                      >
                        {entry.subtitle}
                      </div>
                    </button>

                    {isActive && (
                      <div
                        className="mini-panel-enter"
                        style={{
                          marginTop: '14px',
                          marginLeft: '10px',
                          width: 'calc(100% + 200px)',
                          maxWidth: '840px',
                          border: '1px solid rgba(200,169,110,0.08)',
                          background: 'rgba(10,8,6,0.44)',
                          backdropFilter: 'blur(3px)',
                          boxShadow: '0 18px 44px rgba(0,0,0,0.12)',
                          padding: '14px 16px 16px',
                        }}
                      >
                        <div style={{ color: '#8b7db5', fontSize: scalePx(9), letterSpacing: '0.22em', marginBottom: '8px' }}>
                          {entry.descriptionTitle}
                        </div>
                        <p
                          style={{
                            margin: 0,
                            color: '#8a7552',
                            fontSize: '12px',
                            lineHeight: 1.9,
                          }}
                        >
                          {entry.body}
                        </p>

                        <div style={{ color: '#6f5b92', fontSize: scalePx(9), letterSpacing: '0.24em', marginTop: '14px', marginBottom: '6px' }}>
                          RELATED PROJECTS
                        </div>
                        <div style={{ border: '1px solid rgba(200,169,110,0.08)' }}>
                          {entry.chapters.map((chapter, index) => (
                            <button
                              key={chapter.route}
                              onClick={() => onOpenChapter(chapter.route)}
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                border: 'none',
                                borderBottom: index === entry.chapters.length - 1 ? 'none' : '1px solid rgba(200,169,110,0.05)',
                                background: 'rgba(0,0,0,0.03)',
                                color: '#7f6a49',
                                padding: '10px 12px',
                                textAlign: 'left',
                                cursor: 'pointer',
                              }}
                            >
                              <span
                              style={{
                                width: '16px',
                                color: '#4f422f',
                                fontSize: scalePx(9),
                                fontStyle: 'italic',
                                flexShrink: 0,
                              }}
                            >
                              {chapter.numeral}
                            </span>
                              <span style={{ fontSize: scalePx(10), lineHeight: 1.4 }}>{chapter.label}</span>
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
        </div>
      )}
    </div>
  );
}
