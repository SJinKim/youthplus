import { createConnection } from '@/lib/db.js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await createConnection();
    const sql = 'SELECT * FROM admin';
    const [admin] = await db.query(sql);
    return NextResponse.json(admin);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
