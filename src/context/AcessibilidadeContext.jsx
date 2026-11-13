import { createContext, useState, useEffect, useContext } from 'react';

const AcessibilidadeContext = createContext();

export function AcessibilidadeProvider({ children }) {
  const [fontSize, setFontSize] = useState(100); // Porcentagem (100% = padrão)
  const [highContrast, setHighContrast] = useState(false);
  const [colorblindMode, setColorblindMode] = useState(false);

  // Aplica o tamanho da fonte no elemento raiz (html)
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Aplica classes de contraste no body
  useEffect(() => {
    document.body.classList.toggle('high-contrast', highContrast);
    document.body.classList.toggle('colorblind-safe', colorblindMode);
  }, [highContrast, colorblindMode]);

  const aumentarFonte = () => setFontSize((prev) => Math.min(prev + 15, 160));
  const diminuirFonte = () => setFontSize((prev) => Math.max(prev - 15, 85));
  const resetar = () => {
    setFontSize(100);
    setHighContrast(false);
    setColorblindMode(false);
    window.speechSynthesis.cancel();
  };

  // Função Text-to-Speech (Leitor de Texto)
  const lerTexto = (texto) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Para leitura anterior
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Seu navegador não suporta leitura de áudio.');
    }
  };

  const pararLeitura = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <AcessibilidadeContext.Provider
      value={{
        fontSize,
        highContrast,
        setHighContrast,
        colorblindMode,
        setColorblindMode,
        aumentarFonte,
        diminuirFonte,
        resetar,
        lerTexto,
        pararLeitura,
      }}
    >
      {children}
    </AcessibilidadeContext.Provider>
  );
}

export const useAcessibilidade = () => useContext(AcessibilidadeContext);
