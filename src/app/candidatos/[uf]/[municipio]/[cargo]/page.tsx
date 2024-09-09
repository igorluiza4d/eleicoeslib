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

interface Props {
  params: {
    uf: string;
    municipio: string;
    cargo: string;
  };
}

// Função para carregar candidatos
async function loadCandidates(uf: string, municipio: string) {
  const filePath = path.join(process.cwd(), 'public', 'data', uf, municipio, `arquivo-candidato-${uf}-${municipio}.json`);

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const candidatosComSlug = Object.entries(jsonData.cargo).reduce((acc: any[], [cargo, candidatos]: [string, any]) => {
    const candidatosDoCargo = Object.entries(candidatos).map(([slug, candidato]) => ({
      ...candidato,
      slug,
      cargo,
    }));
    return [...acc, ...candidatosDoCargo];
  }, []);

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

// Componente de Breadcrumb dinâmico
const Breadcrumb = ({ items }: { items: { label: string; href: string }[] }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li key={index} className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`}>
            {index === items.length - 1 ? (
              item.label
            ) : (
              <a href={item.href}>{item.label}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Dados estruturados (JSON-LD)
const StructuredData = ({ candidatosDoCargo, uf, municipio, cargo }: { candidatosDoCargo: Candidate[], uf: string, municipio: string, cargo: string }) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Candidatos a ${cargo} em ${municipio} - ${uf.toUpperCase()}`,
    "itemListElement": candidatosDoCargo.map((candidato, index) => ({
      "@type": "Person",
      "position": index + 1,
      "name": candidato.nomeUrna,
      "party": candidato.siglaPartido,
      "image": candidato.fotocandidato ? candidato.fotocandidato : '',
      "url": `/candidatos/${uf}/${municipio}/${cargo}/${candidato.slug}`,
    }))
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
};

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
      {/* HeroCapaBox para ilustrar a página de cargo */}
      <HeroCapaBox
        title={`Candidatos a ${params.cargo}`}
        highlight={`${nomeCidade}`}
        description={`Aqui você encontra todos os candidatos ao cargo de ${params.cargo} registrados no município de ${nomeCidade}, ${params.uf.toUpperCase()}.`}
        breadcrumb={breadcrumb} 
      />
     {/* Dados estruturados */}
      <StructuredData candidatosDoCargo={candidatosDoCargo} uf={params.uf} municipio={nomeCidade} cargo={params.cargo} />

      {/* Componente de listagem de candidatos */}
      <CargoClientComponent params={params} candidatosDoCargo={candidatosDoCargo} />
    </>
  );
}
