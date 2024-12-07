import Link from 'next/link';

import styles from '@/styles/Error.module.scss';

export default function NotFound() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <h2 className={styles.title}>404 Not Found</h2>

          <Link href="/" className={styles.button}>
            Повернутися на головну
          </Link>
        </div>
      </section>
    </main>
  );
}
