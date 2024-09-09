"use client"; // Marca o componente como Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeroCapaBox from '@/app/components/HeroCapaBox';

const CandidatosPage = () => {
  const [uf, setUf] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [cargo, setCargo] = useState('');
  const [candidato, setCandidato] = useState('');
  const router = useRouter();

  // Função para lidar com o submit do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se todos os campos estão preenchidos antes de redirecionar
    if (uf && municipio && cargo && candidato) {
      // Redireciona para a página do candidato
      router.push(`/candidatos/${uf}/${municipio}/${cargo}/${candidato}`);
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };

  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      {/* HeroCapaBox */}
      <HeroCapaBox
        title="Candidatos Eleições 2024"
        highlight="Pesquisa de Candidatos"
        description="Encontre todos os candidatos por UF, município, cargo e nome."
        breadcrumb={[{ label: 'Início', href: '/' }, { label: 'Candidatos', href: '/candidatos' }]}
      />

      {/* Formulário de busca */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Pesquise seus candidatos:</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo UF */}
          <div>
            <label htmlFor="uf" className="block text-sm font-medium text-gray-700">
              Estado (UF)
            </label>
            <select
              id="uf"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Selecione o Estado</option>
              <option value="pa">Pará</option>
              <option value="sp">São Paulo</option>
              <option value="rj">Rio de Janeiro</option>
              {/* Adicione mais opções de estados conforme necessário */}
            </select>
          </div>

          {/* Campo Município */}
          <div>
            <label htmlFor="municipio" className="block text-sm font-medium text-gray-700">
              Município
            </label>
            <input
              id="municipio"
              type="text"
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
              placeholder="Digite o município"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Campo Cargo */}
          <div>
            <label htmlFor="cargo" className="block text-sm font-medium text-gray-700">
              Cargo
            </label>
            <select
              id="cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Selecione o Cargo</option>
              <option value="prefeito">Prefeito</option>
              <option value="vereador">Vereador</option>
              {/* Adicione mais cargos conforme necessário */}
            </select>
          </div>

          {/* Campo Candidato */}
          <div>
            <label htmlFor="candidato" className="block text-sm font-medium text-gray-700">
              Nome do Candidato
            </label>
            <input
              id="candidato"
              type="text"
              value={candidato}
              onChange={(e) => setCandidato(e.target.value)}
              placeholder="Digite o nome do candidato"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Botão de Enviar */}
          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Pesquisar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidatosPage;
