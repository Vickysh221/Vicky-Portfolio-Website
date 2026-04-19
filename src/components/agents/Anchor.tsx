import type { CSSProperties, ReactNode } from 'react';

interface AnchorProps {
  id: string;
  children: ReactNode;
  /**
   * If true, render as a block-level span (still an inline phrasing node,
   * but fills the row so paragraph wrapping isn't affected). Default: false.
   */
  block?: boolean;
  style?: CSSProperties;
}

/**
 * Marks a span of content as a comment anchor. An `AgentGutter` in the same
 * page reads `[data-anchor-id]` attributes from the DOM to know where to
 * draw its connection lines and where to align each comment card.
 *
 * Anchors are intentionally invisible — they only carry the id. The visible
 * styling (e.g. a hairline underline on hover) is opt-in via the parent.
 */
export default function Anchor({ id, children, block, style }: AnchorProps) {
  return (
    <span
      data-anchor-id={id}
      style={{
        display: block ? 'block' : 'inline',
        ...style,
      }}
    >
      {children}
    </span>
  );
}
