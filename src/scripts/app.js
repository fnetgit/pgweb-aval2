const API_KEY = "061ef10fb0dbfe0515d15b2e76255380";
const BASE_URL = "https://api.themoviedb.org/3";
const movieSearchQuery = "/discover/movie?primary_release_year=2025&";
const seriesSearchQuery = "/discover/tv?first_air_date_year=2025&";

export async function fetchMoviesByPage(currentPage) {
  console.log(`Buscando filmes na pagina ${currentPage}...`);
  const searchRequestUrl = `${BASE_URL}${movieSearchQuery}api_key=${API_KEY}&page=${currentPage}&language=pt-BR`;

  try {
    const response = await fetch(searchRequestUrl);

    if (!response.ok) {
      throw new Error(
        `Erro da API: ${response.statusText} (Status: ${response.status})`
      );
    }

    const moviesJson = await response.json();
    console.log(moviesJson);
    return moviesJson;
  } catch (error) {
    console.error("Falha no fetch:", error);
    throw new Error(error.message || "Não foi possível conectar à API.");
  }
}

export async function fetchSeriesByPage(currentPage) {
  console.log(`Buscando séries na pagina ${currentPage}...`);
  const searchRequestUrl = `${BASE_URL}${seriesSearchQuery}api_key=${API_KEY}&page=${currentPage}&language=pt-BR`;

  try {
    const response = await fetch(searchRequestUrl);

    if (!response.ok) {
      throw new Error(
        `Erro da API: ${response.statusText} (Status: ${response.status})`
      );
    }

    const seriesJson = await response.json();
    console.log(seriesJson);
    return seriesJson;
  } catch (error) {
    console.error("Falha no fetch:", error);
    throw new Error(error.message || "Não foi possível conectar à API.");
  }
}
