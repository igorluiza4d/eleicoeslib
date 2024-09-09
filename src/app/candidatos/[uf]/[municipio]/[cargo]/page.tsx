import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import CargoClientComponent from './CargoClientComponent';
import HeroCapaBox from '@/app/components/HeroCapaBox';

interface Candidate {
  nomeUrna: string;
  numCand: string;
  siglaPartido: string;
  cargo: string;
  fotocandidato: string;
  slug: string;
  cidade: string;
}

interface CargoData {
  [cargo: string]: {
    [slug: string]: Candidate;
  };
}

interface JsonData {
  cargo: CargoData;
}

interface Props {
  params: {
    uf: string;
    municipio: string;
    cargo: string;
  };
}

// Função para verificar se a imagem existe no servidor
function verificarImagemExistente(uf: string, caminhoImagem: string): string {
  const caminhoCompleto = path.join(process.cwd(), 'public', caminhoImagem);

  if (fs.existsSync(caminhoCompleto)) {
    return caminhoImagem;
  } else {
    return '/perfil-padrao.jpg'; // Caminho da imagem padrão
  }
}

// Função para carregar candidatos
async function loadCandidates(uf: string, municipio: string): Promise<Candidate[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', uf, municipio, `arquivo-candidato-${uf}-${municipio}.json`);

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const jsonData: JsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const candidatosComSlug: Candidate[] = Object.entries(jsonData.cargo).reduce(
    (acc: Candidate[], [cargo, candidatos]: [string, { [slug: string]: Candidate }]) => {
      const candidatosDoCargo = Object.entries(candidatos).map(([slug, candidato]) => ({
        ...candidato,
        slug,
        cargo,
        // Verifica se a imagem existe e substitui pela imagem padrão se não existir
        fotocandidato: verificarImagemExistente(uf, candidato.fotocandidato),
      }));
      return [...acc, ...candidatosDoCargo];
    },
    []
  );

  return candidatosComSlug;
}

// Função para gerar metadados dinâmicos
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const candidatos = await loadCandidates(params.uf, params.municipio);
  const candidatosDoCargo = candidatos.filter((candidato: Candidate) => candidato.cargo === params.cargo);
  const nomeCidade = candidatosDoCargo.length > 0 ? candidatosDoCargo[0].cidade : params.municipio;

  const title = `Candidatos a ${params.cargo} em ${nomeCidade} - ${params.uf.toUpperCase()}`;
  const description = `Conheça todos os candidatos ao cargo de ${params.cargo} na cidade de ${nomeCidade}, ${params.uf.toUpperCase()}.`;
  const url = `https://seusite.com/candidatos/${params.uf}/${params.municipio}/${params.cargo}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: `/images/cidade/${params.municipio}-capa.jpg`,
          width: 1200,
          height: 630,
          alt: `Imagem de ${nomeCidade}`,
        },
      ],
      type: 'article',
    },
    alternates: {
      canonical: url,
    },
    other: {
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
    },
  };
}

// Página de cargo que carrega os candidatos
export default async function CargoPage({ params }: Props) {
  const candidatos = await loadCandidates(params.uf, params.municipio);

  const candidatosDoCargo = candidatos.filter((candidato: Candidate) => candidato.cargo === params.cargo);
  const nomeCidade = candidatosDoCargo.length > 0 ? candidatosDoCargo[0].cidade : params.municipio;

  const breadcrumb = [
    { label: 'Início', href: '/' },
    { label: 'Candidatos', href: '/candidatos' },
    { label: params.uf.toUpperCase(), href: `/candidatos/${params.uf}` },
    { label: nomeCidade, href: `/candidatos/${params.uf}/${params.municipio}` },
    { label: params.cargo, href: `/candidatos/${params.uf}/${params.municipio}/${params.cargo}` },
  ];

  return (
    <>
      <HeroCapaBox
        title={`Candidatos a ${params.cargo}`}
        highlight={`${nomeCidade}`}
        description={`Aqui você encontra todos os candidatos ao cargo de ${params.cargo} registrados no município de ${nomeCidade}, ${params.uf.toUpperCase()}.`}
        breadcrumb={breadcrumb}
      />

      <CargoClientComponent params={params} candidatosDoCargo={candidatosDoCargo} />
    </>
  );
}
