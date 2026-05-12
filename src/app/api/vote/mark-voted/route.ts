import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { getDb } from '@/lib/db';
import { normalizePhone } from '@/lib/phone';

export async function POST(request: NextRequest) {
  try {
    const sql = getDb();
    const body = await request.json();
    const { rione, phone } = body;

    if (!rione) {
      return NextResponse.json({ error: 'Rione mancante' }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ error: 'Numero di telefono richiesto' }, { status: 400 });
    }

    const cleanPhone = normalizePhone(phone);
    if (!cleanPhone) {
      return NextResponse.json({ error: 'Numero di telefono non valido' }, { status: 400 });
    }

    let userId: number | null = null;
    let voterType: 'registered' | 'guest' = 'guest';

    const token = request.cookies.get('auth-token')?.value;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
        const userRows = await sql`SELECT id FROM users WHERE id = ${decoded.userId}`;
        const users = Array.isArray(userRows) ? userRows : [];
        if (users.length > 0) {
          userId = users[0].id;
          voterType = 'registered';
        }
      } catch {
        // Token non valido → trattalo come ospite
      }
    }

    // Check preventivo
    const existing = await sql`
      SELECT id, rione FROM voters WHERE phone = ${cleanPhone} LIMIT 1
    `;
    const existingRows = Array.isArray(existing) ? existing : [];
    if (existingRows.length > 0) {
      return NextResponse.json(
        { error: `Questo numero ha già votato per ${existingRows[0].rione}`, alreadyVoted: true, rione: existingRows[0].rione },
        { status: 409 }
      );
    }

    try {
      await sql`
        INSERT INTO voters (phone, user_id, rione, voter_type, voted_at, has_voted)
        VALUES (${cleanPhone}, ${userId}, ${rione}, ${voterType}, NOW(), TRUE)
      `;
    } catch (insertError: unknown) {
      // Postgres unique_violation = 23505 (race condition o numero duplicato)
      if (
        typeof insertError === 'object' &&
        insertError !== null &&
        'code' in insertError &&
        (insertError as { code: string }).code === '23505'
      ) {
        const dup = await sql`SELECT rione FROM voters WHERE phone = ${cleanPhone} LIMIT 1`;
        const dupRows = Array.isArray(dup) ? dup : [];
        return NextResponse.json(
          {
            error: `Questo numero ha già votato${dupRows[0]?.rione ? ` per ${dupRows[0].rione}` : ''}`,
            alreadyVoted: true,
            rione: dupRows[0]?.rione || null,
          },
          { status: 409 }
        );
      }
      throw insertError;
    }

    return NextResponse.json({ ok: true, rione });
  } catch (error) {
    console.error('Errore voto:', error);
    return NextResponse.json({ error: 'Errore server' }, { status: 500 });
  }
}