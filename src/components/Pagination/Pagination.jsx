'use client';

import { usePathname, useRouter } from 'next/navigation';

import styles from './Pagination.module.scss';

export default function Pagination({ currentPage, query, columns, hasNextPage }) {
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = newPage => {
    const queryString = query ? `&query=${query}` : '';
    const columnParam = `&columns=${columns}`;
    router.push(`${pathname}/?page=${newPage}${queryString}${columnParam}`);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagination__button}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Попередня
      </button>

      <span className={styles.pagination__text}>Сторінка {currentPage}</span>

      <button
        className={styles.pagination__button}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
      >
        Наступна
      </button>
    </div>
  );
}
