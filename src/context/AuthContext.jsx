import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const USUARIOS_OFFLINE = [
  { id: 1, nome: 'Ana Clara (Aluna)', email: 'aluno@escola.com', senha: '123', role: 'aluno' },
  { id: 2, nome: 'Prof. Carlos Mendes', email: 'prof@escola.com', senha: '123', role: 'professor' },
  { id: 3, nome: 'Secretaria (Admin)', email: 'admin@escola.com', senha: '123', role: 'admin' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const salvo = localStorage.getItem('escola_user');
    return salvo ? JSON.parse(salvo) : null;
  });

  const login = async (email, senha) => {
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (!res.ok) {
        const erroData = await res.json();
        throw new Error(erroData.erro || 'Credenciais inválidas');
      }

      const dadosUsuario = await res.json();
      setUser(dadosUsuario);
      localStorage.setItem('escola_user', JSON.stringify(dadosUsuario));
      return { sucesso: true };
    } catch (err) {
      // Fallback caso o servidor Node.js não esteja ligado no momento
      if (err.message === 'Failed to fetch') {
        const localUser = USUARIOS_OFFLINE.find(
          (u) => u.email === email && u.senha === senha
        );
        if (localUser) {
          const { senha: _, ...dadosSeguros } = localUser;
          setUser(dadosSeguros);
          localStorage.setItem('escola_user', JSON.stringify(dadosSeguros));
          return { sucesso: true };
        }
        return { sucesso: false, erro: 'E-mail ou senha incorretos.' };
      }
      return { sucesso: false, erro: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('escola_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
