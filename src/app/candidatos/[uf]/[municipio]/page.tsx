// /app/candidatos/[uf]/[municipio]/page.tsx
import Link from 'next/link';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';

interface Candidate {
  nomeUrna: string;
  cargo: string;
  cidade: string;
}

interface Props {
  prefeitos: Candidate[];
  vereadores: Candidate[];
}

export default function MunicipioPage({ prefeitos, vereadores }: Props) {
  return (
    <div>
      <h1>Candidatos a Prefeito</h1>
      {prefeitos.map((prefeito, index) => (
        <div key={index}>
          <Link href={`/candidatos/pa/belem/prefeito/${prefeito.nomeUrna}`}>
            {prefeito.nomeUrna}
          </Link>
        </div>
      ))}

      <h1>Candidatos a Vereador</h1>
      {vereadores.map((vereador, index) => (
        <div key={index}>
          <Link href={`/candidatos/pa/belem/vereador/${vereador.nomeUrna}`}>
            {vereador.nomeUrna}
          </Link>
        </div>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), 'data', params.uf, params.municipio, `arquivos-candidatos-${params.uf}-${params.municipio}.json`);
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const prefeitos = Object.values(jsonData.cargo.prefeito).slice(0, 10);  // Pegando até 10 prefeitos
  const vereadores = Object.values(jsonData.cargo.vereador).slice(0, 10); // Pegando até 10 vereadores

  return {
    props: {
      prefeitos,
      vereadores,
    },
    revalidate: 60, // ISR
  };
};
