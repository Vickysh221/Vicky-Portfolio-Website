export const SHARED_MEMORY_AHA_CASE_STUDY_ROUTE = '/agentic-design-development/aha-moment';
export const SHARED_MEMORY_AHA_CASE_STUDY_PAGE_COUNT = 2;

export function hasSharedMemoryAhaCaseStudy(route: string, slideIndex = 0): boolean {
  return route === SHARED_MEMORY_AHA_CASE_STUDY_ROUTE && slideIndex >= 0 && slideIndex < SHARED_MEMORY_AHA_CASE_STUDY_PAGE_COUNT;
}
