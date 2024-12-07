'use client';

import { useRouter, usePathname } from 'next/navigation';

import styles from './ToggleColumnsButton.module.scss';

export default function ToggleColumnsButton({ columns, page, query }) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleColumns = () => {
    const newColumns = columns === 3 ? 5 : 3;
    const queryString = query ? `&query=${query}` : '';

    router.push(`${pathname}/?page=${page}&columns=${newColumns}${queryString}`);
  };

  return (
    <button className={styles.toggleButton} onClick={toggleColumns}>
      Перемкнути на {columns === 3 ? 5 : 3} колонок
    </button>
  );
}
