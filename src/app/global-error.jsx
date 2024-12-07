'use client';

import styles from '@/styles/Error.module.scss';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <section className="section">
          <div className="container">
            <h1 className={styles.title}>{error}</h1>
            <button onClick={() => reset()} className={styles.button}>
              Спробувати ще
            </button>
          </div>
        </section>
      </body>
    </html>
  );
}
