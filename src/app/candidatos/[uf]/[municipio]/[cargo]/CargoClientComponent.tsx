"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Candidate {
  nomeUrna: string;
  numCand: string;
  siglaPartido: string;
  cargo: string;
  fotocandidato: string;
  slug: string;
}

interface Props {
  params: {
    uf: string;
    municipio: string;
    cargo: string;
  };
  candidatosDoCargo: Candidate[];
}

export default function CargoClientComponent({ params, candidatosDoCargo }: Props) {
  const [searchCandidato, setSearchCandidato] = useState('');
  const [filteredCandidatos, setFilteredCandidatos] = useState<Candidate[]>(candidatosDoCargo);
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 12;

  useEffect(() => {
    const resultados = candidatosDoCargo.filter((candidate) =>
      candidate.nomeUrna.toLowerCase().includes(searchCandidato.toLowerCase())
    );
    setFilteredCandidatos(resultados);
    setCurrentPage(1);
  }, [searchCandidato, candidatosDoCargo]);

  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidatos.slice(indexOfFirstCandidate, indexOfLastCandidate);

  const totalPages = Math.ceil(filteredCandidatos.length / candidatesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <h1 className="text-3xl font-bold mb-6 uppercase text-black">Buscar rápida - {params.cargo}</h1>
      <div className="mb-6">
        <label htmlFor="candidato" className="block text-sm font-medium text-gray-700">
          Nome do Candidato
        </label>
        <input
          id="candidato"
          type="text"
          value={searchCandidato}
          onChange={(e) => setSearchCandidato(e.target.value)}
          placeholder="Digite o nome do candidato"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentCandidates.length > 0 ? (
          currentCandidates.map((candidate, index) => (
            <div key={index} className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl">
              <div className="h-52 flex flex-col justify-center items-center bg-gray-200 rounded-t-xl">
                <Image
                  src={candidate.fotocandidato} // A imagem já foi verificada no servidor
                  alt={`Foto de ${candidate.nomeUrna}`}
                  width={120}
                  height={120}
                  quality={90}
                  className="rounded-md"
                />
              </div>
              <div className="p-4 md:p-6">
                <span className="block mb-1 text-lg font-semibold uppercase text-blue-600">
                  Núm. do candidato: {candidate.numCand}
                </span>
                <h3 className="text-xl font-semibold text-gray-800">
                  {candidate.nomeUrna}
                </h3>
                <p className="mt-3 text-gray-500">
                  Candidato(a) a {candidate.cargo} pelo partido {candidate.siglaPartido}.
                </p>
              </div>
              <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200">
                <Link
                  href={`/candidatos/${params.uf}/${params.municipio}/${params.cargo}/${candidate.slug}`}
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhum candidato encontrado.</p>
        )}
      </div>

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
            className={`px-4 py-2 bg-blue-700 rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Próxima Página
          </button>
        </div>
      )}
    </div>
  );
}
