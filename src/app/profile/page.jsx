'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

import { Loader, ToggleColumnsButton, Gallery, Pagination } from '@/components';

import { PER_PAGE } from '@/constants';

import styles from '@/styles/Profile.module.scss';

export default function Profile() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page')) || 1;
  const columns = parseInt(searchParams.get('columns')) || 3;

  useEffect(() => {
    const fetchCollection = async () => {
      if (!session) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get('/api/collection/get', {
          params: { page, per_page: PER_PAGE },
        });

        setImages(res.data.images);
      } catch (error) {
        console.error('Error fetching collection:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCollection();
  }, [session, page]);

  if (!session && !isLoading) {
    return (
      <div className={styles.noLogin}>Будь ласка, увійдіть, щоб переглянути свій профіль.</div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.header}>Мій Профіль</h1>

        {images.length !== 0 && !isLoading ? (
          <>
            <ToggleColumnsButton columns={columns} page={page} />

            <Gallery images={images} columns={columns} />
            <Pagination
              currentPage={page}
              columns={columns}
              hasNextPage={images.length >= PER_PAGE}
            />
          </>
        ) : (
          <div className={styles.noResult}>Твоя колекція порожня.</div>
        )}
      </div>
    </section>
  );
}
