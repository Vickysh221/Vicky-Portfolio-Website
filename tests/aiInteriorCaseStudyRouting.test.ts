import test from 'node:test';
import assert from 'node:assert/strict';

import { hasSectionContent } from '../src/pages/H5DocContent.tsx';

test('ai interior system route exposes section content for both slides', () => {
  assert.equal(hasSectionContent('/agentic-design-development/ai-interior-system', 0), true);
  assert.equal(hasSectionContent('/agentic-design-development/ai-interior-system', 1), true);
  assert.equal(hasSectionContent('/agentic-design-development/ai-interior-system', 2), false);
});
