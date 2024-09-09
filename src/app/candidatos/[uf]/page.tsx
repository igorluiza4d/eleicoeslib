import dynamic from 'next/dynamic';
import HeroCapaBox from '@/app/components/HeroCapaBox'; // Certifique-se de que o caminho está correto

interface Props {
  params: {
    uf: string;
  };
}

// Carrega o Client Component dinamicamente
const UfMunicipiosPage = dynamic(() => import('./UfMunicipiosPage'), {
  ssr: false, // Desabilita a renderização no servidor, apenas no cliente
});

export default function Page({ params }: Props) {
  const { uf } = params;

  // Breadcrumb dinâmico
  const breadcrumb = [
    { label: 'Início', href: '/' },
    { label: 'Candidatos', href: '/candidatos' },
    { label: uf.toUpperCase(), href: `/candidatos/${uf}` },
  ];

  return (
    <div>
      {/* HeroCapaBox incluído no Server Component */}
      <HeroCapaBox
        title={`Municípios de ${uf.toUpperCase()}`}
        highlight={uf.toUpperCase()}
        description={`Veja todos os municípios do estado de ${uf.toUpperCase()}. Selecione um município para ver os candidatos a Prefeito e Vereador.`}
        breadcrumb={breadcrumb}
      />

      {/* Componente dinâmico para renderizar a lista de municípios */}
      <UfMunicipiosPage uf={uf} />
    </div>
  );
}

// Função para gerar parâmetros estáticos com ISR
export async function generateStaticParams() {
  const ufs = ['pa', 'sp', 'rj']; // Lista de UFs suportadas
  return ufs.map((uf) => ({ params: { uf } }));
}

// Revalida a página a cada 60 segundos (ISR)
export const revalidate = 60;
