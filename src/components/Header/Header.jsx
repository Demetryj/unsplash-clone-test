'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

import styles from './Header.module.scss';

export default function Header() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <header className={styles.header}>
        <div className={`container ${styles.headerContiner}`}>
          <Link href="/" className={styles.logo}>
            Unsplash Clone
          </Link>
          <nav className={styles.navigation}></nav>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContiner}`}>
        <Link href="/" className={styles.logo}>
          Unsplash Clone
        </Link>

        <nav className={styles.navigation}>
          {session && status === 'authenticated' ? (
            <>
              <Link href="/profile" className={styles.navigationLink}>
                Профіль
              </Link>
              <button onClick={() => signOut()} className={styles.logoutButton}>
                Вийти
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={styles.navigationLink}>
                Вхід
              </Link>
              <Link href="/auth/register" className={styles.navigationLink}>
                Реєстрація
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
