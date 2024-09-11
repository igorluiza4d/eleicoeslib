"use client"; // Marca o componente como Client Component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroCapaBox from '@/app/components/HeroCapaBox';

// Função slugify para gerar valores apropriados para URLs
const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Normalize com remoção de acentos
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/\s+/g, '-') // Substitui espaços por hifens
    .replace(/[^a-z0-9\-]/g, '') // Remove caracteres especiais
    .replace(/\-\-+/g, '-') // Substitui múltiplos hifens por um único
    .replace(/^-+/, '') // Remove hifens no início
    .replace(/-+$/, ''); // Remove hifens no fim

interface Candidato {
  nomeUrna: string;
}

interface Municipio {
  nome: string;
}

const CandidatosPage = () => {
  const [uf, setUf] = useState('');
  const [municipios, setMunicipios] = useState<Municipio[]>([]); // Lista de municípios como objetos
  const [municipio, setMunicipio] = useState('');
  const [cargo, setCargo] = useState('');
  const [candidato, setCandidato] = useState('');
  const [candidatos, setCandidatos] = useState<Candidato[]>([]); // Lista de candidatos para autocomplete
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const router = useRouter();

  // Função para buscar os municípios ao selecionar a UF
  useEffect(() => {
    if (uf) {
      fetch(`/api/municipios?uf=${uf}`)
        .then((res) => res.json())
        .then((data) => {
          const sortedMunicipios = data.sort((a: Municipio, b: Municipio) =>
            a.nome.localeCompare(b.nome)
          );
          setMunicipios(sortedMunicipios);
        })
        .catch((error) => console.error('Erro ao buscar municípios:', error));
    }
  }, [uf]);

  // Função para buscar os candidatos ao selecionar o município e cargo
  useEffect(() => {
    if (uf && municipio && cargo) {
      const municipioSlug = slugify(municipio); // Transformando o nome do município em slug

      // Usar a variável de ambiente NEXT_PUBLIC_API_URL para construir a URL completa
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      const fileURL = `${baseURL}/data/${uf}/${municipioSlug}/arquivo-candidato-${uf}-${municipioSlug}.json`;

      fetch(fileURL)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Erro ao buscar arquivo de candidatos: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          const candidatosDoCargo = (Object.values(data.cargo[cargo]) as Candidato[]).map(
            (candidato) => ({
              nomeUrna: candidato.nomeUrna
            })
          );
          setCandidatos(candidatosDoCargo); // Atualiza a lista de candidatos para o autocomplete
        })
        .catch((error) => console.error('Erro ao buscar candidatos:', error));
    }
  }, [uf, municipio, cargo]);

  // Função para lidar com o submit do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se o campo UF foi preenchido
    if (!uf) {
      alert('O campo UF é obrigatório!');
      return;
    }

    // Ativa o estado de carregamento
    setLoading(true);

    // Inicializa a URL base
    let url = `/candidatos/${uf}`;

    // Se o município for preenchido, adiciona o slug do município na URL
    if (municipio) {
      url += `/${slugify(municipio)}`;
    }

    // Se o cargo for preenchido, adiciona o slug do cargo na URL
    if (cargo) {
      url += `/${slugify(cargo)}`;
    }

    // Se o candidato for preenchido, adiciona o slug do candidato na URL
    if (candidato) {
      url += `/${slugify(candidato)}`;
    }

    // Redireciona para a URL construída após 1 segundo para exibir "Carregando"
    setTimeout(() => {
      router.push(url);
    }, 1000); // Simula um atraso para que o "carregando" seja visível
  };

  return (
    <>
      {/* HeroCapaBox */}
      <HeroCapaBox
        title="Candidatos Eleições 2024"
        highlight="Pesquisa de Candidatos"
        description="Encontre todos os candidatos por UF, município, cargo e nome."
        breadcrumb={[{ label: 'Início', href: '/' }, { label: 'Candidatos', href: '/candidatos' }]}
      />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
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
              <select
                id="municipio"
                value={municipio}
                onChange={(e) => setMunicipio(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Selecione o Município</option>
                {municipios.map((municipioObj) => (
                  <option key={municipioObj.nome} value={municipioObj.nome}>
                    {municipioObj.nome}
                  </option>
                ))}
              </select>
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

            {/* Campo Candidato com autocomplete */}
            <div>
              <label htmlFor="candidato" className="block text-sm font-medium text-gray-700">
                Nome do Candidato
              </label>
              <input
                id="candidato"
                type="text"
                list="listaCandidatos"
                value={candidato}
                onChange={(e) => setCandidato(e.target.value)}
                placeholder="Digite o nome do candidato"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <datalist id="listaCandidatos">
                {candidatos.map((candidato) => (
                  <option key={candidato.nomeUrna} value={candidato.nomeUrna} />
                ))}
              </datalist>
            </div>

            {/* Botão de Enviar */}
            <div>
              <button
                type="submit"
                disabled={loading} // Desabilitar o botão enquanto carrega
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {loading ? 'Carregando...' : 'Pesquisar'}
              </button>
            </div>
          </form>

          {/* Mensagem de carregamento (opcional) */}
          {loading && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">Carregando...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CandidatosPage;
