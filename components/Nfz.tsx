import { PAGES, PHONE_HREF, REGISTRATION_STEPS } from '@/lib/content';
import styles from './Nfz.module.css';

export function Nfz() {
  return (
    <section id="nfz" className={`container ${styles.section}`} aria-labelledby="nfz-title">
      <div className={styles.card} data-header-theme="dark">
        <div className={styles.intro}>
          <p className="eyebrow eyebrow--dark">Narodowy Fundusz Zdrowia</p>
          <h2 id="nfz-title" className={styles.title}>
            Porady i zabiegi także w ramach NFZ.
          </h2>
          <p className={styles.lead}>
            Realizujemy porady lekarskie i zabiegi fizjoterapii w ramach umowy z Narodowym Funduszem Zdrowia. Sprawdź,
            kto i w jaki sposób może z tego skorzystać.
          </p>
          <a href={PAGES.nfzRules} className={`link-dark ${styles.rulesLink}`}>
            Zasady korzystania z NFZ
          </a>
        </div>

        <div id="rejestracja" className={styles.registration}>
          <p className={`eyebrow eyebrow--dark ${styles.stepsLabel}`}>Rejestracja w trzech krokach</p>
          <ol className={styles.steps}>
            {REGISTRATION_STEPS.map((step, i) => (
              <li key={step.title} className={styles.step}>
                <span className={`${styles.stepNumber} tabular`}>{i + 1}</span>
                <span className={styles.stepText}>
                  <span className={styles.stepTitle}>{step.title}</span>
                  <span className={styles.stepDescription}>{step.description}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className={styles.actions}>
            <a href={PHONE_HREF} className="btn btn--lg btn--white">
              Zadzwoń i umów wizytę
            </a>
            <a href={PAGES.whatToBring} className="link-dark">
              Co przygotować
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
