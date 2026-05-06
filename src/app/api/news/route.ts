import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

async function getAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    if (decoded.role !== 'admin') return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const sql = getDb();
    const news = await sql`
      SELECT * FROM news ORDER BY data DESC
    `;
    return NextResponse.json(news);
  } catch {
    return NextResponse.json({ error: 'Errore DB' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });

  try {
    const { titolo, descrizione, immagine } = await req.json();
    if (!titolo || !descrizione || !immagine) {
      return NextResponse.json({ error: 'Campi mancanti' }, { status: 400 });
    }
    const sql = getDb();
    const [news] = await sql`
      INSERT INTO news (titolo, descrizione, immagine)
      VALUES (${titolo}, ${descrizione}, ${immagine})
      RETURNING *
    `;
    return NextResponse.json(news, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Errore DB' }, { status: 500 });
  }
}