import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { getDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const sql = getDb();
    const token = request.cookies.get('auth-token')?.value;
    if (!token) return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; role: string };
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const rows = await sql`
      SELECT v.id, v.phone, v.rione, v.voter_type, v.voted_at, u.name AS user_name, u.email AS user_email
      FROM voters v
      LEFT JOIN users u ON v.user_id = u.id
      ORDER BY v.voted_at DESC
    `;

    return NextResponse.json({ votes: Array.isArray(rows) ? rows : [] });
  } catch {
    return NextResponse.json({ error: 'Errore server' }, { status: 500 });
  }
}