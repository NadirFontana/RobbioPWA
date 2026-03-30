import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
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

    const { phone } = await request.json();

    const resetResult = await sql`
      UPDATE voters 
      SET has_voted = false, 
          voted_at = NULL,
          updated_at = NOW()
      WHERE phone = ${phone}
      RETURNING *
    `;

    const result = Array.isArray(resetResult) ? resetResult : [];

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Votante non trovato' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Voto resettato',
      voter: result[0] 
    });

  } catch (error) {
    console.error('Errore reset voto:', error);
    return NextResponse.json(
      { error: 'Errore durante il reset' },
      { status: 500 }
    );
  }
}