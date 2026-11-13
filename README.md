# 🏫 Escola para Todos

> **«Informação acessível, escola para todos.»**

O **Escola para Todos** é uma plataforma web full-stack desenvolvida com o objetivo de tornar as informações do ambiente escolar mais acessíveis para pessoas com deficiência visual, baixa visão, daltonismo e deficiência auditiva. A proposta é reunir, em um único sistema, o mapa interativo dos espaços da escola, busca de locais, mural de avisos, boletim escolar acessível, controle de acesso por perfil e um menu flutuante de personalização de interface.

O projeto foi desenvolvido dentro da proposta *“Inclusão que Transforma – Da Ideia ao Protótipo”*, aplicando boas práticas de desenvolvimento web moderno, acessibilidade digital (WCAG/ARIA) e metodologias ágeis.

---

## 🎯 Objetivo

Criar uma plataforma digital inclusiva que facilite o acesso às informações e serviços da escola, reduzindo barreiras de comunicação, orientação e navegação para estudantes, professores, funcionários e visitantes.

### Objetivos Específicos
* Facilitar a localização dos espaços da escola por meio de uma planta interativa acessível.
* Disponibilizar informações e rotas acessíveis em texto e áudio.
* Permitir a personalização em tempo real da interface (tamanho da fonte, alto contraste e modo daltonismo).
* Integrar leitura de texto por voz nativa (**Text-to-Speech** via Web Speech API) em todas as páginas.
* Oferecer informações visuais e textuais claras para pessoas com deficiência auditiva.
* Garantir que status e alertas nunca dependam exclusivamente de cores.
* Disponibilizar autenticação por perfil (**Aluno**, **Professor** e **Admin**) e **Boletim Escolar** com cálculo automático de média e leitura em voz alta.

---

## ♿ Público-Alvo

* **Pessoas com deficiência visual ou baixa visão** (suporte a leitores de tela, ampliação de fonte até 160%, alto contraste e leitura por áudio).
* **Pessoas com daltonismo** (modo de reforço visual e independência de cores com uso obrigatório de ícones e rótulos).
* **Pessoas com deficiência auditiva** (informações 100% textuais/visuais e sinalização de eventos com intérprete de Libras).
* **Comunidade escolar** (estudantes, professores, equipe gestora e visitantes).

---

## 🚀 Funcionalidades

### 🏠 Página Inicial (`/`)
Apresenta a proposta do projeto, leitura em áudio das boas-vindas e cartões de acesso rápido às principais seções do sistema.

### 🗺️ Mapa Interativo da Escola (`/mapa`)
Planta esquemática navegável por mouse e teclado com os espaços da escola (Recepção, Secretaria, Biblioteca Inclusiva, Banheiros Acessíveis, Salas de Aula, Laboratórios e Quadra), exibindo localização, rota acessível, recursos disponíveis e leitura por voz.

### 🔎 Busca de Locais (`/locais`)
Filtro instantâneo de ambientes escolares com indicadores visuais de acessibilidade e botão para ouvir a descrição completa do espaço.

### 📢 Mural de Avisos (`/avisos`)
Central de comunicados e alertas de rota conectada à API em Node.js (com fallback automático offline), filtros por categoria, data, horário, local, garantia de acessibilidade do evento e leitura por áudio.

### 🎓 Boletim Escolar Acessível (`/boletim`)
* **Visão do Aluno:** Consulta de notas por disciplina (Nota 1, Nota 2 e Nota 3), média final, situação (*Aprovado* ou *Recuperação* com ícones) e leitura individual de cada matéria em voz alta.
* **Visão do Professor / Admin:** Formulário interativo para lançar ou atualizar as 3 notas de qualquer disciplina com cálculo automático da média em tempo real.

### 🔐 Autenticação por Perfil (`/login`)
Sistema de login com controle de sessão e contas de demonstração para **Aluno**, **Professor** e **Admin (Secretaria)**, incluindo opção de exibir/ocultar senha e retorno falado de status.

### ♿ Menu Flutuante de Acessibilidade e Guia (`/acessibilidade`)
Botão flutuante fixo no canto inferior direito (fechável via tecla `Esc`) + atalho de teclado *"Ir direto para o conteúdo principal"*, oferecendo:
* Aumento e redução progressiva do tamanho da fonte (`A+` / `A-`).
* Modo **Alto Contraste** (fundo preto com texto amarelo).
* **Modo Daltonismo** (ajuste de contraste e saturação).
* Botão **Parar Voz** e **Restaurar Padrão**.

### ℹ️ Sobre (`/sobre`)
Apresenta o problema identificado, objetivos, stack tecnológica, metodologia ágil e a identificação completa da equipe.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
* **React 18 + Vite** — Construção da interface reativa e modular.
* **Tailwind CSS** — Estilização responsiva e temas dinâmicos de acessibilidade.
* **React Router DOM** — Gerenciamento de rotas SPA (Single Page Application).
* **Lucide React** — Biblioteca de ícones semânticos para apoio visual.
* **Web Speech API (`speechSynthesis`)** — Síntese de voz nativa em Português (`pt-BR`).

### Backend
* **Node.js + Express** — API REST para autenticação, gerenciamento de avisos e notas do boletim.
* **CORS** — Integração segura entre cliente e servidor.

---

## 📁 Estrutura do Projeto

