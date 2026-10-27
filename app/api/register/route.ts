import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createUser } from '../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password)
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    if (password.length < 8)
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await createUser(name.trim(), email.toLowerCase().trim(), passwordHash);

    return NextResponse.json({ ok: true, id: user._id });
  } catch (err: unknown) {
    const msg = (err as Error).message ?? 'Registration failed.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
