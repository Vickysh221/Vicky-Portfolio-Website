import { pickLocalizedText } from './localization.ts';
import { UI_COPY } from './uiCopy.ts';
import type { Language } from './types.ts';

export function getLiveChromeCopy(language: Language) {
  return {
    back: pickLocalizedText(UI_COPY.back, language),
    expandFullscreen: pickLocalizedText(UI_COPY.expandFullscreen, language),
    exitFullscreen: pickLocalizedText(UI_COPY.exitFullscreen, language),
    fullscreenHint: pickLocalizedText(UI_COPY.fullscreenHint, language),
  };
}
