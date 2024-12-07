import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: "Всі поля обов'язкові" }, { status: 400 });
  }

  try {
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Користувач з цією електронною поштою вже існує' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return NextResponse.json({ message: 'Користувача створено' }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { message: 'Сталася помилка при створенні користувача' },
      { status: 500 }
    );
  }
}
