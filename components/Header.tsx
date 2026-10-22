'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { NAV_LINKS, PHONE, PHONE_HREF } from '@/lib/content';
import styles from './Header.module.css';

const HEADER_HEIGHT = 88;
const GLASS_AFTER = 24;
const HIDE_AFTER = 120;
const SCROLL_DELTA = 6;
const WIDE_QUERY = '(min-width: 1100px)';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Ciemne powierzchnie (hero, karta NFZ) oznaczone są data-header-theme="dark".
    const darkSurfaces = Array.from(document.querySelectorAll<HTMLElement>('[data-header-theme="dark"]'));
    let lastY = window.scrollY;

    const isOverDark = () =>
      darkSurfaces.some((el) => {
        const rect = el.getBoundingClientRect();
        // Wcześniejsze przełączenie na dole (o 44px) – dolne rogi są zaokrąglone i odsłaniają jasne tło.
        return rect.top < HEADER_HEIGHT / 2 && rect.bottom > HEADER_HEIGHT + 44;
      });

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > GLASS_AFTER);
      setOverDark(y < 40 || isOverDark());

      if (y < HIDE_AFTER) {
        setHidden(false);
        lastY = y;
        return;
      }
      // Kierunek liczymy względem ostatniego "znaczącego" ruchu, żeby powolne
      // przewijanie (trackpad, wygaszanie Lenisa) też chowało i pokazywało header.
      const delta = y - lastY;
      if (Math.abs(delta) > SCROLL_DELTA) {
        setHidden(delta > 0);
        lastY = y;
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const wide = window.matchMedia(WIDE_QUERY);
    const close = () => setMenuOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();

    wide.addEventListener('change', close);
    window.addEventListener('keydown', onKey);
    return () => {
      wide.removeEventListener('change', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const theme = overDark && !menuOpen ? 'dark' : 'light';
  const glass = scrolled || menuOpen;

  return (
    <header
      className={styles.header}
      data-reveal=""
      data-theme={theme}
      data-glass={glass}
      data-hidden={hidden && !menuOpen}
      data-menu-open={menuOpen}
    >
      <div className={`container ${styles.bar}`}>
        <a href="#start" className={styles.logo} aria-label="Kuracja – strona główna">
          <Image src="/kuracja-logo.png" alt="Kuracja" width={433} height={200} priority />
        </a>

        <nav className={styles.nav} aria-label="Główna nawigacja">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href={PHONE_HREF} className={`${styles.phone} tabular`}>
            {PHONE}
          </a>
          <a href="#rejestracja" className={styles.cta}>
            Umów wizytę
          </a>
          <button
            type="button"
            className={styles.burger}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className={styles.mobileNav} aria-label="Menu" onClick={() => setMenuOpen(false)}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href={PHONE_HREF} className={`${styles.mobilePhone} tabular`}>
            Zadzwoń: {PHONE}
          </a>
        </nav>
      )}
    </header>
  );
}
