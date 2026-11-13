import { Link } from 'react-router-dom';
import { Map, Search, Bell, Accessibility, Volume2 } from 'lucide-react';
import { useAcessibilidade } from '../context/AcessibilidadeContext';

export default function Home() {
  const { lerTexto } = useAcessibilidade();

  const textoBoasVindas =
    'Bem-vindo ao Escola para Todos. Informação acessível, escola para todos. Aqui você encontra o mapa da escola, busca de locais, mural de avisos e ferramentas de acessibilidade.';

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      {/* Banner Principal */}
      <section className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-blue-950">
          Informação acessível, escola para todos.
        </h1>
        <p className="text-lg text-slate-700 max-w-2xl mx-auto">
          Uma plataforma criada para eliminar barreiras de comunicação e facilitar a orientação de estudantes, professores e visitantes no ambiente escolar.
        </p>
        <div className="pt-2">
          <button
            onClick={() => lerTexto(textoBoasVindas)}
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl shadow"
          >
            <Volume2 size={22} /> Ouvir Apresentação da Página
          </button>
        </div>
      </section>

      {/* Cards de Acesso Rápido */}
      <section aria-labelledby="acesso-rapido">
        <h2 id="acesso-rapido" className="text-2xl font-bold mb-6">
          O que você procura hoje?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/mapa" className="p-6 bg-white border-2 border-slate-200 hover:border-blue-600 rounded-xl shadow-sm space-y-3">
            <Map size={36} className="text-blue-700" aria-hidden="true" />
            <h3 className="text-xl font-bold">Mapa da Escola</h3>
            <p className="text-slate-600 text-sm">Visualize blocos, salas, banheiros e rotas acessíveis.</p>
          </Link>

          <Link to="/locais" className="p-6 bg-white border-2 border-slate-200 hover:border-blue-600 rounded-xl shadow-sm space-y-3">
            <Search size={36} className="text-blue-700" aria-hidden="true" />
            <h3 className="text-xl font-bold">Busca de Locais</h3>
            <p className="text-slate-600 text-sm">Pesquise espaços e ouça a descrição por voz.</p>
          </Link>

          <Link to="/avisos" className="p-6 bg-white border-2 border-slate-200 hover:border-blue-600 rounded-xl shadow-sm space-y-3">
            <Bell size={36} className="text-blue-700" aria-hidden="true" />
            <h3 className="text-xl font-bold">Mural de Avisos</h3>
            <p className="text-slate-600 text-sm">Confira comunicados, eventos e alertas importantes.</p>
          </Link>

          <Link to="/acessibilidade" className="p-6 bg-white border-2 border-slate-200 hover:border-blue-600 rounded-xl shadow-sm space-y-3">
            <Accessibility size={36} className="text-blue-700" aria-hidden="true" />
            <h3 className="text-xl font-bold">Guia de Recursos</h3>
            <p className="text-slate-600 text-sm">Saiba como usar os atalhos de teclado, contraste e áudio.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
