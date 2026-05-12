import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { getDb } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const sql = getDb();
    const body = await request.json();
    const { rione, phone: guestPhone } = body;

    if (!rione) {
      return NextResponse.json({ error: 'Rione mancante' }, { status: 400 });
    }

    const token = request.cookies.get('auth-token')?.value;

    let userId: number | null = null;
    let phone: string;
    let voterType: 'registered' | 'guest';

    if (token) {
      // Utente loggato: prendi phone dal profilo
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
        const userRows = await sql`
          SELECT id, phone FROM users WHERE id = ${decoded.userId}
        `;
        const users = Array.isArray(userRows) ? userRows : [];
        if (users.length === 0) {
          return NextResponse.json({ error: 'Utente non trovato' }, { status: 404 });
        }
        userId = users[0].id;
        phone = users[0].phone;
        voterType = 'registered';
      } catch {
        return NextResponse.json({ error: 'Token non valido' }, { status: 401 });
      }
    } else {
      // Ospite: serve il phone nel body
      if (!guestPhone) {
        return NextResponse.json({ error: 'Numero di telefono richiesto' }, { status: 400 });
      }
      phone = guestPhone.trim();
      voterType = 'guest';
    }

    // Check se phone ha già votato
    const existing = await sql`
      SELECT id, rione FROM voters WHERE phone = ${phone} LIMIT 1
    `;
    const existingRows = Array.isArray(existing) ? existing : [];
    if (existingRows.length > 0) {
      return NextResponse.json(
        { error: 'Questo numero ha già votato', alreadyVoted: true, rione: existingRows[0].rione },
        { status: 409 }
      );
    }

    // Inserisci voto
    await sql`
      INSERT INTO voters (phone, user_id, rione, voter_type, voted_at, has_voted)
      VALUES (${phone}, ${userId}, ${rione}, ${voterType}, NOW(), TRUE)
    `;

    return NextResponse.json({ ok: true, rione });
  } catch (error) {
    console.error('Errore voto:', error);
    return NextResponse.json({ error: 'Errore server' }, { status: 500 });
  }
}