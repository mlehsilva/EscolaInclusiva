import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAcessibilidade } from '../context/AcessibilidadeContext';
import { LogIn, Eye, EyeOff, AlertCircle, Volume2, UserCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');

  const { login } = useAuth();
  const { lerTexto } = useAcessibilidade();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    const resultado = await login(email, senha);

    if (resultado.sucesso) {
      lerTexto('Login realizado com sucesso. Redirecionando para o boletim.');
      navigate('/boletim');
    } else {
      setErro(resultado.erro);
      lerTexto(`Erro ao entrar: ${resultado.erro}`);
    }
  };

  const preencherDemo = (emailDemo) => {
    setEmail(emailDemo);
    setSenha('123');
    setErro('');
  };

  return (
    <section aria-labelledby="titulo-login" className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <h1 id="titulo-login" className="text-3xl font-extrabold text-slate-900">
            Acesso ao Portal
          </h1>
          <p className="text-slate-600 text-sm">
            Entre como Aluno, Professor ou Secretaria (Admin).
          </p>
        </div>

        {/* Botões de Acesso Rápido para Apresentação */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 space-y-2">
          <span className="text-xs font-extrabold uppercase text-blue-900 flex items-center gap-1">
            <UserCheck size={14} /> Contas de Teste Rápido (Senha: 123)
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => preencherDemo('aluno@escola.com')}
              className="py-1.5 px-2 bg-white hover:bg-blue-100 border border-blue-300 rounded-lg text-xs font-bold text-blue-950"
            >
              Aluno
            </button>
            <button
              type="button"
              onClick={() => preencherDemo('prof@escola.com')}
              className="py-1.5 px-2 bg-white hover:bg-blue-100 border border-blue-300 rounded-lg text-xs font-bold text-blue-950"
            >
              Professor
            </button>
            <button
              type="button"
              onClick={() => preencherDemo('admin@escola.com')}
              className="py-1.5 px-2 bg-white hover:bg-blue-100 border border-blue-300 rounded-lg text-xs font-bold text-blue-950"
            >
              Admin
            </button>
          </div>
        </div>

        {erro && (
          <div
            role="alert"
            className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-900 px-4 py-3 rounded-xl text-sm font-bold"
          >
            <AlertCircle size={18} className="shrink-0" />
            <span>{erro}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-bold text-sm text-slate-800 mb-1">
              E-mail Institucional
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex: aluno@escola.com"
              className="w-full p-3 border-2 border-slate-300 rounded-xl text-black"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block font-bold text-sm text-slate-800 mb-1">
              Senha
            </label>
            <div className="relative">
              <input
                id="senha"
                type={mostrarSenha ? 'text' : 'password'}
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full p-3 pr-12 border-2 border-slate-300 rounded-xl text-black"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                className="absolute right-3 top-3 text-slate-600 hover:text-black"
              >
                {mostrarSenha ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow"
          >
            <LogIn size={20} /> Entrar no Sistema
          </button>
        </form>

        <button
          type="button"
          onClick={() =>
            lerTexto('Tela de login. Escolha um perfil de teste acima ou digite seu e-mail e senha para acessar o boletim e o painel escolar.')
          }
          className="w-full flex items-center justify-center gap-1.5 text-sm font-bold text-blue-700 hover:underline"
        >
          <Volume2 size={16} /> Ouvir instruções de acesso
        </button>
      </div>
    </section>
  );
}
