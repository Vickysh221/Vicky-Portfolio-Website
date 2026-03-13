import { PAGE_META, getSlideCount } from './routeDepth';

export interface ChapterSlideTarget {
  route: string;
  slideIndex: number;
}

type Direction = 'prev' | 'next';

function getOrderedChapterRoutes(): string[] {
  return Object.entries(PAGE_META)
    .filter(([, meta]) => meta.parent === null && meta.subPages && meta.subPages.length > 0)
    .flatMap(([, meta]) => meta.subPages ?? [])
    .filter((subPage) => !subPage.disabled)
    .map((subPage) => subPage.route);
}

export function getAdjacentChapterSlideTarget(
  route: string,
  slideIndex: number,
  direction: Direction,
): ChapterSlideTarget | null {
  const meta = PAGE_META[route];
  if (!meta || meta.parent === null) return null;

  const totalSlides = getSlideCount(route);
  if (direction === 'prev' && slideIndex > 0) {
    return { route, slideIndex: slideIndex - 1 };
  }
  if (direction === 'next' && slideIndex < totalSlides - 1) {
    return { route, slideIndex: slideIndex + 1 };
  }

  const chapterRoutes = getOrderedChapterRoutes();
  const currentRouteIndex = chapterRoutes.indexOf(route);
  if (currentRouteIndex === -1) return null;

  const targetRouteIndex = direction === 'prev' ? currentRouteIndex - 1 : currentRouteIndex + 1;
  const targetRoute = chapterRoutes[targetRouteIndex];
  if (!targetRoute) return null;

  return {
    route: targetRoute,
    slideIndex: direction === 'prev' ? getSlideCount(targetRoute) - 1 : 0,
  };
}
