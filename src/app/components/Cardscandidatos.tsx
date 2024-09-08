"use client";  // Isso indica que o componente é um Client Component

import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

interface Cardscandidatos {
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

interface Cargo {
  [slug: string]: Cardscandidatos;
}

interface CandidatosData {
  cargo: {
    [key: string]: Cargo;
  };
}

interface CandidatosProps {
  uf: string;
  municipio: string;
  slugMunicipio: string;
  cargo: string;
}

const Cardscandidatos: React.FC<CandidatosProps> = ({ uf, municipio, slugMunicipio, cargo }) => {
  const [candidatos, setCandidatos] = useState<Cardscandidatos[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidatos = async () => {
      try {
        // Constrói o caminho do arquivo com base nos parâmetros fornecidos
        const response = await fetch(`/data/${uf}/${slugMunicipio}/arquivo-candidato-${uf}-${slugMunicipio}.json`);
        const data: CandidatosData = await response.json();

        if (data.cargo[cargo]) {
          const candidatosList = Object.values(data.cargo[cargo]);
          setCandidatos(candidatosList);
        } else {
          setError('Nenhum candidato encontrado para o cargo especificado.');
        }
      } catch (err) {
        setError('Erro ao carregar os dados dos candidatos.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidatos();
  }, [uf, municipio, slugMunicipio, cargo]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto border border-gray-200 rounded-2xl mt-9 bg-gray-100/50">
      <h2 className="text-3xl uppercase font-semibold mb-8 border-b-4 border-blue-900">Candidatos para o cargo de {cargo}: {municipio}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {candidatos.map((candidato) => (
          <div key={candidato.idcandidato} className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="h-52 flex flex-col justify-center items-center bg-gray-200 rounded-t-xl">
            <Image
                    src={candidato.fotocandidato.replace('https://eleicoes.oliberal.com/candidatos','/imgscandidatos')}
                    alt={candidato.nomeUrna}
                    width={150} 
                    height={150} 
                    layout="intrinsic" 
                    className="w-28 h-auto rounded-md" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/imgscandidatos/perfil-padrao.jpg'; // Substitui por uma imagem padrão
                }}
            />
            </div>
            <div className="p-4 md:p-6">
              <span className="block mb-1 text-xs font-semibold uppercase text-blue-600">
                {candidato.siglaPartido} - {candidato.idcandidato} 
              </span>
              <h3 className="text-xl font-semibold text-gray-800">
                {candidato.nomeUrna}
              </h3>
              <p className="mt-3 text-gray-500">{candidato.ocupacao}</p>
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200">
              <Link href={candidato.proposta !== '#' ? candidato.proposta : '#'}>
                <span className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                  Ver Proposta
                </span>
              </Link>
              <Link href="#">
                <span className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                  Detalhes
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cardscandidatos;
