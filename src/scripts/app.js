export const API_KEY = "061ef10fb0dbfe0515d15b2e76255380";
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

async function fetchMoviesByPage(currentPage) {
  console.log(`Buscando filmes na pagina ${currentPage}...`);

  const movieSearchQuery = "/discover/movie?primary_release_year=2025&";
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

export default fetchMoviesByPage;
