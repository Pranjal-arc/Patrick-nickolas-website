'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let raf = 0;
    let cx = 0, cy = 0;

    const move = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          cursor.style.left = cx + 'px';
          cursor.style.top = cy + 'px';
          raf = 0;
        });
      }
    };

    document.addEventListener('mousemove', move, { passive: true });
    return () => {
      document.removeEventListener('mousemove', move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div id="cursor" ref={cursorRef} />;
}
