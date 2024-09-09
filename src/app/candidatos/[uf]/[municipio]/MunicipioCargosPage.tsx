"use client"; // Marca como Client Component

import { useParams } from 'next/navigation';
import Link from 'next/link';

const MunicipioCargosPage = () => {
  const params = useParams(); // Usa useParams para pegar os parâmetros da URL
  const { uf, municipio } = params;

  // Verifica se os parâmetros estão carregados
  if (!uf || !municipio) {
    return <div>Carregando...</div>;
  }

  // Garante que uf e municipio sejam strings antes de usar toUpperCase
  const ufString = typeof uf === 'string' ? uf : '';
  const municipioString = typeof municipio === 'string' ? municipio : '';

  // Lista fixa de cargos (vereador e prefeito)
  const cargos = ['prefeito', 'vereador'];

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
        {cargos.map((cargo) => (
          <div
            key={cargo}
            className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl"
          >
            <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
              <span className="text-white text-3xl font-bold capitalize">
                {cargo}
              </span>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {`${cargo.charAt(0).toUpperCase() + cargo.slice(1)} em ${municipioString} - ${ufString.toUpperCase()}`}
              </h3>
              <p className="mt-3 text-gray-500">
                Veja os candidatos ao cargo de {cargo} no município de {municipioString}, {ufString.toUpperCase()}.
              </p>
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200">
              <Link
                href={`/candidatos/${ufString}/${municipioString}/${cargo}`}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                Ver candidatos
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MunicipioCargosPage;
