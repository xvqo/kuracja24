import Image from 'next/image';
import { PAGES, PHYSIO_PHOTO, TREATMENTS } from '@/lib/content';
import styles from './Physio.module.css';

export function Physio() {
  return (
    <section id="fizjoterapia" className="section-white" aria-labelledby="physio-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.photo}>
          <Image
            src={PHYSIO_PHOTO}
            alt="Fizjoterapeuta podczas terapii manualnej z pacjentką"
            fill
            sizes="(min-width: 1000px) 50vw, 100vw"
          />
        </div>

        <div className={styles.content}>
          <p className="eyebrow">Centrum fizjoterapii i rehabilitacji</p>
          <h2 id="physio-title" className="h2">
            Zabiegi, które przywracają sprawność.
          </h2>
          <p className={`lead ${styles.lead}`}>
            Doświadczeni rehabilitanci, profesjonalnie wyposażone sale zabiegowe i nowoczesny sprzęt. Zabiegi
            wykonujemy także w ramach NFZ.
          </p>

          <ul className={styles.treatments}>
            {TREATMENTS.map((treatment) => (
              <li key={treatment.name} className={styles.treatment}>
                <span className={styles.name}>{treatment.name}</span>
                <span className={styles.description}>{treatment.description}</span>
              </li>
            ))}
          </ul>

          <a href={PAGES.treatments} className={`btn btn--primary ${styles.cta}`}>
            Wszystkie zabiegi
          </a>
        </div>
      </div>
    </section>
  );
}
