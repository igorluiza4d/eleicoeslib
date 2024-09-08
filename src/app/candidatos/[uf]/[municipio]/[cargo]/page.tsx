import fs from 'fs';
import path from 'path';
import CargoClientComponent from './CargoClientComponent';
import HeroCapaBox from '@/app/components/HeroCapaBox';

interface Candidate {
  nomeUrna: string;
  numCand: string;
  siglaPartido: string;
  cargo: string;
  fotocandidato: string;
  slug: string;
  cidade: string; // Adicionando o campo cidade
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
    return []; // Retorna array vazio se o arquivo não existir
  }

  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Adicionar o slug de cada candidato
  const candidatosComSlug = Object.entries(jsonData.cargo).reduce((acc: any[], [cargo, candidatos]: [string, any]) => {
    const candidatosDoCargo = Object.entries(candidatos).map(([slug, candidato]) => ({
      ...candidato,
      slug, // Adiciona o slug ao objeto candidato
      cargo, // Adiciona o cargo também
    }));
    return [...acc, ...candidatosDoCargo];
  }, []);

  return candidatosComSlug;
}

// Página de cargo que carrega os candidatos
export default async function CargoPage({ params }: Props) {
  const candidatos = await loadCandidates(params.uf, params.municipio);

  // Filtra os candidatos por cargo
  const candidatosDoCargo = candidatos.filter((candidato: Candidate) => candidato.cargo === params.cargo);

  // Recupera o nome da cidade do primeiro candidato, já que todos pertencem à mesma cidade
  const nomeCidade = candidatosDoCargo.length > 0 ? candidatosDoCargo[0].cidade : params.municipio;

  // Criação do breadcrumb dinâmico com o nome da cidade
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
        breadcrumb={breadcrumb} // Passa o breadcrumb para o HeroCapaBox
      />

      {/* Componente de listagem de candidatos */}
      <CargoClientComponent params={params} candidatosDoCargo={candidatosDoCargo} />
    </>
  );
}
