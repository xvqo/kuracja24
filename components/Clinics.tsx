import { CLINICS, PAGES } from '@/lib/content';
import styles from './Clinics.module.css';

export function Clinics() {
  return (
    <section id="przychodnia" className={`container ${styles.section}`} aria-labelledby="clinics-title">
      <div className={styles.intro}>
        <p className="eyebrow">Przychodnia specjalistyczna</p>
        <h2 id="clinics-title" className="h2">
          Dziewięć poradni, jeden adres.
        </h2>
        <p className="lead">
          Specjaliści z wieloletnim doświadczeniem i bogatą praktyką. Część lekarzy przyjmuje w ramach umowy z NFZ.
          Sprawdź, kto i w jakich godzinach przyjmuje.
        </p>
        <a href={PAGES.schedule} className={`btn btn--outline ${styles.cta}`}>
          Harmonogram przyjęć
        </a>
      </div>

      <ul className={styles.list}>
        {CLINICS.map((clinic, i) => (
          <li key={clinic.name}>
            <a href={clinic.href} className={styles.row}>
              <span className={`${styles.number} tabular`}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.text}>
                <span className={styles.name}>{clinic.name}</span>
                <span className={styles.description}>{clinic.description}</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
