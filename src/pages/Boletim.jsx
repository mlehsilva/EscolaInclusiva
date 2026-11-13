import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAcessibilidade } from '../context/AcessibilidadeContext';
import {
  Volume2,
  GraduationCap,
  PlusCircle,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

const BOLETIM_BACKUP = [
  { id: 1, disciplina: 'Matemática', n1: 8.5, n2: 7.5, n3: 9.0 },
  { id: 2, disciplina: 'Língua Portuguesa', n1: 9.0, n2: 8.5, n3: 9.5 },
  { id: 3, disciplina: 'Desenvolvimento Web', n1: 10.0, n2: 9.5, n3: 10.0 },
  { id: 4, disciplina: 'História', n1: 6.5, n2: 6.0, n3: 6.5 },
];

export default function Boletim() {
  const { user } = useAuth();
  const { lerTexto } = useAcessibilidade();

  const [materias, setMaterias] = useState([]);
  const [disciplina, setDisciplina] = useState('');
  const [n1, setN1] = useState('');
  const [n2, setN2] = useState('');
  const [n3, setN3] = useState('');

  const podeEditar = user && (user.role === 'professor' || user.role === 'admin');

  useEffect(() => {
    fetch('http://localhost:3001/api/boletim')
      .then((res) => res.json())
      .then((dados) => setMaterias(dados))
      .catch(() => setMaterias(BOLETIM_BACKUP));
  }, []);

  const calcularMedia = (nota1, nota2, nota3) => {
    const soma = Number(nota1) + Number(nota2) + Number(nota3);
    return (soma / 3).toFixed(1);
  };

  const handleLancarNotas = async (e) => {
    e.preventDefault();
    const novaEntrada = {
      disciplina,
      n1: Number(n1),
      n2: Number(n2),
      n3: Number(n3),
    };

    try {
      const res = await fetch('http://localhost:3001/api/boletim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaEntrada),
      });
      const salvo = await res.json();

      setMaterias((prev) => {
        const existe = prev.some(
          (m) => m.disciplina.toLowerCase() === salvo.disciplina.toLowerCase()
        );
        if (existe) {
          return prev.map((m) =>
            m.disciplina.toLowerCase() === salvo.disciplina.toLowerCase() ? salvo : m
          );
        }
        return [...prev, salvo];
      });
    } catch {
      // Atualiza localmente mesmo se o Node.js estiver offline
      setMaterias((prev) => {
        const existe = prev.some(
          (m) => m.disciplina.toLowerCase() === disciplina.toLowerCase()
        );
        if (existe) {
          return prev.map((m) =>
            m.disciplina.toLowerCase() === disciplina.toLowerCase()
              ? { ...m, ...novaEntrada }
              : m
          );
        }
        return [...prev, { id: Date.now(), ...novaEntrada }];
      });
    }

    const mediaCalc = calcularMedia(n1, n2, n3);
    lerTexto(`Notas de ${disciplina} salvas. Média final: ${mediaCalc}.`);
    setDisciplina('');
    setN1('');
    setN2('');
    setN3('');
  };

  const lerMateria = (m) => {
    const media = calcularMedia(m.n1, m.n2, m.n3);
    const situacao = Number(media) >= 7 ? 'Aprovado' : 'Em Recuperação';
    lerTexto(
      `Disciplina: ${m.disciplina}. Primeira nota: ${m.n1}. Segunda nota: ${m.n2}. Terceira nota: ${m.n3}. Média final: ${media}. Situação: ${situacao}.`
    );
  };

  return (
    <section aria-labelledby="titulo-boletim" className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 id="titulo-boletim" className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <GraduationCap size={32} className="text-blue-700" /> Boletim Escolar Acessível
          </h1>
          <p className="text-slate-600 mt-1">
            {user
              ? `Logado como: ${user.nome} (${user.role.toUpperCase()})`
              : 'Visualizando boletim demonstrativo da aluna Ana Clara.'}
          </p>
        </div>
      </div>

      {/* Formulário Exclusivo para Professor e Admin */}
      {podeEditar && (
        <form
          onSubmit={handleLancarNotas}
          className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-xl font-extrabold text-blue-950 flex items-center gap-2">
            <PlusCircle size={22} /> Lançar ou Atualizar Notas (Professor / Admin)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="lg:col-span-2">
              <label htmlFor="disciplina" className="block text-xs font-bold uppercase text-slate-800 mb-1">
                Disciplina
              </label>
              <input
                id="disciplina"
                type="text"
                required
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
                placeholder="Ex: Matemática"
                className="w-full p-2.5 border-2 border-slate-300 rounded-xl bg-white text-black"
              />
            </div>

            <div>
              <label htmlFor="n1" className="block text-xs font-bold uppercase text-slate-800 mb-1">
                Nota 1 (0 a 10)
              </label>
              <input
                id="n1"
                type="number"
                step="0.1"
                min="0"
                max="10"
                required
                value={n1}
                onChange={(e) => setN1(e.target.value)}
                className="w-full p-2.5 border-2 border-slate-300 rounded-xl bg-white text-black"
              />
            </div>

            <div>
              <label htmlFor="n2" className="block text-xs font-bold uppercase text-slate-800 mb-1">
                Nota 2 (0 a 10)
              </label>
              <input
                id="n2"
                type="number"
                step="0.1"
                min="0"
                max="10"
                required
                value={n2}
                onChange={(e) => setN2(e.target.value)}
                className="w-full p-2.5 border-2 border-slate-300 rounded-xl bg-white text-black"
              />
            </div>

            <div>
              <label htmlFor="n3" className="block text-xs font-bold uppercase text-slate-800 mb-1">
                Nota 3 (0 a 10)
              </label>
              <input
                id="n3"
                type="number"
                step="0.1"
                min="0"
                max="10"
                required
                value={n3}
                onChange={(e) => setN3(e.target.value)}
                className="w-full p-2.5 border-2 border-slate-300 rounded-xl bg-white text-black"
              />
            </div>
          </div>

          {/* Pré-visualização automática da média antes de salvar */}
          {n1 !== '' && n2 !== '' && n3 !== '' && (
            <p className="text-sm font-bold text-blue-900">
              Média calculada automaticamente: <span className="text-lg">{calcularMedia(n1, n2, n3)}</span>
            </p>
          )}

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-2.5 rounded-xl shadow"
          >
            Salvar Notas no Boletim
          </button>
        </form>
      )}

      {/* Tabela Acessível de Notas */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse">
          <caption className="sr-only">
            Tabela de notas bimestrais, média final e situação por disciplina
          </caption>
          <thead>
            <tr className="bg-slate-100 border-b-2 border-slate-200 text-slate-800 text-sm uppercase">
              <th scope="col" className="p-4 font-extrabold">Disciplina</th>
              <th scope="col" className="p-4 font-extrabold">Nota 1</th>
              <th scope="col" className="p-4 font-extrabold">Nota 2</th>
              <th scope="col" className="p-4 font-extrabold">Nota 3</th>
              <th scope="col" className="p-4 font-extrabold">Média</th>
              <th scope="col" className="p-4 font-extrabold">Situação</th>
              <th scope="col" className="p-4 font-extrabold">Áudio</th>
            </tr>
          </thead>
                    <tbody className="divide-y divide-slate-200">
            {materias.map((m) => {
              const media = calcularMedia(m.n1, m.n2, m.n3);
              const aprovado = Number(media) >= 7.0;

              return (
                <tr key={m.id} className="hover:bg-slate-50">
                  <th scope="row" className="p-4 font-bold text-slate-900">
                    {m.disciplina}
                  </th>
                  <td className="p-4">{Number(m.n1).toFixed(1)}</td>
                  <td className="p-4">{Number(m.n2).toFixed(1)}</td>
                  <td className="p-4">{Number(m.n3).toFixed(1)}</td>
                  <td className="p-4 font-extrabold text-lg text-blue-800">{media}</td>
                  <td className="p-4">
                    {aprovado ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-extrabold">
                        <CheckCircle size={14} /> Aprovado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-950 px-3 py-1 rounded-full text-xs font-extrabold">
                        <AlertTriangle size={14} /> Recuperação
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => lerMateria(m)}
                      aria-label={`Ouvir notas de ${m.disciplina}`}
                      className="inline-flex items-center gap-1 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-3 py-2 rounded-lg"
                    >
                      <Volume2 size={16} /> Ouvir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
