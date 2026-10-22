'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CLINICS } from '@/lib/content';
import styles from './HeroCarousel.module.css';

const count = CLINICS.length;
const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Zdjęcia poradni zmieniają się co 3,6 s. Tempo wyznacza animacja wypełnienia
 * aktywnego paska (onAnimationEnd), więc pauza na hover zatrzymuje oba naraz.
 */
export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Startujemy po hydratacji – inaczej animacja paska mogłaby skończyć się, zanim podepnie się onAnimationEnd.
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setAutoplay(!reduced.matches);
    sync();
    reduced.addEventListener('change', sync);
    return () => reduced.removeEventListener('change', sync);
  }, []);

  const next = () => setActive((i) => (i + 1) % count);
  const prev = (active + count - 1) % count;

  return (
    <div className={styles.carousel}>
      <div className={styles.frame} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className={styles.photos}>
          {CLINICS.map((clinic, i) => (
            <Image
              key={clinic.name}
              src={clinic.photo}
              alt={`${clinic.name} (zdjęcie poglądowe)`}
              fill
              sizes="(min-width: 1100px) 50vw, 100vw"
              priority={i === 0}
              className={styles.photo}
              data-active={i === active}
            />
          ))}
        </div>
        <div className={styles.shade} aria-hidden="true" />

        <div className={styles.captions} aria-live="polite">
          {CLINICS.map((clinic, i) => (
            <div
              key={clinic.name}
              className={styles.caption}
              data-state={i === active ? 'active' : i === prev ? 'prev' : 'next'}
              aria-hidden={i !== active}
            >
              <span className={`${styles.counter} tabular`}>
                {pad(i + 1)} / {pad(count)}
              </span>
              <span className={styles.name}>{clinic.name}</span>
              <span className={styles.description}>{clinic.description}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bars}>
        {CLINICS.map((clinic, i) => (
          <button
            key={clinic.name}
            type="button"
            className={styles.bar}
            aria-label={clinic.name}
            aria-current={i === active}
            onClick={() => setActive(i)}
          >
            <span className={styles.track}>
              {i < active && <span className={styles.fill} />}
              {i === active && (
                <span
                  key={active}
                  className={styles.fill}
                  data-running={autoplay}
                  data-paused={paused}
                  onAnimationEnd={next}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
