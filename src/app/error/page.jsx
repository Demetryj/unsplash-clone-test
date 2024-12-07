'use client';

import styles from '@/styles/Error.module.scss';

export default function () {
  return (
    <section className="section">
      <div className="container">
        <h2 className={styles.title}>
          Вибачте, при завантаженні сталася помилка. Спробуйте ще раз пізніше.
        </h2>
      </div>
    </section>
  );
}
