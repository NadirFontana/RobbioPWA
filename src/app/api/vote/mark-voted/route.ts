import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phone, name, userId } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'Numero di telefono richiesto' },
        { status: 400 }
      );
    }

    const existingVoter = await sql`
      SELECT * FROM voters WHERE phone = ${phone}
    `;

    if (existingVoter.length > 0) {
      const result = await sql`
        UPDATE voters 
        SET has_voted = true, 
            voted_at = NOW(),
            updated_at = NOW()
        WHERE phone = ${phone}
        RETURNING *
      `;
      return NextResponse.json({ 
        success: true,
        message: 'Voto registrato',
        voter: result[0] 
      });
    }

    const voterType = userId ? 'registered' : 'guest';
    const result = await sql`
      INSERT INTO voters (phone, user_id, name, has_voted, voted_at, voter_type)
      VALUES (${phone}, ${userId || null}, ${name || null}, true, NOW(), ${voterType})
      RETURNING *
    `;

    return NextResponse.json({ 
      success: true,
      message: 'Voto registrato',
      voter: result[0] 
    }, { status: 201 });

  } catch (error: any) {
    console.error('Errore registrazione voto:', error);
    return NextResponse.json(
      { error: 'Errore durante la registrazione del voto' },
      { status: 500 }
    );
  }
}