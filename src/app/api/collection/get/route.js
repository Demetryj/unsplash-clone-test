import { getServerSession } from 'next-auth/next';
import axios from 'axios';
import { NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Необхідний вхід', images: [] }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const per_page = parseInt(searchParams.get('per_page')) || 30;

  try {
    await dbConnect();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: 'Користувач не знайдений', images: [] }, { status: 404 });
    }

    const imageIds = user.collections;

    const start = (page - 1) * per_page;
    const end = start + per_page;
    const paginatedImageIds = imageIds.slice(start, end);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const imagesPromises = paginatedImageIds.map(id =>
      axios
        .get(`${baseUrl}/photos/${id}`, {
          params: {
            client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
          },
        })
        .then(res => res.data)
    );

    const images = await Promise.all(imagesPromises);

    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user collection:', error);
    return NextResponse.json({ message: 'Сталася помилка', images: [] }, { status: 500 });
  }
}
