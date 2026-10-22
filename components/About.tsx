import Image from 'next/image';
import { ABOUT_PHOTOS, VALUES } from '@/lib/content';
import styles from './About.module.css';

export function About() {
  return (
    <section id="o-nas" className={`container ${styles.section}`} aria-labelledby="about-title">
      <div className={styles.intro}>
        <p id="about-title" className="eyebrow">
          Dlaczego Kuracja
        </p>
        <p className={styles.statement}>
          Od ponad 20 lat dbamy o zdrowie mieszkańców Radzynia.{' '}
          <span className={styles.muted}>
            Lekarze specjaliści i rehabilitanci pracują u nas jako jeden zespół, w centrum miasta, w dogodnej
            lokalizacji.
          </span>
        </p>
      </div>

      <div className={styles.photos}>
        {ABOUT_PHOTOS.map((photo) => (
          <div key={photo.src} className={styles.photo} data-tall={photo.tall}>
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 900px) 33vw, 100vw" />
          </div>
        ))}
      </div>

      <ul className={styles.values}>
        {VALUES.map((value) => (
          <li key={value.name} className={styles.value}>
            <span className={styles.valueName}>{value.name}</span>
            <span className={styles.valueDescription}>{value.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
