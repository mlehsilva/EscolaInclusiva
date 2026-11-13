import { NavLink, Link } from 'react-router-dom';
import { School, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-semibold transition-colors text-sm ${
      isActive
        ? 'bg-blue-700 text-white'
        : 'text-slate-700 hover:bg-blue-100'
    }`;

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-blue-800"
        >
          <School size={32} aria-hidden="true" />
          <span>Escola para Todos</span>
        </NavLink>

        <nav aria-label="Menu principal">
          <ul className="flex flex-wrap items-center gap-1.5">
            <li><NavLink to="/" className={linkClass}>Início</NavLink></li>
            <li><NavLink to="/mapa" className={linkClass}>Mapa</NavLink></li>
            <li><NavLink to="/locais" className={linkClass}>Locais</NavLink></li>
            <li><NavLink to="/avisos" className={linkClass}>Avisos</NavLink></li>
            <li><NavLink to="/boletim" className={linkClass}>Boletim</NavLink></li>
            <li><NavLink to="/acessibilidade" className={linkClass}>Acessibilidade</NavLink></li>
            <li><NavLink to="/sobre" className={linkClass}>Sobre</NavLink></li>

            <li className="ml-2">
              {user ? (
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold px-3 py-2 rounded-lg text-sm"
                >
                  <LogOut size={16} /> Sair ({user.role})
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-2 rounded-lg text-sm"
                >
                  <LogIn size={16} /> Entrar
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}