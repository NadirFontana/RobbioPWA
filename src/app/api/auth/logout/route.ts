import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const sql = getDb();

    if (!sql) {
      return NextResponse.json(
        { error: 'Database non configurato' },
        { status: 500 }
      );
    }

    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'Numero di telefono richiesto' },
        { status: 400 }
      );
    }

    const result = await sql`
      SELECT has_voted, voted_at, name FROM voters WHERE phone = ${phone}
    `;

    const voters = Array.isArray(result) ? result : [];

    if (voters.length === 0) {
      return NextResponse.json({ 
        hasVoted: false,
        canVote: true,
        message: 'Numero non trovato, può votare' 
      });
    }

    const voter = voters[0] as any;

    return NextResponse.json({ 
      hasVoted: voter.has_voted,
      canVote: !voter.has_voted,
      votedAt: voter.voted_at,
      name: voter.name
    });

  } catch (error) {
    console.error('Errore verifica voto:', error);
    return NextResponse.json(
      { error: 'Errore durante la verifica' },
      { status: 500 }
    );
  }
}