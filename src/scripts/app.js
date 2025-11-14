const API_KEY = "061ef10fb0dbfe0515d15b2e76255380";
const BASE_URL = "https://api.themoviedb.org/3";
const movieSearchQuery = "/discover/movie?primary_release_year=2025&";
const seriesSearchQuery = "/discover/tv?first_air_date_year=2025&";

export async function fetchMoviesByPage(currentPage, genre = "") {
  console.log(`Buscando filmes na pagina ${currentPage}...`);
  const genreParam = genre && genre !== "all" ? `&with_genres=${genre}` : "";
  const searchRequestUrl = `${BASE_URL}${movieSearchQuery}api_key=${API_KEY}&page=${currentPage}&language=pt-BR${genreParam}`;

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

export async function fetchSeriesByPage(currentPage, genre = "") {
  console.log(`Buscando séries na pagina ${currentPage}...`);
  const genreParam = genre && genre !== "all" ? `&with_genres=${genre}` : "";
  const searchRequestUrl = `${BASE_URL}${seriesSearchQuery}api_key=${API_KEY}&page=${currentPage}&language=pt-BR${genreParam}`;

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

export async function searchContent(query, type = "movie", page = 1) {
  console.log(`Buscando "${query}" em ${type}...`);
  const endpoint = type === "series" ? "/search/tv" : "/search/movie";
  const searchRequestUrl = `${BASE_URL}${endpoint}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=pt-BR`;

  try {
    const response = await fetch(searchRequestUrl);

    if (!response.ok) {
      throw new Error(
        `Erro da API: ${response.statusText} (Status: ${response.status})`
      );
    }

    const results = await response.json();
    console.log(results);
    return results;
  } catch (error) {
    console.error("Falha na busca:", error);
    throw new Error(error.message || "Não foi possível realizar a busca.");
  }
}

export async function fetchGenres(type = "movie") {
  console.log(`Buscando gêneros de ${type}...`);
  const endpoint = type === "series" ? "/genre/tv/list" : "/genre/movie/list";
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=pt-BR`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Erro da API: ${response.statusText} (Status: ${response.status})`
      );
    }

    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Falha ao buscar gêneros:", error);
    return [];
  }
}