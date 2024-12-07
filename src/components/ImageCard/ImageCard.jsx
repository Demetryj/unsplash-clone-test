'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import styles from './ImageCard.module.scss';

export default function ImageCard({ image }) {
  const [isSaved, setIsSaved] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const checkSaved = async () => {
      if (session) {
        try {
          const res = await axios.get('/api/collection/check', {
            params: { imageId: image.id },
          });
          setIsSaved(res.data.isSaved);
        } catch (error) {
          console.error('Error checking collection:', error);
        }
      }
    };
    checkSaved();
  }, [session, image.id]);

  const handleSave = async () => {
    if (!session) {
      alert('Будь ласка, увійдіть, щоб зберігати зображення.');
      return;
    }

    try {
      if (isSaved) {
        await axios.post('/api/collection/remove', { imageId: image.id });

        setIsSaved(false);
      } else {
        await axios.post('/api/collection/add', { imageId: image.id });

        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error updating collection:', error);
      alert('Сталася помилка при збереженні зображення.');
    }
  };

  return (
    <div className={styles.imageCard}>
      <Link href={`/image/${image.id}`}>
        <Image
          src={image.urls.small}
          alt={image.alt_description || 'Зображення'}
          width={image.width}
          height={image.height}
          className={styles.image}
          priority
        />
      </Link>

      <div className={styles.imageInfo}>
        <p className={styles.authorName}>{image.user.name}</p>
        {session && (
          <button onClick={handleSave} className={styles.saveButton}>
            {isSaved ? 'Видалити' : 'Зберегти'}
          </button>
        )}
      </div>
    </div>
  );
}
