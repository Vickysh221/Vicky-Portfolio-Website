export interface PointerPlacementInput {
  pointerX: number;
  pointerY: number;
  viewportWidth: number;
  viewportHeight: number;
  cardWidth: number;
  cardHeight: number;
  gap: number;
  margin: number;
}

export interface PointerPlacement {
  left: number;
  top: number;
  flippedX: boolean;
  flippedY: boolean;
}

export function computePointerPlacement({
  pointerX,
  pointerY,
  viewportWidth,
  viewportHeight,
  cardWidth,
  cardHeight,
  gap,
  margin,
}: PointerPlacementInput): PointerPlacement {
  const preferredLeft = pointerX + gap;
  const preferredTop = pointerY + gap;

  const shouldFlipX = preferredLeft + cardWidth > viewportWidth - margin;
  const shouldFlipY = preferredTop + cardHeight > viewportHeight - margin;

  const left = shouldFlipX
    ? Math.max(margin, pointerX - cardWidth - gap)
    : Math.min(preferredLeft, viewportWidth - cardWidth - margin);
  const top = shouldFlipY
    ? Math.max(margin, pointerY - cardHeight - gap)
    : Math.min(preferredTop, viewportHeight - cardHeight - margin);

  return {
    left,
    top,
    flippedX: shouldFlipX,
    flippedY: shouldFlipY,
  };
}
