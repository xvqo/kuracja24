import { EMAIL, MAPS_DIRECTIONS_URL, MAPS_EMBED_URL, PHONE, PHONE_HREF } from '@/lib/content';
import { ContactForm } from './ContactForm';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <section id="kontakt" className="section-white" aria-labelledby="contact-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.info}>
          <p className="eyebrow">Kontakt</p>
          <h2 id="contact-title" className="h2">
            Zapraszamy na Warszawską 17.
          </h2>

          <dl className={styles.details}>
            <div className={styles.detail}>
              <dt>Adres</dt>
              <dd>
                ul. Warszawska 17 (Grzybek)
                <br />
                21-300 Radzyń Podlaski
              </dd>
            </div>
            <div className={styles.detail}>
              <dt>Rejestracja</dt>
              <dd>
                <a href={PHONE_HREF} className="tabular">
                  tel./fax {PHONE}
                </a>
              </dd>
            </div>
            <div className={styles.detail}>
              <dt>E-mail</dt>
              <dd>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </dd>
            </div>
          </dl>

          <div className={styles.actions}>
            <a href={PHONE_HREF} className="btn btn--primary">
              Zadzwoń
            </a>
            <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener" className="btn btn--outline">
              Wyznacz trasę
            </a>
          </div>

          <div className={styles.map}>
            <iframe
              title="Mapa: ul. Warszawska 17, Radzyń Podlaski"
              src={MAPS_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className={styles.mapShade} aria-hidden="true" />
            <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener" className={styles.mapPill}>
              <span className={styles.mapMarker} aria-hidden="true" />
              Kuracja · Warszawska 17
            </a>
          </div>
        </div>

        <div className={styles.formCard}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
