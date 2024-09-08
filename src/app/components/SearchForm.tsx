// /app/components/SearchForm.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Municipio {
  nome: string;
}

export default function SearchForm() {
  const [uf, setUf] = useState('');
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [municipio, setMunicipio] = useState('');
  const [cargo, setCargo] = useState('');
  const [nome, setNome] = useState('');
  const router = useRouter();

  // Carrega os municípios após a seleção do estado
  useEffect(() => {
    if (uf) {
      fetch(`/api/municipios?uf=${uf}`)
        .then((res) => res.json())
        .then((data) => setMunicipios(data));
    }
  }, [uf]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let path = `/candidatos/${uf}`;
    if (municipio) path += `/${municipio}`;
    if (cargo) path += `/${cargo}`;
    if (nome) path += `/${nome}`;
    router.push(path);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="uf">Estado</label>
        <select id="uf" value={uf} onChange={(e) => setUf(e.target.value)} required>
          <option value="">Selecione o Estado</option>
          <option value="pa">PA</option>
          {/* Adicione mais estados */}
        </select>
      </div>

      {uf && (
        <div>
          <label htmlFor="municipio">Município</label>
          <select
            id="municipio"
            value={municipio}
            onChange={(e) => setMunicipio(e.target.value)}
            required
          >
            <option value="">Selecione o Município</option>
            {municipios.map((mun, index) => (
              <option key={index} value={mun.nome}>
                {mun.nome}
              </option>
            ))}
          </select>
        </div>
      )}

      {municipio && (
        <div>
          <label htmlFor="cargo">Cargo</label>
          <select id="cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} required>
            <option value="">Selecione o Cargo</option>
            <option value="prefeito">Prefeito</option>
            <option value="vereador">Vereador</option>
          </select>
        </div>
      )}

      {cargo && (
        <div>
          <label htmlFor="nome">Nome do Candidato</label>
          <input
            id="nome"
            type="text"
            placeholder="Nome do Candidato"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
      )}

      <button type="submit">Buscar</button>
    </form>
  );
}
