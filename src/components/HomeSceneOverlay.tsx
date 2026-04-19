import { useEffect, useState } from 'react';
import { HOME_INDEX_SECTIONS, getProjectByRoute, type HomeIndexSection, type HomeSectionKey, type HomeStateKey } from '../home/homeScenes';
import { useChapterHover } from '../hooks/useChapterHover';
import { PROJECTS, type SubPagePreviewMedia } from '../projectRegistry';
import arrowIcon from '../icons/arrow.svg';
import ChapterHologramPreview from './ChapterHologramPreview';
import ChapterTerminal from './ChapterTerminal';

interface HomeSceneOverlayProps {
  stateKey: HomeStateKey;
  section: HomeIndexSection | null;
  onSelectSection: (sectionKey: HomeSectionKey) => void;
  onOpenChapter: (route: string) => void;
  onChapterHoverChange?: (route: string | null) => void;
}

const sectionList = Object.values(HOME_INDEX_SECTIONS);
const TYPE_SCALE = 1.6;
const scalePx = (value: number) => `${value * TYPE_SCALE}px`;

function getSectionPreviewMedia(sourceSection: HomeIndexSection | null): SubPagePreviewMedia[] {
  if (!sourceSection) return [];

  return sourceSection.chapters
    .map((chapter) => getProjectByRoute(sourceSection.phaseProjectRoute)?.subPages.find((subPage) => subPage.route === chapter.route)?.previewMedia)
    .filter((media): media is SubPagePreviewMedia => Boolean(media));
}

