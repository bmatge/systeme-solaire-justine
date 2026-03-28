import { useRef, useEffect, useCallback } from 'react';

export function useAnimationLoop(callback: (deltaTime: number) => void) {
  const callbackRef = useRef(callback);
  const lastTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);

  callbackRef.current = callback;

  const animate = useCallback((timestamp: number) => {
    if (lastTimeRef.current !== null) {
      // deltaTime in days (assuming 1 real second = 1 simulated day at speed 1)
      const dtMs = timestamp - lastTimeRef.current;
      const dtDays = dtMs / 1000; // 1 second = 1 day
      callbackRef.current(dtDays);
    }
    lastTimeRef.current = timestamp;
    frameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [animate]);
}
