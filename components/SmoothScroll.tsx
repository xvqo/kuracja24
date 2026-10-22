'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Płynne przewijanie całej strony. Kliknięcia w linki #kotwica też idą przez Lenis,
 * a offset pod sticky header bierze się z `scroll-padding-top` na <html>.
 * Przy `prefers-reduced-motion` Lenis sam wyłącza wygładzanie.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.1,
      stopInertiaOnNavigate: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
