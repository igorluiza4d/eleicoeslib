// /app/candidatos/[uf]/[municipio]/[cargo]/[slug-nome-candidato]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';

interface Candidate {
  agremiacao: string;
  cargo: string;
  cidade: string;
  colicacao: string;
  descColicacao: string;
  dtNascimento: string;
  escolaridade: string;
  estadoCivil: string;
  fotocandidato: string;
  idcandidato: string;
  nome: string;
  nomePartido: string;
  nomeSocial: string;
  nomeUrna: string;
  numCand: string;
  numPartido: string;
  ocupacao: string;
  proposta: string;
  sexo: string;
  siglaPartido: string;
  ufCandidato: string;
}

interface Props {
  params: {
    uf: string;
    municipio: string;
    cargo: string;
    slugnome: string;
  };
}

interface Bem {
  bem: string;
  valor: string;
}

// Função para carregar os bens do candidato
async function getCandidateBens(idcandidato: string, params: Props['params']): Promise<null | Bem[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', params.uf, params.municipio, `arquivo-bens-${params.uf}-${params.municipio}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!jsonData[idcandidato]) {
    return null;
  }

  const bens = Object.keys(jsonData[idcandidato]).map((key) => jsonData[idcandidato][key]);

  return bens;
}

// Função para obter os dados do candidato e verificar a imagem
async function getCandidateData(params: Props['params']): Promise<{ candidate: Candidate; imageSrc: string } | null> {
  const filePath = path.join(process.cwd(), 'public', 'data', params.uf, params.municipio, `arquivo-candidato-${params.uf}-${params.municipio}.json`);
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const cargoData = jsonData.cargo[params.cargo];

  if (!cargoData || !cargoData[params.slugnome]) {
    return null;
  }

  const candidate = cargoData[params.slugnome];

  const imagePath = path.join(process.cwd(), 'public', candidate.fotocandidato);
  const imageExists = fs.existsSync(imagePath);

  const imageSrc = imageExists ? candidate.fotocandidato : '/perfil-padrao.jpg';

  return { candidate, imageSrc };
}

// Função para gerar o texto descritivo genérico do candidato
function gerarTextoDescritivo(candidate: Candidate, uf: string, municipio: string): string {
  let descricao = `${candidate.nomeUrna} é candidato(a) a ${candidate.cargo} de ${municipio}, ${uf.toUpperCase()}, nas eleições de 2024 pelo partido ${candidate.nomePartido} (${candidate.siglaPartido}).`;

  if (candidate.ocupacao) {
    descricao += ` ${candidate.nomeUrna} atua como ${candidate.ocupacao} e é reconhecido(a) por seu comprometimento na área.`;
  }

  if (candidate.colicacao && candidate.descColicacao) {
    descricao += ` Sua candidatura conta com o apoio da coligação ${candidate.colicacao}, formada pelo partido ${candidate.descColicacao}.`;
  } else {
    descricao += ` Sua campanha é apoiada exclusivamente pelo partido ${candidate.siglaPartido}.`;
  }

  return descricao;
}

// Função para renderizar o breadcrumb
function Breadcrumb({ params }: Props) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb flex space-x-2">
        <li>
          <Link href="/candidatos" legacyBehavior>
            <a className="text-blue-600 hover:underline">Candidatos</a>
          </Link>
          <span> / </span>
        </li>
        <li>
          <Link href={`/candidatos/${params.uf}`} legacyBehavior>
            <a className="text-blue-600 hover:underline">{params.uf.toUpperCase()}</a>
          </Link>
          <span> / </span>
        </li>
        <li>
          <Link href={`/candidatos/${params.uf}/${params.municipio}`} legacyBehavior>
            <a className="text-blue-600 hover:underline">{params.municipio}</a>
          </Link>
          <span> / </span>
        </li>
        <li>
          <Link href={`/candidatos/${params.uf}/${params.municipio}/${params.cargo}`} legacyBehavior>
            <a className="text-blue-600 hover:underline">{params.cargo}</a>
          </Link>
        </li>
      </ol>
    </nav>
  );
}

