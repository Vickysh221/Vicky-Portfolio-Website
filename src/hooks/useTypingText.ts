import { useEffect, useRef, useState } from 'react';

const TYPE_SPEED_MS = 22;

/**
 * Types `text` out character by character whenever `text` changes.
 * When the text switches, the previous content erases first, then the new
 * text types in. If `active` flips to false, the display instantly clears.
 *
 * Simpler than ChapterTerminal's engine — no progress phases, just the
 * typing + erase loop.
 */
export function useTypingText(text: string, active: boolean, speedMs = TYPE_SPEED_MS) {
  const [display, setDisplay] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const displayRef = useRef('');
  const targetRef = useRef(text);

  useEffect(() => {
    targetRef.current = text;
  }, [text]);

  useEffect(() => {
    displayRef.current = display;
  }, [display]);

  useEffect(() => {
    if (!active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay('');
      displayRef.current = '';
      setIsTyping(false);
      return;
    }

    let cancelled = false;

    const type = (from: string) => {
      if (cancelled) return;
      setIsTyping(true);
      let current = from;
      const tick = () => {
        if (cancelled) return;
        const target = targetRef.current;
        if (current.length >= target.length) {
          setIsTyping(false);
          return;
        }
        current = target.slice(0, current.length + 1);
        displayRef.current = current;
        setDisplay(current);
        window.setTimeout(tick, speedMs);
      };
      tick();
    };

    const erase = (startDisplay: string, onDone: () => void) => {
      if (cancelled) return;
      setIsTyping(true);
      let current = startDisplay;
      const tick = () => {
        if (cancelled) return;
        if (current.length === 0) {
          onDone();
          return;
        }
        current = current.slice(0, -1);
        displayRef.current = current;
        setDisplay(current);
        window.setTimeout(tick, Math.max(6, speedMs * 0.55));
      };
      tick();
    };

    if (displayRef.current.length === 0) {
      type('');
    } else if (displayRef.current !== text) {
      erase(displayRef.current, () => type(''));
    }

    return () => {
      cancelled = true;
    };
  }, [active, text, speedMs]);

  return { display, isTyping };
}
