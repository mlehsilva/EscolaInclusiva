import { useState } from 'react';
import { useAcessibilidade } from '../context/AcessibilidadeContext';
import {
  Volume2,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Navigation,
  Accessibility,
} from 'lucide-react';

const SETORES_MAPA = [
  {
    id: 'recepcao',
    nome: 'Recepção e Entrada Principal',
    bloco: 'Entrada - Térreo',
    coordenadas: 'Logo após o portão principal',
    descricao:
      'Ponto inicial de atendimento ao visitante e estudante, com balcão rebaixado para cadeirantes e mapa tátil na parede direita.',
    rotaAcessivel:
      'Acesso direto pela calçada principal com rampa suave (inclinação 8%) e piso tátil direcional até o balcão.',
    acessivel: true,
    recursos: ['Rampa de acesso', 'Piso tátil', 'Balcão adaptado', 'Mapa tátil'],
    areaGrid: 'col-span-2 md:col-span-1',
  },
  {
    id: 'secretaria',
    nome: 'Secretaria Escolar',
    bloco: 'Bloco Administrativo - Térreo',
    coordenadas: 'À esquerda da Recepção',
    descricao:
      'Setor responsável por matrículas, documentos, declarações e atendimento administrativo geral.',
    rotaAcessivel:
      'Seguir pelo corredor esquerdo a partir da recepção por 10 metros. Porta larga de 90 cm sem degraus.',
    acessivel: true,
    recursos: ['Porta larga', 'Atendimento prioritário', 'Piso nivelado'],
    areaGrid: 'col-span-2 md:col-span-1',
  },
  {
    id: 'biblioteca',
    nome: 'Biblioteca Inclusiva',
    bloco: 'Bloco A - Térreo',
    coordenadas: 'Corredor Central, 2ª porta à direita',
    descricao:
      'Espaço de leitura e pesquisa com acervo em Braille, audiolivros, computadores com leitores de tela e mesas adaptadas.',
    rotaAcessivel:
      'Seguir o piso tátil central a partir da recepção até a segunda entrada à direita. Ambiente totalmente plano.',
    acessivel: true,
    recursos: ['Acervo em Braille', 'Leitores de tela', 'Mesas para cadeirantes', 'Sinalização sonora'],
    areaGrid: 'col-span-2 md:col-span-1',
  },
  {
    id: 'banheiros',
    nome: 'Banheiros Acessíveis',
    bloco: 'Bloco A - Térreo e 1º Andar',
    coordenadas: 'Final do corredor do Bloco A',
    descricao:
      'Sanitários adaptados masculino e feminino equipados com barras de apoio, pia suspensa e alarme de emergência.',
    rotaAcessivel:
      'Localizados no final do corredor principal do Bloco A, ao lado do bebedouro acessível.',
    acessivel: true,
    recursos: ['Barras de apoio', 'Espaço de giro 360°', 'Alarme sonoro e visual', 'Sinalização em Braille'],
    areaGrid: 'col-span-2 md:col-span-1',
  },
  {
    id: 'salas',
    nome: 'Salas de Aula (01 a 10)',
    bloco: 'Bloco B - Térreo e 1º Andar',
    coordenadas: 'Ala Norte da escola',
    descricao:
      'Salas de aula regulares com iluminação reforçada, carteiras reservadas na primeira fila e acústica tratada.',
    rotaAcessivel:
      'Térreo com acesso plano. O acesso ao 1º andar é feito pelo elevador central localizado na entrada do Bloco B.',
    acessivel: true,
    recursos: ['Elevador de acesso', 'Carteiras adaptadas', 'Iluminação LED anti-reflexo'],
    areaGrid: 'col-span-2 md:col-span-2',
  },
  {
    id: 'laboratorios',
    nome: 'Laboratórios de Informática e Ciências',
    bloco: 'Bloco B - 1º Andar',
    coordenadas: 'Ala Norte, ao lado da escada e elevador',
    descricao:
      'Laboratórios equipados com teclados ampliados, mouses adaptados, softwares de ampliação e bancadas ajustáveis.',
    rotaAcessivel:
      'Subir pelo elevador do Bloco B até o 1º andar e virar à esquerda. Piso tátil de alerta antes das portas.',
    acessivel: true,
    recursos: ['Teclados ampliados', 'Software NVDA', 'Bancadas ajustáveis'],
    areaGrid: 'col-span-2 md:col-span-1',
  },
  {
    id: 'quadra',
    nome: 'Quadra Poliesportiva',
    bloco: 'Área Externa - Fundos',
    coordenadas: 'Após o pátio coberto',
    descricao:
      'Espaço destinado às aulas de Educação Física, jogos interclasses e eventos culturais da escola.',
    rotaAcessivel:
      'Acesso pelo pátio central. A entrada da quadra possui rampa, mas a arquibancada ainda passa por obras de adaptação.',
    acessivel: false,
    recursos: ['Rampa na entrada da quadra', 'Arquibancada em adaptação'],
    areaGrid: 'col-span-2 md:col-span-1',
  },
];

