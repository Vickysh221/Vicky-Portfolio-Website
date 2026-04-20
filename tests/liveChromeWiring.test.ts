import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('live app chrome components consume shared localized chrome copy', () => {
  const pageTemplate = read('src/pages/PageTemplate.tsx');
  const subPageCarousel = read('src/pages/SubPageCarousel.tsx');

  assert.match(pageTemplate, /import\s+\{\s*getLiveChromeCopy\s*\}\s+from\s+'..\/i18n\/liveUiCopy\.ts';/);
  assert.match(pageTemplate, /const\s+chromeCopy\s*=\s*getLiveChromeCopy\(language\);/);
  assert.match(pageTemplate, /<BackButton onClick=\{onBack\} label=\{chromeCopy\.back\} \/>/);
  assert.match(pageTemplate, /title=\{chromeCopy\.exitFullscreen\}/);
  assert.match(pageTemplate, /title=\{chromeCopy\.expandFullscreen\}/);
  assert.match(pageTemplate, /hintText=\{chromeCopy\.fullscreenHint\}/);

  assert.match(subPageCarousel, /import\s+\{\s*getLiveChromeCopy\s*\}\s+from\s+'..\/i18n\/liveUiCopy\.ts';/);
  assert.match(subPageCarousel, /const\s+chromeCopy\s*=\s*getLiveChromeCopy\(language\);/);
  assert.match(subPageCarousel, /<BackButton onClick=\{onBack\} label=\{chromeCopy\.back\} \/>/);
  assert.match(subPageCarousel, /title=\{chromeCopy\.exitFullscreen\}/);
  assert.match(subPageCarousel, /title=\{chromeCopy\.expandFullscreen\}/);
  assert.match(subPageCarousel, /hintText=\{chromeCopy\.fullscreenHint\}/);
});

test('language toggle uses shared copy and keeps a larger tap target', () => {
  const uiCopy = read('src/i18n/uiCopy.ts');
  const languageToggle = read('src/components/LanguageToggle.tsx');
  const css = read('src/index.css');

  assert.match(uiCopy, /languageSwitcher:\s*\{/);
  assert.match(uiCopy, /switchToChinese:\s*\{/);
  assert.match(uiCopy, /switchToEnglish:\s*\{/);

  assert.match(languageToggle, /aria-label=\{text\(UI_COPY\.languageSwitcher\)\}/);
  assert.match(languageToggle, /aria-label=\{text\(UI_COPY\.switchToChinese\)\}/);
  assert.match(languageToggle, /aria-label=\{text\(UI_COPY\.switchToEnglish\)\}/);

  assert.match(css, /\.language-toggle-shell button\s*\{[\s\S]*min-width:\s*32px;/);
  assert.match(css, /\.language-toggle-shell button\s*\{[\s\S]*min-height:\s*32px;/);
  assert.match(css, /\.language-toggle-shell button\s*\{[\s\S]*padding:\s*8px 6px;/);
});
