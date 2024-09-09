"use client"; // Marca como Client Component

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Municipio {
  nome: string;
}

interface UfMunicipiosPageProps {
  uf: string;
}

const UfMunicipiosPage = ({ uf }: UfMunicipiosPageProps) => {
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const response = await fetch(`/api/municipios?uf=${uf}`);
        const data = await response.json();

        if (response.ok) {
          setMunicipios(data);
        } else {
          console.error('Erro ao carregar os municípios:', data.error);
        }
      } catch (error) {
        console.error('Erro ao buscar os municípios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMunicipios();
  }, [uf]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (municipios.length === 0) {
    return <div>Nenhum município encontrado para {uf.toUpperCase()}.</div>;
  }

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Lista de municípios */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {municipios.map((municipio) => (
          <div
            key={municipio.nome}
            className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl"
          >
            <div className="h-32 flex flex-col justify-center items-center bg-blue-800 rounded-t-xl">
              <span className="text-white text-3xl font-bold capitalize">
                {municipio.nome}
              </span>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {`Município de ${municipio.nome.toUpperCase()}`}
              </h3>
              <p className="mt-3 text-gray-500">
                Veja os candidatos aos cargos de Prefeito e Vereador em {municipio.nome.toUpperCase()}, {uf.toUpperCase()}.
              </p>
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200">
              <Link
                href={`/candidatos/${uf}/${municipio.nome}/prefeito`}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                Prefeito
              </Link>
              <Link
                href={`/candidatos/${uf}/${municipio.nome}/vereador`}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                Vereador
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UfMunicipiosPage;
