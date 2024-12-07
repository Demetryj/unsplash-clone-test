import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

import styles from '@/styles/ImageDetail.module.scss';

export default async function ImageDetail({ params }) {
  const { id } = params;
  let image = null;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await axios.get(`${baseUrl}/photos/${id}`, {
    params: {
      client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
    },
  });

  image = res.data;

  return (
    <section className={styles.section}>
      <div className="container">
        {!image ? (
          <p className={styles.noResult}>Зображення не знайдено</p>
        ) : (
          <div className={styles.wrapper}>
            <div className={styles.imageContainer}>
              <Image
                src={image.urls.regular}
                alt={image.alt_description || 'Зображення'}
                width={image.width}
                height={image.height}
                priority
                className={styles.image}
              />
            </div>

            <div className={styles.info}>
              <h2>{image.description || image.alt_description || 'Без опису'}</h2>
              <p>Автор: {image.user.name}</p>
              <p>Локація: {image.location.name || 'Відсутня інформація'}</p>
              <p>Лайки: {image.likes}</p>
              <div className={styles.tags}>
                {image.tags.map(tag => (
                  <Link key={tag.title} href={`/tag/${tag.title}`} className={styles.tag}>
                    #{tag.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(
    `${baseUrl}/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&per_page=10`
  );
  const images = await res.json();

  return images.map(image => ({
    id: image.id,
  }));
}
