import { useState } from 'react';
import { useAcessibilidade } from '../context/AcessibilidadeContext';
import { Volume2, Search, CheckCircle, AlertTriangle } from 'lucide-react';

const ESPACOS_ESCOLA = [
  {
    id: 1,
    nome: 'Biblioteca Inclusiva',
    bloco: 'Bloco A - Térreo',
    descricao: 'Acervo em Braille, audiolivros, computadores com leitores de tela e mesas adaptadas para cadeirantes.',
    acessivel: true,
    recursos: ['Rampa de acesso', 'Piso tátil', 'Sinalização em Braille'],
  },
  {
    id: 2,
    nome: 'Laboratório de Informática',
    bloco: 'Bloco B - 1º Andar',
    descricao: 'Equipado com teclados ampliados, mouses adaptados e softwares de ampliação de tela.',
    acessivel: true,
    recursos: ['Elevador próximo', 'Mobiliário ajustável'],
  },
  {
    id: 3,
    nome: 'Quadra Poliesportiva',
    bloco: 'Área Externa',
    descricao: 'Espaço para atividades físicas e eventos escolares com arquibancada.',
    acessivel: false,
    recursos: ['Acesso em nivelamento (em adaptação)'],
  },
];

export default function Locais() {
  const [busca, setBusca] = useState('');
  const { lerTexto } = useAcessibilidade();

  const locaisFiltrados = ESPACOS_ESCOLA.filter(
    (local) =>
      local.nome.toLowerCase().includes(busca.toLowerCase()) ||
      local.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <section aria-labelledby="titulo-locais" className="max-w-4xl mx-auto p-6">
      <h1 id="titulo-locais" className="text-3xl font-bold mb-2">
        Busca de Locais da Escola
      </h1>
      <p className="text-slate-600 mb-6">
        Pesquise um ambiente para ver sua localização, recursos de acessibilidade e ouvir a descrição.
      </p>

      {/* Campo de Busca Acessível */}
      <div className="relative mb-8">
        <label htmlFor="campo-busca" className="block font-semibold mb-2">
          Qual espaço você procura?
        </label>
        <div className="flex items-center border-2 border-slate-300 rounded-lg overflow-hidden bg-white">
          <span className="pl-3 text-slate-500">
            <Search size={20} />
          </span>
          <input
            id="campo-busca"
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Ex: Biblioteca, Laboratório, Quadra..."
            className="w-full p-3 text-black focus:outline-none"
          />
        </div>
      </div>

      {/* Lista de Resultados */}
      <div className="space-y-4" aria-live="polite">
        {locaisFiltrados.map((local) => (
          <article
            key={local.id}
            className="p-5 border-2 border-slate-200 rounded-xl shadow-sm bg-white text-slate-900"
          >
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <span className="text-sm font-bold uppercase tracking-wider text-blue-700">
                  {local.bloco}
                </span>
                <h2 className="text-2xl font-bold mt-1">{local.nome}</h2>
              </div>

              <button
                onClick={() =>
                  lerTexto(`${local.nome}. Localizado no ${local.bloco}. ${local.descricao}`)
                }
                aria-label={`Ouvir descrição de ${local.nome}`}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg"
              >
                <Volume2 size={20} /> Ouvir Descrição
              </button>
            </div>

            <p className="mt-3 text-lg">{local.descricao}</p>

            {/* Indicador visual que não depende só de cor (usa ícone + texto) */}
            <div className="mt-4 flex items-center gap-2 font-semibold">
              {local.acessivel ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full text-sm">
                  <CheckCircle size={16} /> Totalmente Acessível
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-amber-900 bg-amber-100 px-3 py-1 rounded-full text-sm">
                  <AlertTriangle size={16} /> Acessibilidade Parcial
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
