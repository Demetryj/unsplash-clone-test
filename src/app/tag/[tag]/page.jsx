'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import axios from 'axios';

import { Gallery, Pagination, ToggleColumnsButton, Loader } from '@/components';

import { PER_PAGE } from '@/constants';

import styles from '@/styles/TagPage.module.scss';

export default function TagPage() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const page = parseInt(searchParams.get('page')) || 1;
  const columns = parseInt(searchParams.get('columns')) || 3;
  const tag = params.tag;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!tag) return;

    const fetchImages = async () => {
      try {
        const res = await axios.get(`${baseUrl}/search/photos`, {
          params: {
            client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
            query: tag,
            page,
            per_page: PER_PAGE,
          },
        });

        setImages(res.data.results);
      } catch (error) {
        console.error('Error fetching tagged images:', error);
        router.push('/error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [tag, page]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={styles.section}>
      <div className="container">
        {images.length === 0 ? (
          <p className={styles.noResult}>
            Зображень за тегом <span>{`"#${tag}"`}</span> не знайдено.
          </p>
        ) : (
          <>
            <h1 className={styles.header}>Тег: {tag}</h1>

            <ToggleColumnsButton columns={columns} page={page} />

            <Gallery images={images} columns={columns} />
            <Pagination currentPage={page} columns={columns} hasNextPage={images.length >= 0} />
          </>
        )}
      </div>
    </section>
  );
}
