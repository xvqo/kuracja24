'use client';

import { useEffect, useRef, useState } from 'react';

const COLORS = ['#0B1630', '#2F4F96', '#0B1630', '#2A86DB', '#0E1A33', '#5AB0F4'];
const SPEED = 0.35;

/** Animowany mesh gradient w tle hero. Bez WebGL zostaje jednolite tło #0B1630. */
export function HeroShader() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    let shader: { dispose: () => void } | undefined;

    import('@paper-design/shaders')
      .then(({ ShaderMount, meshGradientFragmentShader, getShaderColorFromString }) => {
        if (disposed || !ref.current) return;

        const colors = COLORS.map((c) => getShaderColorFromString(c));
        const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        shader = new ShaderMount(
          ref.current,
          meshGradientFragmentShader,
          {
            u_colors: colors,
            u_colorsCount: colors.length,
            u_distortion: 0.9,
            u_swirl: 0.6,
            u_grainMixer: 0.15,
            u_grainOverlay: 0.12,
            u_fit: 2, // cover
            u_scale: 1.2,
            u_rotation: 0,
            u_offsetX: -0.2,
            u_offsetY: 0,
            u_originX: 0.5,
            u_originY: 0.5,
            u_worldWidth: 0,
            u_worldHeight: 0,
          },
          { antialias: false },
          still ? 0 : SPEED,
          0,
          1,
        );
        setReady(true);
      })
      .catch((error) => console.warn('Hero shader unavailable', error));

    return () => {
      disposed = true;
      shader?.dispose();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        opacity: ready ? 1 : 0,
        transition: 'opacity 1.6s ease',
      }}
    />
  );
}
