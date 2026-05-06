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

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });

  try {
    const { id } = await params;
    const { titolo, descrizione, immagine } = await req.json();
    const sql = getDb();
    const [news] = await sql`
      UPDATE news
      SET titolo = ${titolo}, descrizione = ${descrizione}, immagine = ${immagine}
      WHERE id = ${id}
      RETURNING *
    `;
    if (!news) return NextResponse.json({ error: 'Non trovata' }, { status: 404 });
    return NextResponse.json(news);
  } catch {
    return NextResponse.json({ error: 'Errore DB' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });

  try {
    const { id } = await params;
    const sql = getDb();
    await sql`DELETE FROM news WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Errore DB' }, { status: 500 });
  }
}