import { PHONE, PHONE_HREF } from '@/lib/content';
import { HeroShader } from './HeroShader';
import { HeroCarousel } from './HeroCarousel';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <div id="start" className={styles.hero} data-header-theme="dark">
      <HeroShader />

      <section className={`container ${styles.inner}`} aria-labelledby="hero-title">
        <div className={styles.copy}>
          <p className="eyebrow eyebrow--dark">Przychodnia specjalistyczna i centrum fizjoterapii</p>
          <h1 id="hero-title" className={styles.title}>
            Stawiamy
            <br />
            na nogi
            <br />
            od ponad 20 lat.
          </h1>
          <p className={styles.lead}>
            Lekarze dziewięciu specjalności i centrum rehabilitacji pod jednym dachem. Część wizyt i zabiegów
            w ramach umowy z NFZ.
          </p>
          <div className={styles.actions}>
            <a href="#rejestracja" className="btn btn--lg btn--white">
              Umów wizytę
            </a>
            <a href={PHONE_HREF} className={styles.phone}>
              <span className={styles.phoneHint}>lub zadzwoń</span>
              <span className={`${styles.phoneNumber} tabular`}>{PHONE}</span>
            </a>
          </div>
        </div>

        <HeroCarousel />
      </section>
    </div>
  );
}
