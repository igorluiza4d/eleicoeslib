import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uf = searchParams.get('uf');

  // Verifica se o parâmetro UF foi fornecido
  if (!uf) {
    return NextResponse.json({ error: 'UF não fornecida' }, { status: 400 });
  }

  // Caminho ajustado para o arquivo JSON de municípios dentro de /public/data/pa
  const filePath = path.join(process.cwd(), 'public', 'data', uf, `arquivo-municipios-${uf}.json`);

  // Verifica se o arquivo existe
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'UF não encontrada' }, { status: 404 });
  }

  // Lê o conteúdo do arquivo JSON
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const municipios = JSON.parse(jsonData);

  // Retorna os dados dos municípios
  return NextResponse.json(municipios);
}
