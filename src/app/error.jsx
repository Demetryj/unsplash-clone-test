'use client';

import Link from 'next/link';

import styles from '@/styles/Error.module.scss';

export default function NotFound() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <h2 className={styles.title}>Вибачте, при завантаженні сталася помилка.</h2>

          <Link href="/" className={styles.button}>
            Повернутися на головну
          </Link>
        </div>
      </section>
    </main>
  );
}
