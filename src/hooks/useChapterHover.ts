import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { LocalizedText } from '../i18n/types.ts';

export interface HoveredChapter {
  route: string;
  numeral: string;
  label: LocalizedText;
  projectColor: string;
  projectTitle: LocalizedText;
  chapterIndex: number;
  chapterTotal: number;
  pointerX: number;
  pointerY: number;
}

interface PendingChapter extends HoveredChapter {}

export function createHoveredChapterSnapshot(chapter: HoveredChapter): HoveredChapter {
  return { ...chapter };
}

const ENTER_DELAY_MS = 0;
const LEAVE_DELAY_MS = 400;

/**
 * Shared state + timers for the hover-to-hologram interaction.
 *
 * - `hoveredChapter` is null until the pointer has sat on a chapter for
 *   ENTER_DELAY_MS. After that it points at the snapshot used by the
 *   preview card + terminal.
 * - When the pointer moves between two chapters quickly, the state
 *   switches instantly (no re-arming of the 300ms timer) so the
 *   preview/terminal can cross-fade and re-type smoothly.
 * - Leaving all chapters keeps the state alive for LEAVE_DELAY_MS in
 *   case the pointer is just travelling between two rows.
 */
export function useChapterHover() {
  const [hoveredChapter, setHoveredChapter] = useState<HoveredChapter | null>(null);
  const enterTimerRef = useRef<number | null>(null);
  const leaveTimerRef = useRef<number | null>(null);
  const pendingRef = useRef<PendingChapter | null>(null);
  const activeRouteRef = useRef<string | null>(null);

  const clearEnter = useCallback(() => {
    if (enterTimerRef.current !== null) {
      window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }
  }, []);

  const clearLeave = useCallback(() => {
    if (leaveTimerRef.current !== null) {
      window.clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  const commit = useCallback((pending: PendingChapter) => {
    activeRouteRef.current = pending.route;
    setHoveredChapter(createHoveredChapterSnapshot(pending));
  }, []);

  const onChapterEnter = useCallback((pending: PendingChapter) => {
    clearLeave();
    pendingRef.current = pending;

    // If something is already active, switch instantly — the UI
    // layer handles the visual transition on its own.
    if (activeRouteRef.current !== null) {
      commit(pending);
      return;
    }

    clearEnter();
    enterTimerRef.current = window.setTimeout(() => {
      if (pendingRef.current && pendingRef.current.route === pending.route) {
        commit(pendingRef.current);
      }
    }, ENTER_DELAY_MS);
  }, [clearEnter, clearLeave, commit]);

  const onChapterLeave = useCallback((route: string) => {
    // Only react if the leave matches the chapter currently pending/active.
    if (pendingRef.current?.route === route) {
      pendingRef.current = null;
      clearEnter();
    }

    if (activeRouteRef.current === route) {
      clearLeave();
      leaveTimerRef.current = window.setTimeout(() => {
        activeRouteRef.current = null;
        setHoveredChapter(null);
      }, LEAVE_DELAY_MS);
    }
  }, [clearEnter, clearLeave]);

  const dismiss = useCallback(() => {
    clearEnter();
    clearLeave();
    pendingRef.current = null;
    activeRouteRef.current = null;
    setHoveredChapter(null);
  }, [clearEnter, clearLeave]);

  useEffect(() => () => {
    clearEnter();
    clearLeave();
  }, [clearEnter, clearLeave]);

  const onChapterMove = useCallback((route: string, pointerX: number, pointerY: number) => {
    if (pendingRef.current?.route === route) {
      pendingRef.current = {
        ...pendingRef.current,
        pointerX,
        pointerY,
      };
    }

    if (activeRouteRef.current === route) {
      setHoveredChapter((current) => (
        current && current.route === route
          ? {
            ...current,
            pointerX,
            pointerY,
          }
          : current
      ));
    }
  }, []);

  return useMemo(() => ({
    hoveredChapter,
    onChapterEnter,
    onChapterMove,
    onChapterLeave,
    dismiss,
  }), [hoveredChapter, onChapterEnter, onChapterMove, onChapterLeave, dismiss]);
}
