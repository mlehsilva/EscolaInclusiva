const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Usuários pré-cadastrados para demonstração
const USUARIOS = [
  { id: 1, nome: 'Ana Clara (Aluna)', email: 'aluno@escola.com', senha: '123', role: 'aluno' },
  { id: 2, nome: 'Prof. Carlos Mendes', email: 'prof@escola.com', senha: '123', role: 'professor' },
  { id: 3, nome: 'Secretaria (Admin)', email: 'admin@escola.com', senha: '123', role: 'admin' },
];

// Lista inicial de avisos
let avisos = [
  {
    id: 1,
    titulo: 'Reunião de Pais e Mestres com Intérprete de Libras',
    categoria: 'Evento',
    data: '20/11/2026',
    horario: '19:00',
    local: 'Auditório Principal (Térreo)',
    descricao: 'Encontro bimestral para acompanhamento pedagógico. Contaremos com tradução simultânea em Libras e espaço reservado para cadeirantes.',
    acessibilidadeEvento: 'Intérprete de Libras e acesso por rampa',
  },
  {
    id: 2,
    titulo: 'Manutenção na Rampa do Bloco B',
    categoria: 'Alerta de Rota',
    data: '22/11/2026',
    horario: '08:00 às 12:00',
    local: 'Bloco B - Ala Norte',
    descricao: 'Durante a manhã, o acesso ao primeiro andar será feito exclusivamente pelo elevador central.',
    acessibilidadeEvento: 'Rota alternativa via elevador sinalizada com piso tátil',
  },
];

// Notas iniciais do Boletim da aluna Ana Clara
let boletim = [
  { id: 1, disciplina: 'Matemática', n1: 8.5, n2: 7.5, n3: 9.0 },
  { id: 2, disciplina: 'Língua Portuguesa', n1: 9.0, n2: 8.5, n3: 9.5 },
  { id: 3, disciplina: 'Desenvolvimento Web', n1: 10.0, n2: 9.5, n3: 10.0 },
  { id: 4, disciplina: 'História', n1: 6.5, n2: 6.0, n3: 6.5 },
];

// 1. Rota de Login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;
  const user = USUARIOS.find((u) => u.email === email && u.senha === senha);

  if (!user) {
    return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
  }

  const { senha: _, ...dadosSeguros } = user;
  res.json(dadosSeguros);
});

// 2. Rotas de Avisos
app.get('/api/avisos', (req, res) => {
  res.json(avisos);
});

app.post('/api/avisos', (req, res) => {
  const novoAviso = {
    id: Date.now(),
    ...req.body,
  };
  avisos.unshift(novoAviso);
  res.status(201).json(novoAviso);
});

app.delete('/api/avisos/:id', (req, res) => {
  const id = Number(req.params.id);
  avisos = avisos.filter((a) => a.id !== id);
  res.json({ mensagem: 'Aviso removido com sucesso' });
});

// 3. Rotas do Boletim
app.get('/api/boletim', (req, res) => {
  res.json(boletim);
});

app.post('/api/boletim', (req, res) => {
  const { disciplina, n1, n2, n3 } = req.body;
  const existente = boletim.find(
    (b) => b.disciplina.toLowerCase() === disciplina.toLowerCase()
  );

  if (existente) {
    existente.n1 = Number(n1);
    existente.n2 = Number(n2);
    existente.n3 = Number(n3);
    return res.json(existente);
  }

  const novaMateria = {
    id: Date.now(),
    disciplina,
    n1: Number(n1),
    n2: Number(n2),
    n3: Number(n3),
  };
  boletim.push(novaMateria);
  res.status(201).json(novaMateria);
});

app.listen(3001, () => {
  console.log('Servidor Node.js rodando em http://localhost:3001');
});
