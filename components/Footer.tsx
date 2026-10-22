import Image from 'next/image';
import { NAV_LINKS, PAGES } from '@/lib/content';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={`container ${styles.footer}`}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Image src="/kuracja-logo.png" alt="Kuracja" width={433} height={200} className={styles.logo} />
          <p>
            Przychodnia specjalistyczna i centrum fizjoterapii w Radzyniu Podlaskim. Umowa z Narodowym Funduszem
            Zdrowia.
          </p>
        </div>

        <nav className={styles.nav} aria-label="Stopka">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <address className={styles.company}>
          <strong>KURACJA Sp. z o.o.</strong>
          <span>ul. Warszawska 17, 21-300 Radzyń Podlaski</span>
          <span className="tabular">NIP 538-16-63-762 · REGON 030307590</span>
        </address>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Kuracja24.pl</span>
        <span className={styles.legal}>
          <a href={PAGES.terms}>Regulamin</a>
          <a href={PAGES.privacy}>Polityka prywatności i cookies</a>
        </span>
        <span>Zdjęcia poglądowe: J. Toltesi, M. Zeman, T. Heftiba, P. Madison / Unsplash</span>
        <span>
          Projekt i realizacja:{' '}
          <a href={PAGES.studio} className={styles.studio}>
            Avenly
          </a>
        </span>
      </div>
    </footer>
  );
}
