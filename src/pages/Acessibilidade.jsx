import { useAcessibilidade } from '../context/AcessibilidadeContext';
import {
  Volume2,
  Contrast,
  Eye,
  Keyboard,
  Type,
  Ear,
  CheckCircle,
  RotateCcw,
} from 'lucide-react';

export default function Acessibilidade() {
  const {
    fontSize,
    aumentarFonte,
    diminuirFonte,
    highContrast,
    setHighContrast,
    colorblindMode,
    setColorblindMode,
    lerTexto,
    resetar,
  } = useAcessibilidade();

  const textoGuia =
    'Guia de Acessibilidade do Escola para Todos. Nesta página você aprende a usar o leitor de voz, alterar o tamanho da fonte, ativar o alto contraste, usar o modo para daltonismo e navegar apenas pelo teclado.';

  return (
    <section aria-labelledby="titulo-guia" className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Cabeçalho da Página */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 id="titulo-guia" className="text-3xl font-extrabold text-blue-950">
            Central e Guia de Acessibilidade
          </h1>
          <p className="text-slate-700 text-lg max-w-2xl">
            Conheça todos os recursos de inclusão digital disponíveis nesta plataforma e experimente cada ferramenta abaixo.
          </p>
        </div>

        <button
          onClick={() => lerTexto(textoGuia)}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-3 rounded-xl shadow shrink-0"
        >
          <Volume2 size={20} /> Ouvir Este Guia
        </button>
      </div>

      {/* Painel de Teste Rápido Interativo */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <h2 className="text-xl font-extrabold text-slate-900">
            Experimente os Recursos Agora
          </h2>
          <button
            onClick={resetar}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-blue-700 bg-slate-100 px-3 py-1.5 rounded-lg"
          >
            <RotateCcw size={16} /> Restaurar Padrão
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Ajuste de Fonte */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Type size={20} className="text-blue-700" /> Tamanho da Fonte
            </div>
            <p className="text-xs text-slate-600">Atual: {fontSize}%</p>
            <div className="flex gap-2">
              <button
                onClick={diminuirFonte}
                aria-label="Diminuir fonte"
                className="flex-1 py-2 bg-white border border-slate-300 rounded-lg font-bold hover:bg-slate-100"
              >
                A-
              </button>
              <button
                onClick={aumentarFonte}
                aria-label="Aumentar fonte"
                className="flex-1 py-2 bg-white border border-slate-300 rounded-lg font-bold hover:bg-slate-100"
              >
                A+
              </button>
            </div>
          </div>

          {/* Alto Contraste */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Contrast size={20} className="text-blue-700" /> Alto Contraste
              </div>
              <p className="text-xs text-slate-600">Fundo preto com letras amarelas.</p>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              aria-pressed={highContrast}
              className={`w-full py-2 px-3 rounded-lg font-bold text-sm border ${
                highContrast
                  ? 'bg-yellow-400 text-black border-black'
                  : 'bg-blue-700 text-white border-blue-800 hover:bg-blue-800'
              }`}
            >
              {highContrast ? 'Desativar' : 'Ativar Agora'}
            </button>
          </div>

          {/* Modo Daltonismo */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Eye size={20} className="text-blue-700" /> Modo Daltonismo
              </div>
              <p className="text-xs text-slate-600">Reforça saturação e distinção visual.</p>
            </div>
            <button
              onClick={() => setColorblindMode(!colorblindMode)}
              aria-pressed={colorblindMode}
              className={`w-full py-2 px-3 rounded-lg font-bold text-sm border ${
                colorblindMode
                  ? 'bg-emerald-700 text-white border-emerald-900'
                  : 'bg-blue-700 text-white border-blue-800 hover:bg-blue-800'
              }`}
            >
              {colorblindMode ? 'Desativar' : 'Ativar Agora'}
            </button>
          </div>

          {/* Teste de Voz */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Volume2 size={20} className="text-blue-700" /> Leitor de Voz
              </div>
              <p className="text-xs text-slate-600">Síntese de fala nativa em Português.</p>
            </div>
            <button
              onClick={() =>
                lerTexto('Teste de áudio concluído com sucesso! O leitor de voz está funcionando.')
              }
              className="w-full py-2 px-3 rounded-lg font-bold text-sm bg-blue-700 hover:bg-blue-800 text-white"
            >
              Testar Áudio
            </button>
          </div>
        </div>
      </div>

      {/* Cards Explicativos por Público */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-3">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Volume2 className="text-blue-700" /> Deficiência Visual e Baixa Visão
          </h2>
          <ul className="space-y-2 text-slate-700 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Leitor de Texto (TTS):</strong> Botões dedicados em todas as páginas leem descrições, rotas e avisos em voz alta.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Compatibilidade com Leitores de Tela:</strong> Estrutura feita com HTML semântico e atributos ARIA para NVDA, JAWS e TalkBack.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Ampliação até 160%:</strong> Ajuste progressivo do tamanho das letras sem quebrar o layout da tela.</span>
            </li>
          </ul>
        </article>

        <article className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-3">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Eye className="text-blue-700" /> Daltonismo e Sensibilidade Visual
          </h2>
          <ul className="space-y-2 text-slate-700 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Independência de Cor:</strong> Nenhum alerta ou status usa apenas cor; todos combinam ícones e textos descritivos.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Alto Contraste:</strong> Esquema preto e amarelo de altíssima legibilidade para ambientes muito claros ou baixa visão.</span>
            </li>
          </ul>
        </article>

        <article className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-3">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Ear className="text-blue-700" /> Deficiência Auditiva
          </h2>
          <ul className="space-y-2 text-slate-700 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Informação 100% Visual e Textual:</strong> Todo conteúdo sonoro possui equivalente escrito claro e objetivo.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Sinalização de Eventos em Libras:</strong> Os avisos informam antecipadamente quais reuniões e espaços contam com intérprete.</span>
            </li>
          </ul>
        </article>

        <article className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-3">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Keyboard className="text-blue-700" /> Navegação por Teclado
          </h2>
                    <ul className="space-y-2 text-slate-700 text-sm">
            <li><kbd className="px-2 py-0.5 bg-slate-200 rounded font-mono font-bold">Tab</kbd> — Avança para o próximo link ou botão com contorno amarelo visível.</li>
            <li><kbd className="px-2 py-0.5 bg-slate-200 rounded font-mono font-bold">Shift + Tab</kbd> — Retorna ao elemento anterior.</li>
            <li><kbd className="px-2 py-0.5 bg-slate-200 rounded font-mono font-bold">Enter</kbd> ou <kbd className="px-2 py-0.5 bg-slate-200 rounded font-mono font-bold">Espaço</kbd> — Ativa o botão selecionado.</li>
            <li><kbd className="px-2 py-0.5 bg-slate-200 rounded font-mono font-bold">Esc</kbd> — Fecha o menu flutuante de acessibilidade.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
