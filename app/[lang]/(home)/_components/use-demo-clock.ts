'use client';

import { useEffect, useRef, useState } from 'react';

// Advance only while the demo can be seen. Pausing preserves its exact position.
export function useDemoClock({
  duration,
  playing,
  reducedMotion,
  resetKey = 0,
}: {
  duration: number;
  playing: boolean;
  reducedMotion: boolean;
  resetKey?: number | string;
}) {
  const [elapsed, setElapsed] = useState(0);
  const elapsedRef = useRef(0);

  useEffect(() => {
    elapsedRef.current = 0;
    setElapsed(0);
  }, [resetKey]);

  useEffect(() => {
    if (!playing || reducedMotion || elapsedRef.current >= duration) return;
    let previous = performance.now();
    let lastPaint = elapsedRef.current;
    let frame: number;
    function tick(now: number) {
      elapsedRef.current = Math.min(duration, elapsedRef.current + now - previous);
      previous = now;
      if (elapsedRef.current - lastPaint >= 40 || elapsedRef.current === duration) {
        lastPaint = elapsedRef.current;
        setElapsed(lastPaint);
      }
      if (elapsedRef.current < duration) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, playing, reducedMotion, resetKey]);

  return reducedMotion ? duration : elapsed;
}
