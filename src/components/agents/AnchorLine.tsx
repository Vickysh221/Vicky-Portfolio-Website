interface AnchorLineProps {
  /** x/y in the gutter's local coordinate space (origin at gutter's top-left). */
  anchorX: number;
  anchorY: number;
  commentX: number;
  commentY: number;
  color: string;
  isActive: boolean;
}

/**
 * A thin connector drawn as an SVG path from a document anchor point to a
 * comment card. Uses a soft cubic curve so multiple lines don't stack as a
 * flat grid. Inactive lines dim to a hairline; active lines glow in the
 * persona accent color.
 */
export default function AnchorLine({
  anchorX,
  anchorY,
  commentX,
  commentY,
  color,
  isActive,
}: AnchorLineProps) {
  // Horizontal gap used for the curve's control points; clamped so the line
  // still feels deliberate even when the gutter is narrow.
  const dx = Math.max(20, Math.abs(commentX - anchorX) * 0.45);

  const d = `M ${anchorX},${anchorY} C ${anchorX + dx},${anchorY} ${commentX - dx},${commentY} ${commentX},${commentY}`;

  return (
    <path
      d={d}
      stroke={color}
      strokeWidth={isActive ? 1.2 : 0.9}
      strokeOpacity={isActive ? 0.8 : 0.28}
      fill="none"
      style={{ transition: 'stroke-opacity 240ms, stroke-width 240ms' }}
    />
  );
}
