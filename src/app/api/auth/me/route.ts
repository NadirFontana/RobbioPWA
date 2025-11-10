import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Non autenticato' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    const users = await sql`
      SELECT id, email, phone, name, role 
      FROM users 
      WHERE id = ${decoded.userId}
    `;

    if (users.length === 0) {
      return NextResponse.json({ error: 'Utente non trovato' }, { status: 404 });
    }

    return NextResponse.json({ user: users[0] });

  } catch (error) {
    return NextResponse.json({ error: 'Token non valido' }, { status: 401 });
  }
}