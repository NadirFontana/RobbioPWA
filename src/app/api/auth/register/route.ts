import { sql } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, name, phone } = await request.json();

    if (!email || !password || !phone) {
      return NextResponse.json(
        { error: 'Email, password e numero di telefono richiesti' },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await sql`
      INSERT INTO users (email, phone, password_hash, name, role)
      VALUES (${email}, ${phone}, ${passwordHash}, ${name}, 'user')
      RETURNING id, email, phone, name, role
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error: any) {
    if (error.code === '23505') {
      if (error.detail?.includes('email')) {
        return NextResponse.json(
          { error: 'Email già registrata' },
          { status: 409 }
        );
      } else if (error.detail?.includes('phone')) {
        return NextResponse.json(
          { error: 'Numero di telefono già registrato' },
          { status: 409 }
        );
      }
    }
    console.error('Errore registrazione:', error);
    return NextResponse.json(
      { error: 'Errore durante la registrazione' },
      { status: 500 }
    );
  }
}