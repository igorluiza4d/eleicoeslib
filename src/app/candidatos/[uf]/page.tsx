// /src/app/candidatos/[uf]/page.tsx
import { Metadata } from 'next';
import HeroCapaBox from '@/app/components/HeroCapaBox';
import UfMunicipiosPage from './UfMunicipiosPage'; // Importa o componente

interface Props {
  params: {
    uf: string;
  };
}

// Função para obter dados dos municípios do servidor com ISR
async function getMunicipios(uf: string) {
  // Verifica se existe a variável de ambiente NEXT_PUBLIC_API_URL, senão usa localhost
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const response = await fetch(`${baseUrl}/api/municipios?uf=${uf}`, {
    next: { revalidate: 60 }, // Define o tempo de revalidação ISR
  });
  
  if (!response.ok) {
    throw new Error('Erro ao carregar municípios');
  }
  
  const municipios = await response.json();
  return municipios;
}

// Página com ISR que renderiza os municípios
export default async function Page({ params }: Props) {
  const { uf } = params;

  const municipios = await getMunicipios(uf); // Carrega os municípios no lado do servidor

  return (
    <>
      {/* HeroCapaBox */}
      <HeroCapaBox
        title={`Municípios de ${uf.toUpperCase()}`}
        highlight={uf.toUpperCase()}
        description={`Veja todos os municípios do estado de ${uf.toUpperCase()}. Selecione um município para ver os candidatos a Prefeito e Vereador.`}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'Candidatos', href: '/candidatos' },
        ]}
      />

    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Renderiza a lista de municípios */}
      <UfMunicipiosPage uf={uf} municipios={municipios} />
    </div>
    </>
  );
}

// Define o tempo de revalidação (ISR) para 60 segundos
export const revalidate = 60;

// Função opcional para gerar metadados dinâmicos
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uf } = params;
  return {
    title: `Candidatos ${uf.toUpperCase()} - Eleições 2024`,
    description: `Veja todos os candidatos de todos os municípios do estado de ${uf.toUpperCase()} nas eleições de 2024.`,
  };
}