export default function Mapa() {
  const [setorSelecionado, setSetorSelecionado] = useState(SETORES_MAPA[0]);
  const { lerTexto } = useAcessibilidade();

  const lerDetalhesSetor = (setor) => {
    const texto = `${setor.nome}. Localizado em: ${setor.bloco}. ${setor.descricao}. Como chegar: ${setor.rotaAcessivel}`;
    lerTexto(texto);
  };

  return (
    <section aria-labelledby="titulo-mapa" className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 id="titulo-mapa" className="text-3xl font-extrabold text-slate-900">
          Mapa Interativo da Escola
        </h1>
        <p className="text-slate-600 mt-1 text-lg">
          Selecione um espaço na planta abaixo (com o mouse ou teclado) para ver rotas acessíveis e ouvir as instruções.
        </p>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"> </div>

        <div
          role="region"
          aria-label="Planta baixa interativa dos blocos da escola"
          className="lg:col-span-7 bg-white border-2 border-slate-300 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
            <span className="font-bold text-slate-700 flex items-center gap-2">
              <MapPin size={20} className="text-blue-700" /> Planta Esquemática
            </span>
            <span className="text-xs font-semibold bg-blue-100 text-blue-900 px-2.5 py-1 rounded-full">
              Clique em um setor
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-slate-100 p-4 rounded-xl border-2 border-dashed border-slate-300">
            {SETORES_MAPA.map((setor) => {
              const ativo = setorSelecionado.id === setor.id;
              return (
                <button
                  key={setor.id}
                  onClick={() => setSetorSelecionado(setor)}
                  aria-pressed={ativo}
                  className={`${setor.areaGrid} text-left p-4 rounded-xl border-2 transition-all flex flex-col justify-between min-h-[110px] ${
                    ativo
                      ? 'bg-blue-700 text-white border-blue-950 shadow-md scale-[1.01]'
                      : 'bg-white text-slate-900 border-slate-300 hover:border-blue-600'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-base leading-snug">
                      {setor.nome}
                    </span>
                    {setor.acessivel ? (
                      <CheckCircle
                        size={18}
                        aria-label="Totalmente acessível"
                        className={ativo ? 'text-emerald-300 shrink-0' : 'text-emerald-600 shrink-0'}
                      />
                    ) : (
                      <AlertTriangle
                        size={18}
                        aria-label="Acessibilidade parcial"
                        className={ativo ? 'text-amber-300 shrink-0' : 'text-amber-600 shrink-0'}
                      />
                    )}
                  </div>

                  <span
                    className={`text-xs mt-2 font-medium ${
                      ativo ? 'text-blue-100' : 'text-slate-500'
                    }`}
                  >
                    {setor.bloco}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-700">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle size={16} className="text-emerald-600" /> Totalmente Acessível
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <AlertTriangle size={16} className="text-amber-600" /> Acessibilidade Parcial
            </span>
          </div>
        </div>

        <aside
            aria-live="polite"
            aria-label="Detalhes do espaço selecionado"
            className="lg:col-span-5 bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-md space-y-5"
        >
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">
              {setorSelecionado.bloco}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {setorSelecionado.nome}
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              📍 {setorSelecionado.coordenadas}
            </p>
          </div>

          <button
            onClick={() => lerDetalhesSetor(setorSelecionado)}
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl shadow"
          >
            <Volume2 size={20} /> Ouvir Informações e Rota
          </button>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900">Sobre o espaço</h3>
            <p className="text-slate-700 leading-relaxed">
              {setorSelecionado.descricao}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-1.5">
            <h3 className="font-bold text-blue-950 flex items-center gap-1.5">
              <Navigation size={18} /> Como chegar (Rota Acessível)
            </h3>
            <p className="text-sm text-blue-900 leading-relaxed">
              {setorSelecionado.rotaAcessivel}
            </p>
          </div>

                    <div className="space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Accessibility size={18} /> Recursos Disponíveis
            </h3>
            <ul className="flex flex-wrap gap-2">
              {setorSelecionado.recursos.map((recurso, index) => (
                <li
                  key={index}
                  className="bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg"
                >
                  {recurso}
                </li>
              ))}
            </ul>
          </div>
          </aside>
        </section>
  )}
