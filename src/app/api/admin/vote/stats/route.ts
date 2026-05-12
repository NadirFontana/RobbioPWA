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
      SELECT rione, COUNT(*)::int AS voti
      FROM voters
      WHERE rione IS NOT NULL
      GROUP BY rione
      ORDER BY voti DESC
    `;

    return NextResponse.json({ stats: Array.isArray(rows) ? rows : [] });
  } catch {
    return NextResponse.json({ error: 'Errore server' }, { status: 500 });
  }
}