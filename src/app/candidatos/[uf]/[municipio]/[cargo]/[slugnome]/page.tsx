// /app/candidatos/[uf]/[municipio]/[cargo]/[slug-nome-candidato]/page.tsx
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

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
    return null; // Caso o arquivo não exista, retorne null
  }

  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Verifica se há bens para o id do candidato
  if (!jsonData[idcandidato]) {
    return null; // Se não houver bens para o candidato, retorne null
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

  // Verifica se a imagem existe
  const imagePath = path.join(process.cwd(), 'public', candidate.fotocandidato);
  console.log('IGOR DANIEL:'+imagePath)
  const imageExists = fs.existsSync(imagePath);

  // Se a imagem não existir, usa uma imagem padrão
  const imageSrc = imageExists ? candidate.fotocandidato : '/perfil-padrao.jpg';

  return { candidate, imageSrc };
}

// Função para gerar o texto descritivo genérico do candidato
function gerarTextoDescritivo(candidate: Candidate, uf: string, municipio: string): string {
  // Nome e partido do candidato
  let descricao = `${candidate.nomeUrna} é candidato(a) a ${candidate.cargo} de ${municipio}, ${uf.toUpperCase()}, nas eleições de 2024 pelo partido ${candidate.nomePartido} (${candidate.siglaPartido}).`;

  // Ocupação do candidato (genérico)
  if (candidate.ocupacao) {
    descricao += ` ${candidate.nomeUrna} atua como ${candidate.ocupacao} e é reconhecido(a) por seu comprometimento na área.`;
  }

  // Coligação ou candidatura isolada
  if (candidate.colicacao && candidate.descColicacao) {
    descricao += ` Sua candidatura conta com o apoio da coligação ${candidate.colicacao}, formada pelo partido ${candidate.descColicacao}.`;
  } else {
    descricao += ` Sua campanha é apoiada exclusivamente pelo partido ${candidate.siglaPartido}.`;
  }

  return descricao;
}

export default async function CandidatePage({ params }: Props) {
  const data = await getCandidateData(params);

  if (!data) {
    return <div>Candidato não encontrado</div>;
  }

  const { candidate, imageSrc } = data;
  const textoDescritivo = gerarTextoDescritivo(candidate, params.uf, params.municipio);

  // Carregar os bens do candidato com base no id
  const bens = await getCandidateBens(candidate.idcandidato, params);

  return (
    <>
      <div className='flex bg-gray-100'>
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto border-b border-gray-100">
          <div className="md:flex md:items-center md:gap-12 xl:gap-32">
            <div className=' grid grid-cols-1 items-center justify-center md:w-1/4'>
              <div className='flex w-full items-center justify-center'>
                <Image
                  src={imageSrc}
                  alt={`Foto do candidato ${candidate.nomeUrna}`}
                  width={322}
                  height={450}
                  quality={90}
                  layout="responsive"
                  className="rounded-xl" 
                  priority={true}
                />
              </div>
              <div className='grid grid-cols-1 w-full'>
                <div className="flex w-full items-center justify-center my-2">
                  Redes sociais do candidato
                </div>
              </div> 
            </div>        
            <div className="md:flex-auto md:w-3/4 mt-5 sm:mt-10 lg:mt-0">
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-2 md:space-y-4">
                  <h2 className="font-bold text-3xl lg:text-4xl text-gray-800">
                    <div className='md:grid md:grid-cols-2'>
                      <div className='py-2'>
                        <p className='text-xl'>NOME DO CANDIDATO:</p>
                        <p>{candidate.nomeUrna}</p>
                      </div>
                      <div className='py-2'>
                        <p className='text-xl'>NÚM:</p>
                        <p>{candidate.numPartido}</p>
                      </div>
                    </div>
                  </h2>

                  {/* Adicionando a descrição dinâmica */}
                  <p className="text-gray-700 text-base">
                    {textoDescritivo}
                  </p>
                </div>

                <div className="space-y-3">
                  <dl className="flex flex-col sm:flex-row gap-1">
                    <dt className="min-w-40">
                      <span className="block text-xl text-gray-900">Cargo disputado:</span>
                    </dt>
                    <dd>
                      <ul>
                        <li className="me-1 inline-flex items-center text-xl text-gray-900">
                          {candidate.cargo}
                        </li>
                      </ul>
                    </dd>
                  </dl>

                  <dl className="flex flex-col sm:flex-row gap-1">
                    <dt className="min-w-40">
                      <span className="block text-xl text-gray-900">Nascimento:</span>
                    </dt>
                    <dd>
                      <ul>
                        <li className="me-1 inline-flex items-center text-xl text-gray-900">
                          {candidate.dtNascimento}
                        </li>
                      </ul>
                    </dd>
                  </dl>

                  <dl className="flex flex-col sm:flex-row gap-1">
                    <dt className="min-w-40">
                      <span className="block text-xl text-gray-900">Partido:</span>
                    </dt>
                    <dd>
                      <ul>
                        <li className="me-1 inline-flex items-center text-xl text-gray-900">
                          {candidate.siglaPartido}
                        </li>
                      </ul>
                    </dd>
                  </dl>

                  <dl className="flex flex-col sm:flex-row gap-1">
                    <dt className="min-w-40">
                      <span className="block text-xl text-gray-900">CNPJ da Campanha:</span>
                    </dt>
                    <dd>
                      <ul>
                        <li className="me-1 inline-flex items-center text-xl text-gray-900">
                          55.678.880/0001-44
                        </li>
                      </ul>
                    </dd>
                  </dl>

                  <dl className="flex flex-col sm:flex-row gap-1">
                    <dt className="min-w-40">
                      <span className="block text-sm text-gray-500">Candidatura:</span>
                    </dt>
                    <dd>
                      <ul>
                        <li className="me-1 after:content-[','] inline-flex items-center text-sm text-gray-800">
                          {candidate.idcandidato} - {candidate.fotocandidato}
                        </li>
                      </ul>
                    </dd>
                  </dl>

                  <dl className="flex flex-col sm:flex-row gap-1">
                    <dt className="min-w-40">
                      <span className="block text-sm text-gray-500">Vice:</span>
                    </dt>
                    <dd>
                      <ul>
                        <li className="me-1 after:content-[','] inline-flex items-center text-sm text-gray-800">
                          Daniel Rodrigues
                        </li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-7 grid gap-3 w-full sm:inline-flex">
                <a className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href={candidate.proposta}>
                  Plano de Governo
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de bens do candidato */}
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

// Função para revalidação ISR (Incremental Static Regeneration)
export const revalidate = 60; // ISR: revalida a cada 60 segundos
