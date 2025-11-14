<div align="center">
  
# Universidade Estadual do Piauí - UESPI
## Curso de Tecnologia em Sistemas de Computação
### Disciplina: ``Programação Web``

</div>

<br>

---

<div align="center">

# 🎥 Catálogo Interativo de Filmes e Séries

Projeto desenvolvido como 2ª Avaliação da disciplina de Programação Web, ministrada pelo `Prof. Eyder Rios`

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![API](https://img.shields.io/badge/API-REST-blue?style=for-the-badge&logo=databricks&logoColor=white)
<br>

</div>

<div align="center">

## 👨‍💻 Equipe de Desenvolvedores

##### Ruan Pedro de Araujo Anjos

##### Francisco Alves Ribeiro Neto

##### Fabricio Fontenele Vieira

---

</div>

## 📖 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Screenshots](#-screenshots)
- [Funcionalidades Implementadas](#-funcionalidades-implementadas)
- [Como Executar](#-como-executar)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)

---

## 🎯 Sobre o Projeto

O objetivo deste trabalho é desenvolver uma aplicação Web responsiva que consome dados de uma API REST pública de filmes e séries. A aplicação exibe um catálogo interativo, permitindo ao usuário ver lançamentos, filtrar resultados, ver detalhes de mídias e navegar por páginas.

Este projeto cumpre os requisitos da 2ª Avaliação da disciplina, focando no uso de **HTML5, CSS3 (puro ou Tailwind CDN) e JavaScript ES6+ (vanilla)**, sem a utilização de frameworks JS.

---

## 📸 Screenshots

### Página Inicial (Desktop)

![Print da Página Inicial](/public/screenshots/desktop_initial_page.png)

### Página de Detalhes (Filme/Série)

![Print da Página de Detalhes]()

### Responsividade (Mobile)

![Print da Versão Mobile](/public/screenshots/mobile_initial_page.png)

---

## ✨ Funcionalidades Implementadas

Esta é a checklist de requisitos funcionais solicitados no documento `aval2.pdf`:

- [x] **Listagem de Mídias:** A página inicial exibe os lançamentos mais recentes.
- [x] **Paginação:** O usuário pode navegar entre diferentes páginas de resultados.
- [x] **Filtragem/Busca:** Implementado um campo de busca para filtrar mídias por nome.
- [x] **Detalhes da Mídia:** Ao clicar em um card, o usuário é levado a uma página (ou modal) com detalhes (sinopse, data, avaliação, etc.).
- [x] **Detalhes de Séries:** Para séries, a aplicação exibe informações sobre temporadas e/dias de episódios (quando fornecido pela API).
- [x] **Tratamento de Erros:** A interface informa ao usuário caso a API falhe ou não retorne resultados.
- [x] **Feedback Visual:** Ícones de "loading" (carregamento) são exibidos enquanto os dados da API estão sendo buscados.
- [x] **Responsividade:** O layout se adapta a diferentes tamanhos de tela (desktop e mobile).

---

## 🛠️ Tecnologias Utilizadas

Todo o projeto foi construído com as tecnologias obrigatórias da disciplina:

- **HTML5:** Estruturação semântica do conteúdo.
- **CSS3:** Estilização (usamos CSS puro / Tailwind CDN).
- **JavaScript (ES6+):** Utilizado para:
  - Consumo da API REST com `fetch()`.
  - Manipulação dinâmica do DOM (criação de cards, atualização de conteúdo).
  - Gerenciamento de eventos (cliques, busca, paginação).
- **API: The Movies DataBase - TMDB**

---

## 🚀 Como Executar

1.  Clone este repositório (ou baixe o .zip):
    ```bash
    git clone https://github.com/fnetgit/pgweb-aval2.git
    ```
2.  Navegue até a pasta do projeto.
3.  Abra o arquivo `src/index.html` diretamente no seu navegador de preferência (Google Chrome, Firefox, etc.).

## 📂 Estrutura de Arquivos

A estrutura do projeto foi organizada da seguinte forma para manter a separação de responsabilidades (HTML, CSS, JS).

```
├── 📁 public
│   ├── 📁 img
│   └── 📁 screenshots
├── 📁 src
│   ├── 📁 scripts
│   │   ├── 📄 app.js
│   │   ├── 📄 main.js
│   │   └── 📄 ui.js
│   └── 📁 styles
│       └── 🎨 style.css
├── 📝 README.md
├── 📕 aval2.pdf
└── 🌐 index.html
```
