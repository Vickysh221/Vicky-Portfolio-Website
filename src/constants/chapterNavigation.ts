import { PAGE_META, getSlideCount, type PageMeta } from './routeDepth';

export interface ChapterSlideTarget {
  route: string;
  slideIndex: number;
}

type Direction = 'prev' | 'next';

function hasSubPages(meta: PageMeta): meta is PageMeta & { subPages: NonNullable<PageMeta['subPages']> } {
  return meta.parent === null && Array.isArray(meta.subPages) && meta.subPages.length > 0;
}

function getOrderedChapterRoutes(): string[] {
  return Object.values(PAGE_META)
    .filter(hasSubPages)
    .flatMap((meta) => meta.subPages)
    .filter((subPage) => !subPage.disabled)
    .map((subPage) => subPage.route);
}

export function getAdjacentChapterSlideTarget(
  route: string,
  slideIndex: number,
  direction: Direction,
): ChapterSlideTarget | null {
  const meta = PAGE_META[route];
  if (!meta) return null;

  const totalSlides = getSlideCount(route);
  if (direction === 'prev' && slideIndex > 0) {
    return { route, slideIndex: slideIndex - 1 };
  }
  if (direction === 'next' && slideIndex < totalSlides - 1) {
    return { route, slideIndex: slideIndex + 1 };
  }

  if (meta.parent === null) return null;

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
