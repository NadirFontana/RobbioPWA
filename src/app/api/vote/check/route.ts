import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'Numero di telefono richiesto' },
        { status: 400 }
      );
    }

    const voter = await sql`
      SELECT has_voted, voted_at, name FROM voters WHERE phone = ${phone}
    `;

    if (voter.length === 0) {
      return NextResponse.json({ 
        hasVoted: false,
        canVote: true,
        message: 'Numero non trovato, può votare' 
      });
    }

    return NextResponse.json({ 
      hasVoted: voter[0].has_voted,
      canVote: !voter[0].has_voted,
      votedAt: voter[0].voted_at,
      name: voter[0].name
    });

  } catch (error) {
    console.error('Errore verifica voto:', error);
    return NextResponse.json(
      { error: 'Errore durante la verifica' },
      { status: 500 }
    );
  }
}