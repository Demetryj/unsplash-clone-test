'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './SearchBar.module.scss';

export default function SearchBar({ query }) {
  const [searchInput, setSearchInput] = useState(query || '');

  const router = useRouter();

  const handleSearch = () => {
    router.push(`/?query=${searchInput}`);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        name="search"
        placeholder="Пошук зображень..."
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
        className={styles.searchBar__input}
      />

      <button type="button" onClick={handleSearch} className={styles.searchBar__button}>
        Пошук
      </button>
    </div>
  );
}
