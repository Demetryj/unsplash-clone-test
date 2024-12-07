import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Необхідний вхід', isSaved: false }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const imageId = searchParams.get('imageId');

  if (!imageId) {
    return NextResponse.json({ message: 'Необхідний imageId', isSaved: false }, { status: 400 });
  }

  try {
    await dbConnect();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { message: 'Користувач не знайдений', isSaved: false },
        { status: 404 }
      );
    }

    const isSaved = user.collections.includes(imageId);

    return NextResponse.json({ isSaved }, { status: 200 });
  } catch (error) {
    console.error('Error checking image in collection:', error);
    return NextResponse.json({ message: 'Сталася помилка', isSaved: false }, { status: 500 });
  }
}
