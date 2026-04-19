import { useState } from 'react';
import type { ResolvedComment } from '../../agents/types';
import AgentComment from './AgentComment';

interface AgentCommentThreadProps {
  /** The root comment of this thread (may have replies). */
  root: ResolvedComment;
  /** True when any element anchored on the same id is hovered upstream. */
  isAnchorActive: boolean;
  onSelfHoverChange: (hovered: boolean) => void;
  /** True when the card is visible inside the scroll viewport. */
  canType: boolean;
}

/**
 * Renders a root comment and its direct replies (max one level deep, per MVP
 * decision). Self-hover is tracked so the anchor line can pulse when the user
 * is reading the card but not touching the document anchor.
 */
export default function AgentCommentThread({
  root,
  isAnchorActive,
  onSelfHoverChange,
  canType,
}: AgentCommentThreadProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const bubble = (id: string, hovered: boolean) => {
    setHoveredId(hovered ? id : (current) => (current === id ? null : current));
    // When any card in this thread is hovered, treat the thread as self-active.
    onSelfHoverChange(hovered || (hoveredId !== null && hoveredId !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <AgentComment
        comment={root}
        isAnchorActive={isAnchorActive}
        isSelfActive={hoveredId === root.id}
        onHoverChange={(h) => bubble(root.id, h)}
        canType={canType}
      />
      {root.replies.map((reply) => (
        <AgentComment
          key={reply.id}
          comment={reply}
          isAnchorActive={isAnchorActive}
          isSelfActive={hoveredId === reply.id}
          onHoverChange={(h) => bubble(reply.id, h)}
          canType={canType}
          isReply
        />
      ))}
    </div>
  );
}
