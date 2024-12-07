import { Suspense } from 'react';
import { SearchBar, ToggleColumnsButton, Gallery, Pagination, Loader } from '@/components';

import { PER_PAGE } from '@/constants';

import styles from '@/styles/Home.module.scss';

export default async function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const query = searchParams.query || '';
  const columns = parseInt(searchParams.columns) || 3;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const url = query
    ? `${baseUrl}/search/photos?query=${query}&page=${page}&per_page=${PER_PAGE}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
    : `${baseUrl}/photos?page=${page}&per_page=${PER_PAGE}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`;

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Не вдалося отримати дані з API Unsplash');
  }

  const data = await res.json();
  const images = query ? data.results : data;

  return (
    <section className="section">
      <div className="container">
        <SearchBar query={query} />
        <Suspense fallback={<Loader />}>
          {images.length === 0 ? (
            <p className={styles.noResult}>
              Зображень за запитом <span>{`"${query}"`}</span> не знайдено. <br />
              Спробуйте змінити пошукове слово.
            </p>
          ) : (
            <>
              <ToggleColumnsButton columns={columns} page={page} query={query} />

              <Gallery images={images} columns={columns} />

              <Pagination
                currentPage={page}
                query={query}
                columns={columns}
                hasNextPage={images.length >= PER_PAGE}
              />
            </>
          )}
        </Suspense>
      </div>
    </section>
  );
}
