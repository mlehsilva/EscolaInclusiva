import { useState, useEffect } from 'react';
import { useAcessibilidade } from '../context/AcessibilidadeContext';
import {
  Volume2,
  Calendar,
  Clock,
  MapPin,
  AlertTriangle,
  Bell,
  Sparkles,
  Accessibility,
} from 'lucide-react';

// Dados de backup caso o servidor Node.js esteja desligado
const AVISOS_BACKUP = [
  {
    id: 1,
    titulo: 'Reunião de Pais e Mestres com Intérprete de Libras',
    categoria: 'Evento',
    data: '20/11/2026',
    horario: '19:00',
    local: 'Auditório Principal (Térreo)',
    descricao:
      'Encontro bimestral para acompanhamento pedagógico e apresentação dos projetos de inclusão. Contaremos com tradução simultânea em Libras e espaço reservado para cadeirantes.',
    acessibilidadeEvento: 'Intérprete de Libras e acesso por rampa',
  },
  {
    id: 2,
    titulo: 'Manutenção na Rampa do Bloco B',
    categoria: 'Alerta de Rota',
    data: '22/11/2026',
    horario: '08:00 às 12:00',
    local: 'Bloco B - Ala Norte',
    descricao:
      'Durante o período da manhã, a rampa lateral passará por pintura antiderrapante. O acesso ao primeiro andar será feito exclusivamente pelo elevador central.',
    acessibilidadeEvento: 'Rota alternativa via elevador sinalizada com piso tátil',
  },
  {
    id: 3,
    titulo: 'Oficina de Leitura em Braille e Audiolivros',
    categoria: 'Atividade',
    data: '25/11/2026',
    horario: '14:00',
    local: 'Biblioteca Inclusiva (Bloco A)',
    descricao:
      'Atividade aberta a toda a comunidade escolar para conhecer o novo acervo acessível e testar os softwares leitores de tela.',
    acessibilidadeEvento: 'Material impresso em Braille e fonte ampliada',
  },
];

export default function Avisos() {
  const [avisos, setAvisos] = useState([]);
  const [filtro, setFiltro] = useState('Todos');
  const [modoOffline, setModoOffline] = useState(false);
  const { lerTexto } = useAcessibilidade();

  useEffect(() => {
    fetch('http://localhost:3001/api/avisos')
      .then((res) => {
        if (!res.ok) throw new Error('Falha na API');
        return res.json();
      })
      .then((dados) => {
        setAvisos(dados);
        setModoOffline(false);
      })
      .catch(() => {
        setAvisos(AVISOS_BACKUP);
        setModoOffline(true);
      });
  }, []);

  const avisosFiltrados =
    filtro === 'Todos'
      ? avisos
      : avisos.filter((item) => item.categoria === filtro);

  const lerAviso = (aviso) => {
    const texto = `Comunicado: ${aviso.titulo}. Categoria: ${aviso.categoria}. Data: ${aviso.data}, às ${aviso.horario}. Local: ${aviso.local}. ${aviso.descricao}. Recurso de acessibilidade: ${aviso.acessibilidadeEvento}.`;
    lerTexto(texto);
  };

  return (
    <section aria-labelledby="titulo-avisos" className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 id="titulo-avisos" className="text-3xl font-extrabold text-slate-900">
          Mural de Avisos da Escola
        </h1>
        <p className="text-slate-600 mt-1 text-lg">
          Acompanhe comunicados, eventos e alertas de acessibilidade. Clique no botão de áudio para ouvir cada aviso.
        </p>
      </div>

      {/* Indicador discreto do status da conexão com Node.js */}
      <div className="mb-6">
        {modoOffline ? (
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-full">
            <AlertTriangle size={14} /> Exibindo avisos locais (Servidor Node.js offline)
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1.5 rounded-full">
            <Bell size={14} /> Conectado à API em tempo real (Node.js)
          </span>
        )}
      </div>

      {/* Filtros por Categoria */}
      <div
        role="group"
        aria-label="Filtrar avisos por categoria"
        className="flex flex-wrap gap-2 mb-8"
      >
        {['Todos', 'Evento', 'Alerta de Rota', 'Atividade'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltro(cat)}
            aria-pressed={filtro === cat}
            className={`px-4 py-2 rounded-xl font-bold text-sm border-2 transition-colors ${
              filtro === cat
                ? 'bg-blue-700 text-white border-blue-900'
                : 'bg-white text-slate-800 border-slate-300 hover:border-blue-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista de Comunicados */}
      <div className="space-y-6" aria-live="polite">
        {avisosFiltrados.map((aviso) => (
          <article
            key={aviso.id}
            className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                {/* Etiqueta com ícone + texto (independência de cor) */}
                {aviso.categoria === 'Alerta de Rota' ? (
                  <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-950 border border-amber-300 text-xs font-extrabold uppercase px-3 py-1 rounded-full">
                    <AlertTriangle size={14} /> {aviso.categoria}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-950 border border-blue-300 text-xs font-extrabold uppercase px-3 py-1 rounded-full">
                    <Sparkles size={14} /> {aviso.categoria}
                  </span>
                )}

                <h2 className="text-2xl font-extrabold text-slate-900">
                  {aviso.titulo}
                </h2>
              </div>

              <button
                onClick={() => lerAviso(aviso)}
                aria-label={`Ouvir comunicado: ${aviso.titulo}`}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2.5 rounded-xl shadow shrink-0"
              >
                <Volume2 size={20} /> Ouvir Aviso
              </button>
            </div>

            {/* Metadados: Data, Horário e Local */}
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="flex items-center gap-1.5">
                <Calendar size={16} className="text-blue-700" /> {aviso.data}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} className="text-blue-700" /> {aviso.horario}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={16} className="text-blue-700" /> {aviso.local}
              </span>
            </div>

            <p className="text-slate-700 text-base leading-relaxed">
              {aviso.descricao}
            </p>

            {/* Destaque de Acessibilidade do Evento */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-sm font-bold text-emerald-800">
              <Accessibility size={18} />
              <span>Acessibilidade garantida: {aviso.acessibilidadeEvento}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