export default function HomeSceneOverlay({
  stateKey,
  section,
  onSelectSection,
  onOpenChapter,
  onChapterHoverChange,
}: HomeSceneOverlayProps) {
  const [hoveredSectionKey, setHoveredSectionKey] = useState<HomeSectionKey | null>(null);
  const orderedSections = section
    ? [section, ...sectionList.filter((entry) => entry.key !== section.key)]
    : sectionList;

  const { hoveredChapter, onChapterEnter, onChapterMove, onChapterLeave, dismiss } = useChapterHover();

  useEffect(() => {
    onChapterHoverChange?.(hoveredChapter?.route ?? null);
  }, [hoveredChapter, onChapterHoverChange]);

  useEffect(() => {
    if (stateKey === 'cover') dismiss();
  }, [dismiss, stateKey]);

  useEffect(() => {
    const activeSection = section ?? HOME_INDEX_SECTIONS.relations;
    const prioritizedMedia = getSectionPreviewMedia(activeSection);
    const deferredMedia = PROJECTS.flatMap((project) => project.subPages)
      .map((subPage) => subPage.previewMedia)
      .filter((media): media is SubPagePreviewMedia => Boolean(media))
      .filter((media) => !prioritizedMedia.includes(media));

    const imagePreloads = new Map<string, HTMLImageElement>();
    const videoPreloads = new Map<string, HTMLVideoElement>();
    let idleCallbackId: number | null = null;
    let timeoutId: number | null = null;

    const preloadMediaList = (mediaList: SubPagePreviewMedia[]) => {
      mediaList.forEach((media) => {
        if (media.type === 'image') {
          if (imagePreloads.has(media.src)) return;
          const image = new Image();
          image.decoding = 'async';
          image.src = media.src;
          imagePreloads.set(media.src, image);
          return;
        }

        if (media.poster && !imagePreloads.has(media.poster)) {
          const poster = new Image();
          poster.decoding = 'async';
          poster.src = media.poster;
          imagePreloads.set(media.poster, poster);
        }

        if (videoPreloads.has(media.src)) return;
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.muted = true;
        video.playsInline = true;
        video.src = media.src;
        video.load();
        videoPreloads.set(media.src, video);
      });
    };

    preloadMediaList(prioritizedMedia);

    const preloadDeferred = () => preloadMediaList(deferredMedia);

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleCallbackId = window.requestIdleCallback(preloadDeferred, { timeout: 1200 });
    } else {
      timeoutId = globalThis.setTimeout(preloadDeferred, 500);
    }

    return () => {
      if (idleCallbackId !== null && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== null) {
        globalThis.clearTimeout(timeoutId);
      }

      imagePreloads.forEach((image) => {
        image.src = '';
      });
      videoPreloads.forEach((video) => {
        video.pause();
        video.removeAttribute('src');
        video.load();
      });
    };
  }, [section]);

  const hoveredPreviewMedia = (() => {
    if (!hoveredChapter) return null;
    for (const proj of Object.values(HOME_INDEX_SECTIONS)) {
      const source = getProjectByRoute(proj.phaseProjectRoute);
      const found = source?.subPages.find((sp) => sp.route === hoveredChapter.route);
      if (found) return found.previewMedia ?? null;
    }
    return null;
  })();

  return (
    <div
      className="absolute inset-0 z-20"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        pointerEvents: 'none',
      }}
    >
      <style>
        {`
          @keyframes home-section-arrow-breathe {
            0%, 100% {
              opacity: 0.38;
              transform: translateX(0);
              text-shadow: 0 0 0 rgba(240, 232, 216, 0);
            }
            50% {
              opacity: 0.8;
              transform: translateX(3px);
              text-shadow: 0 0 10px rgba(240, 232, 216, 0.16);
            }
          }
        `}
      </style>
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
              const isHovered = hoveredSectionKey === entry.key;
              return (
                <div key={entry.key} style={{ marginBottom: isActive ? '24px' : '16px' }}>
                  <button
                    onClick={() => onSelectSection(entry.key)}
                    onMouseEnter={() => setHoveredSectionKey(entry.key)}
                    onMouseLeave={() => setHoveredSectionKey((current) => (current === entry.key ? null : current))}
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
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: isActive ? scalePx(20) : scalePx(15),
                            fontStyle: isActive ? 'italic' : 'normal',
                            letterSpacing: isActive ? '0' : '0.03em',
                            lineHeight: 1.35,
                            color: isActive ? '#f0e8d8' : isHovered ? '#f5eee0' : '#8a7552',
                            transition:
                              'color 220ms cubic-bezier(0.16,1,0.3,1), text-shadow 220ms cubic-bezier(0.16,1,0.3,1), transform 220ms cubic-bezier(0.16,1,0.3,1)',
                            textShadow: isHovered && !isActive ? '0 0 12px rgba(240,232,216,0.14)' : 'none',
                            transform: isHovered && !isActive ? 'translateX(2px)' : 'translateX(0)',
                          }}
                        >
                          {entry.subtitle}
                        </div>
                        {!isActive ? (
                          <span
                            aria-hidden="true"
                            style={{
                              width: '30px',
                              height: '30px',
                              flexShrink: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transform: isHovered ? 'translateX(9px)' : 'translateX(0)',
                              opacity: isHovered ? 1 : 0.72,
                              transition:
                                'transform 260ms cubic-bezier(0.16,1,0.3,1), opacity 220ms cubic-bezier(0.16,1,0.3,1)',
                              animation: isHovered ? 'home-section-arrow-breathe 2.4s ease-in-out infinite' : 'none',
                            }}
                          >
                            <img
                              src={arrowIcon}
                              alt=""
                              style={{
                                width: '100%',
                                height: '100%',
                                display: 'block',
                                filter: isHovered
                                  ? 'brightness(2.5) saturate(0.3)'
                                  : 'brightness(1.05) saturate(0.85)',
                                transition: 'filter 220ms cubic-bezier(0.16,1,0.3,1)',
                              }}
                            />
                          </span>
                        ) : null}
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
                        {entry.chapters.map((chapter, index) => {
                          const sourceProject = getProjectByRoute(entry.phaseProjectRoute);
                          const projectColor = sourceProject?.color ?? '#c8a96e';
                          const projectTitle = sourceProject?.title ?? entry.subtitle;
                          const isHovered = hoveredChapter?.route === chapter.route;
                          return (
                            <button
                              key={chapter.route}
                              onClick={() => onOpenChapter(chapter.route)}
                              onMouseEnter={(e) => {
                                onChapterEnter({
                                  route: chapter.route,
                                  numeral: chapter.numeral,
                                  label: chapter.label,
                                  projectColor,
                                  projectTitle,
                                  chapterIndex: index,
                                  chapterTotal: entry.chapters.length,
                                  pointerX: e.clientX,
                                  pointerY: e.clientY,
                                });
                              }}
                              onMouseMove={(e) => {
                                onChapterMove(chapter.route, e.clientX, e.clientY);
                              }}
                              onMouseLeave={() => onChapterLeave(chapter.route)}
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                border: 'none',
                                borderBottom: index === entry.chapters.length - 1 ? 'none' : '1px solid rgba(200,169,110,0.05)',
                                background: isHovered ? 'rgba(200,169,110,0.06)' : 'rgba(0,0,0,0.03)',
                                color: isHovered ? '#d4c4a0' : '#7f6a49',
                                padding: '10px 12px',
                                textAlign: 'left',
                                cursor: 'pointer',
                                transition: 'background 220ms cubic-bezier(0.16,1,0.3,1), color 220ms cubic-bezier(0.16,1,0.3,1)',
                              }}
                            >
                              <span
                                style={{
                                  width: '16px',
                                  color: isHovered ? projectColor : '#4f422f',
                                  fontSize: scalePx(9),
                                  fontStyle: 'italic',
                                  flexShrink: 0,
                                  transition: 'color 220ms cubic-bezier(0.16,1,0.3,1)',
                                }}
                              >
                                {chapter.numeral}
                              </span>
                              <span style={{ fontSize: scalePx(10), lineHeight: 1.4 }}>{chapter.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ChapterHologramPreview
        chapter={hoveredChapter}
        previewMedia={hoveredPreviewMedia}
      />
      <ChapterTerminal chapter={hoveredChapter} />
    </div>
  );
}
