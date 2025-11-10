import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const sql = getDb();
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Accesso negato' }, { status: 403 });
    }

    const statsResult = await sql`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE has_voted = true) as voted,
        COUNT(*) FILTER (WHERE has_voted = false) as not_voted,
        COUNT(*) FILTER (WHERE voter_type = 'registered') as registered,
        COUNT(*) FILTER (WHERE voter_type = 'guest') as guests
      FROM voters
    `;

    const stats = Array.isArray(statsResult) ? statsResult : [];

    const votersResult = await sql`
      SELECT id, phone, name, has_voted, voted_at, voter_type, created_at
      FROM voters
      ORDER BY created_at DESC
    `;

    const voters = Array.isArray(votersResult) ? votersResult : [];

    return NextResponse.json({
      stats: stats[0],
      voters
    });

  } catch (error) {
    console.error('Errore statistiche:', error);
    return NextResponse.json(
      { error: 'Errore durante il recupero delle statistiche' },
      { status: 500 }
    );
  }
}