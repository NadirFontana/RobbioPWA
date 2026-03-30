import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendPasswordResetEmail } from '@/lib/mailer';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email obbligatoria.' }, { status: 400 });
    }

    const users = await sql`
      SELECT id FROM users
      WHERE email = ${email.toLowerCase().trim()}
    `;

    if (users.length === 0) {
      return NextResponse.json({ error: 'Indirizzo email non trovato.' }, { status: 404 });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 ora

    await sql`
      UPDATE users
      SET reset_token = ${token},
          reset_token_expires = ${expires.toISOString()}
      WHERE email = ${email.toLowerCase().trim()}
    `;

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
    await sendPasswordResetEmail(email, resetUrl);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('forgot-password error:', err);
    return NextResponse.json({ error: 'Errore interno del server.' }, { status: 500 });
  }
}