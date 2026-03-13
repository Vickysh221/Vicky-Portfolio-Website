import { useEffect, useState } from 'react';

const FULLSCREEN_HINT_DISMISSED_KEY = 'portfolio.fullscreen_hint.dismissed';
const FULLSCREEN_HINT_LAST_SHOWN_DATE_KEY = 'portfolio.fullscreen_hint.last_shown_date';

function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function canShowHintToday(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.localStorage.getItem(FULLSCREEN_HINT_DISMISSED_KEY) === 'true') return false;
  return window.localStorage.getItem(FULLSCREEN_HINT_LAST_SHOWN_DATE_KEY) !== getTodayString();
}

export function useFullscreenHint(isEligible: boolean) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isEligible || typeof window === 'undefined' || !canShowHintToday()) {
      setIsVisible(false);
      return;
    }

    window.localStorage.setItem(FULLSCREEN_HINT_LAST_SHOWN_DATE_KEY, getTodayString());
    setIsVisible(true);

    const timeoutId = window.setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isEligible]);

  const dismissForever = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(FULLSCREEN_HINT_DISMISSED_KEY, 'true');
    }
    setIsVisible(false);
  };

  return {
    isVisible,
    dismissForever,
  };
}
