import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

import { Gallery, Pagination, ToggleColumnsButton } from '@/components';
import { PER_PAGE } from '@/constants';

import styles from '@/styles/Profile.module.scss';

export const dynamic = 'force-dynamic';

export default async function Profile({ searchParams }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className={styles.noLogin}>Будь ласка, увійдіть, щоб переглянути свій профіль.</div>
    );
  }

  const page = parseInt(searchParams.page) || 1;
  const per_page = PER_PAGE;
  const columns = parseInt(searchParams.columns) || 3;

  await dbConnect();

  const user = await User.findOne({ email: session.user.email });
  if (!user || !user.collections || user.collections.length === 0) {
    return <div className={styles.noResult}>Ваша колекція порожня.</div>;
  }

  const start = (page - 1) * per_page;
  const end = start + per_page;
  const paginatedImageIds = user.collections.slice(start, end);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const imagesPromises = paginatedImageIds.map(id =>
    fetch(`${baseUrl}/photos/${id}?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`).then(
      res => res.json()
    )
  );

  const images = await Promise.all(imagesPromises);

  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.header}>Мой Профиль</h1>

        <ToggleColumnsButton columns={columns} page={page} />
        <Gallery images={images} columns={columns} />
        <Pagination
          currentPage={page}
          columns={columns}
          hasNextPage={user.collections.length > PER_PAGE}
        />
      </div>
    </section>
  );
}
