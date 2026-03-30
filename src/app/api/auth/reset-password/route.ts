import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Dati mancanti.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La password deve essere di almeno 6 caratteri.' },
        { status: 400 }
      );
    }

    const users = await sql`
      SELECT id FROM users
      WHERE reset_token = ${token}
      AND reset_token_expires > NOW()
    `;

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'Link non valido o scaduto. Richiedi un nuovo reset.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      UPDATE users
      SET password = ${hashedPassword},
          reset_token = NULL,
          reset_token_expires = NULL
      WHERE reset_token = ${token}
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('reset-password error:', err);
    return NextResponse.json({ error: 'Errore interno del server.' }, { status: 500 });
  }
}