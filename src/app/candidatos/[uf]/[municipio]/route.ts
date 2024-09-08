// /app/api/municipios/route.ts
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const uf = searchParams.get('uf');
  
  if (!uf) {
    return NextResponse.json({ error: 'UF não fornecida' }, { status: 400 });
  }

  const ufPath = path.join(process.cwd(), 'data', uf);
  const municipios = fs.readdirSync(ufPath).map((municipio) => ({ nome: municipio }));

  return NextResponse.json(municipios);
}
