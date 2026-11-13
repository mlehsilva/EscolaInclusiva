import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AcessibilidadeProvider } from './context/AcessibilidadeContext';
import { AuthProvider } from './context/AuthContext';
import AcessibilidadeBar from './components/AcessibilidadeBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Mapa from './pages/Mapa';
import Locais from './pages/Locais';
import Avisos from './pages/Avisos';
import Acessibilidade from './pages/Acessibilidade';
import Sobre from './pages/Sobre';
import Login from './pages/Login';
import Boletim from './pages/Boletim';

export default function App() {
  return (
    <AuthProvider>
      <AcessibilidadeProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <AcessibilidadeBar />
            <Navbar />

            <main id="conteudo-principal" className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mapa" element={<Mapa />} />
                <Route path="/locais" element={<Locais />} />
                <Route path="/avisos" element={<Avisos />} />
                <Route path="/boletim" element={<Boletim />} />
                <Route path="/acessibilidade" element={<Acessibilidade />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </AcessibilidadeProvider>
    </AuthProvider>
  );
}