```text
escola-para-todos/
├── backend/
│   ├── package.json
│   └── server.js                     # API REST (Login, Avisos e Boletim)
│
├── src/
│   ├── components/
│   │   ├── AcessibilidadeBar.jsx     # Menu flutuante de acessibilidade e atalho Skip-to-Content
│   │   ├── Navbar.jsx                # Cabeçalho e navegação semântica
│   │   └── Footer.jsx                # Rodapé institucional
│   │
│   ├── context/
│   │   ├── AcessibilidadeContext.jsx # Estado global de fonte, contraste, daltonismo e voz
│   │   └── AuthContext.jsx           # Controle de autenticação e perfis de usuário
│   │
│   ├── pages/
│   │   ├── Home.jsx                  # Página inicial
│   │   ├── Mapa.jsx                  # Planta interativa da escola
│   │   ├── Locais.jsx                # Busca de ambientes
│   │   ├── Avisos.jsx                # Mural de comunicados
│   │   ├── Boletim.jsx               # Boletim e lançamento de notas
│   │   ├── Acessibilidade.jsx        # Guia e painel de testes de acessibilidade
│   │   ├── Sobre.jsx                 # História e equipe do projeto
│   │   └── Login.jsx                 # Tela de acesso por perfil
│   │
│   ├── App.jsx                       # Configuração de rotas e provedores
│   ├── index.css                     # Diretivas Tailwind e estilos de alto contraste/foco
│   └── main.jsx                      # Ponto de entrada da aplicação
│
├── package.json
├── tailwind.config.js
└── README.md
```

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
* **Node.js** (versão 18 ou superior) instalado na máquina.

### 1. Iniciando o Backend (API Node.js)
Abra um terminal na pasta raiz do projeto e execute:
```bash
cd backend
npm install
node server.js
```
O servidor estará ativo em `http://localhost:3001`.

### 2. Iniciando o Frontend (React + Vite)
Em um segundo terminal, na pasta raiz do projeto, execute:
```bash
npm install
npm run dev
```
Acesse no navegador o endereço exibido no terminal (geralmente `http://localhost:5173`).

### 🔑 Contas de Teste (Tela de Login)

| Perfil | E-mail | Senha | Permissões |
| :--- | :--- | :--- | :--- |
| **Aluno** | `aluno@escola.com` | `123` | Consulta de notas, mapa, locais e avisos |
| **Professor** | `prof@escola.com` | `123` | Lançamento de notas no boletim e visualização completa |
| **Admin** | `admin@escola.com` | `123` | Acesso administrativo completo ao sistema |

---

## 🎨 Princípios de Acessibilidade Adotados

1. **HTML Semântico & ARIA:** Uso correto de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<caption>` e atributos `aria-live`, `aria-pressed` e `aria-label`.
2. **Independência de Cor:** Nenhuma informação crítica (status de acessibilidade, alertas de rota ou aprovação no boletim) depende exclusivamente de cor; todas combinam ícones e textos explícitos.
3. **Navegação por Teclado:** Contorno de foco de alta visibilidade (`:focus-visible`), ordem lógica de tabulação e atalho rápido para pular direto ao conteúdo principal.
4. **Feedback Auditivo:** Leitura sob demanda em português para textos, rotas, avisos e notas escolares.

---

## 👥 Gestão e Equipe

O desenvolvimento seguiu metodologias ágeis com quadro **Kanban** via **Trello**:
`📋 A fazer` ➔ `🔄 Em andamento` ➔ `👀 Em revisão` ➔ `✅ Concluído`

* **Área:** Desenvolvimento de Sistemas
* **Tema:** Inclusão e Acessibilidade Digital

| Integrante | Função |
| :--- | :--- |
| **Maria Letícia da Silva** | Líder de Projeto |
| **Guilherme Santana da Silva** | Documentador |
| **Joallyson Guilherme da Silva Marques** | Programador |
| **Felipe Vinicius de Lima Noronha** | Programador |
| **Pedro Gabriel Silva Siqueira** | Programador |
| **Arthur Vinícius Miranda César de Melo** | Design UI/UX |

---

## 📌 Status do Projeto e Próximos Passos

🚧 **Em fase de acabamento e validação** — A estrutura principal, todas as páginas, o menu flutuante de acessibilidade, o login por perfil e o boletim já estão funcionando.

### ✅ O que já foi concluído
* Estruturação completa do frontend em **React + Vite + Tailwind CSS**.
* Menu flutuante de acessibilidade (`A+`, `A-`, Alto Contraste, Modo Daltonismo e leitura por voz via Web Speech API).
* Páginas **Início**, **Mapa Interativo**, **Busca de Locais**, **Mural de Avisos**, **Guia de Acessibilidade** e **Sobre**.
* Sistema de **Login** (Aluno, Professor e Admin) e **Boletim Escolar** com cálculo automático de média.
* API inicial em **Node.js + Express** com fallback local.

### ⏳ O que ainda falta terminar
* [ ] **Gestão de Avisos no Frontend:** Criar o formulário na página `Avisos.jsx` para que **Professor** e **Admin** possam publicar e excluir comunicados diretamente pela interface (a rota já existe no backend).
* [ ] **Edição de Status no Mapa (Admin):** Permitir que a Secretaria/Admin altere em tempo real se um espaço está *Totalmente Acessível* ou *Em Manutenção*.
* [ ] **Persistência em Banco de Dados:** Substituir os arrays em memória no `server.js` por um banco de dados real (SQLite, PostgreSQL ou MongoDB) para não perder dados ao reiniciar o servidor.
* [ ] **Segurança e Autenticação Real:** Implementar criptografia de senhas (`bcrypt`) e tokens JWT no backend.
* [ ] **Identidade Visual e Mídia:** Adicionar o logotipo oficial da equipe e imagens reais da escola com textos alternativos (`alt`) descritivos.
* [ ] **Testes de Acessibilidade e Homologação:** Rodar auditoria com **Lighthouse** e **WAVE**, além de testar a navegação completa usando apenas o teclado e leitores de tela (NVDA / TalkBack).

---

## 📜 Licença

Projeto desenvolvido estritamente para fins educacionais e acadêmicos.
