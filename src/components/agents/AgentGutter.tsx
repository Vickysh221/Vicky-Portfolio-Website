import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import type { RefObject } from 'react';
import type { AgentThread } from '../../agents/types';
import { resolveThread } from '../../agents/threads';
import AgentCommentThread from './AgentCommentThread';
import AnchorLine from './AnchorLine';
import { useAgentGutter } from '../../hooks/useAgentGutter';

interface AgentGutterProps {
  /** The scrollable container that holds the content being commented on. */
  scrollRef: RefObject<HTMLElement | null>;
  thread: AgentThread;
  /** Whether the gutter is currently visible. */
  visible: boolean;
}

const GUTTER_WIDTH = 320;
const CARD_WIDTH = 296;
/** Gap between the panel's right edge and the gutter's left edge. */
const PANEL_TO_GUTTER_GAP = 32;
/** Reserve this many px of margin on the viewport right edge. */
const VIEWPORT_RIGHT_MARGIN = 18;

/**
 * Floating gutter that sits outside the reading panel, aligned to the right
 * edge of the viewport. Each comment is positioned by the viewport-y of its
 * anchor. Comments whose anchors aren't currently inside the visible range
 * of the panel are skipped entirely — "只渲染视口内的评论".
 *
 * Rendered via a portal to `document.body` so it escapes the panel's clip
 * rectangle and any `overflow: hidden` ancestors.
 */
export default function AgentGutter({ scrollRef, thread, visible }: AgentGutterProps) {
  const resolved = useMemo(() => resolveThread(thread), [thread]);
  const { slots, activeAnchorId, viewportSize } = useAgentGutter({
    scrollRef,
    threads: resolved,
    enabled: visible,
  });

  // Track per-thread "self-hover" so anchor lines can light up from the card side.
  const [selfHoveredRoot, setSelfHoveredRoot] = useState<string | null>(null);

  if (!visible) return null;
  if (typeof document === 'undefined') return null;

  // Width gate: we need the panel's right edge + gap + gutter width + margin
  // to fit inside the viewport. If not, hide the gutter entirely.
  const firstSlot = slots[0];
  const panelRight = firstSlot?.containerRight ?? 0;
  const availableRight = viewportSize.width - panelRight;
  const hasEnoughRoom =
    availableRight >= PANEL_TO_GUTTER_GAP + GUTTER_WIDTH + VIEWPORT_RIGHT_MARGIN;
  if (!hasEnoughRoom || slots.length === 0) {
    return createPortal(
      <div aria-hidden style={{ display: 'none' }} />,
      document.body,
    );
  }

  // Gutter left coordinate, viewport space.
  const gutterLeft = Math.min(
    panelRight + PANEL_TO_GUTTER_GAP,
    viewportSize.width - GUTTER_WIDTH - VIEWPORT_RIGHT_MARGIN,
  );

  // SVG spans the full viewport height so anchor lines can reach across.
  const svgHeight = viewportSize.height;

  const visibleSlots = slots.filter((slot) => slot.inViewport);

  const node = (
    <div
      aria-hidden={!visible}
      style={{
        position: 'fixed',
        top: 0,
        left: gutterLeft,
        width: GUTTER_WIDTH,
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 46,
      }}
    >
      {/* SVG layer with overflow visible so lines can reach back into the panel. */}
      <svg
        width={GUTTER_WIDTH}
        height={svgHeight}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'visible',
          pointerEvents: 'none',
        }}
      >
        {visibleSlots.map((slot) => {
          const active =
            activeAnchorId === slot.anchorId || selfHoveredRoot === slot.threadRootId;
          const color = slot.root.persona.accent;
          // Anchor endpoint in gutter-local space. The document anchor's
          // right edge is roughly at panelRight; relative to the gutter's
          // origin that's `panelRight - gutterLeft` (negative).
          const anchorLocalX = panelRight - gutterLeft - 24;
          const cardLocalX = 0;
          const anchorY = slot.anchorViewportY;
          const commentY = slot.cardY + 28; // roughly card header baseline
          return (
            <AnchorLine
              key={slot.anchorId + ':' + slot.threadRootId}
              anchorX={anchorLocalX}
              anchorY={anchorY}
              commentX={cardLocalX}
              commentY={commentY}
              color={color}
              isActive={active}
            />
          );
        })}
      </svg>

      {/* Cards — absolute inside the fixed wrapper, so positions are viewport-y. */}
      {visibleSlots.map((slot) => {
        const isAnchorActive = activeAnchorId === slot.anchorId;
        return (
          <div
            key={slot.threadRootId}
            style={{
              position: 'absolute',
              top: slot.cardY,
              left: 0,
              width: CARD_WIDTH,
              pointerEvents: 'auto',
              transition: 'top 240ms cubic-bezier(0.16,1,0.3,1), opacity 240ms',
              opacity: slot.inViewport ? 1 : 0,
            }}
          >
            <AgentCommentThread
              root={slot.root}
              isAnchorActive={isAnchorActive}
              canType={slot.inViewport}
              onSelfHoverChange={(hovered) =>
                setSelfHoveredRoot(hovered ? slot.threadRootId : (current) =>
                  current === slot.threadRootId ? null : current,
                )
              }
            />
          </div>
        );
      })}
    </div>
  );

  return createPortal(node, document.body);
}
