import { useAcessibilidade } from '../context/AcessibilidadeContext';
import {
  Volume2,
  Target,
  Users,
  Code2,
  Lightbulb,
  CheckCircle2,
  Kanban,
} from 'lucide-react';

const EQUIPE = [
  { nome: 'Maria Letícia da Silva', funcao: 'Líder de Projeto' },
  { nome: 'Guilherme Santana da Silva', funcao: 'Documentador' },
  { nome: 'Joallyson Guilherme da Silva Marques', funcao: 'Programador' },
  { nome: 'Felipe Vinicius de Lima Noronha', funcao: 'Programador' },
  { nome: 'Pedro Gabriel Silva Siqueira', funcao: 'Programador' },
  { nome: 'Arthur Vinícius Miranda César de Melo', funcao: 'Design UI/UX' },
];

const TECNOLOGIAS = [
  { nome: 'React + Vite', detalhe: 'Interface rápida, modular e reativa.' },
  { nome: 'Tailwind CSS', detalhe: 'Estilização responsiva e temas de alto contraste.' },
  { nome: 'Node.js + Express', detalhe: 'API REST para gerenciamento de avisos e locais.' },
  { nome: 'Web Speech API', detalhe: 'Leitura de textos em voz alta nativa no navegador.' },
  { nome: 'HTML Semântico & ARIA', detalhe: 'Compatibilidade com leitores de tela e teclado.' },
];

export default function Sobre() {
  const { lerTexto } = useAcessibilidade();

  const resumoProjeto =
    'Sobre o Escola para Todos. Projeto desenvolvido dentro da proposta Inclusão que Transforma, Da Ideia ao Protótipo, na área de Desenvolvimento de Sistemas. Nosso objetivo é eliminar barreiras de comunicação e navegação no ambiente escolar para pessoas com deficiência visual, baixa visão, daltonismo e deficiência auditiva.';

  return (
    <section aria-labelledby="titulo-sobre" className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Cabeçalho com Botão de Voz */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">
            Inclusão que Transforma – Da Ideia ao Protótipo
          </span>
          <h1 id="titulo-sobre" className="text-3xl font-extrabold text-blue-950">
            Sobre o Escola para Todos
          </h1>
          <p className="text-slate-700 text-lg max-w-2xl">
            «Informação acessível, escola para todos.» Uma plataforma digital criada para promover autonomia e inclusão no ambiente escolar.
          </p>
        </div>

        <button
          onClick={() => lerTexto(resumoProjeto)}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-3 rounded-xl shadow shrink-0"
        >
          <Volume2 size={20} /> Ouvir Sobre o Projeto
        </button>
      </div>

      {/* Problema Identificado e Objetivo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-3">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Lightbulb className="text-amber-600" /> O Problema Identificado
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Muitas informações essenciais do cotidiano escolar — como localização de salas, rotas acessíveis e avisos de última hora — ficam restritas a murais físicos ou dependem exclusivamente de recursos visuais e cores. Isso cria barreiras para estudantes e visitantes com deficiência visual, baixa visão, daltonismo ou deficiência auditiva.
          </p>
        </article>

        <article className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-3">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Target className="text-blue-700" /> Nosso Objetivo
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Reunir em um único sistema web o mapa interativo da escola, busca de espaços, mural de avisos e ferramentas de personalização de interface (aumento de fonte, alto contraste, modo daltonismo e leitura por áudio), incentivando uma cultura escolar verdadeiramente inclusiva.
          </p>
        </article>
      </div>

      {/* Tecnologias Utilizadas */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <Code2 className="text-blue-700" /> Tecnologias e Metodologia
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECNOLOGIAS.map((tech, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
            >
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600" /> {tech.nome}
              </h3>
              <p className="text-sm text-slate-600">{tech.detalhe}</p>
            </div>
          ))}

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
            <h3 className="font-bold text-blue-950 flex items-center gap-1.5">
              <Kanban size={16} className="text-blue-700" /> Gestão Ágil (Kanban)
            </h3>
            <p className="text-sm text-blue-900">
              Fluxo organizado via Trello: A fazer ➔ Em andamento ➔ Em revisão ➔ Concluído.
            </p>
          </div>
        </div>
      </div>

      {/* Equipe Desenvolvedora */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Users className="text-blue-700" /> Equipe do Projeto
          </h2>
          <p className="text-sm text-slate-600">
            Área: <strong>Desenvolvimento de Sistemas</strong> • Tema: <strong>Inclusão e Acessibilidade Digital</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EQUIPE.map((membro, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50 space-y-1"
            >
              <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                {membro.funcao}
              </span>
              <h3 className="font-bold text-slate-900 text-base pt-1">
                {membro.nome}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
