'use client';

import { useEffect, useRef, useState } from 'react';
import { ShaderMount, getShaderColorFromString, meshGradientFragmentShader } from '@paper-design/shaders';
import { releaseReveal, startRevealFallback, type RevealKey } from '@/lib/reveal';
import styles from './MeshShader.module.css';

const COLORS = ['#0B1630', '#2F4F96', '#0B1630', '#2A86DB', '#0E1A33', '#5AB0F4'];
const SPEED = 0.35;

type Props = {
  /** Przesunięcie gradientu w poziomie (-1…1), żeby kolejne powierzchnie nie wyglądały identycznie. */
  offsetX?: number;
  /** Shader w hero wstrzymuje wejście strony, dopóki się nie wyrenderuje. */
  revealKey?: RevealKey;
};

/**
 * Animowany mesh gradient na ciemnych powierzchniach (hero, karta NFZ).
 * Montuje się dopiero w pobliżu ekranu i zatrzymuje animację, gdy z niego zniknie.
 * Bez WebGL zostaje tło rodzica (#0B1630).
 */
export function MeshShader({ offsetX = -0.2, revealKey }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (revealKey) startRevealFallback();

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let shader: ShaderMount | undefined;
    let failed = false;

    const mount = () => {
      try {
        const colors = COLORS.map((c) => getShaderColorFromString(c));
        shader = new ShaderMount(
          el,
          meshGradientFragmentShader,
          {
            u_colors: colors,
            u_colorsCount: colors.length,
            u_distortion: 0.9,
            u_swirl: 0.6,
            // Ziarno shadera zmienia się co klatkę i migocze jak szum cyfrowy –
            // zamiast niego nieruchoma tekstura w CSS (MeshShader.module.css).
            u_grainMixer: 0,
            u_grainOverlay: 0,
            u_fit: 2, // cover
            u_scale: 1.2,
            u_rotation: 0,
            u_offsetX: offsetX,
            u_offsetY: 0,
            u_originX: 0.5,
            u_originY: 0.5,
            u_worldWidth: 0,
            u_worldHeight: 0,
          },
          { antialias: false },
          0,
          0,
          1,
        );
        setReady(true);
      } catch (error) {
        failed = true;
        console.warn('Mesh shader unavailable', error);
      }
      if (revealKey) releaseReveal(revealKey);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shader && !failed) mount();
        shader?.setSpeed(entry.isIntersecting && !still ? SPEED : 0);
      },
      { rootMargin: '300px 0px' },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      shader?.dispose();
    };
  }, [offsetX, revealKey]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={styles.shader}
      data-ready={ready}
      // W hero o widoczności decyduje wspólne wejście strony, nie własny fade.
      data-reveal={revealKey ? '' : undefined}
      data-own-fade={revealKey ? undefined : ''}
    />
  );
}
