import dynamic from 'next/dynamic';
import HeroCapaBox from '@/app/components/HeroCapaBox'; // Certifique-se de que o caminho está correto

interface Props {
  params: {
    uf: string;
    municipio: string;
  };
}

// Carrega o Client Component dinamicamente
const MunicipioCargosPage = dynamic(() => import('./MunicipioCargosPage'), {
  ssr: false, // Desabilita a renderização no servidor, apenas no cliente
});

export default function Page({ params }: Props) {
  const { uf, municipio } = params;

  // Breadcrumb dinâmico
  const breadcrumb = [
    { label: 'Início', href: '/' },
    { label: 'Candidatos', href: '/candidatos' },
    { label: uf.toUpperCase(), href: `/candidatos/${uf}` },
    { label: municipio, href: `/candidatos/${uf}/${municipio}` },
  ];

  return (
    <div>
      {/* HeroCapaBox incluído no Server Component */}
      <HeroCapaBox
        title={`Cargos das Eleições 2024 em ${municipio}`}
        highlight={municipio}
        description={`Veja os candidatos aos cargos de Prefeito e Vereador no município de ${municipio}, ${uf.toUpperCase()}.`}
        breadcrumb={breadcrumb}
      />

      {/* Componente dinâmico para renderizar a lista de cargos */}
      <MunicipioCargosPage />
    </div>
  );
}

// Função para gerar parâmetros estáticos com ISR
export async function generateStaticParams() {
  const ufs = ['pa', 'sp', 'rj']; // Lista de UFs
  const municipios = {
    pa: ['belem', 'ananindeua', 'maraba'],
    sp: ['sao-paulo', 'campinas', 'santos'],
    rj: ['rio-de-janeiro', 'niteroi', 'petropolis'],
  };

  const paths = [];

  // Gera parâmetros para cada combinação de UF e município
  ufs.forEach((uf) => {
    municipios[uf].forEach((municipio) => {
      paths.push({ params: { uf, municipio } });
    });
  });

  return paths;
}

// Revalida a página a cada 60 segundos (ISR)
export const revalidate = 60;
