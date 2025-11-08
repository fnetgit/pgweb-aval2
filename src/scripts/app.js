export const API_KEY = "061ef10fb0dbfe0515d15b2e76255380";
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

async function mostrarFilmes(pagina) {
  console.log(`Buscando filmes na pagina ${pagina}...`);

  const corredor = "/discover/movie?primary_release_year=2025&";
  const endereco = `${BASE_URL}${corredor}api_key=${API_KEY}&page=${pagina}`;

  return fetch(endereco)
    .then((resposta) => {
      return resposta.json();
    })
    .then((JsonDeFilmes) => {
      console.log(JsonDeFilmes);
      return JsonDeFilmes;
    });
}

export default mostrarFilmes;