// Função para gerar os metadados dinâmicos (SEO, OpenGraph e Twitter)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getCandidateData(params);

  if (!data) {
    return {
      title: 'Candidato não encontrado',
      description: 'Candidato não encontrado para esta eleição.',
    };
  }

  const { candidate, imageSrc } = data;
  const descricao = gerarTextoDescritivo(candidate, params.uf, params.municipio);

  return {
    title: `Candidato ${candidate.nomeUrna} - Eleições ${params.uf.toUpperCase()}`,
    description: descricao,
    openGraph: {
      title: `Candidato ${candidate.nomeUrna}`,
      description: descricao,
      url: `https://seuportal.com/candidatos/${params.uf}/${params.municipio}/${params.cargo}/${params.slugnome}`,
      images: [
        {
          url: imageSrc,
          width: 800,
          height: 600,
          alt: `Foto do candidato ${candidate.nomeUrna}`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@seuportal',
      title: `Candidato ${candidate.nomeUrna}`,
      description: descricao,
      images: [
        {
          url: imageSrc,
        },
      ],
    },
  };
}

// Função para incluir dados estruturados para o candidato e o portal
function StructuredData({ params, candidate, imageSrc }: { params: Props['params'], candidate: Candidate, imageSrc: string }) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Candidatos",
        "item": `https://seuportal.com/candidatos`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": params.uf.toUpperCase(),
        "item": `https://seuportal.com/candidatos/${params.uf}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": params.municipio,
        "item": `https://seuportal.com/candidatos/${params.uf}/${params.municipio}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": params.cargo,
        "item": `https://seuportal.com/candidatos/${params.uf}/${params.municipio}/${params.cargo}`
      }
    ]
  };

  const candidateData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": candidate.nomeUrna,
    "jobTitle": candidate.cargo,
    "image": imageSrc,
    "url": `https://seuportal.com/candidatos/${params.uf}/${params.municipio}/${params.cargo}/${params.slugnome}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": params.municipio,
      "addressRegion": params.uf.toUpperCase()
    },
    "affiliation": {
      "@type": "Organization",
      "name": candidate.siglaPartido
    }
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbList, candidateData]) }} />
  );
}

export default async function CandidatePage({ params }: Props) {
  const data = await getCandidateData(params);

  if (!data) {
    return <div>Candidato não encontrado</div>;
  }

  const { candidate, imageSrc } = data;
  const textoDescritivo = gerarTextoDescritivo(candidate, params.uf, params.municipio);

  const bens = await getCandidateBens(candidate.idcandidato, params);

  return (
    <>
      <StructuredData params={params} candidate={candidate} imageSrc={imageSrc} />

      <div className='flex bg-gray-100'>
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto border-b border-gray-100">
          <div className="md:flex md:items-center md:gap-12 xl:gap-32">
            <div className='grid grid-cols-1 items-center justify-center md:w-1/4'>
              <div className='flex w-full items-center justify-center'>
                <Image
                  src={imageSrc}
                  alt={`Foto do candidato ${candidate.nomeUrna}`}
                  width={191}
                  height={225}
                  quality={100}
                  // layout="responsive"
                  className="rounded-xl"
                  priority={true}
                />
              </div>
              <div className='flex flex-row w-full justify-center mt-5'>
                <a className='flex px-8 py-4 flex-row text-base font-semibold rounded-lg border uppercase items-center border-transparent gap-x-2 justify-items-center  bg-blue-600 text-white  bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none' href={candidate.proposta}>
                  Plano de Governo
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </a>
              </div>

            </div>
            <div className="md:flex-auto md:w-3/4 mt-5 sm:mt-10 lg:mt-0">
              <div className='pb-4'>
                <Breadcrumb params={params} />
              </div>
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-2 md:space-y-4">
                  <h2 className="font-bold text-3xl lg:text-4xl text-gray-800">
                    <div className='md:grid md:grid-cols-2'>
                      <div className='py-2'>
                        <p className='text-xl'>NOME DO CANDIDATO:</p>
                        <p>{candidate.nomeUrna}</p>
                      </div>
                      <div className='py-2'>
                        <p className='text-xl'>NÚMERO DO CANDIDATO:</p>
                        <p>{candidate.numCand}</p>
                      </div>
                    </div>
                  </h2>
                  <div className="md:grid md:grid-cols-2 gap-4">
                    <div className='py-2'>
                      <p className='text-lg'>Data de Nascimento:</p>
                      <p>{candidate.dtNascimento}</p>
                    </div>
                    <div className='py-2'>
                      <p className='text-lg'>Estado Civil:</p>
                      <p>{candidate.estadoCivil}</p>
                    </div>
                    <div className='py-2'>
                      <p className='text-lg'>Escolaridade:</p>
                      <p>{candidate.escolaridade}</p>
                    </div>
                    <div className='py-2'>
                      <p className='text-lg'>Partido:</p>
                      <p>{candidate.siglaPartido}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 text-base">
                    {textoDescritivo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="bens" className="mt-10 max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto border-b border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800">Bens do Candidato</h3>
        {bens && bens.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {bens.map((bem, index) => (
              <li key={index} className="flex justify-between border-b pb-2">
                <span>{bem.bem}</span>
                <span>R$ {bem.valor}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-700">Nenhum bem registrado para este candidato.</p>
        )}
      </div>
    </>
  );
}

export const revalidate = 60;
