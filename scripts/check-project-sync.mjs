import { readFileSync } from 'node:fs';

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
}

function assertIncludes(source, snippet, label) {
  if (!source.includes(snippet)) {
    throw new Error(`${label} is missing expected snippet: ${snippet}`);
  }
}

function assertExcludes(source, snippet, label) {
  if (source.includes(snippet)) {
    throw new Error(`${label} still contains legacy local config: ${snippet}`);
  }
}

const registrySource = read('src/projectRegistry.ts');
const portfolioSource = read('src/Portfolio.tsx');
const projectCardSource = read('src/pages/ProjectCard.tsx');
const appSource = read('src/App.tsx');

assertIncludes(registrySource, 'export const PROJECTS', 'projectRegistry');
assertIncludes(registrySource, "route: '/agentic-design-development'", 'projectRegistry');
assertIncludes(registrySource, "route: '/web-design-develop'", 'projectRegistry');
assertIncludes(registrySource, "route: '/jidu-hmi'", 'projectRegistry');

assertIncludes(portfolioSource, 'import { PROJECTS } from "./projectRegistry";', 'Portfolio');
assertIncludes(portfolioSource, 'const projects = PROJECTS;', 'Portfolio');
assertExcludes(portfolioSource, 'const projects: Project[] = [', 'Portfolio');

assertIncludes(projectCardSource, "import { PROJECTS } from '../projectRegistry';", 'ProjectCard');
assertIncludes(projectCardSource, 'const p = PROJECTS[index];', 'ProjectCard');
assertExcludes(projectCardSource, 'const projectData:', 'ProjectCard');

assertIncludes(appSource, "import { PROJECT_COLORS, PROJECT_ROUTES } from './projectRegistry';", 'App');
assertExcludes(appSource, 'const PROJECT_ROUTES = [', 'App');
assertExcludes(appSource, 'const PROJECT_COLORS = [', 'App');

console.log('Project config is centralized and in sync.');
