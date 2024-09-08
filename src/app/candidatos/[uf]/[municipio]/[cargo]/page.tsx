// /app/candidatos/[uf]/[municipio]/[cargo]/page.tsx
import fs from 'fs';
import path from 'path';
import CargoClientComponent from './CargoClientComponent';

interface Candidate {
  nomeUrna: string;
  numCand: string;
  siglaPartido: string;
  cargo: string;
  fotocandidato: string;
}

// Função para carregar candidatos e verificar se a imagem do candidato existe
async function loadCandidates(uf: string, municipio: string) {
  const filePath = path.join(process.cwd(), 'public', 'data', uf, municipio, `arquivo-candidato-${uf}-${municipio}.json`);
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const candidatos = jsonData.cargo || {};

  // Verifica a existência de cada imagem de candidato
  Object.keys(candidatos).forEach((cargo) => {
    Object.keys(candidatos[cargo]).forEach((slug) => {
      const candidate = candidatos[cargo][slug];
      const imagePath = path.join(process.cwd(), 'public', candidate.fotocandidato);

      if (!fs.existsSync(imagePath)) {
        // Se a imagem não existir, usa a imagem padrão
        candidate.fotocandidato = '/perfil-padrao.jpg';
      }
    });
  });

  return candidatos;
}

export default async function CargoPage({ params }: { params: { uf: string; municipio: string; cargo: string } }) {
  const candidatos = await loadCandidates(params.uf, params.municipio);
  const candidatosDoCargo = candidatos[params.cargo] ? Object.values(candidatos[params.cargo]) : [];

  return <CargoClientComponent params={params} candidatosDoCargo={candidatosDoCargo} />;
}

// Função para gerar metadados dinâmicos (SEO)
export async function generateMetadata({ params }: { params: { uf: string; municipio: string; cargo: string } }) {
  const title = `Candidatos a ${params.cargo} em ${params.municipio.toUpperCase()}`;
  const description = `Veja a lista completa de candidatos ao cargo de ${params.cargo} em ${params.municipio}, ${params.uf.toUpperCase()}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://seusite.com/candidatos/${params.uf}/${params.municipio}/${params.cargo}`,
      images: [
        {
          url: 'https://seusite.com/imagem-compartilhamento.png', // Altere para uma imagem específica
          width: 800,
          height: 600,
          alt: 'Imagem de compartilhamento',
        },
      ],
    },
  };
}

// Função para revalidação ISR (Incremental Static Regeneration)
export const revalidate = 60; // Revalida a cada 60 segundos
