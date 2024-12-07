import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Необхідний вхід' }, { status: 401 });
  }

  const { imageId } = await request.json();

  if (!imageId) {
    return NextResponse.json({ message: 'Необхідний imageId' }, { status: 400 });
  }

  try {
    await dbConnect();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: 'Користувач не знайдений' }, { status: 404 });
    }

    if (!user.collections.includes(imageId)) {
      return NextResponse.json({ message: 'Зображення не знайдено у колекції' }, { status: 400 });
    }

    user.collections = user.collections.filter(id => id !== imageId);
    await user.save();

    return NextResponse.json({ message: 'Зображення видалено' }, { status: 200 });
  } catch (error) {
    console.error('Error removing image from collection:', error);
    return NextResponse.json({ message: 'Сталася помилка' }, { status: 500 });
  }
}
