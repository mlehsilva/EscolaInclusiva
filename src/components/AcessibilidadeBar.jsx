import { useState, useEffect } from 'react';
import { useAcessibilidade } from '../context/AcessibilidadeContext';
import {
  Accessibility,
  X,
  VolumeX,
  Contrast,
  Eye,
  RotateCcw,
  Plus,
  Minus,
} from 'lucide-react';

export default function AcessibilidadeBar() {
  const [aberto, setAberto] = useState(false);

  const {
    fontSize,
    aumentarFonte,
    diminuirFonte,
    highContrast,
    setHighContrast,
    colorblindMode,
    setColorblindMode,
    pararLeitura,
    resetar,
  } = useAcessibilidade();

  // Permite fechar o menu flutuante apertando a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && aberto) {
        setAberto(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [aberto]);

  return (
    <>
      {/* Atalho invisível no topo: aparece apenas ao navegar com a tecla TAB */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg shadow-lg"
      >
        Ir direto para o conteúdo principal
      </a>

      {/* Container Flutuante no Canto Inferior Direito */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Painel Expansível */}
        {aberto && (
          <div
            id="painel-acessibilidade"
            role="dialog"
            aria-label="Opções de acessibilidade"
            className="mb-3 w-72 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl shadow-2xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="font-bold text-base flex items-center gap-2 text-blue-900">
                <Accessibility size={20} /> Acessibilidade
              </h2>
              <button
                onClick={() => setAberto(false)}
                aria-label="Fechar menu de acessibilidade"
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Controle de Tamanho da Fonte */}
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Tamanho do Texto ({fontSize}%)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={diminuirFonte}
                  aria-label="Diminuir tamanho da fonte"
                  className="flex items-center justify-center gap-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold border border-slate-300"
                >
                  <Minus size={16} /> A-
                </button>
                <button
                  onClick={aumentarFonte}
                  aria-label="Aumentar tamanho da fonte"
                  className="flex items-center justify-center gap-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold border border-slate-300"
                >
                  <Plus size={16} /> A+
                </button>
              </div>
            </div>

            {/* Modos Visuais */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => setHighContrast(!highContrast)}
                aria-pressed={highContrast}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border font-medium transition-colors ${
                  highContrast
                    ? 'bg-yellow-400 text-black border-black font-bold'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Contrast size={18} /> Alto Contraste
                </span>
                <span className="text-xs">{highContrast ? 'Ativo' : 'Off'}</span>
              </button>

              <button
                onClick={() => setColorblindMode(!colorblindMode)}
                aria-pressed={colorblindMode}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border font-medium transition-colors ${
                  colorblindMode
                    ? 'bg-blue-700 text-white border-blue-900 font-bold'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Eye size={18} /> Modo Daltonismo
                </span>
                <span className="text-xs">{colorblindMode ? 'Ativo' : 'Off'}</span>
              </button>
            </div>

            {/* Ações de Áudio e Reset */}
            <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2">
              <button
                onClick={pararLeitura}
                aria-label="Parar leitura de áudio"
                className="flex items-center justify-center gap-1.5 py-2 px-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold"
              >
                <VolumeX size={16} /> Parar Voz
              </button>

              <button
                onClick={resetar}
                aria-label="Restaurar configurações padrão"
                className="flex items-center justify-center gap-1.5 py-2 px-2 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg text-sm font-semibold"
              >
                <RotateCcw size={16} /> Resetar
              </button>
            </div>
          </div>
        )}

        {/* Botão Flutuante (FAB) */}
        <button
          onClick={() => setAberto(!aberto)}
          aria-expanded={aberto}
          aria-controls="painel-acessibilidade"
          aria-label={aberto ? 'Fechar menu de acessibilidade' : 'Abrir menu de acessibilidade'}
          title="Menu de Acessibilidade"
          className="w-14 h-14 rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 border-2 border-white"
        >
          {aberto ? <X size={28} /> : <Accessibility size={30} />}
        </button>
      </div>
    </>
  );
}
