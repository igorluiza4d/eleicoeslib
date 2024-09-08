// /app/candidatos/[uf]/page.tsx
import Link from 'next/link';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';

interface Municipio {
  nome: string;
  cargos: string[];
}

interface Props {
  municipios: Municipio[];
}

export default function UFPage({ municipios }: Props) {
  return (
    <div>
      <h1>Municípios</h1>
      {municipios.map((municipio, index) => (
        <div key={index}>
          <h2>{municipio.nome}</h2>
          {municipio.cargos.map((cargo, idx) => (
            <div key={idx}>
              <Link href={`/candidatos/pa/${municipio.nome}/${cargo}`}>
                {cargo}
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uf = params.uf;
  const municipioDir = path.join(process.cwd(), 'data', uf);
  const municipios = fs.readdirSync(municipioDir).map((municipio) => {
    const filePath = path.join(municipioDir, municipio, `arquivos-candidatos-${uf}-${municipio}.json`);
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const cargos = Object.keys(jsonData.cargo);
    return { nome: municipio, cargos };
  });

  return {
    props: {
      municipios,
    },
    revalidate: 60,
  };
};
