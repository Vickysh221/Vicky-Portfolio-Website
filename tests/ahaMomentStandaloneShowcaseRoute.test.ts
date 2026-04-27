import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('hidden Aha html is exposed through a standalone app route', () => {
  const app = read('src/App.tsx');
  const meta = read('src/pages/sharedMemoryAhaCaseStudyMeta.ts');
  const componentUrl = new URL('../src/pages/SharedMemoryAhaShowcaseRoute.tsx', import.meta.url);

  assert.match(
    meta,
    /SHARED_MEMORY_AHA_SHOWCASE_ROUTE = '\/agentic-design-development\/aha-moment\/ux-showcase'/,
  );
  assert.match(app, /location\.pathname === SHARED_MEMORY_AHA_SHOWCASE_ROUTE/);
  assert.match(app, /<SharedMemoryAhaShowcaseRoute \/>/);
  assert.equal(existsSync(componentUrl), true, 'standalone showcase route component should exist');

  const routeComponent = read('src/pages/SharedMemoryAhaShowcaseRoute.tsx');
  assert.match(routeComponent, /\/language-diary-ux-showcase-cases\.html/);
  assert.match(routeComponent, /lang=\$\{language\}/);
  assert.match(routeComponent, /navigate\(SHARED_MEMORY_AHA_CASE_STUDY_ROUTE\)/);
});
