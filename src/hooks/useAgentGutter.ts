import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { ResolvedComment } from '../agents/types';

/**
 * One rendered thread, with the viewport coordinates it needs to display at.
 *
 * `anchorViewportY` is the y-coord (relative to the viewport) of the middle
 * of the document anchor. `cardY` is where the card's top ends up after
 * stacking resolution so cards don't overlap.
 *
 * `inViewport` reflects whether the anchor's y sits inside the scroll
 * container's currently-visible range. Callers should skip rendering slots
 * that fall outside — "只渲染视口内的评论".
 */
export interface GutterSlot {
  anchorId: string;
  threadRootId: string;
  root: ResolvedComment;
  /** y-coord of the anchor midpoint, in viewport space. */
  anchorViewportY: number;
  /** y-coord where the card top should sit, in viewport space. */
  cardY: number;
  /** x-coord where the container's right edge is, in viewport space. */
  containerRight: number;
  /** y-coord of the container's top edge, viewport space. */
  containerTop: number;
  /** y-coord of the container's bottom edge, viewport space. */
  containerBottom: number;
  inViewport: boolean;
}

interface UseAgentGutterOptions {
  /** The scrollable container that owns both the document content + the gutter anchors. */
  scrollRef: RefObject<HTMLElement | null>;
  /** All comment threads (root-level ResolvedComment[]) to render. */
  threads: ResolvedComment[];
  /** Estimated height per card; used for stacking so cards don't overlap. */
  estimatedCardHeight?: number;
  /** Vertical gap between stacked cards. */
  gap?: number;
  /** Whether the gutter is currently enabled (mounted). */
  enabled: boolean;
}

/**
 * Measures anchor positions inside the scrollable container and returns:
 *   - `slots`: comment cards with their calculated y-positions (viewport space)
 *   - `activeAnchorId`: which anchor is currently hovered in the document
 *   - `setActiveAnchorId`: so comment cards can drive the "active" state too
 *   - `viewportSize`: the current window size (used for width gate)
 *
 * Recomputes on scroll, resize, and when the thread set changes. All reads
 * are done via getBoundingClientRect — no layout thrashing.
 */
export function useAgentGutter({
  scrollRef,
  threads,
  estimatedCardHeight = 150,
  gap = 16,
  enabled,
}: UseAgentGutterOptions) {
  const [slots, setSlots] = useState<GutterSlot[]>([]);
  const [activeAnchorId, setActiveAnchorId] = useState<string | null>(null);
  const [viewportSize, setViewportSize] = useState<{ width: number; height: number }>(() => ({
    width: typeof window === 'undefined' ? 0 : window.innerWidth,
    height: typeof window === 'undefined' ? 0 : window.innerHeight,
  }));
  const rafRef = useRef<number | null>(null);

  const measure = useCallback(() => {
    if (!enabled) return;
    const container = scrollRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const vh = window.innerHeight;

    // Gather anchor positions in viewport space.
    const anchorPoints = new Map<string, number>();
    const anchors = container.querySelectorAll<HTMLElement>('[data-anchor-id]');
    anchors.forEach((el) => {
      const id = el.getAttribute('data-anchor-id');
      if (!id) return;
      const rect = el.getBoundingClientRect();
      anchorPoints.set(id, rect.top + rect.height / 2);
    });

    // Viewport range, clipped to container bounds — a comment outside the
    // container's visible slice is considered out of viewport.
    const minY = Math.max(0, containerRect.top);
    const maxY = Math.min(vh, containerRect.bottom);

    const pending: GutterSlot[] = [];
    for (const root of threads) {
      const ay = anchorPoints.get(root.anchorId);
      if (ay == null) continue;
      const cardY = ay - estimatedCardHeight / 2;
      const cardBottom = cardY + estimatedCardHeight;
      // Consider a card in-viewport if any portion of it (or its anchor) is
      // visible inside the container's slice.
      const inViewport =
        ay >= minY - 32 &&
        ay <= maxY + 32 &&
        cardBottom >= 0 &&
        cardY <= vh;
      pending.push({
        anchorId: root.anchorId,
        threadRootId: root.id,
        root,
        anchorViewportY: ay,
        cardY,
        containerRight: containerRect.right,
        containerTop: containerRect.top,
        containerBottom: containerRect.bottom,
        inViewport,
      });
    }

    // Stack resolution — only resolve conflicts between in-viewport cards.
    pending.sort((a, b) => a.cardY - b.cardY);
    let lastBottom = -Infinity;
    for (const slot of pending) {
      if (!slot.inViewport) continue;
      if (slot.cardY < lastBottom + gap) {
        slot.cardY = lastBottom + gap;
      }
      lastBottom = slot.cardY + estimatedCardHeight;
    }

    setSlots(pending);
  }, [enabled, scrollRef, threads, estimatedCardHeight, gap]);

  const schedule = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      measure();
    });
  }, [measure]);

  // Initial + dependency-based measure. `measure` itself calls setState, which
  // is the intended behavior here — we're syncing React state to the DOM's
  // current anchor positions on mount / when threads change.
  useLayoutEffect(() => {
    if (!enabled) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    measure();
  }, [enabled, measure]);

  // Track viewport size for width-gate decisions.
  useEffect(() => {
    if (!enabled) return;
    const update = () =>
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [enabled]);

  // Re-measure on scroll / resize / DOM mutation
  useEffect(() => {
    if (!enabled) return;
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    const mo = new MutationObserver(schedule);
    mo.observe(container, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['data-anchor-id'],
    });

    const media = container.querySelectorAll<HTMLImageElement | HTMLVideoElement>('img,video');
    media.forEach((el) => {
      el.addEventListener('load', schedule);
      el.addEventListener('loadedmetadata', schedule);
    });

    return () => {
      container.removeEventListener('scroll', schedule);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      mo.disconnect();
      media.forEach((el) => {
        el.removeEventListener('load', schedule);
        el.removeEventListener('loadedmetadata', schedule);
      });
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [enabled, scrollRef, schedule]);

  // Hover-bridge: when the user hovers any anchor in the document, mark it active.
  useEffect(() => {
    if (!enabled) return;
    const container = scrollRef.current;
    if (!container) return;

    const onEnter = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('[data-anchor-id]') as HTMLElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute('data-anchor-id');
      if (id) setActiveAnchorId(id);
    };
    const onLeave = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('[data-anchor-id]') as HTMLElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute('data-anchor-id');
      setActiveAnchorId((current) => (current === id ? null : current));
    };

    container.addEventListener('mouseover', onEnter);
    container.addEventListener('mouseout', onLeave);

    return () => {
      container.removeEventListener('mouseover', onEnter);
      container.removeEventListener('mouseout', onLeave);
    };
  }, [enabled, scrollRef]);

  return {
    slots,
    activeAnchorId,
    setActiveAnchorId,
    viewportSize,
    remeasure: schedule,
  };
}
