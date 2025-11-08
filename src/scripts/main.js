import mostrarFilmes, { IMAGE_BASE_URL } from "./app.js";

const divFilmes = document.querySelector("#lista-de-filmes");

function retornarImagemFilmes(filmes) {
  const filmesLimpos = filmes.results.map((filme) => {
    return {
      title: filme.title,
      poster_url: `${IMAGE_BASE_URL}/w400${filme.poster_path}`,
    };
  });

  filmesLimpos.forEach((filme) => {
    const novaImagem = document.createElement("img");

    novaImagem.src = filme.poster_url;

    divFilmes.appendChild(novaImagem);
  });
}

let paginaAtual = 1;

const botao = document.querySelector("#botao-carrega-mais");

botao.addEventListener("click", () => {
  paginaAtual++;

  mostrarFilmes(paginaAtual).then((filmes) => {
    retornarImagemFilmes(filmes);
  });
});

mostrarFilmes(paginaAtual).then((filmes) => {
  retornarImagemFilmes(filmes);
});
