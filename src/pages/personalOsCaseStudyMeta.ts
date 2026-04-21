export const PERSONAL_OS_CASE_STUDY_ROUTE = '/agentic-design-development/personal-os';
export const PERSONAL_OS_CASE_STUDY_PAGE_COUNT = 2;

export function hasPersonalOsCaseStudy(route: string, slideIndex = 0): boolean {
  return route === PERSONAL_OS_CASE_STUDY_ROUTE && slideIndex >= 0 && slideIndex < PERSONAL_OS_CASE_STUDY_PAGE_COUNT;
}
