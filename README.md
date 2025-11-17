<div align="center">
  
# Universidade Estadual do Piauí - UESPI
## Curso de Tecnologia em Sistemas de Computação
### Disciplina: ``Programação Web``

</div>

<br>

---

<div align="center">

# 🎥 Catálogo Interativo de Filmes e Séries

Projeto desenvolvido como 2ª Avaliação da disciplina de Programação Web, ministrada pelo [Prof. Eyder Rios](https://github.com/eyderrios)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![API](https://img.shields.io/badge/API-REST-blue?style=for-the-badge&logo=databricks&logoColor=white)
<br>

</div>

<div align="center">

## 👨‍💻 Equipe de Desenvolvedores

##### [Fabricio Fontenele Vieira](https://github.com/Fabricio-Fontenele)

##### [Francisco Alves Ribeiro Neto](https://github.com/fnetgit)

##### [Ruan Pedro de Araujo Anjos](https://github.com/oanjophb)

---

</div>

## 📖 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Screenshots](#-screenshots)
- [Funcionalidades Implementadas](#-funcionalidades-implementadas)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Como Executar](#-como-executar)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Funcionalidades Implementadas](#-funcionalidades-implementadas)

---

## 🎯 Sobre o Projeto

O **Catalog** é uma aplicação web responsiva que consome a API do [TMDb](https://www.themoviedb.org/) para exibir filmes e séries de 2025. Permite buscar, filtrar por tipo/gênero, navegar entre páginas e ver detalhes completos de cada mídia.

Desenvolvido com **HTML5, CSS3 e JavaScript ES6+ puro**, sem frameworks.

---

## 📸 Screenshots

### Página Inicial (Desktop)

![Print da Página Inicial](/public/screenshots/desktop_initial_page.png)

### Página de Detalhes (Filme/Série)

![Print da Página de Detalhes](/public/screenshots/mobile_details_page1.png)![](/public/screenshots/mobile_details_page2.png)

## ✨ Funcionalidades Implementadas

- [x] **Listagem de Mídias:** Lançamentos de 2025 (filmes e séries)
- [x] **Paginação:** Navegação entre páginas
- [x] **Busca:** Filtrar mídias por nome
- [x] **Filtros:** Por tipo (Filmes/Séries/Misto) e gênero
- [x] **Detalhes:** Página com sinopse, avaliação, elenco e trailer
- [x] **Detalhes de Séries:** Temporadas, episódios e status
- [x] **Tratamento de Erros:** Mensagens quando API falha
- [x] **Feedback Visual:** Loading spinner e animações
- [x] **Responsividade:** Layout adaptativo (desktop/mobile)
- [x] **Persistência:** Estado mantido com localStorage

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura semântica
- **CSS3:** Grid, Flexbox, variáveis CSS, animações
- **JavaScript ES6+:** Módulos, async/await, Fetch API, manipulação do DOM
- **API:** [TMDb API v3](https://www.themoviedb.org/documentation/api)

---

## 🚀 Como Executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/fnetgit/pgweb-aval2.git
   cd pgweb-aval2
   ```

2. Abra o `index.html` no navegador ou use um servidor local:
   ```bash
   npx live-server
   # ou
   python -m http.server 8000
   ```

**Obs:** Necessário conexão com internet para acessar a API do TMDb.

## 📂 Estrutura de Arquivos

```
pgweb-aval2/
├── 📁 public/
│   ├── 📁 img/                  # Logo e favicon
│   └── 📁 screenshots/          # Prints da aplicação
├── 📁 src/
│   ├── 📁 pages/
│   │   ├── about.html           # Página sobre
│   │   └── details.html         # Detalhes de filme/série
│   ├── 📁 scripts/
│   │   ├── app.js               # Comunicação com API
│   │   ├── main.js              # Lógica página inicial
│   │   ├── details.js           # Lógica detalhes
│   │   ├── about.js             # Lógica sobre
│   │   └── ui.js                # Componentes UI
│   └── 📁 styles/
│       ├── style.css            # Estilos página inicial
│       ├── details.css          # Estilos detalhes
│       └── about.css            # Estilos sobre
├── index.html                   # Página principal
├── README.md
└── aval2.pdf
```

<div align="center">

### 📝 Documentação Completa

Para mais detalhes sobre os requisitos da avaliação, consulte o arquivo [`aval2.pdf`](./aval2.pdf)

---

</div>
