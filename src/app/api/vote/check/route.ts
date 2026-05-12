import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { getDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const sql = getDb();
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ voted: false, rione: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    const userRows = await sql`
      SELECT id, phone FROM users WHERE id = ${decoded.userId}
    `;
    const users = Array.isArray(userRows) ? userRows : [];
    if (users.length === 0) {
      return NextResponse.json({ voted: false, rione: null });
    }

    const { phone } = users[0];

    const voteRows = await sql`
      SELECT rione FROM voters
      WHERE user_id = ${decoded.userId} OR phone = ${phone}
      LIMIT 1
    `;
    const votes = Array.isArray(voteRows) ? voteRows : [];

    if (votes.length === 0) {
      return NextResponse.json({ voted: false, rione: null });
    }

    return NextResponse.json({ voted: true, rione: votes[0].rione });
  } catch {
    return NextResponse.json({ voted: false, rione: null });
  }
}