const API_KEY = "061ef10fb0dbfe0515d15b2e76255380";
const BASE_URL = "https://api.themoviedb.org/3";
const movieSearchQuery = "/discover/movie?primary_release_year=2025&";


export async function fetchMoviesByPage(currentPage) {
  console.log(`Buscando filmes na pagina ${currentPage}...`);

  const searchRequestUrl = `${BASE_URL}${movieSearchQuery}api_key=${API_KEY}&page=${currentPage}`;

  return fetch(searchRequestUrl)
    .then((response) => {
      return response.json();
    })
    .then((MoviesJson) => {
      console.log(MoviesJson);
      return MoviesJson;
    });
}