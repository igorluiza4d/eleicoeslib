"use client"; // Marca como Client Component

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Municipio {
  nome: string;
}

interface UfMunicipiosPageProps {
  uf: string;
  municipios: Municipio[];
}

const UfMunicipiosPage = ({ uf, municipios }: UfMunicipiosPageProps) => {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de pesquisa
  const [filteredMunicipios, setFilteredMunicipios] = useState<Municipio[]>(municipios); // Estado para armazenar os municípios filtrados
  const [currentPage, setCurrentPage] = useState(1); // Estado para armazenar a página atual
  const municipiosPerPage = 12; // Quantidade de municípios por página

  // Atualiza a lista de municípios filtrados sempre que o termo de busca mudar
  useEffect(() => {
    const resultados = municipios.filter((municipio) =>
      municipio.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMunicipios(resultados);
    setCurrentPage(1); // Reseta para a primeira página ao filtrar
  }, [searchTerm, municipios]);

  // Calcula o índice do primeiro e último município da página atual
  const indexOfLastMunicipio = currentPage * municipiosPerPage;
  const indexOfFirstMunicipio = indexOfLastMunicipio - municipiosPerPage;
  const currentMunicipios = filteredMunicipios.slice(indexOfFirstMunicipio, indexOfLastMunicipio);

  // Calcula o número total de páginas
  const totalPages = Math.ceil(filteredMunicipios.length / municipiosPerPage);

  // Função para mudar para a próxima página
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Função para mudar para a página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (municipios.length === 0) {
    return <div>Nenhum município encontrado para {uf?.toUpperCase()}.</div>;
  }

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Campo de busca para filtro */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
          Buscar Município
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite o nome do município"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Lista de municípios com paginação */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {currentMunicipios.map((municipio) => (
          <div
            key={municipio.nome}
            className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl"
          >
            <div className="h-32 flex flex-col justify-center items-center bg-blue-800 rounded-t-xl">
              <h3 className="text-white text-3xl font-bold capitalize">{municipio.nome}</h3>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-xl font-semibold text-gray-800">{`Município de ${municipio.nome.toUpperCase()}`}</h3>
              <p className="mt-3 text-gray-500">
                Veja os candidatos aos cargos de Prefeito e Vereador em {municipio.nome.toUpperCase()}, {uf.toUpperCase()}.
              </p>
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200">
              <Link
                href={`/candidatos/${uf}/${municipio.nome}/prefeito`}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              >
                Prefeito
              </Link>
              <Link
                href={`/candidatos/${uf}/${municipio.nome}/vereador`}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              >
                Vereador
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 text-gray-600 rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Página Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-blue-700 rounded-md text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Próxima Página
          </button>
        </div>
      )}
    </div>
  );
};

export default UfMunicipiosPage;
