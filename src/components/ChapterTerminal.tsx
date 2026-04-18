import { useEffect, useMemo, useRef, useState } from 'react';
import type { HoveredChapter } from '../hooks/useChapterHover';
import { getChapterSummary } from '../home/chapterSummaries';

interface ChapterTerminalProps {
  chapter: HoveredChapter | null;
  /** Timestamp string (yyyy-mm-dd) so renders are deterministic per session. */
  today?: string;
}

const WIDTH = 360;
const PROGRESS_LINES = [
  '正在读取章节上下文...',
  '调取子项目元数据...',
  '生成一句话摘要...',
];

const TYPE_SPEED_MS = 28;
const ERASE_SPEED_MS = 15;
const PROGRESS_INTERVAL_MS = 180;

function useTypingEngine(text: string, chapterRoute: string | null) {
  const [display, setDisplay] = useState('');
  const [phase, setPhase] = useState<'idle' | 'erasing' | 'typing' | 'done'>('idle');
  const prevRouteRef = useRef<string | null>(null);
  const displayRef = useRef('');
  const targetRef = useRef(text);

  useEffect(() => {
    targetRef.current = text;
  }, [text]);

  useEffect(() => {
    displayRef.current = display;
  }, [display]);

  useEffect(() => {
    if (!chapterRoute) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay('');
      displayRef.current = '';
      setPhase('idle');
      prevRouteRef.current = null;
      return;
    }

    let cancelled = false;
    const prevRoute = prevRouteRef.current;
    prevRouteRef.current = chapterRoute;

    const type = (from: string) => {
      if (cancelled) return;
      setPhase('typing');
      let current = from;
      const target = targetRef.current;
      const tick = () => {
        if (cancelled) return;
        if (current.length >= target.length) {
          setPhase('done');
          return;
        }
        current = target.slice(0, current.length + 1);
        displayRef.current = current;
        setDisplay(current);
        window.setTimeout(tick, TYPE_SPEED_MS);
      };
      tick();
    };

    const erase = (startDisplay: string) => {
      if (cancelled) return;
      setPhase('erasing');
      let current = startDisplay;
      const tick = () => {
        if (cancelled) return;
        if (current.length === 0) {
          type('');
          return;
        }
        current = current.slice(0, -1);
        displayRef.current = current;
        setDisplay(current);
        window.setTimeout(tick, ERASE_SPEED_MS);
      };
      tick();
    };

    if (prevRoute === null) {
      displayRef.current = '';
      setDisplay('');
      type('');
    } else {
      erase(displayRef.current);
    }

    return () => {
      cancelled = true;
    };
  }, [chapterRoute]);

  return { display, phase };
}

function useProgressDots(chapterRoute: string | null) {
  const [litCount, setLitCount] = useState(0);

  useEffect(() => {
    if (!chapterRoute) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLitCount(0);
      return;
    }
    let cancelled = false;
    let i = 0;
    setLitCount(0);
    const tick = () => {
      if (cancelled) return;
      i += 1;
      setLitCount(i);
      if (i < PROGRESS_LINES.length) {
        window.setTimeout(tick, PROGRESS_INTERVAL_MS);
      }
    };
    const initial = window.setTimeout(tick, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(initial);
    };
  }, [chapterRoute]);

  return litCount;
}

export default function ChapterTerminal({ chapter, today }: ChapterTerminalProps) {
  const summary = chapter ? getChapterSummary(chapter.route) : '';
  const { display, phase } = useTypingEngine(summary, chapter?.route ?? null);
  const litCount = useProgressDots(chapter?.route ?? null);
  const accent = chapter?.projectColor ?? '#c8a96e';
  const defaultDate = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);
  const dateLabel = today ?? defaultDate;

  if (!chapter) return null;

  const mono = "'SF Mono', 'JetBrains Mono', 'Menlo', 'PingFang SC', 'Source Han Sans CN', monospace";

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 'calc(50% + 80px)',
        right: 'calc(3% + 20px)',
        width: WIDTH,
        transform: 'translateY(-10%)',
        zIndex: 55,
        pointerEvents: 'none',
        fontFamily: mono,
        color: '#d8c8a0',
        fontSize: 12,
        lineHeight: 1.7,
        background: 'rgba(8,6,4,0.94)',
        border: '1px solid rgba(200,169,110,0.18)',
        boxShadow: '0 16px 44px rgba(0,0,0,0.45), 0 0 0 1px rgba(200,169,110,0.05)',
        backdropFilter: 'blur(4px)',
        borderRadius: 4,
        overflow: 'hidden',
        animation: 'chapter-terminal-enter 420ms cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '7px 10px',
          borderBottom: '1px solid rgba(200,169,110,0.1)',
          background: 'rgba(0,0,0,0.32)',
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,95,87,0.55)' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(254,188,46,0.55)' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(40,200,64,0.55)' }} />
        <span
          style={{
            flex: 1,
            textAlign: 'center',
            color: '#7a6a50',
            fontSize: 10,
            letterSpacing: '0.12em',
          }}
        >
          claude — portfolio — 80×24
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ color: '#9a8870', marginBottom: 10 }}>
          <span style={{ color: accent }}>$</span>{' '}
          <span style={{ color: '#c8b88a' }}>claude</span>{' '}
          <span style={{ color: '#9a8870' }}>describe</span>{' '}
          <span style={{ color: '#d8c8a0' }}>--chapter</span>{' '}
          <span style={{ color: '#7a6a50' }}>"{chapter.numeral}"</span>
        </div>

        <div style={{ marginBottom: 10 }}>
          {PROGRESS_LINES.map((line, idx) => {
            const lit = idx < litCount;
            return (
              <div key={idx} style={{ opacity: lit ? 1 : 0.35, transition: 'opacity 220ms' }}>
                <span
                  style={{
                    color: lit ? accent : '#5a4f3a',
                    marginRight: 6,
                    display: 'inline-block',
                    width: 10,
                  }}
                >
                  {lit ? '●' : '○'}
                </span>
                <span style={{ color: lit ? '#c0ae7e' : '#6a5a42' }}>{line}</span>
              </div>
            );
          })}
        </div>

        {litCount >= PROGRESS_LINES.length && (
          <div style={{ marginBottom: 10 }}>
            <span style={{ color: accent, marginRight: 8 }}>▸</span>
            <span
              style={{
                color: '#e8dcb8',
                letterSpacing: '0.01em',
              }}
            >
              {display}
              {phase !== 'done' && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '0.55em',
                    marginLeft: 1,
                    background: accent,
                    color: 'transparent',
                    animation: 'chapter-terminal-caret 1.4s steps(1) infinite',
                  }}
                >
                  ▮
                </span>
              )}
            </span>
          </div>
        )}

        {phase === 'done' && (
          <div
            style={{
              color: '#7a6a50',
              fontSize: 10.5,
              letterSpacing: '0.08em',
              borderTop: '1px solid rgba(200,169,110,0.08)',
              paddingTop: 8,
              marginTop: 6,
            }}
          >
            <span style={{ color: accent, marginRight: 6 }}>◆</span>
            就绪 · {dateLabel}
          </div>
        )}
      </div>
    </div>
  );
}
