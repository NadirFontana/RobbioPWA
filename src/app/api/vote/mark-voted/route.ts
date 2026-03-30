import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const sql = getDb();
    const { phone, name, userId } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'Numero di telefono richiesto' },
        { status: 400 }
      );
    }

    const checkResult = await sql`
      SELECT * FROM voters WHERE phone = ${phone}
    `;

    const existingVoter = Array.isArray(checkResult) ? checkResult : [];

    if (existingVoter.length > 0) {
      const updateResult = await sql`
        UPDATE voters 
        SET has_voted = true, 
            voted_at = NOW(),
            updated_at = NOW()
        WHERE phone = ${phone}
        RETURNING *
      `;
      
      const updated = Array.isArray(updateResult) ? updateResult : [];
      
      return NextResponse.json({ 
        success: true,
        message: 'Voto registrato',
        voter: updated[0] 
      });
    }

    const voterType = userId ? 'registered' : 'guest';
    const insertResult = await sql`
      INSERT INTO voters (phone, user_id, name, has_voted, voted_at, voter_type)
      VALUES (${phone}, ${userId || null}, ${name || null}, true, NOW(), ${voterType})
      RETURNING *
    `;

    const inserted = Array.isArray(insertResult) ? insertResult : [];

    return NextResponse.json({ 
      success: true,
      message: 'Voto registrato',
      voter: inserted[0] 
    }, { status: 201 });

  } catch (error: any) {
    console.error('Errore registrazione voto:', error);
    return NextResponse.json(
      { error: 'Errore durante la registrazione del voto' },
      { status: 500 }
    );
  }
}